import React from "react";
import {useDoc, useActivePluginAndVersion} from '@docusaurus/plugin-content-docs/client';
import Translate, {translate} from "@docusaurus/Translate";
import PaginatorNavLink from "@theme/PaginatorNavLink";
import clsx from "clsx";
import styles from "./styles.module.css";
import Popup from "../Footer/components/popup";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function getEditUrl(metadata, locale) {
  // 您的仓库根路径
  const repoRoot = 'https://github.com/taosdata/tdasset-docs/edit/main';
  const source = metadata.source.replace(/^@site\//, '');
  return `${repoRoot}/${source}`;
}

function FeedBack({editUrl}) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [data, setData] = React.useState({title: "", str: ""});
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale;

  // 根据语言切换联系链接
  const contactUrl =
    locale === 'en'
      ? 'https://tdengine.com/contact/'
      : 'https://www.taosdata.com/contactus';

  function getServices(e) {
    e.preventDefault();
    setData({title: translate({id: 'feedback.contactTitle', message: 'Contact TDengine'}), src: "contactSales"});
    setShowPopup(!showPopup);
  }

  return (
    <div className={clsx(styles.feedback)}>
      <h4>
        <Translate id="feedback.title">支持和反馈</Translate>
      </h4>
      <p>
        <Translate id="feedback.desc">
          欢迎您对本文档或其他任何 TDengine IDMP 的错误进行修改或报告。
        </Translate>
      </p>
      <div>
        {editUrl && (
          <span>
            <a href={editUrl} target="_blank" rel="noopener">
              <Translate id="feedback.editDoc">编辑本文档</Translate>
            </a>
            &nbsp;|&nbsp;
          </span>
        )}
        <a
          href="https://ask.taosdata.com/"
          target="_blank"
          rel="noopener"
        >
          <Translate id="feedback.reportIssue">反馈问题</Translate>
        </a>
        &nbsp;|&nbsp;
        <a
          href={contactUrl}
          target="_blank"
          rel="noopener"
          className="advice"
        >
          <Translate id="feedback.getService">获取专业服务</Translate>
        </a>
        <Popup
          hidden={!showPopup}
          data={data}
          pfn={setShowPopup}
        />
      </div>
    </div>
  );
}

export default function DocPaginator(props) {
  const {previous, next} = props;
  const {metadata} = useDoc();
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const editUrl = getEditUrl(metadata, locale);

  return (
    <div>
      <nav
        className="pagination-nav docusaurus-mt-lg"
        aria-label={translate({
          id: "theme.docs.paginator.navAriaLabel",
          message: "Docs pages navigation",
          description: "The ARIA label for the docs pagination",
        })}
      >
        <div className="pagination-nav__item">
          {previous && (
            <PaginatorNavLink
              {...previous}
              subLabel={
                <Translate
                  id="theme.docs.paginator.previous"
                  description="The label used to navigate to the previous doc"
                >
                  Previous
                </Translate>
              }
            />
          )}
        </div>
        <div className="pagination-nav__item pagination-nav__item--next">
          {next && (
            <PaginatorNavLink
              {...next}
              subLabel={
                <Translate
                  id="theme.docs.paginator.next"
                  description="The label used to navigate to the next doc"
                >
                  Next
                </Translate>
              }
              isNext
            />
          )}
        </div>
      </nav>
      <div>
        <FeedBack editUrl={editUrl} />
      </div>
    </div>
  );
}