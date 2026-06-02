// Original: https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-ghcolors.css
import type { PrismTheme } from "prism-react-renderer"
const theme: PrismTheme = {
  plain: {
    color: "var(--contrast-2)",
    backgroundColor: "#f6f8fa",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "var(--contrast-3)",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#e3116c",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#393A34",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: "#36acaa",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#00a4db",
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#d73a49",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "var(--accent)",
      },
    },
  ],
}
export default theme
