/**
 * Host half of the MicroPython code generator bundle.
 *
 * The Client module owns the panel UI and the local rule-based generator. This
 * half adds one narrow HTTP bridge so the panel can ask the Harness model
 * registry for higher-level MicroPython code without ever seeing a credential:
 *
 *   POST /micropython/generate  { logic, input, output, invert }  ->  { code, ... }
 *
 * The route is same-origin, POST + JSON only, body-capped and cancellable. The
 * generated code is returned as text and nothing here flashes, runs, or stores
 * it. Reviewing and copying is entirely the user's action in the panel.
 */
import { Buffer } from 'node:buffer';

const ROUTE_PATH = '/micropython/generate';
const MAX_BODY_BYTES = 8 * 1024;
const MAX_LOGIC_CHARS = 2000;
const MAX_CODE_CHARS = 20000;
const REQUEST_TIMEOUT_MS = 90_000;
const MAX_TOKENS = 5000;
const TEMPERATURE = 0.2;
const MAX_PROVIDER_ATTEMPTS = 3;

const PROVIDER_ROUTE_CODES = new Set([
  'NO_ADAPTER',
  'MISSING_CREDENTIAL',
  'AUTH',
  'UNAUTHORIZED',
  'INVALID_CREDENTIAL',
]);

const SYSTEM_PROMPT = [
  '你是一名严谨的 ESP32 MicroPython 固件工程师。你只输出可以直接保存为 main.py 的纯 Python 代码。',
  '',
  '硬性要求：',
  '1. 只输出代码本身：第一行必须是 # -*- coding: utf-8 -*-。不要输出任何解释、前言、后记或 Markdown 代码围栏。',
  '2. 必须 import machine 和 time；确实需要 DHT 时才可以 import dht。不要使用其他第三方模块。',
  '3. 必须包含：顶部中文注释说明整体逻辑；引脚与常量初始化；read_input() 读取函数；drive_output(active) 输出函数；启动 print；while True 主循环。',
  '4. 必须使用硬件参数里给出的 GPIO 编号和有效电平。继电器低电平触发时，吸合写 OUTPUT_ACTIVE_LEVEL，释放写相反电平；不要把所有继电器都当成高电平触发。',
  '5. 复杂判断必须用 and / or / not 组合；每个关键判断上方写一行中文注释。不要用 lambda、不要用一行塞满多个动作。',
  '6. 时序必须非阻塞：禁止用 time.sleep()/time.sleep_ms() 做超过 300ms 的阻塞等待。动作保持时间（如继电器吸合 5 秒后断开）必须用 time.ticks_ms() + time.ticks_diff() 的状态机实现，例如：now = time.ticks_ms()；if relay_engaged and time.ticks_diff(now, relay_started_ms) >= RELAY_ON_MS: ...。绝对不要写 time.sleep(5) 或 time.sleep(PUMP_ON_SECONDS)。',
  '7. 允许的短阻塞只有：传感器防抖 10~30ms、DHT 等库内部时序、主循环末尾 time.sleep_ms(100~300) 作为轮询间隔。必须用 time.ticks_diff() 处理 ticks 回绕，禁止直接相减 now - started。',
  '8. 数字输入必须做 30ms 二次采样防抖；主循环末尾 sleep 100~300ms，避免刷屏和空转。',
  '9. 所有 print 使用中文，并用【启动】【输入】【输出】【警告】【提示】前缀；输入状态只在变化时打印，不要每 200ms 刷屏。',
  '10. 用户句子提到、但硬件参数里没有给出引脚的模块：必须在文件顶部集中定义成可修改常量，例如 LDR_PIN = 34  # TODO 请核对接线，并在顶部注释里列出所有需要人工确认的引脚；绝对不要凭空假设一个"看起来合理"的引脚却不标注。',
  '11. 禁止：input()、exec()、eval()、os、sys、subprocess、网络请求、文件读写、递归，以及除最外层 while True 之外的死循环。',
  '12. 代码必须能被 Python 3 语法解析；缩进用 4 个空格；不要使用复杂的 f-string 嵌套。',
  '13. 保持精简：顶部注释不超过 14 行，代码中的注释只解释关键判断，不要写大段说明文字。',
  '14. 如果【安全标记】提示高功率/市电负载，必须在代码顶部（编码声明之后、import 之前）加入醒目的中文安全警告注释块，写明：独立电源、继电器/光耦隔离/驱动模块、严禁 ESP32 GPIO 直连、220V 市电必须由持证电工接线并加保险丝。',
  '15. ADC 必须注明量程并保持一致：ADC.read() 是 0~4095，read_u16() 是 0~65535；用户给出的阈值（例如 1000）默认按 0~4095 量程处理，使用 read()；不要混用两种量程，也不要把同一个阈值同时用于两种量程。',
  '',
  '只输出代码。',
].join('\n');

