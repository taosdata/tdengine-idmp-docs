/* Capability Explorer — client-side interactions */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Global search (sidebar, all pages) =====
  const globalSearch = document.getElementById('global-search');
  const searchResults = document.getElementById('search-results');
  const capIndex = window.CAP_INDEX || [];
  let activeIdx = -1;

  function renderResults(matches) {
    if (!matches.length) {
      searchResults.classList.remove('open');
      searchResults.innerHTML = '';
      activeIdx = -1;
      return;
    }
    searchResults.innerHTML = matches.slice(0, 15).map((m, i) =>
      `<a class="search-result-item" href="/capability/${m.id}" data-idx="${i}">${m.name}<span class="result-cat">${m.cat}</span></a>`
    ).join('');
    searchResults.classList.add('open');
    activeIdx = -1;
  }

  function setActive(idx) {
    const items = searchResults.querySelectorAll('.search-result-item');
    items.forEach(el => el.classList.remove('active'));
    if (idx >= 0 && idx < items.length) {
      items[idx].classList.add('active');
      items[idx].scrollIntoView({ block: 'nearest' });
    }
    activeIdx = idx;
  }

  if (globalSearch) {
    globalSearch.addEventListener('input', () => {
      const term = globalSearch.value.toLowerCase().trim();
      if (!term) { renderResults([]); return; }
      const matches = capIndex.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.id.includes(term) ||
        (c.aliases || []).some(a => a.toLowerCase().includes(term))
      );
      renderResults(matches);
    });

    globalSearch.addEventListener('keydown', (e) => {
      const items = searchResults.querySelectorAll('.search-result-item');
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(Math.min(activeIdx + 1, items.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(Math.max(activeIdx - 1, 0));
      } else if (e.key === 'Enter' && activeIdx >= 0) {
        e.preventDefault();
        items[activeIdx].click();
      } else if (e.key === 'Escape') {
        renderResults([]);
        globalSearch.blur();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!globalSearch.contains(e.target) && !searchResults.contains(e.target)) {
        renderResults([]);
      }
    });
  }

  // ===== Categories page: inline filter =====
  const categoryFilter = document.getElementById('category-filter');
  const filterCount = document.getElementById('filter-count');
  if (categoryFilter) {
    categoryFilter.addEventListener('input', () => {
      const term = categoryFilter.value.toLowerCase().trim();
      const rows = document.querySelectorAll('.cap-row');
      let visible = 0;
      rows.forEach(row => {
        const name = row.dataset.name || '';
        const id = row.dataset.id || '';
        const aliases = row.dataset.aliases || '';
        const match = !term || name.includes(term) || id.includes(term) || aliases.includes(term);
        row.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      document.querySelectorAll('details.category-section').forEach(details => {
        const body = details.querySelector('.category-body');
        if (!body) return;
        const hasVisible = Array.from(body.querySelectorAll('.cap-row'))
          .some(r => r.style.display !== 'none');
        if (term) {
          details.open = hasVisible;
          details.style.display = hasVisible ? '' : 'none';
        } else {
          details.open = true;
          details.style.display = '';
        }
      });
      if (filterCount) {
        filterCount.textContent = term ? `${visible} matching` : '';
      }
    });
  }

  // ===== Expand/collapse all =====
  const expandBtn = document.getElementById('expand-all');
  const collapseBtn = document.getElementById('collapse-all');
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      document.querySelectorAll('details.category-section').forEach(d => { d.open = true; d.style.display = ''; });
    });
  }
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      document.querySelectorAll('details.category-section').forEach(d => { d.open = false; });
    });
  }

  // ===== Hash scrolling =====
  const scrollToHash = () => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const target = document.getElementById(hash);
    if (target) {
      if (target.tagName === 'DETAILS') target.open = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  scrollToHash();
  window.addEventListener('hashchange', scrollToHash);
});
