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
