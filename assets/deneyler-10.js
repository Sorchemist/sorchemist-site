/* Sorchemist Simya Atölyesi — 10. sınıf deneyleri */
(() => {
  "use strict";
  const A = SC.Atolye, { clamp, lerp, mix, rgba } = A, TAU = Math.PI * 2;
  const sci = (x) => { if (!isFinite(x) || x === 0) return "0"; const e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e); return m.toFixed(2).replace(".", ",") + "·10" + String(e).split("").map((ch) => "⁰¹²³⁴⁵⁶⁷⁸⁹"["0123456789".indexOf(ch)] ?? (ch === "-" ? "⁻" : ch)).join(""); };
  const fx = (v, d = 2) => Number(v).toFixed(d).replace(".", ",");

  /* 9) Tepkime kazanı — 10-1 */
  const RX = {
    cokelme: { l: "Altın yağmuru (çökelme)", type: "Çökelme", eq: "Pb(NO3)2 + 2KI → PbI2(k) + 2KNO3", a: "#f1f5f9", b: "#f1f5f9", end: "#fde68a", ppt: "#facc15", atoms: [["Pb", 1, 1], ["N", 2, 2], ["O", 6, 6], ["K", 2, 2], ["I", 2, 2]], why: "İki renksiz çözelti karışınca suda az çözünen sarı PbI2 katısı çöker. K⁺ ve NO3⁻ iyonları çözeltide kalır (seyirci iyonlar)." },
    redoks: { l: "Zn + CuSO4 (redoks)", type: "İndirgenme–yükseltgenme", eq: "Zn(k) + CuSO4(suda) → ZnSO4(suda) + Cu(k)", a: "#38bdf8", b: "#94a3b8", end: "#e0f2fe", metal: true, atoms: [["Zn", 1, 1], ["Cu", 1, 1], ["S", 1, 1], ["O", 4, 4]], why: "Zn atomları elektron vererek Zn²⁺ iyonlarına yükseltgenir; Cu²⁺ iyonları bu elektronları alıp kızıl bakır olarak çubuğun üzerinde birikir. Mavi renk Cu²⁺ azaldıkça solar." },
    notr: { l: "HCl + NaOH (nötralleşme)", type: "Asit–baz", eq: "HCl + NaOH → NaCl + H2O", a: "#f8fafc", b: "#fdf2f8", end: "#f8fafc", ind: true, atoms: [["H", 2, 2], ["Cl", 1, 1], ["Na", 1, 1], ["O", 1, 1]], why: "Asidin H⁺ iyonu ile bazın OH⁻ iyonu birleşerek su oluşturur; geriye NaCl tuzu kalır. Tepkime ekzotermiktir ve kap ısınır. Fenolftalein bazik ortamda pembedir." },
    gaz: { l: "Karbonat + sirke (gaz çıkışı)", type: "Asit–karbonat (asit-baz)", eq: "NaHCO3 + CH3COOH → CH3COONa + H2O + CO2(g)", a: "#fef9c3", b: "#f8fafc", end: "#fef9c3", gas: true, atoms: [["Na", 1, 1], ["H", 5, 5], ["C", 3, 3], ["O", 5, 5]], why: "Karbonat asitle tepkimeye girer; oluşan karbonik asit hemen su ve CO2 gazına ayrışır. Köpürme gaz çıkışının işaretidir." }
  };
  A.register({
    id: "tepkime-kazani", topic: "10-1", icon: "🫕", title: "Dört Kazanın Sırrı",
    lead: "Dört tepkime türü, dört büyülü kazan. Tüpü kazana dök, değişimi gözlemle ve denklemin iki tarafındaki atomları say.",
    goal: "Çökelme, redoks ve asit-baz tepkimelerini gözlemleyerek ayırt etmek; atomların korunduğunu görmek.",
    materials: ["Beherler", "Deney tüpleri", "Pb(NO3)2, KI, CuSO4, Zn çubuk, HCl, NaOH, fenolftalein, NaHCO3, sirke"],
    steps: ["Bir tepkime seç.", "'Kazana dök' düğmesine bas.", "Renk değişimi, çökelek, gaz ya da ısınmayı gözlemle.", "Atom sayım tablosunda denklemin denk olduğunu kontrol et."],
    safety: "Kurşun bileşikleri zehirlidir; eldivenle çalışılmalı, atıklar özel kaba toplanmalıdır. HCl ve NaOH aşındırıcıdır.",
    learn: "Kimyasal tepkimelerin belirtileri renk değişimi, çökelek oluşumu, gaz çıkışı ve sıcaklık değişimidir. Tepkime türü ne olursa olsun atomlar yok olmaz, yeniden düzenlenir: denkleştirilmiş denklemin iki tarafındaki atom sayıları eşittir.",
    controls: [{ k: "r", type: "select", label: "Tepkime", options: Object.entries(RX).map(([v, o]) => ({ v, l: o.l })), onChange: (s) => { s.p = 0; s.pour = 0; s.parts = []; } },
      { type: "button", label: "🫗 Kazana dök", primary: true, act: (s) => { if (s.pour <= 0 && s.p < 1) s.pour = .001; } },
      { type: "button", label: "↺ Yenile", act: (s) => { s.p = 0; s.pour = 0; s.parts = []; } }],
    init(s) { s.p = 0; s.pour = 0; s.parts = []; s.bub = []; s.temp = 22; },
    tick(s, dt) {
      if (s.pour > 0 && s.pour < 1) { s.pour = Math.min(1, s.pour + dt * .6); }
      if (s.pour >= .6) s.p = Math.min(1, s.p + dt * .35);
      const R = RX[s.r];
      if (R.ppt && s.p > 0 && s.p < 1 && Math.random() < .9) s.parts.push({ x: 380 + Math.random() * 200, y: 250 + Math.random() * 60, v: 20 + Math.random() * 40 });
      s.parts.forEach((p) => (p.y = Math.min(436 - Math.random() * 6, p.y + p.v * dt)));
      s.temp = lerp(s.temp, 22 + (s.r === "notr" ? 9 * s.p : s.r === "gaz" ? -2 * s.p : 0), 1 - Math.pow(.1, dt));
    },
    draw(D, s, t) {
      const c = D.ctx, R = RX[s.r]; D.bg("warm"); D.candle(60, 430, t);
      const liq = R.ind ? mix("#f472b6", "#f8fafc", clamp(s.p * 1.3, 0, 1)) : mix(R.a, R.end, s.p);
      const top = D.beaker(480, 445, 260, 230, { fill: .55 + (s.pour > .6 ? .12 : s.pour * .2), color: liq, alpha: R.ppt ? .35 + s.p * .3 : .45, glow: R.ppt ? .06 * s.p : 0, inner: (tp) => {
        if (R.ppt) { s.parts.forEach((p) => { c.fillStyle = rgba(R.ppt, .9); c.fillRect(p.x, Math.max(p.y, tp), 3, 3); if (Math.random() < .02) D.glow(p.x, p.y, 5, "#fde047", .7); }); }
        if (R.metal) { c.fillStyle = mix("#94a3b8", "#b45309", s.p); D.rr(462, tp - 80, 36, 300, 4); c.fill(); for (let k = 0; k < 30 * s.p; k++) { c.fillStyle = "#c2410c"; c.fillRect(462 + (k * 7) % 36, tp + 10 + (k * 37) % 180, 4, 4); } }
        if (R.gas) D.bubbles(s.bub, tp, 360, 600, 440, s.p > 0 && s.p < 1 ? 3 : s.p > 0 ? .3 : 0, 1 / 60);
      } });
      if (R.metal) { c.fillStyle = mix("#94a3b8", "#b45309", s.p * .8); D.rr(462, top - 120, 36, 120, 4); c.fill(); }
      if (R.gas && s.p > 0 && s.p < 1) { for (let k = 0; k < 10; k++) { c.fillStyle = "rgba(255,255,255,.75)"; c.beginPath(); c.arc(380 + k * 22, top - 6 + Math.sin(t * 6 + k) * 3, 10, 0, TAU); c.fill(); } }
      // dökülen tüp
      const ang = s.pour > 0 && s.pour < 1 ? clamp(s.pour * 2.4, 0, 1.8) : 0;
      if (s.p < 1) {
        c.save(); c.translate(660, 140); c.rotate(-ang);
        D.tube(0, 0, 120, { fill: .6, color: R.b, w: 30 }); c.restore();
        if (ang > 1.2 && s.pour < 1) { c.strokeStyle = rgba(R.b === "#94a3b8" ? "#cbd5e1" : R.b, .8); c.lineWidth = 5; c.beginPath(); c.moveTo(610, 120); c.quadraticCurveTo(560, 150, 560, top); c.stroke(); c.lineWidth = 1; }
      }
      D.thermo(160, 420, 200, s.temp, 10, 40, { right: true });
      // denklem ve atom sayımı
      D.panel(30, 30, 380, 150, "Denklem · " + R.type, "#f6c86a");
      D.mono(R.eq.replace(/(\d)/g, (m, d, i, str) => /[A-Za-z)]/.test(str[i - 1]) ? "₀₁₂₃₄₅₆₇₈₉"[m] : m), 44, 70, { size: 12 });
      R.atoms.forEach(([el, l, r], i) => { const x = 44 + i * 72; D.text(el, x + 16, 110, { size: 13, weight: 800, align: "center", color: "#fde68a" }); D.mono(l + " = " + r, x + 16, 132, { size: 11, align: "center", color: l === r ? "#86efac" : "#fca5a5" }); });
      D.text("Sol = sağ: atomlar korunur ✓", 44, 162, { size: 11, color: "#86efac" });
    },
    readout: (s) => { const R = RX[s.r]; return [["Tür", R.type], ["İlerleme", Math.round(s.p * 100) + "%", s.p >= 1], ["Belirti", R.ppt ? "Sarı çökelek" : R.metal ? "Renk solması + bakır birikimi" : R.gas ? "Gaz çıkışı (köpük)" : "Isınma, pembe renk kayboluyor"]]; },
    note: (s) => s.p <= 0 ? "Tüpü kazana dök ve neler olduğunu izle." : RX[s.r].why
  });

  /* 10) Mol terazisi — 10-2 */
  const SUB = { C: { l: "Karbon (C)", M: 12, at: 1, col: "#334155", kind: "atom" }, H2O: { l: "Su (H2O)", M: 18, at: 3, col: "#7dd3fc", kind: "molekül" }, NaCl: { l: "Sofra tuzu (NaCl)", M: 58.5, at: 2, col: "#f8fafc", kind: "formül birimi" }, CO2: { l: "Karbondioksit (CO2)", M: 44, at: 3, col: "#e2e8f0", kind: "molekül" }, Fe: { l: "Demir (Fe)", M: 56, at: 1, col: "#94a3b8", kind: "atom" }, C6H12O6: { l: "Glikoz (C6H12O6)", M: 180, at: 24, col: "#fef3c7", kind: "molekül" } };
  A.register({
    id: "mol-terazisi", topic: "10-2", icon: "⚖️", title: "Simyacının Terazisi",
    lead: "Terazinin bir kefesine madde koy; diğer kefede kaç mol, kaç tanecik olduğu belirsin. Atomları saymanın tek yolu onları tartmaktır!",
    goal: "Kütle, mol sayısı ve tanecik sayısı arasındaki ilişkiyi kavramak.",
    materials: ["Hassas terazi", "Saf maddeler", "Avogadro sayacı"],
    steps: ["Bir madde seç.", "Kütleyi kaydırıcıyla ayarla.", "Mol sayısını, tanecik sayısını ve toplam atom sayısını oku.", "Eşit kütledeki farklı maddelerin mol sayılarını karşılaştır."],
    safety: "Terazi kefesine kimyasallar doğrudan konulmaz; tartım kâğıdı veya kap kullanılır.",
    learn: "n = m / MA. 1 mol, 6,02·10²³ tanecik içerir. Mol kütlesi büyük olan maddelerin aynı kütlesinde daha az tanecik bulunur.",
    controls: [{ k: "sub", type: "select", label: "Madde", options: Object.entries(SUB).map(([v, o]) => ({ v, l: o.l.split(" (")[0], dot: o.col })) },
      { k: "m", type: "range", label: "Kütle", min: 0, max: 180, step: 1, v: 18, unit: " g", color: "#f6c86a" }],
    init(s) { s.tilt = 0; },
    tick(s, dt) { s.tilt = lerp(s.tilt, clamp((s.m - SUB[s.sub].M) / 180, -.25, .25), 1 - Math.pow(.05, dt)); },
    draw(D, s, t) {
      const c = D.ctx, S = SUB[s.sub], n = s.m / S.M; D.bg("warm"); D.candle(900, 430, t);
      const cx = 330, cy = 170;
      c.fillStyle = "#5b3a22"; c.fillRect(cx - 8, cy, 16, 260); c.fillStyle = "#3a2414"; D.rr(cx - 90, 425, 180, 12, 4); c.fill();
      c.save(); c.translate(cx, cy); c.rotate(s.tilt);
      c.fillStyle = "#b45309"; c.fillRect(-220, -5, 440, 10); D.atom(0, 0, 10, "#fbbf24");
      const lp = [-200, 0], rp = [200, 0]; c.restore();
      const ly = cy + Math.sin(s.tilt) * -200, ry = cy + Math.sin(s.tilt) * 200;
      [[cx - 200, ly], [cx + 200, ry]].forEach(([x, y]) => { c.strokeStyle = "rgba(251,191,36,.6)"; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 60, y + 110); c.moveTo(x, y); c.lineTo(x + 60, y + 110); c.stroke(); c.fillStyle = "#78350f"; c.beginPath(); c.ellipse(x, y + 112, 70, 10, 0, 0, TAU); c.fill(); });
      // madde yığını
      const pile = Math.sqrt(s.m) * 4.4;
      c.fillStyle = S.col; c.beginPath(); c.moveTo(cx - 200 - pile, ly + 108); c.quadraticCurveTo(cx - 200, ly + 108 - pile * 1.2, cx - 200 + pile, ly + 108); c.fill();
      D.label(fx(s.m, 0) + " g " + s.sub, cx - 200, ly + 140);
      // mol jetonları
      const coins = Math.min(30, Math.round(n * 4));
      for (let i = 0; i < coins; i++) { const x = cx + 200 - 50 + (i % 6) * 20, y = ry + 100 - Math.floor(i / 6) * 9; c.fillStyle = "#f6c86a"; c.beginPath(); c.ellipse(x, y, 9, 4, 0, 0, TAU); c.fill(); c.strokeStyle = "#92400e"; c.stroke(); }
      D.label(fx(n, 3) + " mol", cx + 200, ry + 140);
      // hesap paneli
      D.panel(600, 30, 330, 410, "Avogadro sayacı", "#f6c86a");
      D.mono("MA(" + s.sub.replace(/(\d)/g, (m) => "₀₁₂₃₄₅₆₇₈₉"[m]) + ") = " + fx(S.M, S.M % 1 ? 1 : 0) + " g/mol", 620, 76, { size: 13 });
      D.mono("n = m / MA", 620, 110, { size: 13, color: "#7dd3fc" });
      D.mono("  = " + fx(s.m, 0) + " / " + fx(S.M, S.M % 1 ? 1 : 0) + " = " + fx(n, 3) + " mol", 620, 132, { size: 13 });
      D.mono("N = n · NA", 620, 170, { size: 13, color: "#7dd3fc" });
      D.mono("  = " + sci(n * 6.02e23) + " " + S.kind, 620, 192, { size: 13 });
      D.mono("Toplam atom = " + sci(n * 6.02e23 * S.at), 620, 230, { size: 13, color: "#fde68a" });
      D.text("Aynı 18 g ile karşılaştır:", 620, 276, { size: 11, color: "rgba(243,234,214,.6)" });
      Object.entries(SUB).forEach(([k, o], i) => { const v = 18 / o.M, y = 300 + i * 22; D.text(k.replace(/(\d)/g, (m) => "₀₁₂₃₄₅₆₇₈₉"[m]), 620, y + 4, { size: 11, color: k === s.sub ? "#fde68a" : "rgba(243,234,214,.7)" }); c.fillStyle = k === s.sub ? "#f6c86a" : "rgba(246,200,106,.35)"; D.rr(700, y - 6, 200 * Math.min(1, v / 1.5), 10, 5); c.fill(); D.mono(fx(v, 2), 905, y + 4, { size: 10, align: "right" }); });
    },
    readout: (s) => { const S = SUB[s.sub], n = s.m / S.M; return [["Mol sayısı", fx(n, 3) + " mol", true], ["Tanecik", sci(n * 6.02e23)], ["Atom", sci(n * 6.02e23 * S.at)]]; },
    note: (s) => { const S = SUB[s.sub], n = s.m / S.M; return Math.abs(n - 1) < .03 ? "Tam 1 mol! " + fx(S.M, S.M % 1 ? 1 : 0) + " g " + s.sub + ", 6,02·10²³ " + S.kind + " içerir. Mol kütlesi, 1 molün gram cinsinden kütlesidir." : fx(s.m, 0) + " g " + s.sub + " = " + fx(n, 3) + " mol. Kütleyi " + fx(S.M, S.M % 1 ? 1 : 0) + " g'a getirirsen tam 1 mol elde edersin. Alttaki çubuklar, eşit kütlede mol kütlesi küçük olan maddenin daha çok mol içerdiğini gösteriyor."; }
  });

  /* 11) Balon iksiri — 10-3 */
  A.register({
    id: "balon-iksiri", topic: "10-3", icon: "🎈", title: "Balon Şişiren İksir",
    lead: "Balonun içindeki magnezyumu asit dolu şişeye düşür. Balon ne kadar şişecek? Hangisi önce bitecek: magnezyum mu, asit mi?",
    goal: "Mg + 2HCl → MgCl2 + H2 tepkimesinde sınırlayıcı bileşeni, artan maddeyi ve verimi belirlemek.",
    materials: ["Erlenmayer", "Balon", "Magnezyum şerit", "1 M HCl çözeltisi", "Dereceli silindir"],
    steps: ["Mg kütlesini ve 1 M HCl hacmini ayarla.", "'Mg'yi düşür' düğmesine bas.", "Balonun büyüklüğünü ve hesap panelini incele.", "Sınırlayıcı bileşenin değiştiği noktayı bulmak için miktarlarla oyna."],
    safety: "Hidrojen gazı yanıcıdır; balon alev yakınına getirilmemelidir. HCl aşındırıcıdır.",
    learn: "Tepkime tükenen madde bitince durur. Ürün miktarını sınırlayıcı bileşen belirler; diğer maddeden bir miktar artar. Gerçek verim kayıplar nedeniyle teorik verimden düşüktür.",
    controls: [{ k: "mg", type: "range", label: "Magnezyum", min: .2, max: 4.8, step: .2, v: 1.2, unit: " g", color: "#cbd5e1", fmt: (v) => fx(v, 1), onChange: (s) => (s.run = 0) },
      { k: "v", type: "range", label: "1 M HCl", min: 10, max: 400, step: 10, v: 50, unit: " mL", color: "#38bdf8", onChange: (s) => (s.run = 0) },
      { k: "yld", type: "range", label: "Verim", min: 60, max: 100, step: 5, v: 100, unit: " %", color: "#86efac" },
      { type: "button", label: "⬇ Mg'yi düşür", primary: true, act: (s) => { s.run = .001; } }],
    init(s) { s.run = 0; s.bub = []; },
    calc(s) { const nMg = s.mg / 24, nH = s.v / 1000, h2 = Math.min(nMg, nH / 2), lim = nMg < nH / 2 - 1e-9 ? "Mg" : nMg > nH / 2 + 1e-9 ? "HCl" : "ikisi de"; return { nMg, nH, h2, lim, real: h2 * s.yld / 100, leftMg: Math.max(0, nMg - h2) * 24, leftH: Math.max(0, nH - 2 * h2) }; },
    tick(s, dt) { if (s.run > 0 && s.run < 1) s.run = Math.min(1, s.run + dt * .25); },
    draw(D, s, t) {
      const c = D.ctx, r = this.calc(s), p = s.run; D.bg("warm"); D.candle(60, 430, t);
      const vol = r.real * 24.5 * p; // L (25 °C)
      const R = 14 + Math.cbrt(vol) * 46;
      const top = D.flask(300, 440, 1.6, { fill: .2 + s.v / 400 * .5, color: "#e0f2fe", alpha: .45, t, inner: (tp) => {
        const mgLeft = s.mg * (1 - p * (1 - r.leftMg / s.mg));
        if (p > 0) for (let k = 0; k < Math.ceil(mgLeft * 4); k++) { c.fillStyle = "#cbd5e1"; c.fillRect(260 + (k * 13) % 80, 428 - Math.floor(k / 6) * 5, 10, 3); }
        D.bubbles(s.bub, tp, 240, 360, 436, p > 0 && p < 1 ? 2.5 : 0, 1 / 60);
      } });
      const neckY = 440 - 110 * 1.6;
      D.balloon(300, neckY + 6, R, "#fb7185");
      if (p <= 0) { for (let k = 0; k < Math.ceil(s.mg * 4); k++) { c.fillStyle = "#cbd5e1"; c.fillRect(280 + (k * 9) % 40, neckY - 30 - Math.floor(k / 4) * 5, 8, 3); } }
      D.text("H₂", 300, neckY - R * 1.05 + 5, { size: 16, weight: 800, align: "center", color: "#fff", shadow: true });
      // hesap paneli
      D.panel(520, 30, 410, 300, "Stokiyometri tablosu", "#f6c86a");
      D.mono("Mg  +  2HCl  →  MgCl₂  +  H₂", 540, 70, { size: 14 });
      const rows = [["Başlangıç", fx(r.nMg, 3), fx(r.nH, 3), "0", "0"], ["Değişim", "−" + fx(r.h2, 3), "−" + fx(2 * r.h2, 3), "+" + fx(r.h2, 3), "+" + fx(r.h2, 3)], ["Son", fx(r.nMg - r.h2, 3), fx(r.nH - 2 * r.h2, 3), fx(r.h2, 3), fx(r.h2, 3)]];
      ["", "Mg", "HCl", "MgCl₂", "H₂"].forEach((h, i) => D.text(h, 600 + i * 72 - (i ? 0 : 50), 102, { size: 11, weight: 800, align: "center", color: "#fde68a" }));
      rows.forEach((row, j) => row.forEach((v, i) => D.mono(v, i ? 600 + i * 72 : 540, 128 + j * 26, { size: 11, align: i ? "center" : "left", color: j === 2 && ((i === 1 && r.lim !== "HCl") || (i === 2 && r.lim !== "Mg")) ? "#fca5a5" : "#fde9b8" })));
      D.text("mol", 910, 102, { size: 9, color: "rgba(243,234,214,.5)", align: "right" });
      D.text("Sınırlayıcı: " + r.lim, 540, 222, { size: 15, weight: 800, color: "#fca5a5" });
      D.mono("Teorik H₂: " + fx(r.h2 * 24.5, 2) + " L (25 °C)", 540, 252, { size: 12 });
      D.mono("Gerçek H₂ (%" + s.yld + "): " + fx(r.real * 24.5, 2) + " L", 540, 274, { size: 12, color: "#86efac" });
      D.mono("Artan: " + (r.leftMg > 1e-6 ? fx(r.leftMg, 2) + " g Mg" : r.leftH > 1e-6 ? fx(r.leftH * 1000, 0) + " mL HCl" : "yok"), 540, 296, { size: 12, color: "#fde68a" });
    },
    readout(s) { const r = this.calc(s); return [["Sınırlayıcı", r.lim, true], ["H₂ (teorik)", fx(r.h2, 3) + " mol"], ["Balon", fx(r.real * 24.5 * s.run, 2) + " L"]]; },
    note(s) { const r = this.calc(s); return s.run <= 0 ? "Miktarları ayarla ve magnezyumu düşür. 1 mol Mg için 2 mol HCl gerekir; sence hangisi önce biter?" : r.lim === "Mg" ? "Magnezyum tükendi ve balon " + fx(r.real * 24.5, 2) + " L'de durdu. HCl fazlası çözeltide kaldı. Daha büyük balon için Mg miktarını artır." : r.lim === "HCl" ? "Asit tükendi! Şişenin dibinde tepkimeye girmemiş Mg şeritleri kaldı. HCl hacmini artırırsan balon büyümeye devam eder." : "Miktarlar tam stokiyometrik: iki madde de aynı anda tükendi."; }
  });

  /* 12) Pistonlu şişe — 10-4 */
  A.register({
    id: "pistonlu-sise", topic: "10-4", icon: "🫧", title: "Pistonlu Sihirli Şişe",
    lead: "Gaz tanecikleri cam silindirin içinde dans ediyor. Pistonu it, ocağı yak, tanecik ekle ve basıncın nasıl değiştiğini ölç.",
    goal: "Boyle, Charles, Gay-Lussac ve Avogadro yasalarını tanecik modeliyle keşfetmek.",
    materials: ["Pistonlu cam silindir", "Manometre", "Isıtıcı", "Gaz tüpü"],
    steps: ["Bir yasa seç; o yasada sabit tutulan değişken kilitlenir.", "Kaydırıcılarla sıcaklığı, hacmi veya mol sayısını değiştir.", "Basıncı ve grafikteki noktaları izle.", "'Ölçümü kaydet' ile grafiğe nokta ekle."],
    safety: "Kapalı kaplar ısıtılırken basınç artar ve kap patlayabilir; gerçek deneylerde emniyet valfi kullanılır.",
    learn: "Gaz basıncı, taneciklerin kabın çeperlerine çarpmasından doğar. Hacim küçülünce çarpma sıklığı artar (Boyle). Sıcaklık artınca tanecikler hızlanır; sabit basınçta hacim artar (Charles), sabit hacimde basınç artar (Gay-Lussac). Tanecik sayısı artınca hacim ya da basınç artar (Avogadro).",
    controls: [{ k: "law", type: "select", label: "Yasa", options: [{ v: "boyle", l: "Boyle (T, n sabit)" }, { v: "charles", l: "Charles (P, n sabit)" }, { v: "gay", l: "Gay-Lussac (V, n sabit)" }, { v: "avo", l: "Avogadro (P, T sabit)" }], onChange: (s) => { s.pts = []; A.byId("pistonlu-sise").fixLaw(s); } },
      { k: "T", type: "range", label: "Sıcaklık", min: 150, max: 600, step: 10, v: 300, unit: " K", color: "#fb923c" },
      { k: "V", type: "range", label: "Hacim", min: 2, max: 10, step: .5, v: 6, unit: " L", color: "#38bdf8", fmt: (v) => fx(v, 1) },
      { k: "n", type: "range", label: "Mol sayısı", min: .1, max: .5, step: .05, v: .25, unit: " mol", color: "#a78bfa", fmt: (v) => fx(v, 2) },
      { type: "button", label: "📍 Ölçümü kaydet", act: (s) => A.byId("pistonlu-sise").record(s) }],
    fixLaw(s) { if (s.law === "boyle") { s.T = 300; s.n = .25; } if (s.law === "charles") { s.n = .25; } if (s.law === "gay") { s.V = 6; s.n = .25; } if (s.law === "avo") s.T = 300; },
    P(s) { return s.n * .082 * s.T / this.Vcur(s); },
    Vcur(s) { if (s.law === "charles") return s.n * .082 * s.T / 1.0; if (s.law === "avo") return s.n * .082 * s.T / 1.0; return s.V; },
    record(s) { const P = this.P(s), V = this.Vcur(s); const pt = s.law === "boyle" ? [V, P] : s.law === "charles" ? [s.T, V] : s.law === "gay" ? [s.T, P] : [s.n, V]; s.pts.push(pt); SC.Sound && SC.Sound.tick(); },
    init(s) { s.pts = []; s.parts = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * TAU })); s.hits = 0; s.vis = s.V; },
    tick(s, dt) {
      const V = this.Vcur(s); s.vis = lerp(s.vis, V, 1 - Math.pow(.02, dt));
      if (s.law === "boyle") { s.T = 300; s.n = .25; } if (s.law === "gay") { s.n = .25; } if (s.law === "charles") s.n = .25; if (s.law === "avo") s.T = 300;
      const sp = Math.sqrt(s.T / 300) * .5, N = Math.round(s.n * 240);
      while (s.parts.length < N) s.parts.push({ x: Math.random(), y: Math.random(), a: Math.random() * TAU });
      s.parts.length = Math.min(s.parts.length, N);
      s.flash = [];
      s.parts.forEach((p) => { p.x += Math.cos(p.a) * sp * dt * 1.4 * (6 / s.vis); p.y += Math.sin(p.a) * sp * dt * 1.4; if (p.x < 0 || p.x > 1) { p.a = Math.PI - p.a; p.x = clamp(p.x, 0, 1); s.flash.push(p); } if (p.y < 0 || p.y > 1) { p.a = -p.a; p.y = clamp(p.y, 0, 1); s.flash.push(p); } });
    },
    draw(D, s, t) {
      const c = D.ctx, P = this.P(s), V = this.Vcur(s); D.bg("night");
      const x0 = 120, w = 260, yb = 440, hMax = 320, h = clamp(s.vis / 12, .1, 1.2) * hMax * .95;
      const yt = yb - h;
      if (s.T > 320) D.burner(x0 + w / 2, 520, (s.T - 300) / 300 * 70, "#60a5fa", t);
      c.fillStyle = "rgba(255,255,255,.04)"; c.fillRect(x0, yb - hMax - 20, w, hMax + 20); c.strokeStyle = "rgba(226,240,255,.55)"; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, yb - hMax - 30); c.lineTo(x0, yb); c.lineTo(x0 + w, yb); c.lineTo(x0 + w, yb - hMax - 30); c.stroke(); c.lineWidth = 1;
      c.fillStyle = "#475569"; c.fillRect(x0 + 2, yt - 16, w - 4, 16); c.fillStyle = "#64748b"; c.fillRect(x0 + w / 2 - 6, yt - 120, 12, 104);
      const hot = clamp((s.T - 150) / 450, 0, 1);
      s.parts.forEach((p) => { const x = x0 + 10 + p.x * (w - 20), y = yt + 8 + p.y * (h - 16); D.atom(x, y, 5, mix("#60a5fa", "#f97316", hot)); });
      s.flash.forEach((p) => { const x = x0 + 10 + p.x * (w - 20), y = yt + 8 + p.y * (h - 16); D.glow(x, y, 10, "#fde68a", .6); });
      // manometre
      const mx = 470, my = 120; c.fillStyle = "#1f2937"; c.beginPath(); c.arc(mx, my, 54, 0, TAU); c.fill(); c.strokeStyle = "#b45309"; c.lineWidth = 3; c.stroke(); c.lineWidth = 1;
      for (let k = 0; k <= 10; k++) { const a = Math.PI * .75 + k / 10 * Math.PI * 1.5; c.strokeStyle = "rgba(243,234,214,.5)"; c.beginPath(); c.moveTo(mx + Math.cos(a) * 44, my + Math.sin(a) * 44); c.lineTo(mx + Math.cos(a) * 50, my + Math.sin(a) * 50); c.stroke(); }
      const a = Math.PI * .75 + clamp(P / 5, 0, 1) * Math.PI * 1.5; c.strokeStyle = "#ef4444"; c.lineWidth = 3; c.beginPath(); c.moveTo(mx, my); c.lineTo(mx + Math.cos(a) * 42, my + Math.sin(a) * 42); c.stroke(); c.lineWidth = 1;
      D.mono(fx(P, 2) + " atm", mx, my + 82, { size: 14, align: "center" });
      D.mono("V = " + fx(V, 2) + " L", 470, 240, { size: 13, align: "center" }); D.mono("T = " + s.T + " K", 470, 262, { size: 13, align: "center" }); D.mono("n = " + fx(s.n, 2) + " mol", 470, 284, { size: 13, align: "center" });
      // grafik
      const cfg = { boyle: { xl: "V (L)", yl: "P (atm)", xmin: 0, xmax: 12, ymin: 0, ymax: 5, f: (x) => .25 * .082 * 300 / x }, charles: { xl: "T (K)", yl: "V (L)", xmin: 0, xmax: 620, ymin: 0, ymax: 13, f: (x) => .25 * .082 * x }, gay: { xl: "T (K)", yl: "P (atm)", xmin: 0, xmax: 620, ymin: 0, ymax: 2.2, f: (x) => .25 * .082 * x / s.V }, avo: { xl: "n (mol)", yl: "V (L)", xmin: 0, xmax: .55, ymin: 0, ymax: 14, f: (x) => x * .082 * 300 } }[s.law];
      const curve = []; for (let i = 1; i <= 60; i++) { const x = cfg.xmin + (cfg.xmax - cfg.xmin) * i / 60; curve.push([x, cfg.f(x)]); }
      const cur = s.law === "boyle" ? [V, P] : s.law === "charles" ? [s.T, V] : s.law === "gay" ? [s.T, P] : [s.n, V];
      D.panel(570, 30, 360, 400, "Grafik", "#38bdf8");
      const G = D.graph(580, 50, 340, 370, { xmin: cfg.xmin, xmax: cfg.xmax, ymin: cfg.ymin, ymax: cfg.ymax, xlabel: cfg.xl, ylabel: cfg.yl, series: [{ pts: curve.filter((p) => p[1] <= cfg.ymax), color: "rgba(56,189,248,.35)", dash: [4, 4] }, { pts: [cur], color: "#f6c86a", dot: true }] });
      s.pts.forEach(([x, y]) => { c.fillStyle = "#fde68a"; c.beginPath(); c.arc(G.X(x), G.Y(y), 4, 0, TAU); c.fill(); });
    },
    readout(s) { const P = this.P(s), V = this.Vcur(s); return [["Basınç", fx(P, 2) + " atm", true], ["P·V", fx(P * V, 2)], [s.law === "charles" || s.law === "avo" ? "V / " + (s.law === "avo" ? "n" : "T") : "P / T", s.law === "charles" ? fx(V / s.T, 4) : s.law === "avo" ? fx(V / s.n, 1) : fx(P / s.T, 4)]]; },
    note(s) { return { boyle: "Boyle: sıcaklık ve mol sabit. Hacmi küçült; tanecikler çeperlere daha sık çarpar ve basınç artar. P·V çarpımının hep aynı kaldığına dikkat et.", charles: "Charles: basınç (1 atm) ve mol sabit. Isıttıkça tanecikler hızlanır ve pistonu iter: hacim mutlak sıcaklıkla doğru orantılı artar (V/T sabit).", gay: "Gay-Lussac: hacim ve mol sabit. Isıttıkça hızlanan tanecikler çeperlere daha sert ve sık çarpar: basınç mutlak sıcaklıkla doğru orantılıdır.", avo: "Avogadro: basınç ve sıcaklık sabit. Tanecik ekledikçe hacim büyür; V/n oranı sabit kalır (25 °C civarında ≈ 24,6 L/mol)." }[s.law]; }
  });

  /* 13) Beyaz halka — 10-5 */
  const PAIRS = { nh3hcl: { l: "NH3 + HCl", a: ["NH3", 17, "#7dd3fc"], b: ["HCl", 36.5, "#fca5a5"], prod: "NH4Cl" }, nh3hbr: { l: "NH3 + HBr", a: ["NH3", 17, "#7dd3fc"], b: ["HBr", 81, "#fdba74"], prod: "NH4Br" }, mahcl: { l: "CH3NH2 + HCl", a: ["CH3NH2", 31, "#a5b4fc"], b: ["HCl", 36.5, "#fca5a5"], prod: "CH3NH3Cl" } };
  A.register({
    id: "beyaz-halka", topic: "10-5", icon: "💨", title: "Beyaz Halkanın Yeri",
    lead: "Uzun bir cam borunun iki ucuna iki farklı gaz emdirilmiş pamuk yerleştir. Gazlar nerede buluşacak? Hafif olan mı daha hızlı koşar?",
    goal: "Graham yasasını gözlemlemek; ideal gaz denklemini ve kinetik teoriyi uygulamak.",
    materials: ["1 m uzunluğunda cam boru", "Pamuk", "Derişik NH3 ve HCl çözeltileri", "Cetvel", "Termometre"],
    steps: ["Bir gaz çifti seç.", "'Pamukları yerleştir' düğmesine bas.", "Halkanın oluştuğu yeri ve süreyi ölç.", "Sıcaklığı değiştirip tekrarla: süre değişir, yer değişmez!"],
    safety: "Derişik amonyak ve HCl buharları solunum yollarını tahriş eder; deney çeker ocakta yapılır.",
    learn: "Aynı sıcaklıkta bütün gazların ortalama kinetik enerjisi eşittir; bu yüzden hafif moleküller daha hızlı hareket eder: v1/v2 = √(M2/M1). Sıcaklık artınca tüm tanecikler hızlanır ve halka daha çabuk oluşur, ama hız oranı ve halkanın yeri değişmez.",
    controls: [{ k: "pair", type: "select", label: "Gaz çifti", options: Object.entries(PAIRS).map(([v, o]) => ({ v, l: o.l })), onChange: (s) => { s.run = 0; s.time = 0; } },
      { k: "T", type: "range", label: "Sıcaklık", min: 0, max: 60, step: 5, v: 25, unit: " °C", color: "#fb923c" },
      { type: "button", label: "▶ Pamukları yerleştir", primary: true, act: (s) => { s.run = 1; s.time = 0; s.ring = 0; } }],
    init(s) { s.run = 0; s.time = 0; s.ring = 0; },
    pos(s) { const P = PAIRS[s.pair], va = 1 / Math.sqrt(P.a[1]), vb = 1 / Math.sqrt(P.b[1]); return va / (va + vb); },
    tick(s, dt) { if (!s.run) return; const sp = Math.sqrt((s.T + 273) / 298) * .055; s.time += dt; const f = this.pos(s); s.fa = Math.min(f, s.time * sp * f / .5); s.fb = Math.min(1 - f, s.time * sp * (1 - f) / .5); if (s.fa >= f - .001) s.ring = Math.min(1, s.ring + dt * .8); },
    draw(D, s, t) {
      const c = D.ctx, P = PAIRS[s.pair], f = this.pos(s); D.bg("night");
      const x0 = 70, x1 = 890, y = 230;
      c.fillStyle = "rgba(255,255,255,.04)"; D.rr(x0, y - 26, x1 - x0, 52, 26); c.fill(); c.strokeStyle = "rgba(226,240,255,.55)"; c.lineWidth = 2; c.stroke(); c.lineWidth = 1;
      c.fillStyle = "#f8fafc"; D.rr(x0 + 4, y - 20, 34, 40, 10); c.fill(); D.rr(x1 - 38, y - 20, 34, 40, 10); c.fill();
      D.label(P.a[0] + " (" + P.a[1] + ")", x0 + 40, y + 60, P.a[2]); D.label(P.b[0] + " (" + P.b[1] + ")", x1 - 40, y + 60, P.b[2]);
      if (s.run) {
        const xa = x0 + 40 + (x1 - x0 - 80) * (s.fa || 0), xb = x1 - 40 - (x1 - x0 - 80) * (s.fb || 0);
        for (let k = 0; k < 60; k++) { const q = Math.random(); c.fillStyle = rgba(P.a[2], .5); c.beginPath(); c.arc(x0 + 40 + (xa - x0 - 40) * Math.pow(q, .6), y + (Math.random() - .5) * 36, 2, 0, TAU); c.fill(); c.fillStyle = rgba(P.b[2], .5); c.beginPath(); c.arc(x1 - 40 - (x1 - 40 - xb) * Math.pow(Math.random(), .6), y + (Math.random() - .5) * 36, 2, 0, TAU); c.fill(); }
        if (s.ring > 0) { const rx = x0 + 40 + (x1 - x0 - 80) * f; c.fillStyle = "rgba(255,255,255," + (.85 * s.ring) + ")"; c.beginPath(); c.ellipse(rx, y, 9 + s.ring * 4, 24, 0, 0, TAU); c.fill(); D.glow(rx, y, 50, "#ffffff", .3 * s.ring); D.label(P.prod + " halkası", rx, y - 40, "#fff"); }
      }
      // cetvel
      for (let k = 0; k <= 10; k++) { const x = x0 + 40 + (x1 - x0 - 80) * k / 10; c.strokeStyle = "rgba(243,234,214,.35)"; c.beginPath(); c.moveTo(x, y + 30); c.lineTo(x, y + 38); c.stroke(); D.text(k * 10 + "", x, y + 50, { size: 9, align: "center", color: "rgba(243,234,214,.5)" }); }
      D.panel(70, 330, 400, 180, "Graham yasası", "#a78bfa");
      D.mono("v(" + P.a[0] + ") / v(" + P.b[0] + ") = √(" + P.b[1] + " / " + P.a[1] + ") = " + fx(Math.sqrt(P.b[1] / P.a[1]), 2), 90, 380, { size: 12 });
      D.mono("Halka konumu = " + fx(f * 100, 1) + " cm (" + P.a[0] + " ucundan)", 90, 410, { size: 12 });
      D.mono("Süre = " + fx(s.time, 1) + " s", 90, 440, { size: 12, color: "#fde68a" });
      D.panel(500, 330, 430, 180, "Kinetik teori · PV = nRT", "#fb923c");
      const T = s.T + 273, Ek = 1.5 * 8.314 * T / 1000;
      D.mono("T = " + T + " K → ort. kinetik enerji = " + fx(Ek, 2) + " kJ/mol", 520, 380, { size: 12 });
      D.mono("1 mol gaz, 1 atm: V = nRT/P = " + fx(.082 * T, 1) + " L", 520, 410, { size: 12 });
      D.mono("Aynı T'de tüm gazların Ek'si eşit", 520, 440, { size: 12, color: "#fde68a" });
    },
    readout(s) { const P = PAIRS[s.pair]; return [["Hız oranı", fx(Math.sqrt(P.b[1] / P.a[1]), 2)], ["Halka", fx(this.pos(s) * 100, 1) + " cm", true], ["Süre", s.ring > 0 ? fx(s.time, 1) + " s" : "—"]]; },
    note(s) { const P = PAIRS[s.pair]; return !s.run ? "Halkanın nerede oluşacağını tahmin et ve pamukları yerleştir." : s.ring > 0 ? "Halka " + P.b[0] + " ucuna daha yakın oluştu. " + P.a[0] + " daha hafif olduğu için daha hızlı yayıldı ve daha uzun yol aldı. Sıcaklığı değiştirip tekrar dene: süre kısalır, ama halkanın yeri aynı kalır." : "Gazlar borunun içinde birbirine doğru yayılıyor…"; }
  });

  /* 14) Doymak bilmeyen kazan — 10-6 */
  const SOL = { KNO3: { l: "KNO3", col: "#f8fafc", d: [13.3, 20.9, 31.6, 45.8, 63.9, 85.5, 110, 138, 169, 202, 246] }, KCl: { l: "KCl", col: "#e0f2fe", d: [27.6, 31.0, 34.0, 37.0, 40.0, 42.6, 45.5, 48.3, 51.1, 54.0, 56.7] }, NaCl: { l: "NaCl", col: "#fefce8", d: [35.7, 35.8, 36.0, 36.3, 36.6, 37.0, 37.3, 37.8, 38.4, 39.0, 39.8] } };
  const Sat = (k, T) => { const d = SOL[k].d, i = clamp(Math.floor(T / 10), 0, 9), f = (T - i * 10) / 10; return lerp(d[i], d[i + 1], f); };
  A.register({
    id: "doymak-bilmeyen-kazan", topic: "10-6", icon: "🧂", title: "Doymak Bilmeyen Kazan",
    lead: "100 g suya kaşık kaşık tuz ekle. Kazan ne zaman doyacak? Isıtınca ne olur? Ya çok yavaş soğutursan?",
    goal: "Çözünürlüğü, doymamış–doymuş–aşırı doymuş çözeltileri ve sıcaklığın etkisini incelemek.",
    materials: ["100 g su", "KNO3, KCl, NaCl", "Isıtıcı", "Termometre", "Tohum kristali"],
    steps: ["Bir tuz seç ve kaşıkla ekle.", "Dibe çöken katı oluşunca çözelti doymuştur.", "Sıcaklığı artırıp katının çözünmesini izle.", "Sıcak doymuş çözeltiyi yavaşça soğut: aşırı doymuş çözelti! Tohum kristali at."],
    safety: "Isıtıcıyla çalışırken sıcak çözeltiler sıçrayabilir; maşa ve gözlük kullanılmalıdır.",
    learn: "Çözünürlük, belirli sıcaklıkta 100 g suda çözünebilen en fazla madde miktarıdır. KNO3'ün çözünürlüğü sıcaklıkla hızla artar, NaCl'ninki çok az değişir. Doymuş sıcak bir çözelti dikkatlice soğutulursa fazla madde bir süre çözünmüş kalır (aşırı doymuş, kararsız); küçük bir kristal bu fazlalığın hızla çökmesine yol açar.",
    controls: [{ k: "salt", type: "select", label: "Tuz", options: Object.entries(SOL).map(([v, o]) => ({ v, l: o.l })), onChange: (s) => { s.m = 0; s.dis = 0; s.ss = false; } },
      { k: "T", type: "range", label: "Sıcaklık", min: 0, max: 100, step: 5, v: 20, unit: " °C", color: "#fb923c", onChange: (s) => A.byId("doymak-bilmeyen-kazan").settle(s, false) },
      { type: "button", label: "🥄 +10 g ekle", primary: true, act: (s) => { s.m += 10; A.byId("doymak-bilmeyen-kazan").settle(s, true); SC.Sound && SC.Sound.noise({ vol: .08, dur: .25, freq: 2400 }); } },
      { type: "button", label: "✨ Tohum kristali at", act: (s) => { s.ss = false; A.byId("doymak-bilmeyen-kazan").settle(s, true); s.flash = 1; } },
      { type: "button", label: "↺ Boşalt", act: (s) => { s.m = 0; s.dis = 0; s.ss = false; } }],
    settle(s, force) { const S = Sat(s.salt, s.T); if (s.dis > S && !force && s.m > 0) { s.ss = true; return; } s.dis = Math.min(s.m, S); if (s.dis < S) s.ss = false; },
    init(s) { s.m = 0; s.dis = 0; s.ss = false; s.flash = 0; s.vis = 0; },
    tick(s, dt) { s.flash = Math.max(0, s.flash - dt); if (!s.ss) s.dis = Math.min(s.m, Sat(s.salt, s.T)); s.vis = lerp(s.vis, s.m - s.dis, 1 - Math.pow(.05, dt)); },
    draw(D, s, t) {
      const c = D.ctx, S = Sat(s.salt, s.T); D.bg("warm");
      if (s.T > 25) D.burner(240, 520, (s.T - 20) / 80 * 60, "#60a5fa", t);
      D.beaker(240, 470, 230, 200, { fill: .55, color: "#e0f2fe", alpha: .3, inner: (tp) => {
        const und = s.vis; if (und > .1) { c.fillStyle = "#f8fafc"; c.beginPath(); c.moveTo(130, 470); c.quadraticCurveTo(240, 470 - Math.sqrt(und) * 7, 350, 470); c.fill(); }
        for (let k = 0; k < Math.min(120, s.dis * .8); k++) { c.fillStyle = "rgba(255,255,255,.35)"; c.fillRect(140 + (k * 37 + t * 20 * (k % 3)) % 200, tp + 10 + (k * 53) % 150, 2, 2); }
        if (s.flash > 0) D.glow(240, 420, 140, "#ffffff", s.flash * .6);
      } });
      D.thermo(400, 430, 220, s.T, 0, 100, { right: true });
      const state = s.ss ? "Aşırı doymuş" : s.m - s.dis > .5 ? "Doymuş (dipte katı var)" : Math.abs(s.m - S) < .5 ? "Tam doymuş" : "Doymamış";
      D.serif(state, 240, 220, { size: 26, align: "center", color: s.ss ? "#f0abfc" : state.startsWith("Doymamış") ? "#86efac" : "#fde68a" });
      D.panel(470, 30, 460, 470, "Çözünürlük grafiği (g / 100 g su)", "#f6c86a");
      const ser = Object.entries(SOL).map(([k, o]) => ({ pts: o.d.map((v, i) => [i * 10, v]), color: k === s.salt ? "#f6c86a" : "rgba(243,234,214,.22)", w: k === s.salt ? 2.5 : 1.2 }));
      const G = D.graph(480, 50, 440, 440, { xmin: 0, xmax: 100, ymin: 0, ymax: 250, xlabel: "T (°C)", ylabel: "çözünürlük", ticksX: [0, 20, 40, 60, 80, 100], ticksY: [0, 50, 100, 150, 200, 250], series: ser.concat([{ pts: [[s.T, Math.min(s.m, 250)]], color: s.ss ? "#f0abfc" : "#7dd3fc", dot: true }]) });
      Object.entries(SOL).forEach(([k, o]) => D.text(o.l, G.X(100) - 4, G.Y(o.d[10]) - 6, { size: 10, align: "right", color: k === s.salt ? "#f6c86a" : "rgba(243,234,214,.4)" }));
    },
    readout: (s) => { const S = Sat(s.salt, s.T); return [["Eklenen", s.m + " g"], ["Çözünen", fx(s.dis, 1) + " g", true], ["Çözünürlük (" + s.T + " °C)", fx(S, 1) + " g"]]; },
    note: (s) => { const S = Sat(s.salt, s.T); return s.ss ? "Aşırı doymuş çözelti! Soğuk suda normalde " + fx(S, 1) + " g çözünebilir ama " + fx(s.dis, 1) + " g çözünmüş durumda. Bu durum kararsızdır; tohum kristali at ve fazlalığın anında çöküşünü izle." : s.m - s.dis > .5 ? "Çözelti doydu; fazla " + fx(s.m - s.dis, 1) + " g katı dipte. Sıcaklığı artırarak çözmeyi dene. Sonra yavaşça soğutursan aşırı doymuş çözelti elde edebilirsin." : "Çözelti doymamış: daha " + fx(S - s.m, 1) + " g daha çözebilir."; }
  });

  /* 15) Mavi iksir — 10-7 */
  A.register({
    id: "mavi-iksir", topic: "10-7", icon: "🔵", title: "Mavi İksirin Tonu",
    lead: "Bakır sülfat tozunu balon jojede çöz. Rengin koyuluğu derişimin aynasıdır. Molariteyi, kütlece yüzdeyi ve ppm'i ölç; sonra seyrelt.",
    goal: "Molarite, kütlece yüzde ve ppm hesaplamak; seyreltmede mol sayısının korunduğunu görmek.",
    materials: ["Balon joje", "CuSO4 (159,6 g/mol)", "Saf su", "Kolorimetre"],
    steps: ["Çözünen kütlesini ve çözelti hacmini ayarla.", "Rengi ve kolorimetre çubuğunu gözle.", "Hesap panelindeki derişimleri oku.", "'Seyrelt' ile 100 mL su ekle; mol sayısının değişmediğine dikkat et."],
    safety: "Bakır sülfat zararlıdır ve su canlılarını öldürür; atığı lavaboya dökme.",
    learn: "Molarite = mol / litre. Çözeltiye su eklemek çözünenin mol sayısını değiştirmez, yalnızca hacmi artırır: M1·V1 = M2·V2. Renk yoğunluğu (soğurma) derişimle doğru orantılıdır.",
    controls: [{ k: "m", type: "range", label: "CuSO4 kütlesi", min: 0, max: 32, step: .4, v: 8, unit: " g", color: "#38bdf8", fmt: (v) => fx(v, 1) },
      { k: "V", type: "range", label: "Çözelti hacmi", min: 100, max: 1000, step: 50, v: 250, unit: " mL", color: "#7dd3fc" },
      { type: "button", label: "💧 Seyrelt (+100 mL)", primary: true, act: (s) => { s.V = Math.min(1000, s.V + 100); } }],
    init(s) { s.col = 0; },
    tick(s, dt) { const M = s.m / 159.6 / (s.V / 1000); s.col = lerp(s.col, clamp(M / .8, 0, 1), 1 - Math.pow(.03, dt)); },
    draw(D, s, t) {
      const c = D.ctx; D.bg("warm"); D.candle(60, 430, t);
      const col = mix("#e0f2fe", "#1e3a8a", s.col);
      const fill = s.V / 1000;
      // balon joje
      const x = 270, y = 440, R = 110;
      c.save(); c.beginPath(); c.arc(x, y - R, R, 0, TAU); c.rect(x - 16, y - R * 2 - 150, 32, 160); c.clip();
      const top = y - fill * (R * 2 + 120);
      c.fillStyle = rgba(col, .85); c.fillRect(x - R, top, R * 2, y - top + 5);
      c.restore();
      c.strokeStyle = "rgba(226,240,255,.6)"; c.lineWidth = 2; c.beginPath(); c.arc(x, y - R, R, -Math.PI / 2 + .15, Math.PI * 1.5 - .15); c.stroke();
      c.beginPath(); c.moveTo(x - 16, y - R * 2 + 2); c.lineTo(x - 16, y - R * 2 - 150); c.moveTo(x + 16, y - R * 2 + 2); c.lineTo(x + 16, y - R * 2 - 150); c.stroke(); c.lineWidth = 1;
      c.strokeStyle = "#fde68a"; c.beginPath(); c.moveTo(x - 22, y - R * 2 - 110); c.lineTo(x + 22, y - R * 2 - 110); c.stroke(); D.text("1000 mL", x + 26, y - R * 2 - 106, { size: 10, color: "#fde68a" });
      D.glow(x, y - R, 160, col, .15 + s.col * .2);
      // kolorimetre
      D.panel(470, 30, 460, 120, "Kolorimetre · soğurma", "#38bdf8");
      const g = c.createLinearGradient(490, 0, 910, 0); g.addColorStop(0, "#e0f2fe"); g.addColorStop(1, "#1e3a8a"); c.fillStyle = g; D.rr(490, 70, 420, 22, 11); c.fill();
      const px = 490 + 420 * s.col; c.fillStyle = "#fff"; c.beginPath(); c.moveTo(px, 66); c.lineTo(px - 7, 56); c.lineTo(px + 7, 56); c.fill();
      D.mono("A ≈ " + fx(s.col * 1.6, 2), 490, 120, { size: 12 });
      // hesap
      const n = s.m / 159.6, M = n / (s.V / 1000), mass = s.V * 1.0 + s.m, pct = s.m / mass * 100, ppm = s.m / mass * 1e6;
      D.panel(470, 170, 460, 330, "Derişim hesapları", "#f6c86a");
      const L = [["n = m / MA", fx(s.m, 1) + " / 159,6 = " + fx(n, 4) + " mol"], ["M = n / V", fx(n, 4) + " / " + fx(s.V / 1000, 2) + " L = " + fx(M, 3) + " M"], ["Kütlece %", fx(s.m, 1) + " / " + fx(mass, 0) + " · 100 = %" + fx(pct, 2)], ["ppm", fx(ppm, 0) + " ppm"], ["Seyreltme", "M·V = " + fx(M, 3) + " · " + fx(s.V / 1000, 2) + " = " + fx(n, 4) + " (sabit)"]];
      L.forEach(([a, b], i) => { D.text(a, 490, 214 + i * 56, { size: 12, weight: 700, color: "#7dd3fc" }); D.mono(b, 490, 236 + i * 56, { size: 12 }); });
    },
    readout: (s) => { const n = s.m / 159.6, M = n / (s.V / 1000); return [["Molarite", fx(M, 3) + " M", true], ["Mol", fx(n, 4)], ["Hacim", s.V + " mL"]]; },
    note: (s) => { const n = s.m / 159.6, M = n / (s.V / 1000); return "Çözeltide " + fx(n, 4) + " mol CuSO4 var; derişim " + fx(M, 3) + " M. Su ekleyerek seyreltirsen renk açılır ama mol sayısı değişmez. Hacim iki katına çıkarsa derişim yarıya iner."; }
  });

  /* 16) Donmayan iksir — 10-8 */
  const SOLU = { seker: { l: "Şeker (C12H22O11)", i: 1, col: "#fef3c7" }, nacl: { l: "NaCl", i: 2, col: "#f8fafc" }, cacl2: { l: "CaCl2", i: 3, col: "#e0f2fe" } };
  A.register({
    id: "donmayan-iksir", topic: "10-8", icon: "❄️", title: "Donmayan İksir",
    lead: "Kış gecesi kapı önündeki kovalar donuyor; tuzlu olan ise donmuyor! Çözünen türünü ve miktarını değiştir, donma ve kaynama noktalarını ölç.",
    goal: "Donma noktası alçalmasını ve kaynama noktası yükselmesini tanecik sayısıyla ilişkilendirmek.",
    materials: ["Beher", "Termometre", "Şeker, NaCl, CaCl2", "Buz–tuz banyosu", "Isıtıcı"],
    steps: ["Bir çözünen seç.", "Molal derişimi ayarla.", "Donma ya da kaynama modunu seç ve termometreyi oku.", "Eşit derişimde üç maddeyi karşılaştır."],
    safety: "Buz–tuz karışımı −20 °C'ye kadar soğuyabilir; çıplak elle uzun süre dokunulmamalıdır.",
    learn: "Koligatif özellikler çözünen taneciklerin sayısına bağlıdır. NaCl suda 2, CaCl2 3 tanecik verir; aynı molalitede CaCl2 donma noktasını en çok düşürür. ΔT = K · m · i.",
    controls: [{ k: "s", type: "select", label: "Çözünen", options: Object.entries(SOLU).map(([v, o]) => ({ v, l: o.l })) },
      { k: "m", type: "range", label: "Molalite", min: 0, max: 3, step: .1, v: 1, unit: " m", color: "#7dd3fc", fmt: (v) => fx(v, 1) },
      { k: "mode", type: "select", label: "Ölçüm", options: [{ v: "fp", l: "Donma noktası" }, { v: "bp", l: "Kaynama noktası" }] }],
    init(s) { s.T = 0; s.bub = []; },
    target(s) { const S = SOLU[s.s]; return s.mode === "fp" ? -1.86 * s.m * S.i : 100 + .52 * s.m * S.i; },
    tick(s, dt) { s.T = lerp(s.T, this.target(s), 1 - Math.pow(.04, dt)); },
    draw(D, s, t) {
      const c = D.ctx, S = SOLU[s.s]; D.bg(s.mode === "fp" ? "night" : "warm");
      const fp = s.mode === "fp";
      if (!fp) D.burner(240, 520, 50, "#60a5fa", t);
      else { c.fillStyle = "rgba(186,230,253,.15)"; D.rr(100, 300, 280, 180, 10); c.fill(); for (let k = 0; k < 22; k++) { c.fillStyle = "rgba(224,242,254,.5)"; c.fillRect(110 + (k * 41) % 260, 310 + (k * 29) % 150, 18, 14); } }
      D.beaker(240, 460, 170, 190, { fill: .6, color: S.col, alpha: .35, inner: (tp) => {
        if (fp) { const pure = s.m < .05; const crystals = pure ? 1 : clamp(1 - s.m / 1.2, 0, 1) * .2; for (let k = 0; k < 40 * (pure ? 1 : crystals); k++) { c.strokeStyle = "rgba(255,255,255,.8)"; const x = 170 + (k * 37) % 140, y = tp + 14 + (k * 23) % 140; c.beginPath(); for (let a = 0; a < 6; a++) { c.moveTo(x, y); c.lineTo(x + Math.cos(a) * 7, y + Math.sin(a) * 7); } c.stroke(); } }
        else D.bubbles(s.bub, tp, 170, 310, 456, 1.2, 1 / 60);
        for (let k = 0; k < Math.min(90, s.m * 12 * S.i); k++) { c.fillStyle = k % S.i === 0 ? "#a78bfa" : "#4ade80"; c.beginPath(); c.arc(170 + (k * 47 + t * 10) % 140, tp + 20 + (k * 31) % 130, 2.4, 0, TAU); c.fill(); }
      } });
      D.thermo(400, 440, 240, s.T, fp ? -18 : 98, fp ? 2 : 110, { right: true, fmt: (v) => fx(v, 2) });
      D.panel(480, 30, 450, 470, fp ? "Donma noktası alçalması" : "Kaynama noktası yükselmesi", "#7dd3fc");
      const K = fp ? 1.86 : .52;
      const ser = Object.entries(SOLU).map(([k, o]) => ({ pts: [[0, 0], [3, K * 3 * o.i]], color: k === s.s ? "#f6c86a" : "rgba(243,234,214,.25)", w: k === s.s ? 2.5 : 1.2 }));
      const G = D.graph(490, 50, 430, 300, { xmin: 0, xmax: 3, ymin: 0, ymax: fp ? 17 : 5, xlabel: "molalite (m)", ylabel: "ΔT (°C)", ticksX: [0, 1, 2, 3], series: ser.concat([{ pts: [[s.m, K * s.m * S.i]], color: "#7dd3fc", dot: true }]) });
      Object.entries(SOLU).forEach(([k, o]) => D.text("i = " + o.i, G.X(3) - 4, G.Y(K * 3 * o.i) - 6, { size: 10, align: "right", color: k === s.s ? "#f6c86a" : "rgba(243,234,214,.4)" }));
      D.mono("ΔT = K · m · i = " + fx(K, 2) + " · " + fx(s.m, 1) + " · " + S.i + " = " + fx(K * s.m * S.i, 2) + " °C", 500, 390, { size: 13 });
      D.mono((fp ? "Donma noktası = 0 − " : "Kaynama noktası = 100 + ") + fx(K * s.m * S.i, 2) + " = " + fx(this.target(s), 2) + " °C", 500, 418, { size: 13, color: "#fde68a" });
      D.text(fp ? "Kd(su) = 1,86 °C/m" : "Kk(su) = 0,52 °C/m", 500, 456, { size: 11, color: "rgba(243,234,214,.6)" });
    },
    readout(s) { const S = SOLU[s.s]; return [["i (tanecik)", S.i], [s.mode === "fp" ? "Donma noktası" : "Kaynama noktası", fx(this.target(s), 2) + " °C", true], ["ΔT", fx(Math.abs(this.target(s) - (s.mode === "fp" ? 0 : 100)), 2) + " °C"]]; },
    note(s) { const S = SOLU[s.s]; return s.m < .05 ? "Saf su " + (s.mode === "fp" ? "0 °C'de donar." : "100 °C'de kaynar.") + " Çözünen ekleyerek değişimi izle." : S.l + " suda " + S.i + " tanecik verir. Tanecikler su moleküllerinin " + (s.mode === "fp" ? "düzenli buz kristali kurmasını zorlaştırır; donma noktası düşer." : "buhar fazına geçişini zorlaştırır (buhar basıncı düşer); kaynama noktası yükselir.") + " Aynı molalitede CaCl2 > NaCl > şeker sıralamasını grafikte gör."; }
  });

  /* 17) Ağlayan heykel — 10-9 */
  A.register({
    id: "aglayan-heykel", topic: "10-9", icon: "🏛️", title: "Ağlayan Mermer Heykel",
    lead: "Fabrika bacalarından yükselen dumanı ayarla, yılları hızlandır ve köy meydanındaki mermer simyacı heykelinin kaderini değiştir.",
    goal: "Asit yağmurlarının oluşumunu, mermere etkisini ve emisyon azaltma çözümlerini incelemek.",
    materials: ["Fabrika modeli", "Yağmur bulutu", "pH kâğıdı", "Mermer (CaCO3) heykel"],
    steps: ["SO2 ve NOx salımlarını ayarla.", "Yağmurun pH'ını ve rengini izle.", "Zamanı akıt ve heykelin aşınmasını gözle.", "Baca filtresini aç; yenilenebilir enerji oranını artır ve sonucu karşılaştır."],
    safety: "SO2 ve NO2 zehirli gazlardır; asit yağmuru deneyleri okulda ancak mikro ölçekli ve kapalı düzeneklerle yapılır.",
    learn: "SO2 ve NOx atmosferde su buharıyla H2SO4 ve HNO3'e dönüşür. Temiz yağmurun pH'ı CO2 nedeniyle yaklaşık 5,6'dır; asit yağmuru daha düşüktür. Asit, mermerdeki CaCO3'ü çözer: CaCO3 + H2SO4 → CaSO4 + H2O + CO2. Baca filtreleri (desülfürizasyon) ve yenilenebilir enerji salımları azaltır.",
    controls: [{ k: "so2", type: "range", label: "SO2 salımı", min: 0, max: 100, step: 5, v: 60, unit: " %", color: "#facc15" },
      { k: "nox", type: "range", label: "NOx salımı", min: 0, max: 100, step: 5, v: 40, unit: " %", color: "#fb923c" },
      { k: "ren", type: "range", label: "Yenilenebilir enerji", min: 0, max: 100, step: 10, v: 10, unit: " %", color: "#4ade80" },
      { k: "filt", type: "toggle", label: "🧰 Baca filtresi", color: "#4ade80" },
      { type: "button", label: "↺ Heykeli onar", act: (s) => { s.ero = 0; s.year = 0; } }],
    init(s) { s.ero = 0; s.year = 0; s.drops = []; s.smoke = []; },
    pH(s) { const f = (1 - s.ren / 100) * (s.filt ? .3 : 1); const acid = (s.so2 * 1.2 + s.nox * .8) / 200 * f; return 5.6 - acid * 2.4; },
    tick(s, dt) { const pH = this.pH(s); s.year += dt * 2; s.ero = clamp(s.ero + dt * Math.max(0, 5.6 - pH) * .025, 0, 1); const f = (1 - s.ren / 100) * (s.filt ? .3 : 1); if (Math.random() < (s.so2 + s.nox) / 200 * f * 1.2) s.smoke.push({ x: 120 + Math.random() * 10, y: 150, vx: 20 + Math.random() * 20, vy: -18 - Math.random() * 10, r: 8, life: 0, max: 5, color: "120,113,108", a: .45 }); if (Math.random() < .6) s.drops.push({ x: 300 + Math.random() * 560, y: 140, v: 260 + Math.random() * 80 }); s.drops.forEach((d) => (d.y += d.v * dt)); s.drops = s.drops.filter((d) => d.y < 440); },
    draw(D, s, t) {
      const c = D.ctx, pH = this.pH(s); D.bg("night");
      // gökyüzü
      const sky = c.createLinearGradient(0, 0, 0, 430); sky.addColorStop(0, mix("#0f172a", "#3f3f46", clamp((5.6 - pH) / 2.4, 0, 1))); sky.addColorStop(1, "rgba(15,23,42,0)"); c.fillStyle = sky; c.fillRect(0, 0, 960, 430);
      // fabrika
      c.fillStyle = "#3f3f46"; c.fillRect(60, 300, 160, 130); c.fillStyle = "#52525b"; c.fillRect(110, 150, 24, 150); c.fillRect(160, 190, 20, 110);
      if (s.filt) { c.fillStyle = "#22c55e"; c.fillRect(106, 230, 32, 14); D.text("filtre", 122, 226, { size: 9, align: "center", color: "#86efac" }); }
      for (let k = 0; k < 8; k++) { c.fillStyle = "rgba(250,204,21," + (.3 + .3 * Math.sin(t * 2 + k)) + ")"; c.fillRect(75 + (k % 4) * 36, 330 + Math.floor(k / 4) * 40, 16, 16); }
      D.smoke(s.smoke, 1 / 60);
      // güneş paneli / rüzgâr
      for (let k = 0; k < Math.round(s.ren / 20); k++) { c.fillStyle = "#1e3a8a"; c.save(); c.translate(250 + k * 46, 410); c.rotate(-.3); c.fillRect(0, 0, 38, 18); c.restore(); }
      // bulut
      for (let k = 0; k < 6; k++) { c.fillStyle = rgba(mix("#94a3b8", "#57534e", clamp((5.6 - pH) / 2.4, 0, 1)), .85); c.beginPath(); c.arc(330 + k * 95, 120 + Math.sin(k) * 10, 50, 0, TAU); c.fill(); }
      const dropCol = pH > 5.4 ? "#7dd3fc" : pH > 4.5 ? "#fde047" : pH > 3.8 ? "#fb923c" : "#ef4444";
      s.drops.forEach((d) => { c.strokeStyle = rgba(dropCol, .7); c.beginPath(); c.moveTo(d.x, d.y); c.lineTo(d.x - 2, d.y + 10); c.stroke(); });
      // heykel
      const hx = 640, hy = 430, e = s.ero;
      c.fillStyle = "#57534e"; c.fillRect(hx - 70, hy - 40, 140, 40);
      c.save(); c.beginPath(); c.rect(hx - 100, 0, 200, hy - 40); c.clip();
      const mar = c.createLinearGradient(hx - 50, 0, hx + 50, 0); mar.addColorStop(0, mix("#f5f5f4", "#a8a29e", e)); mar.addColorStop(1, mix("#e7e5e4", "#78716c", e)); c.fillStyle = mar;
      c.beginPath(); c.moveTo(hx - 45, hy - 40); c.lineTo(hx - 40 + e * 8, hy - 200); c.quadraticCurveTo(hx, hy - 230 + e * 20, hx + 40 - e * 8, hy - 200); c.lineTo(hx + 45, hy - 40); c.fill();
      c.beginPath(); c.arc(hx, hy - 240 + e * 10, 30 - e * 10, 0, TAU); c.fill();
      c.beginPath(); c.moveTo(hx, hy - 290 + e * 30); c.lineTo(hx - 34 + e * 10, hy - 252 + e * 10); c.lineTo(hx + 34 - e * 10, hy - 252 + e * 10); c.fill();
      for (let k = 0; k < e * 40; k++) { c.fillStyle = "rgba(68,64,60,.6)"; c.fillRect(hx - 40 + (k * 17) % 80, hy - 220 + (k * 29) % 180, 3 + (k % 3), 2); }
      if (e > .1) { c.strokeStyle = "rgba(68,64,60,.5)"; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(hx - 10 + k * 7, hy - 238); c.lineTo(hx - 12 + k * 7, hy - 238 + e * 60); c.stroke(); } }
      c.restore();
      D.label("Mermer (CaCO₃)", hx, hy + 18);
      // pH paneli
      D.panel(760, 30, 180, 200, "Yağmur pH", dropCol);
      D.serif(fx(pH, 2), 850, 110, { size: 52, align: "center", color: dropCol });
      D.text(pH > 5.4 ? "normal yağmur" : "asit yağmuru!", 850, 140, { size: 13, align: "center", color: dropCol });
      D.text("Yıl: " + Math.floor(s.year), 850, 175, { size: 12, align: "center" }); D.text("Aşınma: %" + Math.round(e * 100), 850, 198, { size: 12, align: "center" });
    },
    readout(s) { const pH = this.pH(s); return [["Yağmur pH", fx(pH, 2), pH < 5.4], ["Aşınma", "%" + Math.round(s.ero * 100)], ["Önlem", (s.filt ? "Filtre · " : "") + "Yenilenebilir %" + s.ren]]; },
    note(s) { const pH = this.pH(s); return pH > 5.4 ? "Yağmur normal (pH ≈ 5,6). Bu hafif asitlik havadaki CO2'den kaynaklanır ve mermere ciddi zarar vermez. Salımları azaltmak işe yaradı!" : "Asit yağmuru (pH " + fx(pH, 2) + ")! SO2 ve NOx bulutta H2SO4 ile HNO3'e dönüşüyor ve mermerdeki CaCO3'ü çözüyor: CaCO3 + H2SO4 → CaSO4 + H2O + CO2. Baca filtresini aç ya da yenilenebilir enerjiyi artır."; }
  });
})();
