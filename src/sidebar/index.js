/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarItemsGenerator}
 */
const customSidebarItemsGenerator = async ({
    defaultSidebarItemsGenerator,
    ...args
}) => {
    function isReleaseHistoryCategory(item) {
        if (item?.type !== 'category' || !Array.isArray(item.items)) {
            return false;
        }

        const releaseLabels = new Set([
            'Release Notes',
            'Release History',
            '发布说明',
            '发布历史'
        ]);

        if (releaseLabels.has(item.label)) {
            return true;
        }

        // Fallback to category link id/path so sorting survives label changes.
        const linkId = item.link?.id || '';
        return /(^|\/)\d*-?release-history\/index$/.test(linkId);
    }

    function sortReleaseHistory(items) {
        // Debug logs for version extraction and sorting
        // To enable debug logs, set DEBUG_RELEASE_SORT=true
        const DEBUG_RELEASE_SORT = false;

        // Split version docs and other docs
        const versionItems = items.filter(
            (item) => item.id && item.id.match(/(\d+\.\d+\.\d+\.\d+)$/)
        );

        const otherItems = items.filter(
            (item) => !(item.id && item.id.match(/(\d+\.\d+\.\d+\.\d+)$/))
        );

        if (DEBUG_RELEASE_SORT) {
            versionItems.forEach(item => {
                const match = item.id.match(/(\d+\.\d+\.\d+\.\d+)$/);
                const verArr = match ? match[1].split('.').map(Number) : [];
                console.log('id:', item.id, 'verArr:', verArr);
            });
        }

        // Numeric sort
        versionItems.sort((a, b) => {
            const getVer = (item) => {
                const match = item.id.match(/(\d+\.\d+\.\d+\.\d+)$/);
                return match ? match[1].split('.').map(Number) : [];
            };
            const aVer = getVer(a);
            const bVer = getVer(b);
            for (let i = 0; i < Math.max(aVer.length, bVer.length); i++) {
                const diff = (bVer[i] || 0) - (aVer[i] || 0);
                if (diff !== 0) return diff;
            }
            return 0;
        });

        // Debug log for sorted result
        if (DEBUG_RELEASE_SORT) {
            console.log('Sorted:', versionItems.map(i => i.id));
        }

        return [...otherItems, ...versionItems];
    }

    function deepSort(items) {
        return items.map(item => {
            if (isReleaseHistoryCategory(item)) {
                // Sort version entries under "Release Notes"
                return { ...item, items: sortReleaseHistory(item.items) };
            } else if (Array.isArray(item.items)) {
                // Recursively process other categories
                return { ...item, items: deepSort(item.items) };
            }
            return item;
        });
    }

    const sidebarItems = await defaultSidebarItemsGenerator(args);
    return deepSort(sidebarItems);
};

export default customSidebarItemsGenerator;
