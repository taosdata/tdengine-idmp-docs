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
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import styles from './styles.module.css';
import SidebarTop from '../SidebarTop';
function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();
  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}>
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <SidebarTop></SidebarTop>
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}
export default React.memo(DocSidebarDesktop);
