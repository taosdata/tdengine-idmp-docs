---
title: 嵌入面板与仪表盘
sidebar_label: 嵌入面板与仪表盘
---

# 15.3 嵌入面板与仪表盘

IDMP 的面板和仪表盘可直接嵌入外部 Web 应用，将实时工业可视化内容引入操作员门户、自定义界面或 AI 仪表盘。

## 15.3.1 获取嵌入链接

1. 登录 IDMP，进入**仪表盘**或**面板**查看页面。
2. 打开您想要嵌入的仪表盘或面板。
3. 点击右上角的**分享**按钮。
4. 设置分享时长后点击**提交**。
5. 复制生成的嵌入链接。

## 15.3.2 通过 iframe 嵌入

使用 `<iframe>` 标签将面板或仪表盘嵌入您的网页。出于安全考虑，建议在宿主页面上配置合适的 Content Security Policy（CSP）头（例如限制 `frame-ancestors` 和 `script-src`），并通过 `sandbox` 属性限制 iframe 的能力：

```html
<iframe
  src="<嵌入链接>"
  width="100%"
  height="600"
  frameborder="0"
  sandbox="allow-same-origin allow-scripts"
></iframe>
```

请根据业务需求谨慎调整 `sandbox` 权限（例如是否允许表单提交或弹出窗口），并在服务端设置严格的 CSP 头，以降低 XSS 和点击劫持等安全风险。

## 15.3.3 在新标签页中打开

如需在新浏览器标签页中打开面板或仪表盘，而非内联嵌入，可使用链接：

```html
<a href="<嵌入链接>" target="_blank">打开仪表盘</a>
```
