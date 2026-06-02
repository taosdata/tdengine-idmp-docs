const eolCutoff = "0.0";

function buildDocsVersions(versions) {
    const latest = versions[0];
    const versionToNumber = (v) => {
        if (typeof v !== 'string' || !/^\d/.test(v)) return NaN;
        return Number(v.split('.').map(part => part.padStart(3, '0')).join(''));
    };
    const cutoffValue = versionToNumber(eolCutoff);
    const versionsConfig = {};

    for (const v of versions) {
        const isLatest = v === latest;
        const isCloud = v === "cloud";
        const numericValue = versionToNumber(v);
        const isEol = (!isCloud) && numericValue <= cutoffValue;

        versionsConfig[v] = {
            badge: false,
            noIndex: !(isLatest || isCloud),
            banner: isEol ? "unmaintained" : "none",
        };
    }
    versionsConfig["current"] = {
        badge: false,
        banner: "none"
    };

    return versionsConfig;
}

module.exports = { buildDocsVersions };
