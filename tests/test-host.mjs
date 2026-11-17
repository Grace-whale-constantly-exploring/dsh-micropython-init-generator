import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { apply, __internals } from '../index.js';

const {
  ROUTE_PATH,
  buildPrompt,
  sanitizeCode,
  detectHighPower,
  hasBlockingSleep,
  providerMessage,
  RequestError,
  ProviderFailure,
} = __internals;

const VALID_CODE = [
  '# -*- coding: utf-8 -*-',
  '# 测试代码',
  'import machine',
  'import time',
  '',
  'input_pin = machine.Pin(18, machine.Pin.IN, machine.Pin.PULL_UP)',
  'output_pin = machine.Pin(26, machine.Pin.OUT)',
  'RELAY_ON_MS = 5000',
  'relay_engaged = False',
  'relay_started_ms = 0',
  '',
  'def read_input():',
  '    first = input_pin.value()',
  '    time.sleep_ms(30)',
  '    second = input_pin.value()',
  '    if first == second:',
  '        return second',
  '    return None',
  '',
  'def drive_output(active):',
  '    if active:',
  '        output_pin.value(0)',
  '        print("【输出】继电器吸合。")',
  '    else:',
  '        output_pin.value(1)',
  '        print("【输出】继电器释放。")',
  '',
  'print("【启动】系统已启动。")',
  '',
  'while True:',
  '    now = time.ticks_ms()',
  '    reading = read_input()',
  '    if reading is None:',
  '        time.sleep_ms(200)',
  '        continue',
  '    if reading == 0 and not relay_engaged:',
  '        relay_engaged = True',
  '        relay_started_ms = now',
  '        drive_output(True)',
  '    elif relay_engaged and time.ticks_diff(now, relay_started_ms) >= RELAY_ON_MS:',
  '        relay_engaged = False',
  '        drive_output(False)',
  '    time.sleep_ms(200)',
  '',
].join('\n');

const PAYLOAD = {
  logic: '如果漏水传感器检测到漏水，并且光敏电阻数值小于1000，那么让继电器吸合5秒后断开',
  input: {
    label: '漏水传感器',
    model: '漏水传感器',
    category: 'digital',
    kind: 'digital',
    pins: [18],
    activeLevel: 0,
    pull: 'up',
  },
  output: {
    label: '1 路 5V 继电器模块',
    model: '1 路 5V 继电器模块',
    type: 'relay',
    kind: 'relay',
    pins: [26],
    dirPin: null,
    activeLevel: 0,
  },
  invert: false,
};

function okStream(text) {
  return (async function* () {
    yield { type: 'block-start', index: 0, blockType: 'text' };
    yield { type: 'text-delta', index: 0, text };
    yield { type: 'finish', reason: { kind: 'stop' } };
  })();
}

function finishErrorStream(code, message, text) {
  return (async function* () {
    if (text) yield { type: 'text-delta', index: 0, text };
    yield { type: 'finish', reason: { kind: 'error', failure: { code, message } } };
  })();
}

function maxTokensStream(text) {
  return (async function* () {
    yield { type: 'text-delta', index: 0, text };
    yield { type: 'finish', reason: { kind: 'max-tokens' } };
  })();
}

function makeCtx(streams) {
  const routes = [];
  const calls = [];
  const ctx = {
    effect(callback) {
      return callback();
    },
    webServer: {
      getOrigin() {
        return 'http://127.0.0.1:9162';
      },
      register(route) {
        routes.push(route);
        return () => {};
      },
    },
    llm: {
      listProviders() {
        return [{ id: 'alpha', name: 'Alpha' }, { id: 'beta', name: 'Beta' }];
      },
      async listModels(provider) {
        return [{ id: provider + '-flash', name: provider }];
      },
      stream(options) {
        calls.push(options);
        const factory = streams[options.provider];
        if (!factory) throw new Error('unexpected provider ' + options.provider);
        return factory(options);
      },
    },
  };
  apply(ctx);
  return { ctx, routes, calls };
}

function makeReq(body, options = {}) {
  const text = typeof body === 'string' ? body : JSON.stringify(body);
  const req = {
    method: options.method || 'POST',
    headers: Object.assign({
      host: '127.0.0.1:9162',
      origin: 'http://127.0.0.1:9162',
      'content-type': 'application/json',
    }, options.headers || {}),
    on() {},
    off() {},
    async *[Symbol.asyncIterator]() {
      yield Buffer.from(text);
    },
  };
  return req;
}

function makeRes() {
  const state = { status: 0, headers: {}, body: '' };
  const res = {
    writableEnded: false,
    destroyed: false,
    writeHead(status, headers) {
      state.status = status;
      state.headers = headers || {};
    },
    end(payload) {
      state.body = payload ? String(payload) : '';
      res.writableEnded = true;
    },
    state,
  };
  return res;
}

