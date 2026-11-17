import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../client.js', import.meta.url), 'utf8');
let definition;
globalThis.window = { __ModuleLoader__: { load(value) { definition = value; } } };
vm.runInThisContext(source, { filename: 'client.js' });

let stateCursor = 0;
let effectCursor = 0;
let states = [];
const React = {
  createElement(type, props, ...children) {
    return {
      type: typeof type === 'function' ? (type.name || 'Component') : type,
      props: props || {},
      children: children.flat(Infinity).filter((child) => child !== null && child !== undefined && child !== false),
    };
  },
  useState(initial) {
    const index = stateCursor++;
    if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial;
    return [states[index], (value) => { states[index] = value; }];
  },
  useEffect() {
    effectCursor++;
  },
  useRef(initial) {
    return { current: initial };
  },
};
const mod = definition.factory(() => React);
const { Panel, EN, ZH } = mod.__internals;

function localeFor(dict) {
  return {
    getSnapshot: () => ({ revision: 1 }),
    subscribe: () => () => {},
    bind: () => (key) => (dict[key] === undefined ? key : dict[key]),
  };
}

function render(form, invert, aiCode = '', safetyAck = false) {
  stateCursor = 0;
  effectCursor = 0;
  states = [1, { ...form, invert }, true, false, false, false, '', aiCode, [], safetyAck];
  return Panel({ locale: localeFor(EN) });
}

function renderInitial() {
  stateCursor = 0;
  effectCursor = 0;
  states = [];
  states[2] = true;
  states[3] = false;
  states[4] = false;
  return Panel({ locale: localeFor(EN) });
}

function flattenText(node) {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node) + ' ';
  if (Array.isArray(node)) return node.map(flattenText).join('');
  return flattenText(node.children);
}

function findNodes(node, predicate, out = []) {
  if (node === null || node === undefined || typeof node !== 'object') return out;
  if (Array.isArray(node)) {
    for (const child of node) findNodes(child, predicate, out);
    return out;
  }
  if (predicate(node)) out.push(node);
  findNodes(node.children, predicate, out);
  return out;
}

const base = {
  inputCategory: 'digital',
  inputModel: '漏水传感器',
  inputPin: 'D18',
  outputCategory: 'digital',
  outputType: 'relay',
  outputModel: '1 路 5V 继电器模块',
  outputPin: 'D26',
  outputDirPin: 'D27',
};

