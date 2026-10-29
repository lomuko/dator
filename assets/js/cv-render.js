/* Generador del CV: lo usan el editor (/cv-builder/) y la vista (/cv/).
   Recibe un objeto con los datos y dibuja el CV con DOM seguro (solo textContent). */
(function (root) {
  var L = {
    es: { summary: 'Perfil', experience: 'Experiencia', skills: 'Competencias técnicas', projects: 'Proyectos', education: 'Formación', certifications: 'Certificaciones', languages: 'Idiomas', present: 'Actualidad', stack: 'Tecnologías' },
    en: { summary: 'Profile', experience: 'Experience', skills: 'Technical skills', projects: 'Projects', education: 'Education', certifications: 'Certifications', languages: 'Languages', present: 'Present', stack: 'Technologies' }
  };

  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null && text !== '') e.textContent = text;
    return e;
  }
  function clean(s) { return (s == null ? '' : String(s)).trim(); }
  function list(a) { return (a || []).map(clean).filter(Boolean); }
  function bare(u) { return clean(u).replace(/^https?:\/\//i, '').replace(/\/$/, ''); }
  function href(u, kind) {
    u = clean(u);
    if (!u) return '';
    if (kind === 'email') return 'mailto:' + u;
    if (kind === 'phone') return 'tel:' + u.replace(/[^\d+]/g, '');
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    return /^https?:\/\/[^\s]+$/i.test(u) ? u : '';
  }
  function link(text, url, cls) {
    if (!url) return h('span', cls, text);
    var a = h('a', cls, text);
    a.href = url;
    return a;
  }

  function section(parent, title) {
    var s = h('section', 'cv-sec');
    s.appendChild(h('h2', null, title));
    parent.appendChild(s);
    return s;
  }

  function render(d, lang, target) {
    lang = lang === 'en' ? 'en' : 'es';
    var t = L[lang];
    d = d || {};
    target.textContent = '';
    var cv = h('article', 'cv');
    cv.setAttribute('lang', lang);

    var head = h('header', 'cv-head');
    head.appendChild(h('h1', null, clean(d.name) || '—'));
    if (clean(d.title)) head.appendChild(h('p', 'cv-title', clean(d.title)));
    var c = d.contact || {}, ul = h('ul', 'cv-contact');
    [['email', c.email, 'email'], ['phone', c.phone, 'phone'], ['location', c.location, ''],
     ['web', c.web, 'url'], ['linkedin', c.linkedin, 'url'], ['github', c.github, 'url']].forEach(function (x) {
      var v = clean(x[1]);
      if (!v) return;
      var li = h('li');
      li.appendChild(x[2] ? link(x[2] === 'url' ? bare(v) : v, href(v, x[2])) : h('span', null, v));
      ul.appendChild(li);
    });
    if (ul.childNodes.length) head.appendChild(ul);
    cv.appendChild(head);

    var body = h('div', 'cv-body');
    if (clean(d.summary)) section(body, t.summary).appendChild(h('p', 'cv-summary', clean(d.summary)));

    var exp = (d.experience || []).filter(function (e) { return clean(e.role) || clean(e.company); });
    if (exp.length) {
      var s = section(body, t.experience);
      exp.forEach(function (e) {
        var it = h('div', 'cv-item'), row = h('div', 'cv-row'), who = h('div', 'cv-who');
        who.appendChild(h('strong', 'cv-role', clean(e.role)));
        if (clean(e.company)) who.appendChild(h('span', 'cv-company', clean(e.company)));
        row.appendChild(who);
        var from = clean(e.start), to = clean(e.end) || (from ? t.present : '');
        if (from || to) row.appendChild(h('span', 'cv-date', from && to ? from + ' – ' + to : from || to));
        it.appendChild(row);
        var bl = list(e.bullets);
        if (bl.length) { var b = h('ul', 'cv-bullets'); bl.forEach(function (x) { b.appendChild(h('li', null, x)); }); it.appendChild(b); }
        if (clean(e.stack)) { var st = h('p', 'cv-stack'); st.appendChild(h('strong', null, t.stack + ': ')); st.appendChild(document.createTextNode(clean(e.stack))); it.appendChild(st); }
        s.appendChild(it);
      });
    }

    var sk = (d.skills || []).filter(function (g) { return clean(g.name) || list(g.items).length; });
    if (sk.length) {
      var s2 = section(body, t.skills), grid = h('div', 'cv-skills');
      sk.forEach(function (g) {
        var box = h('div', 'cv-skill-group');
        if (clean(g.name)) box.appendChild(h('strong', null, clean(g.name)));
        var tags = h('div', 'cv-tags');
        list(g.items).forEach(function (x) { tags.appendChild(h('span', 'cv-tag', x)); });
        box.appendChild(tags);
        grid.appendChild(box);
      });
      s2.appendChild(grid);
    }

    var pr = (d.projects || []).filter(function (p) { return clean(p.name); });
    if (pr.length) {
      var s3 = section(body, t.projects);
      pr.forEach(function (p) {
        var it = h('div', 'cv-item'), row = h('div', 'cv-row');
        row.appendChild(h('strong', 'cv-role', clean(p.name)));
        if (clean(p.url)) row.appendChild(link(bare(p.url), href(p.url), 'cv-date'));
        it.appendChild(row);
        if (clean(p.text)) it.appendChild(h('p', 'cv-text', clean(p.text)));
        s3.appendChild(it);
      });
    }

    var ed = (d.education || []).filter(function (e) { return clean(e.title); });
    if (ed.length) {
      var s4 = section(body, t.education);
      ed.forEach(function (e) {
        var it = h('div', 'cv-item'), row = h('div', 'cv-row'), who = h('div', 'cv-who');
        who.appendChild(h('strong', 'cv-role', clean(e.title)));
        if (clean(e.school)) who.appendChild(h('span', 'cv-company', clean(e.school)));
        row.appendChild(who);
        if (clean(e.period)) row.appendChild(h('span', 'cv-date', clean(e.period)));
        it.appendChild(row);
        s4.appendChild(it);
      });
    }

    var ce = list(d.certifications);
    if (ce.length) {
      var s5 = section(body, t.certifications), u = h('ul', 'cv-bullets');
      ce.forEach(function (x) { u.appendChild(h('li', null, x)); });
      s5.appendChild(u);
    }

    var lg = (d.languages || []).filter(function (x) { return clean(x.name); });
    if (lg.length) {
      var s6 = section(body, t.languages), p = h('p', 'cv-langs');
      lg.forEach(function (x, i) {
        if (i) p.appendChild(document.createTextNode('  ·  '));
        p.appendChild(h('strong', null, clean(x.name)));
        if (clean(x.level)) p.appendChild(document.createTextNode(' — ' + clean(x.level)));
      });
      s6.appendChild(p);
    }

    cv.appendChild(body);
    target.appendChild(cv);
  }

  function blank(lang) {
    return { schema: 1, lang: lang === 'en' ? 'en' : 'es', name: '', title: '', contact: { email: '', phone: '', location: '', web: '', linkedin: '', github: '' },
      summary: '', experience: [], skills: [], projects: [], education: [], certifications: [], languages: [] };
  }

  /* Normaliza lo que viene de un archivo o del navegador: tipos correctos y arrays limpios. */
  function normalize(d, lang) {
    var b = blank(lang);
    if (!d || typeof d !== 'object') return b;
    var s = function (x) { return typeof x === 'string' ? x : ''; };
    var arr = function (x) { return Array.isArray(x) ? x : []; };
    b.name = s(d.name); b.title = s(d.title); b.summary = s(d.summary);
    Object.keys(b.contact).forEach(function (k) { b.contact[k] = s((d.contact || {})[k]); });
    b.experience = arr(d.experience).map(function (e) { e = e || {}; return { role: s(e.role), company: s(e.company), start: s(e.start), end: s(e.end), bullets: arr(e.bullets).map(s), stack: s(e.stack) }; });
    b.skills = arr(d.skills).map(function (g) { g = g || {}; return { name: s(g.name), items: arr(g.items).map(s) }; });
    b.projects = arr(d.projects).map(function (p) { p = p || {}; return { name: s(p.name), url: s(p.url), text: s(p.text) }; });
    b.education = arr(d.education).map(function (e) { e = e || {}; return { title: s(e.title), school: s(e.school), period: s(e.period) }; });
    b.certifications = arr(d.certifications).map(s);
    b.languages = arr(d.languages).map(function (x) { x = x || {}; return { name: s(x.name), level: s(x.level) }; });
    return b;
  }

  /* Versión para guardar: sin cadenas vacías ni espacios sobrantes. */
  function tidy(d) {
    var t = function (x) { return clean(x); }, l = list;
    var o = JSON.parse(JSON.stringify(d));
    o.name = t(o.name); o.title = t(o.title); o.summary = t(o.summary);
    Object.keys(o.contact).forEach(function (k) { o.contact[k] = t(o.contact[k]); });
    o.experience.forEach(function (e) { e.role = t(e.role); e.company = t(e.company); e.start = t(e.start); e.end = t(e.end); e.stack = t(e.stack); e.bullets = l(e.bullets); });
    o.skills.forEach(function (g) { g.name = t(g.name); g.items = l(g.items); });
    o.projects.forEach(function (p) { p.name = t(p.name); p.url = t(p.url); p.text = t(p.text); });
    o.education.forEach(function (e) { e.title = t(e.title); e.school = t(e.school); e.period = t(e.period); });
    o.certifications = l(o.certifications);
    o.languages.forEach(function (x) { x.name = t(x.name); x.level = t(x.level); });
    return o;
  }

  root.CV = { render: render, blank: blank, normalize: normalize, tidy: tidy, labels: L };
})(window);
