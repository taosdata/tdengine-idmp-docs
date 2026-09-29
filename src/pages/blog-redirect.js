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