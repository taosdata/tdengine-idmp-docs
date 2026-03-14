# 文档写作速查表

快速查阅常见写作场景的规范要求。

## 标题写作

```markdown
# 文档主标题（只能有一个）

## 功能介绍

### 子功能 A

#### 具体步骤

✅ 要点：
- # 后必须有空格：# 标题
- 不能缩进：## 正确，  ## 错误
- 只能有一个一级标题
- 使用 ATX 样式（#），不能用下划线
```

## 代码块写作

````markdown
```java
// Java 代码必须指定语言
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

```python
# Python 代码
print("Hello")
```

```bash
# 命令行
npm install
```

```json
{
    "key": "value"
}
```

✅ 要点：
- 使用反引号 ```，不能用波浪号 ~~~
- 必须指定语言（java/python/bash/json/yaml）
- 不能用缩进代码块
````

## 中英文混排

```markdown
✅ 正确示例：
使用 Java SDK 连接 TDengine 数据库
支持 REST API 和 WebSocket 协议
版本 3.0 已发布，有 100 个新特性

❌ 错误示例：
使用Java SDK连接TDengine数据库
支持REST API和WebSocket协议
版本3.0已发布，有100个新特性

✅ 要点：
- 中文和英文之间加空格
- 中文和数字之间加空格
```

## 强调用法（重要！）

```markdown
✅ 正确（符合自定义规则）：
**重要**：这是重要提示。
**注意** - 这是注意事项。
**警告**：执行前请备份。

❌ 错误（会被检查）：
**重要**:这是重要提示。
**注意**-这是注意事项。

✅ 要点：
- ** 后必须有空格
- 使用全角冒号：，不是英文 :
- 或者用空格 + 短横线
```

## 链接写作

```markdown
✅ 正确：
[链接文本](https://example.com)
[内部文档](./other-doc.md)
[锚点链接](#section-id)
https://example.com

❌ 错误：
<https://example.com>        ← 不能用尖括号
[链接文本]()                ← 不能为空
[点击](javascript:void(0))  ← 不能用 javascript:
```

## 列表写作

```markdown
有序列表：
1. 第一步
2. 第二步
3. 第三步

无序列表：
- 项目 A
- 项目 B
- 项目 C

✅ 要点：
- 有序列表序号可以任意（1. 1. 1. 也可以）
- 无序列表建议统一用 -
```

## Tabs 组件

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
// 代码前要有空行
```

</TabItem>
<TabItem value="python" label="Python">

```python
# 代码前要有空行
```

</TabItem>
</Tabs>

✅ 要点：
- 组件标签前后要有空行
- </TabItem> 前要有空行
- value 用于代码标识，label 用于显示
```

## 提示框

```markdown
:::tip
提示信息，有用的建议
:::

:::note
说明信息，补充内容
:::

:::warning
警告信息，需要注意
:::

:::danger
危险警告，谨慎操作
:::
```

## 标点符号

```markdown
✅ 中文文档使用全角标点：
这是一个句子。
请在"设置"中配置。
选择"文件"→"保存"。
支持以下语言：Java、Python、Go。

❌ 错误：
这是一个句子.
请在"设置"中配置.
```

## 文件命名

```
✅ 正确：
docs/
├── 01-intro/
│   ├── index.md
│   └── 01-quick-start.md
├── 02-api/
│   └── reference.md

❌ 错误：
docs/
├── 01_intro/           ← 不能用下划线
│   ├── Index.md        ← 不能大写
│   └── quickStart.md   ← 不能用驼峰
```

## 常见错误速查

| 错误 | 原因 | 修复 |
|------|------|------|
| MD018/MD019 | # 后缺少空格或多空格 | # 标题 |
| MD023 | 标题有缩进 | 删除行首空格 |
| MD025 | 多个一级标题 | 只保留一个 # |
| MD036 | **文本** 作为标题 | 改为 ### 文本 |
| MD042 | 链接为空 | 补充链接地址 |
| MD046 | 使用缩进代码块 | 改为 ``` |
| MD048 | 使用波浪号 | 改为反引号 |
| no-angle-bracket-url | 尖括号包裹 URL | 去掉尖括号 |
| space-after-punctuation | **后无空格 | ** 后加空格 |
| typos | 拼写错误 | 检查拼写或加入白名单 |
| autocorrect | 排版问题 | 中英文间加空格 |

## 本地验证

```bash
# 运行本地检查
bash .agent/skills/doc-writing/scripts/check-local.sh
```
