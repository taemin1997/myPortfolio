/* content.js의 내용을 화면으로 그림. 내용 수정은 content.js에서 */
(function () {
  const D = window.PORTFOLIO;
  const $ = (s) => document.querySelector(s);

  // "TODO" 또는 "TODO: 설명" → 노란 표시
  const fmt = (s) =>
    String(s ?? "").replace(/TODO(?::\s*([^·<]*))?/g, (_, note) =>
      `<span class="todo">(직접 채우기${note && note.trim() ? ": " + note.trim() : ""})</span>`);
  const who = (w) => (w === "me" ? `<span class="who me">내 작업</span>` : w === "team" ? `<span class="who team">팀</span>` : "");
  const ext = (url) => /^https?:/.test(url) ? ` target="_blank" rel="noopener"` : "";

  /* ---------- figures ---------- */
  const COLORS = { accent: "var(--accent)", warn: "var(--warn)", soft: "var(--soft)", ink: "var(--ink-2)" };

  function dumbbell(f) {
    const x0 = 150, x1 = 610, top = 58, step = 46;
    const X = (v) => x0 + ((v - f.min) / (f.max - f.min)) * (x1 - x0);
    const H = top + f.rows.length * step + 16;
    let s = `<svg class="chart" viewBox="0 0 640 ${H}" role="img" aria-label="${f.rows.map(r => `${r.label} ${r.from}에서 ${r.to}, 목표 ${r.target}`).join(", ")}">`;
    s += `<circle cx="${x0}" cy="14" r="5" fill="var(--soft)"/><text x="${x0 + 10}" y="18">${f.fromLabel}</text>`;
    s += `<circle cx="${x0 + 56}" cy="14" r="5" fill="var(--accent)"/><text x="${x0 + 66}" y="18">${f.toLabel}</text>`;
    s += `<line x1="${x0 + 112}" y1="7" x2="${x0 + 112}" y2="21" stroke="var(--warn)" stroke-width="2" stroke-dasharray="3 2"/><text x="${x0 + 120}" y="18">${f.targetLabel}</text>`;
    f.ticks.forEach(t => {
      s += `<line class="grid" x1="${X(t)}" y1="32" x2="${X(t)}" y2="${H - 26}"/><text x="${X(t)}" y="${H - 8}" text-anchor="middle">${t.toFixed(2)}</text>`;
    });
    f.rows.forEach((r, i) => {
      const y = top + i * step;
      s += `<text class="strong" x="0" y="${y + 4}">${r.label}</text>`;
      s += `<line x1="${X(r.from)}" y1="${y}" x2="${X(r.to)}" y2="${y}" stroke="var(--soft)" stroke-width="2"/>`;
      s += `<line x1="${X(r.target)}" y1="${y - 14}" x2="${X(r.target)}" y2="${y + 14}" stroke="var(--warn)" stroke-width="2" stroke-dasharray="3 2"/>`;
      s += `<circle class="mark" cx="${X(r.from)}" cy="${y}" r="6" fill="var(--soft)"><title>${f.fromLabel} ${r.from}</title></circle>`;
      s += `<circle class="mark" cx="${X(r.to)}" cy="${y}" r="7" fill="var(--accent)"><title>${f.toLabel} ${r.to} (목표 ${r.target})</title></circle>`;
      s += `<text x="${X(r.from)}" y="${y - 14}" text-anchor="middle">${r.from.toFixed(3)}</text>`;
      s += `<text class="strong" x="${X(r.to)}" y="${y - 14}" text-anchor="middle">${r.to.toFixed(3)}</text>`;
    });
    return s + `</svg>`;
  }

  function bars(f) {
    const x0 = 130, x1 = 590, bh = 12, gap = 3, ggap = 22, top = 38;
    const X = (v) => (v / f.max) * (x1 - x0);
    const gh = f.series.length * (bh + gap);
    const H = top + f.groups.length * (gh + ggap) + 10;
    let s = `<svg class="chart" viewBox="0 0 640 ${H}" role="img" aria-label="${f.groups.map(g => g.label + ": " + f.series.map(se => se.label + " " + g[se.key]).join(", ")).join(". ")}">`;
    let lx = x0;
    f.series.forEach(se => {
      s += `<rect x="${lx}" y="6" width="12" height="12" rx="2" fill="${COLORS[se.color]}"/><text x="${lx + 17}" y="16">${se.label}</text>`;
      lx += 30 + se.label.length * 11.5;
    });
    f.ticks.forEach(t => {
      s += `<line class="grid" x1="${x0 + X(t)}" y1="${top - 6}" x2="${x0 + X(t)}" y2="${H - 26}"/><text x="${x0 + X(t)}" y="${H - 8}" text-anchor="middle">${t}${t === f.max ? f.unit : ""}</text>`;
    });
    f.groups.forEach((g, gi) => {
      const gy = top + gi * (gh + ggap);
      s += `<text class="strong" x="0" y="${gy + gh / 2 - 2}">${g.label}</text><text x="0" y="${gy + gh / 2 + 14}">${g.sub}</text>`;
      f.series.forEach((se, si) => {
        const y = gy + si * (bh + gap), w = X(g[se.key]);
        s += `<rect class="mark" x="${x0}" y="${y}" width="${w}" height="${bh}" rx="2" fill="${COLORS[se.color]}"><title>${g.label} ${se.label} ${g[se.key]}/${f.max}</title></rect>`;
        s += `<text ${se.strong ? 'class="strong"' : ""} x="${x0 + w + 5}" y="${y + 10}">${g[se.key]}</text>`;
      });
    });
    return s + `</svg>`;
  }

  function flow(f) {
    const nodes = f.nodes.map(n => `<div class="node${n.mine ? " mine" : ""}${n.rule ? " rule" : ""}"><b>${n.title}</b>${n.body}</div>`).join(`<div class="arrow">→</div>`);
    const legend = f.legend.map(([k, label]) => `<span><i class="lg-${k}"></i>${label}</span>`).join("");
    return `<div class="flow">${nodes}</div><div class="flow-legend">${legend}</div>`;
  }

  const figure = (id, withCaption = true) => {
    const f = D.figures[id];
    if (!f) return "";
    const body = f.type === "dumbbell" ? dumbbell(f) : f.type === "bars" ? bars(f) : flow(f);
    return `<figure>${body}${withCaption ? `<figcaption>${f.caption}</figcaption>` : ""}</figure>`;
  };

  /* ---------- hero bento ---------- */
  const P = D.profile;
  const hero = `
    <div class="tile hero wide span-4">
      <div class="hero-left">
        <div class="hero-top"><span class="pill">${P.org}</span></div>
        <h1>${P.name}</h1>
        <p class="hero-role">${P.role}</p>
      </div>
      <div class="hero-right">
      <p class="hero-lead">${P.lead}</p>
      <p class="hero-intro">${fmt(P.intro)}</p>
      <div class="hero-actions">
        <a class="btn light" href="${P.pdf}">PDF 버전 보기</a>
        <a class="btn ghost" href="https://github.com/${P.github}"${ext("https://")}>GitHub</a>
      </div>
      <div class="hero-contact"><span>이메일 ${fmt(P.email)}</span><span>전화 ${fmt(P.phone)}</span></div>
      </div>
    </div>`;

  const hl = D.highlights.map(h => {
    const proj = D.projects.find(p => p.id === h.project) || {};
    return `<a class="tile story span-2 c-${proj.color || "blue"}" href="#${h.project}">
      <div class="story-text">
        <div class="story-label">${h.label}</div>
        <div class="story-head">${h.headline}</div>
        <ul class="story-points">${h.points.map(pt => `<li>${who(pt.who)}${pt.text}</li>`).join("")}</ul>
        <span class="story-more">자세히 보기 →</span>
      </div>
      <div class="story-fig">${figure(h.figure, false)}</div>
    </a>`;
  }).join("");

  const index = D.projects.map((p, i) => `
    <a class="tile index-tile c-${p.color}${p.status ? " live" : ""}" href="#${p.id}">
      <div class="idx-no">${String(i + 1).padStart(2, "0")}</div>
      <div class="idx-title">${p.title}</div>
      <div class="idx-tag">${fmt(p.tagline)}</div>
      <div class="idx-kind">${p.status ? `<span class="status">${p.status}</span>` : p.kind}</div>
    </a>`).join("");

  $("#top-bento").innerHTML = hero + hl;
  $("#index").innerHTML = index;

  /* ---------- projects ---------- */
  const list = (arr) => `<ul>${arr.map(x => `<li>${fmt(x)}</li>`).join("")}</ul>`;

  const projects = D.projects.map((p, i) => {
    const no = String(i + 1).padStart(2, "0");
    let h = `<section class="proj c-${p.color}" id="${p.id}"><div class="bento">`;

    h += `<div class="tile head span-4">
      <div class="head-top"><span class="p-no">${no}</span><span class="p-kind">${p.kind}</span>${p.status ? `<span class="status">${p.status}</span>` : ""}</div>
      <h2>${p.title}</h2>
      <p class="tagline">${fmt(p.tagline)}</p>
      <p class="desc">${fmt(p.desc)}</p>
      <dl class="meta">${p.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${fmt(v)}</dd></div>`).join("")}</dl>
    </div>`;

    if (p.pending) {
      h += `<div class="tile span-2 pending"><h3>정리 예정</h3><dl class="kv">${p.pending.map(k => `<div><dt>${k}</dt><dd>${fmt("TODO")}</dd></div>`).join("")}</dl></div>`;
      h += `<div class="tile span-2 links-tile"><h3>자료</h3><div class="links">${p.links.map(l => `<a href="${l.url}"${ext(l.url)}>${l.label} ↗</a>`).join("")}</div></div>`;
      return h + `</div></section>`;
    }

    if (p.figureTop) h +=`<div class="tile span-4 fig-tile">${figure(p.figureTop)}</div>`;

    if (p.goal) h += `<div class="tile span-2"><h3>목표와 제약</h3>${list(p.goal)}</div>`;

    if (p.decisions && p.decisions.length) {
      h += `<div class="tile ${p.goal ? "span-2" : "span-4 dec-wide"}"><h3>핵심 결정</h3>${p.decisions.map(d => `
        <div class="dec"><h4>${fmt(d.title)}${d.tag ? ` <span class="who ${d.who === "me" ? "me" : "team"}">${d.who === "me" ? "내 작업 · " : ""}${d.tag}</span>` : ""}</h4>
        <p>${fmt(d.body)}</p>${d.note ? `<p class="note">${d.note}</p>` : ""}</div>`).join("")}</div>`;
    }

    if (p.metrics && p.metrics.length) {
      h += `<div class="tile span-4 results"><h3>결과</h3><div class="metrics">${p.metrics.map(m => `
        <div class="metric">${who(m.who)}<div class="v">${m.v}</div><div class="k">${m.k}</div><div class="c">${m.c}</div></div>`).join("")}</div></div>`;
    }
    if (p.figure) h += `<div class="tile span-2 fig-tile">${figure(p.figure)}</div>`;
    if (p.resultNotes && p.resultNotes.length) {
      h += `<div class="tile ${p.figure ? "span-2" : "span-4"}">${p.metrics && p.metrics.length ? `<h3 class="sub">결과 더 보기</h3>` : `<h3>결과</h3>`}${list(p.resultNotes)}</div>`;
    }

    (p.troubles || []).forEach(t => {
      h += `<div class="tile span-2 trouble"><h3 class="sub">트러블슈팅</h3><h4>${who(t.who)}${t.title}</h4>
        <dl class="chain"><dt>현상</dt><dd>${fmt(t.phen)}</dd><dt>원인</dt><dd>${fmt(t.cause)}</dd><dt>조치</dt><dd>${fmt(t.fix)}</dd></dl></div>`;
    });

    if (p.limits && p.limits.length) h += `<div class="tile span-2 limits"><h3>한계와 다음에 바꿀 점</h3>${list(p.limits)}</div>`;

    // 반 칸짜리 타일 수가 홀수면 자료 타일을 반 칸으로 둬서 빈자리를 채움, 짝수면 한 줄 전체
    const halves = (p.troubles || []).length + (p.limits && p.limits.length ? 1 : 0) + 1;
    h += `<div class="tile ${halves % 2 ? "span-4" : "span-2"} links-tile"><h3>자료</h3><div class="links">${p.links.map(l => `<a href="${l.url}"${ext(l.url)}>${l.label} ↗</a>`).join("")}</div>
      ${p.notice ? `<p class="notice">${p.notice}</p>` : ""}</div>`;

    return h + `</div></section>`;
  }).join("");
  $("#projects").innerHTML = projects;

  /* ---------- about ---------- */
  $("#about").innerHTML = `<div class="bento">
    <div class="tile span-2"><h3>기술</h3><dl class="kv">${D.skills.map(([k, v]) => `<div><dt>${k}</dt><dd>${fmt(v)}</dd></div>`).join("")}</dl><p class="note">${fmt(D.skillsNote)}</p></div>
    <div class="tile span-2"><h3>교육</h3><dl class="kv">${D.education.map(([k, v]) => `<div><dt>${k}</dt><dd>${fmt(v)}</dd></div>`).join("")}</dl></div>
    <div class="tile span-4 contact-tile"><h3>연락처</h3><dl class="kv row">
      <div><dt>이메일</dt><dd>${fmt(P.email)}</dd></div><div><dt>전화</dt><dd>${fmt(P.phone)}</dd></div>
      <div><dt>GitHub</dt><dd><a href="https://github.com/${P.github}"${ext("https://")}>github.com/${P.github}</a></dd></div></dl></div>
  </div>`;
  $("#updated").textContent = P.updated;
  document.title = `${P.name} 포트폴리오`;

  /* ---------- reveal on scroll ---------- */
  const tiles = document.querySelectorAll(".tile");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("anim");
    const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -40px 0px" });
    tiles.forEach(t => io.observe(t));
  }
})();
