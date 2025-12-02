# 表格

表格用来直接展示数据。

## 配置项

### 图形配置

#### 时间戳格式

配置时间戳格式化字符串，规则如下

| 格式   | 示例    | 说明                                        |
|--------|---------|--------------------------------------------|
|YY  | 01 |Two-digit year    |
|YYYY| 2001 |Four-digit year|
|M   | 1-12 |Month, beginning at 1|
|MM  |  01-12 |Month, 2-digits|
|MMM |   Jan-Dec | The abbreviated month name|
|MMMM| January-December | The full month name|
|D   | 1-31 |Day of month|
|DD  |  01-31 |Day of month, 2-digits|
|H   | 0-23 |Hours|
|HH  |  00-23 |Hours, 2-digits|
|h   | 1-12 |Hours, 12-hour clock|
|hh  |  01-12 |Hours, 12-hour clock, 2-digits|
|m   | 0-59 |Minutes|
|mm  |  00-59 |Minutes, 2-digits|
|s   | 0-59 |Seconds|
|ss  |  00-59 |Seconds, 2-digits|
|S   | 0-9  | Hundreds of milliseconds, 1-digit|
|SS  |  00-99 |Tens of milliseconds, 2-digits|
|SSS |   000-999 | Milliseconds, 3-digits|
|Z   | -05:00 | Offset from UTC|
|ZZ  |  -0500 | Compact offset from UTC, 2-digits|
|A   | AM PM | Post or ante meridiem, upper-case|
|a   | am pm | Post or ante meridiem, lower-case|
|Do  |  1st... 31st | Day of Month with ordinal|
|X   | 1410715640.579 | Unix timestamp|
|x   | 1410715640579 | Unix ms timestamp|

## 配置项增强 roadmap

为了持续提升您的使用体验，我们将在后续的产品更新中，不断增加实用配置，让您能够享受到更丰富、更贴心的分析功能。

| 项目       | 说明                                                         |
|------------|-------------------------------------------------------------|
| 追加统计行  | 可以追加统计行，显示某一个指标的最大值/最小值/平均值等          |
| 数值格式化  | 对数值进行格式化 |