async function call(route, req) {
  const res = makeRes();
  await route.handler(req, res);
  return { status: res.state.status, body: res.state.body ? JSON.parse(res.state.body) : null };
}

async function run() {
  // Prompt only carries the hardware parameters and the user's sentence.
  const prompt = buildPrompt(PAYLOAD);
  assert.match(prompt, /GPIO 18/);
  assert.match(prompt, /GPIO 26/);
  assert.match(prompt, /漏水传感器检测到漏水/);
  assert.doesNotMatch(prompt, /read_input|machine\.Pin|localCode/);

  // Sanitizer.
  const clean = sanitizeCode(VALID_CODE, false);
  assert.deepEqual(clean.warnings, []);
  assert.equal(clean.code, VALID_CODE.trim());

  const fenced = sanitizeCode('```python\n' + VALID_CODE + '```', false);
  assert.ok(fenced.warnings.includes('fence_stripped'));
  assert.doesNotMatch(fenced.code, /```/);

  const inlineFence = sanitizeCode(VALID_CODE + '\n```\n', false);
  assert.ok(inlineFence.warnings.includes('fence_inline'));

  const truncated = sanitizeCode(VALID_CODE, true);
  assert.ok(truncated.warnings.includes('truncated'));

  const risky = sanitizeCode(VALID_CODE + '\nimport os\n', false);
  assert.ok(risky.warnings.includes('risky_call'));

  const fragment = sanitizeCode('# -*- coding: utf-8 -*-\nimport machine\nprint("fragment")\n', false);
  assert.ok(fragment.warnings.includes('missing_loop'));
  assert.ok(fragment.warnings.includes('missing_sleep'));
  assert.equal(fragment.code.includes('print("fragment")'), true, 'fragments are still shown for review');

  // Blocking-sleep guard: the exact regression from the phone review.
  const literalBlocking = sanitizeCode(VALID_CODE.replace('time.sleep_ms(200)\n        continue', 'time.sleep(5)\n        continue'), false);
  assert.ok(literalBlocking.warnings.includes('blocking_sleep'), 'time.sleep(5) must be flagged');
  const variableBlocking = sanitizeCode(VALID_CODE.replace('time.sleep_ms(200)\n        continue', 'time.sleep(PUMP_ON_SECONDS)\n        continue'), false);
  assert.ok(variableBlocking.warnings.includes('blocking_sleep'), 'time.sleep(variable) must be flagged');
  assert.equal(hasBlockingSleep('time.sleep(0.03)\n'), false, 'short debounce sleep is allowed');
  assert.equal(hasBlockingSleep('time.sleep(0.3)\n'), false, '300ms boundary is allowed');
  assert.equal(hasBlockingSleep('time.sleep_ms(30)\n'), false, 'short ms sleep is allowed');
  assert.equal(hasBlockingSleep('time.sleep_ms(300)\n'), false, '300ms loop delay is allowed');
  assert.equal(hasBlockingSleep('time.sleep_ms(301)\n'), true, 'oversized ms sleep is flagged');
  assert.equal(hasBlockingSleep('time.sleep_ms(2000)\n'), true, 'long ms sleep is flagged');
  assert.equal(hasBlockingSleep(VALID_CODE), false, 'ticks-based code has no blocking warning');

  // High-power / mains detection and prompt safety marker.
  const pump = detectHighPower('220V 水泵');
  assert.equal(pump.highPower, true);
  assert.ok(pump.matched.includes('泵'));
  assert.ok(pump.matched.includes('220v'));
  assert.equal(detectHighPower('1 路 5V 继电器模块').highPower, false);
  assert.equal(detectHighPower('L298N 电机驱动').highPower, true);
  const pumpPrompt = buildPrompt({
    ...PAYLOAD,
    logic: '检测到漏水后启动水泵 5 秒',
    output: { ...PAYLOAD.output, label: '220V 水泵', model: '220V 水泵' },
  });
  assert.match(pumpPrompt, /【安全标记】/);
  assert.match(pumpPrompt, /水泵/);
  assert.match(buildPrompt(PAYLOAD), /【硬件】/);
  assert.doesNotMatch(buildPrompt(PAYLOAD), /【安全标记】/);

  assert.throws(
    () => sanitizeCode('print("hello")\n', false),
    (error) => error instanceof RequestError && error.code === 'MISSING_MACHINE',
  );

  // Route registration.
  const first = makeCtx({ alpha: () => okStream(VALID_CODE), beta: () => okStream(VALID_CODE) });
  assert.equal(first.routes.length, 1);
  assert.equal(first.routes[0].kind, 'exact');
  assert.equal(first.routes[0].path, ROUTE_PATH);
  const route = first.routes[0];

  // Success path.
  const success = await call(route, makeReq(PAYLOAD));
  assert.equal(success.status, 200);
  assert.equal(success.body.code, VALID_CODE.trim());
  assert.equal(success.body.provider, 'alpha');
  assert.equal(success.body.model, 'alpha-flash');
  assert.ok(Array.isArray(success.body.warnings));
  assert.equal(first.calls[0].purpose, undefined, 'empty purpose map must not receive a purpose');
  assert.equal(first.calls[0].temperature, 0.2);
  assert.equal(first.calls[0].messages[0].content[0].type, 'text');
  assert.match(first.calls[0].system, /只输出代码/);
  assert.match(first.calls[0].system, /ticks_diff/);
  assert.match(first.calls[0].system, /非阻塞/);
  assert.doesNotMatch(first.calls[0].system, /延时必须用 time\.sleep/);
  assert.match(first.calls[0].system, /安全警告/);
  assert.match(first.calls[0].system, /0~4095/);
  assert.match(first.calls[0].system, /不要每 200ms 刷屏/);

  // Fallback when the first provider has no credential.
  const fallback = makeCtx({
    alpha: () => finishErrorStream('MISSING_CREDENTIAL', 'no key', ''),
    beta: () => okStream(VALID_CODE),
  });
  const fallbackResult = await call(fallback.routes[0], makeReq(PAYLOAD));
  assert.equal(fallbackResult.status, 200);
  assert.equal(fallbackResult.body.provider, 'beta', 'credential failure falls through to the next provider');

  // No fallback once a provider already streamed text.
  const partial = makeCtx({
    alpha: () => finishErrorStream('MISSING_CREDENTIAL', 'no key', 'partial'),
    beta: () => okStream(VALID_CODE),
  });
  const partialResult = await call(partial.routes[0], makeReq(PAYLOAD));
  assert.equal(partialResult.status, 502);
  assert.equal(partial.calls.length, 1, 'partial output is not silently regenerated');

  // Provider errors are mapped, raw messages are not leaked.
  const rateLimited = makeCtx({
    alpha: () => finishErrorStream('RATE_LIMIT', 'secret upstream detail', ''),
    beta: () => finishErrorStream('RATE_LIMIT', 'secret upstream detail', ''),
  });
  const limited = await call(rateLimited.routes[0], makeReq(PAYLOAD));
  assert.equal(limited.status, 502);
  assert.equal(limited.body.code, 'RATE_LIMIT');
  assert.equal(limited.body.error, providerMessage('RATE_LIMIT'));
  assert.doesNotMatch(limited.body.error, /secret upstream detail/);

  // Truncation warning.
  const truncatedCtx = makeCtx({ alpha: () => maxTokensStream(VALID_CODE), beta: () => okStream(VALID_CODE) });
  const truncatedResult = await call(truncatedCtx.routes[0], makeReq(PAYLOAD));
  assert.equal(truncatedResult.status, 200);
  assert.ok(truncatedResult.body.warnings.includes('truncated'));

  // Request guards.
  const method = await call(route, makeReq(PAYLOAD, { method: 'GET' }));
  assert.equal(method.status, 405);

  const media = await call(route, makeReq(PAYLOAD, { headers: { 'content-type': 'text/plain' } }));
  assert.equal(media.status, 415);

  const crossOrigin = await call(route, makeReq(PAYLOAD, { headers: { origin: 'http://evil.example' } }));
  assert.equal(crossOrigin.status, 403);

  const empty = await call(route, makeReq({ ...PAYLOAD, logic: '   ' }));
  assert.equal(empty.status, 400);
  assert.equal(empty.body.code, 'EMPTY_LOGIC');

  const badJson = await call(route, makeReq('{oops'));
  assert.equal(badJson.status, 400);
  assert.equal(badJson.body.code, 'BAD_JSON');

  const huge = await call(route, makeReq({ ...PAYLOAD, logic: 'x'.repeat(9000) }));
  assert.equal(huge.status, 413);
  assert.equal(huge.body.code, 'BODY_TOO_LARGE');

  const noPins = await call(route, makeReq({ ...PAYLOAD, input: { ...PAYLOAD.input, pins: [] } }));
  assert.equal(noPins.status, 400);
  assert.equal(noPins.body.code, 'BAD_PAYLOAD');

  const noProvider = {
    effect: (callback) => callback(),
    webServer: { getOrigin: () => 'http://127.0.0.1:9162', register: (handler) => { noProvider.route = handler; return () => {}; } },
    llm: { listProviders: () => [], listModels: async () => [] },
  };
  apply(noProvider);
  const noAdapter = await call(noProvider.route, makeReq(PAYLOAD));
  assert.equal(noAdapter.status, 502);
  assert.equal(noAdapter.body.code, 'NO_ADAPTER');

  // Provider failure helpers are exported for other tests.
  assert.equal(new ProviderFailure('AUTH', 'x').code, 'AUTH');

  console.log('host route tests passed');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
