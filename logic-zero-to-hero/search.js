// Client-side search: fetches search-index.json, ranks by term frequency.
(function () {
  const input = document.getElementById('search-input');
  const hits = document.getElementById('search-hits');
  if (!input || !hits) return;

  let index = null;
  const indexUrl = (location.pathname.includes('/pages/')) ? '../search-index.json' : 'search-index.json';
  const urlPrefix = (location.pathname.includes('/pages/')) ? '../' : '';

  async function loadIndex() {
    if (index) return index;
    if (Array.isArray(window.__searchIndex)) {
      index = window.__searchIndex;
      return index;
    }
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
    return results.slice(0, 15);
  }

  function render(results, query) {
    if (!results.length) {
      const isEn = document.documentElement.lang === 'en';
      const empty = isEn ? 'no results for "' : 'nessun risultato per "';
      hits.innerHTML = '<div class="empty">' + empty + escapeHtml(query) + '"</div>';
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
  let activeIdx = -1;

  function getLinks() {
    return Array.from(hits.querySelectorAll('a'));
  }

  function setActive(idx) {
    const links = getLinks();
    links.forEach((a, i) => a.classList.toggle('active', i === idx));
    activeIdx = idx;
  }

  input.addEventListener('input', async (e) => {
    const q = e.target.value.trim();
    clearTimeout(debounce);
    activeIdx = -1;
    if (q.length < 2) {
      hits.classList.remove('open');
      hits.innerHTML = '';
      return;
    }
    debounce = setTimeout(async () => {
      await loadIndex();
      render(rank(q), q);
      activeIdx = -1;
    }, 120);
  });

  input.addEventListener('focus', async () => {
    if (input.value.trim().length >= 2) {
      await loadIndex();
      render(rank(input.value.trim()), input.value.trim());
    }
  });

  input.addEventListener('keydown', (e) => {
    const links = getLinks();
    if (!hits.classList.contains('open') || !links.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIdx + 1, links.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIdx - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = activeIdx >= 0 ? links[activeIdx] : links[0];
      if (target) { target.click(); }
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