const WARNING_FENCE = 'fence_stripped';
const WARNING_FENCE_INLINE = 'fence_inline';
const WARNING_TRUNCATED = 'truncated';
const WARNING_RISKY = 'risky_call';
const WARNING_TODO = 'todo_pins';
const WARNING_HEADER = 'missing_header';
const WARNING_LOOP = 'missing_loop';
const WARNING_SLEEP = 'missing_sleep';
const WARNING_BLOCKING = 'blocking_sleep';

const HIGH_POWER_TERMS = [
  '泵',
  '电机',
  '马达',
  '压缩机',
  '空调',
  '加热',
  '电热',
  '热水器',
  '电磁阀',
  '电磁铁',
  '接触器',
  '逆变器',
  '大功率',
  '市电',
  '交流电',
  '220v',
  '110v',
];

function detectHighPower(...parts) {
  const haystack = parts
    .filter((part) => typeof part === 'string' && part)
    .join(' ')
    .toLowerCase();
  const matched = HIGH_POWER_TERMS.filter((term) => haystack.includes(term));
  return { highPower: matched.length > 0, matched };
}

function hasBlockingSleep(code) {
  for (const match of code.matchAll(/\btime\.sleep\s*\(\s*([^)]*)\)/g)) {
    const value = Number(match[1].trim());
    if (Number.isFinite(value) && value >= 0 && value <= 0.3) continue;
    return true;
  }
  for (const match of code.matchAll(/\btime\.sleep_ms\s*\(\s*([^)]*)\)/g)) {
    const value = Number(match[1].trim());
    if (Number.isFinite(value) && value > 300) return true;
  }
  return false;
}

const RISKY_PATTERNS = [
  /\bexec\s*\(/,
  /\beval\s*\(/,
  /\binput\s*\(/,
  /\bos\.system\s*\(/,
  /\bopen\s*\(/,
  /^\s*import\s+os\b/m,
  /^\s*import\s+subprocess\b/m,
  /^\s*import\s+socket\b/m,
  /\brequests\./,
  /\burllib\b/,
  /\bmicropython\.const\s*\(/,
];

const routeCache = new WeakMap();

class RequestError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
    this.code = code;
  }
}

class ProviderFailure extends Error {
  constructor(code, message, receivedText) {
    super(message);
    this.name = 'ProviderFailure';
    this.code = code || 'LLM_ERROR';
    this.receivedText = typeof receivedText === 'string' ? receivedText : '';
  }
}

export const inject = ['llm', 'webServer'];

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: ROUTE_PATH,
    handler: (req, res) => handleRequest(ctx, req, res),
  }));
}

async function handleRequest(ctx, req, res) {
  let payload;
  try {
    if (req.method !== 'POST') {
      throw new RequestError(405, 'METHOD_NOT_ALLOWED', '只支持 POST。');
    }
    if (!isJsonContentType(req.headers['content-type'])) {
      throw new RequestError(415, 'UNSUPPORTED_MEDIA_TYPE', '请求必须是 application/json。');
    }
    if (!isSameOrigin(req, ctx)) {
      throw new RequestError(403, 'FORBIDDEN_ORIGIN', '只允许同源页面调用。');
    }
    payload = await readJsonBody(req);
  } catch (error) {
    const failure = toPublicError(error);
    sendJson(res, failure.status, { error: failure.message, code: failure.code });
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const onClose = () => {
    if (!res.writableEnded) controller.abort();
  };
  if (typeof res.on === 'function') res.on('close', onClose);

  try {
    const result = await generateCode(ctx, payload, controller.signal);
    sendJson(res, 200, result);
  } catch (error) {
    const failure = toPublicError(error);
    sendJson(res, failure.status, { error: failure.message, code: failure.code });
  } finally {
    clearTimeout(timer);
    if (typeof res.off === 'function') res.off('close', onClose);
  }
}

async function readJsonBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      throw new RequestError(413, 'BODY_TOO_LARGE', '请求体过大。');
    }
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  let parsed;
  try {
    parsed = JSON.parse(raw || '{}');
  } catch {
    throw new RequestError(400, 'BAD_JSON', '请求体不是合法 JSON。');
  }
  return parsed;
}

