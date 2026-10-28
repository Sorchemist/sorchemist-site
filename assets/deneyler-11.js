/* Sorchemist Simya Atölyesi — 11. sınıf deneyleri */
(() => {
  "use strict";
  const A = SC.Atolye, { clamp, lerp, mix, rgba } = A, TAU = Math.PI * 2;
  const fx = (v, d = 2) => Number(v).toFixed(d).replace(".", ",");
  const sup = (n) => String(n).split("").map((ch) => "⁰¹²³⁴⁵⁶⁷⁸⁹"["0123456789".indexOf(ch)] ?? (ch === "-" ? "⁻" : ch)).join("");
  const sci = (x, d = 2) => { if (!isFinite(x) || x === 0) return "0"; const e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e); return fx(m, d) + "·10" + sup(e); };

  /* 18) Sıcak ve soğuk muskalar — 11-1 */
  const SALT = { nh4no3: { l: "NH4NO3", M: 80, dH: 25.7, col: "#e0f2fe" }, kno3: { l: "KNO3", M: 101, dH: 34.9, col: "#f8fafc" }, nacl: { l: "NaCl", M: 58.5, dH: 3.9, col: "#fefce8" }, naoh: { l: "NaOH", M: 40, dH: -44.5, col: "#fdf2f8" }, cacl2: { l: "CaCl2", M: 111, dH: -81.3, col: "#fef3c7" } };
  A.register({
    id: "sicak-soguk-muska", topic: "11-1", icon: "🌡️", title: "Sıcak ve Soğuk Muskalar",
    lead: "Kalorimetre kabına 100 g su koy ve bir tuz çöz. Termometre yükselecek mi düşecek mi? Muskanın sırrı entalpi değişimindedir.",
    goal: "Çözünme entalpilerini kalorimetreyle ölçmek; endotermik ve ekzotermik olayları ayırt etmek.",
    materials: ["Köpük kalorimetre kabı", "100 g su", "Termometre", "Karıştırıcı", "NH4NO3, KNO3, NaCl, NaOH, CaCl2"],
    steps: ["Bir tuz ve kütle seç.", "'Çöz' düğmesine bas ve karıştır.", "Sıcaklık–zaman grafiğinden ΔT'yi oku.", "q = m·c·ΔT ve ΔH = −q/n ile çözünme entalpisini hesapla."],
    safety: "NaOH çözünürken çok ısınır ve aşındırıcıdır. NH4NO3 güçlü bir oksitleyicidir; ısıtılmamalıdır.",
    learn: "Endotermik çözünmede (NH4NO3) sistem çevreden ısı alır ve su soğur: soğuk kompreslerin sırrı budur. Ekzotermik çözünmede (CaCl2, NaOH) ısı açığa çıkar: sıcak paketler böyle çalışır. q = m·c·ΔT; ΔH = −q / n.",
    controls: [{ k: "salt", type: "select", label: "Tuz", options: Object.entries(SALT).map(([v, o]) => ({ v, l: o.l })), onChange: (s) => A.byId("sicak-soguk-muska").reset(s) },
      { k: "m", type: "range", label: "Kütle", min: 1, max: 20, step: 1, v: 10, unit: " g", color: "#f6c86a", onChange: (s) => A.byId("sicak-soguk-muska").reset(s) },
      { type: "button", label: "🥄 Çöz ve karıştır", primary: true, act: (s) => { if (!s.go) { s.go = true; s.time = 0; } } }],
    reset(s) { s.go = false; s.T = 22; s.time = 0; s.hist = [[0, 22]]; s.p = 0; },
    init(s) { this.reset(s); },
    dT(s) { const S = SALT[s.salt], n = s.m / S.M; return -n * S.dH * 1000 / ((100 + s.m) * 4.18); },
    tick(s, dt) { if (!s.go) return; s.time += dt; s.p = Math.min(1, s.p + dt * .25); s.T = 22 + this.dT(s) * (1 - Math.exp(-s.time * .9)); if (s.time - s.hist[s.hist.length - 1][0] > .15 && s.time < 12) s.hist.push([s.time, s.T]); },
    draw(D, s, t) {
      const c = D.ctx, S = SALT[s.salt], dT = this.dT(s); D.bg(dT > 0 ? "warm" : "night");
      // kalorimetre
      const x = 220, y = 440; c.fillStyle = "#e7e5e4"; D.rr(x - 100, y - 200, 200, 200, 14); c.fill(); c.fillStyle = "#d6d3d1"; D.rr(x - 110, y - 214, 220, 22, 8); c.fill();
      for (let k = 0; k < 30; k++) { c.fillStyle = "rgba(0,0,0,.05)"; c.beginPath(); c.arc(x - 90 + (k * 37) % 180, y - 190 + (k * 53) % 180, 4, 0, TAU); c.fill(); }
      const warm = clamp((s.T - 22) / 20, -1, 1);
      D.glow(x, y - 90, 160, warm > 0 ? "#f97316" : "#38bdf8", Math.abs(warm) * .4);
      c.fillStyle = "#475569"; c.fillRect(x + 40, y - 300, 6, 210);
      c.save(); c.translate(x + 43, y - 120); c.rotate(Math.sin(t * 6) * (s.go ? .3 : 0)); c.fillStyle = "#94a3b8"; c.fillRect(-20, 0, 40, 6); c.restore();
      D.thermo(x - 40, y - 60, 230, s.T, 0, 45, { right: true, fmt: (v) => fx(v, 1) });
      if (!s.go || s.p < 1) { const k = s.go ? 1 - s.p : 1; for (let i = 0; i < 12 * k; i++) { c.fillStyle = S.col; c.fillRect(x + 60 + (i % 4) * 8, (s.go ? y - 90 : y - 260) - Math.floor(i / 4) * 6, 6, 5); } }
      D.label(s.m + " g " + S.l + " · 100 g su", x, y + 24);
      // grafik
      D.panel(390, 30, 540, 280, "Sıcaklık – zaman", "#f6c86a");
      D.graph(400, 50, 520, 250, { xmin: 0, xmax: 12, ymin: 0, ymax: 45, xlabel: "t (s)", ylabel: "T (°C)", ticksY: [0, 22, 45], series: [{ pts: s.hist.concat(s.go ? [[Math.min(s.time, 12), s.T]] : []), color: dT > 0 ? "#fb923c" : "#38bdf8", dot: true }], hlines: [[22, "rgba(243,234,214,.35)", "başlangıç"]] });
      // hesap + enerji diyagramı
      D.panel(390, 330, 300, 180, "Hesap", "#7dd3fc");
      const n = s.m / S.M, q = (100 + s.m) * 4.18 * dT;
      D.mono("n = " + s.m + "/" + S.M + " = " + fx(n, 3) + " mol", 405, 368, { size: 11 });
      D.mono("q = m·c·ΔT = " + fx(q / 1000, 2) + " kJ", 405, 394, { size: 11 });
      D.mono("ΔT = " + (dT > 0 ? "+" : "") + fx(dT, 2) + " °C", 405, 420, { size: 11, color: dT > 0 ? "#fdba74" : "#7dd3fc" });
      D.mono("ΔH = −q/n = " + (S.dH > 0 ? "+" : "") + fx(S.dH, 1) + " kJ/mol", 405, 446, { size: 11, color: "#fde68a" });
      D.text(S.dH > 0 ? "Endotermik ❄" : "Ekzotermik 🔥", 405, 480, { size: 14, weight: 800, color: S.dH > 0 ? "#7dd3fc" : "#fb923c" });
      D.panel(705, 330, 225, 180, "Enerji diyagramı", "#a78bfa");
      const yR = 430, yP = yR - S.dH * .8;
      c.strokeStyle = "#f3ead6"; c.lineWidth = 2; c.beginPath(); c.moveTo(725, yR); c.lineTo(785, yR); c.stroke(); c.strokeStyle = "#a78bfa"; c.beginPath(); c.moveTo(845, yP); c.lineTo(910, yP); c.stroke(); c.lineWidth = 1;
      D.arrow(815, yR, 815, yP, S.dH > 0 ? "#7dd3fc" : "#fb923c"); D.text("girenler", 755, yR + 14, { size: 9, align: "center" }); D.text("ürünler", 877, yP + (S.dH > 0 ? -6 : 14), { size: 9, align: "center" });
    },
    readout(s) { const S = SALT[s.salt]; return [["ΔT", (this.dT(s) > 0 ? "+" : "") + fx(this.dT(s), 2) + " °C", true], ["ΔH(çözünme)", fx(S.dH, 1) + " kJ/mol"], ["Olay", S.dH > 0 ? "Endotermik" : "Ekzotermik"]]; },
    note(s) { const S = SALT[s.salt]; return !s.go ? "Tuzu suya at ve termometreyi izle. Tahminin ne: ısınacak mı, soğuyacak mı?" : S.dH > 0 ? S.l + " çözünürken çevreden (sudan) ısı aldı; su soğudu. Bu endotermik bir olaydır (ΔH > 0). Soğuk kompres paketleri bu prensiple çalışır." : S.l + " çözünürken ısı açığa çıkardı; su ısındı. Bu ekzotermik bir olaydır (ΔH < 0). Sıcak paketler ve buz çözücüler bu prensiple çalışır."; }
  });

  /* 19) Tepe aşan tanecikler — 11-2 */
  A.register({
    id: "tepe-asan-tanecikler", topic: "11-2", icon: "⛰️", title: "Tepe Aşan Tanecikler",
    lead: "Kaptaki tanecikler durmadan çarpışıyor ama yalnızca bazıları ürüne dönüşüyor. Aktivasyon tepesini yükselt, alçalt, sıcaklığı değiştir ve etkin çarpışmaları say.",
    goal: "Çarpışma teorisini, aktivasyon enerjisini ve ortalama tepkime hızını modellemek.",
    materials: ["Tanecik kutusu (model)", "Enerji ölçer", "Kronometre"],
    steps: ["Aktivasyon enerjisini ve ΔH'yi ayarla.", "Sıcaklığı değiştir ve enerji dağılımı grafiğinde Ea'yı aşan alanı izle.", "Derişim–zaman grafiğinden ortalama hızı oku.", "'Yeniden başlat' ile farklı koşulları karşılaştır."],
    safety: "Bu bir modelleme deneyidir.",
    learn: "Bir çarpışmanın ürüne dönüşmesi için tanecikler uygun yönlenmeyle çarpışmalı ve Ea'yı aşan enerjiye sahip olmalıdır. Ea küçüldükçe ya da sıcaklık arttıkça Ea'yı aşan tanecik oranı artar; tepkime hızlanır. ΔH = Ea(ileri) − Ea(geri).",
    controls: [{ k: "Ea", type: "range", label: "Aktivasyon enerjisi (Ea)", min: 20, max: 120, step: 5, v: 60, unit: " kJ", color: "#f59e0b" },
      { k: "dH", type: "range", label: "ΔH", min: -80, max: 60, step: 10, v: -40, unit: " kJ", color: "#a78bfa" },
      { k: "T", type: "range", label: "Sıcaklık", min: 200, max: 600, step: 25, v: 300, unit: " K", color: "#fb923c" },
      { type: "button", label: "↺ Yeniden başlat", act: (s) => A.byId("tepe-asan-tanecikler").reset(s) }],
    reset(s) { s.parts = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * TAU, p: false })); s.time = 0; s.hist = [[0, 1]]; s.eff = 0; s.col = 0; s.fl = []; },
    init(s) { this.reset(s); },
    frac(s) { const kT = s.T / 300 * 14; return Math.exp(-s.Ea / kT); },
    tick(s, dt) {
      const sp = Math.sqrt(s.T / 300) * .32; s.time += dt;
      s.parts.forEach((p) => { p.x += Math.cos(p.a) * sp * dt; p.y += Math.sin(p.a) * sp * dt; if (p.x < 0 || p.x > 1) { p.a = Math.PI - p.a; p.x = clamp(p.x, 0, 1); } if (p.y < 0 || p.y > 1) { p.a = -p.a; p.y = clamp(p.y, 0, 1); } });
      const f = this.frac(s);
      for (let i = 0; i < s.parts.length; i++) for (let j = i + 1; j < s.parts.length; j++) {
        const a = s.parts[i], b = s.parts[j]; if (a.p || b.p) continue;
        if (Math.abs(a.x - b.x) < .025 && Math.abs(a.y - b.y) < .035) { s.col++; const t = a.a; a.a = b.a; b.a = t; if (Math.random() < f * .5 * 3) { a.p = b.p = true; s.eff++; s.fl.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, t: 0 }); } }
      }
      s.fl.forEach((q) => (q.t += dt)); s.fl = s.fl.filter((q) => q.t < .6);
      const r = s.parts.filter((p) => !p.p).length / s.parts.length;
      if (s.time - s.hist[s.hist.length - 1][0] > .25 && s.time < 30) s.hist.push([s.time, r]);
    },
    draw(D, s, t) {
      const c = D.ctx; D.bg("night");
      const bx = 30, by = 30, bw = 330, bh = 300;
      D.panel(bx, by, bw, bh, "Tepkime kabı", "#7dd3fc");
      s.parts.forEach((p) => D.atom(bx + 15 + p.x * (bw - 30), by + 35 + p.y * (bh - 50), 6, p.p ? "#f472b6" : "#60a5fa"));
      s.fl.forEach((q) => { c.strokeStyle = rgba("#fde68a", 1 - q.t / .6); c.beginPath(); c.arc(bx + 15 + q.x * (bw - 30), by + 35 + q.y * (bh - 50), 6 + q.t * 30, 0, TAU); c.stroke(); });
      // enerji profili
      D.panel(380, 30, 270, 300, "Potansiyel enerji", "#f59e0b");
      const yR = 250, yP = yR - s.dH * 1.3, yTop = yR - s.Ea * 1.6;
      c.strokeStyle = "#f59e0b"; c.lineWidth = 2.5; c.beginPath(); c.moveTo(395, yR); c.lineTo(440, yR); c.bezierCurveTo(480, yR, 490, yTop, 515, yTop); c.bezierCurveTo(540, yTop, 550, yP, 590, yP); c.lineTo(635, yP); c.stroke(); c.lineWidth = 1;
      D.arrow(455, yR, 455, yTop + 4, "#fde68a"); D.text("Ea = " + s.Ea, 462, (yR + yTop) / 2, { size: 11, color: "#fde68a" });
      D.arrow(610, yTop, 610, yP - 4, "#c4b5fd"); D.text("Ea(geri) = " + (s.Ea - s.dH), 603, yTop - 6, { size: 10, color: "#c4b5fd", align: "right" });
      D.text("aktifleşmiş kompleks", 515, yTop - 10, { size: 9, align: "center", color: "rgba(243,234,214,.6)" });
      D.text("girenler", 418, yR + 16, { size: 10, align: "center" }); D.text("ürünler", 612, yP + 16, { size: 10, align: "center" });
      // Maxwell–Boltzmann
      D.panel(670, 30, 260, 300, "Enerji dağılımı (model)", "#fb923c");
      const kT = s.T / 300 * 14, pts = [], shade = [];
      for (let E = 0; E <= 130; E += 2) { const y = E / (kT * kT) * Math.exp(-E / kT) * 3.2; pts.push([E, y]); }
      const G = D.graph(675, 50, 250, 270, { xmin: 0, xmax: 130, ymin: 0, ymax: .14, xlabel: "E", ylabel: "tanecik", series: [{ pts, color: "#fb923c" }] });
      c.fillStyle = "rgba(251,146,60,.3)"; c.beginPath(); c.moveTo(G.X(s.Ea), G.Y(0)); pts.filter(([E]) => E >= s.Ea).forEach(([E, y]) => c.lineTo(G.X(E), G.Y(y))); c.lineTo(G.X(130), G.Y(0)); c.fill();
      c.strokeStyle = "#fde68a"; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(G.X(s.Ea), G.Y(0)); c.lineTo(G.X(s.Ea), G.Y(.14)); c.stroke(); c.setLineDash([]);
      // derişim grafiği
      D.panel(30, 350, 900, 160, "[Tepken] – zaman", "#60a5fa");
      const h = s.hist; let avg = 0; if (h.length > 4) { const a = h[0], b = h[h.length - 1]; avg = (a[1] - b[1]) / (b[0] - a[0] || 1); }
      D.graph(40, 368, 880, 140, { xmin: 0, xmax: 30, ymin: 0, ymax: 1, xlabel: "t (s)", ylabel: "oran", series: [{ pts: h, color: "#60a5fa", dot: true }] });
      s.avg = avg;
    },
    readout(s) { return [["Ea'yı aşan oran", fx(this.frac(s) * 100, 2) + " %", true], ["Etkin / toplam çarpışma", s.eff + " / " + s.col], ["Ea(geri)", (s.Ea - s.dH) + " kJ"]]; },
    note(s) { const f = this.frac(s); return "Toplam " + s.col + " çarpışmanın yalnızca " + s.eff + " tanesi etkin oldu. " + (f < .01 ? "Tepe çok yüksek ya da sıcaklık düşük: neredeyse hiçbir tanecik Ea'yı aşamıyor." : f > .2 ? "Taneciklerin önemli bir kısmı tepeyi aşıyor; tepkime hızlı." : "Grafikte turuncu taralı alan, Ea'yı aşan taneciklerdir.") + " Ortalama hız ≈ " + fx(Math.max(0, s.avg || 0), 3) + " (oran/s). ΔH = Ea(ileri) − Ea(geri) = " + s.Ea + " − " + (s.Ea - s.dH) + " = " + s.dH + " kJ."; }
  });

  /* 20) Fil dişi macunu — 11-3 */
  const CAT = { yok: { l: "Katalizör yok", Ea: 75 }, ki: { l: "KI", Ea: 56 }, mno2: { l: "MnO2", Ea: 58 }, maya: { l: "Maya (katalaz)", Ea: 23 } };
  A.register({
    id: "fil-disi-macunu", topic: "11-3", icon: "🐘", title: "Fil Dişi Macunu",
    lead: "Hidrojen peroksit kendi kendine çok yavaş ayrışır. Katalizör, sıcaklık, derişim ve yüzey alanıyla oyna; köpük kulesini en yükseğe çıkar!",
    goal: "Derişim, sıcaklık, katalizör ve temas yüzeyinin tepkime hızına etkisini ölçmek; hız denklemini yorumlamak.",
    materials: ["Dereceli silindir", "H2O2 (%3–30)", "Sıvı sabun", "KI, MnO2, maya", "Mg şerit ve Mg toz, HCl", "Gaz şırıngası"],
    steps: ["Bir mod seç (H2O2 ayrışması veya Mg + HCl).", "Koşulları ayarla ve 'Başlat'a bas.", "Gaz hacmi–zaman grafiğini izle.", "Farklı koşulları aynı grafikte karşılaştır (önceki denemeler soluk çizilir)."],
    safety: "%30 H2O2 deriyi yakar ve güçlü bir oksitleyicidir; gözlük ve eldiven şarttır. Tepkime ekzotermiktir; köpük sıcaktır.",
    learn: "Derişim artınca çarpışma sayısı artar; H2O2 ayrışması birinci derecedir: r = k[H2O2]. Sıcaklık artınca k büyür. Katalizör Ea'yı düşürerek k'yı çok artırır ama ΔH'yi değiştirmez. Toz hâlindeki katı, yüzey alanı büyük olduğu için şeritten çok daha hızlı tepkimeye girer.",
    controls: [{ k: "mode", type: "select", label: "Deney", options: [{ v: "h2o2", l: "H2O2 ayrışması" }, { v: "mg", l: "Mg + HCl (yüzey)" }], onChange: (s) => { s.runs = []; A.byId("fil-disi-macunu").reset(s); } },
      { k: "cat", type: "select", label: "Katalizör", options: Object.entries(CAT).map(([v, o]) => ({ v, l: o.l })) },
      { k: "conc", type: "range", label: "Derişim", min: 3, max: 30, step: 3, v: 12, unit: " %", color: "#38bdf8" },
      { k: "T", type: "range", label: "Sıcaklık", min: 10, max: 60, step: 5, v: 25, unit: " °C", color: "#fb923c" },
      { k: "powder", type: "toggle", label: "🧂 Toz Mg (Mg modu)", color: "#cbd5e1" },
      { type: "button", label: "▶ Başlat", primary: true, act: (s) => { const d = A.byId("fil-disi-macunu"); if (s.cur && s.cur.pts.length > 3) s.runs.push(s.cur); if (s.runs.length > 3) s.runs.shift(); d.reset(s); s.on = true; } }],
    reset(s) { s.on = false; s.time = 0; s.vol = 0; s.cur = { pts: [[0, 0]], color: "#f6c86a" }; s.bub = []; s.foam = []; },
    init(s) { s.runs = []; this.reset(s); },
    k(s) { const R = 8.314e-3, T = s.T + 273; if (s.mode === "h2o2") { const Ea = CAT[s.cat].Ea; return Math.exp(-Ea / (R * T)) / Math.exp(-23 / (R * 298)) * 1.2; } return (s.powder ? 1.1 : .12) * Math.exp(-40 / (R * T)) / Math.exp(-40 / (R * 298)); },
    tick(s, dt) {
      if (!s.on) return; s.time += dt;
      const max = s.mode === "h2o2" ? s.conc * 10 : 100, k = this.k(s) * (s.mode === "mg" ? s.conc / 12 : 1);
      s.vol = max * (1 - Math.exp(-k * s.time * .5));
      const last = s.cur.pts[s.cur.pts.length - 1]; if (s.time - last[0] > .2 && s.time < 20) s.cur.pts.push([s.time, s.vol]);
    },
    draw(D, s, t) {
      const c = D.ctx; D.bg("green");
      const rate = s.on ? (s.mode === "h2o2" ? s.conc * 10 : 100) * this.k(s) * .5 * Math.exp(-this.k(s) * s.time * .5) : 0;
      if (s.mode === "h2o2") {
        const top = D.tube(220, 450, 300, { w: 80, fill: .3, color: "#e0f2fe", alpha: .5 });
        const fh = clamp(s.vol / 300, 0, 1.4) * 330;
        for (let i = 0; i < 40; i++) { const y = top - (i / 40) * fh, x = 220 + Math.sin(i * 1.3 + t * 2) * (14 + i * .5) * clamp(fh / 100, 0, 1); if (y < 450) { c.fillStyle = i % 3 ? "#fef9c3" : "#fde68a"; c.beginPath(); c.arc(x, y, 18, 0, TAU); c.fill(); } }
        D.bubbles(s.bub, top, 190, 250, 446, rate * .4, 1 / 60);
        D.label("H₂O₂ %" + s.conc + " · " + CAT[s.cat].l, 220, 490);
      } else {
        D.flask(220, 450, 1.5, { fill: .45, color: "#e0f2fe", alpha: .4, t, inner: (tp) => {
          if (s.powder) for (let k = 0; k < 40 * (1 - s.vol / 100); k++) { c.fillStyle = "#cbd5e1"; c.fillRect(170 + (k * 13) % 100, 440 - (k % 4) * 3, 2, 2); }
          else { c.fillStyle = "#cbd5e1"; c.fillRect(180, 436, 80 * (1 - s.vol / 100), 6); }
          D.bubbles(s.bub, tp, 160, 280, 444, rate * .5, 1 / 60);
        } });
        D.label((s.powder ? "Toz" : "Şerit") + " Mg · HCl", 220, 490);
      }
      D.thermo(380, 430, 200, s.T, 0, 70, { right: true });
      D.panel(470, 30, 460, 330, "Gaz hacmi – zaman", "#f6c86a");
      const ymax = s.mode === "h2o2" ? 320 : 110;
      D.graph(480, 50, 440, 300, { xmin: 0, xmax: 20, ymin: 0, ymax, xlabel: "t (s)", ylabel: "V (mL)", series: s.runs.map((r) => ({ pts: r.pts, color: "rgba(243,234,214,.25)" })).concat([{ pts: s.cur.pts.concat(s.on ? [[Math.min(s.time, 20), s.vol]] : []), color: "#f6c86a", dot: s.on }]) });
      D.panel(470, 380, 460, 130, "Hız denklemi", "#7dd3fc");
      D.mono(s.mode === "h2o2" ? "2H₂O₂ → 2H₂O + O₂     r = k·[H₂O₂]" : "Mg + 2HCl → MgCl₂ + H₂     r = k·[HCl]ⁿ·(yüzey)", 490, 420, { size: 12 });
      D.mono("k (bağıl) = " + fx(this.k(s), 3) + (s.mode === "h2o2" ? "   Ea = " + CAT[s.cat].Ea + " kJ/mol" : ""), 490, 446, { size: 12, color: "#fde68a" });
      D.mono("Anlık hız ≈ " + fx(rate, 1) + " mL/s", 490, 472, { size: 12 });
    },
    readout(s) { return [["k (bağıl)", fx(this.k(s), 3), true], ["Gaz", fx(s.vol, 0) + " mL"], ["Süre", fx(s.time, 1) + " s"]]; },
    note(s) { if (!s.on) return "Koşulları seç ve başlat. Önceki denemelerin eğrileri soluk renkte kalır; karşılaştırma yapabilirsin."; return s.mode === "h2o2" ? (s.cat === "yok" ? "Katalizör olmadan H2O2 çok yavaş ayrışıyor (Ea = 75 kJ/mol). Bir katalizör ekle!" : CAT[s.cat].l + " katalizörü aktivasyon enerjisini " + CAT[s.cat].Ea + " kJ/mol'e düşürdü; köpük kulesi yükseliyor. Katalizör tepkimeden değişmeden çıkar ve ΔH'yi değiştirmez.") + " Sıcaklığı ve derişimi artırınca eğri daha dikleşir." : (s.powder ? "Toz Mg'nin yüzey alanı çok büyük; asitle çok daha fazla tanecik aynı anda çarpışıyor ve gaz hızla çıkıyor." : "Şerit Mg'de yalnızca dış yüzey asitle temas ediyor; tepkime yavaş. Toz Mg'yi dene!"); }
  });

  /* 21–22) NO2 / N2O4 dengesi ortak çekirdek */
  const R = 8.314e-3, dHf = 57.2; // N2O4 ⇌ 2NO2 ΔH = +57,2 kJ
  const Kc = (T) => 4.6e-3 * Math.exp(-dHf / R * (1 / (T + 273) - 1 / 298)) * 100; // model birimi
  function eqTick(s, dt) {
    // Kararlı çözüm: azot korunumu N = 2a + b sabit; denge b² = K·a → b = [−K/2 + √(K²/4 + 2KN)] / 2
    const K = Kc(s.T), kf = .6 * (s.cat ? 3 : 1), N = 2 * s.a + s.b;
    const beq = (-K / 2 + Math.sqrt(K * K / 4 + 2 * K * N)) / 2;
    s.b = lerp(s.b, beq, 1 - Math.exp(-dt * kf * 1.4)); s.a = Math.max(0, (N - s.b) / 2);
    s.vf = kf * s.a; s.vr = kf / K * s.b * s.b; s.time += dt;
    const last = s.hist[s.hist.length - 1]; if (s.time - last[0] > .15) { s.hist.push([s.time, s.a, s.b]); if (s.hist.length > 220) s.hist.shift(); }
  }
  function eqDraw(D, s, t, title) {
    const c = D.ctx; D.bg("night");
    const tot = s.a + s.b, col = mix("#f8fafc", "#9a3412", clamp(s.b / 1.6, 0, 1));
    // küre
    const cx = 200, cy = 260, Rr = 130 * Math.cbrt(s.V / 1);
    if (s.T > 40) D.glow(cx, cy + Rr, 120, "#f97316", (s.T - 40) / 60 * .4); if (s.T < 15) D.glow(cx, cy + Rr, 120, "#38bdf8", (15 - s.T) / 15 * .4);
    c.fillStyle = rgba(col, .75); c.beginPath(); c.arc(cx, cy, Rr, 0, TAU); c.fill();
    c.strokeStyle = "rgba(226,240,255,.6)"; c.lineWidth = 2; c.stroke(); c.lineWidth = 1;
    c.fillStyle = "rgba(255,255,255,.15)"; c.beginPath(); c.ellipse(cx - Rr * .4, cy - Rr * .45, Rr * .25, Rr * .12, -.6, 0, TAU); c.fill();
    const nB = Math.min(60, Math.round(s.b * 18)), nA = Math.min(40, Math.round(s.a * 9));
    for (let k = 0; k < nB; k++) { const a = k * 2.4 + t * .9, r = Rr * .8 * Math.sqrt((k * 37 % 100) / 100); D.atom(cx + Math.cos(a) * r, cy + Math.sin(a * 1.3) * r * .9, 5, "#c2410c"); }
    for (let k = 0; k < nA; k++) { const a = k * 1.7 - t * .6, r = Rr * .8 * Math.sqrt((k * 53 % 100) / 100), x = cx + Math.cos(a) * r, y = cy + Math.sin(a * 1.2) * r * .9; D.atom(x - 4, y, 5, "#e2e8f0"); D.atom(x + 4, y, 5, "#e2e8f0"); }
    D.label("● NO₂ (kahverengi)   ●● N₂O₄ (renksiz)", cx, cy + Rr + 30);
    // hız çubukları
    D.panel(380, 30, 250, 160, "Hızlar", "#f6c86a");
    const mx = Math.max(s.vf, s.vr, .01);
    [["İleri  N₂O₄ → 2NO₂", s.vf, "#fb923c"], ["Geri  2NO₂ → N₂O₄", s.vr, "#7dd3fc"]].forEach(([l, v, cc], i) => { D.text(l, 395, 70 + i * 52, { size: 11 }); c.fillStyle = "rgba(255,255,255,.08)"; D.rr(395, 78 + i * 52, 220, 12, 6); c.fill(); c.fillStyle = cc; D.rr(395, 78 + i * 52, 220 * v / mx, 12, 6); c.fill(); });
    const Q = s.b * s.b / Math.max(s.a, 1e-6), K = Kc(s.T);
    D.panel(380, 205, 250, 140, "Q ve Kc", "#a78bfa");
    D.mono("Kc = [NO₂]² / [N₂O₄]", 395, 240, { size: 12 }); D.mono("Kc = " + fx(K, 3), 395, 266, { size: 13, color: "#fde68a" }); D.mono("Q  = " + fx(Q, 3), 395, 290, { size: 13 });
    D.text(Math.abs(Q - K) / K < .03 ? "Q = Kc → DENGE" : Q < K ? "Q < Kc → ileri yönde" : "Q > Kc → geri yönde", 395, 324, { size: 12, weight: 800, color: Math.abs(Q - K) / K < .03 ? "#86efac" : "#fdba74" });
    D.panel(650, 30, 280, 315, "Derişim – zaman", "#7dd3fc");
    const t0 = s.hist[0][0];
    D.graph(655, 50, 270, 290, { xmin: t0, xmax: Math.max(t0 + 20, s.time), ymin: 0, ymax: 2.2, xlabel: "t", ylabel: "M", series: [{ pts: s.hist.map((h) => [h[0], h[1]]), color: "#e2e8f0" }, { pts: s.hist.map((h) => [h[0], h[2]]), color: "#fb923c" }] });
    D.text("N₂O₄", 915, 70, { size: 10, align: "right", color: "#e2e8f0" }); D.text("NO₂", 915, 86, { size: 10, align: "right", color: "#fb923c" });
    D.panel(380, 360, 550, 150, title, "#f6c86a");
  }
  A.register({
    id: "dinamik-denge", topic: "11-4", icon: "⚖️", title: "Hiç Durmayan Dans",
    lead: "Kapalı cam küreye renksiz N2O4 ya da kahverengi NO2 koy. Renk bir süre değişip sonra sabitleniyor; ama içerideki dans hiç durmuyor.",
    goal: "Dinamik dengeyi, denge sabitini ve tepkime oranını (Q) gözlemlemek.",
    materials: ["Kapalı cam küre", "N2O4 / NO2 gazı", "Termostat (25 °C)"],
    steps: ["Başlangıç karışımını seç ve 'Başlat'a bas.", "İleri ve geri hız çubuklarının eşitlenmesini izle.", "Q'nun Kc'ye yaklaşmasını takip et.", "Diğer başlangıçla tekrarla: aynı denge oranına ulaşılır!"],
    safety: "NO2 zehirli bir gazdır; yalnızca kapalı tüplerde gösteri olarak kullanılır.",
    learn: "Kapalı sistemde ileri ve geri tepkime hızları eşitlenince denge kurulur. Gözlenebilir özellikler sabit kalır ama tepkimeler iki yönde sürer. Başlangıç nasıl olursa olsun aynı sıcaklıkta Kc değeri aynıdır.",
    controls: [{ k: "start", type: "select", label: "Başlangıç", options: [{ v: "a", l: "Yalnız N2O4 (2 M)" }, { v: "b", l: "Yalnız NO2 (2 M)" }, { v: "ab", l: "Karışık (1 M + 1 M)" }] },
      { type: "button", label: "▶ Başlat", primary: true, act: (s) => A.byId("dinamik-denge").reset(s) }],
    reset(s) { s.a = s.start === "a" ? 2 : s.start === "ab" ? 1 : 0; s.b = s.start === "b" ? 2 : s.start === "ab" ? 1 : 0; s.time = 0; s.hist = [[0, s.a, s.b]]; },
    init(s) { s.T = 25; s.V = 1; s.cat = false; this.reset(s); },
    tick: eqTick,
    draw(D, s, t) { eqDraw(D, s, t, "Gözlem"); const Q = s.b * s.b / Math.max(s.a, 1e-6), K = Kc(s.T); D.text(Math.abs(Q - K) / K < .03 ? "Dengedeyiz! Renk sabit ama iki tepkime aynı hızla sürüyor." : "Sistem dengeye ilerliyor…", 400, 410, { size: 14, color: "#fde68a" }); D.mono("[N₂O₄] = " + fx(s.a, 3) + " M    [NO₂] = " + fx(s.b, 3) + " M", 400, 445, { size: 13 }); },
    readout(s) { const Q = s.b * s.b / Math.max(s.a, 1e-6); return [["Q", fx(Q, 3)], ["Kc (25 °C)", fx(Kc(s.T), 3), true], ["v(ileri)/v(geri)", fx(s.vf / Math.max(s.vr, 1e-6), 2)]]; },
    note(s) { const Q = s.b * s.b / Math.max(s.a, 1e-6), K = Kc(s.T); return Math.abs(Q - K) / K < .03 ? "Denge kuruldu: ileri ve geri hızlar eşit, Q = Kc. Farklı bir başlangıçla tekrar et; derişimler farklı olsa da Kc aynı çıkar." : Q < K ? "Q < Kc: ürün (NO2) oranı az; ileri tepkime daha hızlı ve renk koyulaşıyor." : "Q > Kc: NO2 fazlası var; geri tepkime daha hızlı ve renk açılıyor."; }
  });
  A.register({
    id: "renk-degistiren-kure", topic: "11-5", icon: "🔀", title: "Renk Değiştiren Küreler",
    lead: "Dengedeki NO2–N2O4 küresini buzlu suya sok, kaynar suya daldır, sıkıştır, gaz ekle. Le Chatelier'in ilkesi her seferinde haklı çıkacak mı?",
    goal: "Sıcaklık, hacim–basınç, derişim ve katalizörün dengeye etkisini incelemek.",
    materials: ["NO2/N2O4 dolu kapalı küre", "Buzlu su", "Sıcak su", "Pistonlu şırınga"],
    steps: ["Sıcaklığı değiştir ve rengi izle.", "Hacmi küçült (basıncı artır) ve dengenin kaymasını gözle.", "NO2 veya N2O4 ekle.", "Katalizörü aç: denge kaymaz, sadece daha hızlı kurulur."],
    safety: "NO2 zehirlidir; küreler kapalı ve sağlam olmalıdır.",
    learn: "N2O4 ⇌ 2NO2 tepkimesi endotermiktir. Isıtınca denge ileri (NO2, kahverengi) yöne kayar ve Kc artar. Hacim küçülünce denge gaz mol sayısı az olan N2O4 yönüne kayar. Eklenen madde harcanacak yöne kayılır. Katalizör dengeyi kaydırmaz; Kc'yi yalnızca sıcaklık değiştirir.",
    controls: [{ k: "T", type: "range", label: "Sıcaklık", min: 0, max: 100, step: 5, v: 25, unit: " °C", color: "#fb923c" },
      { k: "V", type: "range", label: "Hacim", min: .5, max: 2, step: .1, v: 1, unit: " L", color: "#38bdf8", fmt: (v) => fx(v, 1), onChange: (s, v) => { const f = s.Vprev / v; s.a *= f; s.b *= f; s.Vprev = v; } },
      { k: "cat", type: "toggle", label: "⚡ Katalizör", color: "#34d399" },
      { type: "button", label: "+ NO₂ ekle", act: (s) => { s.b += .5; } },
      { type: "button", label: "+ N₂O₄ ekle", act: (s) => { s.a += .5; } }],
    init(s) { s.T = 25; s.V = 1; s.Vprev = 1; s.cat = false; const K = Kc(25); s.a = 1; s.b = Math.sqrt(K * 1); s.time = 0; s.hist = [[0, s.a, s.b]]; },
    tick: eqTick,
    draw(D, s, t) { eqDraw(D, s, t, "Le Chatelier yorumu"); D.text(this.note(s).slice(0, 90) + (this.note(s).length > 90 ? "…" : ""), 400, 410, { size: 12, color: "#fde68a" }); D.mono("[N₂O₄] = " + fx(s.a, 3) + " M    [NO₂] = " + fx(s.b, 3) + " M    P ∝ " + fx((s.a + s.b) * (s.T + 273) / 298, 2), 400, 445, { size: 12 }); D.mono("Kc(" + s.T + " °C) = " + fx(Kc(s.T), 3) + (s.cat ? "   (katalizör: Kc değişmez)" : ""), 400, 472, { size: 12 }); },
    readout(s) { const Q = s.b * s.b / Math.max(s.a, 1e-6), K = Kc(s.T); return [["Kc", fx(K, 3), true], ["Q", fx(Q, 3)], ["Renk", s.b > 1.2 ? "koyu kahve" : s.b > .5 ? "kahverengi" : "açık"]]; },
    note(s) { const Q = s.b * s.b / Math.max(s.a, 1e-6), K = Kc(s.T); if (Math.abs(Q - K) / K < .03) return s.T > 50 ? "Sıcak küre koyu kahverengi: ısı verilince denge endotermik (ileri) yöne kaydı, NO2 arttı ve Kc büyüdü." : s.T < 15 ? "Soğuk küre neredeyse renksiz: soğutunca denge ekzotermik (geri) yöne kaydı, N2O4 arttı." : "Sistem dengede. Bir etki uygula: ısıt, soğut, sıkıştır ya da gaz ekle."; return Q < K ? "Denge bozuldu (Q < Kc): sistem etkiyi azaltmak için İLERİ yöne (NO2) kayıyor." : "Denge bozuldu (Q > Kc): sistem etkiyi azaltmak için GERİ yöne (N2O4) kayıyor. Hacim küçüldüyse az mol gazın olduğu tarafa gidiyor."; }
  });

  /* 23) Lambalı asit avcısı — 11-6 */
  const AB = { hcl: { l: "HCl", strong: true, acid: true, K: Infinity }, hno3: { l: "HNO3", strong: true, acid: true, K: Infinity }, ch3cooh: { l: "CH3COOH", acid: true, K: 1.8e-5 }, hf: { l: "HF", acid: true, K: 6.8e-4 }, naoh: { l: "NaOH", strong: true, acid: false, K: Infinity }, nh3: { l: "NH3", acid: false, K: 1.8e-5 }, seker: { l: "Şekerli su", none: true } };
  A.register({
    id: "lambali-asit-avcisi", topic: "11-6", icon: "🍋", title: "Lambalı Asit Avcısı",
    lead: "Eşit derişimli iki asit… biri lambayı parlatıyor, diğeri zor yakıyor. Asidin kuvveti miktarında değil, iyonlaşma derecesindedir.",
    goal: "Kuvvetli ve zayıf asit-bazları iletkenlik ve pH ile ayırt etmek; Ka/Kb değerlerini yorumlamak.",
    materials: ["İletkenlik devresi", "pH metre", "HCl, HNO3, CH3COOH, HF, NaOH, NH3 çözeltileri"],
    steps: ["Bir çözelti ve derişim seç.", "Lambanın parlaklığını ve pH değerini oku.", "Moleküler görünümde iyonlaşmış ve iyonlaşmamış tanecikleri karşılaştır.", "Derişimi değiştir: zayıf asidin iyonlaşma yüzdesi seyreldikçe artar!"],
    safety: "Asitler ve bazlar aşındırıcıdır; derişik çözeltilerle eldiven ve gözlükle çalış. HF özellikle tehlikelidir; okul laboratuvarında kullanılmaz (burada modelleniyor).",
    learn: "Kuvvetli asitler ve bazlar suda tamamen iyonlaşır; çok sayıda iyon lambayı parlak yakar. Zayıf asit ve bazlar kısmen iyonlaşır (Ka, Kb küçük). [H⁺] = √(Ka·C) yaklaşımıyla pH hesaplanır. Brønsted-Lowry: HA + H2O ⇌ H3O⁺ + A⁻; su burada baz gibi davranır.",
    controls: [{ k: "x", type: "select", label: "Çözelti", options: Object.entries(AB).map(([v, o]) => ({ v, l: o.l })) },
      { k: "lc", type: "range", label: "Derişim (log)", min: -3, max: 0, step: .25, v: -1, color: "#38bdf8", fmt: (v) => fx(Math.pow(10, v), 3).replace(/,?0+$/, "") + " M" }],
    calc(s) { const X = AB[s.x], C = Math.pow(10, s.lc); if (X.none) return { ion: 0, pH: 7, alpha: 0, C }; let ion; if (X.strong) ion = C; else { const K = X.K; ion = (-K + Math.sqrt(K * K + 4 * K * C)) / 2; } const pH = X.acid ? -Math.log10(ion + 1e-7) : 14 + Math.log10(ion + 1e-7); return { ion, pH, alpha: ion / C, C }; },
    init(s) { s.b = 0; },
    tick(s, dt) { const r = this.calc(s); s.b = lerp(s.b, clamp(Math.log10(r.ion * 1e4 + 1) / 4, 0, 1), 1 - Math.pow(.05, dt)); },
    draw(D, s, t) {
      const c = D.ctx, X = AB[s.x], r = this.calc(s); D.bg("green");
      D.wire([[130, 300], [130, 110], [230, 110]], "#b45309", 3); D.wire([[290, 110], [380, 110], [380, 300]], "#b45309", 3); D.bulb(260, 110, s.b);
      c.fillStyle = "#334155"; c.fillRect(124, 290, 12, 130); c.fillRect(374, 290, 12, 130);
      const col = X.none ? "#fef9c3" : X.acid ? mix("#fca5a5", "#ef4444", clamp((7 - r.pH) / 7, 0, 1)) : mix("#93c5fd", "#6d28d9", clamp((r.pH - 7) / 7, 0, 1));
      D.beaker(255, 450, 300, 170, { fill: .7, color: col, alpha: .3 });
      D.label(X.l + " · " + fx(r.C, 3) + " M", 255, 478);
      // pH metre
      c.fillStyle = "#1f2937"; D.rr(430, 280, 110, 70, 8); c.fill(); D.mono("pH " + fx(r.pH, 2), 485, 322, { size: 18, align: "center", color: r.pH < 7 ? "#fca5a5" : r.pH > 7 ? "#c4b5fd" : "#86efac" });
      c.strokeStyle = "#94a3b8"; c.beginPath(); c.moveTo(450, 350); c.quadraticCurveTo(420, 380, 330, 400); c.stroke();
      // moleküler görünüm
      D.panel(570, 30, 360, 300, "Moleküler görünüm (50 tanecik)", "#7dd3fc");
      const N = 50, ionN = X.none ? 0 : Math.round(clamp(r.alpha, 0, 1) * N);
      for (let i = 0; i < N; i++) {
        const x = 600 + (i % 10) * 32 + Math.sin(t * 2 + i) * 3, y = 80 + Math.floor(i / 10) * 50 + Math.cos(t * 1.7 + i) * 3;
        if (X.none) { D.atom(x, y, 9, "#fde68a"); continue; }
        if (i < ionN) { D.atom(x - 6, y, 6, X.acid ? "#f87171" : "#a78bfa", { label: X.acid ? "+" : "−" }); D.atom(x + 7, y + 4, 8, X.acid ? "#86efac" : "#fbbf24", { label: X.acid ? "−" : "+" }); }
        else D.atom(x, y, 10, "#94a3b8");
      }
      D.text(X.none ? "Moleküler çözünme: iyon yok" : "Renkli: iyonlar · Gri: iyonlaşmamış", 750, 318, { size: 10, align: "center", color: "#a5f3fc" });
      D.panel(570, 345, 360, 165, "Sabitler", "#f6c86a");
      D.mono(X.none ? "İyonlaşma yok" : X.strong ? (X.acid ? "Kuvvetli asit: %100 iyonlaşır" : "Kuvvetli baz: %100 iyonlaşır") : (X.acid ? "Ka = " : "Kb = ") + sci(X.K), 590, 385, { size: 13 });
      D.mono("İyonlaşma: %" + fx(clamp(r.alpha, 0, 1) * 100, 1), 590, 413, { size: 13, color: "#fde68a" });
      D.mono((X.acid ? "[H⁺] = " : "[OH⁻] = ") + sci(r.ion), 590, 441, { size: 13 });
      D.mono("Ksu = [H⁺][OH⁻] = 1,00·10⁻¹⁴", 590, 469, { size: 12, color: "rgba(253,233,184,.6)" });
    },
    readout(s) { const r = this.calc(s), X = AB[s.x]; return [["pH", fx(r.pH, 2), true], ["İyonlaşma", "%" + fx(clamp(r.alpha, 0, 1) * 100, 1)], ["Tür", X.none ? "Elektrolit değil" : (X.strong ? "Kuvvetli " : "Zayıf ") + (X.acid ? "asit" : "baz")]]; },
    note(s) { const X = AB[s.x], r = this.calc(s); return X.none ? "Şeker moleküler çözünür; iyon oluşmadığı için lamba yanmaz ve pH 7'dir." : X.strong ? X.l + " suda tamamen iyonlaşır; lamba parlak yanar. Derişim " + fx(r.C, 3) + " M olduğu için " + (X.acid ? "[H⁺]" : "[OH⁻]") + " da " + fx(r.C, 3) + " M'dir." : X.l + " zayıf " + (X.acid ? "asittir" : "bazdır") + ": moleküllerin yalnızca %" + fx(r.alpha * 100, 1) + "'i iyonlaştı ve lamba sönük. Seyreltince iyonlaşma yüzdesinin arttığına dikkat et."; }
  });

  /* 24) Pembe damla — 11-7 */
  const IND = { fenol: { l: "Fenolftalein", lo: 8.2, hi: 10, a: "rgba(255,255,255,0)", b: "#ec4899" }, metil: { l: "Metil oranj", lo: 3.1, hi: 4.4, a: "#ef4444", b: "#facc15" }, bromtimol: { l: "Bromtimol mavisi", lo: 6, hi: 7.6, a: "#facc15", b: "#2563eb" } };
  A.register({
    id: "pembe-damla", topic: "11-7", icon: "💗", title: "Pembeye Dönen Damla",
    lead: "Büretten damlayan NaOH, asidi damla damla nötrleştiriyor. Tek bir damla daha… ve çözelti kalıcı olarak pembeleşiyor! Eşdeğerlik noktasını yakala.",
    goal: "Asit–baz titrasyonunu yapmak; titrasyon eğrisini çizmek, eşdeğerlik noktasını ve uygun indikatörü belirlemek.",
    materials: ["Büret (0,100 M NaOH)", "Erlenmayer (25,0 mL asit)", "İndikatörler", "pH metre"],
    steps: ["Asit türünü ve indikatörü seç.", "Musluğu aç ya da damla damla ekle.", "Renk değişimini ve titrasyon eğrisini izle.", "Eşdeğerlik noktasındaki hacmi ve pH'ı oku; asidin derişimini hesapla."],
    safety: "NaOH ve asitler aşındırıcıdır. Büret göz hizasının altında doldurulmalıdır.",
    learn: "Eşdeğerlik noktasında mol(H⁺) = mol(OH⁻) olur. Kuvvetli asit–kuvvetli baz titrasyonunda bu noktada pH 7'dir; zayıf asit–kuvvetli baz titrasyonunda pH 7'den büyüktür. İndikatörün renk dönüm aralığı eğrinin dik kısmına denk gelmelidir.",
    controls: [{ k: "acid", type: "select", label: "Asit (25 mL, 0,100 M)", options: [{ v: "hcl", l: "HCl (kuvvetli)" }, { v: "ch3cooh", l: "CH3COOH (zayıf)" }], onChange: (s) => A.byId("pembe-damla").reset(s) },
      { k: "ind", type: "select", label: "İndikatör", options: Object.entries(IND).map(([v, o]) => ({ v, l: o.l, dot: o.b })) },
      { k: "flow", type: "toggle", label: "🚰 Musluğu aç", color: "#38bdf8" },
      { type: "button", label: "💧 1 damla (0,05 mL)", primary: true, act: (s) => { s.Vb = Math.min(50, s.Vb + .05); s.drops.push({ y: 0 }); A.byId("pembe-damla").rec(s); SC.Sound && SC.Sound.drip(); } },
      { type: "button", label: "+1 mL", act: (s) => { s.Vb = Math.min(50, s.Vb + 1); A.byId("pembe-damla").rec(s); } },
      { type: "button", label: "↺ Yeniden", act: (s) => A.byId("pembe-damla").reset(s) }],
    pH(s, Vb = s.Vb) {
      const Ca = .1, Va = 25, Cb = .1, na = Ca * Va, nb = Cb * Vb, V = Va + Vb;
      if (s.acid === "hcl") { if (Math.abs(nb - na) < 1e-9) return 7; return nb < na ? -Math.log10((na - nb) / V) : 14 + Math.log10((nb - na) / V); }
      const Ka = 1.8e-5;
      if (nb === 0) return -Math.log10(Math.sqrt(Ka * Ca));
      if (nb < na - 1e-9) return -Math.log10(Ka) + Math.log10(nb / (na - nb));
      if (Math.abs(nb - na) < 1e-9) { const Cs = na / V; return 14 + Math.log10(Math.sqrt(1e-14 / Ka * Cs)); }
      return 14 + Math.log10((nb - na) / V);
    },
    rec(s) { s.pts.push([s.Vb, this.pH(s)]); },
    reset(s) { s.Vb = 0; s.pts = [[0, this.pH(s, 0)]]; s.drops = []; s.flow = false; s.sync && s.sync(); },
    init(s) { s.drops = []; this.reset(s); },
    tick(s, dt) { if (s.flow && s.Vb < 50) { s.Vb = Math.min(50, s.Vb + dt * 1.2); if (Math.random() < .5) s.drops.push({ y: 0 }); const last = s.pts[s.pts.length - 1]; if (s.Vb - last[0] > .25) this.rec(s); } s.drops.forEach((d) => (d.y += dt * 260)); s.drops = s.drops.filter((d) => d.y < 140); },
    color(s) { const I = IND[s.ind], p = this.pH(s), f = clamp((p - I.lo) / (I.hi - I.lo), 0, 1); return s.ind === "fenol" ? { c: "#ec4899", a: f * .75 } : { c: mix(I.a, I.b, f), a: .6 }; },
    draw(D, s, t) {
      const c = D.ctx; D.bg("warm");
      D.stand(150, 440, 400);
      // büret
      c.fillStyle = "rgba(255,255,255,.06)"; c.fillRect(214, 30, 18, 240); c.strokeStyle = "rgba(226,240,255,.6)"; c.strokeRect(214.5, 30.5, 18, 240);
      c.fillStyle = "rgba(147,197,253,.55)"; c.fillRect(216, 32 + s.Vb / 50 * 236, 15, 236 - s.Vb / 50 * 236);
      for (let k = 0; k <= 10; k++) { c.strokeStyle = "rgba(226,240,255,.35)"; c.beginPath(); c.moveTo(214, 32 + k * 23.6); c.lineTo(222, 32 + k * 23.6); c.stroke(); D.text(k * 5 + "", 210, 36 + k * 23.6, { size: 9, align: "right", color: "rgba(243,234,214,.45)" }); }
      c.fillStyle = s.flow ? "#38bdf8" : "#94a3b8"; c.fillRect(208, 272, 30, 7); c.fillRect(221, 279, 4, 22);
      s.drops.forEach((d) => { c.fillStyle = "rgba(147,197,253,.85)"; c.beginPath(); c.ellipse(223, 306 + d.y, 3, 4, 0, 0, TAU); c.fill(); });
      const C = this.color(s);
      D.flask(223, 445, 1.15, { fill: .35 + s.Vb / 50 * .4, color: C.a > .02 ? C.c : "#f8fafc", alpha: C.a > .02 ? Math.max(.25, C.a) : .25, t, glow: s.ind === "fenol" ? C.a * .3 : 0 });
      const pH = this.pH(s);
      c.fillStyle = "#1f2937"; D.rr(320, 330, 110, 60, 8); c.fill(); D.mono("pH " + fx(pH, 2), 375, 366, { size: 16, align: "center", color: pH < 7 ? "#fca5a5" : pH > 7 ? "#c4b5fd" : "#86efac" });
      D.mono("V(NaOH) = " + fx(s.Vb, 2) + " mL", 375, 410, { size: 12, align: "center" });
      // eğri
      D.panel(460, 30, 470, 480, "Titrasyon eğrisi", "#f6c86a");
      const theo = []; for (let v = 0; v <= 50; v += .25) theo.push([v, this.pH(s, v)]);
      const I = IND[s.ind];
      const G = D.graph(470, 50, 450, 450, { xmin: 0, xmax: 50, ymin: 0, ymax: 14, xlabel: "V(NaOH) mL", ylabel: "pH", ticksX: [0, 10, 20, 25, 30, 40, 50], ticksY: [0, 7, 14], series: [{ pts: theo, color: "rgba(243,234,214,.15)", dash: [3, 4] }, { pts: s.pts.concat([[s.Vb, pH]]), color: "#f6c86a", dot: true }] });
      c.fillStyle = rgba(I.b, .12); c.fillRect(G.X(0), G.Y(I.hi), G.X(50) - G.X(0), G.Y(I.lo) - G.Y(I.hi)); D.text(I.l + " aralığı", G.X(50) - 6, G.Y(I.hi) - 4, { size: 9, align: "right", color: I.b === "rgba(255,255,255,0)" ? "#fff" : I.b });
      c.strokeStyle = "rgba(134,239,172,.6)"; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(G.X(25), G.Y(0)); c.lineTo(G.X(25), G.Y(14)); c.stroke(); c.setLineDash([]);
      D.text("eşdeğerlik: 25,0 mL", G.X(25) + 4, G.Y(1.2), { size: 10, color: "#86efac" });
    },
    readout(s) { const pH = this.pH(s); return [["pH", fx(pH, 2), true], ["Eklenen NaOH", fx(s.Vb, 2) + " mL"], ["Eşdeğerlik pH", s.acid === "hcl" ? "7,00" : fx(this.pH(s, 25), 2)]]; },
    note(s) { const pH = this.pH(s), I = IND[s.ind], eqpH = this.pH(s, 25), good = eqpH >= I.lo - 1 && eqpH <= I.hi + .6; if (s.Vb < 24) return "Asit hâlâ fazla. Damla damla devam et; eşdeğerlik noktası 25,0 mL'de (mol asit = mol baz)."; if (s.Vb >= 24 && s.Vb < 26) return "Eğrinin en dik bölgesindesin! Tek damla pH'ı birkaç birim değiştirebilir. " + (good ? I.l + " bu titrasyon için uygun." : I.l + " bu titrasyonda erken/geç renk değiştirir; " + (s.acid === "hcl" ? "kuvvetli asit–kuvvetli baz için fenolftalein veya bromtimol mavisi iyi seçimdir." : "zayıf asit titrasyonunda eşdeğerlik pH'ı ≈ 8,7 olduğundan fenolftalein seçilmelidir.")); return "Baz fazlası eklendi; pH " + fx(pH, 2) + ". Asidin derişimi: Ma = Mb·Vb / Va = 0,100 · 25,0 / 25,0 = 0,100 M."; }
  });

  /* 25) Beyaz bulut — 11-8 */
  const KSP = { agcl: { l: "AgCl", K: 1.8e-10, type: "1:1", ion: "Cl⁻", col: "#f8fafc", sol: "NaCl" }, agbr: { l: "AgBr", K: 5.0e-13, type: "1:1", ion: "Br⁻", col: "#fef9c3", sol: "NaBr" }, pbi2: { l: "PbI2", K: 9.8e-9, type: "1:2", ion: "I⁻", col: "#facc15", sol: "KI" }, caf2: { l: "CaF2", K: 3.9e-11, type: "1:2", ion: "F⁻", col: "#f1f5f9", sol: "NaF" } };
  function solS(X, c) { if (X.type === "1:1") return (-c + Math.sqrt(c * c + 4 * X.K)) / 2; let lo = 0, hi = 1; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (m * Math.pow(2 * m + c, 2) > X.K) hi = m; else lo = m; } return lo; }
  A.register({
    id: "beyaz-bulut", topic: "11-8", icon: "☁️", title: "Beyaz Bulut",
    lead: "Az çözünen bir tuzun doymuş çözeltisine ortak iyon ekle; berrak sıvıda beliren bulut, dengenin katı yönüne kaydığını gösterir.",
    goal: "Kçç, molar çözünürlük ve ortak iyon etkisini incelemek.",
    materials: ["AgCl, AgBr, PbI2, CaF2 doymuş çözeltileri", "NaCl, NaBr, KI, NaF çözeltileri", "Beher"],
    steps: ["Bir tuz seç.", "Ortak iyon derişimini artır.", "Molar çözünürlüğün nasıl azaldığını ve çöken katıyı izle.", "Kçç ile s arasındaki ilişkiyi hesap panelinde incele."],
    safety: "Gümüş tuzları deride kalıcı leke bırakır; kurşun bileşikleri zehirlidir.",
    learn: "AgCl(k) ⇌ Ag⁺ + Cl⁻; Kçç = [Ag⁺][Cl⁻]. Saf suda s = √Kçç. Ortak iyon eklenince Q > Kçç olur ve denge katı yönüne kayar; çözünürlük azalır ama Kçç değişmez.",
    controls: [{ k: "salt", type: "select", label: "Tuz", options: Object.entries(KSP).map(([v, o]) => ({ v, l: o.l, dot: o.col })) },
      { k: "lc", type: "range", label: "Ortak iyon (log M)", min: -6, max: -1, step: .25, v: -6, color: "#a78bfa", fmt: (v) => v <= -6 ? "≈ 0" : "10" + sup(v) + " M" }],
    init(s) { s.ppt = 0; s.flakes = []; },
    calc(s) { const X = KSP[s.salt], c = s.lc <= -6 ? 0 : Math.pow(10, s.lc), s0 = solS(X, 0), s1 = solS(X, c); return { X, c, s0, s1, ratio: s1 / s0 }; },
    tick(s, dt) { const r = this.calc(s); s.ppt = lerp(s.ppt, 1 - r.ratio, 1 - Math.pow(.05, dt)); if (Math.random() < s.ppt * 1.5) s.flakes.push({ x: 140 + Math.random() * 200, y: 230 + Math.random() * 60, v: 20 + Math.random() * 30 }); s.flakes.forEach((f) => (f.y = Math.min(436, f.y + f.v * dt))); if (s.flakes.length > 300) s.flakes.splice(0, 40); },
    draw(D, s, t) {
      const c = D.ctx, r = this.calc(s); D.bg("night");
      D.beaker(240, 445, 240, 230, { fill: .7, color: r.X.l === "PbI2" ? "#fef9c3" : "#e0f2fe", alpha: .25, inner: () => {
        c.fillStyle = rgba(r.X.col, .9); c.beginPath(); c.moveTo(130, 445); c.quadraticCurveTo(240, 445 - 20 - s.ppt * 40, 350, 445); c.fill();
        s.flakes.forEach((f) => { c.fillStyle = rgba(r.X.col, .8); c.fillRect(f.x, f.y, 3, 3); });
        const ions = Math.round(clamp(Math.log10(r.s1 / 1e-9) * 5, 2, 40));
        for (let k = 0; k < ions; k++) { D.atom(140 + (k * 47 + t * 12) % 200, 260 + (k * 31) % 150, 4, k % 2 ? "#cbd5e1" : "#a78bfa"); }
      } });
      D.label(r.X.l + " doymuş çözeltisi + " + r.X.sol, 240, 475);
      D.panel(420, 30, 510, 210, "Hesap", "#a78bfa");
      D.mono(r.X.l + "(k) ⇌ " + (r.X.type === "1:1" ? "M⁺ + " + r.X.ion : "M²⁺ + 2" + r.X.ion), 440, 70, { size: 13 });
      D.mono("Kçç = " + sci(r.X.K) + (r.X.type === "1:1" ? "  =  s·(s + c)" : "  =  s·(2s + c)²"), 440, 98, { size: 13 });
      D.mono("Saf suda s₀ = " + sci(r.s0) + " M", 440, 132, { size: 13 });
      D.mono("c = " + (r.c ? sci(r.c) : "0") + " M → s = " + sci(r.s1) + " M", 440, 160, { size: 13, color: "#fde68a" });
      D.mono("Çözünürlük %" + fx(r.ratio * 100, r.ratio < .01 ? 3 : 1) + "'e düştü", 440, 190, { size: 13, color: "#86efac" });
      D.mono("Kçç değişmez (yalnızca sıcaklıkla değişir)", 440, 218, { size: 11, color: "rgba(253,233,184,.6)" });
      D.panel(420, 260, 510, 250, "log s – ortak iyon", "#f6c86a");
      const pts = []; for (let L = -6; L <= -1; L += .1) pts.push([L, Math.log10(solS(r.X, L <= -6 ? 0 : Math.pow(10, L)))]);
      D.graph(430, 275, 490, 230, { xmin: -6, xmax: -1, ymin: -12, ymax: -2, xlabel: "log c", ylabel: "log s", ticksX: [-6, -4, -2], ticksY: [-12, -8, -4], series: [{ pts, color: "#a78bfa" }, { pts: [[s.lc, Math.log10(r.s1)]], color: "#f6c86a", dot: true }] });
    },
    readout(s) { const r = this.calc(s); return [["Kçç", sci(r.X.K)], ["s", sci(r.s1) + " M", true], ["Çöken oran", "%" + fx((1 - r.ratio) * 100, 1)]]; },
    note(s) { const r = this.calc(s); return r.c === 0 ? r.X.l + " saf suda çok az çözünür: s = " + sci(r.s0) + " M. Ortak iyon derişimini artırarak ne olacağını gözle." : "Ortak iyon (" + r.X.ion + ") eklendi; Q > Kçç oldu ve denge katı yönüne kaydı. Fazla iyonlar " + r.X.l + " olarak çöktü (bulut). Çözünürlük " + sci(r.s1) + " M'ye düştü; Kçç ise aynı kaldı."; }
  });

  /* 26) Mayalı enerji — 11-9 */
  A.register({
    id: "mayali-enerji", topic: "11-9", icon: "🍃", title: "Mayalı Enerji (Yeşil Hidrojen)",
    lead: "Şekerli atık suya bakteri kültürü ekle ve kavanozu kapat. Balon hidrojenle şişsin! Koşulları ayarla ve en verimli yeşil hidrojen reaktörünü kur.",
    goal: "Karanlık fermantasyonla hidrojen üretimini etkileyen faktörleri (sıcaklık, pH, substrat, oksijen) incelemek.",
    materials: ["Kavanoz biyoreaktör", "Şekerli su / gıda atığı", "Anaerobik bakteri kültürü", "Balon", "pH metre", "Su banyosu"],
    steps: ["Sıcaklığı, pH'ı ve şeker derişimini ayarla.", "Oksijen girişini kapalı tut.", "'Mayala' düğmesine bas ve hidrojen hacmi grafiğini izle.", "Bir koşulu değiştirip tekrarla; en yüksek verimi bul."],
    safety: "Hidrojen yanıcıdır; balon alev ve kıvılcımdan uzak tutulmalıdır. Mikroorganizma kültürleriyle eldivenle çalışılmalıdır.",
    learn: "Karanlık fermantasyonda anaerobik bakteriler şekeri oksijensiz ortamda parçalar ve H2 açığa çıkarır. Mezofilik bakteriler için en uygun koşullar yaklaşık 35–37 °C ve pH 5,5 civarıdır. Oksijen bu bakterileri baskılar. Substrat arttıkça üretim artar ama belirli bir noktadan sonra doygunluğa ulaşır.",
    controls: [{ k: "T", type: "range", label: "Sıcaklık", min: 15, max: 65, step: 1, v: 30, unit: " °C", color: "#fb923c" },
      { k: "pH", type: "range", label: "pH", min: 3.5, max: 8.5, step: .1, v: 6.5, color: "#a78bfa", fmt: (v) => fx(v, 1) },
      { k: "S", type: "range", label: "Şeker", min: 0, max: 40, step: 2, v: 10, unit: " g/L", color: "#fde68a" },
      { k: "o2", type: "toggle", label: "💨 Oksijen girişi", color: "#f87171" },
      { type: "button", label: "🧫 Mayala", primary: true, act: (s) => { if (s.cur.pts.length > 3) { s.runs.push(s.cur); if (s.runs.length > 3) s.runs.shift(); } s.on = true; s.time = 0; s.vol = 0; s.cur = { pts: [[0, 0]] }; } }],
    init(s) { s.on = false; s.time = 0; s.vol = 0; s.runs = []; s.cur = { pts: [[0, 0]] }; s.bub = []; },
    rate(s) { const fT = Math.exp(-Math.pow((s.T - 36) / 9, 2)), fpH = Math.exp(-Math.pow((s.pH - 5.5) / .9, 2)), fS = s.S / (6 + s.S), fO = s.o2 ? .08 : 1; return 14 * fT * fpH * fS * fO; },
    tick(s, dt) { if (!s.on) return; s.time += dt; const cap = s.S * 22; s.vol = Math.min(cap, s.vol + this.rate(s) * dt * (1 - s.vol / Math.max(cap, .01))); const last = s.cur.pts[s.cur.pts.length - 1]; if (s.time - last[0] > .25 && s.time < 30) s.cur.pts.push([s.time, s.vol]); },
    draw(D, s, t) {
      const c = D.ctx; D.bg("green");
      D.beaker(220, 440, 200, 120, { fill: .7, color: "#7dd3fc", alpha: .2 });
      const top = D.beaker(220, 432, 130, 200, { fill: .55, color: mix("#fef3c7", "#a3e635", s.S / 40), alpha: .55, inner: (tp) => {
        for (let k = 0; k < 40; k++) { const x = 165 + (k * 29 + t * 8 * (k % 3)) % 110, y = tp + 15 + (k * 41) % 150; c.fillStyle = "rgba(132,204,22,.7)"; c.beginPath(); c.ellipse(x, y, 4, 2, k, 0, TAU); c.fill(); }
        D.bubbles(s.bub, tp, 165, 275, 428, s.on ? this.rate(s) * .12 : 0, 1 / 60);
      } });
      c.fillStyle = "#78350f"; c.fillRect(150, 226, 140, 12);
      c.fillStyle = "#a1a1aa"; c.fillRect(214, 206, 12, 20);
      const R = 10 + Math.cbrt(s.vol) * 14; D.balloon(220, 208, R, "#4ade80"); if (R > 18) D.text("H₂", 220, 208 - R + 5, { size: 14, weight: 800, align: "center", color: "#052e16" });
      if (s.o2) { for (let k = 0; k < 5; k++) D.text("O₂", 120 + Math.sin(t + k) * 10, 300 + k * 24, { size: 11, color: "#fca5a5" }); }
      D.thermo(360, 420, 200, s.T, 10, 70, { right: true });
      D.panel(470, 30, 460, 300, "Hidrojen hacmi – zaman", "#4ade80");
      D.graph(480, 50, 440, 270, { xmin: 0, xmax: 30, ymin: 0, ymax: 900, xlabel: "t (gün, model)", ylabel: "V(H₂) mL", series: s.runs.map((r) => ({ pts: r.pts, color: "rgba(243,234,214,.22)" })).concat([{ pts: s.cur.pts.concat(s.on ? [[Math.min(s.time, 30), s.vol]] : []), color: "#4ade80", dot: s.on }]) });
      D.panel(470, 350, 460, 160, "Verim göstergeleri", "#f6c86a");
      const fT = Math.exp(-Math.pow((s.T - 36) / 9, 2)), fpH = Math.exp(-Math.pow((s.pH - 5.5) / .9, 2));
      [["Sıcaklık uygunluğu", fT], ["pH uygunluğu", fpH], ["Oksijensiz ortam", s.o2 ? .08 : 1]].forEach(([l, v], i) => { const y = 395 + i * 34; D.text(l, 490, y + 4, { size: 12 }); c.fillStyle = "rgba(255,255,255,.08)"; D.rr(660, y - 7, 250, 12, 6); c.fill(); c.fillStyle = v > .7 ? "#4ade80" : v > .35 ? "#facc15" : "#f87171"; D.rr(660, y - 7, 250 * v, 12, 6); c.fill(); });
    },
    readout(s) { return [["Üretim hızı", fx(this.rate(s), 1) + " mL/gün", true], ["Toplam H₂", fx(s.vol, 0) + " mL"], ["Koşul", s.o2 ? "Oksijen var ✗" : "Anaerobik ✓"]]; },
    note(s) { const r = this.rate(s); return s.o2 ? "Oksijen girişi açık! Anaerobik fermantasyon bakterileri oksijenle baskılanır; hidrojen üretimi neredeyse durdu." : r > 8 ? "Harika koşullar! Sıcaklık ve pH bakteriler için ideal aralıkta; balon hızla şişiyor. Bu hidrojen fosil yakıt kullanmadan, atıktan üretildiği için 'yeşil' sayılır." : "Üretim düşük. İpucu: mezofilik bakteriler yaklaşık 35–37 °C ve pH ≈ 5,5'i sever. Şeker miktarını da artırmayı dene."; }
  });
})();
