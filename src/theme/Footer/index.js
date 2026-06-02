import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import EnglishFooter from './en';
import ChineseFooter from './zh';

function Footer() {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'en' ? (
    <EnglishFooter />
  ) : (
    <ChineseFooter />
  );
}
export default React.memo(Footer);
