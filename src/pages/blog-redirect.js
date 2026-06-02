import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function BlogRedirect() {
  const { i18n } = useDocusaurusContext();

  useEffect(() => {
    const locale = i18n.currentLocale;
    const localeUrlMappings = {
      en: 'https://www.tdengine.com/blog',
      'zh-Hans': 'https://www.taosdata.com/blog',
    };
    const href = localeUrlMappings[locale] || localeUrlMappings.en;

    window.location.replace(href);
  }, [i18n.currentLocale]);

  return <p>正在跳转到博客...</p>;
}