function isJsonContentType(value) {
  if (typeof value !== 'string') return false;
  return value.split(';')[0].trim().toLowerCase() === 'application/json';
}

function isSameOrigin(req, ctx) {
  const origin = req.headers.origin;
  if (!origin) return true;
  let originHost;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  if (originHost === req.headers.host) return true;
  try {
    return originHost === new URL(ctx.webServer.getOrigin()).host;
  } catch {
    return false;
  }
}

function normalizePayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new RequestError(400, 'BAD_PAYLOAD', '请求格式不正确。');
  }
  const logic = typeof payload.logic === 'string' ? payload.logic.trim() : '';
  if (!logic) {
    throw new RequestError(400, 'EMPTY_LOGIC', '请先输入自定义逻辑描述。');
  }
  if (logic.length > MAX_LOGIC_CHARS) {
    throw new RequestError(400, 'LOGIC_TOO_LONG', '自定义逻辑描述过长。');
  }
  return {
    logic,
    input: normalizePort(payload.input),
    output: normalizePort(payload.output),
    invert: Boolean(payload.invert),
  };
}

function normalizePort(port) {
  if (!port || typeof port !== 'object' || Array.isArray(port)) {
    throw new RequestError(400, 'BAD_PAYLOAD', '硬件参数不完整。');
  }
  const pins = normalizePins(port.pins);
  if (pins.length === 0) {
    throw new RequestError(400, 'BAD_PAYLOAD', '硬件参数缺少引脚。');
  }
  return {
    label: normalizeText(port.label, 80),
    model: normalizeText(port.model, 80),
    category: normalizeText(port.category, 24),
    kind: normalizeText(port.kind, 24),
    type: normalizeText(port.type, 24),
    pins,
    dirPin: Number.isInteger(port.dirPin) && port.dirPin >= 0 && port.dirPin <= 48 ? port.dirPin : null,
    activeLevel: port.activeLevel === 0 || port.activeLevel === 1 ? port.activeLevel : null,
    pull: normalizeText(port.pull, 24),
  };
}

function normalizePins(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  const pins = [];
  for (const item of value) {
    if (!Number.isInteger(item) || item < 0 || item > 48) continue;
    if (seen.has(item)) continue;
    seen.add(item);
    pins.push(item);
    if (pins.length >= 4) break;
  }
  return pins;
}

function normalizeText(value, limit) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, limit);
}

function describePort(port) {
  const parts = [];
  if (port.label) parts.push(port.label);
  if (port.model && port.model !== port.label) parts.push(port.model);
  if (port.category) parts.push('分类 ' + port.category);
  if (port.kind) parts.push('驱动 ' + port.kind);
  if (port.type) parts.push('类型 ' + port.type);
  parts.push('GPIO ' + port.pins.join(', '));
  if (port.dirPin !== null) parts.push('方向脚 GPIO ' + port.dirPin);
  if (port.activeLevel !== null) parts.push('有效电平 ' + (port.activeLevel === 0 ? 'LOW(0)' : 'HIGH(1)'));
  if (port.pull && port.pull !== 'none') parts.push('内部电阻 ' + port.pull);
  return parts.join(' | ');
}

