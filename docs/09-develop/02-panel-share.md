# 页面集成仪表板与面板

您可以将仪表板或者面板集成到您的系统页面中。

## 获取集成链接

登录 idmp 系统，进入“仪表板”或者“面板”查看页面，点击右上角的“分享”按钮，设置分享时长后提交，即可获取集成链接。

## 集成方案

您可以通过 iframe 标签将仪表板或者面板集成到您的系统页面中。出于安全考虑，建议在集成页面上配置合适的 Content Security Policy (CSP) 头（例如限制 `frame-ancestors`、`script-src` 等），并通过 `sandbox` 属性限制 iframe 的能力。示例如下：

```html
<iframe
  src="集成链接"
  width="100%"
  height="600"
  frameborder="0"
  sandbox="allow-same-origin allow-scripts"
></iframe>
```

请根据业务需求谨慎调整 sandbox 权限（如是否允许表单提交、弹出窗口等），并在服务端设置严格的 CSP 头来减少 XSS、点击劫持等安全风险。

也可以通过 link 标签在新页面中打开仪表板或者面板，示例如下：

```html
<a href="集成链接" target="_blank">打开仪表板</a>
```
