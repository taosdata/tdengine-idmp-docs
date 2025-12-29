import React from 'react';
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

function sortVersions(items) {
  return items.sort((a, b) => {
    const versionA = a.label.split('.').map(Number);
    const versionB = b.label.split('.').map(Number);
    const maxLength = Math.max(versionA.length, versionB.length);

    for (let i = 0; i < maxLength; i++) {
      const numA = versionA[i] || 0; 
      const numB = versionB[i] || 0; 
      if (numA !== numB) {
        return numB - numA; // 倒序
      }
    }
    return 0; 
  });
}

export default function SortedDocCardList() {
  const items = useCurrentSidebarCategory().items;
  const sortedItems = sortVersions(items);

  return <DocCardList items={sortedItems} />;
}