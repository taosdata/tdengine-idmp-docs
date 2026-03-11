// @ts-check

import tdengineTheme from './src/prism/tdengine-theme';


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

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarItemsGenerator}
 */
const customSidebarItemsGenerator = async ({
  defaultSidebarItemsGenerator,
  ...args
}) => {
  function sortReleaseHistory(items) {
    // Debug logs for version extraction and sorting
    // To enable debug logs, set DEBUG_RELEASE_SORT = true
    const DEBUG_RELEASE_SORT = false;
    
    // Split version docs and other docs
    const versionItems = items.filter(
      (item) => item.id && item.id.match(/(\d+\.\d+\.\d+\.\d+)$/)
    );
    
    const otherItems = items.filter(
      (item) => !(item.id && item.id.match(/(\d+\.\d+\.\d+\.\d+)$/))
    );

    if (DEBUG_RELEASE_SORT) {
      versionItems.forEach(item => {
        const match = item.id.match(/(\d+\.\d+\.\d+\.\d+)$/);
        const verArr = match ? match[1].split('.').map(Number) : [];
        console.log('id:', item.id, 'verArr:', verArr);
      });
    }

    // Numeric sort
    versionItems.sort((a, b) => {
      const getVer = (item) => {
        const match = item.id.match(/(\d+\.\d+\.\d+\.\d+)$/);
        return match ? match[1].split('.').map(Number) : [];
      };
      const aVer = getVer(a);
      const bVer = getVer(b);
      for (let i = 0; i < Math.max(aVer.length, bVer.length); i++) {
        const diff = (aVer[i] || 0) - (bVer[i] || 0);
        if (diff !== 0) return diff;
      }
      return 0;
    });

    // Debug log for sorted result
    if (DEBUG_RELEASE_SORT) {
      console.log('Sorted:', versionItems.map(i => i.id));
    }

    // Newest version first
    versionItems.reverse();
    return [...otherItems, ...versionItems];
  }

  function deepSort(items) {
    return items.map(item => {
      if (
        item.type === 'category' &&
        (item.label === '发布历史' || item.label === 'Release History') &&
        item.items
      ) {
        return { ...item, items: sortReleaseHistory(item.items) };
      } else if (item.items) {
        return { ...item, items: deepSort(item.items) };
      }
      return item;
    });
  }

  const sidebarItems = await defaultSidebarItemsGenerator(args);
  return deepSort(sidebarItems);
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: getTitle(),
  tagline: '工业互联网全量设备的元数据可视化管理系统',
  favicon: '/favicon.ico',
  future: {
    v4: true,
    experimental_faster: true
  },
  url: 'https://idmpdocs.taosdata.com',
  trailingSlash: true,
  baseUrl: '/',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw'
    }
  },
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
          routeBasePath: '/',
          breadcrumbs: false,
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarItemsGenerator: customSidebarItemsGenerator,
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
        defaultMode: 'light',
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
        appId: 'FP08SIOFZ3',
        apiKey: '89d4d983122a141b426e52fdca50e3a0',
        indexName: 'tdasset_index',
        searchPagePath: false
      },
      metadata: [
        {
          name: 'description',
          content: 'TDengine Industrial Data Management Platform（TDengine IDMP）是一物联网、工业数据管理系统，它通过经典的树状结构组织传感器、设备采集的数据，实现数据的语境化、标准化、并提供实时分析、可视化、事件管理与报警等功能，旨在帮助企业从运营数据中挖掘出商业价值',
        },
        {
          name: 'baidu-site-verification',
          content: 'code-Fvrqff6sDg',
        },
      ],

      navbar: {
        hideOnScroll: true,
        logo: {
          alt: 'TDengine IDMP',
          src: '/img/tdengine-idmp.svg'
        },
        items: [
          {
            label: 'AI 问答',
            to: '/redirect?target=chat',
            position: 'right',
            target: '_blank', // 新标签页打开
            rel: 'noopener noreferrer', // 安全性
            locale: 'zh-Hans',
          },
          {
            label: 'TSDB 文档',
            to: '/redirect?target=tsdb',
            position: 'right',
            target: '_blank', // 新标签页打开
            rel: 'noopener noreferrer', // 安全性
          },
          {
            label: 'Cloud',
            to: '/redirect?target=cloud',
            position: 'right',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          {
            label: '联系我们',
            to: '/redirect?target=contactus',
            position: 'right',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          {
            type: 'search',
            position: 'right',
            className: 'navbarSearchTemp'
          },
        ],
      },
      prism: {
        theme: tdengineTheme,
        additionalLanguages: [
          'bash',
          'batch',
          'ini',
          'powershell'
        ]
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
    '/fonts/css/ibm-plex.min.css'
  ]
};

export default config;