function buildPrompt(payload) {
  const normalized = payload && payload.logic !== undefined ? payload : normalizePayload(payload);
  const safety = detectHighPower(
    normalized.output.label,
    normalized.output.model,
    normalized.output.type === 'motor' ? '电机' : '',
    normalized.logic,
  );
  const lines = [
    '【硬件】ESP32（经典 ESP32 GPIO 编号） / MicroPython',
    '输入：' + describePort(normalized.input),
    '输出：' + describePort(normalized.output),
    '电平反转：' + (normalized.invert ? '开启' : '关闭'),
  ];
  if (safety.highPower) {
    lines.push('');
    lines.push('【安全标记】检测到高功率/市电负载关键词：' + safety.matched.join('、'));
    lines.push('必须在代码顶部加入醒目的中文安全警告注释块，写明：独立电源、继电器/光耦隔离/驱动模块、严禁 ESP32 GPIO 直连、220V 市电必须由持证电工接线并加保险丝。');
  }
  lines.push('');
  lines.push('【用户逻辑】');
  lines.push(normalized.logic);
  return lines.join('\n');
}

function pickModel(models) {
  if (!Array.isArray(models) || models.length === 0) return null;
  const flash = models.find((model) => typeof model.id === 'string' && /flash|mini|small/i.test(model.id));
  return flash || models[0];
}

async function buildCandidates(ctx, payload) {
  const cached = routeCache.get(ctx);
  const providers = ctx.llm.listProviders();
  if (!Array.isArray(providers) || providers.length === 0) {
    throw new ProviderFailure('NO_ADAPTER', 'No LLM provider is registered');
  }
  const ordered = [];
  const pushRoute = (route) => {
    if (!route || !route.provider || !route.model) return;
    if (ordered.some((item) => item.provider === route.provider && item.model === route.model)) return;
    ordered.push(route);
  };

  if (payload && typeof payload.provider === 'string' && typeof payload.model === 'string') {
    pushRoute({ provider: payload.provider, model: payload.model });
  }
  if (cached) pushRoute(cached);

  for (const info of providers) {
    if (ordered.length >= MAX_PROVIDER_ATTEMPTS) break;
    let models;
    try {
      models = await ctx.llm.listModels(info.id);
    } catch {
      continue;
    }
    const model = pickModel(models);
    if (!model) continue;
    pushRoute({ provider: info.id, model: model.id });
  }

  if (ordered.length === 0) {
    throw new ProviderFailure('NO_ADAPTER', 'No model is available for any provider');
  }
  return ordered.slice(0, MAX_PROVIDER_ATTEMPTS);
}

async function collectStream(stream) {
  let text = '';
  let truncated = false;
  for await (const chunk of stream) {
    if (!chunk || typeof chunk !== 'object') continue;
    if (chunk.type === 'text-delta') {
      text += typeof chunk.text === 'string' ? chunk.text : '';
      if (text.length > MAX_CODE_CHARS * 2) {
        throw new RequestError(502, 'CODE_TOO_LONG', '模型返回的代码过长，已拒绝。');
      }
    } else if (chunk.type === 'finish') {
      const reason = chunk.reason || {};
      if (reason.kind === 'error' || reason.kind === 'aborted') {
        const failure = reason.failure || {};
        throw new ProviderFailure(failure.code || 'LLM_ERROR', failure.message || 'model call failed', text);
      }
      if (reason.kind === 'tool-calls') {
        throw new RequestError(502, 'TOOL_CALL', '模型返回了工具调用，已拒绝。');
      }
      if (reason.kind === 'max-tokens') truncated = true;
      break;
    }
  }
  return { text, truncated };
}

async function streamOne(ctx, route, payload, signal) {
  const stream = ctx.llm.stream({
    provider: route.provider,
    model: route.model,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: [{ type: 'text', text: buildPrompt(payload) }],
    }],
    temperature: TEMPERATURE,
    maxTokens: MAX_TOKENS,
    signal,
  });
  const collected = await collectStream(stream);
  return { ...collected, provider: route.provider, model: route.model };
}

