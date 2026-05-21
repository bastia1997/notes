// In-page Table of Contents: builds a floating right-side TOC from h2 / h3 headings.
(function () {
  const main = document.querySelector('.main .content');
  if (!main) return;
  const headings = main.querySelectorAll('h2, h3');
  if (headings.length < 3) return;

  const slugged = new Set();
  function slugify(s) {
    return s.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  headings.forEach(h => {
    if (!h.id) {
      let s = slugify(h.textContent || '');
      let base = s, i = 1;
      while (slugged.has(s) || document.getElementById(s)) {
        s = base + '-' + (++i);
      }
      h.id = s;
    }
    slugged.add(h.id);
  });

  const toc = document.createElement('aside');
  toc.className = 'page-toc';
  toc.innerHTML = '<div class="toc-title">In questa pagina</div><nav class="toc-list"></nav>';
  const list = toc.querySelector('.toc-list');

  headings.forEach(h => {
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    a.className = 'toc-link toc-' + h.tagName.toLowerCase();
    a.dataset.target = h.id;
    list.appendChild(a);
  });

  document.querySelector('.main').appendChild(toc);

  const links = list.querySelectorAll('.toc-link');
  function update() {
    let activeId = null;
    const offset = 80;
    for (const h of headings) {
      const r = h.getBoundingClientRect();
      if (r.top - offset <= 0) activeId = h.id;
      else break;
    }
    links.forEach(l => {
      if (l.dataset.target === activeId) l.classList.add('active');
      else l.classList.remove('active');
    });
  }
  document.addEventListener('scroll', update, { passive: true });
  update();
})();
