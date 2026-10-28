/* =========================================================
   SORCHEMIST — Meşale Yolu (ana sayfa arka planı)
   Sisli bir gece vadisinde, uzaktan giderek yaklaşan renkli meşaleler.
   Büyük meşalelerin her biri sitenin bir bölümüne açılan bir kapıdır.
   SC.createTorches(canvas, linkLayer, gates) → { reveal() }
   gates: [{ href, name, sub, rune, color }]
   ========================================================= */
(() => {
  "use strict";
  const SC = (window.SC = window.SC || {});
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
  const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const rgba = (h, a) => { const c = hex(h); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; };
  const mixW = (h, t) => { const c = hex(h); return `rgb(${c.map((v) => Math.round(v + (255 - v) * t)).join(",")})`; };
  // Tekrarlanabilir rastgele sayı
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  const AMBIENT = ["#f6c86a", "#5eead4", "#c084fc", "#7dd3fc", "#fb7185", "#34d399", "#fb923c"];

  SC.createTorches = (canvas, layer, gates, opts = {}) => {
    const ctx = canvas.getContext("2d");
    const reduced = SC.reduced, mouse = SC.mouse || { sx: 0, sy: 0 };
    let W = 0, H = 0, dpr = 1, f = 1, horizon = 0, mobile = false, sizeK = 1, since = 0;
    const CAM_Y = 1.25, FAR = 78;
    let camX = 0, camY = CAM_Y;
    let revealed = false, tReveal = 0, clock = 0, travel = 0, speed = reduced ? 0 : 7;
    let sky = null, hills = null;

    /* ---------- Dünya ---------- */
    // Yol kenarı meşaleleri (dekoratif)
    const lane = [];
    for (let i = 0; i < 26; i++) {
      const side = i % 2 ? 1 : -1;
      lane.push({ x: side * (4.2 + rnd() * 2.4), z: 3 + (i >> 1) * 6 + rnd() * 2, h: 1.6 + rnd() * .6, c: AMBIENT[Math.floor(rnd() * AMBIENT.length)], s: rnd() * 100, sp: [] });
    }
    // Uçuşan büyü tozları
    const motes = [];
    for (let i = 0; i < 140; i++) motes.push({ x: (rnd() - .5) * 18, y: rnd() * 5, z: 1 + rnd() * 60, c: AMBIENT[Math.floor(rnd() * AMBIENT.length)], p: rnd() * TAU });
    // Kapı meşaleleri
    const G = gates.map((g, i) => ({ ...g, i, x: 0, y: 0, z: FAR, tz: 8, hover: 0, hot: false, sp: [], s: i * 13.7, el: null, delay: i * .22, sx: 0, sy: 0, r: 0 }));

    /* ---------- Bağlantılar (erişilebilir HTML) ---------- */
    layer.innerHTML = "";
    G.forEach((g) => {
      const a = document.createElement("a");
      a.className = "torch"; a.href = g.href; a.style.setProperty("--c", g.color);
      a.dataset.cursor = "GİT";
      a.innerHTML = `<span class="torch-hit" aria-hidden="true"></span><span class="torch-label"><span class="torch-rune">${g.rune}</span><b>${g.name}</b><small>${g.sub}</small></span>`;
      const on = () => (g.hot = true), off = () => (g.hot = false);
      a.addEventListener("pointerenter", on); a.addEventListener("pointerleave", off);
      a.addEventListener("focus", on); a.addEventListener("blur", off);
      if (g.href.startsWith("#")) a.addEventListener("click", (e) => { const t = document.querySelector(g.href); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); } });
      layer.appendChild(a); g.el = a;
    });

    /* ---------- Yerleşim ---------- */
    function layout() {
      // Ekran hedefleri: [x oranı, alev y oranı, derinlik]
      const n = G.length;
      let spots;
      if (mobile) {
        const top = [[.2, .5, 9.5], [.5, .47, 10.5], [.8, .5, 9.5]], bot = [[.32, .71, 8], [.68, .71, 8]];
        spots = top.concat(bot).slice(0, n);
      } else {
        spots = Array.from({ length: n }, (_, i) => {
          const u = n === 1 ? 0 : i / (n - 1) * 2 - 1; // -1..1
          return [.5 + u * .38, .62 - (1 - u * u) * .05, 7.6 + (1 - Math.abs(u)) * 1.6];
        });
      }
      G.forEach((g, i) => {
        const [px, py, z] = spots[i];
        g.tz = z;
        g.x = (px * W - W / 2) * z / f;
        g.y = CAM_Y + (horizon - py * H) * z / f; // alev yüksekliği (dünya)
      });
    }

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mobile = W < 760;
      horizon = H * (mobile ? .7 : .68);
      f = Math.max(H * .95, W * .55);
      sizeK = mobile ? clamp(W / 820, .42, .8) : clamp(W / 1440, .8, 1.1);
      buildSky(); layout();
    }

    /* ---------- Gökyüzü ve tepeler (önbellek) ---------- */
    function buildSky() {
      sky = document.createElement("canvas"); sky.width = W; sky.height = H;
      const c = sky.getContext("2d");
      const g = c.createLinearGradient(0, 0, 0, horizon);
      g.addColorStop(0, "#03040a"); g.addColorStop(.55, "#0a0d1e"); g.addColorStop(.85, "#14183a"); g.addColorStop(1, "#1e2647");
      c.fillStyle = g; c.fillRect(0, 0, W, horizon + 2);
      // Bulutsu
      [["#6d28d9", .28, .3, .08], ["#0e7490", .7, .22, .07], ["#be185d", .55, .45, .05]].forEach(([col, x, y, a]) => {
        const r = Math.max(W, H) * .45, rg = c.createRadialGradient(x * W, y * H, 0, x * W, y * H, r);
        rg.addColorStop(0, rgba(col, a)); rg.addColorStop(1, rgba(col, 0)); c.fillStyle = rg; c.fillRect(0, 0, W, horizon);
      });
      // Yıldızlar
      const s0 = seed; seed = 99;
      for (let i = 0; i < W * H / 2600; i++) {
        const x = rnd() * W, y = Math.pow(rnd(), 1.4) * horizon * .95, r = rnd() < .06 ? 1.3 : .6;
        c.fillStyle = `rgba(230,236,255,${.25 + rnd() * .6})`; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
      }
      // Tepeler (iki katman)
      hills = [0, 1].map((k) => {
        const hc = document.createElement("canvas"); hc.width = W + 120; hc.height = H; const h = hc.getContext("2d");
        h.fillStyle = k ? "#070912" : "#0c1020";
        h.beginPath(); h.moveTo(0, horizon + 2);
        let y = horizon - (k ? 30 : 60) * (H / 900);
        for (let x = 0; x <= W + 120; x += 8) { y += (rnd() - .5) * (k ? 9 : 6); y = clamp(y, horizon - (k ? 70 : 120) * (H / 900), horizon - 6); h.lineTo(x, y); }
        h.lineTo(W + 120, horizon + 2); h.closePath(); h.fill();
        return hc;
      });
      seed = s0;
    }

    /* ---------- Projeksiyon ---------- */
    const P = (x, y, z) => ({ x: W / 2 + (x - camX) * f / z, y: horizon - (y - camY) * f / z, k: f / z });

    /* ---------- Çizim parçaları ---------- */
    function glow(x, y, r, col, a) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(col, a)); g.addColorStop(.35, rgba(col, a * .35)); g.addColorStop(1, rgba(col, 0));
      ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    function flame(x, y, r, col, t, sd, amp) {
      const fl = Math.sin(t * 9 + sd) * .08 + Math.sin(t * 15.3 + sd * 2) * .06 + Math.sin(t * 4.1 + sd) * .05;
      const sway = (Math.sin(t * 2.3 + sd) * .25 + Math.sin(t * 5.7 + sd) * .1) * r;
      [[1, rgba(col, .55)], [.78, rgba(col, .85)], [.5, mixW(col, .35)], [.26, "rgba(255,250,235,.95)"]].forEach(([k, fill]) => {
        const rr = r * k * amp * .78, top = y - rr * (3.6 + fl * 4) - r * (1 - k) * .35, tx = x + sway * k;
        ctx.beginPath(); ctx.moveTo(tx, top);
        ctx.bezierCurveTo(x + rr * .35, y - rr * 2.2, x + rr * 1.2, y - rr * .9, x + rr, y);
        ctx.arc(x, y, rr, 0, Math.PI);
        ctx.bezierCurveTo(x - rr * 1.2, y - rr * .9, x - rr * .35, y - rr * 2.2, tx, top);
        ctx.fillStyle = fill; ctx.fill();
      });
    }
    function brazier(x, y, r, col, baseY, lit) {
      // Direk
      const w0 = Math.max(1, r * .16), w1 = Math.max(1.5, r * .3);
      const g = ctx.createLinearGradient(x - w1, 0, x + w1, 0);
      g.addColorStop(0, "#07060a"); g.addColorStop(.5, "#2a2230"); g.addColorStop(1, "#07060a");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(x - w0, y + r * .7); ctx.lineTo(x + w0, y + r * .7); ctx.lineTo(x + w1, baseY); ctx.lineTo(x - w1, baseY); ctx.closePath(); ctx.fill();
      // Halka süsleri
      ctx.fillStyle = rgba(col, .35 * lit);
      [.35, .62].forEach((u) => { const yy = lerp(y + r * .7, baseY, u), ww = lerp(w0, w1, u) * 1.9; ctx.fillRect(x - ww, yy, ww * 2, Math.max(1, r * .1)); });
      // Kâse
      ctx.beginPath();
      ctx.moveTo(x - r * 1.25, y - r * .05); ctx.lineTo(x + r * 1.25, y - r * .05);
      ctx.quadraticCurveTo(x + r * 1.05, y + r * .9, x, y + r * .9);
      ctx.quadraticCurveTo(x - r * 1.05, y + r * .9, x - r * 1.25, y - r * .05);
      ctx.fillStyle = "#120f16"; ctx.fill();
      ctx.strokeStyle = rgba(col, .75 * lit); ctx.lineWidth = Math.max(1, r * .1); ctx.stroke();
      ctx.lineWidth = 1;
    }
    function embers(list, x, y, r, col, dt, rate) {
      if (!reduced && Math.random() < rate * dt * 60) list.push({ x: x + (Math.random() - .5) * r, y: y - r, vx: (Math.random() - .5) * r * .6, vy: -r * (1.2 + Math.random() * 1.6), l: 1 });
      for (let i = list.length - 1; i >= 0; i--) {
        const e = list[i]; e.l -= dt * .9; if (e.l <= 0) { list.splice(i, 1); continue; }
        e.x += e.vx * dt + Math.sin(clock * 3 + i) * .3; e.y += e.vy * dt;
        ctx.fillStyle = rgba(col, e.l * .9); ctx.fillRect(e.x, e.y, Math.max(1, r * .08), Math.max(1, r * .08));
      }
    }

    /* ---------- Bir meşale ---------- */
    function torch(o, yF, amp, lit, dt, emberRate, alpha) {
      const p = P(o.x, yF, o.z), base = P(o.x, 0, o.z);
      const r = .3 * p.k * sizeK * (o.big ? 1.05 : .85);
      if (p.x < -r * 8 || p.x > W + r * 8) return p;
      ctx.globalAlpha = alpha;
      // Yerdeki ışık
      ctx.globalCompositeOperation = "lighter";
      ctx.save(); ctx.translate(base.x, base.y); ctx.scale(1, .22);
      glow(0, 0, r * 7 * lit, o.c, .2 * lit); ctx.restore();
      ctx.globalCompositeOperation = "source-over";
      brazier(p.x, p.y, r, o.c, base.y, lit);
      ctx.globalCompositeOperation = "lighter";
      glow(p.x, p.y - r, r * (6 + 3 * lit) , o.c, .22 * lit + .08);
      flame(p.x, p.y, r, o.c, clock, o.s, amp);
      embers(o.sp, p.x, p.y, r, o.c, dt, emberRate);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      o.sx = p.x; o.sy = p.y; o.r = r;
      return p;
    }

    /* ---------- Döngü ---------- */
    let last = performance.now(), raf = 0, visible = true;
    function frame(now) {
      raf = requestAnimationFrame(frame);
      const dt = clamp((now - last) / 1000, 0, .05); last = now;
      if (!visible || document.hidden) return;
      clock += dt;
      since = revealed ? (now - tReveal) / 1000 : 0;
      // Hız: açılışta hızlı ilerleme, sonra ağır süzülme
      const target = reduced ? 0 : revealed ? lerp(9, .9, easeOut(since / 4.5)) : 2.2;
      speed = lerp(speed, target, 1 - Math.exp(-dt * 2));
      travel += speed * dt;
      camX = lerp(camX, mouse.sx * .45, 1 - Math.exp(-dt * 3));
      camY = lerp(camY, CAM_Y - mouse.sy * .12, 1 - Math.exp(-dt * 3));

      // Gökyüzü
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(sky, 0, 0);
      // Kayan ışık bandı (aurora)
      ctx.globalCompositeOperation = "lighter";
      for (let k = 0; k < 3; k++) {
        const yy = horizon * (.22 + k * .12) + Math.sin(clock * .2 + k) * 14, xx = W * (.5 + Math.sin(clock * .07 + k * 2) * .3);
        ctx.save(); ctx.translate(xx, yy); ctx.scale(3.2, .35); glow(0, 0, W * .22, ["#5eead4", "#a78bfa", "#38bdf8"][k], .045); ctx.restore();
      }
      ctx.globalCompositeOperation = "source-over";
      hills.forEach((h, k) => ctx.drawImage(h, -60 - camX * (k ? 22 : 10), 0));

      // Zemin
      const gg = ctx.createLinearGradient(0, horizon, 0, H);
      gg.addColorStop(0, "#151a30"); gg.addColorStop(.25, "#0a0d18"); gg.addColorStop(1, "#05060b");
      ctx.fillStyle = gg; ctx.fillRect(0, horizon, W, H - horizon);
      // Ufuk sisi
      ctx.globalCompositeOperation = "lighter";
      ctx.save(); ctx.translate(W / 2, horizon); ctx.scale(4, .5); glow(0, 0, W * .2, "#7c3aed", .12); ctx.restore();
      ctx.save(); ctx.translate(W / 2, horizon); ctx.scale(6, .25); glow(0, 0, W * .2, "#5eead4", .1); ctx.restore();
      ctx.globalCompositeOperation = "source-over";
      // Taş yol: yaklaşan çizgiler
      ctx.strokeStyle = "rgba(160,170,255,.07)";
      for (let z = 2 - (travel % 2); z < 60; z += 2) {
        const a = P(-1.6, 0, z), b = P(1.6, 0, z);
        ctx.globalAlpha = clamp(1 - z / 60, 0, 1);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      [-1.6, 1.6].forEach((x) => { const a = P(x, 0, 1.2), b = P(x, 0, 70); ctx.strokeStyle = "rgba(160,170,255,.1)"; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); });

      // Yol kenarı meşaleleri: uzaktan yaklaşır, yanımızdan geçer
      lane.forEach((o) => { o.z -= speed * dt; if (o.z < 1.2) { o.z += 6 * 13; o.c = AMBIENT[Math.floor(Math.random() * AMBIENT.length)]; o.sp.length = 0; } });
      // Kapı meşaleleri: açılışta uzaktan gelir
      G.forEach((g) => {
        const t = revealed ? (since - .4 - g.delay) / 4.2 : 0;
        g.z = reduced && revealed ? g.tz : lerp(FAR, g.tz, easeOut(t));
        g.hover = lerp(g.hover, g.hot ? 1 : 0, 1 - Math.exp(-dt * 8));
      });
      const anyHot = G.some((g) => g.hot);

      // Derinliğe göre sırala ve çiz
      const items = lane.map((o) => ({ o, z: o.z, lane: true })).concat(G.map((g) => ({ o: g, z: g.z })));
      items.sort((a, b) => b.z - a.z);
      for (const it of items) {
        const fog = clamp((FAR - it.z) / 30, 0, 1);
        if (it.lane) {
          const near = clamp((it.z - 1.2) / 2.5, 0, 1);
          const settle = revealed ? easeOut((since - 2.6) / 2.5) : 0; // varıştan sonra yakın meşaleler sise karışır
          const mist = lerp(1, clamp((it.z - 12) / 8, 0, 1), settle);
          if (fog * near * mist > .01) torch(it.o, it.o.h, 1, .6, dt, .2, fog * near * mist * .8);
        } else {
          const g = it.o, bob = Math.sin(clock * 1.3 + g.i) * .04;
          g.c = g.color; g.big = true;
          const lit = 1 + g.hover * .7 - (anyHot && !g.hot ? .35 : 0);
          torch(g, g.y + bob, 1 + g.hover * .35, lit, dt, .5 + g.hover * 1.2, Math.max(fog, .15));
        }
      }

      // Büyü tozları
      ctx.globalCompositeOperation = "lighter";
      motes.forEach((m) => {
        m.z -= speed * 1.1 * dt; if (m.z < .8) { m.z += 60; m.x = (Math.random() - .5) * 18; m.y = Math.random() * 5; }
        const p = P(m.x + Math.sin(clock * .5 + m.p) * .3, m.y + Math.sin(clock * .8 + m.p) * .2, m.z);
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) return;
        const a = clamp((60 - m.z) / 25, 0, 1) * (.4 + .6 * Math.abs(Math.sin(clock * 2 + m.p)));
        ctx.fillStyle = rgba(m.c, a * .8); const s = clamp(p.k * .025, .6, 3);
        ctx.fillRect(p.x, p.y, s, s);
      });
      ctx.globalCompositeOperation = "source-over";

      // HTML bağlantılarını alevlere hizala
      G.forEach((g) => {
        const arrived = revealed && (reduced || since > 2.8 + g.delay);
        g.el.style.transform = `translate3d(${g.sx.toFixed(1)}px, ${g.sy.toFixed(1)}px, 0)`;
        g.el.style.setProperty("--r", g.r.toFixed(1) + "px");
        g.el.classList.toggle("on", arrived);
        g.el.classList.toggle("dim", anyHot && !g.hot);
      });
    }

    resize();
    addEventListener("resize", resize);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(canvas);
    raf = requestAnimationFrame(frame);
    return {
      reveal() { if (!revealed) { revealed = true; tReveal = performance.now(); } },
      destroy() { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("resize", resize); }
    };
  };
})();
