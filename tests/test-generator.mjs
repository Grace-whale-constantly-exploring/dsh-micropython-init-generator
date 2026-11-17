import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const source = readFileSync(new URL('client.js', root), 'utf8');
let definition;
globalThis.window = {
  __ModuleLoader__: {
    load(value) {
      definition = value;
    },
  },
};
vm.runInThisContext(source, { filename: 'client.js' });
assert.ok(definition, 'module definition was captured');
const mod = definition.factory(() => ({
  createElement() {},
  useState() {},
  useEffect() {},
  useRef() {},
}));
const { analyze, detectSensor, detectRelay, buildAiPayload, EN, ZH } = mod.__internals;
const t = (key) => (EN[key] === undefined ? key : EN[key]);

const defaults = {
  inputCategory: 'digital',
  inputModel: '漏水传感器',
  inputPin: 'D18',
  outputCategory: 'digital',
  outputType: 'relay',
  outputModel: '1 路 5V 继电器模块',
  outputPin: 'D26',
  outputDirPin: 'D27',
  invert: false,
};

function run(overrides = {}) {
  return analyze({ ...defaults, ...overrides }, t);
}

function expectReady(result, label) {
  assert.equal(result.errors.length, 0, label + ' errors: ' + result.errors.join(' | '));
  assert.equal(result.ready, true, label + ' should be ready');
  assert.ok(result.code.length > 0, label + ' should have code');
}

// Locale completeness.
assert.deepEqual(Object.keys(EN).sort(), Object.keys(ZH).sort(), 'locale key sets differ');
for (const key of Object.keys(EN)) {
  assert.ok(EN[key].length > 0, 'empty EN value: ' + key);
  assert.ok(ZH[key].length > 0, 'empty ZH value: ' + key);
}

