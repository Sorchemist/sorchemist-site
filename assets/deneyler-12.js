/* Sorchemist Simya Atölyesi — 12. sınıf deneyleri */
(() => {
  "use strict";
  const A = SC.Atolye, { clamp, lerp, mix, rgba } = A, TAU = Math.PI * 2;
  const fx = (v, d = 2) => Number(v).toFixed(d).replace(".", ",");
  const METAL = { Mg: { E: -2.37, ion: "Mg²⁺", col: "#e5e7eb", sol: "#f8fafc", z: 2, M: 24.3 }, Zn: { E: -.76, ion: "Zn²⁺", col: "#a1a1aa", sol: "#f8fafc", z: 2, M: 65.4 }, Fe: { E: -.44, ion: "Fe²⁺", col: "#78716c", sol: "#d9f99d", z: 2, M: 55.8 }, Pb: { E: -.13, ion: "Pb²⁺", col: "#64748b", sol: "#f8fafc", z: 2, M: 207.2 }, Cu: { E: .34, ion: "Cu²⁺", col: "#c2410c", sol: "#38bdf8", z: 2, M: 63.5 }, Ag: { E: .80, ion: "Ag⁺", col: "#e2e8f0", sol: "#f8fafc", z: 1, M: 107.9 } };

  /* 27) Metal düellosu — 12-1 */
  A.register({
    id: "metal-duellosu", topic: "12-1", icon: "⚔️", title: "Metallerin Düellosu",
    lead: "Bir metal şeridi başka bir metalin tuz çözeltisine daldır. Elektron vermeye daha istekli olan kazanır! Düello tablosunu doldur.",
    goal: "Standart indirgenme potansiyellerini kullanarak redoks tepkimelerinin kendiliğinden olup olmayacağını tahmin etmek.",
    materials: ["Mg, Zn, Fe, Pb, Cu, Ag şeritleri", "Tuz çözeltileri (1 M)", "Beherler"],
    steps: ["Bir metal ve bir çözelti seç.", "'Daldır' düğmesine bas ve gözlemle.", "Sonuç düello tablosuna işlenir.", "Tabloyu doldurup aktiflik sırasını çıkar."],
    safety: "Gümüş nitrat deriyi lekeler; kurşun tuzları zehirlidir. Eldiven kullanılmalıdır.",
    learn: "Bir metal, kendisinden daha yüksek indirgenme potansiyeline sahip bir metalin iyonunu indirger: Zn + Cu²⁺ → Zn²⁺ + Cu. Tersi kendiliğinden olmaz. E°hücre = E°(indirgenen) − E°(yükseltgenen) > 0 ise tepkime istemlidir.",
    controls: [{ k: "m", type: "select", label: "Metal şerit", options: Object.keys(METAL).map((v) => ({ v, l: v, dot: METAL[v].col })), onChange: (s) => (s.p = 0) },
      { k: "ion", type: "select", label: "Çözelti", options: Object.keys(METAL).map((v) => ({ v, l: METAL[v].ion, dot: METAL[v].sol })), onChange: (s) => (s.p = 0) },
      { type: "button", label: "⬇ Daldır", primary: true, act: (s) => { s.p = .001; s.grid[s.m + s.ion] = METAL[s.ion].E > METAL[s.m].E ? 1 : -1; } }],
    init(s) { s.p = 0; s.grid = {}; },
    tick(s, dt) { if (s.p > 0) s.p = Math.min(1, s.p + dt * .3); },
    draw(D, s, t) {
      const c = D.ctx, M = METAL[s.m], I = METAL[s.ion], go = I.E > M.E && s.m !== s.ion, p = s.p;
      D.bg("warm"); D.candle(50, 430, t);
      const sol = go && s.ion === "Cu" ? mix("#38bdf8", s.m === "Fe" ? "#d9f99d" : "#f8fafc", p * .85) : go && s.ion === "Ag" && s.m === "Cu" ? mix("#f8fafc", "#60a5fa", p * .7) : I.sol;
      const top = D.beaker(210, 445, 190, 220, { fill: .65, color: sol, alpha: .45 });
      const dip = p > 0 ? 1 : 0, sy = lerp(80, top - 60, dip);
      c.fillStyle = M.col; D.rr(190, sy, 40, 260, 4); c.fill();
      if (go && p > 0) { const cov = p; for (let k = 0; k < 90 * cov; k++) { c.fillStyle = s.ion === "Ag" ? "#f1f5f9" : I.col; const x = 186 + (k * 7) % 48, y = top + 10 + (k * 13) % (sy + 260 - top - 12); c.fillRect(x, y, s.ion === "Ag" ? 5 : 4, s.ion === "Ag" ? 2 : 4); } if (s.ion === "Ag") for (let k = 0; k < 14 * cov; k++) { c.strokeStyle = "#f8fafc"; const x = 190 + (k * 11) % 40, y = top + 30 + (k * 23) % 140; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10 - k % 5, y + 6); c.moveTo(x, y); c.lineTo(x + 10 + k % 4, y + 4); c.stroke(); } }
      D.label(s.m + " şerit · " + I.ion + " çözeltisi", 210, 475);
      // potansiyel merdiveni
      D.panel(380, 30, 220, 470, "E° (V) merdiveni", "#a78bfa");
      const Y = (E) => 460 - (E + 2.5) / 3.5 * 400;
      Object.entries(METAL).forEach(([k, o]) => { const y = Y(o.E), hl = k === s.m || k === s.ion; c.strokeStyle = hl ? (k === s.m ? "#fb923c" : "#7dd3fc") : "rgba(243,234,214,.3)"; c.lineWidth = hl ? 2 : 1; c.beginPath(); c.moveTo(400, y); c.lineTo(500, y); c.stroke(); c.lineWidth = 1; D.text(o.ion + "/" + k, 505, y + 4, { size: 11, color: hl ? "#fff" : "rgba(243,234,214,.6)" }); D.mono((o.E > 0 ? "+" : "") + fx(o.E), 395, y + 4, { size: 10, align: "right" }); });
      D.text("↑ kolay indirgenir", 400, 60, { size: 10, color: "#7dd3fc" }); D.text("↓ güçlü indirgen", 400, 492, { size: 10, color: "#fb923c" });
      // düello tablosu
      D.panel(620, 30, 310, 310, "Düello tablosu (metal → iyon)", "#f6c86a");
      const keys = Object.keys(METAL);
      keys.forEach((k, i) => { D.text(k, 680 + i * 40, 70, { size: 11, weight: 800, align: "center", color: "#7dd3fc" }); D.text(k, 650, 102 + i * 36, { size: 11, weight: 800, align: "center", color: "#fb923c" }); });
      keys.forEach((m, i) => keys.forEach((io, j) => { const v = s.grid[m + io], x = 680 + j * 40, y = 98 + i * 36; c.fillStyle = m === io ? "rgba(255,255,255,.04)" : v === 1 ? "rgba(74,222,128,.3)" : v === -1 ? "rgba(248,113,113,.2)" : "rgba(255,255,255,.06)"; D.rr(x - 17, y - 14, 34, 28, 4); c.fill(); if (v) D.text(v === 1 ? "✓" : "✗", x, y + 5, { size: 13, align: "center", color: v === 1 ? "#86efac" : "#fca5a5" }); if (m === s.m && io === s.ion) { c.strokeStyle = "#fff"; c.stroke(); } }));
      D.panel(620, 355, 310, 145, "Denklem", go ? "#86efac" : "#fca5a5");
      if (s.m === s.ion) D.text("Aynı metal: tepkime yok", 640, 400, { size: 13 });
      else if (go) { D.mono(s.m + " + " + I.ion + " →", 640, 395, { size: 13 }); D.mono(M.ion + " + " + s.ion, 660, 420, { size: 13 }); D.mono("E° = " + fx(I.E) + " − (" + fx(M.E) + ") = +" + fx(I.E - M.E) + " V", 640, 455, { size: 12, color: "#86efac" }); }
      else { D.text("Kendiliğinden yürümez", 640, 395, { size: 14, weight: 700, color: "#fca5a5" }); D.mono("E° = " + fx(I.E) + " − (" + fx(M.E) + ") = " + fx(I.E - M.E) + " V < 0", 640, 430, { size: 12 }); }
    },
    readout(s) { const M = METAL[s.m], I = METAL[s.ion], d = I.E - M.E; return [["E°(" + I.ion + ")", fx(I.E) + " V"], ["E°(" + M.ion + ")", fx(M.E) + " V"], ["Sonuç", s.m === s.ion ? "—" : d > 0 ? "Tepkime var ✓" : "Tepkime yok ✗", d > 0 && s.m !== s.ion]]; },
    note(s) { const M = METAL[s.m], I = METAL[s.ion]; if (s.p <= 0) return "Tahmin et: " + s.m + " şeridi " + I.ion + " çözeltisinde kaplanacak mı?"; if (s.m === s.ion) return "Aynı metal kendi iyonuyla tepkimeye girmez."; return I.E > M.E ? s.m + " daha aktif (E° daha düşük): elektron vererek " + M.ion + " iyonlarına yükseltgeniyor, " + I.ion + " iyonları indirgenip " + s.ion + " olarak şeridin üzerinde birikiyor." : s.m + ", " + I.ion + " iyonlarını indirgeyemez çünkü " + s.ion + " daha kolay elektron verir. Şerit değişmeden kalıyor."; }
  });

  /* 28) Limondan fener (galvanik pil) — 12-2 */
  A.register({
    id: "limondan-fener", topic: "12-2", icon: "🔋", title: "Elektron Yolculuğu (Galvanik Pil)",
    lead: "İki yarı hücre kur, tellerle bağla ve tuz köprüsünü yerleştir. Elektronlar anottan katoda koşarken ışık kristalini yak!",
    goal: "Galvanik hücrede anot–katot tepkimelerini, elektron akış yönünü, tuz köprüsünün görevini ve hücre potansiyelini incelemek.",
    materials: ["İki beher", "Metal elektrotlar", "1 M tuz çözeltileri", "Tuz köprüsü (KNO3)", "Voltmetre", "Işık kristali"],
    steps: ["Sol ve sağ elektrot metallerini seç.", "Tuz köprüsünü tak ve voltmetreyi oku.", "Elektronların ve iyonların hareketini izle.", "Tuz köprüsünü çıkar: akım neden duruyor?"],
    safety: "Metal tuz çözeltilerinin bazıları zehirlidir; elektrotlar temizlenirken zımpara tozu solunmamalıdır.",
    learn: "Anotta yükseltgenme (metal çözünür), katotta indirgenme (metal birikir) olur. Elektronlar dış devrede anottan katoda akar. Tuz köprüsü iyon göçüyle çözeltilerin yük dengesini korur; çıkarılırsa devre kesilir. E°hücre = E°katot − E°anot.",
    controls: [{ k: "L", type: "select", label: "Sol elektrot", options: Object.keys(METAL).map((v) => ({ v, l: v, dot: METAL[v].col })), v: "Zn" },
      { k: "R", type: "select", label: "Sağ elektrot", options: Object.keys(METAL).map((v) => ({ v, l: v, dot: METAL[v].col })), v: "Cu" },
      { k: "bridge", type: "toggle", label: "🌉 Tuz köprüsü", color: "#a78bfa", v: true }],
    init(s) { s.ph = 0; s.needle = 0; s.mass = 0; },
    calc(s) { const a = METAL[s.L], b = METAL[s.R]; const anodeLeft = a.E <= b.E; const E = s.L === s.R ? 0 : Math.abs(b.E - a.E); return { anodeLeft, E: s.bridge ? E : 0, Eopen: E }; },
    tick(s, dt) { const r = this.calc(s); s.needle = lerp(s.needle, r.E, 1 - Math.pow(.05, dt)); s.ph += dt * r.E * .35; if (r.E > 0) s.mass = Math.min(1, s.mass + dt * .02); },
    draw(D, s, t) {
      const c = D.ctx, r = this.calc(s), a = METAL[s.L], b = METAL[s.R]; D.bg("night");
      const lx = 220, rx = 620, y = 450;
      [[lx, a, s.L], [rx, b, s.R]].forEach(([x, m, k]) => { D.beaker(x, y, 200, 170, { fill: .7, color: m.sol, alpha: .35 }); c.fillStyle = m.col; D.rr(x - 18, y - 250, 36, 210, 3); c.fill(); D.label(k + " | " + m.ion, x, y + 26); });
      const anodeX = r.anodeLeft ? lx : rx, cathX = r.anodeLeft ? rx : lx;
      if (r.Eopen > 0) { D.label("ANOT (−) · yükseltgenme", anodeX, y - 290, "#fb923c"); D.label("KATOT (+) · indirgenme", cathX, y - 290, "#7dd3fc"); }
      // köprü
      if (s.bridge) { c.strokeStyle = "rgba(196,181,253,.7)"; c.lineWidth = 22; c.beginPath(); c.moveTo(lx + 60, y - 70); c.lineTo(lx + 60, y - 200); c.lineTo(rx - 60, y - 200); c.lineTo(rx - 60, y - 70); c.stroke(); c.lineWidth = 1; D.label("KNO₃ tuz köprüsü", 420, y - 190, "#1e1b4b");
        if (r.E > 0) for (let k = 0; k < 8; k++) { const q = ((s.ph * .4 + k / 8) % 1); D.atom(lerp(lx + 60, rx - 60, r.anodeLeft ? 1 - q : q), y - 200 + Math.sin(k) * 4, 5, "#f472b6", { label: "−" }); } }
      // tel + voltmetre
      D.wire([[lx, y - 250], [lx, y - 330], [rx, y - 330], [rx, y - 250]], "#b45309", 3);
      c.fillStyle = "#1f2937"; D.rr(370, y - 370, 100, 70, 8); c.fill(); c.strokeStyle = "#f6c86a"; c.stroke();
      const ang = -Math.PI * .8 + clamp(s.needle / 3.2, 0, 1) * Math.PI * .6; c.strokeStyle = "#ef4444"; c.lineWidth = 2; c.beginPath(); c.moveTo(420, y - 310); c.lineTo(420 + Math.cos(ang) * 40, y - 310 + Math.sin(ang) * 40); c.stroke(); c.lineWidth = 1;
      D.mono(fx(s.needle) + " V", 420, y - 316, { size: 12, align: "center" });
      D.bulb(560, y - 330 - 2, clamp(s.needle / 2.5, 0, 1));
      if (r.E > 0) for (let k = 0; k < 12; k++) { const q = (s.ph + k / 12) % 1, pts = [[anodeX, y - 250], [anodeX, y - 330], [cathX, y - 330], [cathX, y - 250]], seg = q * 3, i = Math.min(2, Math.floor(seg)), f = seg - i; D.glow(lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f), 9, "#7dd3fc", .9); }
      if (r.E > 0) D.text("e⁻ →", (lx + rx) / 2 + (r.anodeLeft ? 60 : -60), y - 340, { size: 12, align: "center", color: "#7dd3fc" });
      D.panel(30, 30, 300, 120, "Hücre potansiyeli", "#f6c86a");
      const an = r.anodeLeft ? a : b, ca = r.anodeLeft ? b : a;
      D.mono("E° = E°katot − E°anot", 50, 70, { size: 12 });
      D.mono("   = " + fx(ca.E) + " − (" + fx(an.E) + ") = " + fx(r.Eopen) + " V", 50, 96, { size: 12, color: "#fde68a" });
      D.mono(s.bridge ? "Devre kapalı ✓" : "Köprü yok: devre açık ✗", 50, 126, { size: 12, color: s.bridge ? "#86efac" : "#fca5a5" });
    },
    readout(s) { const r = this.calc(s); return [["Potansiyel", fx(r.E) + " V", true], ["Anot", r.Eopen > 0 ? (r.anodeLeft ? s.L : s.R) : "—"], ["Katot", r.Eopen > 0 ? (r.anodeLeft ? s.R : s.L) : "—"]]; },
    note(s) { const r = this.calc(s); if (s.L === s.R) return "İki elektrot aynı: potansiyel farkı yok, pil çalışmaz."; if (!s.bridge) return "Tuz köprüsü çıkarıldı: anot çözeltisinde pozitif, katot çözeltisinde negatif yük birikir ve elektron akışı anında durur."; const an = r.anodeLeft ? s.L : s.R, ca = r.anodeLeft ? s.R : s.L; return an + " anottur: elektron vererek çözünür (kütlesi azalır). Elektronlar telden " + ca + " katoduna gider; orada " + METAL[ca].ion + " iyonları indirgenir. Pil " + fx(r.E) + " V üretiyor."; }
  });

  /* 29) Kaplanan kalkan — 12-3 */
  const CORR = { kuru: { l: "Kuru hava", r: .02, why: "Su yoksa demir paslanmaz." }, nem: { l: "Nemli hava", r: .5, why: "Su ve oksijen birlikte paslanmaya yol açar." }, tuz: { l: "Tuzlu su", r: 1, why: "Tuz iyonları iletkenliği artırır ve paslanmayı hızlandırır (deniz kenarı)." }, yag: { l: "Kaynatılmış su + yağ", r: .04, why: "Kaynatılan sudaki oksijen uzaklaştı, yağ havayla teması kesti." }, zn: { l: "Galvanizli (Zn kaplı)", r: .03, why: "Çinko daha aktif olduğu için demirin yerine kendisi yükseltgenir." }, mg: { l: "Mg kurban anotlu", r: .02, why: "Magnezyum kurban anot olarak yükseltgenir, demiri katot yapar ve korur." } };
  A.register({
    id: "kaplanan-kalkan", topic: "12-3", icon: "🛡️", title: "Bakırla Kaplanan Kalkan",
    lead: "Kalkanı güç kristalinin eksi ucuna bağla ve bakır sülfat banyosuna daldır; akım ve süreyle bakır kaplamayı ayarla. Sonra çivileri paslanmaya karşı koru.",
    goal: "Elektrolizde Faraday yasasını uygulamak; korozyon koşullarını ve korunma yöntemlerini karşılaştırmak.",
    materials: ["CuSO4 çözeltisi", "Bakır anot", "Demir kalkan (katot)", "Ayarlı güç kaynağı", "Çiviler, tuzlu su, yağ, Zn ve Mg"],
    steps: ["Elektroliz modunda akımı ayarla ve 'Akımı aç'a bas.", "Geçen yükü ve biriken bakır kütlesini izle.", "Korozyon modunda çivileri farklı ortamlara koy ve günleri ilerlet."],
    safety: "Elektroliz düzeneklerinde düşük gerilim kullanılır; ıslak elle bağlantılara dokunulmaz.",
    learn: "Elektrolizde katotta indirgenme (Cu²⁺ + 2e⁻ → Cu), anotta yükseltgenme olur. Biriken kütle geçen yükle orantılıdır: m = (I·t / 96500) · (M / z). Demirin korozyonu için su ve oksijen gerekir; galvanizleme ve kurban anot demiri korur.",
    controls: [{ k: "mode", type: "select", label: "Mod", options: [{ v: "el", l: "Elektroliz (kaplama)" }, { v: "kor", l: "Korozyon (çiviler)" }] },
      { k: "I", type: "range", label: "Akım", min: .2, max: 5, step: .2, v: 2, unit: " A", color: "#facc15", fmt: (v) => fx(v, 1) },
      { k: "on", type: "toggle", label: "⚡ Akımı aç", color: "#facc15" },
      { type: "button", label: "↺ Sıfırla", act: (s) => { s.Q = 0; s.days = 0; } }],
    init(s) { s.Q = 0; s.days = 0; s.bub = []; },
    tick(s, dt) { if (s.mode === "el" && s.on) s.Q += s.I * dt * 60; if (s.mode === "kor") s.days = Math.min(30, s.days + dt * 1.2); },
    draw(D, s, t) {
      const c = D.ctx; D.bg("warm");
      if (s.mode === "el") {
        const m = s.Q / 96500 / 2 * 63.5, cov = clamp(m / 2, 0, 1);
        const top = D.beaker(300, 450, 340, 220, { fill: .7, color: mix("#38bdf8", "#7dd3fc", 0), alpha: .45 });
        c.fillStyle = mix("#64748b", "#c2410c", cov); c.beginPath(); c.arc(220, 330, 60, 0, TAU); c.fill(); c.strokeStyle = mix("#94a3b8", "#fb923c", cov); c.lineWidth = 4; c.stroke(); c.lineWidth = 1;
        c.fillStyle = "#475569"; c.fillRect(214, 190, 12, 80);
        c.fillStyle = "#c2410c"; D.rr(380, 200 + 0, 30, 200 - cov * 10, 3); c.fill(); c.fillRect(390, 190, 10, 20);
        D.wire([[220, 190], [220, 110], [290, 110]], "#60a5fa", 3); D.wire([[350, 110], [395, 110], [395, 190]], "#f87171", 3);
        c.fillStyle = "#1f2937"; D.rr(290, 90, 60, 40, 6); c.fill(); D.text("−   +", 320, 115, { size: 13, weight: 800, align: "center", color: "#fde68a" });
        if (s.on) { for (let k = 0; k < 8; k++) { const q = (t * .6 + k / 8) % 1; D.atom(lerp(380, 260, q), 300 + Math.sin(k * 3) * 50, 5, "#38bdf8", { label: "+" }); } D.glow(220, 330, 80, "#fb923c", .15); }
        D.label("KATOT (−) kalkan", 220, 410); D.label("ANOT (+) bakır", 395, 420);
        D.panel(540, 30, 390, 300, "Faraday hesabı", "#facc15");
        const ne = s.Q / 96500;
        D.mono("Q = I · t = " + fx(s.I, 1) + " A · " + fx(s.Q / s.I / 60, 1) + " dk", 560, 74, { size: 12 }); D.mono("  = " + fx(s.Q, 0) + " C", 560, 96, { size: 12 });
        D.mono("n(e⁻) = Q / 96500 = " + fx(ne, 4) + " mol", 560, 130, { size: 12 });
        D.mono("Cu²⁺ + 2e⁻ → Cu", 560, 164, { size: 12, color: "#7dd3fc" });
        D.mono("n(Cu) = " + fx(ne / 2, 4) + " mol", 560, 190, { size: 12 }); D.mono("m(Cu) = " + fx(m, 3) + " g", 560, 216, { size: 14, color: "#fde68a" });
        D.text("Zaman hızlandırılmıştır: 1 s = 1 dakika", 560, 300, { size: 10, color: "rgba(243,234,214,.5)" });
      } else {
        Object.entries(CORR).forEach(([k, o], i) => { const x = 100 + i * 140, rust = clamp(o.r * s.days / 15, 0, 1);
          D.tube(x, 440, 220, { w: 60, fill: k === "kuru" ? 0 : k === "nem" ? .1 : .55, color: k === "tuz" ? "#bae6fd" : "#e0f2fe", alpha: .35, inner: () => { if (k === "yag") { c.fillStyle = "rgba(250,204,21,.5)"; c.fillRect(x - 40, 300, 80, 16); } } });
          c.fillStyle = mix(k === "zn" ? "#a1a1aa" : "#9ca3af", "#9a3412", rust); c.fillRect(x - 3, 250, 6, 175); c.fillRect(x - 10, 244, 20, 6);
          for (let j = 0; j < rust * 18; j++) { c.fillStyle = "#c2410c"; c.fillRect(x - 5 + (j * 7) % 10, 260 + (j * 37) % 160, 3, 3); }
          if (k === "mg") { c.fillStyle = "#e5e7eb"; c.fillRect(x + 6, 380, 8, 40 - s.days * .6); }
          D.label(o.l, x, 470); D.text("%" + Math.round(rust * 100), x, 494, { size: 12, align: "center", color: rust > .3 ? "#fca5a5" : "#86efac" }); });
        D.panel(30, 30, 420, 150, "Gün " + Math.floor(s.days), "#fb923c");
        D.mono("4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ (pas)", 50, 76, { size: 12 }); D.text("Paslanma için su + oksijen birlikte gerekir.", 50, 110, { size: 12 }); D.text("Tuz paslanmayı hızlandırır; Zn ve Mg demiri korur.", 50, 136, { size: 12 });
      }
    },
    readout(s) { if (s.mode === "el") { const m = s.Q / 96500 / 2 * 63.5; return [["Yük", fx(s.Q, 0) + " C"], ["n(e⁻)", fx(s.Q / 96500, 4) + " mol"], ["Biriken Cu", fx(m, 3) + " g", true]]; } return [["Gün", Math.floor(s.days)], ["En çok paslanan", "Tuzlu su", true], ["En iyi koruma", "Kurban anot / Zn kaplama"]]; },
    note(s) { if (s.mode === "el") return s.on ? "Katotta (kalkan) Cu²⁺ iyonları indirgenip bakır olarak birikiyor; anottaki bakır çözünerek çözeltiye yeni Cu²⁺ veriyor. Akımı iki katına çıkarırsan aynı sürede iki kat bakır birikir." : "Akımı aç ve kalkanın kaplanmasını izle."; return "Günler geçtikçe tuzlu sudaki çivi en hızlı paslanıyor. " + CORR.zn.why + " " + CORR.yag.why; }
  });

  /* 30) Karbonun yüzleri — 12-4 */
  const ALLO = { elmas: { l: "Elmas", hard: "10 (en sert)", cond: "İletmez", hyb: "sp³" }, grafit: { l: "Grafit", hard: "1–2 (yumuşak)", cond: "İletir", hyb: "sp²" }, fulleren: { l: "Fulleren (C60)", hard: "—", cond: "Yarı iletken", hyb: "sp²" }, grafen: { l: "Grafen", hard: "Çok dayanıklı", cond: "Çok iyi iletir", hyb: "sp²" } };
  const FUEL = { c2h6: { l: "C2H6", C: 2, H: 6, O: 0, M: 30 }, c3h8: { l: "C3H8", C: 3, H: 8, O: 0, M: 44 }, c2h5oh: { l: "C2H5OH", C: 2, H: 6, O: 1, M: 46 }, c6h12o6: { l: "C6H12O6", C: 6, H: 12, O: 6, M: 180 } };
  function buildAllo(k) {
    const P = [], B = [];
    if (k === "elmas") { const pos = [[0, 0, 0], [1, 1, 1], [2, 2, 0], [3, 3, 1], [2, 0, 2], [3, 1, 3], [0, 2, 2], [1, 3, 3], [4, 0, 0], [4, 2, 2], [0, 4, 0], [2, 4, 2], [0, 0, 4], [2, 2, 4], [4, 4, 0], [4, 0, 4], [0, 4, 4]]; pos.forEach((p) => P.push(p.map((v) => v - 2))); }
    else if (k === "grafit" || k === "grafen") { const layers = k === "grafit" ? [-1.4, 0, 1.4] : [0]; layers.forEach((z, li) => { for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) { const x = i * 1.5 + (li % 2) * .75, y = j * 1.732 + (i % 2 ? .866 : 0); if (Math.hypot(x, y) < 4.3) P.push([x, y, z]); } }); }
    else { const n = 60, g = Math.PI * (3 - Math.sqrt(5)); for (let i = 0; i < n; i++) { const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y); P.push([Math.cos(g * i) * r * 3.2, y * 3.2, Math.sin(g * i) * r * 3.2]); } }
    const lim = k === "elmas" ? 1.8 : k === "fulleren" ? 1.5 : 1.05;
    for (let i = 0; i < P.length; i++) { const d = P.map((q, j) => [j, Math.hypot(q[0] - P[i][0], q[1] - P[i][1], q[2] - P[i][2])]).filter(([j, dd]) => j > i && dd < lim * (k === "elmas" ? 1 : 1.7)).sort((a, b) => a[1] - b[1]).slice(0, k === "elmas" ? 4 : 3); d.forEach(([j]) => B.push([i, j])); }
    return { P, B };
  }
  A.register({
    id: "karbonun-yuzleri", topic: "12-4", icon: "💠", title: "Karbonun Dört Yüzü",
    lead: "Elmas, grafit, fulleren ve grafen: hepsi saf karbon! Modelleri fareyle döndür. Sonra bilinmeyen bir organik maddeyi yakarak formülünü bul.",
    goal: "Karbonun allotroplarını karşılaştırmak; yakma analiziyle basit ve molekül formülü belirlemek.",
    materials: ["Allotrop modelleri", "Yakma fırını", "CO2 ve H2O tutucu tüpler", "Hassas terazi"],
    steps: ["'Allotroplar' modunda bir yapı seç ve fareyle döndür.", "'Yakma analizi' modunda bilinmeyen maddeyi yak.", "Tutucu tüplerdeki CO2 ve H2O kütlelerinden C ve H mollerini hesapla.", "Basit formülü ve mol kütlesiyle molekül formülünü bul."],
    safety: "Yakma analizi yüksek sıcaklık ve oksijen akışı gerektirir; uzman gözetiminde yapılır.",
    learn: "Allotroplar aynı elementin farklı yapılarıdır. Elmasta her C dört bağ yapar (sp³) ve madde çok serttir. Grafitte katmanlar arasında zayıf etkileşimler vardır ve serbest elektronlar iletkenlik sağlar. Yakma analizinde n(C) = n(CO2), n(H) = 2·n(H2O); O miktarı kütle farkından bulunur.",
    controls: [{ k: "mode", type: "select", label: "Mod", options: [{ v: "allo", l: "Allotroplar" }, { v: "yak", l: "Yakma analizi" }] },
      { k: "a", type: "select", label: "Allotrop", options: Object.entries(ALLO).map(([v, o]) => ({ v, l: o.l })), onChange: (s, v) => (s.model = buildAllo(v)) },
      { k: "f", type: "select", label: "Bilinmeyen madde", options: Object.keys(FUEL).map((v, i) => ({ v, l: "Örnek " + "ABCD"[i] })), onChange: (s) => (s.burn = 0) },
      { type: "button", label: "🔥 Örneği yak", primary: true, act: (s) => { s.mode = "yak"; s.burn = .001; } }],
    init(s) { s.model = buildAllo("elmas"); s.rx = 0; s.ry = 0; s.burn = 0; },
    tick(s, dt) { s.ry += dt * .4; if (s.pointer.down) { s.rx = (s.pointer.y / 540 - .5) * 2; s.ry = (s.pointer.x / 960) * 6; } if (s.burn > 0) s.burn = Math.min(1, s.burn + dt * .3); },
    draw(D, s, t) {
      const c = D.ctx; D.bg("night");
      if (s.mode === "allo") {
        const { P, B } = s.model, cx = 330, cy = 270, sc = s.a === "fulleren" ? 52 : 44;
        const cy1 = Math.cos(s.ry), sy1 = Math.sin(s.ry), cx1 = Math.cos(s.rx + .4), sx1 = Math.sin(s.rx + .4);
        const proj = P.map(([x, y, z]) => { const X = x * cy1 + z * sy1, Z = -x * sy1 + z * cy1, Y = y * cx1 - Z * sx1, Z2 = y * sx1 + Z * cx1; const f = 6 / (6 + Z2 * .35); return [cx + X * sc * f, cy + Y * sc * f, Z2]; });
        c.strokeStyle = "rgba(148,163,184,.5)"; c.lineWidth = 2; B.forEach(([i, j]) => { c.beginPath(); c.moveTo(proj[i][0], proj[i][1]); c.lineTo(proj[j][0], proj[j][1]); c.stroke(); }); c.lineWidth = 1;
        proj.map((p, i) => [p, i]).sort((a, b) => a[0][2] - b[0][2]).forEach(([p]) => D.atom(p[0], p[1], 8 * (6 / (6 + p[2] * .35)), "#475569"));
        if (s.a === "grafit") D.text("katmanlar arası zayıf etkileşim", cx, 500, { size: 11, align: "center", color: "#7dd3fc" });
        const A2 = ALLO[s.a];
        D.panel(640, 40, 290, 260, A2.l, "#7dd3fc");
        [["Hibritleşme", A2.hyb], ["Sertlik (Mohs)", A2.hard], ["Elektrik iletkenliği", A2.cond], ["Bağ sayısı / C", s.a === "elmas" ? "4" : "3"]].forEach(([k, v], i) => { D.text(k, 660, 92 + i * 48, { size: 11, color: "rgba(243,234,214,.6)" }); D.text(v, 660, 112 + i * 48, { size: 15, weight: 700 }); });
        D.text("Fareyle sürükleyerek döndür", 640, 330, { size: 11, color: "rgba(243,234,214,.5)" });
      } else {
        const F = FUEL[s.f], m = 1.0 * (F.M / 30) * .9, n = m / F.M, mCO2 = n * F.C * 44 * s.burn, mH2O = n * F.H / 2 * 18 * s.burn;
        c.fillStyle = "#3f3f46"; D.rr(60, 300, 220, 90, 10); c.fill(); D.glow(170, 345, 80, "#f97316", .3 + s.burn * .3); D.flame(170, 345, s.burn > 0 && s.burn < 1 ? 50 : 0, "#fb923c", t);
        c.fillStyle = "#f8fafc"; c.fillRect(150, 335, 40, 10 * (1 - s.burn));
        D.wire([[280, 345], [380, 345]], "rgba(226,240,255,.6)", 6); D.wire([[480, 345], [580, 345]], "rgba(226,240,255,.6)", 6);
        D.tube(430, 400, 140, { w: 60, fill: .5 + mH2O / 4, color: "#e0f2fe", alpha: .4 }); D.label("H₂O tutucu", 430, 425);
        D.tube(630, 400, 140, { w: 60, fill: .5 + mCO2 / 8, color: "#d9f99d", alpha: .4 }); D.label("CO₂ tutucu", 630, 425);
        D.label("Örnek " + "ABCD"[Object.keys(FUEL).indexOf(s.f)] + " · " + fx(m, 3) + " g", 170, 412);
        D.panel(30, 30, 900, 220, "Formül hesabı", "#f6c86a");
        const nC = n * F.C * s.burn, nH = n * F.H * s.burn, mO = s.burn >= 1 ? m - nC * 12 - nH * 1 : 0, nO = mO / 16;
        D.mono("m(CO₂) = " + fx(mCO2, 3) + " g  →  n(C) = " + fx(nC, 4) + " mol", 50, 74, { size: 12 });
        D.mono("m(H₂O) = " + fx(mH2O, 3) + " g  →  n(H) = 2·" + fx(mH2O / 18, 4) + " = " + fx(nH, 4) + " mol", 50, 100, { size: 12 });
        D.mono("m(O) = " + fx(m, 3) + " − " + fx(nC * 12, 3) + " − " + fx(nH, 3) + " = " + fx(Math.max(0, mO), 3) + " g → n(O) = " + fx(Math.max(0, nO), 4), 50, 126, { size: 12 });
        if (s.burn >= 1) { const g = (a, b) => (b < 1e-6 ? a : g(b, a % b)); const k = [F.C, F.H, F.O].filter(Boolean).reduce((a, b) => g(a, b)); const emp = "C" + (F.C / k > 1 ? F.C / k : "") + "H" + (F.H / k) + (F.O ? "O" + (F.O / k > 1 ? F.O / k : "") : ""); const empM = F.C / k * 12 + F.H / k + F.O / k * 16;
          D.mono("Oran C : H : O = " + fx(nC / nC, 0) + " : " + fx(nH / nC, 2) + " : " + fx(nO / nC, 2) + "  →  basit formül " + emp.replace(/(\d+)/g, (d) => d.split("").map((ch) => "₀₁₂₃₄₅₆₇₈₉"[ch]).join("")), 50, 160, { size: 13, color: "#fde68a" });
          D.mono("MA = " + F.M + " g/mol → n = " + F.M + " / " + empM + " = " + F.M / empM + "  →  molekül formülü " + F.l.replace(/(\d+)/g, (d) => d.split("").map((ch) => "₀₁₂₃₄₅₆₇₈₉"[ch]).join("")), 50, 190, { size: 13, color: "#86efac" }); }
        else D.text("Örneği yak ve tutucuların kütlece artışını bekle.", 50, 170, { size: 12, color: "rgba(243,234,214,.6)" });
      }
    },
    readout(s) { if (s.mode === "allo") { const a = ALLO[s.a]; return [["Allotrop", a.l], ["İletkenlik", a.cond, true], ["Hibrit", a.hyb]]; } const F = FUEL[s.f]; return [["Yanma", Math.round(s.burn * 100) + "%"], ["MA", F.M + " g/mol"], ["Formül", s.burn >= 1 ? F.l : "?", s.burn >= 1]]; },
    note(s) { if (s.mode === "allo") return { elmas: "Elmasta her karbon dört karbona sp³ ile bağlı; üç boyutlu güçlü ağ yapısı onu bilinen en sert doğal madde yapar. Serbest elektron olmadığı için iletmez.", grafit: "Grafitte karbonlar altıgen katmanlar oluşturur. Katmanlar zayıf etkileşimlerle bağlı olduğundan kayar (kalem ucu). Her karbonun dördüncü elektronu serbesttir; grafit iletkendir.", fulleren: "C60 fullereni futbol topu biçiminde kapalı bir kafestir; nanoteknolojide ilaç taşıyıcı olarak araştırılır.", grafen: "Grafen tek atom kalınlığında bir grafit katmanıdır: çok hafif, çok dayanıklı ve mükemmel iletkendir." }[s.a]; return s.burn >= 1 ? "Yakma analizi tamam! Karbonun tamamı CO2'ye, hidrojenin tamamı H2O'ya dönüştü. Mol oranlarından basit formülü, mol kütlesinden molekül formülünü bulduk." : "Örnek oksijen akışında yanıyor; ürünler tutucu tüplerde toplanıyor."; }
  });

  /* 31) Rengini kaybeden iksir — 12-5 */
  const HC = { metan: { l: "Metan", f: "CH4", cls: "Alkan", sat: true, gen: "CnH2n+2" }, etan: { l: "Etan", f: "C2H6", cls: "Alkan", sat: true, gen: "CnH2n+2" }, eten: { l: "Eten", f: "C2H4", cls: "Alken", sat: false, gen: "CnH2n", prod: "1,2-dibromoetan (CH2Br–CH2Br)" }, propen: { l: "Propen", f: "C3H6", cls: "Alken", sat: false, gen: "CnH2n", prod: "1,2-dibromopropan" }, etin: { l: "Etin (asetilen)", f: "C2H2", cls: "Alkin", sat: false, gen: "CnH2n−2", prod: "1,1,2,2-tetrabromoetan (2 Br2 harcar)" }, benzen: { l: "Benzen", f: "C6H6", cls: "Aromatik", sat: null, gen: "—" } };
  A.register({
    id: "rengini-kaybeden-iksir", topic: "12-5", icon: "⛓️", title: "Rengini Kaybeden İksir",
    lead: "Kırmızı-kahve bromlu suyu hidrokarbon gazlarına damlat. Çift ve üçlü bağlar bromu yakalayıp rengi yok eder; tekli bağlar ise hiçbir şey yapmaz.",
    goal: "Doymuş ve doymamış hidrokarbonları bromlu su testiyle ayırt etmek; katılma tepkimesini gözlemlemek.",
    materials: ["Gaz tüpleri", "Bromlu su", "Damlalık"],
    steps: ["Bir hidrokarbon seç.", "'Bromlu su damlat' düğmesine bas.", "Rengin kaybolup kaybolmadığını gözle.", "Molekül modelinde çift/üçlü bağın açılmasını izle."],
    safety: "Brom çok zehirli ve aşındırıcıdır; okul laboratuvarında yalnızca çok seyreltik bromlu su, çeker ocakta kullanılır.",
    learn: "Alken ve alkinler katılma tepkimesi verir: C=C bağı açılır ve Br atomları karbonlara bağlanır; brom harcandığı için renk kaybolur. Alkanlar doymuştur ve bromlu suyu karanlıkta renksizleştirmez. Benzenin aromatik halkası kararlıdır ve normal koşullarda katılma tepkimesi vermez.",
    controls: [{ k: "h", type: "select", label: "Hidrokarbon", options: Object.entries(HC).map(([v, o]) => ({ v, l: o.l })), onChange: (s) => { s.br = 0; s.react = 0; } },
      { type: "button", label: "💧 Bromlu su damlat", primary: true, act: (s) => { s.br = Math.min(1, s.br + .34); s.drops.push({ y: 0 }); SC.Sound && SC.Sound.drip(); } }],
    init(s) { s.br = 0; s.react = 0; s.drops = []; },
    tick(s, dt) { const H = HC[s.h]; if (H.sat === false && s.react < s.br) s.react = Math.min(s.br, s.react + dt * .5); s.drops.forEach((d) => (d.y += dt * 240)); s.drops = s.drops.filter((d) => d.y < 150); },
    draw(D, s, t) {
      const c = D.ctx, H = HC[s.h]; D.bg("green");
      const remain = clamp(s.br - s.react, 0, 1), col = mix("#f8fafc", "#b45309", clamp(remain * 1.5, 0, 1));
      D.tube(220, 450, 300, { w: 80, fill: .25 + s.br * .3, color: remain > .02 ? col : "#f1f5f9", alpha: .2 + remain * .6 });
      s.drops.forEach((d) => { c.fillStyle = "#b45309"; c.beginPath(); c.ellipse(220, 130 + d.y, 4, 5, 0, 0, TAU); c.fill(); });
      c.fillStyle = "#57534e"; c.fillRect(205, 90, 30, 40);
      D.label(H.l + " (" + H.f + ")", 220, 480);
      // molekül
      D.panel(380, 30, 550, 300, "Molekül modeli", "#86efac");
      const cx = 655, cy = 180, done = H.sat === false && s.react > .3;
      const nC = { metan: 1, etan: 2, eten: 2, propen: 3, etin: 2, benzen: 6 }[s.h];
      if (s.h === "benzen") { for (let i = 0; i < 6; i++) { const a = i * TAU / 6, x = cx + Math.cos(a) * 60, y = cy + Math.sin(a) * 60; D.atom(x, y, 14, "#475569", { label: "C", labelColor: "#fff" }); D.atom(cx + Math.cos(a) * 100, cy + Math.sin(a) * 100, 9, "#e2e8f0", { label: "H" }); } c.strokeStyle = "rgba(134,239,172,.6)"; c.beginPath(); c.arc(cx, cy, 34, 0, TAU); c.stroke(); D.text("aromatik halka (delokalize π)", cx, cy + 130, { size: 11, align: "center", color: "#86efac" }); }
      else {
        const xs = Array.from({ length: nC }, (_, i) => cx + (i - (nC - 1) / 2) * 110);
        for (let i = 0; i < nC - 1; i++) { const multi = !done && ((s.h === "eten" && i === 0) || (s.h === "propen" && i === 0)) ? 2 : !done && s.h === "etin" ? 3 : 1; for (let k = 0; k < multi; k++) { c.strokeStyle = "#cbd5e1"; c.lineWidth = 3; c.beginPath(); c.moveTo(xs[i] + 16, cy + (k - (multi - 1) / 2) * 9); c.lineTo(xs[i + 1] - 16, cy + (k - (multi - 1) / 2) * 9); c.stroke(); c.lineWidth = 1; } }
        xs.forEach((x, i) => { D.atom(x, cy, 16, "#475569", { label: "C", labelColor: "#fff" });
          const subs = []; const hC = (s.h === "metan") ? 4 : (s.h === "etan") ? 3 : (s.h === "eten") ? 2 : (s.h === "etin") ? 1 : (i === 0 ? 2 : i === 1 ? 1 : 3);
          for (let k = 0; k < hC; k++) subs.push("H");
          if (done && (s.h === "etin" ? true : i < 2)) { subs.push("Br"); if (s.h === "etin") subs.push("Br"); }
          subs.forEach((el, k) => { const ang = -Math.PI / 2 + (k - (subs.length - 1) / 2) * (Math.PI / Math.max(subs.length, 2)) + (i === 0 && nC > 1 ? -Math.PI / 4 : i === nC - 1 && nC > 1 ? Math.PI / 4 : 0); const sgn = k % 2 ? 1 : -1; const xx = x + Math.cos(ang) * 46 * (nC === 1 ? 1 : .9), yy = cy + Math.sin(ang) * 46 * sgn; c.strokeStyle = "rgba(203,213,225,.5)"; c.beginPath(); c.moveTo(x, cy); c.lineTo(xx, yy); c.stroke(); D.atom(xx, yy, el === "Br" ? 13 : 9, el === "Br" ? "#b45309" : "#e2e8f0", { label: el, labelColor: el === "Br" ? "#fff" : "#0b0f14" }); });
        });
      }
      D.panel(380, 345, 550, 165, "Sınıflandırma", "#f6c86a");
      D.text(H.cls + " · genel formül " + H.gen, 400, 385, { size: 14, weight: 700 });
      D.text(H.sat === true ? "Doymuş: yalnızca tekli bağlar" : H.sat === false ? "Doymamış: çoklu bağ içerir" : "Aromatik: özel kararlı halka", 400, 415, { size: 13, color: H.sat === false ? "#fde68a" : "#7dd3fc" });
      if (done) D.text("Ürün: " + H.prod, 400, 445, { size: 13, color: "#86efac" });
      D.text("Bromlu su: " + (s.br <= 0 ? "henüz eklenmedi" : remain > .05 ? "renk kalıcı (tepkime yok)" : "renk kayboldu ✓"), 400, 478, { size: 12 });
    },
    readout(s) { const H = HC[s.h], remain = clamp(s.br - s.react, 0, 1); return [["Sınıf", H.cls], ["Doymuşluk", H.sat === true ? "Doymuş" : H.sat === false ? "Doymamış" : "Aromatik", H.sat === false], ["Renk", s.br <= 0 ? "—" : remain > .05 ? "kırmızı-kahve" : "renksiz"]]; },
    note(s) { const H = HC[s.h]; if (s.br <= 0) return "Bromlu suyu damlat ve renge bak. Tahminin ne?"; return H.sat === false ? H.l + " doymamıştır: çoklu bağı Br2 ile katılma tepkimesi verdi ve brom harcandığı için renk kayboldu. Ürün: " + H.prod + "." : H.sat === true ? H.l + " bir alkandır; yalnızca tekli bağ içerdiği için bromlu suyla katılma tepkimesi vermez. Renk kalıcıdır." : "Benzen aromatiktir: halkadaki π elektronları delokalize olduğundan normal koşullarda katılma tepkimesi vermez ve renk kaybolmaz."; }
  });

  /* 32) Turuncudan yeşile — 12-6 */
  const ALC = { metanol: { l: "Metanol", f: "CH3OH", cls: "Primer", n: 0, prod: ["Metanal (formaldehit)", "Metanoik asit"] }, etanol: { l: "Etanol", f: "CH3CH2OH", cls: "Primer", n: 1, prod: ["Etanal", "Etanoik asit"] }, p1: { l: "1-Propanol", f: "CH3CH2CH2OH", cls: "Primer", n: 1, prod: ["Propanal", "Propanoik asit"] }, p2: { l: "2-Propanol", f: "CH3CH(OH)CH3", cls: "Sekonder", n: 2, prod: ["Propanon (aseton)"] }, t: { l: "2-Metil-2-propanol", f: "(CH3)3COH", cls: "Tersiyer", n: 3, prod: [] } };
  A.register({
    id: "turuncudan-yesile", topic: "12-6", icon: "🍷", title: "Turuncudan Yeşile",
    lead: "Alkollere turuncu dikromat çözeltisi ekle ve ısıt. Primer ve sekonder alkoller yükseltgenirken renk zümrüt yeşiline döner; tersiyer alkol direnir.",
    goal: "Alkolleri yükseltgenme tepkimeleriyle sınıflandırmak (primer, sekonder, tersiyer).",
    materials: ["Deney tüpleri", "Asitlendirilmiş K2Cr2O7", "Alkoller", "Su banyosu"],
    steps: ["Bir alkol seç.", "Dikromat ekle ve ısıtıcıyı aç.", "Renk değişimini ve ürünü gözlemle.", "Modelde –OH'nin bağlı olduğu karbonu incele."],
    safety: "Dikromat kanserojendir; okul laboratuvarlarında genellikle KMnO4 ile değiştirilir. Metanol çok zehirlidir.",
    learn: "Cr2O7²⁻ (turuncu) alkolü yükseltgerken Cr³⁺'e (yeşil) indirgenir. Primer alkol → aldehit → karboksilik asit; sekonder alkol → keton. Tersiyer alkolde –OH taşıyan karbonda H olmadığından yükseltgenme olmaz.",
    controls: [{ k: "a", type: "select", label: "Alkol", options: Object.entries(ALC).map(([v, o]) => ({ v, l: o.l })), onChange: (s) => (s.p = 0) },
      { k: "heat", type: "toggle", label: "🔥 Isıt", color: "#fb923c" },
      { type: "button", label: "🧪 Dikromat ekle", primary: true, act: (s) => { s.added = true; s.p = 0; } }],
    init(s) { s.p = 0; s.added = false; },
    tick(s, dt) { const A2 = ALC[s.a]; if (s.added && A2.n < 3) s.p = Math.min(1, s.p + dt * (s.heat ? .25 : .05)); },
    draw(D, s, t) {
      const c = D.ctx, A2 = ALC[s.a]; D.bg("warm");
      if (s.heat) { D.burner(220, 520, 40, "#60a5fa", t); D.beaker(220, 470, 200, 150, { fill: .6, color: "#7dd3fc", alpha: .2 }); }
      const col = !s.added ? "#f8fafc" : mix("#f97316", "#16a34a", s.p);
      D.tube(220, 450, 260, { w: 70, fill: .45, color: col, alpha: s.added ? .75 : .25, glow: s.added ? .08 : 0 });
      D.label(A2.l + " · " + A2.cls, 220, 492);
      D.panel(380, 30, 550, 250, "Yapı · –OH'li karbon", "#fbbf24");
      const cx = 650, cy = 150;
      D.atom(cx, cy, 20, "#f59e0b", { label: "C", labelColor: "#0b0f14" });
      D.atom(cx, cy - 70, 14, "#ef4444", { label: "O", labelColor: "#fff" }); D.atom(cx + 40, cy - 92, 9, "#e2e8f0", { label: "H" });
      c.strokeStyle = "#cbd5e1"; c.lineWidth = 3; c.beginPath(); c.moveTo(cx, cy - 18); c.lineTo(cx, cy - 56); c.stroke(); c.lineWidth = 1;
      const subs = []; for (let i = 0; i < A2.n; i++) subs.push("C"); while (subs.length < 3) subs.push("H");
      subs.forEach((el, i) => { const a = Math.PI / 2 + (i - 1) * .9, x = cx + Math.cos(a) * 80, y = cy + Math.sin(a) * 60; c.strokeStyle = "#cbd5e1"; c.lineWidth = 2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(x, y); c.stroke(); c.lineWidth = 1; D.atom(x, y, el === "C" ? 15 : 9, el === "C" ? "#475569" : "#e2e8f0", { label: el, labelColor: el === "C" ? "#fff" : "#0b0f14" }); });
      D.text("Bu karbona bağlı C sayısı: " + A2.n + " → " + A2.cls, 410, 70, { size: 13, weight: 700, color: "#fde68a" });
      D.text("Bu karbondaki H sayısı: " + (3 - A2.n), 410, 96, { size: 13 });
      D.panel(380, 300, 550, 210, "Yükseltgenme", "#86efac");
      if (A2.n === 3) D.text("Tersiyer alkol: yükseltgenmez (renk turuncu kalır)", 400, 345, { size: 14, weight: 700, color: "#fca5a5" });
      else { D.mono(A2.f + "  →  " + A2.prod[0], 400, 345, { size: 13, color: s.p > .3 ? "#fde68a" : "rgba(253,233,184,.4)" }); if (A2.prod[1]) D.mono("        →  " + A2.prod[1], 400, 375, { size: 13, color: s.p > .75 ? "#fde68a" : "rgba(253,233,184,.4)" }); }
      D.mono("Cr₂O₇²⁻ (turuncu) + e⁻ → Cr³⁺ (yeşil)", 400, 425, { size: 12, color: "#86efac" });
      D.text("Dönüşüm: %" + Math.round(s.p * 100), 400, 470, { size: 12 });
    },
    readout(s) { const A2 = ALC[s.a]; return [["Sınıf", A2.cls, true], ["Renk", !s.added ? "—" : s.p > .6 ? "yeşil" : s.p > .1 ? "turuncu→yeşil" : "turuncu"], ["Ürün", A2.n === 3 ? "yok" : s.p > .75 && A2.prod[1] ? A2.prod[1] : s.p > .3 ? A2.prod[0] : "…"]]; },
    note(s) { const A2 = ALC[s.a]; if (!s.added) return "Dikromat ekle; sonra ısıtıcıyı açarak tepkimeyi hızlandır."; return A2.n === 3 ? "2-Metil-2-propanol tersiyerdir: –OH taşıyan karbonda hiç H yok, bu yüzden yükseltgenemez. Renk turuncu kalır." : A2.cls === "Sekonder" ? "2-Propanol sekonder alkoldür ve ketona (propanon/aseton) yükseltgenir. Ketonlar daha fazla yükseltgenmez." : A2.l + " primer alkoldür: önce aldehite, sonra karboksilik aside yükseltgenir. Dikromat indirgendikçe renk yeşile döner."; }
  });

  /* 33) Elma kokulu iksir — 12-7 */
  const ACID = { metanoik: { l: "Metanoik asit", r: "metanoat", n: 1 }, etanoik: { l: "Etanoik asit", r: "etanoat", n: 2 }, butanoik: { l: "Bütanoik asit", r: "bütanoat", n: 4 } };
  const ALCO = { metanol: { l: "Metanol", r: "metil" }, etanol: { l: "Etanol", r: "etil" }, izoamil: { l: "3-Metil-1-bütanol", r: "izoamil (3-metilbütil)" }, oktanol: { l: "1-Oktanol", r: "oktil" } };
  const SMELL = { "metanoik-etanol": ["Rom / ahududu", "#f43f5e", "🍇"], "etanoik-etanol": ["Tatlı meyve / yapıştırıcı", "#a78bfa", "🍐"], "etanoik-izoamil": ["Muz", "#fde047", "🍌"], "etanoik-oktanol": ["Portakal", "#fb923c", "🍊"], "butanoik-etanol": ["Ananas", "#facc15", "🍍"], "butanoik-metanol": ["Elma", "#4ade80", "🍏"], "metanoik-metanol": ["Keskin, eterimsi", "#cbd5e1", "💨"], "etanoik-metanol": ["Yapıştırıcı / meyvemsi", "#c4b5fd", "🧴"], "butanoik-izoamil": ["Armut / kayısı", "#fbbf24", "🍑"], "metanoik-izoamil": ["Erik", "#a855f7", "🫐"], "butanoik-oktanol": ["Kavun", "#bef264", "🍈"], "metanoik-oktanol": ["Turunç / çiçeksi", "#f9a8d4", "🌸"] };
  const CARB = { etanal: { l: "Etanal (aldehit)", ald: true }, propanal: { l: "Propanal (aldehit)", ald: true }, glikoz: { l: "Glikoz (aldehit gruplu)", ald: true }, propanon: { l: "Propanon (keton)", ald: false }, butanon: { l: "Bütanon (keton)", ald: false } };
  A.register({
    id: "elma-kokulu-iksir", topic: "12-7", icon: "🍎", title: "Meyve Kokulu İksirler ve Gümüş Ayna",
    lead: "Bir karboksilik asit ile bir alkolü birleştir, birkaç damla sülfürik asit ekleyip ısıt: atölye meyve kokularıyla dolsun! Sonra Tollens ayıracıyla aldehitleri ketonlardan ayır.",
    goal: "Esterleşme tepkimesini ve ester adlandırmasını öğrenmek; Tollens testiyle aldehit–keton ayrımı yapmak.",
    materials: ["Karboksilik asitler", "Alkoller", "Derişik H2SO4 (katalizör)", "Su banyosu", "Tollens ayıracı", "Aldehit ve ketonlar"],
    steps: ["'Esterleşme' modunda bir asit ve bir alkol seç.", "Isıt ve oluşan esterin adını ve kokusunu gör.", "'Tollens testi' modunda bir karbonil bileşiği seç ve ısıt.", "Gümüş aynanın oluşup oluşmadığını gözle."],
    safety: "Derişik H2SO4 çok aşındırıcıdır. Ester buharları koklanırken el ile yelpazelenir; doğrudan koklanmaz. Tollens ayıracı bekletilmemeli, deney sonrası hemen atılmalıdır.",
    learn: "Esterleşme: RCOOH + R'OH ⇌ RCOOR' + H2O (asit katalizörlü, tersinir). Ester adı alkilden (alkolden) ve asitten gelen kısımdan oluşur: etanoik asit + etanol → etil etanoat. Aldehitler Ag⁺'yı metalik gümüşe indirgeyerek ayna oluşturur; ketonlar bu tepkimeyi vermez.",
    controls: [{ k: "mode", type: "select", label: "Mod", options: [{ v: "ester", l: "Esterleşme" }, { v: "tollens", l: "Tollens testi" }], onChange: (s) => (s.p = 0) },
      { k: "acid", type: "select", label: "Asit", options: Object.entries(ACID).map(([v, o]) => ({ v, l: o.l })), onChange: (s) => (s.p = 0) },
      { k: "alc", type: "select", label: "Alkol", options: Object.entries(ALCO).map(([v, o]) => ({ v, l: o.l })), v: "etanol", onChange: (s) => (s.p = 0) },
      { k: "carb", type: "select", label: "Karbonil bileşiği (Tollens)", options: Object.entries(CARB).map(([v, o]) => ({ v, l: o.l })), onChange: (s) => (s.p = 0) },
      { type: "button", label: "🔥 Isıt", primary: true, act: (s) => { s.p = .001; } }],
    init(s) { s.p = 0; s.v = []; },
    name(s) { return ALCO[s.alc].r + " " + ACID[s.acid].r; },
    tick(s, dt) { if (s.p > 0) s.p = Math.min(1, s.p + dt * .25); if (s.mode === "ester" && s.p > .3 && Math.random() < .3) s.v.push({ x: 220 + (Math.random() - .5) * 30, y: 230, vx: (Math.random() - .5) * 20, vy: -30 - Math.random() * 20, r: 6, life: 0, max: 3.5 }); },
    draw(D, s, t) {
      const c = D.ctx; D.bg("warm");
      if (s.p > 0) D.burner(220, 520, 40, "#60a5fa", t);
      if (s.mode === "ester") {
        const S = SMELL[s.acid + "-" + s.alc] || ["Meyvemsi", "#fbbf24", "🍓"];
        D.beaker(220, 470, 200, 140, { fill: .6, color: "#7dd3fc", alpha: .2 });
        D.tube(220, 450, 250, { w: 60, fill: .45, color: mix("#f8fafc", S[1], s.p * .5), alpha: .5 });
        s.v.forEach((p) => { p.life += 1 / 60; p.x += p.vx / 60; p.y += p.vy / 60; p.r += .2; }); s.v = s.v.filter((p) => p.life < p.max);
        s.v.forEach((p) => { c.fillStyle = rgba(S[1], .25 * (1 - p.life / p.max)); c.beginPath(); c.arc(p.x, p.y, p.r, 0, TAU); c.fill(); });
        if (s.p > .6) D.text(S[2], 330, 170 - Math.sin(t * 2) * 6, { size: 54 });
        D.panel(400, 30, 530, 240, "Esterleşme", "#fbbf24");
        D.mono(ACID[s.acid].l + " + " + ALCO[s.alc].l, 420, 74, { size: 12 }); D.mono("⇌ " + this.name(s) + " + su", 420, 100, { size: 13, color: s.p > .5 ? "#fde68a" : "rgba(253,233,184,.4)" });
        D.mono("RCOOH + R'OH ⇌ RCOOR' + H₂O   (H₂SO₄ katalizör)", 420, 134, { size: 11, color: "rgba(253,233,184,.7)" });
        D.text("Ester adı: " + this.name(s), 420, 180, { size: 16, weight: 800, color: s.p > .5 ? "#fde68a" : "rgba(243,234,214,.4)" });
        D.text("Koku: " + (s.p > .5 ? S[0] + " " + S[2] : "ısıtınca belli olacak"), 420, 214, { size: 14, color: s.p > .5 ? S[1] : "rgba(243,234,214,.4)" });
        D.text("Alkolden gelen kısım önce, asitten gelen kısım sonra okunur.", 420, 250, { size: 11, color: "rgba(243,234,214,.55)" });
      } else {
        const C = CARB[s.carb];
        D.beaker(220, 470, 200, 140, { fill: .6, color: "#7dd3fc", alpha: .2 });
        D.tube(220, 450, 260, { w: 70, fill: .4, color: "#e2e8f0", alpha: .35, inner: () => { if (C.ald && s.p > 0) { const g = c.createLinearGradient(185, 0, 255, 0); g.addColorStop(0, rgba("#94a3b8", s.p)); g.addColorStop(.35, rgba("#f8fafc", s.p)); g.addColorStop(.6, rgba("#cbd5e1", s.p)); g.addColorStop(1, rgba("#64748b", s.p)); c.fillStyle = g; c.fillRect(185, 180, 70, 280); } } });
        if (C.ald && s.p > .5) D.glow(220, 330, 90, "#f8fafc", .2 * s.p);
        D.panel(400, 30, 530, 240, "Tollens (gümüş aynası) testi", "#e2e8f0");
        D.mono("[Ag(NH₃)₂]⁺ + aldehit → Ag(k) ↓ + karboksilat", 420, 74, { size: 12 });
        D.text(C.l, 420, 120, { size: 16, weight: 800 });
        D.text(s.p <= 0 ? "Isıt ve gözlemle." : C.ald ? "Gümüş ayna oluştu ✓ (aldehit)" : "Ayna oluşmadı ✗ (keton)", 420, 160, { size: 15, weight: 700, color: s.p <= 0 ? "rgba(243,234,214,.5)" : C.ald ? "#f8fafc" : "#fca5a5" });
        D.text("Aldehitler kolay yükseltgenir; ketonlar yükseltgenmez.", 420, 200, { size: 12, color: "rgba(243,234,214,.6)" });
      }
    },
    readout(s) { if (s.mode === "ester") { const S = SMELL[s.acid + "-" + s.alc] || ["Meyvemsi"]; return [["Ester", this.name(s), s.p > .5], ["Koku", s.p > .5 ? S[0] : "—"], ["Tür", "Esterleşme (tersinir)"]]; } const C = CARB[s.carb]; return [["Bileşik", C.l], ["Sonuç", s.p <= 0 ? "—" : C.ald ? "Gümüş ayna" : "Tepkime yok", C.ald && s.p > 0], ["Sınıf", C.ald ? "Aldehit" : "Keton"]]; },
    note(s) { if (s.mode === "ester") { const S = SMELL[s.acid + "-" + s.alc] || ["meyvemsi"]; return s.p <= 0 ? "Asit ve alkolü seç, sonra ısıt." : ACID[s.acid].l + " ile " + ALCO[s.alc].l + " birleşerek " + this.name(s) + " esterini oluşturdu. Kokusu " + S[0].toLocaleLowerCase("tr") + "! Gıda ve parfüm endüstrisindeki pek çok aroma esterdir."; } const C = CARB[s.carb]; return s.p <= 0 ? "Bileşiği seç ve Tollens ayıracıyla ısıt." : C.ald ? "Aldehit grubu Ag⁺ iyonlarını metalik gümüşe indirgedi ve tüpün çeperi aynaya döndü. Glikozun da aldehit grubu içerdiğine dikkat et!" : "Ketonun karbonil karbonunda H yoktur; kolay yükseltgenmediği için Tollens testi negatiftir."; }
  });

  /* 34) Yakıtların yarışı — 12-8 */
  const FUELS = { h2: { l: "Hidrojen (H2)", kj: 120, co2: 0, col: "#93c5fd", fl: "#93c5fd", ren: "Üretimine bağlı (yeşil H₂ ise yenilenebilir)" }, ch4: { l: "Doğal gaz (CH4)", kj: 50, co2: 2.75, col: "#60a5fa", fl: "#3b82f6", ren: "Fosil" }, benzin: { l: "Benzin (C8H18)", kj: 44.4, co2: 3.09, col: "#f59e0b", fl: "#f97316", ren: "Fosil" }, etanol: { l: "Biyoetanol (C2H5OH)", kj: 26.8, co2: 1.91, col: "#a3e635", fl: "#fbbf24", ren: "Yenilenebilir (bitkisel)" }, odun: { l: "Odun", kj: 16, co2: 1.6, col: "#a16207", fl: "#fb923c", ren: "Yenilenebilir (sürdürülebilir kesimle)" }, komur: { l: "Kömür", kj: 24, co2: 2.4, col: "#27272a", fl: "#ef4444", ren: "Fosil" } };
  A.register({
    id: "yakitlarin-yarisi", topic: "12-8", icon: "☀️", title: "Yakıtların Yarışı",
    lead: "1 gram yakıtı lambada yak ve üstteki 200 g suyu ısıt. Hangi yakıt suyu en çok ısıtıyor? Peki atmosfere ne kadar CO2 bırakıyor?",
    goal: "Yakıtların ısı değerlerini ve karbon salımlarını karşılaştırmak; sürdürülebilir enerji kaynaklarını değerlendirmek.",
    materials: ["Yakıt lambaları", "200 g su dolu metal kap", "Termometre", "Terazi"],
    steps: ["Bir yakıt seç ve 'Yak' düğmesine bas.", "Su sıcaklığındaki artışı izle.", "Isı değeri ve CO2 salımı çubuklarını karşılaştır.", "Bütün yakıtları dene ve en sürdürülebilir seçeneği tartış."],
    safety: "Yakıt lambaları devrilmemeli; yanıcı sıvılar alevden uzak tutulmalıdır. Hidrojen ile deney yalnızca uzman gözetiminde yapılır.",
    learn: "Hidrojen birim kütle başına en çok enerjiyi verir ve yanınca yalnızca su oluşur; ancak ne kadar temiz olduğu üretim yöntemine bağlıdır. Fosil yakıtlar yüksek enerji verir ama CO2 salar ve yenilenemez. Biyoyakıtlar yenilenebilir olsa da tarım alanı ve su kullanımı gibi bedelleri vardır.",
    controls: [{ k: "f", type: "select", label: "Yakıt", options: Object.entries(FUELS).map(([v, o]) => ({ v, l: o.l.split(" (")[0], dot: o.col })), onChange: (s) => { s.p = 0; s.T = 20; } },
      { type: "button", label: "🔥 1 g yak", primary: true, act: (s) => { s.p = .001; s.T = 20; s.tried[s.f] = true; } }],
    init(s) { s.p = 0; s.T = 20; s.tried = {}; },
    dT(s) { return FUELS[s.f].kj * 1000 * .4 / (200 * 4.18); },
    tick(s, dt) { if (s.p > 0 && s.p < 1) { s.p = Math.min(1, s.p + dt * .2); s.T = 20 + this.dT(s) * s.p; } },
    draw(D, s, t) {
      const c = D.ctx, F = FUELS[s.f]; D.bg("night");
      c.fillStyle = "#3f3f46"; D.rr(150, 400, 140, 40, 6); c.fill(); c.fillStyle = F.col; D.rr(160, 405, 120, 30 * (1 - s.p), 4); c.fill();
      if (s.p > 0 && s.p < 1) D.flame(220, 400, 70, F.fl, t);
      c.fillStyle = "#71717a"; c.fillRect(150, 300, 6, 100); c.fillRect(284, 300, 6, 100);
      D.beaker(220, 300, 170, 130, { fill: .65, color: mix("#7dd3fc", "#f87171", clamp((s.T - 20) / 60, 0, 1)), alpha: .5 });
      D.thermo(330, 290, 200, s.T, 0, 100, { right: true });
      if (F.co2 > 0 && s.p > 0 && s.p < 1) for (let k = 0; k < 4; k++) D.text("CO₂", 200 + Math.sin(t * 2 + k) * 30, 160 - ((t * 40 + k * 30) % 120), { size: 12, color: "rgba(203,213,225,.5)" });
      if (s.f === "h2" && s.p > 0 && s.p < 1) for (let k = 0; k < 4; k++) D.text("H₂O", 200 + Math.sin(t * 2 + k) * 30, 160 - ((t * 40 + k * 30) % 120), { size: 12, color: "rgba(147,197,253,.6)" });
      D.panel(420, 30, 510, 220, "Isı değeri (kJ/g)", "#f6c86a");
      D.bars(430, 50, 490, 195, Object.entries(FUELS).map(([k, o]) => ({ l: o.l.split(" ")[0], v: o.kj, c: o.fl, hi: k === s.f })), { max: 125 });
      D.panel(420, 265, 510, 160, "CO₂ salımı (g CO₂ / MJ enerji)", "#f87171");
      D.bars(430, 285, 490, 135, Object.entries(FUELS).map(([k, o]) => ({ l: o.l.split(" ")[0], v: o.co2 / o.kj * 1000, c: "#f87171", hi: k === s.f })), { max: 110 });
      D.panel(420, 440, 510, 70, "Kaynak", F.ren.startsWith("Fosil") ? "#f87171" : "#4ade80");
      D.text(F.ren, 440, 485, { size: 13, weight: 700, color: F.ren.startsWith("Fosil") ? "#fca5a5" : "#86efac" });
    },
    readout(s) { const F = FUELS[s.f]; return [["Isı değeri", F.kj + " kJ/g", true], ["ΔT (su, %40 verim)", "+" + fx(this.dT(s) * Math.min(1, s.p), 1) + " °C"], ["CO₂", F.co2 ? fx(F.co2, 2) + " g / g yakıt" : "0 (yalnızca su)"]]; },
    note(s) { const F = FUELS[s.f]; return s.p <= 0 ? "Yakıtı seç ve yak. Tahmin et: hangisi suyu en çok ısıtır?" : s.f === "h2" ? "Hidrojen en yüksek ısı değerine sahip (≈120 kJ/g) ve yanınca yalnızca su oluşuyor. Yeşil hidrojen yenilenebilir enerjiyle üretilirse gerçekten temiz bir yakıttır." : F.l + ": " + F.kj + " kJ/g. Her MJ enerji için yaklaşık " + fx(F.co2 / F.kj * 1000, 0) + " g CO2 salınıyor. " + (F.ren.startsWith("Fosil") ? "Fosil yakıtlar yenilenemez ve sera etkisini artırır." : "Yenilenebilir kaynaktan gelse de üretiminin çevresel bedeli hesaba katılmalıdır."); }
  });
})();
