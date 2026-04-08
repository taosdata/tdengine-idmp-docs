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
    const { versions, ltsVersion, latestVersion } = siteConfig.customFields;
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
            <select className={styles.versionSelect} value={activeVersion.name} onChange={onChange}>
                {versionOptions.map((version) => (
                    <option key={version.value} value={version.value}>
                        {version.label}
                    </option>
                ))}
            </select>
            <SearchBar />
        </div>
    );
}