// Every literal translate key and every library/suggestion key resolves in both locales.
const literalKeys = new Set([...source.matchAll(/\bt\('([^']+)'\)/g)].map((match) => match[1]));
for (const key of literalKeys) {
  assert.ok(EN[key] !== undefined, 'missing EN key: ' + key);
  assert.ok(ZH[key] !== undefined, 'missing ZH key: ' + key);
}
const suggestionIds = [
  'hc-sr501', 'am312', 'rcwl-0516', 'button', 'reed', 'float', 'flame', 'leak', 'soil-digital',
  'dht11', 'dht22', 'hc-sr04', 'analog', 'generic-sensor',
  'relay-module', 'relay-low', 'relay-high', 'ssr', 'bare-relay',
  'servo-sg90', 'servo-mg996r', 'motor-l298n', 'motor-tb6612',
];
for (const id of suggestionIds) {
  assert.ok(EN['suggest.' + id] !== undefined, 'missing EN suggestion: ' + id);
  assert.ok(ZH['suggest.' + id] !== undefined, 'missing ZH suggestion: ' + id);
}
for (const key of ['event.temperature.fail', 'event.distance.fail']) {
  assert.ok(EN[key] !== undefined, 'missing EN event fail: ' + key);
  assert.ok(ZH[key] !== undefined, 'missing ZH event fail: ' + key);
}
for (const key of ['category.digital', 'category.analog', 'category.communication', 'category.pwm']) {
  assert.ok(EN[key] !== undefined, 'missing EN category: ' + key);
  assert.ok(ZH[key] !== undefined, 'missing ZH category: ' + key);
}
for (const key of ['outputType.relay', 'outputType.servo', 'outputType.motor']) {
  assert.ok(EN[key] !== undefined, 'missing EN output type: ' + key);
  assert.ok(ZH[key] !== undefined, 'missing ZH output type: ' + key);
}
for (const key of ['output.relayOn', 'output.relayOff', 'output.servoOn', 'output.servoOff', 'output.motorOn', 'output.motorOff', 'output.uartOn', 'output.uartOff', 'output.pwmRelayOn', 'output.pwmRelayOff', 'output.digitalOn', 'output.digitalOff']) {
  assert.ok(EN[key] !== undefined, 'missing EN output key: ' + key);
  assert.ok(ZH[key] !== undefined, 'missing ZH output key: ' + key);
}
for (const entry of [...mod.__internals.SENSOR_LIBRARY, ...mod.__internals.RELAY_LIBRARY, mod.__internals.GENERIC_SENSOR, mod.__internals.GENERIC_RELAY]) {
  assert.ok(EN[entry.labelKey] !== undefined, 'missing EN label: ' + entry.labelKey);
  assert.ok(ZH[entry.labelKey] !== undefined, 'missing ZH label: ' + entry.labelKey);
  assert.ok(EN[entry.pullHintKey] !== undefined, 'missing EN pull hint: ' + entry.pullHintKey);
  assert.ok(ZH[entry.pullHintKey] !== undefined, 'missing ZH pull hint: ' + entry.pullHintKey);
  for (const noteKey of entry.noteKeys || []) {
    assert.ok(EN[noteKey] !== undefined, 'missing EN note: ' + noteKey);
    assert.ok(ZH[noteKey] !== undefined, 'missing ZH note: ' + noteKey);
  }
  if (entry.event) {
    assert.ok(EN['event.' + entry.event + '.on'] !== undefined, 'missing EN event on: ' + entry.event);
    assert.ok(ZH['event.' + entry.event + '.on'] !== undefined, 'missing ZH event on: ' + entry.event);
    assert.ok(EN['event.' + entry.event + '.off'] !== undefined, 'missing EN event off: ' + entry.event);
    assert.ok(ZH['event.' + entry.event + '.off'] !== undefined, 'missing ZH event off: ' + entry.event);
  }
}

const defaultResult = run();
expectReady(defaultResult, 'default');
assert.equal(defaultResult.inputKind, 'digital');
assert.equal(defaultResult.outputKind, 'relay');
assert.equal(defaultResult.inputActive, 0);
assert.equal(defaultResult.outputActive, 0);
assert.match(defaultResult.code, /input_pin = machine\.Pin\(18, machine\.Pin\.IN, machine\.Pin\.PULL_UP\)/);
assert.match(defaultResult.code, /output_pin = machine\.Pin\(26, machine\.Pin\.OUT\)/);
assert.match(defaultResult.code, /INPUT_DEBOUNCE_MS = 30/);
assert.match(defaultResult.code, /LOOP_DELAY_MS = 500/);
assert.match(defaultResult.code, /def read_input\(\):/);
assert.match(defaultResult.code, /active = reading == INPUT_ACTIVE_LEVEL/);
assert.match(defaultResult.code, /print\("\[ALERT\] Water leak detected!"\)/);
assert.match(defaultResult.code, /print\("\[OUTPUT\] Relay engaged\."\)/);
assert.match(defaultResult.code, /drive_output\(active\)/);
assert.match(defaultResult.code, /time\.sleep_ms\(LOOP_DELAY_MS\)/);

const zhT = (key) => (ZH[key] === undefined ? key : ZH[key]);
const zhDefault = analyze(defaults, zhT);
expectReady(zhDefault, 'default zh');
assert.match(zhDefault.code, /电平反转：关闭/);
assert.match(zhDefault.code, /触发时输入输出 0，空闲时输出 1/);
assert.match(zhDefault.code, /【警告】检测到漏水！/);
assert.match(zhDefault.code, /【输出】继电器吸合。/);

const invertedResult = run({ invert: true });
expectReady(invertedResult, 'inverted');
assert.equal(invertedResult.inputActive, 1);
assert.equal(invertedResult.outputActive, 1);
assert.match(invertedResult.code, /INPUT_ACTIVE_LEVEL = 1/);
assert.match(invertedResult.code, /OUTPUT_ACTIVE_LEVEL = 1/);
assert.match(invertedResult.code, /output_pin\.value\(0\)/);
assert.match(invertedResult.code, /Invert active level: ON/);

const analogResult = run({ inputCategory: 'analog', inputModel: '模拟量传感器', inputPin: 'D34' });
expectReady(analogResult, 'analog input + relay');
assert.equal(analogResult.inputKind, 'analog');
assert.match(analogResult.code, /input_adc = machine\.ADC\(machine\.Pin\(34\)\)/);
assert.match(analogResult.code, /INPUT_SAMPLES = 5/);
assert.match(analogResult.code, /total \/\/ INPUT_SAMPLES/);
assert.match(analogResult.code, /active = reading > INPUT_THRESHOLD/);
assert.match(analogResult.code, /print\("\[ALERT\] Analog value above threshold\."\)/);

const servoResult = run({
  inputCategory: 'analog',
  inputModel: '模拟量传感器',
  inputPin: 'D34',
  outputCategory: 'pwm',
  outputType: 'servo',
  outputModel: 'SG90',
  outputPin: 'D25',
  outputDirPin: '',
});
expectReady(servoResult, 'analog input + servo');
assert.equal(servoResult.outputKind, 'servo');
assert.match(servoResult.code, /output_pwm = machine\.PWM\(machine\.Pin\(25\), freq=50\)/);
assert.match(servoResult.code, /SERVO_ACTIVE_ANGLE = 90/);
assert.match(servoResult.code, /def set_angle\(angle\):/);
assert.match(servoResult.code, /set_angle\(SERVO_ACTIVE_ANGLE\)/);
assert.match(servoResult.code, /print\("\[OUTPUT\] Servo at 90°\."\)/);

const motorResult = run({
  outputCategory: 'pwm',
  outputType: 'motor',
  outputModel: 'L298N',
  outputPin: 'D25',
  outputDirPin: 'D27',
});
expectReady(motorResult, 'digital input + motor');
assert.equal(motorResult.outputKind, 'motor');
assert.match(motorResult.code, /output_pwm = machine\.PWM\(machine\.Pin\(25\), freq=1000\)/);
assert.match(motorResult.code, /MOTOR_SPEED_PERCENT = 60/);
assert.match(motorResult.code, /output_dir = machine\.Pin\(27, machine\.Pin\.OUT\)/);
assert.match(motorResult.code, /output_dir\.value\(1\)/);
assert.match(motorResult.code, /output_pwm\.duty_u16\(MOTOR_SPEED_PERCENT \* 65535 \/\/ 100\)/);
assert.match(motorResult.code, /print\("\[OUTPUT\] Motor running at 60%\."\)/);

const motorNoDir = run({ outputCategory: 'pwm', outputType: 'motor', outputModel: 'L298N', outputPin: 'D25', outputDirPin: '' });
expectReady(motorNoDir, 'motor without direction pin');
assert.doesNotMatch(motorNoDir.code, /output_dir/);
assert.ok(motorNoDir.tips.some((tip) => /direction pin/.test(tip.text)), 'motor direction warning missing');

const dhtResult = run({ inputCategory: 'communication', inputModel: 'DHT22', inputPin: 'D18' });
expectReady(dhtResult, 'dht + relay');
assert.equal(dhtResult.inputKind, 'dht22');
assert.match(dhtResult.code, /import dht/);
assert.match(dhtResult.code, /input_sensor = dht\.DHT22\(machine\.Pin\(18, machine\.Pin\.IN, machine\.Pin\.PULL_UP\)\)/);
assert.match(dhtResult.code, /INPUT_TEMP_THRESHOLD = 30\.0/);
assert.match(dhtResult.code, /active = temperature >= INPUT_TEMP_THRESHOLD/);
assert.match(dhtResult.code, /print\("\[ALERT\] Temperature above threshold\."\)/);

const ultrasonicResult = run({ inputCategory: 'communication', inputModel: 'HC-SR04', inputPin: 'D18, D19' });
expectReady(ultrasonicResult, 'ultrasonic + relay');
assert.equal(ultrasonicResult.inputKind, 'ultrasonic');
assert.match(ultrasonicResult.code, /INPUT_TRIG = machine\.Pin\(18, machine\.Pin\.OUT\)/);
assert.match(ultrasonicResult.code, /INPUT_ECHO = machine\.Pin\(19, machine\.Pin\.IN\)/);
assert.match(ultrasonicResult.code, /machine\.time_pulse_us/);
assert.match(ultrasonicResult.code, /active = reading < INPUT_DISTANCE_THRESHOLD_CM/);

const i2cResult = run({ inputCategory: 'communication', inputModel: 'BME280 I2C', inputPin: 'D21, D22' });
expectReady(i2cResult, 'i2c + relay');
assert.equal(i2cResult.inputKind, 'i2c');
assert.match(i2cResult.code, /input_i2c = machine\.I2C\(0, scl=machine\.Pin\(22\), sda=machine\.Pin\(21\), freq=400000\)/);
assert.match(i2cResult.code, /devices = input_i2c\.scan\(\)/);
assert.ok(i2cResult.tips.some((tip) => /I2C is a generic template/.test(tip.text)), 'i2c template warning missing');

const uartInputResult = run({ inputCategory: 'communication', inputModel: 'GPS UART', inputPin: 'D16, D17' });
expectReady(uartInputResult, 'uart input + relay');
assert.equal(uartInputResult.inputKind, 'uart');
assert.match(uartInputResult.code, /input_uart = machine\.UART\(1, baudrate=9600, tx=machine\.Pin\(16\), rx=machine\.Pin\(17\)\)/);
assert.match(uartInputResult.code, /INPUT_TRIGGER_KEYWORD = b"ALARM"/);
assert.match(uartInputResult.code, /active = bool\(reading\) and INPUT_TRIGGER_KEYWORD in reading/);

const uartOutputResult = run({ outputCategory: 'communication', outputType: 'relay', outputPin: 'D26' });
expectReady(uartOutputResult, 'relay + uart output');
assert.equal(uartOutputResult.outputKind, 'uart');
assert.match(uartOutputResult.code, /output_uart = machine\.UART\(2, baudrate=9600, tx=machine\.Pin\(26\)\)/);
assert.match(uartOutputResult.code, /OUTPUT_ON_COMMAND/);
assert.match(uartOutputResult.code, /output_uart\.write\(OUTPUT_ON_COMMAND\)/);
assert.ok(uartOutputResult.tips.some((tip) => /UART is a generic template/.test(tip.text)), 'uart template warning missing');

const mismatchInput = run({ inputCategory: 'digital', inputModel: 'DHT22' });
expectReady(mismatchInput, 'input category mismatch');
assert.ok(mismatchInput.tips.some((tip) => /input category differs/.test(tip.text)), 'input mismatch warning missing');

const mismatchOutput = run({ outputCategory: 'digital', outputType: 'servo', outputModel: 'SG90', outputPin: 'D25', outputDirPin: '' });
expectReady(mismatchOutput, 'output category mismatch');
assert.equal(mismatchOutput.outputKind, 'digital');
assert.ok(mismatchOutput.tips.some((tip) => /output category differs/.test(tip.text)), 'output mismatch warning missing');
assert.ok(mismatchOutput.tips.some((tip) => /simple on\/off pin/.test(tip.text)), 'digital servo warning missing');

const pwmRelay = run({ outputCategory: 'pwm', outputType: 'relay', outputPin: 'D26', outputDirPin: '' });
expectReady(pwmRelay, 'pwm relay');
assert.equal(pwmRelay.outputKind, 'pwm-relay');
assert.match(pwmRelay.code, /output_pwm = machine\.PWM\(machine\.Pin\(26\), freq=1000\)/);
assert.ok(pwmRelay.tips.some((tip) => /0%\/100%/.test(tip.text)), 'pwm relay warning missing');

const inputCount = run({ inputCategory: 'analog', inputPin: 'D34, D35' });
assert.ok(inputCount.errors.length > 0, 'input pin count must error');
assert.match(inputCount.errors.join(' '), /needs 1 pins/);

const outputInputOnly = run({ outputPin: 'D34' });
assert.ok(outputInputOnly.errors.length > 0, 'input-only output must error');
assert.match(outputInputOnly.errors.join(' '), /input-only/);

const sameIo = run({ outputPin: 'D18' });
assert.ok(sameIo.errors.length > 0, 'input/output same pin must error');
assert.match(sameIo.errors.join(' '), /cannot share/);

const dirSame = run({ outputCategory: 'pwm', outputType: 'motor', outputModel: 'L298N', outputPin: 'D25', outputDirPin: 'D25' });
assert.ok(dirSame.errors.length > 0, 'direction/output same pin must error');
assert.match(dirSame.errors.join(' '), /direction pin/);

const i2cInputOnly = run({ inputCategory: 'communication', inputModel: 'BME280 I2C', inputPin: 'D34, D22' });
assert.ok(i2cInputOnly.errors.length > 0, 'i2c input-only must error');
assert.match(i2cInputOnly.errors.join(' '), /bidirectional/);

const uartTxInputOnly = run({ inputCategory: 'communication', inputModel: 'GPS UART', inputPin: 'D34, D17' });
assert.ok(uartTxInputOnly.errors.length > 0, 'uart tx input-only must error');
assert.match(uartTxInputOnly.errors.join(' '), /UART TX/);

const analogWrongPin = run({ inputCategory: 'analog', inputModel: '模拟量传感器', inputPin: 'D18' });
assert.ok(analogWrongPin.errors.length > 0, 'analog on non-ADC pin must error');
assert.match(analogWrongPin.errors.join(' '), /ADC/);

const flashPin = run({ inputPin: 'D6' });
assert.ok(flashPin.errors.length > 0, 'flash pin must error');
assert.match(flashPin.errors.join(' '), /SPI flash/);

const inputOnlySwitch = run({ inputModel: '按键开关', inputPin: 'D34' });
expectReady(inputOnlySwitch, 'input-only switch');
assert.equal(inputOnlySwitch.inputPullKind, 'external');
assert.match(inputOnlySwitch.code, /input_pin = machine\.Pin\(34, machine\.Pin\.IN\)/);
assert.doesNotMatch(inputOnlySwitch.code, /machine\.Pin\.PULL_UP|machine\.Pin\.PULL_DOWN/);

const customInput = run({ inputModel: '自定义XYZ', inputPin: 'D18' });
expectReady(customInput, 'custom input');
assert.ok(customInput.tips.some((tip) => /Custom input model/.test(tip.text)), 'custom input warning missing');

const customOutput = run({ outputModel: 'XYZ-999', outputPin: 'D26' });
expectReady(customOutput, 'custom output');
assert.ok(customOutput.tips.some((tip) => /Custom output model/.test(tip.text)), 'custom output warning missing');

const blank = run({ inputModel: '' });
assert.equal(blank.incomplete, true);
assert.equal(blank.ready, false);
assert.equal(blank.code, '');

assert.equal(detectSensor('HC-SR501').kind, 'digital');
assert.equal(detectSensor('DHT11').kind, 'dht11');
assert.equal(detectSensor('HC-SR04').kind, 'ultrasonic');
assert.equal(detectSensor('模拟量传感器').kind, 'analog');
assert.equal(detectSensor('漏水传感器').event, 'leak');
assert.equal(detectRelay('低电平触发继电器模块').active, 0);
assert.equal(detectRelay('高电平触发继电器模块').active, 1);
assert.equal(detectRelay('SRD-05VDC-SL-C').kind, 'bare');
assert.equal(detectRelay('SRD-05VDC-SL-C 继电器模块').kind, 'module');
assert.equal(detectRelay('G3MB-202P 固态继电器').kind, 'ssr');

// --- V3: compact AI payload contains only hardware parameters + the sentence ---
const logic = '如果漏水传感器检测到漏水，并且光敏电阻数值小于1000，那么让继电器吸合5秒后断开';
const aiForm = { ...defaults, customLogic: logic };
const aiAnalysis = analyze(aiForm, t);
const aiPayload = buildAiPayload(aiForm, aiAnalysis);
assert.equal(aiPayload.logic, logic);
assert.deepEqual(aiPayload.input.pins, [18]);
assert.deepEqual(aiPayload.output.pins, [26]);
assert.equal(aiPayload.input.activeLevel, 0);
assert.equal(aiPayload.output.activeLevel, 0);
assert.equal(aiPayload.invert, false);
assert.equal(aiPayload.output.dirPin, null);
assert.equal('localCode' in aiPayload, false, 'local code must not be sent to the model');
assert.equal('customLogic' in aiPayload, false, 'raw form field must not be duplicated');
assert.equal('suggest' in aiPayload, false);
assert.ok(JSON.stringify(aiPayload).length < 900, 'payload must stay compact');
assert.doesNotMatch(JSON.stringify(aiPayload), /function read_input|machine\.Pin/, 'payload must not contain generated code');

const analogAi = buildAiPayload({ ...defaults, inputCategory: 'analog', inputModel: 'LDR', inputPin: 'D34', customLogic: 'x' }, analyze({ ...defaults, inputCategory: 'analog', inputModel: 'LDR', inputPin: 'D34' }, t));
assert.deepEqual(analogAi.input.pins, [34]);
assert.equal(analogAi.input.activeLevel, null, 'analog input has no digital active level');

const motorAiForm = { ...defaults, outputCategory: 'pwm', outputType: 'motor', outputModel: 'L298N', outputPin: 'D25', outputDirPin: 'D27', customLogic: 'x' };
const motorAi = buildAiPayload(motorAiForm, analyze(motorAiForm, t));
assert.deepEqual(motorAi.output.pins, [25]);
assert.equal(motorAi.output.dirPin, 27);
assert.equal(motorAi.output.activeLevel, null);

// --- V4.0: high-power safety detection and code header ---
assert.equal(defaultResult.safety.highPower, false);
assert.doesNotMatch(defaultResult.code, /SAFETY WARNING/);

const pumpRun = run({ outputModel: '220V 水泵', customLogic: '漏水时启动水泵 5 秒后停止' });
expectReady(pumpRun, 'high-power pump');
assert.equal(pumpRun.safety.highPower, true);
assert.ok(pumpRun.safety.matched.includes('泵'));
assert.ok(pumpRun.safety.matched.includes('220v'));
assert.match(pumpRun.code, /^# -\*- coding: utf-8 -\*-\n# ={10,}/);
assert.match(pumpRun.code, /SAFETY WARNING/);
assert.match(pumpRun.code, /independent power supply/i);
assert.match(pumpRun.code, /Never drive a high-power load directly/);

const motorRun = run({ outputCategory: 'pwm', outputType: 'motor', outputModel: 'L298N', outputPin: 'D25' });
expectReady(motorRun, 'motor high-power');
assert.equal(motorRun.safety.highPower, true);

const lowVoltRun = run({ outputModel: '1 路 5V 继电器模块', customLogic: '检测到漏水时吸合 1 秒' });
assert.equal(lowVoltRun.safety.highPower, false);
assert.doesNotMatch(lowVoltRun.code, /SAFETY WARNING/);

console.log('generator tests passed');
console.log('default code:\n' + defaultResult.code);
