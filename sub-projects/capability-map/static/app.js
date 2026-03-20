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

  // ===== Section hover preview =====
  const popover = document.getElementById('section-popover');
  if (popover) {
    let hoverTimer = null;
    let currentHref = null;
    const cache = {};

    function showPopover(anchor) {
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/section/')) return;
      const apiUrl = '/api' + href;

      // Position near the link
      const rect = anchor.getBoundingClientRect();
      const popW = 520;
      const popMaxH = 360;
      let left = rect.right + 8;
      let top = rect.top;

      // If it would overflow the right edge, show to the left
      if (left + popW > window.innerWidth - 16) {
        left = rect.left - popW - 8;
      }
      // If it would overflow the bottom, shift up
      if (top + popMaxH > window.innerHeight - 16) {
        top = Math.max(16, window.innerHeight - popMaxH - 16);
      }
      if (left < 16) left = 16;

      popover.style.left = left + 'px';
      popover.style.top = top + 'px';

      if (cache[apiUrl]) {
        popover.innerHTML = cache[apiUrl];
        popover.classList.add('visible');
        return;
      }

      popover.innerHTML = '<span class="popover-loading">Loading preview…</span>';
      popover.classList.add('visible');

      fetch(apiUrl)
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (!data) {
            hidePopover();
            return;
          }
          cache[apiUrl] = data.html;
          // Only update if still showing for the same link
          if (currentHref === href) {
            popover.innerHTML = data.html;
          }
        })
        .catch(() => hidePopover());
    }

    function hidePopover() {
      popover.classList.remove('visible');
      popover.innerHTML = '';
      currentHref = null;
    }

    // Event delegation on document for all /section/ links
    document.addEventListener('mouseenter', (e) => {
      const anchor = e.target.closest('a[href^="/section/"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      clearTimeout(hoverTimer);
      currentHref = href;
      hoverTimer = setTimeout(() => showPopover(anchor), 2000);
    }, true);

    document.addEventListener('mouseleave', (e) => {
      const anchor = e.target.closest('a[href^="/section/"]');
      if (!anchor) return;
      clearTimeout(hoverTimer);
      // Delay hide so user can move into the popover
      setTimeout(() => {
        if (!popover.matches(':hover')) {
          hidePopover();
        }
      }, 200);
    }, true);

    popover.addEventListener('mouseleave', () => {
      hidePopover();
    });
  }
});
