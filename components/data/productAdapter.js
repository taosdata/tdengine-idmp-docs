export async function fetchPackagesFromProduct({
  productName,
  version,
  platform,
  arch,
  pkgType, // "Server" or "Client"
  jsonPath
} = {}) {
  const remote = 'https://www.taosdata.com/assets/pkg-js/product-data.json';
  // resolve jsonPath: absolute > site-root-relative > remote
  let url = jsonPath || remote;
  console.log('[adapter] fetch url=', url, 'opts=', { productName, version, platform, arch, pkgType, jsonPath });
  if (jsonPath && !/^https?:\/\//i.test(jsonPath) && typeof window !== 'undefined') {
    // ensure begins with '/'
    const p = jsonPath.startsWith('/') ? jsonPath : '/' + jsonPath;
    url = window.location.origin + p;
  }

  try {
    console.log('[adapter] fetch url=', url, 'opts=', { productName, version, platform, arch, pkgType });
    const res = await fetch(url, { cache: 'no-cache' });
    console.log('[adapter] fetch status=', res.status, 'ctype=', res.headers.get('content-type'));
    if (!res.ok) {
      console.warn('fetchPackagesFromProduct: fetch failed', url, res.status);
      return [];
    }
    const products = await res.json();
    console.log('[adapter] products type=', typeof products, 'length=', Array.isArray(products) ? products.length : 0);
    if (!Array.isArray(products)) return [];

    // 找 product：优先精确匹配 name，再模糊匹配（大小写不敏感）
    // 支持多值 productName（用 | 或 , 分隔），并做大小写不敏感的精确或模糊匹配
    let product = null;
    let versions = [];

    if (typeof productName === 'string' && productName.trim()) {
      const raw = productName.trim();
      // token 列表：支持 "A|B" 或 "A,B"
      const tokens = raw.split(/\s*[|,]\s*/).map(t => t.trim()).filter(Boolean).map(t => t.toLowerCase());

      if (tokens.length > 1) {
        // 多选：分别匹配每个 token，收集所有匹配到的 products
        const matchedProducts = [];
        tokens.forEach((tk) => {
          const exact = products.find(p => ((p.name || '').toLowerCase() === tk));
          if (exact) matchedProducts.push(exact);
          else {
            const fuzzy = products.find(p => ((p.name || '').toLowerCase().includes(tk)));
            if (fuzzy) matchedProducts.push(fuzzy);
          }
        });
        // 去重
        const uniq = Array.from(new Set(matchedProducts));
        if (uniq.length) {
          console.log('[adapter] multi-token productName matched count=', uniq.length);
          versions = uniq.reduce((acc, p) => acc.concat(Array.isArray(p.versions) ? p.versions : []), []);
        } else {
          // 没匹配到任何 token，再走后续通用策略
          product = null;
        }
      } else {
        // 单一 token：原有优先精确再模糊的匹配
        const key = tokens[0];
        product = products.find(p => ((p.name || '').toLowerCase() === key))
               || products.find(p => ((p.name || '').toLowerCase().includes(key)));
      }
    }

    // 如果还没有版本集合，尝试宽松合并 tdengine（保持之前行为）
    if (!versions.length) {
      if (!product) {
        const key = (productName || '').toString().toLowerCase();
        const looksLikeTdengine = key && key.includes('tdengine');
        const explicitlyEditionMentioned = key && (key.includes('oss') || key.includes('enterprise'));
        if (looksLikeTdengine && !explicitlyEditionMentioned) {
          const matchedProducts = products.filter(p => (p.name || '').toLowerCase().includes('tdengine'));
          console.log('[adapter] multi-product selected for generic tdengine, count=', matchedProducts.length);
          versions = matchedProducts.reduce((acc, p) => {
            if (Array.isArray(p.versions)) acc = acc.concat(p.versions);
            return acc;
          }, []);
        } else {
          product = product || products[0];
        }
      } else {
        versions = Array.isArray(product.versions) ? product.versions.slice() : [];
      }
    }

    console.log('[adapter] selected product=', product && product.name, 'versions count=', versions.length);

    // helper: case-insensitive includes match for fields (more forgiving)
    const matchesFilter = (item, { version: fv, platform: fp, arch: fa, pkgType: ft }) => {
      if (fv && !(String(item.version || item.name || '').toLowerCase().includes(String(fv).toLowerCase()))) return false;
      if (fp && !((item.platform || '').toLowerCase().includes(String(fp).toLowerCase()))) return false;
      if (fa && !((item.arch || '').toLowerCase().includes(String(fa).toLowerCase()))) return false;
      if (ft && !((item.type || '').toLowerCase().includes(String(ft).toLowerCase()))) return false;
      return true;
    };

    // try progressively looser filters
    const filtersList = [
      { version, platform, arch, pkgType },
      { version, platform, arch, pkgType: undefined },
      { version, platform, pkgType },
      { version, platform },
      { version, pkgType },
      { platform, arch, pkgType },
      { platform, arch },
      { platform },
      { pkgType },
      { version },
      {}
    ];

    let matched = [];
    for (const f of filtersList) {
      matched = versions.filter(v => matchesFilter(v, f));
      if (matched.length) break;
    }

    // if still empty, try matching by filename or extension in download-url
    if (!matched.length) {
      const filenameKey = (productName || version || platform || arch || pkgType || '').toString().toLowerCase();
      matched = versions.filter(v => {
        const urlCandidate = (v['download-url'] || v['download_url'] || v.url || '').toLowerCase();
        if (!urlCandidate) return false;
        // match by containing key or common file extensions when user asked for deb/rpm
        if (filenameKey && urlCandidate.includes(filenameKey)) return true;
        if ((pkgType && String(pkgType).toLowerCase().includes('deb')) && urlCandidate.endsWith('.deb')) return true;
        if ((pkgType && String(pkgType).toLowerCase().includes('rpm')) && urlCandidate.endsWith('.rpm')) return true;
        if ((platform && String(platform).toLowerCase().includes('windows')) && /\.(exe|zip|msi)$/i.test(urlCandidate)) return true;
        return false;
      });
    }

    console.log('[adapter] matched count=', matched.length);

    // normalize results
    const normalized = matched.map(v => ({
      id: v.id || v.name || `${v.version || ''}-${v.platform || ''}-${v.arch || ''}`.replace(/\s+/g, '-'),
      name: v.name || v.version || '',
      url: v['download-url'] || v['download_url'] || v.url || '',
      size: v.size || v.filesize || '',
      date: v.date || v.version || '',
      md5: v.md5 || '',
      releaseNotes: v['release-notes-url'] || v.releaseNotes || '',
      platform: v.platform || '',
      arch: v.arch || '',
      type: v.type || ''
    })).filter(p => p.url);

    // as last fallback if still empty, return first N normalized versions from product
    if (!normalized.length && versions.length) {
      const fallback = versions.slice(0, 8).map(v => ({
        id: v.id || v.name || v.version || Math.random().toString(36).slice(2),
        name: v.name || v.version || '',
        url: v['download-url'] || v['download_url'] || v.url || '',
        size: v.size || '',
        date: v.date || '',
        platform: v.platform || '',
        arch: v.arch || '',
        type: v.type || ''
      })).filter(p => p.url);
      console.log('[adapter] fallback count=', fallback.length);
      return fallback;
    }

    return normalized;
  } catch (err) {
    console.error('fetchPackagesFromProduct error', err);
    return [];
  }
}