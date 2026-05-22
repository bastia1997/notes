// Client-side search: uses window.SEARCH_INDEX (set by search-index.js) or falls back to fetch.
// Works on both file:// and http:// protocols.
(function () {
  const input = document.getElementById('search-input');
  const hits = document.getElementById('search-hits');
  if (!input || !hits) return;

  // i18n: detect language from URL path
  const isEN = location.pathname.replace(/\\/g, '/').includes('/en/');
  const noResultsLabel = isEN ? 'No results for' : 'Nessun risultato per';

  let index = null;
  const indexUrl = (location.pathname.includes('/pages/')) ? '../search-index.json' : 'search-index.json';
  const urlPrefix = (location.pathname.includes('/pages/')) ? '../' : '';

  async function loadIndex() {
    if (index) return index;
    // Prefer the pre-loaded global (set by <script src="search-index.js">): works on file://
    if (window.SEARCH_INDEX) {
      index = window.SEARCH_INDEX;
      return index;
    }
    // Fallback: fetch (works on http://)
    try {
      const res = await fetch(indexUrl);
      index = await res.json();
    } catch (e) {
      index = [];
    }
    return index;
  }

  function tokenize(s) {
    return (s || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .split(/[^a-z0-9_]+/)
      .filter(t => t.length >= 2);
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function snippet(text, terms) {
    const lower = text.toLowerCase();
    let bestPos = -1;
    for (const t of terms) {
      const p = lower.indexOf(t);
      if (p >= 0 && (bestPos < 0 || p < bestPos)) bestPos = p;
    }
    if (bestPos < 0) bestPos = 0;
    const start = Math.max(0, bestPos - 60);
    const end = Math.min(text.length, bestPos + 180);
    let frag = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
    frag = escapeHtml(frag);
    for (const t of terms) {
      const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      frag = frag.replace(re, '<mark>$1</mark>');
    }
    return frag;
  }

  function rank(query) {
    const terms = tokenize(query);
    if (!terms.length) return [];
    const results = [];
    for (const p of index) {
      const hay = (p.title + ' ' + p.area + ' ' + p.summary + ' ' + p.text).toLowerCase();
      const hayND = hay.normalize('NFD').replace(/[̀-ͯ]/g, '');
      let score = 0;
      let matched = 0;
      for (const t of terms) {
        const occ = (hayND.match(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        if (occ > 0) {
          matched++;
          score += occ;
          if (p.title.toLowerCase().includes(t)) score += 50;
          if (p.area.toLowerCase().includes(t)) score += 20;
          if (p.summary.toLowerCase().includes(t)) score += 10;
        }
      }
      if (matched > 0) {
        if (terms.length <= 2 && matched < terms.length) continue;
        results.push({ p, score, terms });
      }
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 12);
  }

  function render(results, query) {
    if (!results.length) {
      hits.innerHTML = '<div class="empty">' + noResultsLabel + ' "' + escapeHtml(query) + '"</div>';
      hits.classList.add('open');
      return;
    }
    hits.innerHTML = results.map(r => {
      const url = urlPrefix + r.p.url;
      return `<a href="${url}">
        <div class="hit-title">${escapeHtml(r.p.title)} <span style="color:#888;font-weight:400;font-size:11px">· ${escapeHtml(r.p.area)}</span></div>
        <div class="hit-snippet">${snippet(r.p.text, r.terms)}</div>
      </a>`;
    }).join('');
    hits.classList.add('open');
  }

  let debounce = null;
  input.addEventListener('input', async (e) => {
    const q = e.target.value.trim();
    clearTimeout(debounce);
    if (q.length < 2) {
      hits.classList.remove('open');
      hits.innerHTML = '';
      return;
    }
    debounce = setTimeout(async () => {
      await loadIndex();
      render(rank(q), q);
    }, 120);
  });

  input.addEventListener('focus', async () => {
    if (input.value.trim().length >= 2) {
      await loadIndex();
      render(rank(input.value.trim()), input.value.trim());
    }
  });

  document.addEventListener('click', (e) => {
    if (!hits.contains(e.target) && e.target !== input) {
      hits.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
    if (e.key === 'Escape') {
      hits.classList.remove('open');
      input.blur();
    }
  });
})();
