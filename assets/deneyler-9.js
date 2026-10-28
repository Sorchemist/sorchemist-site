/* Sorchemist Simya Atölyesi — 9. sınıf deneyleri */
(() => {
  "use strict";
  const A = SC.Atolye, { clamp, lerp, mix, rgba } = A, TAU = Math.PI * 2;

  /* 1) Güvenlik Mührü — 9-1 */
  const PICTO = {
    yanici: { l: "Yanıcı", g: "🔥", c: "#ef4444" },
    oksit: { l: "Oksitleyici", g: "⭕", c: "#f59e0b" },
    asindirici: { l: "Aşındırıcı", g: "🧪", c: "#a855f7" },
    zehirli: { l: "Akut zehirli", g: "☠️", c: "#e5e7eb" },
    cevre: { l: "Çevreye zararlı", g: "🐟", c: "#22c55e" },
    saglik: { l: "Ciddi sağlık tehlikesi", g: "⚕️", c: "#38bdf8" }
  };
  const BOTTLES = [
    { n: "Etanol", f: "C2H5OH", c: "#e0f2fe", ok: ["yanici"], why: "Etanol buharı kolayca tutuşur. Açık alevden uzak tutulmalıdır." },
    { n: "Derişik sülfürik asit", f: "H2SO4", c: "#fef3c7", ok: ["asindirici"], why: "Derişik H2SO4 deri ve metalleri aşındırır. Gözlük ve eldiven gerekir." },
    { n: "%30 Hidrojen peroksit", f: "H2O2", c: "#ecfeff", ok: ["oksit", "asindirici"], why: "Derişik H2O2 güçlü bir oksitleyicidir ve yanmayı şiddetlendirir; ayrıca aşındırıcıdır." },
    { n: "Cıva", f: "Hg", c: "#cbd5e1", ok: ["zehirli", "saglik", "cevre"], why: "Cıva buharı çok zehirlidir, vücutta birikir ve su canlılarına kalıcı zarar verir." },
    { n: "Aseton", f: "C3H6O", c: "#f1f5f9", ok: ["yanici"], why: "Aseton çok uçucu ve yanıcı bir çözücüdür." },
    { n: "Sodyum hidroksit", f: "NaOH", c: "#f8fafc", ok: ["asindirici"], why: "NaOH kuvvetli bir bazdır; deriyi ve gözü ciddi şekilde yakar." },
    { n: "Bakır(II) sülfat", f: "CuSO4", c: "#38bdf8", ok: ["cevre"], why: "Bakır sülfat su canlıları için çok zehirlidir; lavaboya dökülmemelidir." },
    { n: "Potasyum nitrat", f: "KNO3", c: "#f8fafc", ok: ["oksit"], why: "KNO3 bir oksitleyicidir; barutun ana bileşenlerinden biridir." }
  ];
  A.register({
    id: "guvenlik-muhru", topic: "9-1", icon: "🛡️", title: "Güvenlik Mührü",
    lead: "Simyacı loncasının raflarındaki şişelerin etiketleri silinmiş! Doğru tehlike mührünü seç ve şişeye vurarak laboratuvarı güvenli hâle getir.",
    goal: "Laboratuvarda kullanılan maddelerle tehlike piktogramlarını doğru eşleştirmek.",
    materials: ["8 kimyasal şişesi", "GHS tehlike piktogramları", "Simyacı mührü"],
    steps: ["Sağdaki panelden bir tehlike mührü seç.", "Mührü vurmak için ilgili şişeye tıkla.", "Bütün şişeler doğru mühürlenene kadar devam et."],
    safety: "Gerçek laboratuvarda etiketi okunmayan bir şişe asla kullanılmaz; sorumlu öğretmene teslim edilir.",
    learn: "Tehlike piktogramları evrensel bir dildir. Alev yanıcıyı, alev üstünde daire oksitleyiciyi, aşınan el ve yüzey aşındırıcıyı, kafatası akut zehirliliği, ölü balık ve ağaç çevreye zararlılığı gösterir.",
    controls: [{ k: "seal", type: "select", label: "Tehlike mührü", options: Object.entries(PICTO).map(([v, p]) => ({ v, l: p.g + " " + p.l })) },
      { type: "button", label: "↺ Mühürleri sıfırla", act: (s) => { s.sealed = {}; s.msg = ""; s.score = 0; s.tries = 0; } }],
    init(s) { s.sealed = {}; s.msg = ""; s.score = 0; s.tries = 0; s.fx = []; },
    pos(i) { return { x: 110 + (i % 4) * 230, y: i < 4 ? 250 : 420 }; },
    click(s, x, y) {
      BOTTLES.forEach((b, i) => {
        const p = this.pos(i);
        if (Math.abs(x - p.x) < 50 && y > p.y - 120 && y < p.y + 10) {
          s.tries++;
          const ok = b.ok.includes(s.seal);
          if (ok) { if (!s.sealed[i]) s.score++; s.sealed[i] = s.seal; s.msg = "✓ " + b.n + ": " + b.why; SC.Sound && SC.Sound.chime(880, .03, 1); }
          else { s.msg = "✗ " + b.n + " için “" + PICTO[s.seal].l + "” uygun değil. İpucu: " + b.why; SC.Sound && SC.Sound.fail(); s.shake = { i, t: .4 }; }
          s.fx.push({ i, ok, t: 0 });
        }
      });
    },
    tick(s, dt) { if (s.shake) { s.shake.t -= dt; if (s.shake.t <= 0) s.shake = null; } s.fx.forEach((f) => (f.t += dt)); s.fx = s.fx.filter((f) => f.t < 1); },
    draw(D, s, t) {
      const c = D.ctx; D.bg("warm"); D.candle(40, 430, t); D.candle(920, 430, t, .9);
      c.fillStyle = "#2a1a0e"; c.fillRect(30, 262, 900, 8); c.fillRect(30, 432, 900, 0);
      BOTTLES.forEach((b, i) => {
        const p = this.pos(i), sh = s.shake && s.shake.i === i ? Math.sin(t * 60) * 4 : 0, x = p.x + sh, y = p.y;
        D.glow(x, y - 50, 80, s.sealed[i] ? "#34d399" : "#f6c86a", s.sealed[i] ? .18 : .05);
        c.fillStyle = rgba(b.c, .25); D.rr(x - 34, y - 100, 68, 100, 10); c.fill(); c.strokeStyle = "rgba(226,240,255,.55)"; c.lineWidth = 2; c.stroke(); c.lineWidth = 1;
        c.fillStyle = rgba(b.c, .55); D.rr(x - 30, y - 60, 60, 56, 8); c.fill();
        c.fillStyle = "#5b3a22"; c.fillRect(x - 12, y - 118, 24, 18);
        D.parchment(x - 44, y - 92, 88, 30);
        D.text(b.n.length > 14 ? b.n.slice(0, 13) + "…" : b.n, x, y - 79, { size: 10, weight: 700, color: "#2a170d", align: "center" });
        D.mono(b.f.replace(/(\d)/g, (m) => "₀₁₂₃₄₅₆₇₈₉"[m]), x, y - 67, { size: 10, color: "#7a3f0e", align: "center" });
        const sl = s.sealed[i];
        if (sl) {
          const P = PICTO[sl]; c.save(); c.translate(x, y - 30); c.rotate(Math.PI / 4);
          c.fillStyle = "#fff"; c.fillRect(-15, -15, 30, 30); c.strokeStyle = "#dc2626"; c.lineWidth = 3; c.strokeRect(-15, -15, 30, 30); c.restore();
          D.text(P.g, x, y - 23, { size: 18, align: "center" });
        } else D.text("?", x, y - 22, { size: 26, weight: 800, color: "rgba(42,23,13,.45)", align: "center" });
      });
      s.fx.forEach((f) => { const p = this.pos(f.i); c.strokeStyle = rgba(f.ok ? "#34d399" : "#f87171", 1 - f.t); c.lineWidth = 3; c.beginPath(); c.arc(p.x, p.y - 50, 40 + f.t * 60, 0, TAU); c.stroke(); c.lineWidth = 1; });
      const P = PICTO[s.seal];
      D.panel(330, 18, 300, 54, "Elindeki mühür", "#f6c86a");
      D.text(P.g + "  " + P.l, 480, 58, { size: 18, weight: 700, align: "center", color: "#fde9b8" });
      if (s.pointer.in) { D.text(P.g, s.pointer.x + 14, s.pointer.y - 8, { size: 22 }); }
    },
    readout: (s) => [["Doğru mühür", s.score + " / " + BOTTLES.length, s.score === BOTTLES.length], ["Deneme", s.tries], ["Başarı", s.tries ? Math.round(100 * s.score / Math.max(s.tries, 1)) + "%" : "—"]],
    note: (s) => s.score === BOTTLES.length ? "Tebrikler! Bütün şişeler doğru mühürlendi. Lonca laboratuvarı artık güvenli." : (s.msg || "Bir mühür seç ve şişeye tıkla. Bazı maddeler birden fazla tehlike taşır; uygun mühürlerden herhangi biri kabul edilir.")
  });

  /* 2) Alev testi — 9-2 */
  const SALTS = {
    LiCl: { l: "LiCl", c: "#ef4444", name: "lityum", lines: [[671, "#ef4444", 1], [610, "#f97316", .4]] },
    NaCl: { l: "NaCl", c: "#facc15", name: "sodyum", lines: [[589, "#facc15", 1], [589.6, "#facc15", .9]] },
    KCl: { l: "KCl", c: "#c084fc", name: "potasyum", lines: [[766, "#991b1b", .9], [770, "#7f1d1d", .7], [404, "#7c3aed", .5]] },
    CaCl2: { l: "CaCl2", c: "#fb923c", name: "kalsiyum", lines: [[622, "#f97316", 1], [554, "#a3e635", .5], [423, "#6366f1", .4]] },
    SrCl2: { l: "SrCl2", c: "#dc2626", name: "stronsiyum", lines: [[650, "#dc2626", 1], [606, "#f97316", .6], [461, "#3b82f6", .5]] },
    BaCl2: { l: "BaCl2", c: "#a3e635", name: "baryum", lines: [[554, "#a3e635", 1], [524, "#4ade80", .8]] },
    CuCl2: { l: "CuCl2", c: "#2dd4bf", name: "bakır", lines: [[515, "#22c55e", 1], [522, "#4ade80", .8], [465, "#38bdf8", .6]] }
  };
  const wl2x = (w) => 548 + (w - 380) / (780 - 380) * 380;
  A.register({
    id: "alev-testi", topic: "9-2", icon: "🔥", title: "Fenerdeki Renkler (Alev Testi)",
    lead: "Aqualf'ın feneri her tuzla farklı bir renge bürünüyor. Teli tuza batır, alevde tut ve elektronların ışık imzasını oku.",
    goal: "Elektronların enerji seviyeleri arasındaki geçişlerinin her element için kendine özgü renkler oluşturduğunu gözlemlemek.",
    materials: ["Bunsen beki", "Platin (nikrom) tel", "LiCl, NaCl, KCl, CaCl2, SrCl2, BaCl2, CuCl2 tuzları", "Spektroskop"],
    steps: ["Bir tuz seç.", "'Teli aleve tut' düğmesine bas ya da sahneye tıklayıp basılı tut.", "Alevin rengini ve spektroskoptaki çizgileri gözlemle.", "Enerji diyagramında elektronun üst seviyeye çıkıp geri inişini izle."],
    safety: "Bunsen bekiyle çalışırken saçlar toplanmalı, koruyucu gözlük takılmalıdır. Baryum ve bakır tuzları zehirlidir.",
    learn: "Isı enerjisini soğuran elektronlar üst enerji seviyelerine çıkar. Geri inerken aradaki enerji farkını belirli dalga boyunda ışık olarak yayarlar. Enerji seviyeleri her element için farklı olduğundan çizgi spektrumu bir parmak izi gibidir.",
    controls: [{ k: "salt", type: "select", label: "Tuz", options: Object.entries(SALTS).map(([v, o]) => ({ v, l: o.l, dot: o.c })) },
      { type: "button", label: "🔥 Teli aleve tut", primary: true, act: (s) => { s.hold = 2.2; } }],
    init(s) { s.hold = 0; s.k = 0; s.e = []; },
    click(s) { s.hold = 2.2; },
    tick(s, dt) {
      const on = s.hold > 0 || s.pointer.down; if (s.hold > 0) s.hold -= dt;
      s.k = lerp(s.k, on ? 1 : 0, 1 - Math.pow(.02, dt));
      if (on && Math.random() < dt * 3) s.e.push({ p: 0 });
      s.e.forEach((e) => (e.p += dt * .8)); s.e = s.e.filter((e) => e.p < 1);
    },
    draw(D, s, t) {
      const c = D.ctx, S = SALTS[s.salt]; D.bg("night");
      const fx = 230, fy = 440;
      D.burner(fx, fy, 0, "#60a5fa", t, false);
      D.flame(fx, fy - 48, 110, mix("#60a5fa", S.c, s.k), t);
      if (s.k > .1) D.glow(fx, fy - 120, 220, S.c, .25 * s.k);
      // tel
      const wx = fx + 80 - s.k * 70, wy = fy - 110;
      c.strokeStyle = "#94a3b8"; c.lineWidth = 2; c.beginPath(); c.moveTo(wx + 140, wy - 60); c.lineTo(wx + 8, wy); c.stroke();
      c.beginPath(); c.arc(wx, wy, 7, 0, TAU); c.stroke(); c.lineWidth = 1;
      c.fillStyle = "#5b3a22"; c.fillRect(wx + 135, wy - 70, 50, 14);
      // tuz kabı
      D.beaker(420, 440, 70, 40, { fill: .5, color: "#e5e7eb", alpha: .5 }); D.label(S.l, 420, 470);
      // Spektroskop paneli
      D.panel(530, 30, 410, 150, "Çizgi spektrumu (dalga boyu, nm)", "#7dd3fc");
      const sx0 = 548, sx1 = 928, sy = 70;
      for (let x = sx0; x < sx1; x++) { const w = 380 + (x - sx0) / (sx1 - sx0) * 400; c.fillStyle = rgba(wlColor(w), .12); c.fillRect(x, sy, 1, 70); }
      S.lines.forEach(([w, col, a]) => { const x = wl2x(w); c.fillStyle = rgba(col, a * s.k); c.fillRect(x - 1.5, sy, 3, 70); if (s.k > .5) D.glow(x, sy + 35, 26, col, .4 * a * s.k); if (s.k > .5) D.mono(Math.round(w) + "", x, sy + 84, { size: 9, align: "center", color: "rgba(253,233,184,.8)" }); });
      [400, 500, 600, 700].forEach((w) => D.text(w + "", wl2x(w), sy + 98, { size: 9, color: "rgba(243,234,214,.4)", align: "center" }));
      // Enerji seviyeleri
      D.panel(530, 200, 410, 210, "Bohr enerji seviyeleri", "#c084fc");
      const lv = [380, 320, 280, 258]; lv.forEach((y, i) => { c.strokeStyle = "rgba(243,234,214,.35)"; c.beginPath(); c.moveTo(600, y); c.lineTo(880, y); c.stroke(); D.text("n = " + (i + 1), 590, y + 4, { size: 10, align: "right", color: "rgba(243,234,214,.5)" }); });
      D.atom(560, 300, 14, "#f6c86a", { label: "+" });
      s.e.forEach((e, k) => {
        const x = 650 + (k % 4) * 55;
        if (e.p < .45) { const y = lerp(lv[0], lv[2], e.p / .45); D.atom(x, y, 6, "#7dd3fc"); D.arrow(x - 16, lv[0], x - 16, lv[2] + 4, "rgba(251,146,60,.7)"); D.text("ısı", x - 22, (lv[0] + lv[2]) / 2, { size: 9, align: "right", color: "#fb923c" }); }
        else { const q = (e.p - .45) / .55, y = lerp(lv[2], lv[0], q); D.atom(x, y, 6, "#7dd3fc"); c.strokeStyle = rgba(S.c, 1 - q); c.lineWidth = 2; c.beginPath(); for (let i = 0; i < 30; i++) { const xx = x + 10 + i * 3, yy = y - 10 + Math.sin(i * .9 - t * 12) * 4; i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); c.lineWidth = 1; }
      });
      D.text("Işık (foton)", 860, 245, { size: 10, align: "right", color: S.c });
    },
    readout: (s) => { const S = SALTS[s.salt]; return [["Element", S.name], ["Alev rengi", s.k > .5 ? colorName(s.salt) : "mavi (boş alev)", s.k > .5], ["Baskın çizgi", S.lines[0][0] + " nm"]]; },
    note: (s) => s.k > .5 ? "Alev " + colorName(s.salt) + " renkte! " + SALTS[s.salt].name.replace(/^./, (m) => m.toLocaleUpperCase("tr")) + " atomlarında üst seviyeye çıkan elektronlar geri inerken ışık yayıyor. Spektroskopta yalnızca belirli renklerde çizgiler var; sürekli bir gökkuşağı yok." : "Teli alevde tut. Isı elektronları uyarır; geri dönüşte yayılan ışığın rengi elementi ele verir."
  });
  function colorName(k) { return { LiCl: "kırmızı", NaCl: "parlak sarı", KCl: "lila", CaCl2: "turuncu-kırmızı", SrCl2: "koyu kırmızı", BaCl2: "elma yeşili", CuCl2: "mavi-yeşil" }[k]; }
  function wlColor(w) { if (w < 440) return "#6d28d9"; if (w < 490) return "#2563eb"; if (w < 510) return "#06b6d4"; if (w < 580) return "#22c55e"; if (w < 600) return "#facc15"; if (w < 640) return "#f97316"; return "#dc2626"; }

  /* 3) Kristal harita — 9-3 */
  const EL = [
    ["H", 1, 1, 1, 53, 1312, 2.20], ["He", 2, 1, 8, 31, 2372, null], ["Li", 3, 2, 1, 167, 520, .98], ["Be", 4, 2, 2, 112, 899, 1.57], ["B", 5, 2, 3, 87, 801, 2.04], ["C", 6, 2, 4, 67, 1086, 2.55], ["N", 7, 2, 5, 56, 1402, 3.04], ["O", 8, 2, 6, 48, 1314, 3.44], ["F", 9, 2, 7, 42, 1681, 3.98], ["Ne", 10, 2, 8, 38, 2081, null],
    ["Na", 11, 3, 1, 190, 496, .93], ["Mg", 12, 3, 2, 145, 738, 1.31], ["Al", 13, 3, 3, 118, 578, 1.61], ["Si", 14, 3, 4, 111, 786, 1.90], ["P", 15, 3, 5, 98, 1012, 2.19], ["S", 16, 3, 6, 88, 1000, 2.58], ["Cl", 17, 3, 7, 79, 1251, 3.16], ["Ar", 18, 3, 8, 71, 1521, null], ["K", 19, 4, 1, 243, 419, .82], ["Ca", 20, 4, 2, 194, 590, 1.00]
  ];
  const PROP = { r: { l: "Atom yarıçapı", i: 4, u: " pm", c: "#38bdf8", max: 243 }, ie: { l: "1. iyonlaşma enerjisi", i: 5, u: " kJ/mol", c: "#f59e0b", max: 2372 }, en: { l: "Elektronegatiflik", i: 6, u: "", c: "#a78bfa", max: 3.98 } };
  A.register({
    id: "kristal-harita", topic: "9-3", icon: "🧭", title: "Aqualf'ın Kristal Haritası",
    lead: "İlk 20 elementin kristal küreleri duvarda asılı. Bir özellik seç; küreler büyüyüp küçülerek periyodik eğilimleri gözünün önüne sersin.",
    goal: "Atom yarıçapı, iyonlaşma enerjisi ve elektronegatifliğin periyot ve grup boyunca değişimini keşfetmek.",
    materials: ["İlk 20 elementin kristal modeli", "Özellik ölçer"],
    steps: ["Bir periyodik özellik seç.", "Kürelerin büyüklüğünü ve parlaklığını karşılaştır.", "Bir elementin üzerine gel veya tıkla; değerini oku.", "Alttaki grafikte atom numarasına göre tekrar eden deseni bul."],
    safety: "Bu bir modelleme deneyidir; gerçek laboratuvar güvenliği gerektirmez.",
    learn: "Periyotta soldan sağa çekirdek yükü artar: yarıçap küçülür, iyonlaşma enerjisi ve elektronegatiflik artar. Grupta aşağı inildikçe katman sayısı artar: yarıçap büyür, iyonlaşma enerjisi ve elektronegatiflik azalır. Değerlerin her periyotta tekrar etmesi 'periyodiklik' demektir.",
    controls: [{ k: "p", type: "select", label: "Özellik", options: Object.entries(PROP).map(([v, o]) => ({ v, l: o.l, dot: o.c })) }],
    init(s) { s.sel = 10; s.k = {}; },
    cell(e) { return { x: 70 + (e[3] - 1) * 78, y: 70 + (e[2] - 1) * 74 }; },
    click(s, x, y) { EL.forEach((e, i) => { const p = this.cell(e); if (Math.hypot(x - p.x, y - p.y) < 34) s.sel = i; }); },
    tick(s, dt) { const P = PROP[s.p]; EL.forEach((e, i) => { const v = e[P.i]; s.k[i] = lerp(s.k[i] ?? .5, v == null ? 0 : v / P.max, 1 - Math.pow(.01, dt)); }); },
    draw(D, s, t) {
      const c = D.ctx, P = PROP[s.p]; D.bg("night");
      if (s.pointer.in) EL.forEach((e, i) => { const p = this.cell(e); if (Math.hypot(s.pointer.x - p.x, s.pointer.y - p.y) < 34) s.sel = i; });
      ["1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A"].forEach((g, i) => D.label(g, 70 + i * 78, 30));
      [1, 2, 3, 4].forEach((p) => D.label(p + ". per.", 22, 74 + (p - 1) * 74));
      EL.forEach((e, i) => {
        const p = this.cell(e), k = s.k[i] || 0, v = e[P.i];
        const r = s.p === "r" ? 8 + k * 26 : 14 + k * 14;
        if (v != null) D.glow(p.x, p.y, r * 2.2, P.c, s.p === "r" ? .12 : .1 + k * .5);
        D.atom(p.x, p.y, r, v == null ? "#475569" : mix("#1e293b", P.c, .35 + k * .65));
        D.text(e[0], p.x, p.y + 5, { size: 13, weight: 800, align: "center", color: "#fff", shadow: true });
        if (i === s.sel) { c.strokeStyle = "#fff"; c.lineWidth = 1.5; c.beginPath(); c.arc(p.x, p.y, r + 6, 0, TAU); c.stroke(); c.lineWidth = 1; }
      });
      // eğilim okları
      D.arrow(70, 375, 600, 375, rgba(P.c, .8)); D.arrow(660, 70, 660, 290, rgba(P.c, .8));
      const rowT = s.p === "r" ? "periyotta azalır →" : "periyotta artar →", colT = s.p === "r" ? "grupta artar ↓" : "grupta azalır ↓";
      D.text(rowT, 335, 368, { size: 11, align: "center", color: P.c }); D.text(colT, 672, 185, { size: 11, color: P.c });
      // detay
      const e = EL[s.sel];
      D.panel(700, 40, 240, 250, "Seçilen element", P.c);
      D.serif(e[0], 820, 130, { size: 64, align: "center", color: P.c });
      D.text("Z = " + e[1] + " · " + e[2] + ". periyot · " + e[3] + "A", 820, 160, { align: "center", size: 12 });
      D.mono("r = " + e[4] + " pm", 720, 200, { size: 12 }); D.mono("İE₁ = " + e[5] + " kJ/mol", 720, 222, { size: 12 }); D.mono("EN = " + (e[6] ?? "—"), 720, 244, { size: 12 });
      if (e[6] == null) D.text("Soy gaz: elektronegatiflik tanımlanmaz", 720, 268, { size: 10, color: "rgba(243,234,214,.5)" });
      // grafik
      D.panel(30, 395, 900, 130, P.l + " · atom numarasına göre", P.c);
      D.bars(40, 410, 880, 112, EL.map((x, i) => ({ l: x[0], v: x[P.i] ?? 0, c: P.c, hi: i === s.sel })), { max: P.max });
    },
    readout: (s) => { const e = EL[s.sel], P = PROP[s.p]; return [["Element", e[0] + " (Z=" + e[1] + ")"], [P.l, (e[P.i] ?? "—") + (e[P.i] != null ? P.u : ""), true], ["Konum", e[2] + ". periyot, " + e[3] + "A"]]; },
    note: (s) => { const P = PROP[s.p]; return s.p === "r" ? "Her periyodun en büyük küresi 1A metalidir (Li, Na, K). Periyot boyunca küreler küçülür; yeni periyoda geçince yeni katman eklendiği için birden büyür." : s.p === "ie" ? "Her periyodun zirvesinde soy gazlar (He, Ne, Ar), dibinde 1A metalleri var. Grafikteki testere dişi deseni periyodikliğin kanıtıdır. Be→B ve N→O'daki küçük düşüşlere dikkat et!" : "Flor (3,98) en elektronegatif elementtir. Elektronegatiflik sağ üst köşeye doğru artar; soy gazlar için tanımlanmaz."; }
  });

  /* 4) İletkenlik kristali — 9-4 */
  const COND = {
    nacls: { l: "NaCl (katı)", b: 0, ions: false, col: "#f8fafc", type: "İyonik", why: "İyonlar kristal örgüde sabit konumdadır; hareket edemedikleri için akım taşınmaz." },
    naclaq: { l: "NaCl (suda)", b: .9, ions: true, col: "#e0f2fe", type: "İyonik", why: "Suda çözünen NaCl, Na⁺ ve Cl⁻ iyonlarına ayrışır. Serbest iyonlar elektrotlara doğru hareket ederek akımı taşır." },
    nacll: { l: "NaCl (eriyik)", b: .8, ions: true, col: "#fde68a", heat: true, type: "İyonik", why: "801 °C'nin üzerinde eriyen NaCl'de iyonlar serbest kalır ve eriyik elektriği iletir." },
    seker: { l: "Şekerli su", b: 0, ions: false, col: "#fef9c3", type: "Kovalent (moleküler)", why: "Şeker suda moleküler çözünür; iyon oluşmadığı için akım taşınmaz." },
    su: { l: "Saf su", b: .03, ions: false, col: "#e0f2fe", type: "Kovalent (polar)", why: "Saf su çok az iyonlaşır (H⁺ ve OH⁻); lamba neredeyse hiç yanmaz." },
    cu: { l: "Bakır tel", b: 1, metal: true, col: "#f97316", type: "Metalik", why: "Metalik bağdaki serbest (delokalize) elektronlar akımı kolayca taşır." },
    grafit: { l: "Grafit çubuk", b: .7, metal: true, col: "#334155", type: "Kovalent ağ", why: "Grafitte her karbon üç bağ yapar; dördüncü elektron katmanlar boyunca serbestçe hareket eder." },
    etanol: { l: "Etanol", b: 0, ions: false, col: "#f1f5f9", type: "Kovalent (moleküler)", why: "Etanol moleküler bir sıvıdır; serbest iyon veya elektron içermez." }
  };
  A.register({
    id: "iletkenlik-kristali", topic: "9-4", icon: "💡", title: "İletkenlik Kristali",
    lead: "Aqualf'ın ışık kristali yalnızca elektrik akımı geçtiğinde parlar. Farklı maddeleri devreye bağla ve hangi bağların yük taşıyıcı serbest bıraktığını keşfet.",
    goal: "İyonik, kovalent ve metalik bağlı maddelerin elektrik iletkenliğini karşılaştırmak.",
    materials: ["Pil (6 V)", "Işık kristali (ampul)", "Grafit elektrotlar", "Beher", "Test maddeleri"],
    steps: ["Bir madde seç.", "Devredeki ampulün parlaklığını gözle.", "Sağdaki mikroskop panelinde yük taşıyıcıları incele.", "Sonuçları bağ türüyle ilişkilendir."],
    safety: "Eriyik NaCl 800 °C'nin üzerindedir; okul laboratuvarında yalnızca öğretmen gösterimi olarak yapılabilir.",
    learn: "Elektrik iletimi için serbestçe hareket edebilen yüklü tanecik gerekir. Metallerde bu tanecikler serbest elektronlar, iyonik bileşiklerin çözeltilerinde ve eriyiklerinde ise iyonlardır. Katı iyonik bileşikler ve moleküler maddeler iletmez.",
    controls: [{ k: "m", type: "select", label: "Test maddesi", options: Object.entries(COND).map(([v, o]) => ({ v, l: o.l, dot: o.col })) }],
    init(s) { s.b = 0; s.ions = Array.from({ length: 24 }, (_, i) => ({ x: Math.random(), y: Math.random(), q: i % 2 ? 1 : -1 })); s.el = Array.from({ length: 16 }, (_, i) => i / 16); },
    tick(s, dt) { const M = COND[s.m]; s.b = lerp(s.b, M.b, 1 - Math.pow(.02, dt)); s.el = s.el.map((p) => (p + dt * .25 * s.b) % 1); s.ions.forEach((p) => { if (M.ions) { p.x += p.q * dt * .12; if (p.x > 1) p.x = 0; if (p.x < 0) p.x = 1; p.y += (Math.random() - .5) * dt * .3; p.y = clamp(p.y, 0, 1); } }); },
    draw(D, s, t) {
      const c = D.ctx, M = COND[s.m]; D.bg("warm"); D.candle(910, 430, t, .9);
      // devre
      const path = [[150, 300], [150, 120], [420, 120], [420, 300]];
      D.wire([[150, 300], [150, 120], [262, 120]], "#b45309", 3); D.wire([[310, 120], [420, 120], [420, 300]], "#b45309", 3);
      D.bulb(286, 120, s.b);
      // pil
      c.fillStyle = "#1f2937"; D.rr(110, 300, 80, 40, 4); c.fill(); c.fillStyle = "#f59e0b"; c.fillRect(110, 300, 18, 40); D.text("6 V", 160, 326, { size: 12, weight: 800, align: "center", color: "#fde68a" });
      D.wire([[150, 340], [150, 360], [240, 360], [240, 330]], "#b45309", 3);
      // elektrotlar
      c.fillStyle = "#334155"; c.fillRect(234, 300, 12, 120); c.fillRect(414, 300, 12, 120);
      D.label("−", 240, 296, "#93c5fd"); D.label("+", 420, 296, "#fca5a5");
      if (M.metal) { c.fillStyle = M.col; D.rr(232, 400, 196, 16, 6); c.fill(); D.label(M.l, 330, 445); }
      else {
        if (M.heat) D.burner(330, 520, 40, "#fb923c", t);
        D.beaker(330, M.heat ? 470 : 440, 230, 150, { fill: .7, color: M.col, alpha: .35, glow: M.heat ? .15 : 0 });
        if (s.m === "nacls") { for (let i = 0; i < 40; i++) { c.fillStyle = "rgba(248,250,252,.8)"; c.fillRect(250 + (i % 10) * 16, 420 - Math.floor(i / 10) * 10, 9, 9); } }
        D.label(M.l, 330, M.heat ? 496 : 462);
      }
      // elektronlar telde
      const L = [[150, 300], [150, 120], [420, 120], [420, 300]];
      s.el.forEach((p) => { if (s.b < .02) return; const q = 1 - p, seg = q * 3, i = Math.min(2, Math.floor(seg)), f = seg - i; const x = lerp(L[i][0], L[i + 1][0], f), y = lerp(L[i][1], L[i + 1][1], f); D.glow(x, y, 8, "#7dd3fc", .8); });
      // mikroskop
      D.panel(560, 40, 370, 300, "Mikroskop · yük taşıyıcılar", "#7dd3fc");
      const bx = 580, by = 70, bw = 330, bh = 250;
      if (M.metal) {
        for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) D.atom(bx + 30 + i * 55, by + 40 + j * 58, 14, M.col === "#334155" ? "#64748b" : "#f97316", { label: "+" });
        for (let k = 0; k < 40; k++) { const x = bx + ((k * 47 + t * 60 * (.3 + s.b)) % bw), y = by + ((k * 83) % bh); D.glow(x, y, 6, "#7dd3fc", .9); }
        D.text("e⁻ denizi içinde pozitif metal iyonları", bx + bw / 2, by + bh + 14, { size: 10, align: "center", color: "#7dd3fc" });
      } else if (s.m === "nacls") {
        for (let i = 0; i < 8; i++) for (let j = 0; j < 6; j++) { const q = (i + j) % 2; D.atom(bx + 25 + i * 40, by + 25 + j * 40, q ? 9 : 13, q ? "#a78bfa" : "#4ade80", { label: q ? "+" : "−" }); }
        D.text("İyonlar sabit kristal örgüde: hareket yok", bx + bw / 2, by + bh + 14, { size: 10, align: "center", color: "#a7f3d0" });
      } else if (M.ions) {
        s.ions.forEach((p) => D.atom(bx + p.x * bw, by + 10 + p.y * (bh - 20), p.q > 0 ? 9 : 13, p.q > 0 ? "#a78bfa" : "#4ade80", { label: p.q > 0 ? "+" : "−" }));
        D.text("Na⁺ → (−) elektrot · Cl⁻ → (+) elektrot", bx + bw / 2, by + bh + 14, { size: 10, align: "center", color: "#a7f3d0" });
      } else {
        for (let k = 0; k < 18; k++) { const x = bx + 30 + (k % 6) * 52 + Math.sin(t + k) * 6, y = by + 40 + Math.floor(k / 6) * 70 + Math.cos(t * 1.3 + k) * 6; D.atom(x, y, 11, "#94a3b8"); D.atom(x + 12, y - 6, 6, "#e2e8f0"); }
        D.text("Yüksüz moleküller: yük taşıyıcı yok", bx + bw / 2, by + bh + 14, { size: 10, align: "center", color: "#cbd5e1" });
      }
    },
    readout: (s) => { const M = COND[s.m]; return [["Bağ türü", M.type], ["Ampul", s.b > .5 ? "Parlak" : s.b > .05 ? "Sönük" : "Yanmıyor", s.b > .5], ["Yük taşıyıcı", M.metal ? "Serbest elektron" : M.ions ? "Serbest iyonlar" : "Yok"]]; },
    note: (s) => COND[s.m].why
  });

  /* 5) Bükülen sıvı — 9-5 */
  const LIQ = { su: { l: "Su (H2O)", p: 1, col: "#7dd3fc", shape: "Bükük", pol: "Polar" }, etanol: { l: "Etanol", p: .55, col: "#e0f2fe", shape: "–OH içeren", pol: "Polar" }, aseton: { l: "Aseton", p: .7, col: "#f1f5f9", shape: "C=O içeren", pol: "Polar" }, hekzan: { l: "Hekzan", p: 0, col: "#fef9c3", shape: "Zincir, simetrik", pol: "Apolar" }, ccl4: { l: "CCl4", p: 0, col: "#ecfccb", shape: "Düzgün dörtyüzlü", pol: "Apolar" } };
  A.register({
    id: "bukulen-sivi", topic: "9-5", icon: "🌊", title: "Bükülen Şelale",
    lead: "Aqualf kehribar asasını yün pelerinine sürtüp ince bir sıvı akışına yaklaştırıyor. Bazı sıvılar asaya doğru bükülüyor, bazıları dümdüz akıyor. Neden?",
    goal: "Moleküllerin polarlığını yüklü bir cisimle gözlemlemek ve molekül şekliyle ilişkilendirmek.",
    materials: ["Büret", "Kehribar (plastik) asa", "Yün kumaş", "Su, etanol, aseton, hekzan, CCl4"],
    steps: ["Bir sıvı seç.", "'Asayı yünle ov' düğmesine bas.", "Asanın akışa uzaklığını değiştir ve bükülmeyi gözlemle.", "Mikroskop panelinde moleküllerin yönelimini incele."],
    safety: "Hekzan, aseton ve etanol yanıcıdır; açık alev olmayan bir ortamda çalışılmalıdır. CCl4 zehirlidir, okullarda kullanılmaz (burada yalnızca modelleniyor).",
    learn: "Polar moleküllerin kısmi yüklü uçları vardır. Yüklü asaya yaklaşınca moleküller yönlenir ve akış asaya çekilir. Simetrik moleküllerde (CCl4, hekzan) bağ dipolleri birbirini götürür; molekül apolar olduğu için akış bükülmez.",
    controls: [{ k: "l", type: "select", label: "Sıvı", options: Object.entries(LIQ).map(([v, o]) => ({ v, l: o.l, dot: o.col })) },
      { k: "d", type: "range", label: "Asanın uzaklığı", min: 20, max: 160, v: 60, unit: " mm", color: "#f6c86a" },
      { type: "button", label: "🧶 Asayı yünle ov", primary: true, act: (s) => { s.charge = 1; SC.Sound && SC.Sound.noise({ vol: .1, dur: .3, freq: 1800 }); } }],
    init(s) { s.charge = 0; s.def = 0; s.drops = []; },
    tick(s, dt) { s.charge = Math.max(0, s.charge - dt * .03); const tgt = LIQ[s.l].p * s.charge * 2400 / (s.d * s.d) * 3; s.def = lerp(s.def, clamp(tgt, 0, 1.3), 1 - Math.pow(.05, dt)); },
    draw(D, s, t) {
      const c = D.ctx, L = LIQ[s.l]; D.bg("green"); D.candle(60, 430, t);
      D.stand(250, 430, 380);
      c.fillStyle = "rgba(255,255,255,.06)"; c.fillRect(276, 40, 18, 170); c.strokeStyle = "rgba(226,240,255,.55)"; c.strokeRect(276.5, 40.5, 18, 170);
      c.fillStyle = rgba(L.col, .7); c.fillRect(278, 60, 15, 148);
      c.fillStyle = "#94a3b8"; c.fillRect(272, 212, 26, 6); c.fillRect(283, 218, 4, 16);
      const rodX = 285 + 40 + s.d * 1.4, rodY = 330;
      c.strokeStyle = rgba(L.col, .85); c.lineWidth = 3; c.beginPath();
      for (let i = 0; i <= 40; i++) { const y = 234 + i * 5, k = clamp(1 - Math.abs(y - rodY) / 160, 0, 1); const x = 285 + s.def * 90 * Math.pow(i / 40, 1.6) * (.6 + k * .6); i ? c.lineTo(x, y) : c.moveTo(x, y); }
      c.stroke(); c.lineWidth = 1;
      D.beaker(285 + s.def * 70, 440, 90, 20, { fill: .5, color: L.col, alpha: .5 });
      // asa
      c.save(); c.translate(rodX, rodY); c.rotate(-.15);
      const g = c.createLinearGradient(0, -8, 0, 8); g.addColorStop(0, "#fbbf24"); g.addColorStop(1, "#b45309");
      c.fillStyle = g; D.rr(0, -8, 220, 16, 8); c.fill(); c.restore();
      if (s.charge > .05) { D.glow(rodX + 10, rodY, 60, "#fde68a", .3 * s.charge); for (let k = 0; k < 6; k++) D.text("−", rodX + 10 + k * 26, rodY + 4 + Math.sin(t * 5 + k) * 2, { size: 14, weight: 800, color: rgba("#93c5fd", s.charge) }); }
      D.label("Kehribar asa", rodX + 110, rodY + 36);
      // mikroskop
      D.panel(620, 40, 310, 300, "Moleküllerin yönelimi", "#7dd3fc");
      for (let i = 0; i < 12; i++) {
        const x = 660 + (i % 4) * 70, y = 100 + Math.floor(i / 4) * 80;
        const ang = L.p > 0 ? lerp(Math.sin(t + i * 2) * 2, 0, clamp(s.charge * L.p * 2, 0, 1)) : t * .6 + i;
        c.save(); c.translate(x, y); c.rotate(ang);
        if (L.p > 0) { D.atom(0, 0, 13, "#ef4444", { label: "δ−", labelColor: "#fff" }); D.atom(-16, 12, 8, "#e2e8f0"); D.atom(16, 12, 8, "#e2e8f0"); D.text("δ+", 0, 32, { size: 9, align: "center", color: "#93c5fd" }); }
        else { D.atom(0, 0, 11, "#64748b"); [0, 1, 2, 3].forEach((k) => D.atom(Math.cos(k * TAU / 4 + .78) * 16, Math.sin(k * TAU / 4 + .78) * 16, 7, "#a3e635")); }
        c.restore();
      }
      D.text(L.p > 0 ? "δ+ uçlar negatif asaya döner" : "Dipol yok: rastgele yönelim", 775, 330, { size: 10, align: "center", color: "#a5f3fc" });
    },
    readout: (s) => { const L = LIQ[s.l]; return [["Molekül", L.shape], ["Polarlık", L.pol, L.p > 0], ["Bükülme", s.def > .05 ? Math.round(s.def * 30) + "°" : "yok"]]; },
    note: (s) => { const L = LIQ[s.l]; return s.charge < .05 ? "Asa yüksüz. Önce asayı yünle ov." : L.p > 0 ? L.l + " polardır. Yüklü asaya yaklaşınca moleküllerin zıt yüklü uçları asaya döner ve akış asaya doğru bükülür. Asa yaklaştıkça etki artar." : L.l + " apolardır: simetrik yapısında bağ dipolleri birbirini götürür. Asanın elektrik alanı akışı bükemez."; }
  });

  /* 6) Erime eğrisi — 9-6 */
  const SOLID = { buz: { l: "Buz (kristal)", mp: 0, t0: -20, tmax: 40, cryst: true, col: "#bae6fd", L: 24 }, naftalin: { l: "Naftalin (kristal)", mp: 80, t0: 25, tmax: 110, cryst: true, col: "#f8fafc", L: 20 }, plastik: { l: "Plastik (amorf)", soft: [85, 130], t0: 25, tmax: 160, cryst: false, col: "#fca5a5" }, cam: { l: "Mum camı (amorf model)", soft: [50, 90], t0: 20, tmax: 120, cryst: false, col: "#fde68a" } };
  A.register({
    id: "erime-egrisi", topic: "9-6", icon: "🧊", title: "Buz Sarayı ve Cam Kubbe",
    lead: "Kristal bir katı ile amorf bir katıyı aynı ocakta ısıt. Biri belli bir sıcaklıkta birden erirken diğeri yavaş yavaş yumuşar.",
    goal: "Kristal ve amorf katıların ısıtma eğrilerini karşılaştırmak.",
    materials: ["Su banyosu / yağ banyosu", "Deney tüpü", "Termometre", "Buz, naftalin, plastik örnekler", "Kronometre"],
    steps: ["Bir katı örnek seç.", "Isıtıcıyı aç ve gücü ayarla.", "Sıcaklık–zaman grafiğini izle.", "Kristal katılarda erime sırasında sıcaklığın sabit kaldığı bölgeyi (plato) bul."],
    safety: "Naftalin buharı zararlıdır; çeker ocakta çalışılmalıdır. Sıcak yağ banyosu ciddi yanıklara neden olabilir.",
    learn: "Kristal katılarda tanecikler düzenli dizilmiştir; bütün bağları yenmek için aynı enerji gerekir. Erime belirli bir sıcaklıkta olur ve verilen ısı erime bitene kadar sıcaklığı artırmaz. Amorf katılarda düzen yoktur; madde bir sıcaklık aralığında giderek yumuşar.",
    controls: [{ k: "m", type: "select", label: "Katı örnek", options: Object.entries(SOLID).map(([v, o]) => ({ v, l: o.l, dot: o.col })), onChange: (s) => A.byId("erime-egrisi").reset(s) },
      { k: "pow", type: "range", label: "Isıtıcı gücü", min: 1, max: 5, v: 3, color: "#fb923c" },
      { k: "heat", type: "toggle", label: "🔥 Isıtıcı", color: "#fb923c" },
      { type: "button", label: "↺ Baştan başla", act: (s) => A.byId("erime-egrisi").reset(s) }],
    reset(s) { const M = SOLID[s.m]; s.T = M.t0; s.f = 0; s.time = 0; s.hist = [[0, s.T]]; },
    init(s) { this.reset(s); s.heat = false; },
    tick(s, dt) {
      const M = SOLID[s.m]; if (!s.heat || s.T >= M.tmax) return;
      const q = s.pow * dt * 2.2; s.time += dt;
      if (M.cryst && s.T >= M.mp && s.f < 1) { s.f = Math.min(1, s.f + q / M.L); s.T = M.mp; }
      else s.T = Math.min(M.tmax, s.T + q * (M.cryst ? 1 : 1.1));
      if (!M.cryst) s.f = clamp((s.T - M.soft[0]) / (M.soft[1] - M.soft[0]), 0, 1);
      const last = s.hist[s.hist.length - 1]; if (s.time - last[0] > .2) s.hist.push([s.time, s.T]);
    },
    draw(D, s, t) {
      const c = D.ctx, M = SOLID[s.m]; D.bg("night");
      D.burner(170, 520, s.heat ? 20 + s.pow * 9 : 0, "#60a5fa", t, s.heat);
      D.beaker(170, 470, 170, 170, { fill: .75, color: "#7dd3fc", alpha: .18, glow: s.heat ? .05 : 0 });
      const top = D.tube(170, 440, 210, { fill: 0, w: 46 });
      // örnek
      const sy = 432, h = 80;
      if (M.cryst) {
        const solidH = h * (1 - s.f);
        c.fillStyle = rgba(M.col, .9); for (let i = 0; i < 12; i++) { const yy = sy - (i % 6) * (solidH / 6); if (i % 6 < 6 * (1 - s.f)) { c.save(); c.translate(155 + Math.floor(i / 6) * 16, yy - 8); c.rotate(.3); c.fillRect(-6, -6, 12, 12); c.restore(); } }
        if (s.f > 0) { c.fillStyle = rgba(M.col, .55); c.fillRect(150, sy - h * s.f * .9, 40, h * s.f * .9 + 6); }
      } else {
        c.fillStyle = rgba(M.col, .85); const sag = s.f * 30;
        c.beginPath(); c.moveTo(150, sy + 6); c.lineTo(150, sy - h + sag); c.quadraticCurveTo(170, sy - h + sag * 2.2, 190, sy - h + sag); c.lineTo(190, sy + 6); c.fill();
      }
      D.thermo(270, 420, 230, s.T, M.t0 - 5, M.tmax, { right: true });
      // grafik
      D.panel(360, 40, 570, 380, "Sıcaklık – zaman grafiği", "#f59e0b");
      const xmax = Math.max(40, s.time + 5);
      const G = D.graph(370, 60, 550, 350, { xmin: 0, xmax, ymin: M.t0 - 5, ymax: M.tmax + 5, xlabel: "zaman (s)", ylabel: "T (°C)", ticksY: [M.t0, M.cryst ? M.mp : M.soft[0], M.tmax].filter((v, i, a) => a.indexOf(v) === i), series: [{ pts: s.hist.concat([[s.time, s.T]]), color: "#f59e0b", dot: true }], hlines: M.cryst ? [[M.mp, "rgba(125,211,252,.7)", "erime noktası " + M.mp + " °C"]] : [[M.soft[0], "rgba(252,165,165,.6)", "yumuşama başlar"], [M.soft[1], "rgba(252,165,165,.6)", "akışkan"]] });
    },
    readout: (s) => { const M = SOLID[s.m]; return [["Katı türü", M.cryst ? "Kristal" : "Amorf"], ["Sıcaklık", s.T.toFixed(1) + " °C", true], [M.cryst ? "Erimiş kısım" : "Yumuşama", Math.round(s.f * 100) + "%"]]; },
    note: (s) => { const M = SOLID[s.m]; if (!s.heat) return "Isıtıcıyı aç ve grafiği izle."; if (M.cryst && s.T >= M.mp && s.f < 1) return "Erime sürüyor ve sıcaklık " + M.mp + " °C'de sabit! Verilen ısı tanecikler arasındaki çekimleri yenmek için harcanıyor (plato)."; if (M.cryst && s.f >= 1) return "Katının tamamı eridi; artık verilen ısı sıvının sıcaklığını artırıyor."; if (!M.cryst && s.f > 0 && s.f < 1) return "Amorf katı belirli bir sıcaklıkta erimiyor; " + M.soft[0] + "–" + M.soft[1] + " °C aralığında giderek yumuşuyor. Grafikte plato yok."; return "Katı ısınıyor: sıcaklık düzenli artıyor."; }
  });

  /* 7) İksir yarışı — 9-7 */
  const VISC = [{ l: "Su", e: 1.0, b: .022, col: "#7dd3fc" }, { l: "Zeytinyağı", e: 84, b: .035, col: "#a3e635" }, { l: "Gliserin", e: 1410, b: .06, col: "#f1f5f9" }, { l: "Bal", e: 10000, b: .075, col: "#f59e0b" }];
  const antoine = (Pmm) => 1730.63 / (8.07131 - Math.log10(Pmm)) - 233.426;
  A.register({
    id: "iksir-yarisi", topic: "9-7", icon: "🏁", title: "İksir Yarışı ve Dağdaki Kazan",
    lead: "Dört sıvıya aynı anda gümüş bilyeler bırak; hangisi önce dibe ulaşır? Sonra kazanı dağın zirvesine taşı ve suyun kaç derecede kaynadığını ölç.",
    goal: "Viskozitenin sıvı türüne ve sıcaklığa bağlılığını, kaynama noktasının dış basınca bağlılığını incelemek.",
    materials: ["4 uzun cam tüp", "Gümüş bilyeler", "Su, zeytinyağı, gliserin, bal", "Basınç ayarlı kazan", "Termometre"],
    steps: ["'Viskozite yarışı' modunda sıcaklığı ayarla ve bilyeleri bırak.", "Bitiş sürelerini karşılaştır.", "'Kaynama ve basınç' moduna geç; dış basıncı değiştir ve kaynama noktasını oku."],
    safety: "Isıtılmış yağ ve bal yanıklara yol açabilir. Basınçlı kaplar yalnızca güvenlik valfiyle kullanılmalıdır.",
    learn: "Moleküller arası etkileşim güçlendikçe viskozite artar; gliserin ve baldaki çok sayıda hidrojen bağı akışı yavaşlatır. Sıcaklık artınca viskozite azalır. Bir sıvı, buhar basıncı dış basınca eşit olunca kaynar: dağda basınç düşük olduğu için su 100 °C'nin altında, düdüklü tencerede ise üstünde kaynar.",
    controls: [{ k: "mode", type: "select", label: "Deney", options: [{ v: "visc", l: "Viskozite yarışı" }, { v: "boil", l: "Kaynama ve basınç" }] },
      { k: "T", type: "range", label: "Sıvı sıcaklığı (yarış)", min: 10, max: 80, step: 5, v: 20, unit: " °C", color: "#fb923c" },
      { k: "P", type: "range", label: "Dış basınç (kazan)", min: .3, max: 2, step: .05, v: 1, unit: " atm", color: "#38bdf8", fmt: (v) => v.toFixed(2) },
      { type: "button", label: "⚪ Bilyeleri bırak", primary: true, act: (s) => { s.mode = "visc"; s.balls = VISC.map(() => ({ y: 0, done: 0 })); s.race = 0; } },
      { type: "button", label: "🔥 Kazanı ısıt", act: (s) => { s.mode = "boil"; s.wT = 20; s.heatOn = true; } }],
    init(s) { s.balls = VISC.map(() => ({ y: 0, done: 0 })); s.race = -1; s.wT = 20; s.heatOn = false; s.bub = []; },
    eta(v, T) { return v.e * Math.exp(-v.b * (T - 20)); },
    tick(s, dt) {
      if (s.race >= 0) { s.race += dt; VISC.forEach((v, i) => { const b = s.balls[i]; if (b.y >= 1) return; const sp = .9 / (1 + Math.log10(this.eta(v, s.T)) * 1.25); b.y = Math.min(1, b.y + sp * dt * (.6 / Math.max(.15, Math.pow(this.eta(v, s.T), .18)))); if (b.y >= 1) b.done = s.race; }); }
      const bp = antoine(s.P * 760);
      if (s.heatOn) s.wT = Math.min(bp, s.wT + dt * 9);
    },
    draw(D, s, t) {
      const c = D.ctx; D.bg("warm");
      if (s.mode === "visc") {
        VISC.forEach((v, i) => {
          const x = 150 + i * 150; D.tube(x, 470, 400, { fill: .93, color: v.col, w: 60, alpha: .55 });
          const b = s.balls[i], by = lerp(98, 448, b.y);
          if (s.race >= 0) { D.glow(x, by, 18, "#e2e8f0", .4); D.atom(x, by, 9, "#e2e8f0"); }
          D.label(v.l, x, 500); D.mono("η ≈ " + fmtEta(this.eta(v, s.T)) + " mPa·s", x, 520, { size: 10, align: "center" });
          if (b.done) D.text("✓ " + b.done.toFixed(1) + " s", x, 70, { size: 13, weight: 700, align: "center", color: "#86efac" });
        });
        D.thermo(780, 430, 260, s.T, 0, 90, { right: true });
        D.panel(800, 40, 140, 110, "Yarış saati", "#f59e0b");
        D.serif(s.race >= 0 ? s.race.toFixed(1) + " s" : "—", 870, 110, { size: 34, align: "center", color: "#fde68a" });
      } else {
        const bp = antoine(s.P * 760), boiling = s.heatOn && s.wT >= bp - .05;
        D.burner(260, 520, s.heatOn ? 60 : 0, "#60a5fa", t, s.heatOn);
        const top = D.beaker(260, 470, 200, 190, { fill: .6, color: "#7dd3fc", alpha: .45 });
        D.bubbles(s.bub, top, 180, 340, 466, boiling ? 1.6 : s.heatOn ? .05 : 0, 1 / 60);
        if (boiling) { for (let k = 0; k < 5; k++) { const x = 190 + k * 35, y = top - 20 - ((t * 60 + k * 40) % 120); c.fillStyle = "rgba(226,232,240,.12)"; c.beginPath(); c.arc(x + Math.sin(t + k) * 8, y, 16, 0, TAU); c.fill(); } }
        D.thermo(400, 440, 250, s.wT, 0, 130, { right: true });
        // dağ ve basınç
        D.panel(520, 40, 410, 380, "Kaynama noktası – dış basınç", "#38bdf8");
        const pts = []; for (let p = .3; p <= 2.001; p += .05) pts.push([p, antoine(p * 760)]);
        D.graph(530, 60, 390, 340, { xmin: .3, xmax: 2, ymin: 60, ymax: 125, xlabel: "P (atm)", ylabel: "Tk (°C)", ticksX: [.5, 1, 1.5, 2], ticksY: [70, 100, 120], series: [{ pts, color: "#38bdf8" }, { pts: [[s.P, bp]], color: "#f6c86a", dot: true }], hlines: [[100, "rgba(246,200,106,.5)", "1 atm → 100 °C"]] });
        D.text(s.P < .75 ? "⛰️ Dağ zirvesi" : s.P > 1.3 ? "🍲 Düdüklü tencere" : "🏡 Deniz seviyesi", 725, 455, { size: 15, weight: 700, align: "center" });
      }
    },
    readout(s) {
      if (s.mode === "visc") { const w = s.balls.map((b, i) => [b.done, VISC[i].l]).filter((x) => x[0]).sort((a, b) => a[0] - b[0]); return [["Sıcaklık", s.T + " °C"], ["İlk bitiren", w[0] ? w[0][1] : "—", true], ["Son bitiren", w.length === 4 ? w[3][1] : "yarışıyor…"]]; }
      const bp = antoine(s.P * 760); return [["Dış basınç", s.P.toFixed(2) + " atm"], ["Kaynama noktası", bp.toFixed(1) + " °C", true], ["Su sıcaklığı", s.wT.toFixed(1) + " °C"]];
    },
    note(s) {
      if (s.mode === "visc") return s.race < 0 ? "Sıcaklığı seç ve bilyeleri bırak. Önce hangisinin bitireceğini tahmin et!" : "Su (zayıf etkileşimli, düşük viskoziteli) yarışı açık ara kazanır. Gliserin ve balda moleküller arasındaki çok sayıda hidrojen bağı akışa direnç gösterir. Sıcaklığı artırıp yarışı tekrarla: bütün sıvılar akışkanlaşır.";
      const bp = antoine(s.P * 760); return "Dış basınç " + s.P.toFixed(2) + " atm iken su " + bp.toFixed(1) + " °C'de kaynar. Kaynama, suyun buhar basıncı dış basınca eşit olduğunda başlar ve kaynama boyunca sıcaklık sabit kalır.";
    }
  });
  function fmtEta(v) { return v >= 100 ? Math.round(v).toLocaleString("tr-TR") : v.toFixed(v < 10 ? 2 : 1).replace(".", ","); }

  /* 8) Nano altın — 9-8 */
  const nanoColor = (d) => d >= 150 ? "#d4a017" : d < 20 ? "#b91c1c" : d < 40 ? mix("#b91c1c", "#9d174d", (d - 20) / 20) : d < 80 ? mix("#9d174d", "#6d28d9", (d - 40) / 40) : mix("#6d28d9", "#1e3a8a", Math.min(1, (d - 80) / 70));
  A.register({
    id: "nano-altin", topic: "9-8", icon: "✨", title: "Rengini Değiştiren Altın",
    lead: "Altını küçülttükçe rengi değişiyor: sarıdan yakut kırmızısına, mora, maviye! Ayrıca altın nanoparçacıkları iki farklı yolla sentezle ve yeşil kimyanın farkını gör.",
    goal: "Nano boyutun madde özelliklerine etkisini ve yeşil kimyanın atık önleme ilkesini incelemek.",
    materials: ["Altın tuzu (HAuCl4) çözeltisi", "İndirgen: sodyum borohidrür veya çay özütü / sitrat", "Küvet", "Işık kaynağı"],
    steps: ["Parçacık boyutunu kaydırıcıyla değiştir ve küvetteki rengi izle.", "Yüzey/hacim oranının nasıl değiştiğine bak.", "Sentez yöntemini değiştirip atık ve zararlılık göstergelerini karşılaştır."],
    safety: "Nanoparçacıklar solunmamalı ve lavaboya dökülmemelidir. Sodyum borohidrür yanıcı ve aşındırıcıdır.",
    learn: "Nano boyutta atomların büyük kısmı yüzeyde bulunur ve elektronlar ışıkla farklı etkileşir (yüzey plazmon rezonansı). Bu yüzden 10–20 nm altın parçacıkları kırmızı görünür. Yeşil kimya, aynı ürünü daha az zararlı kimyasal ve daha az atıkla üretmeyi hedefler.",
    controls: [{ k: "d", type: "range", label: "Parçacık çapı", min: 5, max: 160, step: 1, v: 15, unit: " nm", color: "#fbbf24", fmt: (v) => (v >= 150 ? "külçe" : v) },
      { k: "route", type: "select", label: "Sentez yolu", options: [{ v: "klasik", l: "Klasik (NaBH4)", dot: "#f87171" }, { v: "yesil", l: "Yeşil (çay özütü)", dot: "#4ade80" }] }],
    init(s) { s.col = nanoColor(15); s.w = 0; },
    tick(s, dt) { s.col = mix(s.col, nanoColor(s.d), 1 - Math.pow(.02, dt)); s.w = lerp(s.w, s.route === "klasik" ? 1 : .15, 1 - Math.pow(.05, dt)); },
    draw(D, s, t) {
      const c = D.ctx; D.bg("night");
      // ışık demeti ve küvet
      c.fillStyle = "rgba(255,250,230,.08)"; c.beginPath(); c.moveTo(40, 230); c.lineTo(160, 210); c.lineTo(160, 290); c.lineTo(40, 270); c.fill();
      D.glow(40, 250, 40, "#fffbeb", .6);
      c.fillStyle = s.d >= 150 ? "rgba(255,255,255,.04)" : rgba(s.col, .85); D.rr(160, 160, 110, 220, 6); c.fill(); c.strokeStyle = "rgba(226,240,255,.6)"; c.lineWidth = 2; c.stroke(); c.lineWidth = 1;
      if (s.d >= 150) { const g = c.createLinearGradient(170, 300, 260, 360); g.addColorStop(0, "#fde68a"); g.addColorStop(.5, "#d4a017"); g.addColorStop(1, "#92400e"); c.fillStyle = g; D.rr(180, 320, 70, 40, 4); c.fill(); }
      D.glow(215, 270, 140, s.d >= 150 ? "#d4a017" : s.col, .25);
      c.fillStyle = rgba(s.d >= 150 ? "#fde68a" : s.col, .2); c.beginPath(); c.moveTo(270, 210); c.lineTo(420, 190); c.lineTo(420, 310); c.lineTo(270, 290); c.fill();
      D.label(s.d >= 150 ? "Külçe altın" : "Koloidal altın", 215, 405);
      // yakın plan
      D.panel(450, 30, 480, 250, "Nanoskop · tek parçacık (yüzey atomları parlak)", "#fbbf24");
      const R = 14 + clamp(s.d, 5, 100) * .7, cx = 600, cy = 160;
      const n = Math.max(3, Math.round(R / 7));
      for (let i = -n; i <= n; i++) for (let j = -n; j <= n; j++) { const x = i * (R / n), y = j * (R / n), r = Math.hypot(x, y); if (r > R) continue; const surf = r > R - R / n * 1.2; D.atom(cx + x, cy + y, Math.max(2, R / n * .48), surf ? "#fde047" : "#a16207"); }
      const sv = 6 / s.d; const surfPct = clamp(100 * (1 - Math.pow(1 - .55 / Math.max(s.d, 1) * 2, 3)), 0, 100);
      D.mono("Yüzey / hacim = 6/d = " + sv.toFixed(2) + " nm⁻¹", 730, 100, { size: 12 });
      D.mono("Yüzeydeki atom oranı ≈ %" + Math.round(surfPct), 730, 124, { size: 12 });
      D.text(s.d >= 150 ? "Külçe: yüzey atomları ihmal edilebilir" : s.d < 20 ? "Çok küçük: yakut kırmızısı" : s.d < 60 ? "Orta: pembe-mor" : "Büyük nano: mavi-mor", 730, 156, { size: 12, color: "#fde68a" });
      // yeşil kimya
      D.panel(450, 300, 480, 200, "Sentez karnesi", s.route === "klasik" ? "#f87171" : "#4ade80");
      const items = [["Zararlı atık", s.w], ["Enerji ihtiyacı", s.route === "klasik" ? .5 : .35], ["Tehlikeli reaktif", s.route === "klasik" ? .9 : .1], ["Atom ekonomisi", s.route === "klasik" ? .4 : .8]];
      items.forEach(([l, v], i) => { const y = 345 + i * 36; D.text(l, 470, y + 4, { size: 12 }); c.fillStyle = "rgba(255,255,255,.08)"; D.rr(620, y - 8, 280, 14, 7); c.fill(); c.fillStyle = (i === 3 ? v > .6 : v < .4) ? "#4ade80" : "#f87171"; D.rr(620, y - 8, 280 * v, 14, 7); c.fill(); });
    },
    readout: (s) => [["Çap", s.d >= 150 ? "külçe" : s.d + " nm"], ["Renk", s.d >= 150 ? "altın sarısı" : s.d < 20 ? "kırmızı" : s.d < 60 ? "pembe-mor" : "mavi-mor", true], ["Yöntem", s.route === "klasik" ? "Klasik" : "Yeşil"]],
    note: (s) => (s.d >= 150 ? "Külçe altın sarı ve parlaktır. Kaydırıcıyı sola çekerek altını nano boyuta küçült." : "Bu boyutta altın " + (s.d < 20 ? "yakut kırmızısı" : s.d < 60 ? "pembe-mor" : "mavimsi mor") + " görünür! Aynı element, boyutu değişince farklı renkte görünüyor. Bu nano ölçeğin büyüsüdür (1–100 nm).") + (s.route === "klasik" ? " Klasik yöntemde kullanılan NaBH4 tehlikelidir ve atık bırakır." : " Çay özütündeki doğal indirgenlerle yapılan sentez zararlı atığı en aza indirir: atığı önlemek, temizlemekten iyidir.")
  });
})();
