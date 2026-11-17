window.__ModuleLoader__.load({
  id: 'dsh-micropython-init-generator',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = 'micropython-init';
    const PLUGIN_ID = 'micropython-init-generator';

    const EN = {
      launcher: 'MicroPython input/output code generator',
      launcherShort: 'µPy I/O',
      title: 'MicroPython input/output code generator',
      subtitle: 'Choose an input category and an output category/type, then generate MicroPython with the right library, logs, and debounce.',
      close: 'Close',
      exampleBadge: 'Example',
      exampleHint: 'Example values are filled in. Replace them with your own model and pins.',
      sensorSection: 'Input module',
      relaySection: 'Output module',
      modelLabel: 'Model (custom allowed)',
      modelPlaceholder: 'e.g. HC-SR501, or type a custom model',
      sensorPinLabel: 'Input pin(s)',
      relayPinLabel: 'Output pin',
      sensorPinPlaceholder: 'e.g. D18, or D18, D19 for two-pin modules',
      relayPinPlaceholder: 'e.g. D26',
      sensorPinHelp: 'The category decides the pin count; separate two pins with a comma.',
      relayPinHelp: 'The output signal pin, for example D26.',
      pinHelp: 'Classic ESP32 pin names: D18 = GPIO18.',
      emptyModel: 'Enter a model or use the category template',
      detected: 'Detected',
      generic: 'Generic template',
      notDetected: 'Not recognized',
      custom: 'Custom',
      pullTitle: 'Input pull-up / pull-down',
      pullNone: 'No resistor needed',
      pullUp: 'Pull-up recommended',
      pullDown: 'Pull-down recommended',
      pullExternal: 'External pull resistor needed',
      pullDriver: 'Driver circuit needed',
      pullAnalog: 'No resistor needed',
      pullUltrasonic: 'No resistor needed',
      relayPullTitle: 'Output drive',
      relayNone: 'No resistor needed',
      relayDriver: 'Transistor / MOSFET driver needed',
      relaySsr: 'Check module input voltage',
      relayServo: 'Separate servo power',
      relayMotor: 'Motor driver required',
      relayUart: 'UART command output',
      relayPwm: 'PWM output',
      relayDigital: 'Digital output',
      levelTitle: 'Active state',
      sensorLevel: 'Input trigger',
      relayLevel: 'Output action',
      levelHigh: 'HIGH (1)',
      levelLow: 'LOW (0)',
      levelThreshold: 'Threshold',
      levelServo: 'Angle 90°',
      levelMotor: 'Speed 60%',
      levelUart: 'UART command',
      levelPwm: 'PWM 100% / 0%',
      levelDigital: 'GPIO high / low',
      afterInvert: 'inverted',
      inputCategoryLabel: 'Input category',
      outputCategoryLabel: 'Output category',
      outputTypeLabel: 'Output type',
      outputDirPinLabel: 'Direction pin (motor, optional)',
      outputDirPinPlaceholder: 'e.g. D27',
      inputModelPlaceholder: 'e.g. HC-SR501, or a custom model',
      outputModelPlaceholder: 'e.g. relay module, SG90, L298N',
      customModelHint: 'Type any model; the selected category decides how the code is generated.',
      'category.digital': 'Digital',
      'category.analog': 'Analog',
      'category.communication': 'Communication',
      'category.pwm': 'PWM',
      'outputType.relay': 'Relay',
      'outputType.servo': 'Servo',
      'outputType.motor': 'Motor',
      'pinHint.inputDigital': 'Digital input: one signal pin, e.g. D18.',
      'pinHint.inputAnalog': 'Analog input: one ADC pin, e.g. D34.',
      'pinHint.inputDht': 'DHT data pin, e.g. D18.',
      'pinHint.inputUltrasonic': 'HC-SR04: TRIG, ECHO separated by a comma, e.g. D18, D19.',
      'pinHint.inputI2c': 'I2C: SDA, SCL separated by a comma, e.g. D21, D22.',
      'pinHint.inputUart': 'UART: TX, RX separated by a comma, e.g. D17, D16.',
      'pinHint.outputDigital': 'Digital output signal pin, e.g. D26.',
      'pinHint.outputServo': 'Servo signal pin (PWM), e.g. D26.',
      'pinHint.outputMotor': 'Motor PWM / EN pin, e.g. D26.',
      'pinHint.outputUart': 'UART TX pin, e.g. D26.',
      'pinHint.outputDir': 'Motor direction DIR pin (optional), e.g. D27.',
      invertLabel: 'Invert active level',
      invertHint: 'Swaps 0 and 1 in the if blocks. Digital sensors also flip their trigger level; the relay flips its on level.',
      invertNoteDigital: 'Digital sensor: both the trigger condition and relay output are inverted.',
      invertNoteThreshold: 'This sensor uses a threshold, so inversion only changes the relay 0/1 output.',
      invertUnused: 'Inversion does not apply to the current input/output combination.',
      outputTitle: 'Generated code',
      outputPlaceholder: 'Enter a model and pins to generate code automatically.',
      outputErrorPlaceholder: 'Fix the pin errors first.',
      copy: 'Copy code',
      copied: 'Copied',
      copyFailed: 'Copy failed. Select the code manually.',
      reset: 'Reset example',
      errorsTitle: 'Fix before running',
      tipsTitle: 'Wiring notes',
      noTips: 'No extra pin conflicts found.',
      footnote: 'Generated for classic ESP32 / MicroPython. Power off and check module voltage and polarity before wiring.',
      'default.sensor': 'Water leak sensor',
      'default.relay': '1-channel 5V relay module',
      'model.hc-sr501': 'HC-SR501 PIR motion sensor',
      'model.am312': 'AM312 PIR motion sensor',
      'model.rcwl-0516': 'RCWL-0516 microwave radar',
      'model.pir': 'Generic PIR motion sensor',
      'model.button': 'Button / touch switch',
      'model.reed': 'Reed / door switch',
      'model.float': 'Float level switch',
      'model.tilt': 'Tilt / ball switch',
      'model.vibration': 'Vibration switch',
      'model.flame': 'Flame sensor (digital output)',
      'model.rain': 'Rain sensor (digital output)',
      'model.leak': 'Water leak sensor (digital output)',
      'model.soil-digital': 'Soil moisture sensor (DO output)',
      'model.obstacle': 'Infrared obstacle sensor',
      'model.line': 'Line tracking sensor',
      'model.dht11': 'DHT11 temperature / humidity sensor',
      'model.dht22': 'DHT22 / AM2302 temperature / humidity sensor',
      'model.hc-sr04': 'HC-SR04 ultrasonic distance sensor',
      'model.analog': 'Analog sensor',
      'model.generic-sensor': 'Generic digital sensor',
      'model.relay-module': 'Common relay module (active-low)',
      'model.relay-low': 'Active-low relay module',
      'model.relay-high': 'Active-high relay module',
      'model.ssr': 'Solid-state relay (SSR)',
      'model.bare-relay': 'Bare relay coil',
      'model.generic-relay': 'Generic relay module (active-low)',
      'hint.pullNone': 'The module output is push-pull or already driven on-board, so no pull resistor is normally needed.',
      'hint.pullSwitch': 'Wire the switch between GPIO and GND. The internal pull-up is enough for short wires; add an external 10kΩ pull-up to 3.3V for long cables.',
      'hint.pullUp': 'Use a 10kΩ pull-up to 3.3V. The internal pull-up is a weak fallback for short wires.',
      'hint.pullDown': 'Use a 10kΩ pull-down to GND.',
      'hint.pullLeak': 'Leak modules usually drive a digital output. If the output is open-drain, use a pull-up (internal for short wires, 10kΩ external for long cables).',
      'hint.pullI2c': 'I2C needs pull-ups, usually 4.7kΩ on the module; do not add too many extra pull-ups.',
      'hint.pullUart': 'UART needs no pull resistor. Cross TX/RX and share ground.',
      'hint.outputServo': 'The servo signal goes directly to GPIO and needs no pull resistor. Power the servo from a separate 5V supply and share ground.',
      'hint.outputMotor': 'A motor cannot connect directly to GPIO. Use a motor driver: PWM to EN/speed, direction to DIR, and share ground.',
      'hint.outputUart': 'UART output needs no pull resistor. Connect TX to the module RX, share ground, and adapt the command to its protocol.',
      'hint.outputPwmRelay': 'Relays are better on the digital category. PWM mode only outputs 0% or 100% duty.',
      'hint.outputDigitalServo': 'Servos and motors are better on the PWM category. Digital mode only switches the pin on or off.',
      'hint.pullDht': 'The DHT data line needs a 4.7k–10kΩ pull-up to 3.3V; many breakout boards already include it.',
      'hint.pullAnalog': 'Analog outputs do not need a pull resistor. Make sure the output never exceeds 3.3V.',
      'hint.pullUltrasonic': 'TRIG is an output and ECHO is an input, so no pull resistor is needed. ECHO is 5V and needs a divider.',
      'hint.pullPir': 'PIR modules have a push-pull output, so no pull resistor is needed. Allow 30–60 seconds to settle after power-up.',
      'hint.pullRadar': 'Radar modules have a 3.3V push-pull output, so no pull resistor is needed.',
      'hint.pullUnknown': 'Unknown model: treated as a common active-low digital module. Check the module documentation.',
      'hint.relayModule': 'The relay module IN pin is driven directly by GPIO, so no pull resistor is needed. The module and ESP32 must share GND.',
      'hint.relayBare': 'GPIO cannot drive a relay coil directly. Use a transistor/MOSFET, add a 10kΩ base/gate pull-down, and put a flyback diode across the coil.',
      'hint.relaySsr': 'The SSR input is driven by GPIO, so no pull resistor is needed. Check that its control voltage range includes 3.3V.',
      'hint.relayUnknown': 'Unknown relay: treated as an active-low module. Check its trigger polarity and common ground.',
      'note.pir3v3': 'Confirm the module output is 3.3V; a 5V output needs level shifting.',
      'note.pirWarmup': 'HC-SR501 needs about 30–60 seconds to stabilize and may false-trigger during that time.',
      'note.am312Warmup': 'AM312 needs about 1–5 seconds to stabilize after power-up.',
      'note.radar3v3': 'RCWL-0516 can run from 3.3V and gives a 3.3V pulse output.',
      'note.dhtModulePull': 'If the breakout board already has a 4.7k–10kΩ pull-up, the external resistor can be omitted.',
      'note.soilAnalog': 'If you use the AO analog output, choose the analog sensor template instead.',
      'note.leak': 'Leak modules commonly output LOW when wet; confirm the actual level from the module documentation.',
      'note.analogAdc1': 'Prefer ADC1 (GPIO32–39); ADC2 may be unavailable while Wi-Fi is active.',
      'note.relayModule': 'Most modules are active-low. If unsure, toggle "Invert active level" and use the setting that switches reliably.',
      'note.unknownSensor': 'Model not recognized. A generic active-low digital input is generated; check the module output level.',
      'note.unknownRelay': 'Model not recognized. An active-low relay module is assumed; check the trigger polarity.',
      'note.invertHardware': 'Inversion changes software 0/1 only. It does not change wiring; confirm the real active level from the module datasheet.',
      'note.classicEsp32': 'Checks use classic ESP32 GPIO limits. For ESP32-S3/C3 and other variants, follow the datasheet.',
      'err.pinSyntax': 'Cannot read pin "{pin}". Use D18, GPIO18 or 18.',
      'err.pinRange': 'GPIO{pin} is outside the classic ESP32 range (0–39).',
      'err.pinFlash': 'GPIO{pin} is connected to SPI flash and cannot be used as a normal IO.',
      'err.pinInputOnlyRelay': 'GPIO{pin} is input-only and cannot drive the relay.',
      'err.pinInputOnlyTrig': 'GPIO{pin} is input-only and cannot be the HC-SR04 TRIG pin.',
      'err.pinSame': 'The sensor and relay cannot share GPIO{pin}.',
      'err.sensorPinSame': 'The sensor pins must be different.',
      'err.sensorPinCount': 'This model needs {count} sensor pins. Separate them with a comma.',
      'err.sensorPinExtra': 'This model needs only one sensor pin; remove the extra pins.',
      'err.dhtInputOnly': 'DHT is a bidirectional single-wire bus, and GPIO{pin} is input-only.',
      'err.analogPin': 'GPIO{pin} is not an ADC pin and cannot be used for an analog input.',
      'err.inputPinCount': 'This input category needs {count} pins. Separate them with a comma.',
      'err.inputPinSame': 'Input pins must be different.',
      'err.outputPinInputOnly': 'GPIO{pin} is input-only and cannot be used as an output.',
      'err.ioSame': 'Input and output cannot share GPIO{pin}.',
      'err.dirInputOnly': 'GPIO{pin} is input-only and cannot be used as the motor direction pin.',
      'err.dirSame': 'The motor direction pin must differ from the input and output pins.',
      'err.i2cInputOnly': 'I2C needs a bidirectional pin, and GPIO{pin} is input-only.',
      'err.uartTxInputOnly': 'UART TX must be an output-capable pin, and GPIO{pin} is input-only.',
      'warn.pinUnavailable': 'GPIO{pin} is usually unavailable on a classic ESP32; choose another pin.',
      'warn.pinStrapping': 'GPIO{pin} is a boot-strapping pin; its level at power-up affects boot.',
      'warn.pinUart': 'GPIO{pin} is used by the UART0 console by default.',
      'warn.pinPsram': 'GPIO{pin} may be used by PSRAM on ESP32-WROVER modules.',
      'warn.pullUnavailable': 'GPIO{pin} has no internal pull resistor. The code uses no internal pull; add the external resistor shown above.',
      'warn.adc2': 'GPIO{pin} belongs to ADC2 and may be unavailable while Wi-Fi is active.',
      'warn.bareRelay': 'A bare relay coil cannot connect directly to GPIO. Use a driver transistor/MOSFET and a flyback diode.',
      'warn.ssr': 'Check that the SSR control input works at 3.3V.',
      'warn.invert': 'Inversion changes the software 0/1 only, not the wiring.',
      'warn.unknownSensor': 'Sensor not recognized; a generic digital input template is used.',
      'warn.unknownRelay': 'Relay not recognized; an active-low module is assumed.',
      'warn.hcsr04': 'HC-SR04 ECHO is 5V. Use a divider or level shifter before connecting it to ESP32.',
      'warn.analog3v3': 'The analog output must not exceed 3.3V.',
      'warn.inputCategoryMismatch': 'The input category differs from the detected model; the category wins.',
      'warn.outputCategoryMismatch': 'The output category differs from the output type; the category wins.',
      'warn.customInput': 'Custom input model: check the pin roles and protocol against its documentation.',
      'warn.customOutput': 'Custom output model: check the driver, voltage, and protocol before wiring.',
      'warn.motorDir': 'No motor direction pin was given; the code only controls PWM speed.',
      'warn.pwmRelay': 'A relay on PWM mode is generated as 0%/100% duty; digital mode is recommended.',
      'warn.digitalServoMotor': 'A servo or motor on digital mode is generated as a simple on/off pin; PWM mode is recommended.',
      'warn.uartTemplate': 'UART is a generic template; adapt the command and parsing to the module protocol.',
      'warn.i2cTemplate': 'I2C is a generic template; read the sensor registers according to its datasheet.',
      'code.title': 'MicroPython / ESP32 generated initialization and control code',
      'code.sensor': 'Sensor',
      'code.relay': 'Relay',
      'code.invertOn': 'Invert active level: ON (0/1 logic swapped)',
      'code.invertOff': 'Invert active level: OFF',
      'code.sensorHigh': 'sensor triggers on HIGH',
      'code.sensorLow': 'sensor triggers on LOW',
      'code.sensorThreshold': 'sensor uses a threshold',
      'code.relayHigh': 'relay turns on with HIGH',
      'code.relayLow': 'relay turns on with LOW',
      'code.noPull': 'no pull resistor needed',
      'code.pullUp': 'internal pull-up',
      'code.pullDown': 'internal pull-down',
      'code.pullExternal': 'external pull-up required',
      'code.warmup': 'wait for the module to stabilize',
      'code.detected': 'signal detected',
      'code.idle': 'no signal',
      'code.on': 'on',
      'code.off': 'off',
      'code.dhtRead': 'read temperature and humidity',
      'code.dhtError': 'read failed, retry later',
      'code.tempThreshold': 'temperature threshold, adjust as needed',
      'code.ultraRead': 'read distance in centimetres',
      'code.ultraTrigger': 'send the trigger pulse',
      'code.distanceThreshold': 'distance threshold in centimetres, adjust as needed',
      'code.analogRead': 'read the analog value (0–65535)',
      'code.analogThreshold': 'analog threshold, adjust as needed',
      'code.relayInit': 'relay is off at power-up',
      'code.bareDriver': 'drive through a transistor/MOSFET, never the coil directly',
      'code.noInvert': 'threshold sensor: inversion only changes the relay output',
      'code.analogAverage': 'average several samples to suppress noise',
      'code.digitalLogic': 'digital output switches the pin high or low',
      'code.input': 'Input',
      'code.output': 'Output',
      'code.category': 'category',
      'code.inputValue': 'input level',
      'code.analogValue': 'input value',
      'code.distanceValue': 'distance',
      'code.temperature': 'temperature',
      'code.humidity': 'humidity',
      'code.i2cDevices': 'I2C devices',
      'code.uartData': 'UART data',
      'code.analogLogic': 'analog input triggers when value > {threshold}',
      'code.tempLogic': 'temperature input triggers when temperature >= {threshold}',
      'code.distanceLogic': 'distance input triggers when distance < {threshold} cm',
      'code.protocolLogic': 'communication input uses the module protocol to decide active',
      'code.servoLogic': 'servo moves to {on}° when active and {off}° when idle',
      'code.motorLogic': 'motor runs at {speed}% when active and stops when idle',
      'code.uartLogic': 'UART output sends the configured command',
      'code.protocolCommand': 'adapt the command to the module protocol',
      'code.i2cTodo': 'read the sensor registers according to its datasheet',
      'code.uartKeyword': 'trigger keyword, adapt to the module protocol',
      'code.startup': '[START] Input + output control started.',
      'code.warmupPrint': '[INFO] Waiting {seconds}s for the sensor to stabilize...',
      'code.debounce': 'Debounce: two samples {ms}ms apart must agree.',
      'code.debounceRead': 'Read a stable level; retry when the two samples differ.',
      'code.bounceIgnored': 'bouncing sample ignored',
      'code.loopDelay': 'main loop interval',
      'code.logic': 'input reads {active} when triggered and {inactive} when idle',
      'code.relayLogic': 'relay engages at {active} and releases at {inactive}',
      'event.pir.on': '[ALERT] Motion detected.',
      'event.pir.off': '[SAFE] No motion detected.',
      'event.button.on': '[INFO] Switch triggered.',
      'event.button.off': '[SAFE] Switch not triggered.',
      'event.reed.on': '[INFO] Door/reed switch triggered.',
      'event.reed.off': '[SAFE] Door/reed switch not triggered.',
      'event.float.on': '[ALERT] Float level triggered!',
      'event.float.off': '[SAFE] Float level normal.',
      'event.tilt.on': '[INFO] Tilt detected.',
      'event.tilt.off': '[SAFE] Tilt normal.',
      'event.vibration.on': '[INFO] Vibration detected.',
      'event.vibration.off': '[SAFE] No vibration detected.',
      'event.flame.on': '[ALERT] Flame detected!',
      'event.flame.off': '[SAFE] No flame detected.',
      'event.rain.on': '[ALERT] Rain detected!',
      'event.rain.off': '[SAFE] No rain detected.',
      'event.leak.on': '[ALERT] Water leak detected!',
      'event.leak.off': '[SAFE] No water leak detected.',
      'event.soil.on': '[ALERT] Soil moisture threshold reached!',
      'event.soil.off': '[SAFE] Soil moisture normal.',
      'event.obstacle.on': '[INFO] Obstacle detected.',
      'event.obstacle.off': '[SAFE] Path clear.',
      'event.line.on': '[INFO] Line detected.',
      'event.line.off': '[SAFE] No line detected.',
      'event.generic.on': '[INFO] Signal detected.',
      'event.generic.off': '[SAFE] No signal detected.',
      'event.temperature.on': '[ALERT] Temperature above threshold.',
      'event.temperature.off': '[SAFE] Temperature normal.',
      'event.temperature.fail': '[INFO] DHT read failed. Check wiring.',
      'event.distance.on': '[ALERT] Obstacle within threshold!',
      'event.distance.off': '[SAFE] Path clear.',
      'event.distance.fail': '[INFO] Distance read failed. Check wiring.',
      'event.analog.on': '[ALERT] Analog value above threshold.',
      'event.analog.off': '[SAFE] Analog value normal.',
      'event.i2c.on': '[ALERT] I2C threshold reached.',
      'event.i2c.off': '[SAFE] I2C input normal.',
      'event.uart.on': '[ALERT] UART trigger received.',
      'event.uart.off': '[SAFE] No UART trigger.',
      'output.relayOn': '[OUTPUT] Relay engaged.',
      'output.relayOff': '[OUTPUT] Relay released.',
      'output.pwmRelayOn': '[OUTPUT] PWM at 100%.',
      'output.pwmRelayOff': '[OUTPUT] PWM at 0%.',
      'output.servoOn': '[OUTPUT] Servo at 90°.',
      'output.servoOff': '[OUTPUT] Servo at 0°.',
      'output.motorOn': '[OUTPUT] Motor running at 60%.',
      'output.motorOff': '[OUTPUT] Motor stopped.',
      'output.uartOn': '[OUTPUT] ON command sent.',
      'output.uartOff': '[OUTPUT] OFF command sent.',
      'output.digitalOn': '[OUTPUT] Pin high.',
      'output.digitalOff': '[OUTPUT] Pin low.',
      'suggest.hc-sr501': 'HC-SR501',
      'suggest.am312': 'AM312',
      'suggest.rcwl-0516': 'RCWL-0516',
      'suggest.button': 'Button switch',
      'suggest.reed': 'Reed switch',
      'suggest.float': 'Float switch',
      'suggest.flame': 'Flame sensor',
      'suggest.leak': 'Water leak sensor',
      'suggest.soil-digital': 'Soil moisture sensor',
      'suggest.dht11': 'DHT11',
      'suggest.dht22': 'DHT22',
      'suggest.hc-sr04': 'HC-SR04',
      'suggest.analog': 'Analog sensor',
      'suggest.generic-sensor': 'Generic digital sensor',
      'suggest.relay-module': '5V relay module',
      'suggest.relay-low': 'Active-low relay module',
      'suggest.relay-high': 'Active-high relay module',
      'suggest.ssr': 'SSR',
      'suggest.bare-relay': 'Bare relay coil',
      'suggest.servo-sg90': 'SG90 servo',
      'suggest.servo-mg996r': 'MG996R servo',
      'suggest.motor-l298n': 'L298N motor driver',
      'suggest.motor-tb6612': 'TB6612 motor driver',
      aiSectionTitle: 'Custom logic (natural language, optional)',
      aiFieldLabel: 'Describe the logic',
      aiPlaceholder: 'e.g. If the leak sensor detects water and the LDR value is below 1000, engage the relay for 5 seconds, then release.',
      aiHint: 'The AI combines this sentence with the input/output pins above. Sensors you mention but did not configure are added as TODO pin constants; confirm the wiring before use.',
      aiGenerate: 'AI generate advanced code',
      aiGenerating: 'Generating…',
      aiCancel: 'Cancel',
      aiErrorTitle: 'AI generation failed',
      aiWarningsTitle: 'Review notes',
      aiSourceAi: 'AI generated · review required',
      aiSourceLocal: 'Local rules',
      aiReviewNotice: 'Review every line before use. The plugin never flashes or runs generated code; copy it manually.',
      aiDiscard: 'Discard AI result',
      aiNeedsReady: 'Fix the pin errors above before asking the AI.',
      aiNoLogic: 'Describe the logic first.',
      aiWarnFence: 'Markdown code fences were removed; the remaining code is shown unchanged.',
      aiWarnFenceInline: 'The code still contains Markdown fence markers; remove them manually.',
      aiWarnTruncated: 'The model hit its output limit, so the code may be incomplete.',
      aiWarnRisky: 'The code contains a high-risk call; review it carefully before copying.',
      aiWarnTodo: 'The code contains TODO pin constants outside the form; confirm the wiring.',
      aiWarnHeader: 'The code does not start with the expected encoding header.',
      aiWarnLoop: 'The code has no while True main loop; it may be an incomplete fragment.',
      aiWarnSleep: 'The code has no time.sleep delay; check that the action timing is preserved.',
      aiUnknownWarning: 'The model reported an extra review note.',
      aiEmptyResponse: 'The model returned no code. Try again.',
      aiNetworkError: 'Could not reach the generation route.',
      aiTimeout: 'Generation timed out. Try again.',
      aiErrorNoKey: 'No model credential is available. Configure a provider API key in Harness settings first.',
      aiErrorQuota: 'The model is rate-limited or out of quota. Try again later.',
      aiErrorContext: 'The request exceeded the model context window. Shorten the description.',
      aiErrorModel: 'The model did not return usable MicroPython (missing machine import, main loop, or delay). Try again.',
      aiErrorGeneric: 'Generation failed. Try again.',
      aiWarnBlocking: 'The code still uses a long blocking time.sleep; other inputs cannot respond during the wait. Ask the AI again or convert it to a ticks-based state machine.',
      safetyTitle: '⚠️ Electrical safety warning',
      safetyDetected: 'Detected',
      safetyBody: 'This logic or output looks like a high-power or mains load. Use an independent power supply plus a relay, optocoupler, or proper motor driver. Never connect a pump, motor, heater, or 220V load directly to ESP32 GPIO.',
      safetyMains: 'Mains voltage can be lethal. Wiring must be done by a qualified electrician, with a fuse and proper isolation.',
      safetyAck: 'I will use an independent power supply and isolation, and I accept the wiring risk.',
      safetyAckRequired: 'Acknowledge the electrical safety warning before generating or copying code.',
      'code.safetyTitle': 'SAFETY WARNING',
      'code.safetyPower': 'Use an independent power supply + relay / optocoupler / driver module.',
      'code.safetyNoDirect': 'Never drive a high-power load directly from ESP32 GPIO.',
      'code.safetyMains': 'For 220V mains, use a qualified electrician, a fuse, and proper isolation.',
    };

    const ZH = {
      launcher: 'MicroPython 输入/输出代码生成器',
      launcherShort: 'µPy I/O',
      title: 'MicroPython 输入/输出代码生成器',
      subtitle: '选择输入分类和输出分类/类型，自动使用对应的 MicroPython 库，并生成日志、防抖和中文注释。',
      close: '关闭',
      exampleBadge: '示例',
      exampleHint: '已填入示例，直接改成你的型号和引脚即可。',
      sensorSection: '输入模块',
      relaySection: '输出模块',
      modelLabel: '型号（可自定义）',
      modelPlaceholder: '例如 HC-SR501，或输入自定义型号',
      sensorPinLabel: '输入引脚',
      relayPinLabel: '输出引脚',
      sensorPinPlaceholder: '例如 D18；双引脚模块填 D18, D19',
      relayPinPlaceholder: '例如 D26',
      sensorPinHelp: '引脚数量由输入分类决定；两个引脚用逗号分隔。',
      relayPinHelp: '输出信号引脚，例如 D26。',
      pinHelp: '按经典 ESP32 引脚命名：D18 = GPIO18。',
      emptyModel: '填写型号，或直接使用分类模板',
      detected: '已识别',
      generic: '通用模板',
      notDetected: '未识别',
      custom: '自定义',
      pullTitle: '输入上拉 / 下拉',
      pullNone: '无需上/下拉',
      pullUp: '建议上拉',
      pullDown: '建议下拉',
      pullExternal: '需要外部上/下拉',
      pullDriver: '需要驱动电路',
      pullAnalog: '无需上/下拉',
      pullUltrasonic: '无需上/下拉',
      relayPullTitle: '输出驱动',
      relayNone: '无需上/下拉',
      relayDriver: '需要三极管/MOSFET 驱动',
      relaySsr: '检查模块输入电压',
      relayServo: '舵机电源单独供电',
      relayMotor: '需要电机驱动',
      relayUart: 'UART 命令输出',
      relayPwm: 'PWM 输出',
      relayDigital: '数字输出',
      levelTitle: '有效状态',
      sensorLevel: '输入触发',
      relayLevel: '输出动作',
      levelHigh: '高电平 (1)',
      levelLow: '低电平 (0)',
      levelThreshold: '阈值判断',
      levelServo: '角度 90°',
      levelMotor: '速度 60%',
      levelUart: 'UART 命令',
      levelPwm: 'PWM 100% / 0%',
      levelDigital: 'GPIO 高 / 低',
      afterInvert: '已反转',
      inputCategoryLabel: '输入分类',
      outputCategoryLabel: '输出分类',
      outputTypeLabel: '输出类型',
      outputDirPinLabel: '方向引脚（电机可选）',
      outputDirPinPlaceholder: '例如 D27',
      inputModelPlaceholder: '例如 HC-SR501，或输入自定义型号',
      outputModelPlaceholder: '例如 继电器模块、SG90、L298N',
      customModelHint: '可直接输入任意型号；实际生成方式由所选分类决定。',
      'category.digital': '数字',
      'category.analog': '模拟',
      'category.communication': '通信',
      'category.pwm': 'PWM',
      'outputType.relay': '继电器',
      'outputType.servo': '舵机',
      'outputType.motor': '电机',
      'pinHint.inputDigital': '数字输入：一个信号引脚，例如 D18。',
      'pinHint.inputAnalog': '模拟输入：一个 ADC 引脚，例如 D34。',
      'pinHint.inputDht': 'DHT 数据引脚，例如 D18。',
      'pinHint.inputUltrasonic': 'HC-SR04：TRIG, ECHO 用逗号分隔，例如 D18, D19。',
      'pinHint.inputI2c': 'I2C：SDA, SCL 用逗号分隔，例如 D21, D22。',
      'pinHint.inputUart': 'UART：TX, RX 用逗号分隔，例如 D17, D16。',
      'pinHint.outputDigital': '数字输出信号引脚，例如 D26。',
      'pinHint.outputServo': '舵机信号引脚（PWM），例如 D26。',
      'pinHint.outputMotor': '电机 PWM / EN 引脚，例如 D26。',
      'pinHint.outputUart': 'UART TX 引脚，例如 D26。',
      'pinHint.outputDir': '电机方向 DIR 引脚（可选），例如 D27。',
      invertLabel: '电平反转',
      invertHint: '勾选后对调数字输入的触发电平，以及继电器的吸合电平。',
      invertNoteDigital: '数字输入：触发电平会反转。',
      invertNoteThreshold: '当前输入使用阈值判断；反转只影响继电器输出。',
      invertUnused: '当前输入/输出组合不使用电平反转。',
      outputTitle: '生成的代码',
      outputPlaceholder: '填写型号与引脚后，这里会自动生成代码。',
      outputErrorPlaceholder: '先修正引脚错误，再生成代码。',
      copy: '复制代码',
      copied: '已复制',
      copyFailed: '复制失败，请手动选择代码。',
      reset: '恢复示例',
      errorsTitle: '运行前请修正',
      tipsTitle: '接线提示',
      noTips: '未发现额外的引脚冲突。',
      footnote: '按经典 ESP32 / MicroPython 生成；接线前请断电，并核对模块电压与极性。',
      'default.sensor': '漏水传感器',
      'default.relay': '1 路 5V 继电器模块',
      'model.hc-sr501': 'HC-SR501 PIR 人体红外',
      'model.am312': 'AM312 PIR 人体红外',
      'model.rcwl-0516': 'RCWL-0516 微波雷达',
      'model.pir': '通用 PIR 人体红外',
      'model.button': '按键 / 触摸开关',
      'model.reed': '磁簧 / 门磁开关',
      'model.float': '浮球液位开关',
      'model.tilt': '倾斜 / 滚珠开关',
      'model.vibration': '震动开关',
      'model.flame': '火焰传感器（数字输出）',
      'model.rain': '雨滴传感器（数字输出）',
      'model.leak': '漏水传感器（数字输出）',
      'model.soil-digital': '土壤湿度传感器（DO 数字输出）',
      'model.obstacle': '红外避障传感器',
      'model.line': '循迹传感器',
      'model.dht11': 'DHT11 温湿度传感器',
      'model.dht22': 'DHT22 / AM2302 温湿度传感器',
      'model.hc-sr04': 'HC-SR04 超声波测距',
      'model.analog': '模拟量传感器',
      'model.generic-sensor': '通用数字传感器',
      'model.relay-module': '常见继电器模块（低电平触发）',
      'model.relay-low': '低电平触发继电器模块',
      'model.relay-high': '高电平触发继电器模块',
      'model.ssr': '固态继电器（SSR）',
      'model.bare-relay': '裸继电器线圈',
      'model.generic-relay': '通用继电器模块（低电平触发）',
      'hint.pullNone': '模块输出为推挽或已由板载电路驱动，通常不需要上拉/下拉电阻。',
      'hint.pullSwitch': '开关一端接 GPIO、另一端接 GND；短线可用内部上拉，长线建议再加 10kΩ 外部上拉到 3.3V。',
      'hint.pullUp': '建议 10kΩ 上拉到 3.3V；短线可先用内部上拉。',
      'hint.pullDown': '建议 10kΩ 下拉到 GND。',
      'hint.pullLeak': '漏水模块通常有数字输出；若为开漏输出，建议上拉（短线可用内部上拉，长线加 10kΩ 外部上拉）。',
      'hint.pullI2c': 'I2C 需要上拉，通常模块自带 4.7kΩ；不要再重复加太多上拉。',
      'hint.pullUart': 'UART 不需要上拉/下拉；TX/RX 交叉连接并共地。',
      'hint.outputServo': '舵机信号线直接接 GPIO，不需要上拉/下拉；舵机电源请单独 5V 供电并与 ESP32 共地。',
      'hint.outputMotor': '电机不能直接接 GPIO；PWM 接驱动器的 EN/调速脚，方向接 DIR，电源共地。',
      'hint.outputUart': 'UART 输出不需要上拉/下拉；TX 接模块 RX，共地，并按模块协议修改命令。',
      'hint.outputPwmRelay': '继电器建议使用数字分类；PWM 分类只输出 0% 或 100% 占空比。',
      'hint.outputDigitalServo': '舵机/电机建议使用 PWM 分类；数字分类只能做简单开关。',
      'hint.pullDht': 'DHT 数据线需要 4.7k–10kΩ 上拉到 3.3V；很多模块已自带。',
      'hint.pullAnalog': '模拟输出不需要上拉/下拉；确认输出不超过 3.3V。',
      'hint.pullUltrasonic': 'TRIG 为输出、ECHO 为输入，不需要上拉/下拉；ECHO 是 5V，需要分压。',
      'hint.pullPir': 'PIR 模块输出为推挽，无需上拉/下拉；上电后等待 30–60 秒稳定。',
      'hint.pullRadar': '雷达模块输出为 3.3V 推挽，无需上拉/下拉。',
      'hint.pullUnknown': '未识别型号：先按常见低电平数字模块处理；请核对模块说明。',
      'hint.relayModule': '继电器模块的 IN 由 GPIO 直接驱动，不需要上拉/下拉；模块与 ESP32 必须共地。',
      'hint.relayBare': 'GPIO 不能直接驱动线圈：用三极管/MOSFET，基极/栅极加 10kΩ 下拉，线圈并联续流二极管。',
      'hint.relaySsr': 'SSR 输入端由 GPIO 驱动，不需要上拉/下拉；确认控制电压范围包含 3.3V。',
      'hint.relayUnknown': '未识别继电器：按低电平触发模块处理；请确认触发极性和是否共地。',
      'note.pir3v3': '确认模块输出为 3.3V；5V 输出需要电平转换。',
      'note.pirWarmup': 'HC-SR501 上电后约 30–60 秒稳定，期间可能误触发。',
      'note.am312Warmup': 'AM312 上电后约 1–5 秒稳定。',
      'note.radar3v3': 'RCWL-0516 可用 3.3V 供电，输出为 3.3V 脉冲。',
      'note.dhtModulePull': '模块板载 4.7k–10kΩ 上拉时，可省略外部电阻。',
      'note.soilAnalog': '如果使用 AO 模拟输出，请改用“模拟量传感器”模板。',
      'note.leak': '漏水模块常见为遇水输出低电平；请以模块说明为准。',
      'note.analogAdc1': '优先使用 ADC1（GPIO32–39）；Wi-Fi 开启时 ADC2 可能不可用。',
      'note.relayModule': '多数模块为低电平触发；不确定时勾选“电平反转”，以能可靠吸合的一档为准。',
      'note.unknownSensor': '未识别型号，已按通用低电平数字输入生成；请核对模块输出电平。',
      'note.unknownRelay': '未识别型号，已按低电平触发模块生成；请核对触发极性。',
      'note.invertHardware': '电平反转只改软件 0/1，不改变接线；硬件有效电平以模块说明为准。',
      'note.classicEsp32': '按经典 ESP32 的 GPIO 限制检查；ESP32-S3/C3 等型号请以数据手册为准。',
      'err.pinSyntax': '无法识别引脚“{pin}”，请用 D18、GPIO18 或 18。',
      'err.pinRange': 'GPIO{pin} 超出经典 ESP32 的范围（0–39）。',
      'err.pinFlash': 'GPIO{pin} 连接 SPI Flash，不能用作普通 IO。',
      'err.pinInputOnlyRelay': 'GPIO{pin} 只能输入，不能驱动继电器。',
      'err.pinInputOnlyTrig': 'GPIO{pin} 只能输入，不能作为 HC-SR04 的 TRIG。',
      'err.pinSame': '传感器和继电器不能使用同一个引脚 GPIO{pin}。',
      'err.sensorPinSame': '传感器引脚不能重复使用。',
      'err.sensorPinCount': '当前型号需要 {count} 个传感器引脚，请用逗号分隔。',
      'err.sensorPinExtra': '当前型号只需要 1 个传感器引脚，请去掉多余引脚。',
      'err.dhtInputOnly': 'DHT 单总线需要双向引脚，GPIO{pin} 只能输入，不能用。',
      'err.analogPin': 'GPIO{pin} 不是 ADC 引脚，不能直接做模拟输入。',
      'err.inputPinCount': '当前输入分类需要 {count} 个引脚，请用逗号分隔。',
      'err.inputPinSame': '输入引脚不能重复使用。',
      'err.outputPinInputOnly': 'GPIO{pin} 只能输入，不能作为输出。',
      'err.ioSame': '输入和输出不能使用同一个引脚 GPIO{pin}。',
      'err.dirInputOnly': 'GPIO{pin} 只能输入，不能作为电机方向引脚。',
      'err.dirSame': '电机方向引脚不能与输入或输出引脚重复。',
      'err.i2cInputOnly': 'I2C 需要双向引脚，GPIO{pin} 只能输入，不能用。',
      'err.uartTxInputOnly': 'UART TX 必须是可输出引脚，GPIO{pin} 只能输入。',
      'warn.pinUnavailable': 'GPIO{pin} 在经典 ESP32 上通常不可用，请换一个引脚。',
      'warn.pinStrapping': 'GPIO{pin} 是启动配置引脚，上电电平会影响启动。',
      'warn.pinUart': 'GPIO{pin} 默认用于 UART0 串口日志。',
      'warn.pinPsram': 'GPIO{pin} 在带 PSRAM 的 ESP32-WROVER 上可能被占用。',
      'warn.pullUnavailable': 'GPIO{pin} 没有内部上拉/下拉，代码已改为不使用内部电阻；请按上面的建议加外部电阻。',
      'warn.adc2': 'GPIO{pin} 属于 ADC2，开启 Wi-Fi 时可能无法读取。',
      'warn.bareRelay': '裸继电器线圈不能直接接 GPIO，必须使用驱动管和续流二极管。',
      'warn.ssr': '确认 SSR 控制输入支持 3.3V。',
      'warn.invert': '电平反转只改软件 0/1，不改变硬件接线。',
      'warn.unknownSensor': '未识别该传感器，按通用数字输入模板处理。',
      'warn.unknownRelay': '未识别该继电器，按低电平触发模块处理。',
      'warn.hcsr04': 'HC-SR04 的 ECHO 为 5V，接 ESP32 前必须分压或电平转换。',
      'warn.analog3v3': '模拟输出不得超过 3.3V。',
      'warn.inputCategoryMismatch': '输入分类与识别到的型号不一致，已按所选分类生成。',
      'warn.outputCategoryMismatch': '输出分类与输出类型不匹配，已按所选分类生成。',
      'warn.customInput': '自定义输入型号：请按模块说明核对引脚角色和通信协议。',
      'warn.customOutput': '自定义输出型号：接线前请核对驱动、电压和协议。',
      'warn.motorDir': '未填写电机方向引脚，代码只生成 PWM 调速。',
      'warn.pwmRelay': '继电器使用 PWM 分类时按 0%/100% 占空比生成，建议改用数字分类。',
      'warn.digitalServoMotor': '舵机/电机使用数字分类时只生成简单开关，建议改用 PWM 分类。',
      'warn.uartTemplate': 'UART 为通用模板，请按模块协议修改命令和解析。',
      'warn.i2cTemplate': 'I2C 为通用模板，请按传感器寄存器手册读取数据。',
      'code.title': 'MicroPython / ESP32 自动生成的初始化与判定代码',
      'code.sensor': '传感器',
      'code.relay': '继电器',
      'code.invertOn': '电平反转：开启（0/1 判定已对调）',
      'code.invertOff': '电平反转：关闭',
      'code.sensorHigh': '传感器高电平触发',
      'code.sensorLow': '传感器低电平触发',
      'code.sensorThreshold': '传感器使用阈值判断',
      'code.relayHigh': '继电器高电平吸合',
      'code.relayLow': '继电器低电平吸合',
      'code.noPull': '无需上拉/下拉',
      'code.pullUp': '内部上拉',
      'code.pullDown': '内部下拉',
      'code.pullExternal': '需要外部上拉',
      'code.warmup': '上电后等待模块稳定',
      'code.detected': '检测到信号',
      'code.idle': '无信号',
      'code.on': '吸合',
      'code.off': '释放',
      'code.dhtRead': '读取温湿度',
      'code.dhtError': '读取失败，稍后重试',
      'code.tempThreshold': '温度阈值，按需修改',
      'code.ultraRead': '读取距离（厘米）',
      'code.ultraTrigger': '发送触发脉冲',
      'code.distanceThreshold': '距离阈值（厘米），按需修改',
      'code.analogRead': '读取模拟量（0–65535）',
      'code.analogThreshold': '模拟量阈值，按需修改',
      'code.relayInit': '上电默认释放',
      'code.bareDriver': '经三极管/MOSFET 驱动，勿直接接线圈',
      'code.noInvert': '阈值判断：反转只作用于继电器输出',
      'code.analogAverage': '多次采样平均，抑制噪声',
      'code.digitalLogic': '数字输出切换 GPIO 高/低电平',
      'code.input': '输入',
      'code.output': '输出',
      'code.category': '分类',
      'code.inputValue': '输入电平',
      'code.analogValue': '输入值',
      'code.distanceValue': '距离',
      'code.temperature': '温度',
      'code.humidity': '湿度',
      'code.i2cDevices': 'I2C 设备',
      'code.uartData': 'UART 数据',
      'code.analogLogic': '模拟输入在采样值 > {threshold} 时触发',
      'code.tempLogic': '温度达到 {threshold} 时触发',
      'code.distanceLogic': '距离小于 {threshold} cm 时触发',
      'code.protocolLogic': '通信输入按模块协议判断是否触发',
      'code.servoLogic': '舵机在触发时转到 {on}°，空闲时回到 {off}°',
      'code.motorLogic': '电机在触发时以 {speed}% 速度运行，空闲时停止',
      'code.uartLogic': 'UART 输出发送配置好的命令',
      'code.protocolCommand': '按模块协议修改命令',
      'code.i2cTodo': '按传感器寄存器手册读取数据',
      'code.uartKeyword': '触发关键字，按模块协议修改',
      'code.startup': '【启动】输入 + 输出控制系统已启动。',
      'code.warmupPrint': '【提示】等待传感器稳定 {seconds} 秒...',
      'code.debounce': '防抖：间隔 {ms}ms 采样两次，一致才采用。',
      'code.debounceRead': '读取稳定电平；两次采样不一致时重试。',
      'code.bounceIgnored': '抖动样本，忽略本次',
      'code.loopDelay': '主循环间隔',
      'code.logic': '触发时输入输出 {active}，空闲时输出 {inactive}',
      'code.relayLogic': '继电器吸合输出 {active}，释放输出 {inactive}',
      'event.pir.on': '【提示】检测到人体活动。',
      'event.pir.off': '【安全】未检测到人体活动。',
      'event.button.on': '【提示】按键已触发。',
      'event.button.off': '【安全】按键未触发。',
      'event.reed.on': '【提示】门磁已触发。',
      'event.reed.off': '【安全】门磁未触发。',
      'event.float.on': '【警告】水位触发！',
      'event.float.off': '【安全】水位正常。',
      'event.tilt.on': '【提示】检测到倾斜。',
      'event.tilt.off': '【安全】状态正常。',
      'event.vibration.on': '【提示】检测到震动。',
      'event.vibration.off': '【安全】未检测到震动。',
      'event.flame.on': '【警告】检测到火焰！',
      'event.flame.off': '【安全】未检测到火焰。',
      'event.rain.on': '【警告】检测到雨水！',
      'event.rain.off': '【安全】未检测到雨水。',
      'event.leak.on': '【警告】检测到漏水！',
      'event.leak.off': '【安全】未检测到漏水。',
      'event.soil.on': '【警告】土壤湿度超限！',
      'event.soil.off': '【安全】土壤湿度正常。',
      'event.obstacle.on': '【提示】检测到障碍物。',
      'event.obstacle.off': '【安全】前方无障碍。',
      'event.line.on': '【提示】检测到黑线。',
      'event.line.off': '【安全】未检测到黑线。',
      'event.generic.on': '【提示】检测到信号。',
      'event.generic.off': '【安全】未检测到信号。',
      'event.temperature.on': '【警告】温度超过阈值！',
      'event.temperature.off': '【安全】温度正常。',
      'event.temperature.fail': '【提示】DHT 读取失败，请检查接线。',
      'event.distance.on': '【警告】检测到障碍物！',
      'event.distance.off': '【安全】前方无障碍。',
      'event.distance.fail': '【提示】测距失败，请检查接线。',
      'event.analog.on': '【警告】模拟量超过阈值！',
      'event.analog.off': '【安全】模拟量正常。',
      'event.i2c.on': '【警告】I2C 输入达到阈值。',
      'event.i2c.off': '【安全】I2C 输入正常。',
      'event.uart.on': '【警告】收到 UART 触发。',
      'event.uart.off': '【安全】未收到 UART 触发。',
      'output.relayOn': '【输出】继电器吸合。',
      'output.relayOff': '【输出】继电器释放。',
      'output.pwmRelayOn': '【输出】PWM 占空比 100%。',
      'output.pwmRelayOff': '【输出】PWM 占空比 0%。',
      'output.servoOn': '【输出】舵机转到 90°。',
      'output.servoOff': '【输出】舵机回到 0°。',
      'output.motorOn': '【输出】电机以 60% 速度运行。',
      'output.motorOff': '【输出】电机停止。',
      'output.uartOn': '【输出】已发送 ON 命令。',
      'output.uartOff': '【输出】已发送 OFF 命令。',
      'output.digitalOn': '【输出】GPIO 高电平。',
      'output.digitalOff': '【输出】GPIO 低电平。',
      'suggest.hc-sr501': 'HC-SR501',
      'suggest.am312': 'AM312',
      'suggest.rcwl-0516': 'RCWL-0516',
      'suggest.button': '按键开关',
      'suggest.reed': '磁簧开关',
      'suggest.float': '浮球开关',
      'suggest.flame': '火焰传感器',
      'suggest.leak': '漏水传感器',
      'suggest.soil-digital': '土壤湿度传感器',
      'suggest.dht11': 'DHT11',
      'suggest.dht22': 'DHT22',
      'suggest.hc-sr04': 'HC-SR04',
      'suggest.analog': '模拟量传感器',
      'suggest.generic-sensor': '通用数字传感器',
      'suggest.relay-module': '5V 继电器模块',
      'suggest.relay-low': '低电平触发继电器模块',
      'suggest.relay-high': '高电平触发继电器模块',
      'suggest.ssr': '固态继电器',
      'suggest.bare-relay': '裸继电器线圈',
      'suggest.servo-sg90': 'SG90 舵机',
      'suggest.servo-mg996r': 'MG996R 舵机',
      'suggest.motor-l298n': 'L298N 电机驱动',
      'suggest.motor-tb6612': 'TB6612 电机驱动',
      aiSectionTitle: '自定义逻辑（自然语言，可选）',
      aiFieldLabel: '用一句话描述逻辑',
      aiPlaceholder: '例如：如果漏水传感器检测到漏水，并且光敏电阻数值小于1000，那么让继电器吸合5秒后断开。',
      aiHint: 'AI 会把这句话和上面的输入/输出引脚参数结合。句子中提到、但表单里没有配置的传感器，会以带 TODO 的引脚常量补出，使用前请先核对实际接线。',
      aiGenerate: 'AI 生成高阶代码',
      aiGenerating: '生成中…',
      aiCancel: '取消',
      aiErrorTitle: 'AI 生成失败',
      aiWarningsTitle: '审核提示',
      aiSourceAi: 'AI 生成 · 待人工审核',
      aiSourceLocal: '本地规则',
      aiReviewNotice: '使用前请逐行审核。插件不会自动烧录或执行生成的代码，请人工确认后再复制。',
      aiDiscard: '丢弃 AI 结果',
      aiNeedsReady: '请先修正上面的引脚错误，再让 AI 生成。',
      aiNoLogic: '请先描述逻辑。',
      aiWarnFence: '已移除 Markdown 代码围栏，其余代码原样显示。',
      aiWarnFenceInline: '代码里仍含 Markdown 围栏标记，请手动删除。',
      aiWarnTruncated: '模型达到输出上限，代码可能不完整。',
      aiWarnRisky: '代码包含高风险调用，复制前请重点审核。',
      aiWarnTodo: '代码包含表单之外的 TODO 引脚常量，请核对接线。',
      aiWarnHeader: '代码没有以预期的编码声明开头。',
      aiWarnLoop: '代码没有 while True 主循环，可能是片段而不完整。',
      aiWarnSleep: '代码没有 time.sleep 延时，请确认动作时序是否保留。',
      aiUnknownWarning: '模型返回了一条额外的审核提示。',
      aiEmptyResponse: '模型没有返回代码，请重试。',
      aiNetworkError: '无法连接到生成路由。',
      aiTimeout: '生成超时，请重试。',
      aiErrorNoKey: '当前没有可用的大模型凭证，请先在 Harness 设置中配置 provider API Key。',
      aiErrorQuota: '模型限流或额度不足，请稍后再试。',
      aiErrorContext: '请求超出模型上下文窗口，请精简描述。',
      aiErrorModel: '模型没有返回可用的 MicroPython 代码（缺少 machine 导入、主循环或延时），请重试。',
      aiErrorGeneric: '生成失败，请重试。',
      aiWarnBlocking: '代码仍在用长时间 time.sleep 阻塞等待，等待期间其他输入无法响应。请重新生成，或改成 ticks_ms 状态机。',
      safetyTitle: '⚠️ 电气安全警告',
      safetyDetected: '识别到',
      safetyBody: '这句逻辑或输出像是水泵、电机、加热器或 220V 市电负载。必须使用独立电源 + 继电器/光耦隔离/驱动模块，严禁用水泵、电机、加热器或 220V 负载直连 ESP32 GPIO。',
      safetyMains: '220V 市电有致命危险，必须由持证电工接线，并加保险丝和可靠隔离。',
      safetyAck: '我确认会使用独立电源并做好隔离，并自行承担接线风险。',
      safetyAckRequired: '请先勾选上方电气安全确认，再生成或复制代码。',
      'code.safetyTitle': '安全警告',
      'code.safetyPower': '必须使用独立电源 + 继电器/光耦隔离/驱动模块。',
      'code.safetyNoDirect': '严禁用 ESP32 GPIO 直接驱动大功率负载。',
      'code.safetyMains': '涉及 220V 市电时，必须由持证电工接线并加保险丝。',
    };

    const CSS = `
      .mpygen-layer { position: fixed; inset: 0; z-index: 80; pointer-events: none; }
      .mpygen-launcher {
        position: absolute; right: 0; top: 50%; transform: translateY(-50%);
        display: flex; flex-direction: column; align-items: center; gap: 6px;
        width: 42px; padding: 12px 6px; pointer-events: auto; cursor: pointer;
        color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-overlay);
        border: 1px solid var(--dsw-alias-border-l1); border-right: 0;
        border-radius: 12px 0 0 12px;
        box-shadow: 0 8px 28px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);
        font: inherit;
      }
      .mpygen-launcher:hover { background: var(--dsw-alias-bg-layer-2); }
      .mpygen-launcher:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
      .mpygen-launcher-text { writing-mode: vertical-rl; text-orientation: mixed; font-size: 11px; letter-spacing: .08em; color: var(--dsw-alias-label-secondary); }
      .mpygen-backdrop {
        position: absolute; inset: 0; display: grid; place-items: center; padding: 24px;
        pointer-events: auto; background: color-mix(in srgb, var(--dsw-alias-label-primary) 32%, transparent);
      }
      .mpygen-panel {
        width: min(940px, 100%); max-height: min(880px, calc(100vh - 48px));
        display: flex; flex-direction: column; overflow: auto;
        color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-overlay);
        border: 1px solid var(--dsw-alias-border-l1); border-radius: 16px;
        box-shadow: 0 24px 80px color-mix(in srgb, var(--dsw-alias-label-primary) 24%, transparent);
      }
      .mpygen-header {
        position: sticky; top: 0; z-index: 2; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
        padding: 20px 22px 16px; background: var(--dsw-alias-bg-overlay);
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .mpygen-heading { display: flex; align-items: flex-start; gap: 12px; min-width: 0; }
      .mpygen-logo {
        display: grid; place-items: center; flex: 0 0 auto; width: 38px; height: 38px; border-radius: 11px;
        color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
      }
      .mpygen-title { margin: 0; font-size: 17px; line-height: 1.35; font-weight: 650; }
      .mpygen-subtitle { margin: 4px 0 0; font-size: 12.5px; line-height: 1.55; color: var(--dsw-alias-label-secondary); }
      .mpygen-icon-button {
        display: grid; place-items: center; flex: 0 0 auto; width: 30px; height: 30px; border-radius: 8px;
        border: 1px solid transparent; background: transparent; color: var(--dsw-alias-label-secondary);
        font-size: 20px; line-height: 1; cursor: pointer;
      }
      .mpygen-icon-button:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); }
      .mpygen-icon-button:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .mpygen-body { padding: 18px 22px 20px; display: flex; flex-direction: column; gap: 16px; }
      .mpygen-example {
        display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
        padding: 9px 11px; border-radius: 9px; font-size: 12px;
        color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-2);
        border: 1px solid var(--dsw-alias-border-l1);
      }
      .mpygen-badge {
        flex: 0 0 auto; padding: 2px 7px; border-radius: 999px; font-size: 10.5px; font-weight: 650;
        color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
      }
      .mpygen-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: start; }
      .mpygen-card {
        display: flex; flex-direction: column; gap: 12px; min-width: 0;
        padding: 14px; border-radius: 12px; background: var(--dsw-alias-bg-layer-1);
        border: 1px solid var(--dsw-alias-border-l1);
      }
      .mpygen-card-head { display: flex; align-items: center; gap: 8px; }
      .mpygen-card-icon {
        display: grid; place-items: center; width: 26px; height: 26px; border-radius: 8px;
        color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
      }
      .mpygen-card-head h3 { margin: 0; font-size: 13.5px; font-weight: 650; }
      .mpygen-field { display: flex; flex-direction: column; gap: 5px; font-size: 12px; color: var(--dsw-alias-label-secondary); }
      .mpygen-field > span { font-weight: 600; color: var(--dsw-alias-label-primary); }
      .mpygen-field input,
      .mpygen-field select {
        width: 100%; box-sizing: border-box; min-height: 34px; padding: 7px 9px;
        color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base);
        border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px;
        font: inherit; font-size: 12.5px;
      }
      .mpygen-field select { cursor: pointer; }
      .mpygen-field input:focus-visible,
      .mpygen-field select:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .mpygen-field small { font-size: 11px; line-height: 1.45; color: var(--dsw-alias-label-secondary); }
      .mpygen-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
      @media (max-width: 420px) { .mpygen-pair { grid-template-columns: 1fr; } }
      .mpygen-detect { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; min-height: 20px; font-size: 11.5px; }
      .mpygen-status { display: inline-flex; align-items: center; gap: 4px; padding: 2px 7px; border-radius: 999px; font-size: 10.5px; font-weight: 650; }
      .mpygen-status::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
      .mpygen-status.ok { color: var(--dsw-alias-state-success-primary); background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 11%, transparent); }
      .mpygen-status.warn { color: var(--dsw-alias-state-warn-primary); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 11%, transparent); }
      .mpygen-detect-label { color: var(--dsw-alias-label-primary); font-weight: 550; overflow-wrap: anywhere; }
      .mpygen-muted { color: var(--dsw-alias-label-secondary); font-size: 11.5px; }
      .mpygen-pull { padding: 9px 10px; border-radius: 9px; border: 1px solid var(--dsw-alias-border-l1); }
      .mpygen-pull.ok { background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, transparent); border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 25%, var(--dsw-alias-border-l1)); }
      .mpygen-pull.warn { background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 9%, transparent); border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 28%, var(--dsw-alias-border-l1)); }
      .mpygen-pull.error { background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 9%, transparent); border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 30%, var(--dsw-alias-border-l1)); }
      .mpygen-pull-head { display: flex; align-items: center; gap: 6px; font-size: 11.5px; }
      .mpygen-pull-head strong { font-weight: 650; }
      .mpygen-pull p { margin: 4px 0 0; font-size: 11px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }
      .mpygen-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--dsw-alias-state-idle-primary); }
      .mpygen-pull.ok .mpygen-dot { background: var(--dsw-alias-state-success-primary); }
      .mpygen-pull.warn .mpygen-dot { background: var(--dsw-alias-state-warn-primary); }
      .mpygen-pull.error .mpygen-dot { background: var(--dsw-alias-state-error-primary); }
      .mpygen-invert {
        display: flex; align-items: flex-start; gap: 10px; padding: 12px;
        border-radius: 10px; background: var(--dsw-alias-bg-layer-1);
        border: 1px solid var(--dsw-alias-border-l1); cursor: pointer;
      }
      .mpygen-invert input { flex: 0 0 auto; width: 16px; height: 16px; margin-top: 1px; accent-color: var(--dsw-alias-brand-primary); cursor: pointer; }
      .mpygen-invert-text { display: flex; flex-direction: column; gap: 3px; }
      .mpygen-invert-text strong { font-size: 12.5px; font-weight: 650; }
      .mpygen-invert-text small { font-size: 11.5px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }
      .mpygen-levels { display: flex; flex-wrap: wrap; gap: 8px; }
      .mpygen-level { display: inline-flex; align-items: center; gap: 6px; padding: 5px 9px; border-radius: 999px; font-size: 11px; background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l1); }
      .mpygen-level span { color: var(--dsw-alias-label-secondary); }
      .mpygen-level strong { font-weight: 650; }
      .mpygen-level em { font-style: normal; font-size: 10px; padding: 1px 5px; border-radius: 999px; color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent); }
      .mpygen-alert { padding: 11px 12px; border-radius: 10px; border: 1px solid var(--dsw-alias-border-l1); }
      .mpygen-alert h3, .mpygen-tips h3 { margin: 0 0 6px; font-size: 12px; font-weight: 650; }
      .mpygen-alert ul, .mpygen-tips ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 4px; }
      .mpygen-alert li, .mpygen-tips li { position: relative; padding-left: 12px; font-size: 11.5px; line-height: 1.5; }
      .mpygen-alert li::before, .mpygen-tips li::before { content: ''; position: absolute; left: 2px; top: .55em; width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: .75; }
      .mpygen-alert.error { color: var(--dsw-alias-state-error-primary); background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent); border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 30%, var(--dsw-alias-border-l1)); }
      .mpygen-tips { padding: 11px 12px; border-radius: 10px; background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1); }
      .mpygen-tips li.info { color: var(--dsw-alias-label-secondary); }
      .mpygen-tips li.warn { color: var(--dsw-alias-state-warn-primary); }
      .mpygen-tips li.error { color: var(--dsw-alias-state-error-primary); }
      .mpygen-output-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
      .mpygen-output-head h3 { margin: 0; font-size: 13px; font-weight: 650; }
      .mpygen-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .mpygen-button {
        display: inline-flex; align-items: center; justify-content: center; min-height: 30px; padding: 5px 11px;
        border-radius: 8px; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary); font: inherit; font-size: 11.5px; font-weight: 600; cursor: pointer;
      }
      .mpygen-button:hover { background: var(--dsw-alias-bg-layer-2); }
      .mpygen-button:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .mpygen-button:disabled { opacity: .45; cursor: default; }
      .mpygen-button.primary { border-color: transparent; color: var(--dsw-alias-bg-base); background: var(--dsw-alias-brand-primary); }
      .mpygen-button.primary:hover { filter: brightness(1.06); }
      .mpygen-code {
        width: 100%; box-sizing: border-box; min-height: 280px; resize: vertical;
        padding: 12px 13px; border-radius: 10px;
        color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base);
        border: 1px solid var(--dsw-alias-border-l2);
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
        font-size: 12.5px; line-height: 1.55; tab-size: 4; white-space: pre; overflow: auto;
      }
      .mpygen-code:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .mpygen-code-empty { display: flex; align-items: center; justify-content: center; min-height: 180px; white-space: normal; color: var(--dsw-alias-label-secondary); font-family: inherit; font-size: 12px; }
      .mpygen-ai-card {
        display: flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1);
      }
      .mpygen-logic {
        width: 100%; box-sizing: border-box; min-height: 76px; resize: vertical;
        padding: 9px 10px; border-radius: 8px;
        color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base);
        border: 1px solid var(--dsw-alias-border-l2);
        font: inherit; font-size: 12.5px; line-height: 1.55;
      }
      .mpygen-logic:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .mpygen-ai-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .mpygen-ai-note { margin: 0; font-size: 10.5px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }
      .mpygen-ai-error { margin: 0; font-size: 11.5px; line-height: 1.5; }
      .mpygen-output-title { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .mpygen-source { padding: 2px 7px; border-radius: 999px; font-size: 10px; font-weight: 650; border: 1px solid var(--dsw-alias-border-l1); }
      .mpygen-source.local { color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-2); }
      .mpygen-source.ai {
        color: var(--dsw-alias-brand-primary);
        background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
        border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, var(--dsw-alias-border-l1));
      }
      .mpygen-alert.warn {
        color: var(--dsw-alias-state-warn-primary);
        background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 8%, transparent);
        border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 30%, var(--dsw-alias-border-l1));
      }
      .mpygen-safety {
        display: flex; flex-direction: column; gap: 8px; padding: 12px 14px;
        border-radius: 12px; border: 2px solid var(--dsw-alias-state-error-primary);
        background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent);
      }
      .mpygen-safety-head { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; color: var(--dsw-alias-state-error-primary); }
      .mpygen-safety-head strong { font-size: 13.5px; font-weight: 700; }
      .mpygen-safety-terms {
        padding: 1px 7px; border-radius: 999px; font-size: 10.5px;
        border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 40%, transparent);
      }
      .mpygen-safety p { margin: 0; font-size: 11.5px; line-height: 1.55; color: var(--dsw-alias-label-primary); }
      .mpygen-safety-ack {
        display: flex; align-items: flex-start; gap: 8px; cursor: pointer;
        font-size: 11.5px; line-height: 1.5; color: var(--dsw-alias-label-primary);
      }
      .mpygen-safety-ack input {
        flex: 0 0 auto; width: 16px; height: 16px; margin-top: 1px;
        accent-color: var(--dsw-alias-state-error-primary); cursor: pointer;
      }
      .mpygen-safety-required { color: var(--dsw-alias-state-error-primary) !important; font-weight: 650; }
      .mpygen-copy-error { margin: 6px 0 0; font-size: 11px; color: var(--dsw-alias-state-error-primary); }
      .mpygen-footnote { margin: 0; font-size: 10.5px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }
      @media (max-width: 760px) {
        .mpygen-backdrop { padding: 8px; }
        .mpygen-panel { max-height: calc(100vh - 16px); border-radius: 12px; }
        .mpygen-header { padding: 16px 16px 12px; }
        .mpygen-body { padding: 14px 16px 16px; }
        .mpygen-grid { grid-template-columns: 1fr; }
        .mpygen-launcher-text { display: none; }
        .mpygen-launcher { width: 38px; padding: 11px 7px; }
      }
    `;

    function fill(template, values) {
      return String(template).replace(/\{(\w+)\}/g, (match, key) => {
        return values && values[key] !== undefined ? String(values[key]) : match;
      });
    }

    function cleanComment(value) {
      return String(value == null ? '' : value).replace(/[\r\n]+/g, ' ').replace(/#/g, '＃').trim();
    }

    function pyString(value) {
      return '"' + String(value == null ? '' : value)
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\r?\n/g, '\\n') + '"';
    }

    function normalize(value) {
      return String(value == null ? '' : value)
        .toLowerCase()
        .replace(/[\s_\-—–·.,，。:：;；/\\()[\]{}（）【】]+/g, '');
    }

    function hasAny(haystack, needles) {
      return needles.some((needle) => haystack.includes(normalize(needle)));
    }

    function splitPinTokens(value) {
      return String(value == null ? '' : value)
        .split(/[\s,，、;；/]+/)
        .map((part) => part.trim())
        .filter(Boolean);
    }

    function parsePinToken(token) {
      const raw = String(token == null ? '' : token).trim();
      const match = raw.toUpperCase().match(/^(?:GPIO|IO|D|G)?\s*(\d{1,3})$/);
      if (!match) return { ok: false, code: 'syntax', raw };
      return { ok: true, pin: Number(match[1]), raw };
    }

    function pinLabel(pin) {
      return 'GPIO' + pin;
    }

    const RESERVED_PINS = new Set([6, 7, 8, 9, 10, 11]);
    const UNAVAILABLE_PINS = new Set([20, 24, 28, 29, 30, 31]);
    const INPUT_ONLY_PINS = new Set([34, 35, 36, 37, 38, 39]);
    const STRAPPING_PINS = new Set([0, 2, 12, 15]);
    const UART_PINS = new Set([1, 3]);
    const PSRAM_PINS = new Set([16, 17]);
    const ADC1_PINS = new Set([32, 33, 34, 35, 36, 37, 38, 39]);
    const ADC2_PINS = new Set([0, 2, 4, 12, 13, 14, 15, 25, 26, 27]);

    const HIGH_LEVEL_TOKENS = ['高电平', '高电平触发', '高触发', 'active high', 'high level', 'high-level'];
    const LOW_LEVEL_TOKENS = ['低电平', '低电平触发', '低触发', 'active low', 'low level', 'low-level'];

    const GENERIC_SENSOR = {
      id: 'generic-sensor',
      match: [],
      priority: 0,
      labelKey: 'model.generic-sensor',
      kind: 'digital',
      event: 'generic',
      active: 0,
      pull: 'up',
      pullHintKey: 'hint.pullUnknown',
      noteKeys: [],
      delay: 50,
      recognized: false,
    };

    const GENERIC_RELAY = {
      id: 'generic-relay',
      match: [],
      priority: 0,
      labelKey: 'model.generic-relay',
      kind: 'module',
      active: 0,
      pullHintKey: 'hint.relayUnknown',
      noteKeys: [],
      recognized: false,
    };

    const SENSOR_LIBRARY = [
      {
        id: 'hc-sr501', match: ['hc-sr501', 'hcsr501', 'hc-sr505', 'hcsr505'], priority: 30,
        labelKey: 'model.hc-sr501', kind: 'digital', event: 'pir', active: 1, pull: 'none',
        pullHintKey: 'hint.pullPir', noteKeys: ['note.pir3v3', 'note.pirWarmup'], warmup: 30, delay: 100, recognized: true,
      },
      {
        id: 'am312', match: ['am312', 'am412'], priority: 30,
        labelKey: 'model.am312', kind: 'digital', event: 'pir', active: 1, pull: 'none',
        pullHintKey: 'hint.pullPir', noteKeys: ['note.am312Warmup'], warmup: 5, delay: 100, recognized: true,
      },
      {
        id: 'rcwl-0516', match: ['rcwl-0516', 'rcwl0516'], priority: 30,
        labelKey: 'model.rcwl-0516', kind: 'digital', event: 'pir', active: 1, pull: 'none',
        pullHintKey: 'hint.pullRadar', noteKeys: ['note.radar3v3'], warmup: 2, delay: 100, recognized: true,
      },
      {
        id: 'pir', match: ['pir', '人体红外', '热释电'], priority: 12,
        labelKey: 'model.pir', kind: 'digital', event: 'pir', active: 1, pull: 'none',
        pullHintKey: 'hint.pullPir', noteKeys: ['note.pir3v3', 'note.pirWarmup'], warmup: 30, delay: 100, recognized: true,
      },
      {
        id: 'button', match: ['按键', '按钮', 'button', '轻触', '触摸', 'touch'], priority: 10,
        labelKey: 'model.button', kind: 'digital', event: 'button', active: 0, pull: 'up',
        pullHintKey: 'hint.pullSwitch', noteKeys: [], delay: 20, recognized: true,
      },
      {
        id: 'reed', match: ['磁簧', '门磁', 'reed', '干簧'], priority: 14,
        labelKey: 'model.reed', kind: 'digital', event: 'reed', active: 0, pull: 'up',
        pullHintKey: 'hint.pullSwitch', noteKeys: [], delay: 20, recognized: true,
      },
      {
        id: 'float', match: ['浮球', '液位', 'float'], priority: 14,
        labelKey: 'model.float', kind: 'digital', event: 'float', active: 0, pull: 'up',
        pullHintKey: 'hint.pullSwitch', noteKeys: [], delay: 20, recognized: true,
      },
      {
        id: 'tilt', match: ['倾斜', 'tilt', '滚珠'], priority: 12,
        labelKey: 'model.tilt', kind: 'digital', event: 'tilt', active: 0, pull: 'up',
        pullHintKey: 'hint.pullSwitch', noteKeys: [], delay: 20, recognized: true,
      },
      {
        id: 'vibration', match: ['震动', '振动', 'vibration', 'sw-420', 'sw420'], priority: 12,
        labelKey: 'model.vibration', kind: 'digital', event: 'vibration', active: 0, pull: 'up',
        pullHintKey: 'hint.pullSwitch', noteKeys: [], delay: 20, recognized: true,
      },
      {
        id: 'flame', match: ['火焰', 'flame', 'ky-026', 'ky026'], priority: 12,
        labelKey: 'model.flame', kind: 'digital', event: 'flame', active: 0, pull: 'up',
        pullHintKey: 'hint.pullSwitch', noteKeys: [], delay: 50, recognized: true,
      },
      {
        id: 'rain', match: ['雨滴', '雨水', 'rain'], priority: 12,
        labelKey: 'model.rain', kind: 'digital', event: 'rain', active: 0, pull: 'up',
        pullHintKey: 'hint.pullSwitch', noteKeys: [], delay: 50, recognized: true,
      },
      {
        id: 'leak', match: ['漏水', '水浸', '液漏', 'water leak', 'leak'], priority: 16,
        labelKey: 'model.leak', kind: 'digital', event: 'leak', active: 0, pull: 'up',
        pullHintKey: 'hint.pullLeak', noteKeys: ['note.leak'], delay: 500, recognized: true,
      },
      {
        id: 'soil-digital', match: ['土壤湿度数字', '土壤数字', 'soil digital', 'yl-69', 'yl69', '土壤湿度'], priority: 12,
        labelKey: 'model.soil-digital', kind: 'digital', event: 'soil', active: 0, pull: 'up',
        pullHintKey: 'hint.pullSwitch', noteKeys: ['note.soilAnalog'], delay: 200, recognized: true,
      },
      {
        id: 'obstacle', match: ['避障', '红外避障', 'obstacle', 'ir obstacle'], priority: 12,
        labelKey: 'model.obstacle', kind: 'digital', event: 'obstacle', active: 0, pull: 'up',
        pullHintKey: 'hint.pullSwitch', noteKeys: [], delay: 50, recognized: true,
      },
      {
        id: 'line', match: ['循迹', 'tracking', 'line follower'], priority: 12,
        labelKey: 'model.line', kind: 'digital', event: 'line', active: 0, pull: 'up',
        pullHintKey: 'hint.pullSwitch', noteKeys: [], delay: 20, recognized: true,
      },
      {
        id: 'dht11', match: ['dht11'], priority: 40,
        labelKey: 'model.dht11', kind: 'dht11', event: 'temperature', active: 1, pull: 'up',
        pullHintKey: 'hint.pullDht', noteKeys: ['note.dhtModulePull'], recognized: true,
      },
      {
        id: 'dht22', match: ['dht22', 'am2302'], priority: 40,
        labelKey: 'model.dht22', kind: 'dht22', event: 'temperature', active: 1, pull: 'up',
        pullHintKey: 'hint.pullDht', noteKeys: ['note.dhtModulePull'], recognized: true,
      },
      {
        id: 'hc-sr04', match: ['hc-sr04', 'hcsr04', '超声波', 'ultrasonic'], priority: 40,
        labelKey: 'model.hc-sr04', kind: 'ultrasonic', event: 'distance', active: 1, pull: 'none',
        pullHintKey: 'hint.pullUltrasonic', noteKeys: [], recognized: true,
      },
      {
        id: 'analog', match: ['模拟', 'analog', 'lm35', 'ldr', '光敏电阻', '电位器', 'potentiometer'], priority: 35,
        labelKey: 'model.analog', kind: 'analog', event: 'analog', active: 1, pull: 'none',
        pullHintKey: 'hint.pullAnalog', noteKeys: ['note.analogAdc1'], recognized: true,
      },
      {
        id: 'generic-sensor', match: ['通用数字', '通用传感器', 'generic digital', 'generic sensor', '数字传感器', 'digital sensor'], priority: 5,
        labelKey: 'model.generic-sensor', kind: 'digital', event: 'generic', active: 0, pull: 'up',
        pullHintKey: 'hint.pullUnknown', noteKeys: [], delay: 50, recognized: true,
      },
    ];

    const RELAY_LIBRARY = [
      {
        id: 'ssr', match: ['ssr', '固态继电器', 'g3mb', 'fotek'], priority: 30,
        labelKey: 'model.ssr', kind: 'ssr', active: 1,
        pullHintKey: 'hint.relaySsr', noteKeys: [], recognized: true,
      },
      {
        id: 'bare-relay', match: ['裸继电器', '裸线圈', '线圈', 'coil', 'srd-05vdc', 'jqc-3ff', 'srd'], priority: 15,
        labelKey: 'model.bare-relay', kind: 'bare', active: 1,
        pullHintKey: 'hint.relayBare', noteKeys: [], recognized: true,
      },
      {
        id: 'relay-low', match: ['低电平'], priority: 20,
        labelKey: 'model.relay-low', kind: 'module', active: 0,
        pullHintKey: 'hint.relayModule', noteKeys: ['note.relayModule'], recognized: true,
      },
      {
        id: 'relay-high', match: ['高电平'], priority: 20,
        labelKey: 'model.relay-high', kind: 'module', active: 1,
        pullHintKey: 'hint.relayModule', noteKeys: ['note.relayModule'], recognized: true,
      },
      {
        id: 'relay-module', match: ['继电器模块', 'relay module', '1路', '2路', '4路', '8路', 'songle'], priority: 20,
        labelKey: 'model.relay-module', kind: 'module', active: 0,
        pullHintKey: 'hint.relayModule', noteKeys: ['note.relayModule'], recognized: true,
      },
      {
        id: 'generic-relay', match: ['继电器', 'relay'], priority: 5,
        labelKey: 'model.generic-relay', kind: 'module', active: 0,
        pullHintKey: 'hint.relayModule', noteKeys: [], recognized: true,
      },
    ];

    function findBest(library, normalizedQuery) {
      let best = null;
      let bestScore = -1;
      for (const entry of library) {
        for (const token of entry.match) {
          const normalizedToken = normalize(token);
          if (normalizedToken && normalizedQuery.includes(normalizedToken)) {
            const score = (entry.priority || 0) * 100 + normalizedToken.length;
            if (score > bestScore) {
              best = entry;
              bestScore = score;
            }
          }
        }
      }
      return best;
    }

    function levelOverride(normalizedQuery) {
      if (hasAny(normalizedQuery, LOW_LEVEL_TOKENS)) return 0;
      if (hasAny(normalizedQuery, HIGH_LEVEL_TOKENS)) return 1;
      return null;
    }

    function detectSensor(rawModel) {
      const query = normalize(rawModel);
      if (!query) return null;
      const base = findBest(SENSOR_LIBRARY, query);
      const level = levelOverride(query);
      if (base) {
        return { ...base, active: level === null ? base.active : level, explicitLevel: level };
      }
      if (level !== null) {
        return {
          ...GENERIC_SENSOR,
          active: level,
          pull: level === 1 ? 'none' : 'up',
          explicitLevel: level,
        };
      }
      return { ...GENERIC_SENSOR };
    }

    function detectRelay(rawModel) {
      const query = normalize(rawModel);
      if (!query) return null;
      const base = findBest(RELAY_LIBRARY, query);
      const level = levelOverride(query);
      if (base) {
        return { ...base, active: level === null ? base.active : level, explicitLevel: level };
      }
      if (level !== null) {
        return { ...GENERIC_RELAY, active: level, explicitLevel: level };
      }
      return { ...GENERIC_RELAY };
    }

    function addUnique(list, value) {
      if (value && !list.includes(value)) list.push(value);
    }

    function validateBasePin(pin, errors, warnings, t) {
      if (pin < 0 || pin > 39) {
        addUnique(errors, fill(t('err.pinRange'), { pin }));
        return false;
      }
      if (RESERVED_PINS.has(pin)) {
        addUnique(errors, fill(t('err.pinFlash'), { pin }));
      }
      if (UNAVAILABLE_PINS.has(pin)) {
        addUnique(warnings, fill(t('warn.pinUnavailable'), { pin }));
      }
      if (STRAPPING_PINS.has(pin)) {
        addUnique(warnings, fill(t('warn.pinStrapping'), { pin }));
      }
      if (UART_PINS.has(pin)) {
        addUnique(warnings, fill(t('warn.pinUart'), { pin }));
      }
      if (PSRAM_PINS.has(pin)) {
        addUnique(warnings, fill(t('warn.pinPsram'), { pin }));
      }
      return !RESERVED_PINS.has(pin);
    }

    function buildPullStatus(kind, t, pullHintKey) {
      const map = {
        none: { tone: 'ok', titleKey: 'pullNone' },
        up: { tone: 'warn', titleKey: 'pullUp' },
        down: { tone: 'warn', titleKey: 'pullDown' },
        external: { tone: 'warn', titleKey: 'pullExternal' },
        driver: { tone: 'error', titleKey: 'pullDriver' },
        analog: { tone: 'ok', titleKey: 'pullAnalog' },
        ultrasonic: { tone: 'ok', titleKey: 'pullUltrasonic' },
        i2c: { tone: 'ok', titleKey: 'pullNone' },
        uart: { tone: 'ok', titleKey: 'pullNone' },
      };
      const entry = map[kind] || map.none;
      return { tone: entry.tone, title: t(entry.titleKey), body: t(pullHintKey) };
    }

    function buildOutputDriveStatus(kind, t, pullHintKey) {
      const map = {
        none: { tone: 'ok', titleKey: 'relayNone' },
        driver: { tone: 'error', titleKey: 'relayDriver' },
        ssr: { tone: 'warn', titleKey: 'relaySsr' },
        servo: { tone: 'warn', titleKey: 'relayServo' },
        motor: { tone: 'error', titleKey: 'relayMotor' },
        uart: { tone: 'warn', titleKey: 'relayUart' },
        pwmRelay: { tone: 'warn', titleKey: 'relayPwm' },
        digital: { tone: 'warn', titleKey: 'relayDigital' },
      };
      const entry = map[kind] || map.none;
      return { tone: entry.tone, title: t(entry.titleKey), body: t(pullHintKey) };
    }

    function resolveInputKind(input, category, rawModel) {
      if (category === 'digital') return 'digital';
      if (category === 'analog') return 'analog';
      if (input && (input.kind === 'dht11' || input.kind === 'dht22')) return input.kind;
      if (input && input.kind === 'ultrasonic') return 'ultrasonic';
      const query = normalize(rawModel);
      if (hasAny(query, ['i2c', 'iic', 'sda', 'scl', 'bme280', 'mpu6050', 'ssd1306', 'ads1115', 'pcf8574'])) return 'i2c';
      return 'uart';
    }

    function resolveOutputKind(category, type) {
      if (category === 'communication') return 'uart';
      if (category === 'pwm') {
        if (type === 'servo') return 'servo';
        if (type === 'motor') return 'motor';
        return 'pwm-relay';
      }
      if (type === 'relay') return 'relay';
      return 'digital';
    }

    function inputPinCount(kind) {
      return kind === 'ultrasonic' || kind === 'i2c' || kind === 'uart' ? 2 : 1;
    }

    function inputEventFor(kind, input) {
      if (kind === 'digital') return input && input.event ? input.event : 'generic';
      if (kind === 'analog') return 'analog';
      if (kind === 'dht11' || kind === 'dht22') return 'temperature';
      if (kind === 'ultrasonic') return 'distance';
      if (kind === 'i2c') return 'i2c';
      return 'uart';
    }

    function inputPinHintKey(kind) {
      if (kind === 'analog') return 'pinHint.inputAnalog';
      if (kind === 'dht11' || kind === 'dht22') return 'pinHint.inputDht';
      if (kind === 'ultrasonic') return 'pinHint.inputUltrasonic';
      if (kind === 'i2c') return 'pinHint.inputI2c';
      if (kind === 'uart') return 'pinHint.inputUart';
      return 'pinHint.inputDigital';
    }

    function outputPinHintKey(kind) {
      if (kind === 'servo') return 'pinHint.outputServo';
      if (kind === 'motor') return 'pinHint.outputMotor';
      if (kind === 'uart') return 'pinHint.outputUart';
      return 'pinHint.outputDigital';
    }

    function pyBytes(value) {
      return 'b"' + String(value == null ? '' : value)
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\r?\n/g, '\\n') + '"';
    }

    const HIGH_POWER_TERMS = [
      '泵', '电机', '马达', '压缩机', '空调', '加热', '电热', '热水器',
      '电磁阀', '电磁铁', '接触器', '逆变器', '大功率', '市电', '交流电',
      '220v', '110v', 'pump', 'motor', 'heater', 'compressor', 'solenoid',
      'mains', 'high power', 'high-power',
    ];

    function detectHighPower(state) {
      const haystack = [
        String(state.outputModel || ''),
        String(state.customLogic || ''),
        state.outputType === 'motor' ? '电机' : '',
      ].join(' ').toLowerCase();
      const matched = HIGH_POWER_TERMS.filter((term) => haystack.includes(term));
      return { highPower: matched.length > 0, matched };
    }

    function analyze(state, t) {
      const inputModel = state.inputModel !== undefined ? state.inputModel : (state.sensorModel || '');
      const outputModel = state.outputModel !== undefined ? state.outputModel : (state.relayModel || '');
      const inputPinText = state.inputPin !== undefined ? state.inputPin : (state.sensorPin || '');
      const outputPinText = state.outputPin !== undefined ? state.outputPin : (state.relayPin || '');
      const outputDirPinText = state.outputDirPin || '';
      const inputCategory = state.inputCategory || 'digital';
      const outputCategory = state.outputCategory || 'digital';
      const outputType = state.outputType || 'relay';
      const invert = Boolean(state.invert);
      const safety = detectHighPower({ outputModel, outputType, customLogic: state.customLogic });

      const input = detectSensor(inputModel) || { ...GENERIC_SENSOR };
      const output = detectRelay(outputModel) || { ...GENERIC_RELAY };
      const inputKind = resolveInputKind(input, inputCategory, inputModel);
      const outputKind = resolveOutputKind(outputCategory, outputType);
      const inputPinsNeeded = inputPinCount(inputKind);
      const errors = [];
      const warnings = [];
      const tips = [];
      const tipSeen = new Set();

      function addTip(tone, text) {
        if (!text) return;
        const key = tone + '|' + text;
        if (!tipSeen.has(key)) {
          tipSeen.add(key);
          tips.push({ tone, text });
        }
      }

      const incomplete =
        !String(inputModel || '').trim() ||
        !String(inputPinText || '').trim() ||
        !String(outputModel || '').trim() ||
        !String(outputPinText || '').trim();

      const inputTokens = splitPinTokens(inputPinText);
      const inputPins = inputTokens.map(parsePinToken);
      const outputPin = parsePinToken(outputPinText);
      const dirPin = parsePinToken(outputDirPinText);
      const outputHasInput = Boolean(String(outputPinText || '').trim());
      const dirHasInput = Boolean(String(outputDirPinText || '').trim());

      if (String(inputModel || '').trim() && inputTokens.length && inputTokens.length !== inputPinsNeeded) {
        addUnique(errors, fill(t('err.inputPinCount'), { count: inputPinsNeeded }));
      }

      inputPins.forEach((parsed, index) => {
        if (!parsed.ok) {
          addUnique(errors, fill(t('err.pinSyntax'), { pin: parsed.raw }));
          return;
        }
        const baseOk = validateBasePin(parsed.pin, errors, warnings, t);
        if (!baseOk) return;
        if ((inputKind === 'dht11' || inputKind === 'dht22') && INPUT_ONLY_PINS.has(parsed.pin)) {
          addUnique(errors, fill(t('err.dhtInputOnly'), { pin: parsed.pin }));
        }
        if (inputKind === 'ultrasonic' && index === 0 && INPUT_ONLY_PINS.has(parsed.pin)) {
          addUnique(errors, fill(t('err.pinInputOnlyTrig'), { pin: parsed.pin }));
        }
        if (inputKind === 'analog') {
          if (!ADC1_PINS.has(parsed.pin) && !ADC2_PINS.has(parsed.pin)) {
            addUnique(errors, fill(t('err.analogPin'), { pin: parsed.pin }));
          } else if (ADC2_PINS.has(parsed.pin)) {
            addUnique(warnings, fill(t('warn.adc2'), { pin: parsed.pin }));
          }
        }
        if (inputKind === 'i2c' && INPUT_ONLY_PINS.has(parsed.pin)) {
          addUnique(errors, fill(t('err.i2cInputOnly'), { pin: parsed.pin }));
        }
        if (inputKind === 'uart' && index === 0 && INPUT_ONLY_PINS.has(parsed.pin)) {
          addUnique(errors, fill(t('err.uartTxInputOnly'), { pin: parsed.pin }));
        }
      });

      if (inputPinsNeeded > 1 && inputPins.length >= 2 && inputPins[0].ok && inputPins[1].ok && inputPins[0].pin === inputPins[1].pin) {
        addUnique(errors, t('err.inputPinSame'));
      }

      if (outputHasInput) {
        if (!outputPin.ok) {
          addUnique(errors, fill(t('err.pinSyntax'), { pin: outputPin.raw }));
        } else {
          const baseOk = validateBasePin(outputPin.pin, errors, warnings, t);
          if (baseOk && INPUT_ONLY_PINS.has(outputPin.pin)) {
            addUnique(errors, fill(t('err.outputPinInputOnly'), { pin: outputPin.pin }));
          }
        }
      }

      if (outputPin.ok) {
        for (const parsed of inputPins) {
          if (parsed.ok && parsed.pin === outputPin.pin) {
            addUnique(errors, fill(t('err.ioSame'), { pin: parsed.pin }));
          }
        }
      }

      if (outputKind === 'motor' && dirHasInput) {
        if (!dirPin.ok) {
          addUnique(errors, fill(t('err.pinSyntax'), { pin: dirPin.raw }));
        } else {
          const baseOk = validateBasePin(dirPin.pin, errors, warnings, t);
          if (baseOk && INPUT_ONLY_PINS.has(dirPin.pin)) {
            addUnique(errors, fill(t('err.dirInputOnly'), { pin: dirPin.pin }));
          }
          if (outputPin.ok && dirPin.pin === outputPin.pin) {
            addUnique(errors, t('err.dirSame'));
          }
          for (const parsed of inputPins) {
            if (parsed.ok && parsed.pin === dirPin.pin) addUnique(errors, t('err.dirSame'));
          }
        }
      }

      let inputPullKind = 'none';
      let inputPullHintKey = input.pullHintKey;
      if (inputKind === 'digital') {
        inputPullKind = input.pull;
        inputPullHintKey = input.recognized && input.kind !== 'digital' ? 'hint.pullUnknown' : input.pullHintKey;
        if ((inputPullKind === 'up' || inputPullKind === 'down') && inputPins[0] && inputPins[0].ok && INPUT_ONLY_PINS.has(inputPins[0].pin)) {
          inputPullKind = 'external';
          addUnique(warnings, fill(t('warn.pullUnavailable'), { pin: inputPins[0].pin }));
        }
      } else if (inputKind === 'analog') {
        inputPullKind = 'analog';
        inputPullHintKey = 'hint.pullAnalog';
      } else if (inputKind === 'dht11' || inputKind === 'dht22') {
        inputPullKind = 'external';
        inputPullHintKey = 'hint.pullDht';
      } else if (inputKind === 'ultrasonic') {
        inputPullKind = 'ultrasonic';
        inputPullHintKey = 'hint.pullUltrasonic';
      } else if (inputKind === 'i2c') {
        inputPullKind = 'i2c';
        inputPullHintKey = 'hint.pullI2c';
      } else {
        inputPullKind = 'uart';
        inputPullHintKey = 'hint.pullUart';
      }

      const inputPullStatus = buildPullStatus(inputPullKind, t, inputPullHintKey);

      let outputDriveKind = 'none';
      let outputPullHintKey = output.pullHintKey;
      if (outputKind === 'relay') {
        outputDriveKind = output.kind === 'bare' ? 'driver' : output.kind === 'ssr' ? 'ssr' : 'none';
        outputPullHintKey = output.pullHintKey;
      } else if (outputKind === 'pwm-relay') {
        outputDriveKind = 'pwmRelay';
        outputPullHintKey = 'hint.outputPwmRelay';
      } else if (outputKind === 'servo') {
        outputDriveKind = 'servo';
        outputPullHintKey = 'hint.outputServo';
      } else if (outputKind === 'motor') {
        outputDriveKind = 'motor';
        outputPullHintKey = 'hint.outputMotor';
      } else if (outputKind === 'uart') {
        outputDriveKind = 'uart';
        outputPullHintKey = 'hint.outputUart';
      } else {
        outputDriveKind = 'digital';
        outputPullHintKey = 'hint.outputDigitalServo';
      }

      const outputDriveStatus = buildOutputDriveStatus(outputDriveKind, t, outputPullHintKey);

      if (input.noteKeys) {
        for (const key of input.noteKeys) addTip('info', t(key));
      }
      if (outputType === 'relay' && output.noteKeys) {
        for (const key of output.noteKeys) addTip('info', t(key));
      }
      if (!input.recognized && String(inputModel || '').trim()) addTip('warn', t('warn.customInput'));
      if (outputType === 'relay' && !output.recognized && String(outputModel || '').trim()) addTip('warn', t('warn.customOutput'));
      if (input.recognized && inputCategory === 'digital' && input.kind !== 'digital') addTip('warn', t('warn.inputCategoryMismatch'));
      if (input.recognized && inputCategory === 'analog' && input.kind !== 'analog') addTip('warn', t('warn.inputCategoryMismatch'));
      if (input.recognized && inputCategory === 'communication' && !['dht11', 'dht22', 'ultrasonic'].includes(input.kind)) addTip('warn', t('warn.inputCategoryMismatch'));
      if (outputCategory === 'pwm' && outputType === 'relay') {
        addTip('warn', t('warn.outputCategoryMismatch'));
        addTip('warn', t('warn.pwmRelay'));
      }
      if (outputCategory === 'digital' && outputType !== 'relay') {
        addTip('warn', t('warn.outputCategoryMismatch'));
        addTip('warn', t('warn.digitalServoMotor'));
      }
      if (outputCategory === 'communication') addTip('warn', t('warn.uartTemplate'));
      if (inputKind === 'i2c') addTip('warn', t('warn.i2cTemplate'));
      if (inputKind === 'uart') addTip('warn', t('warn.uartTemplate'));
      if (outputKind === 'motor' && !dirHasInput) addTip('warn', t('warn.motorDir'));
      if (invert) addTip('info', t('warn.invert'));
      for (const warning of warnings) addTip('warn', warning);

      const inputActive = inputKind === 'digital' ? (invert ? 1 - input.active : input.active) : null;
      const outputActive = outputType === 'relay' ? (invert ? 1 - output.active : output.active) : 1;
      const inputInvertApplies = inputKind === 'digital';
      const outputInvertApplies = outputKind === 'relay' && outputType === 'relay';
      const invertApplies = inputInvertApplies || outputInvertApplies;
      if (invert && !invertApplies) addTip('info', t('invertUnused'));

      const inputLabel = input.recognized ? t(input.labelKey) : (String(inputModel || '').trim() || t('model.generic-sensor'));
      const outputLabel = outputType === 'relay' && output.recognized
        ? t(output.labelKey)
        : (String(outputModel || '').trim() || t('outputType.' + outputType));
      const inputEvent = inputEventFor(inputKind, input);

      const ready = !incomplete && errors.length === 0 && inputPins.length === inputPinsNeeded && outputPin.ok;
      let code = '';
      if (ready) {
        code = buildCode({
          input,
          output,
          inputCategory,
          outputCategory,
          outputType,
          inputKind,
          outputKind,
          inputPins,
          outputPin,
          dirPin,
          inputActive,
          outputActive,
          inputPullKind,
          invert,
          inputLabel,
          outputLabel,
          inputEvent,
          safety,
        }, t);
      }

      return {
        input,
        output,
        inputCategory,
        outputCategory,
        outputType,
        inputKind,
        outputKind,
        inputPins,
        outputPin,
        dirPin,
        inputActive,
        outputActive,
        inputPullKind,
        inputPullStatus,
        outputDriveStatus,
        inputPinHint: t(inputPinHintKey(inputKind)),
        outputPinHint: t(outputPinHintKey(outputKind)),
        dirPinHint: t('pinHint.outputDir'),
        inputLabel,
        outputLabel,
        inputEvent,
        inputInvertApplies,
        outputInvertApplies,
        invertApplies,
        safety,
        incomplete,
        errors,
        tips,
        ready,
        code,
      };
    }

    function buildCode(spec, t) {
      const {
        inputKind, outputKind, inputPins, outputPin, dirPin,
        inputActive, outputActive, inputPullKind, invert,
        inputLabel, outputLabel, inputEvent, inputCategory, outputCategory, outputType, output,
        safety,
      } = spec;
      const lines = [];
      const imports = ['import machine', 'import time'];
      if (inputKind === 'dht11' || inputKind === 'dht22') imports.push('import dht');
      const eventOn = t('event.' + inputEvent + '.on');
      const eventOff = t('event.' + inputEvent + '.off');
      const eventFail = t('event.' + inputEvent + '.fail');
      const inputName = cleanComment(inputLabel);
      const outputName = cleanComment(outputLabel);
      const primaryInput = inputPins[0].pin;
      const outputGpio = outputPin.pin;
      const relayInactive = 1 - outputActive;
      const servoOnAngle = 90;
      const servoOffAngle = 0;
      const motorSpeed = 60;
      const relayComment = output.kind === 'bare' ? t('code.bareDriver') : '';

      lines.push('# -*- coding: utf-8 -*-');
      if (safety && safety.highPower) {
        lines.push('# ==========================================');
        lines.push('# ⚠️ ' + t('code.safetyTitle') + '：' + safety.matched.join('、'));
        lines.push('# ⚠️ ' + t('code.safetyPower'));
        lines.push('# ⚠️ ' + t('code.safetyNoDirect'));
        lines.push('# ⚠️ ' + t('code.safetyMains'));
        lines.push('# ==========================================');
      }
      lines.push('# ' + t('code.title'));
      lines.push('# ' + t('code.input') + ': ' + inputName + ' [' + t('category.' + inputCategory) + '] -> ' + inputPins.map((pin) => pinLabel(pin.pin)).join(', '));
      lines.push('# ' + t('code.output') + ': ' + outputName + ' [' + t('outputType.' + outputType) + ' / ' + t('category.' + outputCategory) + '] -> ' + pinLabel(outputGpio));
      lines.push('# ' + (invert ? t('code.invertOn') : t('code.invertOff')));
      if (inputKind === 'digital') {
        lines.push('# ' + fill(t('code.logic'), { active: inputActive, inactive: 1 - inputActive }));
      } else if (inputKind === 'analog') {
        lines.push('# ' + fill(t('code.analogLogic'), { threshold: 30000 }));
      } else if (inputKind === 'dht11' || inputKind === 'dht22') {
        lines.push('# ' + fill(t('code.tempLogic'), { threshold: 30.0 }));
      } else if (inputKind === 'ultrasonic') {
        lines.push('# ' + fill(t('code.distanceLogic'), { threshold: 30 }));
      } else {
        lines.push('# ' + t('code.protocolLogic'));
      }
      if (outputKind === 'relay') {
        lines.push('# ' + fill(t('code.relayLogic'), { active: outputActive, inactive: relayInactive }));
      } else if (outputKind === 'servo') {
        lines.push('# ' + fill(t('code.servoLogic'), { on: servoOnAngle, off: servoOffAngle }));
      } else if (outputKind === 'motor') {
        lines.push('# ' + fill(t('code.motorLogic'), { speed: motorSpeed }));
      } else if (outputKind === 'uart') {
        lines.push('# ' + t('code.uartLogic'));
      } else if (outputKind === 'digital') {
        lines.push('# ' + t('code.digitalLogic'));
      } else {
        lines.push('# ' + fill(t('code.relayLogic'), { active: 1, inactive: 0 }));
      }
      lines.push('');
      lines.push(...imports);
      lines.push('');

      if (inputKind === 'digital') {
        const pullArg = inputPullKind === 'up'
          ? ', machine.Pin.PULL_UP'
          : inputPullKind === 'down'
            ? ', machine.Pin.PULL_DOWN'
            : '';
        const pullComment = inputPullKind === 'up'
          ? t('code.pullUp')
          : inputPullKind === 'down'
            ? t('code.pullDown')
            : inputPullKind === 'external'
              ? t('code.pullExternal')
              : t('code.noPull');
        lines.push('input_pin = machine.Pin(' + primaryInput + ', machine.Pin.IN' + pullArg + ')  # ' + pullComment);
        lines.push('INPUT_DEBOUNCE_MS = 30  # ' + fill(t('code.debounce'), { ms: 30 }));
        lines.push('INPUT_ACTIVE_LEVEL = ' + inputActive + '  # ' + fill(t('code.logic'), { active: inputActive, inactive: 1 - inputActive }));
        lines.push('LOOP_DELAY_MS = 500  # ' + t('code.loopDelay'));
        lines.push('');
        lines.push('def read_input():');
        lines.push('    # ' + t('code.debounceRead'));
        lines.push('    first = input_pin.value()');
        lines.push('    time.sleep_ms(INPUT_DEBOUNCE_MS)');
        lines.push('    second = input_pin.value()');
        lines.push('    if first == second:');
        lines.push('        return second');
        lines.push('    return None');
        lines.push('');
      } else if (inputKind === 'analog') {
        lines.push('input_adc = machine.ADC(machine.Pin(' + primaryInput + '))');
        lines.push('input_adc.atten(machine.ADC.ATTN_11DB)');
        lines.push('INPUT_SAMPLES = 5  # ' + t('code.analogAverage'));
        lines.push('INPUT_THRESHOLD = 30000  # ' + t('code.analogThreshold'));
        lines.push('LOOP_DELAY_MS = 500  # ' + t('code.loopDelay'));
        lines.push('');
        lines.push('def read_input():');
        lines.push('    total = 0');
        lines.push('    for _ in range(INPUT_SAMPLES):');
        lines.push('        total += input_adc.read_u16()');
        lines.push('        time.sleep_ms(5)');
        lines.push('    return total // INPUT_SAMPLES');
        lines.push('');
      } else if (inputKind === 'dht11' || inputKind === 'dht22') {
        const dhtClass = inputKind === 'dht11' ? 'dht.DHT11' : 'dht.DHT22';
        lines.push('input_sensor = ' + dhtClass + '(machine.Pin(' + primaryInput + ', machine.Pin.IN, machine.Pin.PULL_UP))  # ' + t('code.pullExternal'));
        lines.push('INPUT_TEMP_THRESHOLD = 30.0  # ' + t('code.tempThreshold'));
        lines.push('LOOP_DELAY_MS = 2000  # ' + t('code.loopDelay'));
        lines.push('');
        lines.push('def read_input():');
        lines.push('    try:');
        lines.push('        input_sensor.measure()');
        lines.push('        return input_sensor.temperature(), input_sensor.humidity()');
        lines.push('    except OSError as error:');
        lines.push('        print(' + pyString(eventFail) + ', error)');
        lines.push('        return None');
        lines.push('');
      } else if (inputKind === 'ultrasonic') {
        lines.push('INPUT_TRIG = machine.Pin(' + primaryInput + ', machine.Pin.OUT)');
        lines.push('INPUT_ECHO = machine.Pin(' + inputPins[1].pin + ', machine.Pin.IN)');
        lines.push('INPUT_DISTANCE_THRESHOLD_CM = 30  # ' + t('code.distanceThreshold'));
        lines.push('LOOP_DELAY_MS = 200  # ' + t('code.loopDelay'));
        lines.push('');
        lines.push('def read_input():');
        lines.push('    # ' + t('code.ultraTrigger'));
        lines.push('    INPUT_TRIG.value(0)');
        lines.push('    time.sleep_us(2)');
        lines.push('    INPUT_TRIG.value(1)');
        lines.push('    time.sleep_us(10)');
        lines.push('    INPUT_TRIG.value(0)');
        lines.push('    duration = machine.time_pulse_us(INPUT_ECHO, 1, 30000)');
        lines.push('    if duration < 0:');
        lines.push('        return None');
        lines.push('    return duration / 58.0');
        lines.push('');
      } else if (inputKind === 'i2c') {
        lines.push('input_i2c = machine.I2C(0, scl=machine.Pin(' + inputPins[1].pin + '), sda=machine.Pin(' + primaryInput + '), freq=400000)');
        lines.push('INPUT_THRESHOLD = 30000  # ' + t('code.analogThreshold'));
        lines.push('LOOP_DELAY_MS = 500  # ' + t('code.loopDelay'));
        lines.push('');
        lines.push('def read_input():');
        lines.push('    devices = input_i2c.scan()');
        lines.push('    print(' + pyString(t('code.i2cDevices') + ':') + ', devices)');
        lines.push('    # ' + t('code.i2cTodo'));
        lines.push('    return 0');
        lines.push('');
      } else {
        lines.push('input_uart = machine.UART(1, baudrate=9600, tx=machine.Pin(' + primaryInput + '), rx=machine.Pin(' + inputPins[1].pin + '))');
        lines.push('INPUT_TRIGGER_KEYWORD = b"ALARM"  # ' + t('code.uartKeyword'));
        lines.push('LOOP_DELAY_MS = 500  # ' + t('code.loopDelay'));
        lines.push('');
        lines.push('def read_input():');
        lines.push('    if input_uart.any():');
        lines.push('        data = input_uart.read()');
        lines.push('        print(' + pyString(t('code.uartData') + ':') + ', data)');
        lines.push('        return data');
        lines.push('    return b""');
        lines.push('');
      }

      if (outputKind === 'relay') {
        lines.push('output_pin = machine.Pin(' + outputGpio + ', machine.Pin.OUT)' + (relayComment ? '  # ' + relayComment : ''));
        lines.push('output_pin.value(' + relayInactive + ')  # ' + t('code.relayInit'));
        lines.push('OUTPUT_ACTIVE_LEVEL = ' + outputActive);
        lines.push('');
        lines.push('def drive_output(active):');
        lines.push('    if active:');
        lines.push('        output_pin.value(OUTPUT_ACTIVE_LEVEL)');
        lines.push('        print(' + pyString(t('output.relayOn')) + ')');
        lines.push('    else:');
        lines.push('        output_pin.value(' + relayInactive + ')');
        lines.push('        print(' + pyString(t('output.relayOff')) + ')');
        lines.push('');
      } else if (outputKind === 'servo') {
        lines.push('output_pwm = machine.PWM(machine.Pin(' + outputGpio + '), freq=50)');
        lines.push('SERVO_MIN_US = 500');
        lines.push('SERVO_MAX_US = 2500');
        lines.push('SERVO_ACTIVE_ANGLE = ' + servoOnAngle);
        lines.push('SERVO_INACTIVE_ANGLE = ' + servoOffAngle);
        lines.push('');
        lines.push('def set_angle(angle):');
        lines.push('    angle = max(0, min(180, angle))');
        lines.push('    pulse_us = SERVO_MIN_US + (SERVO_MAX_US - SERVO_MIN_US) * angle // 180');
        lines.push('    output_pwm.duty_u16(pulse_us * 65535 // 20000)');
        lines.push('');
        lines.push('def drive_output(active):');
        lines.push('    if active:');
        lines.push('        set_angle(SERVO_ACTIVE_ANGLE)');
        lines.push('        print(' + pyString(t('output.servoOn')) + ')');
        lines.push('    else:');
        lines.push('        set_angle(SERVO_INACTIVE_ANGLE)');
        lines.push('        print(' + pyString(t('output.servoOff')) + ')');
        lines.push('');
        lines.push('set_angle(SERVO_INACTIVE_ANGLE)');
        lines.push('');
      } else if (outputKind === 'motor') {
        lines.push('output_pwm = machine.PWM(machine.Pin(' + outputGpio + '), freq=1000)');
        lines.push('MOTOR_SPEED_PERCENT = ' + motorSpeed);
        if (dirPin && dirPin.ok) {
          lines.push('output_dir = machine.Pin(' + dirPin.pin + ', machine.Pin.OUT)');
        }
        lines.push('');
        lines.push('def drive_output(active):');
        lines.push('    if active:');
        if (dirPin && dirPin.ok) lines.push('        output_dir.value(1)');
        lines.push('        output_pwm.duty_u16(MOTOR_SPEED_PERCENT * 65535 // 100)');
        lines.push('        print(' + pyString(t('output.motorOn')) + ')');
        lines.push('    else:');
        lines.push('        output_pwm.duty_u16(0)');
        lines.push('        print(' + pyString(t('output.motorOff')) + ')');
        lines.push('');
        lines.push('output_pwm.duty_u16(0)');
        lines.push('');
      } else if (outputKind === 'uart') {
        let onCommand = 'ON\n';
        let offCommand = 'OFF\n';
        if (outputType === 'servo') {
          onCommand = 'ANGLE 90\n';
          offCommand = 'ANGLE 0\n';
        } else if (outputType === 'motor') {
          onCommand = 'SPEED 60\n';
          offCommand = 'STOP\n';
        }
        lines.push('output_uart = machine.UART(2, baudrate=9600, tx=machine.Pin(' + outputGpio + '))');
        lines.push('OUTPUT_ON_COMMAND = ' + pyBytes(onCommand) + '  # ' + t('code.protocolCommand'));
        lines.push('OUTPUT_OFF_COMMAND = ' + pyBytes(offCommand));
        lines.push('');
        lines.push('def drive_output(active):');
        lines.push('    if active:');
        lines.push('        output_uart.write(OUTPUT_ON_COMMAND)');
        lines.push('        print(' + pyString(t('output.uartOn')) + ')');
        lines.push('    else:');
        lines.push('        output_uart.write(OUTPUT_OFF_COMMAND)');
        lines.push('        print(' + pyString(t('output.uartOff')) + ')');
        lines.push('');
      } else if (outputKind === 'digital') {
        lines.push('output_pin = machine.Pin(' + outputGpio + ', machine.Pin.OUT)');
        lines.push('output_pin.value(0)');
        lines.push('');
        lines.push('def drive_output(active):');
        lines.push('    if active:');
        lines.push('        output_pin.value(1)');
        lines.push('        print(' + pyString(t('output.digitalOn')) + ')');
        lines.push('    else:');
        lines.push('        output_pin.value(0)');
        lines.push('        print(' + pyString(t('output.digitalOff')) + ')');
        lines.push('');
      } else {
        lines.push('output_pwm = machine.PWM(machine.Pin(' + outputGpio + '), freq=1000)');
        lines.push('output_pwm.duty_u16(0)');
        lines.push('');
        lines.push('def drive_output(active):');
        lines.push('    if active:');
        lines.push('        output_pwm.duty_u16(65535)');
        lines.push('        print(' + pyString(t('output.pwmRelayOn')) + ')');
        lines.push('    else:');
        lines.push('        output_pwm.duty_u16(0)');
        lines.push('        print(' + pyString(t('output.pwmRelayOff')) + ')');
        lines.push('');
      }

      lines.push('print(' + pyString(t('code.startup')) + ')');
      lines.push('');
      lines.push('while True:');

      if (inputKind === 'digital') {
        lines.push('    reading = read_input()');
        lines.push('    if reading is None:');
        lines.push('        time.sleep_ms(LOOP_DELAY_MS)');
        lines.push('        continue');
        lines.push('    print(' + pyString(t('code.inputValue') + ':') + ', reading)');
        lines.push('    active = reading == INPUT_ACTIVE_LEVEL');
      } else if (inputKind === 'analog') {
        lines.push('    reading = read_input()');
        lines.push('    print(' + pyString(t('code.analogValue') + ':') + ', reading)');
        lines.push('    active = reading > INPUT_THRESHOLD');
      } else if (inputKind === 'dht11' || inputKind === 'dht22') {
        lines.push('    reading = read_input()');
        lines.push('    if reading is None:');
        lines.push('        time.sleep_ms(LOOP_DELAY_MS)');
        lines.push('        continue');
        lines.push('    temperature, humidity = reading');
        lines.push('    print(' + pyString(t('code.temperature') + ':') + ', temperature, ' + pyString(t('code.humidity') + ':') + ', humidity)');
        lines.push('    active = temperature >= INPUT_TEMP_THRESHOLD');
      } else if (inputKind === 'ultrasonic') {
        lines.push('    reading = read_input()');
        lines.push('    if reading is None:');
        lines.push('        time.sleep_ms(LOOP_DELAY_MS)');
        lines.push('        continue');
        lines.push('    print(' + pyString(t('code.distanceValue') + ':') + ', reading, ' + pyString('cm') + ')');
        lines.push('    active = reading < INPUT_DISTANCE_THRESHOLD_CM');
      } else if (inputKind === 'i2c') {
        lines.push('    reading = read_input()');
        lines.push('    print(' + pyString(t('code.analogValue') + ':') + ', reading)');
        lines.push('    active = reading > INPUT_THRESHOLD');
      } else {
        lines.push('    reading = read_input()');
        lines.push('    active = bool(reading) and INPUT_TRIGGER_KEYWORD in reading');
      }

      lines.push('    if active:');
      lines.push('        print(' + pyString(eventOn) + ')');
      lines.push('    else:');
      lines.push('        print(' + pyString(eventOff) + ')');
      lines.push('    drive_output(active)');
      lines.push('    time.sleep_ms(LOOP_DELAY_MS)');
      return lines.join('\n');
    }

    function useLocaleRevision(locale) {
      const [revision, setRevision] = React.useState(0);
      React.useEffect(() => {
        let active = true;
        const sync = () => {
          if (active) setRevision(locale.getSnapshot().revision);
        };
        sync();
        const dispose = locale.subscribe(sync);
        return () => {
          active = false;
          dispose();
        };
      }, [locale]);
      return revision;
    }

    function Icon({ size = 20 }) {
      return h('svg', {
        viewBox: '0 0 24 24',
        width: size,
        height: size,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.7,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
      },
      h('rect', { x: 6, y: 6, width: 12, height: 12, rx: 3 }),
      h('path', { d: 'M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3' }),
      h('path', { d: 'M10.5 9.5 8 12l2.5 2.5M13.5 9.5 16 12l-2.5 2.5' }));
    }

    function inputLevelText(analysis, t) {
      if (!analysis.input) return '—';
      if (analysis.inputKind !== 'digital') return t('levelThreshold');
      return analysis.inputActive === 1 ? t('levelHigh') : t('levelLow');
    }

    function outputLevelText(analysis, t) {
      if (analysis.outputKind === 'relay') return analysis.outputActive === 1 ? t('levelHigh') : t('levelLow');
      if (analysis.outputKind === 'servo') return t('levelServo');
      if (analysis.outputKind === 'motor') return t('levelMotor');
      if (analysis.outputKind === 'uart') return t('levelUart');
      if (analysis.outputKind === 'pwm-relay') return t('levelPwm');
      return t('levelDigital');
    }

    class AiRequestError extends Error {
      constructor(message, code) {
        super(message);
        this.name = 'AiRequestError';
        this.code = code || 'AI_ERROR';
      }
    }

    function buildAiPayload(form, analysis) {
      const inputPins = Array.isArray(analysis.inputPins)
        ? analysis.inputPins.filter((pin) => pin && pin.ok).map((pin) => pin.pin)
        : [];
      const outputPins = analysis.outputPin && analysis.outputPin.ok ? [analysis.outputPin.pin] : [];
      const dirPin = analysis.outputKind === 'motor' && analysis.dirPin && analysis.dirPin.ok
        ? analysis.dirPin.pin
        : null;
      return {
        logic: String(form.customLogic || '').trim(),
        input: {
          label: analysis.inputLabel || '',
          model: String(form.inputModel || ''),
          category: analysis.inputCategory || '',
          kind: analysis.inputKind || '',
          pins: inputPins,
          activeLevel: analysis.inputKind === 'digital' ? analysis.inputActive : null,
          pull: analysis.inputPullKind || '',
        },
        output: {
          label: analysis.outputLabel || '',
          model: String(form.outputModel || ''),
          type: analysis.outputType || '',
          kind: analysis.outputKind || '',
          pins: outputPins,
          dirPin,
          activeLevel: analysis.outputKind === 'relay' ? analysis.outputActive : null,
        },
        invert: Boolean(form.invert),
      };
    }

    async function requestAiCode(payload, signal) {
      let response;
      try {
        response = await fetch('/micropython/generate', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
          signal,
        });
      } catch (error) {
        if (error && error.name === 'AbortError') throw error;
        throw new AiRequestError('network', 'NETWORK');
      }
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new AiRequestError(
          (data && data.error) || ('HTTP ' + response.status),
          (data && data.code) || ('HTTP_' + response.status),
        );
      }
      if (!data || typeof data.code !== 'string' || !data.code.trim()) {
        throw new AiRequestError('empty', 'EMPTY_RESPONSE');
      }
      return data;
    }

    function aiWarningText(code, t) {
      if (code === 'fence_stripped') return t('aiWarnFence');
      if (code === 'fence_inline') return t('aiWarnFenceInline');
      if (code === 'truncated') return t('aiWarnTruncated');
      if (code === 'risky_call') return t('aiWarnRisky');
      if (code === 'todo_pins') return t('aiWarnTodo');
      if (code === 'missing_header') return t('aiWarnHeader');
      if (code === 'missing_loop') return t('aiWarnLoop');
      if (code === 'missing_sleep') return t('aiWarnSleep');
      if (code === 'blocking_sleep') return t('aiWarnBlocking');
      return t('aiUnknownWarning');
    }

    function aiErrorMessage(error, t) {
      const code = error && error.code;
      if (code === 'NETWORK') return t('aiNetworkError');
      if (code === 'EMPTY_RESPONSE') return t('aiEmptyResponse');
      if (code === 'MISSING_CREDENTIAL' || code === 'AUTH' || code === 'UNAUTHORIZED'
        || code === 'INVALID_CREDENTIAL' || code === 'NO_ADAPTER') {
        return t('aiErrorNoKey');
      }
      if (code === 'RATE_LIMIT' || code === 'QUOTA') return t('aiErrorQuota');
      if (code === 'CONTEXT_WINDOW_EXCEEDED') return t('aiErrorContext');
      if (typeof code === 'string' && code.indexOf('MISSING_') === 0) return t('aiErrorModel');
      if (code === 'TOOL_CALL') return t('aiErrorModel');
      if (code === 'BODY_TOO_LARGE' || code === 'LOGIC_TOO_LONG') return t('aiErrorModel');
      const message = error && error.message ? String(error.message) : '';
      return message && !/^HTTP \d+$/.test(message) && message !== 'network' && message !== 'empty'
        ? message
        : t('aiErrorGeneric');
    }

    function copyText(text, codeArea) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      return new Promise((resolve, reject) => {
        if (!codeArea) {
          reject(new Error('copy failed'));
          return;
        }
        codeArea.focus();
        codeArea.select();
        let ok = false;
        try {
          ok = document.execCommand('copy');
        } catch (error) {
          ok = false;
        }
        if (ok) resolve();
        else reject(new Error('copy failed'));
      });
    }

    function Panel({ locale }) {
      const localeRevision = useLocaleRevision(locale);
      const t = locale.bind(NS);
      const [form, setForm] = React.useState(() => ({
        inputCategory: 'digital',
        inputModel: t('default.sensor'),
        inputPin: 'D18',
        outputCategory: 'digital',
        outputType: 'relay',
        outputModel: t('default.relay'),
        outputPin: 'D26',
        outputDirPin: 'D27',
        invert: false,
        customLogic: '',
      }));
      const [open, setOpen] = React.useState(false);
      const [copied, setCopied] = React.useState(false);
      const [copyError, setCopyError] = React.useState(false);
      const [aiBusy, setAiBusy] = React.useState(false);
      const [aiError, setAiError] = React.useState('');
      const [aiCode, setAiCode] = React.useState('');
      const [aiWarnings, setAiWarnings] = React.useState([]);
      const [safetyAck, setSafetyAck] = React.useState(false);
      const firstField = React.useRef(null);
      const codeRef = React.useRef(null);
      const aiAbortRef = React.useRef(null);
      const analysis = analyze(form, t);
      const displayCode = aiCode || analysis.code;
      const safetyOk = !analysis.safety.highPower || safetyAck;

      React.useEffect(() => {
        setCopied(false);
        setCopyError(false);
      }, [displayCode]);

      React.useEffect(() => {
        setAiCode('');
        setAiError('');
        setAiWarnings((previous) => (previous.length === 0 ? previous : []));
        if (aiAbortRef.current) {
          aiAbortRef.current.__reason = 'form-change';
          aiAbortRef.current.abort();
          aiAbortRef.current = null;
        }
      }, [
        form.inputCategory,
        form.inputModel,
        form.inputPin,
        form.outputCategory,
        form.outputType,
        form.outputModel,
        form.outputPin,
        form.outputDirPin,
        form.invert,
        form.customLogic,
      ]);

      React.useEffect(() => () => {
        if (aiAbortRef.current) {
          aiAbortRef.current.__reason = 'unmount';
          aiAbortRef.current.abort();
          aiAbortRef.current = null;
        }
      }, []);

      React.useEffect(() => {
        if (!open) return undefined;
        const previous = typeof document !== 'undefined' ? document.activeElement : null;
        const onKeyDown = (event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            setOpen(false);
          }
        };
        document.addEventListener('keydown', onKeyDown, true);
        const timer = window.setTimeout(() => {
          if (firstField.current) firstField.current.focus();
        }, 30);
        return () => {
          document.removeEventListener('keydown', onKeyDown, true);
          window.clearTimeout(timer);
          if (previous && typeof previous.focus === 'function') previous.focus();
        };
      }, [open]);

      function update(field, value) {
        setForm((previous) => ({ ...previous, [field]: value }));
      }

      function updateOutputType(value) {
        setForm((previous) => ({
          ...previous,
          outputType: value,
          outputCategory: previous.outputCategory === 'communication'
            ? 'communication'
            : value === 'relay' ? 'digital' : 'pwm',
        }));
      }

      function resetExample() {
        setForm({
          inputCategory: 'digital',
          inputModel: t('default.sensor'),
          inputPin: 'D18',
          outputCategory: 'digital',
          outputType: 'relay',
          outputModel: t('default.relay'),
          outputPin: 'D26',
          outputDirPin: 'D27',
          invert: false,
          customLogic: '',
        });
        setSafetyAck(false);
      }

      async function handleCopy() {
        if (!displayCode || !safetyOk) return;
        try {
          await copyText(displayCode, codeRef.current);
          setCopied(true);
          setCopyError(false);
        } catch (error) {
          setCopied(false);
          setCopyError(true);
        }
      }

      async function handleAiGenerate() {
        if (aiBusy || !analysis.ready || !safetyOk) return;
        const logic = String(form.customLogic || '').trim();
        if (!logic) return;
        if (aiAbortRef.current) {
          aiAbortRef.current.__reason = 'superseded';
          aiAbortRef.current.abort();
        }
        const controller = new AbortController();
        aiAbortRef.current = controller;
        setAiBusy(true);
        setAiError('');
        setAiWarnings([]);
        const timer = window.setTimeout(() => {
          controller.__reason = 'timeout';
          controller.abort();
        }, 100000);
        try {
          const payload = buildAiPayload(form, analysis);
          const result = await requestAiCode(payload, controller.signal);
          setAiCode(result.code);
          setAiWarnings(Array.isArray(result.warnings) ? result.warnings : []);
        } catch (error) {
          if (error && error.name === 'AbortError') {
            if (controller.__reason === 'timeout') setAiError(t('aiTimeout'));
          } else {
            setAiError(aiErrorMessage(error, t));
          }
        } finally {
          window.clearTimeout(timer);
          if (aiAbortRef.current === controller) aiAbortRef.current = null;
          setAiBusy(false);
        }
      }

      function handleAiCancel() {
        if (!aiAbortRef.current) return;
        aiAbortRef.current.__reason = 'user';
        aiAbortRef.current.abort();
      }

      function discardAiCode() {
        setAiCode('');
        setAiError('');
        setAiWarnings([]);
      }

      function handleBackdrop(event) {
        if (event.target === event.currentTarget) setOpen(false);
      }

      const inputSuggestions = ['hc-sr501', 'am312', 'rcwl-0516', 'button', 'reed', 'float', 'flame', 'leak', 'soil-digital', 'dht11', 'dht22', 'hc-sr04', 'analog', 'generic-sensor'];
      const outputSuggestions = ['relay-module', 'relay-low', 'relay-high', 'ssr', 'bare-relay', 'servo-sg90', 'servo-mg996r', 'motor-l298n', 'motor-tb6612'];

      function inputCategoryField() {
        return h('label', { className: 'mpygen-field' },
          h('span', null, t('inputCategoryLabel')),
          h('select', {
            value: form.inputCategory,
            onChange: (event) => update('inputCategory', event.target.value),
          }, ['digital', 'analog', 'communication'].map((id) => h('option', { key: id, value: id }, t('category.' + id)))));
      }

      function outputCategoryField() {
        return h('label', { className: 'mpygen-field' },
          h('span', null, t('outputCategoryLabel')),
          h('select', {
            value: form.outputCategory,
            onChange: (event) => update('outputCategory', event.target.value),
          }, ['digital', 'pwm', 'communication'].map((id) => h('option', { key: id, value: id }, t('category.' + id)))));
      }

      function outputTypeField() {
        return h('label', { className: 'mpygen-field' },
          h('span', null, t('outputTypeLabel')),
          h('select', {
            value: form.outputType,
            onChange: (event) => updateOutputType(event.target.value),
          }, ['relay', 'servo', 'motor'].map((id) => h('option', { key: id, value: id }, t('outputType.' + id)))));
      }

      function renderInputCard() {
        const hasModel = Boolean(String(form.inputModel || '').trim());
        return h('section', { className: 'mpygen-card' },
          h('div', { className: 'mpygen-card-head' },
            h('span', { className: 'mpygen-card-icon' }, h(Icon, { size: 16 })),
            h('h3', null, t('sensorSection'))),
          inputCategoryField(),
          h('label', { className: 'mpygen-field' },
            h('span', null, t('modelLabel')),
            h('input', {
              ref: firstField,
              type: 'text',
              value: form.inputModel,
              list: 'mpygen-input-models',
              autoComplete: 'off',
              placeholder: t('inputModelPlaceholder'),
              onChange: (event) => update('inputModel', event.target.value),
            }),
            h('small', null, t('customModelHint'))),
          h('label', { className: 'mpygen-field' },
            h('span', null, t('sensorPinLabel')),
            h('input', {
              type: 'text',
              value: form.inputPin,
              autoComplete: 'off',
              placeholder: t('sensorPinPlaceholder'),
              onChange: (event) => update('inputPin', event.target.value),
            }),
            h('small', null, analysis.inputPinHint)),
          h('div', { className: 'mpygen-detect' },
            hasModel
              ? [
                  h('span', {
                    key: 'status',
                    className: 'mpygen-status ' + (analysis.input.recognized ? 'ok' : 'warn'),
                  }, analysis.input.recognized ? t('detected') : t('custom')),
                  h('span', { key: 'label', className: 'mpygen-detect-label' }, analysis.inputLabel),
                ]
              : h('span', { className: 'mpygen-muted' }, t('emptyModel'))),
          h('div', { className: 'mpygen-pull ' + analysis.inputPullStatus.tone },
            h('div', { className: 'mpygen-pull-head' },
              h('span', { className: 'mpygen-dot' }),
              h('strong', null, analysis.inputPullStatus.title)),
            h('p', null, analysis.inputPullStatus.body)),
          h('datalist', { id: 'mpygen-input-models' },
            inputSuggestions.map((id) => h('option', { key: id, value: t('suggest.' + id) }))));
      }

      function renderOutputCard() {
        const hasModel = Boolean(String(form.outputModel || '').trim());
        return h('section', { className: 'mpygen-card' },
          h('div', { className: 'mpygen-card-head' },
            h('span', { className: 'mpygen-card-icon' }, h(Icon, { size: 16 })),
            h('h3', null, t('relaySection'))),
          h('div', { className: 'mpygen-pair' }, outputCategoryField(), outputTypeField()),
          h('label', { className: 'mpygen-field' },
            h('span', null, t('modelLabel')),
            h('input', {
              type: 'text',
              value: form.outputModel,
              list: 'mpygen-output-models',
              autoComplete: 'off',
              placeholder: t('outputModelPlaceholder'),
              onChange: (event) => update('outputModel', event.target.value),
            }),
            h('small', null, t('customModelHint'))),
          h('label', { className: 'mpygen-field' },
            h('span', null, t('relayPinLabel')),
            h('input', {
              type: 'text',
              value: form.outputPin,
              autoComplete: 'off',
              placeholder: t('relayPinPlaceholder'),
              onChange: (event) => update('outputPin', event.target.value),
            }),
            h('small', null, analysis.outputPinHint)),
          form.outputType === 'motor' && form.outputCategory === 'pwm'
            ? h('label', { className: 'mpygen-field' },
                h('span', null, t('outputDirPinLabel')),
                h('input', {
                  type: 'text',
                  value: form.outputDirPin,
                  autoComplete: 'off',
                  placeholder: t('outputDirPinPlaceholder'),
                  onChange: (event) => update('outputDirPin', event.target.value),
                }),
                h('small', null, analysis.dirPinHint))
            : null,
          h('div', { className: 'mpygen-detect' },
            hasModel
              ? (form.outputType === 'relay'
                  ? [
                      h('span', {
                        key: 'status',
                        className: 'mpygen-status ' + (analysis.output.recognized ? 'ok' : 'warn'),
                      }, analysis.output.recognized ? t('detected') : t('custom')),
                      h('span', { key: 'label', className: 'mpygen-detect-label' }, analysis.outputLabel),
                    ]
                  : [
                      h('span', { key: 'status', className: 'mpygen-status ok' }, t('outputType.' + form.outputType)),
                      h('span', { key: 'label', className: 'mpygen-detect-label' }, analysis.outputLabel),
                    ])
              : h('span', { className: 'mpygen-muted' }, t('emptyModel'))),
          h('div', { className: 'mpygen-pull ' + analysis.outputDriveStatus.tone },
            h('div', { className: 'mpygen-pull-head' },
              h('span', { className: 'mpygen-dot' }),
              h('strong', null, analysis.outputDriveStatus.title)),
            h('p', null, analysis.outputDriveStatus.body)),
          h('datalist', { id: 'mpygen-output-models' },
            outputSuggestions.map((id) => h('option', { key: id, value: t('suggest.' + id) }))));
      }

      return h('div', { className: 'mpygen-layer', 'data-locale-revision': String(localeRevision) },
        h('style', { key: 'styles' }, CSS),
        h('button', {
          type: 'button',
          className: 'mpygen-launcher',
          title: t('launcher'),
          'aria-label': t('launcher'),
          'aria-expanded': open,
          onClick: () => setOpen((value) => !value),
        },
        h(Icon, { size: 18 }),
        h('span', { className: 'mpygen-launcher-text' }, t('launcherShort'))),
        open
          ? h('div', { className: 'mpygen-backdrop', onMouseDown: handleBackdrop },
              h('section', {
                className: 'mpygen-panel',
                role: 'dialog',
                'aria-modal': 'true',
                'aria-labelledby': 'mpygen-title',
                onMouseDown: (event) => event.stopPropagation(),
              },
              h('div', { className: 'mpygen-header' },
                h('div', { className: 'mpygen-heading' },
                  h('span', { className: 'mpygen-logo' }, h(Icon, { size: 21 })),
                  h('div', null,
                    h('h2', { id: 'mpygen-title', className: 'mpygen-title' }, t('title')),
                    h('p', { className: 'mpygen-subtitle' }, t('subtitle')))),
                h('button', {
                  type: 'button',
                  className: 'mpygen-icon-button',
                  'aria-label': t('close'),
                  title: t('close'),
                  onClick: () => setOpen(false),
                }, h('span', { 'aria-hidden': true }, '×'))),
              h('div', { className: 'mpygen-body' },
                h('div', { className: 'mpygen-example' },
                  h('span', { className: 'mpygen-badge' }, t('exampleBadge')),
                  h('span', null, t('exampleHint'))),
                analysis.safety.highPower
                  ? h('div', { className: 'mpygen-safety', role: 'alert' },
                      h('div', { className: 'mpygen-safety-head' },
                        h('strong', null, t('safetyTitle')),
                        h('span', { className: 'mpygen-safety-terms' },
                          t('safetyDetected') + ' ' + analysis.safety.matched.join(' / '))),
                      h('p', null, t('safetyBody')),
                      h('p', null, t('safetyMains')),
                      h('label', { className: 'mpygen-safety-ack' },
                        h('input', {
                          type: 'checkbox',
                          checked: safetyAck,
                          onChange: (event) => setSafetyAck(event.target.checked),
                        }),
                        h('span', null, t('safetyAck'))),
                      !safetyAck
                        ? h('p', { className: 'mpygen-safety-required' }, t('safetyAckRequired'))
                        : null)
                  : null,
                h('div', { className: 'mpygen-grid' }, renderInputCard(), renderOutputCard()),
                h('label', { className: 'mpygen-invert' },
                  h('input', {
                    type: 'checkbox',
                    checked: form.invert,
                    onChange: (event) => update('invert', event.target.checked),
                  }),
                  h('span', { className: 'mpygen-invert-text' },
                    h('strong', null, t('invertLabel')),
                    h('small', null, t('invertHint')))),
                h('div', { className: 'mpygen-levels' },
                  h('span', { className: 'mpygen-level' },
                    h('span', null, t('sensorLevel')),
                    h('strong', null, inputLevelText(analysis, t)),
                    form.invert && analysis.inputInvertApplies ? h('em', null, t('afterInvert')) : null),
                  h('span', { className: 'mpygen-level' },
                    h('span', null, t('relayLevel')),
                    h('strong', null, outputLevelText(analysis, t)),
                    form.invert && analysis.outputInvertApplies ? h('em', null, t('afterInvert')) : null)),
                form.invert
                  ? h('p', { className: 'mpygen-muted', style: { margin: 0 } },
                      t(!analysis.invertApplies
                        ? 'invertUnused'
                        : !analysis.inputInvertApplies
                          ? 'invertNoteThreshold'
                          : 'invertNoteDigital'))
                  : null,
                analysis.errors.length
                  ? h('div', { className: 'mpygen-alert error' },
                      h('h3', null, t('errorsTitle')),
                      h('ul', null, analysis.errors.map((error, index) => h('li', { key: index }, error))))
                  : null,
                h('div', { className: 'mpygen-tips' },
                  h('h3', null, t('tipsTitle')),
                  analysis.tips.length
                    ? h('ul', null, analysis.tips.map((tip, index) => h('li', { key: index, className: tip.tone }, tip.text)))
                    : h('p', { className: 'mpygen-muted', style: { margin: 0 } }, t('noTips'))),
                h('section', { className: 'mpygen-ai-card' },
                  h('div', { className: 'mpygen-card-head' },
                    h('span', { className: 'mpygen-card-icon' }, h(Icon, { size: 16 })),
                    h('h3', null, t('aiSectionTitle'))),
                  h('label', { className: 'mpygen-field' },
                    h('span', null, t('aiFieldLabel')),
                    h('textarea', {
                      className: 'mpygen-logic',
                      rows: 3,
                      maxLength: 500,
                      spellCheck: false,
                      value: form.customLogic,
                      placeholder: t('aiPlaceholder'),
                      onChange: (event) => update('customLogic', event.target.value),
                    }),
                    h('small', null, t('aiHint'))),
                  h('div', { className: 'mpygen-ai-actions' },
                    h('button', {
                      type: 'button',
                      className: 'mpygen-button primary',
                      onClick: handleAiGenerate,
                      disabled: aiBusy || !String(form.customLogic || '').trim() || !analysis.ready || !safetyOk,
                    }, aiBusy ? t('aiGenerating') : t('aiGenerate')),
                    aiBusy
                      ? h('button', { type: 'button', className: 'mpygen-button', onClick: handleAiCancel }, t('aiCancel'))
                      : null,
                    !analysis.ready && String(form.customLogic || '').trim()
                      ? h('span', { className: 'mpygen-muted' }, t('aiNeedsReady'))
                      : null),
                  aiError
                    ? h('div', { className: 'mpygen-alert error' },
                        h('h3', null, t('aiErrorTitle')),
                        h('p', { className: 'mpygen-ai-error' }, aiError))
                    : null,
                  aiWarnings.length
                    ? h('div', { className: 'mpygen-alert warn' },
                        h('h3', null, t('aiWarningsTitle')),
                        h('ul', null, aiWarnings.map((code, index) => h('li', { key: index }, aiWarningText(code, t)))))
                    : null,
                  h('p', { className: 'mpygen-ai-note' }, t('aiReviewNotice'))),
                h('div', { className: 'mpygen-output-head' },
                  h('div', { className: 'mpygen-output-title' },
                    h('h3', null, t('outputTitle')),
                    h('span', { className: 'mpygen-source ' + (aiCode ? 'ai' : 'local') },
                      aiCode ? t('aiSourceAi') : t('aiSourceLocal'))),
                  h('div', { className: 'mpygen-actions' },
                    aiCode
                      ? h('button', { type: 'button', className: 'mpygen-button', onClick: discardAiCode }, t('aiDiscard'))
                      : null,
                    h('button', { type: 'button', className: 'mpygen-button', onClick: resetExample }, t('reset')),
                    h('button', {
                      type: 'button',
                      className: 'mpygen-button primary',
                      onClick: handleCopy,
                      disabled: !displayCode || !safetyOk,
                    }, copied ? t('copied') : t('copy')))),
                displayCode
                  ? h('textarea', {
                      ref: codeRef,
                      className: 'mpygen-code',
                      readOnly: true,
                      spellCheck: false,
                      rows: 18,
                      value: displayCode,
                      'aria-label': t('outputTitle'),
                      onFocus: (event) => event.target.select(),
                    })
                  : h('div', { className: 'mpygen-code mpygen-code-empty' },
                      aiBusy
                        ? t('aiGenerating')
                        : analysis.errors.length ? t('outputErrorPlaceholder') : t('outputPlaceholder')),
                copyError ? h('p', { className: 'mpygen-copy-error' }, t('copyFailed')) : null,
                h('p', { className: 'mpygen-footnote' }, t('pinHelp') + ' ' + t('footnote') + ' ' + t('note.classicEsp32')))))
          : null);
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, 'en', EN));
        ctx.effect(() => ctx.locale.register(NS, 'zh', ZH));
        ctx.effect(() => ctx.locale.register(NS, 'zh-CN', ZH));
        ctx.effect(() => ctx.locale.register(NS, 'zh-Hans', ZH));

        const Root = () => h(Panel, { locale: ctx.locale });
        ctx.effect(() => ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: PLUGIN_ID,
          order: 40,
          label: () => ctx.locale.bind(NS)('launcher'),
        }, Root)));
      },
      __internals: {
        analyze,
        buildCode,
        detectSensor,
        detectRelay,
        splitPinTokens,
        parsePinToken,
        normalize,
        buildAiPayload,
        EN,
        ZH,
        SENSOR_LIBRARY,
        RELAY_LIBRARY,
        GENERIC_SENSOR,
        GENERIC_RELAY,
        Panel,
      },
    };
  },
});
