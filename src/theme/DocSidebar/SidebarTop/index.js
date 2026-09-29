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

import { useCallback, useMemo } from "react";
import { useHistory } from "@docusaurus/router";
import { useActivePluginAndVersion } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import SearchBar from '@theme/SearchBar';
import styles from "./styles.module.css";

export default function SidebarTop() {
    const history = useHistory();
    const { activeVersion } = useActivePluginAndVersion();
    const { siteConfig } = useDocusaurusContext();
    const { baseUrl } = siteConfig;
    const { versions, ltsVersion, latestVersion, onlyCurrentVersion } = siteConfig.customFields;
    const dropdownVersions = [latestVersion, ...versions];

    const versionOptions = useMemo(() => dropdownVersions.map((version) => ({
        value: version,
        label:
            version === "cloud"
                ? "Cloud"
                : version === latestVersion
                    ? `v${version} (Latest)`
                    : version === ltsVersion
                        ? `v${version} (LTS)`
                        : `v${version}`
    })), [versions, ltsVersion, latestVersion]);

    const onChange = useCallback(
        (e) => {
            const v = e.target.value;
            const nextPath = v === latestVersion ? baseUrl : `${baseUrl}${v}/`;
            history.push(nextPath);
        },
        [history, latestVersion]
    );

    return (
        <div className={styles.sidebarTop}>
            {/* 产品打包只含 current 版本，归档版本无路由，隐藏版本下拉 */}
            {!onlyCurrentVersion && (
                <select className={styles.versionSelect} value={activeVersion.name} onChange={onChange}>
                    {versionOptions.map((version) => (
                        <option key={version.value} value={version.value}>
                            {version.label}
                        </option>
                    ))}
                </select>
            )}
            <SearchBar />
        </div>
    );
}