function sanitizeCode(raw, truncated) {
  let code = String(raw == null ? '' : raw).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim();
  const warnings = new Set();
  if (!code) {
    throw new RequestError(502, 'EMPTY_RESPONSE', '模型没有返回代码。');
  }

  const fenced = code.match(/^```[a-zA-Z0-9_+-]*\s*\n([\s\S]*?)\n?```$/);
  if (fenced) {
    code = fenced[1].trim();
    warnings.add(WARNING_FENCE);
  } else if (code.includes('```')) {
    warnings.add(WARNING_FENCE_INLINE);
  }

  if (!code) {
    throw new RequestError(502, 'EMPTY_RESPONSE', '模型没有返回代码。');
  }
  if (code.length > MAX_CODE_CHARS) {
    throw new RequestError(502, 'CODE_TOO_LONG', '模型返回的代码过长，已拒绝。');
  }
  if (!/^\s*import\s+machine/m.test(code) && !/^\s*from\s+machine\s+import/m.test(code)) {
    throw new RequestError(502, 'MISSING_MACHINE', '模型返回的代码缺少 import machine，已拒绝展示。');
  }
  if (!/\bwhile\s+[\s(]*True\s*\)?\s*:/.test(code)) warnings.add(WARNING_LOOP);
  if (!/\btime\.sleep(?:_ms|_us)?\s*\(/.test(code)) warnings.add(WARNING_SLEEP);
  if (hasBlockingSleep(code)) warnings.add(WARNING_BLOCKING);
  if (!/^#\s*-\*-\s*coding[:=]/m.test(code)) warnings.add(WARNING_HEADER);
  if (RISKY_PATTERNS.some((pattern) => pattern.test(code))) warnings.add(WARNING_RISKY);
  if (/\bTODO\b/.test(code)) warnings.add(WARNING_TODO);
  if (truncated) warnings.add(WARNING_TRUNCATED);

  return { code, warnings: [...warnings] };
}

async function generateCode(ctx, rawPayload, signal) {
  const payload = normalizePayload(rawPayload);
  const candidates = await buildCandidates(ctx, payload);

  let lastFailure = null;
  for (const route of candidates) {
    if (signal && signal.aborted) {
      throw new RequestError(499, 'ABORTED', '请求已取消。');
    }
    try {
      const streamed = await streamOne(ctx, route, payload, signal);
      const sanitized = sanitizeCode(streamed.text, streamed.truncated);
      routeCache.set(ctx, { provider: route.provider, model: route.model });
      return {
        code: sanitized.code,
        warnings: sanitized.warnings,
        provider: route.provider,
        model: route.model,
      };
    } catch (error) {
      if (signal && signal.aborted) {
        throw new RequestError(499, 'ABORTED', '请求已取消。');
      }
      if (error instanceof ProviderFailure && PROVIDER_ROUTE_CODES.has(error.code) && !error.receivedText) {
        lastFailure = error;
        continue;
      }
      throw error;
    }
  }

  throw lastFailure || new ProviderFailure('NO_ADAPTER', 'No provider could complete the request');
}

function providerMessage(code) {
  if (code === 'MISSING_CREDENTIAL' || code === 'AUTH' || code === 'UNAUTHORIZED' || code === 'INVALID_CREDENTIAL') {
    return '当前没有可用的大模型凭证，请先在 Harness 设置中配置 provider API Key。';
  }
  if (code === 'NO_ADAPTER') {
    return '没有注册可用的模型适配器，请先启用 LLM 插件。';
  }
  if (code === 'RATE_LIMIT' || code === 'QUOTA') {
    return '模型限流或额度不足，请稍后再试。';
  }
  if (code === 'CONTEXT_WINDOW_EXCEEDED') {
    return '模型上下文超限，请精简自定义逻辑描述。';
  }
  return '大模型调用失败，请稍后重试。';
}

function toPublicError(error) {
  if (error instanceof RequestError) {
    return { status: error.status, code: error.code, message: error.message };
  }
  if (error instanceof ProviderFailure) {
    return { status: 502, code: error.code, message: providerMessage(error.code) };
  }
  return { status: 500, code: 'INTERNAL', message: '生成失败，请稍后重试。' };
}

function sendJson(res, status, body) {
  if (!res || res.writableEnded) return;
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

export const __internals = {
  ROUTE_PATH,
  SYSTEM_PROMPT,
  WARNING_FENCE,
  WARNING_FENCE_INLINE,
  WARNING_TRUNCATED,
  WARNING_RISKY,
  WARNING_TODO,
  WARNING_HEADER,
  WARNING_LOOP,
  WARNING_SLEEP,
  WARNING_BLOCKING,
  HIGH_POWER_TERMS,
  buildPrompt,
  detectHighPower,
  hasBlockingSleep,
  normalizePayload,
  sanitizeCode,
  collectStream,
  pickModel,
  providerMessage,
  toPublicError,
  RequestError,
  ProviderFailure,
};
