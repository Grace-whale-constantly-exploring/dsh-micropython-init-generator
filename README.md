# MicroPython 输入/输出代码生成器

一个 DeepSeek Harness（DSH）插件。装好之后 Web UI 右侧边缘多出「µPy I/O」标签，点开就能选分类、填引脚，直接拿到一份可烧录的 ESP32 MicroPython 骨架代码；也可以用一句中文描述控制逻辑，交给模型生成非阻塞版本。

**给谁用**：手边有 ESP32 和面包板、但每次都要从头敲 `machine.Pin` 样板代码的人。

**它不做什么**：不做电气设计，不替代上板验证，也不是工业控制系统——详见下文「能力边界」。

## 安装

DSH 0.2.2 以上，三种方式按情况选一种。

**1. 从 npm 安装（发布后可用）**

```text
dsh-micropython-init-generator@^0.1.0
```

装完之后刷新页面，右侧边缘出现「µPy I/O」标签。

**2. 从本地目录安装**

```powershell
git clone https://github.com/Grace-whale-constantly-exploring/dsh-micropython-init-generator
```

然后在 DSH 里打开 **Plugins → Add plugin**，选择克隆下来的仓库根目录。

**3. 官方插件目录**

待上架。

## 功能

- **输入分类**：数字 / 模拟 / 通信。
- **输出分类**：数字 / PWM / 通信。
- **输出类型**：继电器 / 舵机 / 电机。
- 型号输入是普通文本框，**可以直接输入任意自定义型号**；分类决定实际生成方式。
- 根据分类自动选择 MicroPython 库：
  - 数字输入：`machine.Pin`
  - 模拟输入：`machine.ADC`
  - 通信输入：`dht`、`machine.time_pulse_us`、`machine.I2C` 或 `machine.UART`
  - 数字输出：`machine.Pin`
  - PWM 输出：`machine.PWM`
  - 通信输出：`machine.UART`
- 生成中文注释、启动日志、输入状态日志、输出动作日志。
- 数字输入内置 **30ms 二次采样防抖**，主循环 500ms；模拟输入做多次采样平均；DHT 2 秒、超声波 200ms。
- 提示上拉/下拉电阻、驱动电路、舵机独立供电、电机驱动器等注意事项。

## 快速使用

1. 在右侧边缘打开「µPy I/O」面板。
2. 选择输入分类，例如「数字」。
3. 填写输入型号与引脚，例如：
   - 型号：`漏水传感器`
   - 引脚：`D18`
4. 选择输出分类与类型，例如：
   - 分类：`数字`
   - 类型：`继电器`
   - 型号：`1 路 5V 继电器模块`
   - 引脚：`D26`
5. 查看「输入上拉 / 下拉」和「输出驱动」提示。
6. 点击「复制代码」，粘贴到 Thonny / mpremote / MicroPython 编辑器。

## 输入分类

| 分类 | 使用的库 | 典型型号 | 引脚 |
|---|---|---|---|
| 数字 | `machine.Pin` | 漏水、PIR、按键、门磁、火焰、雨滴 | 1 个信号脚 |
| 模拟 | `machine.ADC` | 模拟量传感器、LDR、电位器、LM35 | 1 个 ADC 脚 |
| 通信 | `dht` / `time_pulse_us` / `machine.I2C` / `machine.UART` | DHT11/22、HC-SR04、BME280、GPS | 1 或 2 个脚 |

通信分类会根据型号自动判断：

- `DHT11`、`DHT22`、`AM2302` → `dht` 库，1 个数据脚。
- `HC-SR04`、`超声波` → `machine.time_pulse_us`，TRIG / ECHO 两个脚。
- 含 `I2C`、`IIC`、`SDA`、`SCL`、`BME280`、`MPU6050` 等 → `machine.I2C`，SDA / SCL 两个脚。
- 含 `UART`、`Serial`、`GPS`、`RS232`、`RS485` 等，或未识别型号 → `machine.UART`，TX / RX 两个脚。

## 输出分类与类型

| 分类 | 类型 | 生成方式 |
|---|---|---|
| 数字 | 继电器 | `machine.Pin`，按有效电平吸合/释放 |
| 数字 | 舵机 / 电机 | `machine.Pin` 简单开关（会提示建议改用 PWM） |
| PWM | 舵机 | `machine.PWM`，50Hz，0° / 90° |
| PWM | 电机 | `machine.PWM` + 可选 DIR 方向脚 |
| PWM | 继电器 | `machine.PWM`，0% / 100% 占空比（会提示建议改用数字） |
| 通信 | 任意类型 | `machine.UART`，发送 ON/OFF、角度或速度命令模板 |

选择舵机或电机时，分类会自动切换到 PWM；选择继电器时自动切换到数字。也可以手动改分类，面板会提示分类与类型不匹配。

## 生成代码结构

数字输入 + 继电器输出大致如下：

