// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';

const getTitle = () => {
  const locale = process.env.DOCUSAURUS_CURRENT_LOCALE || 'zh-Hans';
  if (locale === 'en') {
    return 'TDengine IDMP Documentation | TDengine';
  }
  return 'TDengine IDMP 文档 | 涛思数据';
};

const getGTMID = () => {
  const locale = process.env.DOCUSAURUS_CURRENT_LOCALE || 'zh-Hans';
  if (locale === 'en') {
    return 'GTM-TFHMZLS3';
  }
  return 'GTM-MLW247PH';
};


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: getTitle(),
  tagline: '工业互联网全量设备的元数据可视化管理系统',
  favicon: '/favicon.ico',
  url: 'https://idmpdocs.taosdata.com',
  // trailingSlash: true,
  baseUrl: '/',
  onBrokenAnchors: 'throw',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['en', 'zh-Hans'],
    localeConfigs: {
      'en': {
        label: 'English',
        htmlLang: 'en-US'
      },
      'zh-Hans': {
        label: '简体中文',
      },
    },
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: './sidebars.js',
          breadcrumbs: false,
        },
        googleTagManager: {
          containerId: getGTMID()
        },
        sitemap: {
          lastmod: 'datetime',
          changefreq: null,
          priority: null
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        }
      },
      algolia: {
        appId: "FP08SIOFZ3",
        apiKey: "89d4d983122a141b426e52fdca50e3a0",
        indexName: "tdasset_index",
        searchPagePath: false
      },
      metadata: [
        // This would become <meta name="keywords" content="..."> in the generated HTML
        {
          name: "description",
          content: "TDengine Industrial Data Management Platform（TDengine IDMP）是一物联网、工业数据管理系统，它通过经典的树状结构组织传感器、设备采集的数据，实现数据的语境化、标准化、并提供实时分析、可视化、事件管理与报警等功能，旨在帮助企业从运营数据中挖掘出商业价值",
        },
        {
          name: "baidu-site-verification",
          content: "code-Fvrqff6sDg",
        },
      ],

      navbar: {
        hideOnScroll: true,
        logo: {
          alt: "TDengine IDMP",
          src: "/img/tdengine-idmp.svg"
        },
        items: [
          {
            label: "TSDB 文档",
            to: "/redirect?target=tsdb",
            position: "right",
            target: "_blank", // 新标签页打开
            rel: "noopener noreferrer", // 安全性
          },
          {
            label: "Cloud",
            to: "/redirect?target=cloud",
            position: "right",
            target: "_blank",
            rel: "noopener noreferrer",
          },
          {
            label: "联系我们",
            to: "/redirect?target=contactus",
            position: "right",
            target: "_blank",
            rel: "noopener noreferrer",
          },
          {
            type: "search",
            position: "right",
            className: "navbarSearchTemp"
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      zoom: {
        selector: '.markdown :not(em) > img, img[data-zoom]',
        background: { light: '#fff', dark: '#333' }
      },
    }),
  plugins: [
    [
      'docusaurus-plugin-image-zoom',
      {
        selector: '.theme-doc-markdown img, .markdown img, .theme-doc-content img',
        background: 'rgba(0,0,0,0.8)',
        zoomMargin: 32,
      },
    ],
  ],
  stylesheets: [
    "/fonts/css/ibm-plex.min.css"
  ]
};

export default config;
