import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const TOC_LINK_SELECTOR = '.table-of-contents__link';
const ANCHOR_LINK_SELECTOR = 'a[href^="#"]';
const NAVBAR_HIDDEN_CLASS = 'navbarHidden_bnBw';

export default function Root({ children }) {
  const location = useLocation();

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    const tocContainer = document.querySelector('.table-of-contents');

    const hideNavbar = () => {
      navbar?.classList.add(NAVBAR_HIDDEN_CLASS);
    };

    const showNavbar = () => {
      navbar?.classList.remove(NAVBAR_HIDDEN_CLASS);
    };

    const observer = new MutationObserver(() => {
      if (body.classList.contains('medium-zoom--opened')) {
        hideNavbar();
      } else {
        showNavbar();
      }
    });
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });

    const handleLinkClick = (e) => {
      if (
        e.target.closest(TOC_LINK_SELECTOR) ||
        (e.target.closest(ANCHOR_LINK_SELECTOR) &&
          e.target.getAttribute('href')?.startsWith('#'))
      ) {
        hideNavbar();
      }
    };

    if (tocContainer) {
      tocContainer.addEventListener('click', handleLinkClick);
    }
    document.body.addEventListener('click', handleLinkClick);

    // 页面加载或路由切换时，如果有 hash，自动收起导航栏
    if (window.location.hash) {
      hideNavbar();
    }

    return () => {
      observer.disconnect();
      if (tocContainer) {
        tocContainer.removeEventListener('click', handleLinkClick);
      }
      document.body.removeEventListener('click', handleLinkClick);
      showNavbar();
    };
  }, [location.pathname]);

  const {i18n} = useDocusaurusContext();
  const locale = i18n?.currentLocale || i18n?.defaultLocale || 'zh-Hans';

  return (
    <>
      {locale === 'zh-Hans' && (
        <Head>
          <script async src="https://hm.baidu.com/hm.js?36af43fc308ee9444604d82ec053c128"></script>
        </Head>
      )}
      {children}
    </>
  );
}