```python
import machine
import time

input_pin = machine.Pin(18, machine.Pin.IN, machine.Pin.PULL_UP)
INPUT_DEBOUNCE_MS = 30
INPUT_ACTIVE_LEVEL = 0
LOOP_DELAY_MS = 500

def read_input():
    first = input_pin.value()
    time.sleep_ms(INPUT_DEBOUNCE_MS)
    second = input_pin.value()
    if first == second:
        return second
    return None

output_pin = machine.Pin(26, machine.Pin.OUT)
output_pin.value(1)
OUTPUT_ACTIVE_LEVEL = 0

def drive_output(active):
    if active:
        output_pin.value(OUTPUT_ACTIVE_LEVEL)
        print("【输出】继电器吸合。")
    else:
        output_pin.value(1)
        print("【输出】继电器释放。")

print("【启动】输入 + 输出控制系统已启动。")

while True:
    reading = read_input()
    if reading is None:
        time.sleep_ms(LOOP_DELAY_MS)
        continue
    print("输入电平:", reading)
    active = reading == INPUT_ACTIVE_LEVEL
    if active:
        print("【警告】检测到漏水！")
    else:
        print("【安全】未检测到漏水。")
    drive_output(active)
    time.sleep_ms(LOOP_DELAY_MS)
```

模拟输入使用 `machine.ADC` 和 `read_u16()`；舵机使用 `machine.PWM` 的 50Hz 与 `duty_u16()`；电机使用 PWM 调速和可选方向脚。

## 型号匹配

型号输入不区分大小写，支持包含关系。例如：

- PIR：`HC-SR501`、`AM312`、`RCWL-0516`、`PIR`
- 开关量：`按键`、`磁簧`、`浮球`、`倾斜`、`震动`、`火焰`、`雨滴`、`漏水`、`土壤湿度`、`避障`、`循迹`
- 温湿度：`DHT11`、`DHT22`、`AM2302`
- 测距：`HC-SR04`、`超声波`
- 模拟量：`模拟`、`analog`、`LM35`、`LDR`、`电位器`
- 继电器：`继电器模块`、`低电平触发`、`高电平触发`、`SSR`、`G3MB`、`SRD-05VDC`、`裸继电器`
- 舵机/电机：`SG90`、`MG996R`、`L298N`、`TB6612`

未识别的型号会显示「自定义」，并使用当前分类的通用模板。

## 引脚规则

按**经典 ESP32** 的 GPIO 编号检查：

- `D18`、`GPIO18`、`18` 都表示 GPIO18。
- GPIO6–11 连接 SPI Flash，禁止使用。
- GPIO34–39 只能输入，不能作为输出、I2C 双向脚或 UART TX。
- GPIO34–39 没有内部上拉/下拉；数字输入需要上拉时会改为外部电阻方案。
- GPIO0、2、12、15 是启动配置引脚，会给出警告。
- GPIO20、24、28–31 在经典 ESP32 上通常不可用。
- 模拟量优先使用 ADC1（GPIO32–39）。
- HC-SR04 的 ECHO 为 5V，接 ESP32 前需要分压或电平转换。
- 电机方向引脚不能与输入或输出引脚重复。
- 输入/输出不能共用同一个 GPIO。

ESP32-S3/C3 等型号的引脚限制不同，请以对应数据手册为准。

## 电平反转

「电平反转」现在只作用于：

- 数字输入的触发电平；
- 继电器输出的吸合电平。

如果输入是模拟/通信，或输出是舵机、电机、UART 命令，面板会提示「当前输入/输出组合不使用电平反转」。

## 自然语言生成（V4.0，需要大模型）

面板底部新增「自定义逻辑（自然语言，可选）」文本框。填好输入/输出型号与引脚后，可以用一句中文描述更复杂的联动逻辑：

> 如果漏水传感器检测到漏水，并且光敏电阻数值小于1000，那么让水泵运行5秒后停止

点击「AI 生成高阶代码」后：

1. 插件把**当前选中的输入/输出硬件参数**和**这句话**发给本机 Harness 的模型路由（`POST /micropython/generate`），不发送本地生成的代码、型号库或界面文案。
2. Host 侧自动选择当前可用的 provider/model，凭证类失败会自动换下一个 provider，成功后缓存。
3. 模型返回的代码会先做最小安全检查：必须包含 `import machine`，去掉 Markdown 围栏，检查主循环、延时、阻塞等待、高风险调用和 TODO 引脚；代码**原样**放进代码预览框。
4. 预览框上方会显示来源标记「AI 生成 · 待人工审核」，可以点「丢弃 AI 结果」回到本地规则生成。
5. **必须人工逐行审核后，自己点击「复制代码」**。插件没有自动复制、没有烧录、没有执行入口。

### V4.0：非阻塞时序

从 V4.0 起，AI 生成的动作时序必须写成 `time.ticks_ms()` + `time.ticks_diff()` 的非阻塞状态机，例如：

