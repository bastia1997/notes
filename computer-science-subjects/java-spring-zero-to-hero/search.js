// Client-side search: ranks by term frequency.
// Uses window.__searchIndex (embedded via search-data.js) so it works offline / under file://.
// Falls back to fetch('search-index.json') if the inline array is not present.
(function () {
  'use strict';
  const TAG = '[search]';
  const log = (...a) => { try { console.log(TAG, ...a); } catch (e) {} };

  function init() {
    const input = document.getElementById('search-input');
    const hits  = document.getElementById('search-hits');
    const clear = document.getElementById('search-clear');
    const btn   = document.getElementById('search-btn');
    if (!input || !hits) { log('aborted: missing input/hits'); return; }
    log('init ok');

    let index = null;
    const inPages   = location.pathname.includes('/pages/');
    const indexUrl  = inPages ? '../search-index.json' : 'search-index.json';
    const urlPrefix = inPages ? '../' : '';

    async function loadIndex() {
      if (index) return index;
      if (Array.isArray(window.__searchIndex)) {
        index = window.__searchIndex;
        log('indice inline,', index.length, 'voci');
        return index;
      }
      try {
        const res = await fetch(indexUrl);
        index = await res.json();
        log('fetch OK,', index.length, 'voci');
      } catch (e) {
        log('fetch FAIL:', e && e.message);
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
      const lower = (text || '').toLowerCase();
      let bestPos = -1;
      for (const t of terms) {
        const p = lower.indexOf(t);
        if (p >= 0 && (bestPos < 0 || p < bestPos)) bestPos = p;
      }
      if (bestPos < 0) bestPos = 0;
      const start = Math.max(0, bestPos - 60);
      const end = Math.min((text || '').length, bestPos + 180);
      let frag = (start > 0 ? '…' : '') + (text || '').slice(start, end) + (end < (text || '').length ? '…' : '');
      frag = escapeHtml(frag);
      for (const t of terms) {
        const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        frag = frag.replace(re, '<mark>$1</mark>');
      }
      return frag;
    }

    function rank(query) {
      const terms = tokenize(query);
      if (!terms.length || !index) return [];
      const results = [];
      for (const p of index) {
        const hay = ((p.title || '') + ' ' + (p.area || '') + ' ' + (p.summary || '') + ' ' + (p.text || '')).toLowerCase();
        const hayND = hay.normalize('NFD').replace(/[̀-ͯ]/g, '');
        let score = 0, matched = 0;
        for (const t of terms) {
          const occ = (hayND.match(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
          if (occ > 0) {
            matched++;
            score += occ;
            if ((p.title || '').toLowerCase().includes(t)) score += 50;
            if ((p.area  || '').toLowerCase().includes(t)) score += 20;
            if ((p.summary || '').toLowerCase().includes(t)) score += 10;
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
        const empty = document.documentElement.lang === 'en'
          ? 'no results for "' : 'nessun risultato per "';
        hits.innerHTML = '<div class="empty">' + empty + escapeHtml(query) + '"</div>';
        hits.classList.add('open');
        return;
      }
      hits.innerHTML = results.map(r => {
        const url = urlPrefix + r.p.url;
        return '<a href="' + url + '">' +
          '<div class="hit-title">' + escapeHtml(r.p.title) +
            ' <span style="color:#888;font-weight:400;font-size:11px">· ' + escapeHtml(r.p.area) + '</span>' +
          '</div>' +
          '<div class="hit-snippet">' + snippet(r.p.text, r.terms) + '</div>' +
        '</a>';
      }).join('');
      hits.classList.add('open');
      log('render:', results.length, 'risultati per', query);
    }

    function updateClearVisibility() {
      if (!clear) return;
      if (input.value.length > 0) clear.classList.add('visible');
      else clear.classList.remove('visible');
    }

    async function runSearch(reason) {
      const q = input.value.trim();
      log('runSearch (', reason, ') q=', JSON.stringify(q));
      if (q.length < 2) {
        hits.classList.remove('open');
        hits.innerHTML = '';
        return;
      }
      await loadIndex();
      render(rank(q), q);
    }

    let debounce = null;
    function debouncedSearch() {
      clearTimeout(debounce);
      updateClearVisibility();
      debounce = setTimeout(() => runSearch('debounce'), 120);
    }

    input.addEventListener('input', debouncedSearch);
    input.addEventListener('keyup', debouncedSearch);
    input.addEventListener('change', debouncedSearch);
    input.addEventListener('paste', () => setTimeout(debouncedSearch, 50));
    input.addEventListener('focus', () => { if (input.value.trim().length >= 2) runSearch('focus'); });

    if (btn) {
      btn.addEventListener('click', (e) => { e.preventDefault(); runSearch('button'); input.focus(); });
    }
    if (clear) {
      clear.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = '';
        updateClearVisibility();
        hits.classList.remove('open');
        hits.innerHTML = '';
        input.focus();
      });
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const first = hits.querySelector('a');
        if (first) { first.click(); return; }
        runSearch('enter');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const links = hits.querySelectorAll('a');
        if (links.length) links[0].focus();
      } else if (e.key === 'Escape') {
        hits.classList.remove('open');
        input.blur();
      }
    });

    hits.addEventListener('keydown', (e) => {
      const links = Array.from(hits.querySelectorAll('a'));
      const idx = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); if (idx < links.length - 1) links[idx + 1].focus(); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); if (idx > 0) links[idx - 1].focus(); else input.focus(); }
      else if (e.key === 'Escape')    { hits.classList.remove('open'); input.focus(); }
    });

    document.addEventListener('click', (e) => {
      if (!hits.contains(e.target) && e.target !== input && e.target !== btn && e.target !== clear) {
        hits.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input) {
        const tag = (document.activeElement && document.activeElement.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        input.focus();
      }
    });

    loadIndex();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
