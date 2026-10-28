/* =========================================================
   SORCHEMIST — Simya Atölyesi Deney Motoru
   SC.Atolye.register(def) ile deney tanımlanır.
   Her deney: kontroller (select/range/button/toggle), init, tick,
   draw (D çizim kütüphanesi ile), readout, note.
   Mantıksal tuval: 960 × 540
   ========================================================= */
(() => {
  "use strict";
  const SC = (window.SC = window.SC || {});
  const W = 960, H = 540, TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------------- Renk yardımcıları ---------------- */
  const hex = (h) => { const n = parseInt(String(h).replace("#", "").slice(0, 6), 16) || 0; return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const rgba = (h, a) => { if (String(h).startsWith("rgb")) return h.replace("rgb(", "rgba(").replace(")", "," + a + ")"); const c = hex(h); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; };
  const mix = (a, b, t) => { const A = hex(a), B = hex(b), k = clamp(t, 0, 1); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, "0")).join(""); };

  /* ---------------- Çizim kütüphanesi ---------------- */
  function makeD(ctx) {
    const D = { ctx, W, H, mix, rgba, clamp, lerp, TAU };
    let bgCache = null, bgKey = "";

    D.rr = (x, y, w, h, r) => { ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h); };
    D.glow = (x, y, r, color, a = .5) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(color, a)); g.addColorStop(1, rgba(color, 0));
      const op = ctx.globalCompositeOperation; ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
      ctx.globalCompositeOperation = op;
    };
    D.text = (t, x, y, o = {}) => {
      ctx.save();
      ctx.font = `${o.weight || 600} ${o.size || 12}px ${o.font || "'Plus Jakarta Sans', sans-serif"}`;
      ctx.fillStyle = o.color || "rgba(243,234,214,.8)"; ctx.textAlign = o.align || "left"; ctx.textBaseline = o.base || "alphabetic";
      if (o.ls && "letterSpacing" in ctx) ctx.letterSpacing = o.ls + "px";
      if (o.shadow) { ctx.shadowColor = "rgba(0,0,0,.8)"; ctx.shadowBlur = 6; }
      ctx.fillText(t, x, y); ctx.restore();
    };
    D.label = (t, x, y, color) => D.text(t.toLocaleUpperCase("tr"), x, y, { size: 10, weight: 700, ls: 2.4, color: color || "rgba(243,234,214,.5)", align: "center" });
    D.serif = (t, x, y, o = {}) => D.text(t, x, y, Object.assign({ font: "'Cormorant Garamond', serif", size: 22, weight: 600, color: "#f3ead6" }, o));
    D.mono = (t, x, y, o = {}) => D.text(t, x, y, Object.assign({ font: "'JetBrains Mono', monospace", size: 12, weight: 600, color: "#fde9b8" }, o));

    // Atölye arka planı (önbellekli): taş duvar, raflar, şişeler, tezgâh
    D.bg = (mood = "warm") => {
      const key = mood;
      if (!bgCache || bgKey !== key) {
        bgCache = document.createElement("canvas"); bgCache.width = W; bgCache.height = H; bgKey = key;
        const c = bgCache.getContext("2d");
        const g = c.createLinearGradient(0, 0, 0, H);
        const wall = mood === "night" ? ["#0b0f18", "#05070c"] : mood === "green" ? ["#0c1712", "#050b08"] : ["#1a110b", "#0b0705"];
        g.addColorStop(0, wall[0]); g.addColorStop(1, wall[1]); c.fillStyle = g; c.fillRect(0, 0, W, H);
        // taş örgü
        c.strokeStyle = "rgba(255,220,180,.04)"; c.lineWidth = 1;
        for (let y = 8; y < 400; y += 30) for (let x = ((y / 30) | 0) % 2 ? -35 : 0; x < W; x += 70) { c.beginPath(); if (c.roundRect) c.roundRect(x + 2, y + 2, 66, 26, 5); else c.rect(x + 2, y + 2, 66, 26); c.stroke(); }
        // raf ve şişeler
        c.fillStyle = "#2a1a0e"; c.fillRect(24, 92, 210, 7); c.fillRect(W - 234, 92, 210, 7);
        const bottles = [["#38bdf8", 34], ["#f59e0b", 66], ["#a78bfa", 98], ["#34d399", 134], ["#fb7185", 168], ["#fde047", 200]];
        bottles.forEach(([col, x], k) => {
          [x, W - 234 + (x - 24)].forEach((bx) => {
            const h = 30 + (k % 3) * 9;
            c.fillStyle = rgba(col, .2); c.beginPath(); if (c.roundRect) c.roundRect(bx, 92 - h, 20, h, 4); else c.rect(bx, 92 - h, 20, h); c.fill();
            c.fillStyle = rgba(col, .35); c.fillRect(bx + 2, 92 - h * .55, 16, h * .55 - 2);
            c.fillStyle = "rgba(255,255,255,.08)"; c.fillRect(bx + 6, 92 - h - 10, 8, 10);
          });
        });
        // tezgâh
        const tg = c.createLinearGradient(0, 430, 0, H); tg.addColorStop(0, "#3a2414"); tg.addColorStop(.06, "#26170c"); tg.addColorStop(1, "#110a05");
        c.fillStyle = tg; c.fillRect(0, 430, W, H - 430);
        c.fillStyle = "rgba(255,200,140,.12)"; c.fillRect(0, 430, W, 2);
        c.strokeStyle = "rgba(0,0,0,.35)"; for (let x = 0; x < W; x += 120) { c.beginPath(); c.moveTo(x + 40, 432); c.lineTo(x + 20, H); c.stroke(); }
        // vinyet
        const v = c.createRadialGradient(W / 2, H * .45, H * .3, W / 2, H * .45, W * .7); v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,.6)");
        c.fillStyle = v; c.fillRect(0, 0, W, H);
      }
      ctx.drawImage(bgCache, 0, 0);
    };

    D.candle = (x, y, t, s = 1) => {
      ctx.fillStyle = "#e8dcc0"; D.rr(x - 6 * s, y - 34 * s, 12 * s, 34 * s, 2); ctx.fill();
      ctx.fillStyle = "rgba(0,0,0,.2)"; ctx.fillRect(x + 2 * s, y - 34 * s, 4 * s, 34 * s);
      const f = 1 + Math.sin(t * 9 + x) * .08 + Math.sin(t * 23 + x) * .04;
      D.glow(x, y - 44 * s, 70 * s, "#fb923c", .22);
      ctx.fillStyle = "#fde68a"; ctx.beginPath(); ctx.ellipse(x, y - 42 * s, 4 * s, 9 * s * f, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = "#fff7d6"; ctx.beginPath(); ctx.ellipse(x, y - 40 * s, 2 * s, 4 * s, 0, 0, TAU); ctx.fill();
    };

    D.stand = (x, y, h = 240) => { // demir destek
      ctx.fillStyle = "#3f3f46"; ctx.fillRect(x - 3, y - h, 6, h); ctx.fillStyle = "#27272a"; D.rr(x - 40, y - 8, 80, 8, 2); ctx.fill();
    };

    // Erlenmayer: (x, y alt orta), s ölçek, fill 0..1, color
    D.flaskPath = (x, y, s) => {
      const nw = 18 * s, bw = 62 * s, h = 110 * s, nh = 38 * s;
      ctx.beginPath();
      ctx.moveTo(x - nw, y - h); ctx.lineTo(x - nw, y - h + nh); ctx.lineTo(x - bw, y - 8 * s);
      ctx.quadraticCurveTo(x - bw - 2 * s, y, x - bw + 10 * s, y); ctx.lineTo(x + bw - 10 * s, y);
      ctx.quadraticCurveTo(x + bw + 2 * s, y, x + bw, y - 8 * s); ctx.lineTo(x + nw, y - h + nh); ctx.lineTo(x + nw, y - h);
    };
    D.flask = (x, y, s, o = {}) => {
      const fill = clamp(o.fill ?? .4, 0, 1), col = o.color || "#38bdf8", h = 110 * s;
      if (o.glow) D.glow(x, y - 30 * s, 110 * s, col, o.glow);
      const top = y - fill * (h - 40 * s) - 4 * s;
      ctx.save(); D.flaskPath(x, y, s); ctx.closePath(); ctx.clip();
      const g = ctx.createLinearGradient(0, top, 0, y); g.addColorStop(0, rgba(col, o.alpha ?? .85)); g.addColorStop(1, rgba(mix(col, "#000000", .35), o.alpha ?? .9));
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 80 * s, y + 4);
      for (let px = -80; px <= 80; px += 6) ctx.lineTo(x + px * s, top + Math.sin(px * .12 + (o.t || 0) * 4) * 1.6 * s + (o.tilt || 0) * px * s / 80);
      ctx.lineTo(x + 80 * s, y + 4); ctx.closePath(); ctx.fill();
      if (o.inner) o.inner(top);
      ctx.restore();
      D.flaskPath(x, y, s); ctx.strokeStyle = "rgba(226,240,255,.65)"; ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,.22)"; ctx.beginPath(); ctx.moveTo(x - 10 * s, y - h + 6 * s); ctx.lineTo(x - 10 * s, y - h + 38 * s); ctx.lineTo(x - 44 * s, y - 16 * s); ctx.stroke();
      ctx.fillStyle = "rgba(226,240,255,.6)"; ctx.fillRect(x - 22 * s, y - h - 2, 44 * s, 3);
      return top;
    };
    // Beher
    D.beaker = (x, y, w, h, o = {}) => {
      const fill = clamp(o.fill ?? .5, 0, 1), col = o.color || "#38bdf8";
      if (o.glow) D.glow(x, y - h / 2, w, col, o.glow);
      const top = y - fill * (h - 8);
      ctx.save(); D.rr(x - w / 2, y - h, w, h, 6); ctx.clip();
      const g = ctx.createLinearGradient(0, top, 0, y); g.addColorStop(0, rgba(col, o.alpha ?? .82)); g.addColorStop(1, rgba(mix(col, "#000000", .3), o.alpha ?? .9));
      ctx.fillStyle = g; ctx.fillRect(x - w / 2, top, w, y - top);
      if (o.inner) o.inner(top);
      ctx.restore();
      ctx.strokeStyle = "rgba(226,240,255,.6)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - w / 2 - 4, y - h); ctx.lineTo(x - w / 2, y - h + 4); ctx.lineTo(x - w / 2, y - 6); ctx.quadraticCurveTo(x - w / 2, y, x - w / 2 + 6, y); ctx.lineTo(x + w / 2 - 6, y); ctx.quadraticCurveTo(x + w / 2, y, x + w / 2, y - 6); ctx.lineTo(x + w / 2, y - h); ctx.stroke();
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(226,240,255,.25)";
      for (let k = 1; k < 5; k++) { const yy = y - (h - 10) * k / 5; ctx.beginPath(); ctx.moveTo(x - w / 2 + 4, yy); ctx.lineTo(x - w / 2 + 14, yy); ctx.stroke(); }
      ctx.fillStyle = "rgba(255,255,255,.12)"; ctx.fillRect(x + w / 2 - 12, y - h + 10, 4, h - 22);
      return top;
    };
    // Deney tüpü
    D.tube = (x, y, h, o = {}) => {
      const w = o.w || 26, fill = clamp(o.fill ?? .5, 0, 1), col = o.color || "#38bdf8";
      if (o.glow) D.glow(x, y - h * .3, 60, col, o.glow);
      const top = y - fill * (h - 10);
      ctx.save(); ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2, y - w / 2); ctx.arc(x, y - w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(x + w / 2, y - h); ctx.closePath(); ctx.clip();
      ctx.fillStyle = rgba(col, o.alpha ?? .85); ctx.fillRect(x - w, top, w * 2, y - top + 2);
      if (o.inner) o.inner(top);
      ctx.restore();
      ctx.strokeStyle = "rgba(226,240,255,.65)"; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2, y - w / 2); ctx.arc(x, y - w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(x + w / 2, y - h); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(255,255,255,.18)"; ctx.fillRect(x - w / 2 + 4, y - h + 8, 3, h - w);
      return top;
    };
    // Termometre
    D.thermo = (x, y, h, val, min, max, o = {}) => {
      const f = clamp((val - min) / (max - min), 0, 1);
      ctx.fillStyle = "rgba(255,255,255,.06)"; D.rr(x - 6, y - h, 12, h, 6); ctx.fill(); ctx.strokeStyle = "rgba(243,234,214,.35)"; ctx.stroke();
      ctx.fillStyle = o.color || "#ef4444"; ctx.beginPath(); ctx.arc(x, y + 6, 10, 0, TAU); ctx.fill();
      D.rr(x - 3, y - (h - 6) * f, 6, (h - 6) * f + 4, 3); ctx.fill();
      ctx.strokeStyle = "rgba(243,234,214,.3)"; for (let k = 0; k <= 10; k++) { const yy = y - (h - 6) * k / 10; ctx.beginPath(); ctx.moveTo(x + 8, yy); ctx.lineTo(x + (k % 5 ? 12 : 16), yy); ctx.stroke(); }
      D.mono((o.fmt ? o.fmt(val) : val.toFixed(1)) + (o.unit ?? " °C"), x + (o.right ? 22 : 0), o.right ? y - (h - 6) * f + 4 : y + 32, { align: o.right ? "left" : "center", size: 12 });
    };
    // Alev (Bunsen)
    D.burner = (x, y, size, color = "#60a5fa", t = 0, on = true) => {
      ctx.fillStyle = "#52525b"; ctx.fillRect(x - 7, y - 46, 14, 40); ctx.fillStyle = "#3f3f46"; D.rr(x - 26, y - 8, 52, 8, 3); ctx.fill();
      ctx.fillStyle = "#71717a"; ctx.fillRect(x - 9, y - 48, 18, 4);
      if (on && size > 0) D.flame(x, y - 48, size, color, t);
    };
    D.flame = (x, y, size, color = "#60a5fa", t = 0) => {
      const op = ctx.globalCompositeOperation; ctx.globalCompositeOperation = "lighter";
      D.glow(x, y - size * .5, size * 1.6, color, .35);
      for (let i = 0; i < 3; i++) {
        const h = size * (1 - i * .22) * (.9 + .1 * Math.sin(t * 13 + i * 2)), w = size * .28 * (1 - i * .2);
        const g = ctx.createLinearGradient(0, y, 0, y - h);
        g.addColorStop(0, rgba(i === 2 ? "#ffffff" : "#93c5fd", .9)); g.addColorStop(.25, rgba(color, .85)); g.addColorStop(1, rgba(color, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - w, y);
        ctx.quadraticCurveTo(x - w * .8, y - h * .55, x + Math.sin(t * 8 + i) * w * .3, y - h);
        ctx.quadraticCurveTo(x + w * .8, y - h * .55, x + w, y); ctx.fill();
      }
      ctx.globalCompositeOperation = op;
    };
    D.balloon = (x, y, r, color = "#fb7185") => {
      if (r < 2) return;
      const g = ctx.createRadialGradient(x - r * .35, y - r * .5, r * .1, x, y - r * .2, r * 1.2);
      g.addColorStop(0, mix(color, "#ffffff", .45)); g.addColorStop(1, mix(color, "#000000", .25));
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y - r * 1.05, r * .92, r * 1.08, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = mix(color, "#000000", .3); ctx.beginPath(); ctx.moveTo(x - 5, y + 2); ctx.lineTo(x + 5, y + 2); ctx.lineTo(x, y - 6); ctx.fill();
    };
    D.bulb = (x, y, b) => { // b: 0..1 parlaklık
      if (b > .02) D.glow(x, y, 40 + b * 110, "#fde68a", .25 + b * .55);
      ctx.fillStyle = b > .02 ? mix("#6b5d3a", "#fff7c2", b) : "rgba(255,255,255,.1)";
      ctx.beginPath(); ctx.arc(x, y, 18, 0, TAU); ctx.fill(); ctx.strokeStyle = "rgba(243,234,214,.6)"; ctx.stroke();
      ctx.strokeStyle = b > .02 ? "#fff" : "rgba(243,234,214,.5)"; ctx.beginPath(); ctx.moveTo(x - 6, y + 4); ctx.lineTo(x - 3, y - 5); ctx.lineTo(x, y + 2); ctx.lineTo(x + 3, y - 5); ctx.lineTo(x + 6, y + 4); ctx.stroke();
      ctx.fillStyle = "#71717a"; ctx.fillRect(x - 9, y + 16, 18, 12);
    };
    D.wire = (pts, color = "#f59e0b", w = 2) => { ctx.strokeStyle = color; ctx.lineWidth = w; ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.stroke(); ctx.lineWidth = 1; };
    // Panel (koyu, ince çerçeveli)
    D.panel = (x, y, w, h, title, color = "#6ee7b7") => {
      ctx.fillStyle = "rgba(4,8,6,.82)"; D.rr(x, y, w, h, 8); ctx.fill();
      ctx.strokeStyle = rgba(color, .35); ctx.stroke();
      if (title) D.text(title.toLocaleUpperCase("tr"), x + 14, y + 20, { size: 10, weight: 700, ls: 2.2, color: rgba(color, .9) });
    };
    // Grafik
    D.graph = (x, y, w, h, o = {}) => {
      const { xmin = 0, xmax = 1, ymin = 0, ymax = 1 } = o;
      const X = (v) => x + 34 + (v - xmin) / (xmax - xmin) * (w - 46), Y = (v) => y + h - 22 - (v - ymin) / (ymax - ymin) * (h - 44);
      ctx.strokeStyle = "rgba(243,234,214,.25)"; ctx.beginPath(); ctx.moveTo(X(xmin), Y(ymax)); ctx.lineTo(X(xmin), Y(ymin)); ctx.lineTo(X(xmax), Y(ymin)); ctx.stroke();
      ctx.strokeStyle = "rgba(243,234,214,.07)";
      for (let k = 1; k < 4; k++) { const yy = Y(ymin + (ymax - ymin) * k / 4); ctx.beginPath(); ctx.moveTo(X(xmin), yy); ctx.lineTo(X(xmax), yy); ctx.stroke(); }
      if (o.ylabel) D.text(o.ylabel, x + 8, y + 32, { size: 10, color: "rgba(243,234,214,.55)" });
      if (o.xlabel) D.text(o.xlabel, x + w - 10, y + h - 6, { size: 10, color: "rgba(243,234,214,.55)", align: "right" });
      (o.ticksY || []).forEach((v) => D.text(String(v), X(xmin) - 5, Y(v) + 3, { size: 9, color: "rgba(243,234,214,.45)", align: "right" }));
      (o.ticksX || []).forEach((v) => D.text(String(v), X(v), Y(ymin) + 13, { size: 9, color: "rgba(243,234,214,.45)", align: "center" }));
      (o.hlines || []).forEach(([v, col, lab]) => { ctx.setLineDash([4, 4]); ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(X(xmin), Y(v)); ctx.lineTo(X(xmax), Y(v)); ctx.stroke(); ctx.setLineDash([]); if (lab) D.text(lab, X(xmax) - 4, Y(v) - 4, { size: 9, color: col, align: "right" }); });
      (o.series || []).forEach((s) => {
        if (!s.pts.length) return;
        ctx.strokeStyle = s.color; ctx.lineWidth = s.w || 2; if (s.dash) ctx.setLineDash(s.dash);
        ctx.beginPath(); s.pts.forEach(([a, b], i) => (i ? ctx.lineTo(X(a), Y(b)) : ctx.moveTo(X(a), Y(b)))); ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1;
        if (s.dot) { const [a, b] = s.pts[s.pts.length - 1]; D.glow(X(a), Y(b), 14, s.color, .8); ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(X(a), Y(b), 3, 0, TAU); ctx.fill(); }
      });
      return { X, Y };
    };
    D.bars = (x, y, w, h, items, o = {}) => { // items: [{l, v, c}]
      const max = o.max || Math.max(...items.map((i) => i.v)) || 1, bw = (w - 20) / items.length;
      items.forEach((it, i) => {
        const bh = (h - 34) * clamp(it.v / max, 0, 1), bx = x + 10 + i * bw + bw * .15;
        const g = ctx.createLinearGradient(0, y + h - 18 - bh, 0, y + h - 18); g.addColorStop(0, it.c || "#f6c86a"); g.addColorStop(1, rgba(it.c || "#f6c86a", .25));
        ctx.fillStyle = g; D.rr(bx, y + h - 18 - bh, bw * .7, bh, 3); ctx.fill();
        if (it.hi) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.stroke(); ctx.lineWidth = 1; }
        D.text(it.l, bx + bw * .35, y + h - 5, { size: 9, color: it.hi ? "#fff" : "rgba(243,234,214,.6)", align: "center" });
      });
    };
    D.bubbles = (arr, top, x0, x1, bottom, rate, dt) => {
      if (Math.random() < rate * dt * 60) arr.push({ x: lerp(x0, x1, Math.random()), y: bottom - 4, r: 1 + Math.random() * 2.6, v: 30 + Math.random() * 50 });
      for (let i = arr.length - 1; i >= 0; i--) { const b = arr[i]; b.y -= b.v * dt; b.x += Math.sin(b.y * .08) * .3; if (b.y < top + 2) { arr.splice(i, 1); continue; } ctx.strokeStyle = "rgba(255,255,255,.6)"; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.stroke(); }
    };
    D.sparks = (arr, dt, g = 300) => {
      const op = ctx.globalCompositeOperation; ctx.globalCompositeOperation = "lighter";
      for (let i = arr.length - 1; i >= 0; i--) { const p = arr[i]; p.life += dt; const px = p.x, py = p.y; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += g * dt; const k = 1 - p.life / p.max; if (k <= 0) { arr.splice(i, 1); continue; } ctx.strokeStyle = rgba(p.c, k); ctx.lineWidth = p.w || 1.6; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(p.x, p.y); ctx.stroke(); }
      ctx.lineWidth = 1; ctx.globalCompositeOperation = op;
    };
    D.burst = (arr, x, y, n, c, spd = 160, up = 0) => { for (let i = 0; i < n; i++) { const a = Math.random() * TAU, s = spd * (.4 + Math.random() * .8); arr.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - up, life: 0, max: .5 + Math.random() * .6, c: Array.isArray(c) ? c[i % c.length] : c }); } };
    D.smoke = (arr, dt, color = "226,232,240") => {
      for (let i = arr.length - 1; i >= 0; i--) { const p = arr[i]; p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += 14 * dt; const k = 1 - p.life / p.max; if (k <= 0) { arr.splice(i, 1); continue; } ctx.fillStyle = `rgba(${p.color || color},${k * (p.a || .25)})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill(); }
    };
    D.atom = (x, y, r, color, o = {}) => {
      const g = ctx.createRadialGradient(x - r * .35, y - r * .35, r * .1, x, y, r);
      g.addColorStop(0, "#ffffff"); g.addColorStop(.3, color); g.addColorStop(1, mix(color, "#000000", .55));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      if (o.label) D.text(o.label, x, y + 4, { size: Math.max(9, r * .8), weight: 800, color: o.labelColor || "#0b0f14", align: "center" });
    };
    D.arrow = (x1, y1, x2, y2, color = "#f6c86a") => {
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      const a = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 9 * Math.cos(a - .4), y2 - 9 * Math.sin(a - .4)); ctx.lineTo(x2 - 9 * Math.cos(a + .4), y2 - 9 * Math.sin(a + .4)); ctx.fill(); ctx.lineWidth = 1;
    };
    D.parchment = (x, y, w, h) => {
      const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, "#fbf2da"); g.addColorStop(.6, "#f1dcae"); g.addColorStop(1, "#e3c68c");
      ctx.fillStyle = g; D.rr(x, y, w, h, 4); ctx.fill(); ctx.strokeStyle = "#a06a35"; ctx.lineWidth = 1.5; ctx.stroke(); ctx.lineWidth = 1;
    };
    return D;
  }

  /* ---------------- Kayıt ---------------- */
  const defs = [];
  const Atolye = (SC.Atolye = { defs, W, H, register(def) { defs.push(def); }, byId: (id) => defs.find((d) => d.id === id), makeD, mix, rgba, clamp, lerp });

  /* ---------------- Sahneye bağlama ---------------- */
  // stage: { canvas, controls (element), readout (element), note (element) }
  Atolye.mount = (def, els) => {
    const canvas = els.canvas, ctx = canvas.getContext("2d");
    const D = makeD(ctx);
    const s = { t: 0, _def: def, pointer: { x: -1, y: -1, in: false, down: false } };
    (def.controls || []).forEach((c) => { if ("v" in c) s[c.k] = c.v; else if (c.type === "select") s[c.k] = c.options[0].v; else if (c.type === "range") s[c.k] = c.min; else if (c.type === "toggle") s[c.k] = false; });
    if (def.init) def.init(s);

    // Kontrol paneli üret
    const ctl = els.controls; ctl.innerHTML = "";
    const sync = {};
    (def.controls || []).forEach((c) => {
      const wrap = document.createElement("div"); wrap.className = "ctl ctl-" + c.type;
      if (c.type === "select") {
        wrap.innerHTML = `<span class="ctl-label">${c.label}</span><div class="ctl-chips" role="radiogroup" aria-label="${c.label}"></div>`;
        const box = wrap.querySelector(".ctl-chips");
        c.options.forEach((o) => {
          const b = document.createElement("button"); b.type = "button"; b.className = "chip-btn"; b.setAttribute("role", "radio");
          b.innerHTML = (o.dot ? `<i style="background:${o.dot}"></i>` : "") + (SC.chem ? SC.chem(o.l) : o.l);
          b.addEventListener("click", () => { s[c.k] = o.v; if (c.onChange) c.onChange(s, o.v); upd(); SC.Sound && SC.Sound.tick(); });
          box.appendChild(b);
        });
        const upd = () => [...box.children].forEach((b, i) => b.setAttribute("aria-checked", String(c.options[i].v === s[c.k])));
        sync[c.k] = upd; upd();
      } else if (c.type === "range") {
        const id = "r-" + def.id + "-" + c.k;
        wrap.innerHTML = `<label for="${id}" class="ctl-top"><span class="ctl-label">${SC.chem ? SC.chem(c.label) : c.label}</span><b></b></label><input type="range" id="${id}" min="${c.min}" max="${c.max}" step="${c.step || 1}">`;
        const inp = wrap.querySelector("input"), out = wrap.querySelector("b");
        wrap.style.setProperty("--c", c.color || "#f6c86a");
        const upd = () => { inp.value = s[c.k]; out.textContent = (c.fmt ? c.fmt(s[c.k]) : s[c.k]) + (c.unit || ""); inp.style.setProperty("--p", ((s[c.k] - c.min) / (c.max - c.min)) * 100 + "%"); };
        inp.addEventListener("input", () => { s[c.k] = Number(inp.value); if (c.onChange) c.onChange(s, s[c.k]); upd(); });
        sync[c.k] = upd; upd();
      } else if (c.type === "toggle") {
        wrap.innerHTML = `<button type="button" class="btn btn-sm toggle-btn" aria-pressed="false" style="--c:${c.color || "#34d399"}">${c.label}</button>`;
        const b = wrap.querySelector("button");
        const upd = () => b.setAttribute("aria-pressed", String(!!s[c.k]));
        b.addEventListener("click", () => { s[c.k] = !s[c.k]; if (c.onChange) c.onChange(s, s[c.k]); upd(); SC.Sound && SC.Sound.tick(); });
        sync[c.k] = upd; upd();
      } else if (c.type === "button") {
        wrap.innerHTML = `<button type="button" class="btn ${c.primary ? "btn-gold" : ""} btn-sm" data-magnetic=".4">${c.label}</button>`;
        wrap.querySelector("button").addEventListener("click", () => { c.act(s, D); Object.values(sync).forEach((f) => f()); });
      }
      ctl.appendChild(wrap);
    });
    s.sync = () => Object.values(sync).forEach((f) => f());

    // Tuval boyutu
    const fit = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2), cw = canvas.clientWidth || W;
      canvas.width = Math.round(cw * dpr); canvas.height = Math.round(cw * H / W * dpr);
      ctx.setTransform(canvas.width / W, 0, 0, canvas.width / W, 0, 0);
    };
    fit();
    const ro = window.ResizeObserver ? new ResizeObserver(fit) : null; if (ro) ro.observe(canvas);

    // İşaretçi
    const toLocal = (e) => { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; };
    const onMove = (e) => { const p = toLocal(e); s.pointer.x = p.x; s.pointer.y = p.y; s.pointer.in = true; };
    const onDown = (e) => { const p = toLocal(e); s.pointer.down = true; if (def.click) { def.click(s, p.x, p.y, D); s.sync(); } };
    const onUp = () => (s.pointer.down = false);
    const onLeave = () => (s.pointer.in = false);
    canvas.addEventListener("pointermove", onMove); canvas.addEventListener("pointerdown", onDown);
    addEventListener("pointerup", onUp); canvas.addEventListener("pointerleave", onLeave);

    // Döngü
    let raf = 0, last = performance.now(), alive = true, visible = true, lastUI = 0;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting)); io.observe(canvas);
    const loop = (now) => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const dt = clamp((now - last) / 1000, 0, .05); last = now;
      if (!visible || document.hidden) return;
      s.t += dt;
      if (def.tick) def.tick(s, dt);
      ctx.save(); def.draw(D, s, s.t, dt); ctx.restore();
      if (now - lastUI > 120) {
        lastUI = now;
        if (els.readout && def.readout) els.readout.innerHTML = def.readout(s).map(([k, v, hl]) => `<div class="ro${hl ? " hl" : ""}"><dt>${k}</dt><dd>${v}</dd></div>`).join("");
        if (els.note && def.note) { const n = def.note(s); if (els.note.dataset.v !== n) { els.note.dataset.v = n; els.note.innerHTML = SC.chem ? SC.chem(n) : n; } }
      }
    };
    raf = requestAnimationFrame(loop);
    return { state: s, destroy() { alive = false; cancelAnimationFrame(raf); if (ro) ro.disconnect(); io.disconnect(); removeEventListener("pointerup", onUp); } };
  };
})();
