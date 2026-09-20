---
title: Embedding Panels and Dashboards
sidebar_label: Embedding Panels and Dashboards
---

# 15.3 Embedding Panels and Dashboards

IDMP panels and dashboards can be embedded directly into external web applications, bringing live industrial visualizations into operator portals, custom UIs, or AI dashboards.

## 15.3.1 Getting the Embed Link

1. Log in to IDMP and navigate to the **Dashboards** or **Panels** view.
2. Open the dashboard or panel you want to embed.
3. Click the **Share** button in the top-right corner.
4. Set the share duration and click **Submit**.
5. Copy the generated embed link.

## 15.3.2 Embedding with an iframe

Use an `<iframe>` tag to embed the panel or dashboard in your web page. For security, configure a Content Security Policy (CSP) header on your host page (e.g., restrict `frame-ancestors` and `script-src`) and use the `sandbox` attribute to limit iframe capabilities:

```html
<iframe
  src="<embed-link>"
  width="100%"
  height="600"
  frameborder="0"
  sandbox="allow-same-origin allow-scripts"
></iframe>
```

Adjust the `sandbox` permissions carefully based on your requirements (e.g., whether to allow form submission or pop-ups), and configure strict CSP headers on the server to reduce XSS and clickjacking risks.

## 15.3.3 Opening in a New Tab

To open a panel or dashboard in a new browser tab instead of embedding it inline, use a link:

```html
<a href="<embed-link>" target="_blank">Open Dashboard</a>
```