```python
pump_engaged = False
pump_started_ms = 0

while True:
    now = time.ticks_ms()
    if not pump_engaged and leaky and ldr_value < LDR_THRESHOLD:
        pump_engaged = True
        pump_started_ms = now
        drive_output(True)
    elif pump_engaged and time.ticks_diff(now, pump_started_ms) >= PUMP_ON_MS:
        pump_engaged = False
        drive_output(False)
    time.sleep_ms(200)   # 只做轮询间隔，不阻塞长动作
```

规则边界：

- **禁止**用 `time.sleep(5)` / `time.sleep(PUMP_ON_SECONDS)` 做超过 300ms 的阻塞等待；等待期间其他输入无法响应。
- **允许** 10~30ms 的传感器防抖短延时，以及 100~300ms 的主循环轮询间隔。
- 必须用 `time.ticks_diff()` 计算时间差，直接相减 `now - started` 在 ticks 回绕后会出错。
- Host 仍会检查模型输出：发现长时间 `time.sleep` 会给出 `blocking_sleep` 审核提示，但代码仍会显示，由你判断。
- 非阻塞只代表主循环不会被长动作卡住，**不代表**满足工业实时性或功能安全等级。

### V4.0：高功率 / 市电安全警告

当输出型号或自定义逻辑里出现「水泵、电机、马达、压缩机、加热、电磁阀、220V、市电、大功率」等关键词时：

1. 面板顶部出现**红色安全警告牌**，列出识别到的关键词，并说明独立电源、继电器/光耦隔离、驱动模块、持证电工接线等要求。
2. 必须勾选「我确认会使用独立电源并做好隔离」后，才能点击「AI 生成」或「复制代码」。
3. 本地规则生成的代码和 AI 生成的代码顶部都会带上醒目的安全警告注释块。

关键词识别只是提醒，不是电气设计审查；是否隔离、线径、保险丝、接地仍必须由专业人员确认。

补充规则：

- 句子中提到、但表单里没有配置的硬件（例如光敏电阻），AI 会以 `LDR_PIN = 34  # TODO 请核对接线` 这种可修改常量的形式补出，并在界面给出「TODO 引脚需核对」的警告。请务必按实际接线修改。
- 表单任何一项（分类、型号、引脚、方向脚、电平反转、自定义逻辑）发生变化，旧的 AI 结果会自动清空，避免拿旧代码配新引脚。
- 模型输出被截断、包含高风险调用、出现阻塞等待、或缺少主循环/延时时，预览框上方会显示审核提示，但代码仍然会完整显示，由你判断。
- 需要先在 Harness 里配置好至少一个 provider 的 API Key；没有凭证时会提示配置，不会回退到浏览器直连模型。
- 生成的 MicroPython 只做了 Python 语法解析和人工审核，**没有在真实 ESP32 上运行**。

### 能力边界（请勿过度宣传）

- 这是一个代码生成与审核辅助工具，不是经过认证的工业控制系统，也不是电气安全设计工具。
- 「非阻塞」只描述代码结构（主循环不被长 `sleep` 卡住），不等于硬实时、冗余、故障安全或 SIL/PL 等级。
- 220V 市电、水泵、电机、加热器等负载的接线、隔离、保险丝、接地必须由持证电工完成；插件不能替代现场电气评估。
- AI 可能生成错误或过时的代码，仓库里的自动化测试只能覆盖语法和有限规则，不能替代上板验证。

## 目录结构

```text
micropython-init-generator/
├─ package.json
├─ cordis.patch.yml
├─ index.js          # Host 半：/micropython/generate 路由 + ctx.llm.stream 桥接
├─ client.js         # UI、型号库、分类生成、引脚校验、自然语言入口
├─ locale/
│  ├─ en.json
│  └─ zh.json
├─ tests/            # 含 test-host.mjs（Host 路由单测）与 fixtures/
└─ icon.svg
```

## 说明

- 代码中的 `machine.Pin.PULL_UP` / `machine.Pin.PULL_DOWN` 是 ESP32 内部弱上/下拉；长线或强干扰环境仍建议加外部 10kΩ 电阻。
- 舵机电源请单独 5V 供电并与 ESP32 共地；电机必须使用驱动模块，不能直接接 GPIO。
- I2C/UART 为通用模板，需要按具体模块的寄存器或协议补全读取/命令。
- 生成的是软件逻辑，不会改变实际接线；接线前请断电并核对模块电压与极性。

## 本地验证

```powershell
npm test    # 等价于下面这几条
node tests/test-generator.mjs
node tests/test-render.mjs
node tests/test-apply.mjs
node tests/validate-bundle.mjs
node tests/test-host.mjs
```

真实路由联调（需要已配置 provider 凭证）：

```powershell
curl.exe -X POST "http://127.0.0.1:9162/micropython/generate" `
  -H "Content-Type: application/json" `
  --data-binary "@tests/fixtures/generate-request.json"
```

`tests/` 只用于本地校验，不包含在发布用的 `files` 列表中。

真实路由联调时端口以你本机 DSH 实际监听为准，`9162` 只是示例。

## 许可证

MIT，见 [LICENSE](LICENSE)。