const initialTree = renderInitial();
const initialText = flattenText(initialTree);
assert.match(initialText, /Input module/);
assert.match(initialText, /Output module/);
assert.match(initialText, /Water leak sensor/);
const initialCodeArea = findNodes(initialTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code')[0];
assert.match(initialCodeArea.props.value, /print\("\[ALERT\] Water leak detected!"\)/);
assert.match(initialCodeArea.props.value, /input_pin = machine\.Pin\(18, machine\.Pin\.IN, machine\.Pin\.PULL_UP\)/);

const defaultTree = render(base, false);
const defaultText = flattenText(defaultTree);
assert.match(defaultText, /Input category/);
assert.match(defaultText, /Output category/);
assert.match(defaultText, /Output type/);
assert.match(defaultText, /Digital/);
assert.match(defaultText, /Relay/);
assert.match(defaultText, /No resistor needed/);
const defaultCodeArea = findNodes(defaultTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code')[0];
assert.match(defaultCodeArea.props.value, /def read_input\(\):/);
assert.match(defaultCodeArea.props.value, /INPUT_DEBOUNCE_MS = 30/);
assert.match(defaultCodeArea.props.value, /print\("\[OUTPUT\] Relay engaged\."\)/);

const selects = findNodes(defaultTree, (node) => node.type === 'select');
assert.equal(selects.length, 3);
assert.equal(selects[0].props.value, 'digital');
assert.equal(selects[1].props.value, 'digital');
assert.equal(selects[2].props.value, 'relay');

const invertTree = render(base, true);
const invertCodeArea = findNodes(invertTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code')[0];
assert.match(invertCodeArea.props.value, /INPUT_ACTIVE_LEVEL = 1/);
assert.match(invertCodeArea.props.value, /OUTPUT_ACTIVE_LEVEL = 1/);
assert.match(invertCodeArea.props.value, /output_pin\.value\(0\)/);
assert.match(flattenText(invertTree), /inverted/);

const servoTree = render({
  ...base,
  inputCategory: 'analog',
  inputModel: '模拟量传感器',
  inputPin: 'D34',
  outputCategory: 'pwm',
  outputType: 'servo',
  outputModel: 'SG90',
  outputPin: 'D25',
  outputDirPin: '',
}, false);
const servoText = flattenText(servoTree);
assert.match(servoText, /Servo/);
assert.match(servoText, /PWM/);
const servoCodeArea = findNodes(servoTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code')[0];
assert.match(servoCodeArea.props.value, /input_adc = machine\.ADC\(machine\.Pin\(34\)\)/);
assert.match(servoCodeArea.props.value, /output_pwm = machine\.PWM\(machine\.Pin\(25\), freq=50\)/);
assert.match(servoCodeArea.props.value, /SERVO_ACTIVE_ANGLE = 90/);

const motorTree = render({
  ...base,
  outputCategory: 'pwm',
  outputType: 'motor',
  outputModel: 'L298N',
  outputPin: 'D25',
  outputDirPin: 'D27',
}, false);
const motorText = flattenText(motorTree);
assert.match(motorText, /Direction pin \(motor, optional\)/);
const motorCodeArea = findNodes(motorTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code')[0];
assert.match(motorCodeArea.props.value, /output_dir = machine\.Pin\(27, machine\.Pin\.OUT\)/);
assert.match(motorCodeArea.props.value, /MOTOR_SPEED_PERCENT = 60/);

const dhtTree = render({
  ...base,
  inputCategory: 'communication',
  inputModel: 'DHT22',
  inputPin: 'D18',
  outputCategory: 'digital',
  outputType: 'relay',
  outputModel: '1 路 5V 继电器模块',
  outputPin: 'D26',
}, false);
const dhtText = flattenText(dhtTree);
assert.match(dhtText, /DHT22/);
assert.match(dhtText, /Communication/);
const dhtCodeArea = findNodes(dhtTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code')[0];
assert.match(dhtCodeArea.props.value, /import dht/);
assert.match(dhtCodeArea.props.value, /dht\.DHT22\(machine\.Pin\(18, machine\.Pin\.IN, machine\.Pin\.PULL_UP\)\)/);

const i2cTree = render({
  ...base,
  inputCategory: 'communication',
  inputModel: 'BME280 I2C',
  inputPin: 'D21, D22',
  outputCategory: 'digital',
  outputType: 'relay',
  outputModel: '1 路 5V 继电器模块',
  outputPin: 'D26',
}, false);
const i2cCodeArea = findNodes(i2cTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code')[0];
assert.match(i2cCodeArea.props.value, /input_i2c = machine\.I2C\(0, scl=machine\.Pin\(22\), sda=machine\.Pin\(21\), freq=400000\)/);

const uartOutputTree = render({
  ...base,
  outputCategory: 'communication',
  outputType: 'relay',
  outputPin: 'D26',
}, false);
const uartOutputCodeArea = findNodes(uartOutputTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code')[0];
assert.match(uartOutputCodeArea.props.value, /output_uart = machine\.UART\(2, baudrate=9600, tx=machine\.Pin\(26\)\)/);

const errorTree = render({ ...base, outputPin: 'D34' }, false);
const errorText = flattenText(errorTree);
assert.match(errorText, /Fix before running/);
assert.match(errorText, /input-only/);
assert.match(errorText, /Fix the pin errors first/);
assert.equal(findNodes(errorTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code').length, 0);

const blankTree = render({ ...base, inputModel: '' }, false);
const blankText = flattenText(blankTree);
assert.match(blankText, /Enter a model or use the category template/);
assert.match(blankText, /Enter a model and pins to generate code automatically/);

const bareTree = render({ ...base, outputModel: 'SRD-05VDC-SL-C' }, false);
const bareText = flattenText(bareTree);
assert.match(bareText, /Transistor \/ MOSFET driver needed/);
assert.match(bareText, /GPIO cannot drive a relay coil directly/);

const zhLocaleTree = (() => {
  stateCursor = 0;
  effectCursor = 0;
  states = [1, { ...base, invert: false }, true, false, false];
  return Panel({ locale: localeFor(ZH) });
})();
const zhText = flattenText(zhLocaleTree);
assert.match(zhText, /MicroPython 输入\/输出代码生成器/);
assert.match(zhText, /输入模块/);
assert.match(zhText, /输出模块/);
assert.match(zhText, /输入分类/);
assert.match(zhText, /输出分类/);
assert.match(zhText, /输出类型/);
const zhCodeArea = findNodes(zhLocaleTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code')[0];
assert.match(zhCodeArea.props.value, /【警告】检测到漏水！/);
assert.match(zhCodeArea.props.value, /【输出】继电器吸合。/);
assert.match(zhText, /自定义逻辑（自然语言，可选）/);
assert.match(zhText, /AI 生成高阶代码/);
assert.match(zhText, /插件不会自动烧录或执行生成的代码/);

// --- V3: natural-language card and AI preview ---
const logicArea = findNodes(defaultTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-logic')[0];
assert.ok(logicArea, 'custom logic textarea exists');
assert.match(logicArea.props.placeholder, /leak sensor/i);
assert.equal(logicArea.props.maxLength, 500);

const findButton = (tree, label) => findNodes(tree, (node) => node.type === 'button' && flattenText(node).trim() === label)[0];
const emptyAiButton = findButton(defaultTree, 'AI generate advanced code');
assert.ok(emptyAiButton, 'AI button exists');
assert.equal(emptyAiButton.props.disabled, true, 'AI button is disabled without logic');
assert.match(flattenText(defaultTree), /Local rules/);
assert.match(flattenText(defaultTree), /Review every line before use/);

const readyLogicTree = render({ ...base, customLogic: 'Leak and LDR below 1000, relay 5s.' }, false);
assert.equal(findButton(readyLogicTree, 'AI generate advanced code').props.disabled, false);

const notReadyTree = render({ ...base, outputPin: 'D34', customLogic: 'Leak then relay.' }, false);
assert.equal(findButton(notReadyTree, 'AI generate advanced code').props.disabled, true);
assert.match(flattenText(notReadyTree), /Fix the pin errors above before asking the AI/);

const aiCode = '# -*- coding: utf-8 -*-\nimport machine\nimport time\n\nprint("AI")\n';
const aiTree = render({ ...base, customLogic: 'Leak then relay 5s.' }, false, aiCode);
const aiPreview = findNodes(aiTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code');
assert.equal(aiPreview.length, 1, 'exactly one code preview');
assert.equal(aiPreview[0].props.value, aiCode, 'AI code is shown verbatim');
const aiText = flattenText(aiTree);
assert.match(aiText, /AI generated · review required/);
assert.match(aiText, /Discard AI result/);
assert.equal(aiText.includes('Local rules'), false, 'AI output is not labelled as local rules');
assert.equal(findButton(aiTree, 'Copy code').props.disabled, false);

// --- V4.0: high-power electrical safety gate ---
const pumpForm = {
  ...base,
  outputModel: '220V 水泵',
  customLogic: '如果漏水，启动水泵运行 5 秒后停止。',
};
const pumpTree = render(pumpForm, false);
const pumpText = flattenText(pumpTree);
assert.match(pumpText, /Electrical safety warning/);
assert.match(pumpText, /Detected .*泵/);
assert.match(pumpText, /independent power supply/i);
assert.match(pumpText, /Acknowledge the electrical safety warning before generating or copying code/);
assert.equal(findButton(pumpTree, 'AI generate advanced code').props.disabled, true);
assert.equal(findButton(pumpTree, 'Copy code').props.disabled, true);
const pumpCodeArea = findNodes(pumpTree, (node) => node.type === 'textarea' && node.props.className === 'mpygen-code')[0];
assert.match(pumpCodeArea.props.value, /SAFETY WARNING/);
assert.match(pumpCodeArea.props.value, /Never drive a high-power load directly/);

const pumpAckTree = render(pumpForm, false, '', true);
const pumpAckText = flattenText(pumpAckTree);
assert.doesNotMatch(pumpAckText, /Acknowledge the electrical safety warning/);
assert.equal(findButton(pumpAckTree, 'AI generate advanced code').props.disabled, false);
assert.equal(findButton(pumpAckTree, 'Copy code').props.disabled, false);

const lowPowerTree = render({ ...base, outputModel: '1 路 5V 继电器模块' }, false);
assert.doesNotMatch(flattenText(lowPowerTree), /Electrical safety warning/);

console.log('render smoke tests passed');
