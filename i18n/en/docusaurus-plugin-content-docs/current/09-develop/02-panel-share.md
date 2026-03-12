# Page-integrated Dashboard and Panels

You can integrate dashboards or panels into your system pages.

## Getting Integration Links

Login to the IDMP system, go to the "Dashboard" or "Panel" view page, click the "Share" button in the upper right corner, set the sharing duration, and submit to get the integration link.

## Integration Methods

You can integrate dashboards or panels into your system pages using the iframe tag. For example (ensure you configure appropriate Content Security Policy (CSP) headers on the hosting page and restrict the iframe's capabilities with the `sandbox` attribute as needed):

```html
<iframe
  src="integration_link"
  width="100%"
  height="600"
  frameborder="0"
  sandbox="allow-same-origin allow-scripts"
></iframe>
```

Adjust the sandbox value to the minimum set of permissions your integration requires (for example, remove allow-scripts if scripts are not needed), and ensure your CSP only allows the expected iframe source.

You can also open dashboards or panels in a new page using the link tag. For example:

```html
<a href="integration_link" target="_blank">Open Dashboard</a>
```
