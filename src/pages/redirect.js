/*
 * Copyright (c) TAOS Data, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: LicenseRef-TAOSData-Commercial
 *
 * This file is proprietary to TAOS Data, Inc. and may contain confidential
 * information. No rights are granted by this file. Use is permitted only
 * under a written agreement with TAOS Data, Inc. or an authorized affiliate.
 * Unauthorized copying, modification, distribution, or disclosure, in whole
 * or in part, by any medium, is strictly prohibited.
 */

import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

const urlMappings = {
  blog: {
    en: 'https://www.tdengine.com/blog',
    'zh-Hans': 'https://www.taosdata.com/blog',
  },
  tsdb: {
    en: 'https://docs.tdengine.com/',
    'zh-Hans': 'https://docs.taosdata.com/',
  },
  cloud: {
    en: 'https://cloud.tdengine.com/',
    'zh-Hans': 'https://cloud.taosdata.com/',
  },
  contactus: {
    en: 'https://tdengine.com/contact/',
    'zh-Hans': 'https://www.taosdata.com/contactus',
  },
  chat: {
    'zh-Hans': 'https://chat.taosdata.com/',
  },
};

function getQueryParam(search, key) {
  const params = new URLSearchParams(search);
  return params.get(key);
}

export default function RedirectPage() {
  const { i18n } = useDocusaurusContext();
  const location = useLocation();
  const target = getQueryParam(location.search, 'target');

  useEffect(() => {
    const locale = i18n.currentLocale;
    const href =
      urlMappings[target]?.[locale] || urlMappings[target]?.en || '/';
    // console.log('locale:', locale, 'target:', target, 'href:', href);
    window.location.replace(href);
  }, [i18n.currentLocale, target]);

  const text = i18n.currentLocale === 'en' ? 'Redirecting...' : '正在跳转...';

  return <p>{text}</p>;
}