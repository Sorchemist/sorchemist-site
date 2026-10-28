/* =========================================================
   SORCHEMIST — Ortak Etkileşim Katmanı
   window.SC altında: yardımcılar, fare durumu, özel imleç,
   manyetik butonlar, eğilen kartlar, spotlight, menü, üst bar,
   sayfa geçişleri, görünür olunca belirme ve ses motoru.
   ========================================================= */
(() => {
  "use strict";
  const SC = (window.SC = window.SC || {});
  const $ = (SC.$ = (s, r = document) => r.querySelector(s));
  const $$ = (SC.$$ = (s, r = document) => [...r.querySelectorAll(s)]);
  const clamp = (SC.clamp = (v, a, b) => Math.min(b, Math.max(a, v)));
  const lerp = (SC.lerp = (a, b, t) => a + (b - a) * t);
  const reduced = (SC.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches);
  const finePointer = (SC.finePointer = matchMedia("(pointer: fine)").matches);
  SC.store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };
  SC.escapeHTML = (s) => String(s ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  SC.trLower = (s) => String(s ?? "").toLocaleLowerCase("tr");

  // Kimyasal metni biçimlendir: alt/üst simgeler, oklar, H2O → H₂O
  SC.chem = (str) => {
    if (!str) return "";
    const subMap = { "₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9" };
    const supMap = { "⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁺":"+","⁻":"-" };
    return SC.escapeHTML(str)
      // Formüllerdeki sayıları alt simge yap (ör. H2SO4, CuSO4·5H2O) — katsayılara dokunmaz
      .replace(/([A-Z][a-z]?|\))(\d+)/g, "$1<sub>$2</sub>")
      .replace(/[₀₁₂₃₄₅₆₇₈₉]+/g, (m) => "<sub>" + [...m].map((c) => subMap[c] || c).join("") + "</sub>")
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, (m) => "<sup>" + [...m].map((c) => supMap[c] || c).join("") + "</sup>")
      .replace(/→/g, '<span class="arrow-chem">→</span>')
      .replace(/⇌/g, '<span class="arrow-chem">⇌</span>');
  };

  /* ---------------- Fare durumu ---------------- */
  const mouse = (SC.mouse = { x: innerWidth / 2, y: innerHeight / 2, nx: 0, ny: 0, sx: 0, sy: 0 });
  addEventListener("pointermove", (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    mouse.nx = (e.clientX / innerWidth) * 2 - 1;
    mouse.ny = (e.clientY / innerHeight) * 2 - 1;
  }, { passive: true });
  addEventListener("deviceorientation", (e) => {
    if (e.gamma == null) return;
    mouse.nx = clamp(e.gamma / 30, -1, 1);
    mouse.ny = clamp((e.beta - 45) / 30, -1, 1);
  }, { passive: true });

  // Kare döngüsü aboneleri
  const frameFns = new Set();
  SC.onFrame = (fn) => { frameFns.add(fn); return () => frameFns.delete(fn); };

  /* ---------------- Ses motoru (WebAudio, dosyasız) ---------------- */
  const Sound = (SC.Sound = {
    ctx: null, master: null, fx: null, on: false, chimeTimer: null, noiseBuf: null,
    init() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      const ctx = (this.ctx = new AC());
      const master = (this.master = ctx.createGain());
      master.gain.value = 0;
      const delay = ctx.createDelay(); delay.delayTime.value = .42;
      const fb = ctx.createGain(); fb.gain.value = .36;
      const wet = ctx.createGain(); wet.gain.value = .33;
      delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
      this.fx = delay;
      master.connect(ctx.destination);
      // Gürültü tamponu (rüzgâr, körük, buhar)
      const buf = (this.noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate));
      const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      // Drone
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 520; lp.Q.value = .7;
      const lfo = ctx.createOscillator(); lfo.frequency.value = .05;
      const lfoGain = ctx.createGain(); lfoGain.gain.value = 260;
      lfo.connect(lfoGain); lfoGain.connect(lp.frequency); lfo.start();
      [[55, "sine", .3], [82.41, "triangle", .1], [110.2, "sine", .13], [164.8, "sine", .045]].forEach(([f, type, g]) => {
        const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = (Math.random() - .5) * 12;
        const og = ctx.createGain(); og.gain.value = g; o.connect(og); og.connect(lp); o.start();
      });
      lp.connect(master);
      // Rüzgâr
      const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 420; bp.Q.value = .6;
      const ng = ctx.createGain(); ng.gain.value = .04;
      const wl = ctx.createOscillator(); wl.frequency.value = .08; const wlg = ctx.createGain(); wlg.gain.value = 220;
      wl.connect(wlg); wlg.connect(bp.frequency); wl.start();
      noise.connect(bp); bp.connect(ng); ng.connect(master); noise.start();
      return true;
    },
    ok() { return this.ctx && this.on; },
    tone(freq, { vol = .05, dur = 2.4, type = "sine", partial = 2.01, wet = true, attack = .02 } = {}) {
      if (!this.ok()) return;
      const t = this.ctx.currentTime;
      const o = this.ctx.createOscillator(); o.type = type; o.frequency.value = freq;
      const o2 = this.ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = freq * partial;
      const g = this.ctx.createGain(); g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + attack); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      const g2 = this.ctx.createGain(); g2.gain.value = .25;
      o.connect(g); o2.connect(g2); g2.connect(g); g.connect(this.master); if (wet) g.connect(this.fx);
      o.start(t); o2.start(t); o.stop(t + dur + .05); o2.stop(t + dur + .05);
    },
    chime(freq, vol = .05, dur = 2.4) { this.tone(freq, { vol, dur }); },
    tick() { this.tone(1760 + Math.random() * 400, { vol: .012, dur: .25, wet: false }); },
    noise({ vol = .2, dur = .5, type = "bandpass", freq = 800, q = 1, sweep = 0 } = {}) {
      if (!this.ok()) return;
      const t = this.ctx.currentTime;
      const src = this.ctx.createBufferSource(); src.buffer = this.noiseBuf;
      const f = this.ctx.createBiquadFilter(); f.type = type; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
      if (sweep) f.frequency.exponentialRampToValueAtTime(Math.max(40, freq + sweep), t + dur);
      const g = this.ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .03); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      src.connect(f); f.connect(g); g.connect(this.master);
      src.start(t, Math.random()); src.stop(t + dur + .05);
    },
    // Örs çekici: uyumsuz metalik kısmi sesler
    clang() {
      if (!this.ok()) return;
      [1, 2.76, 5.4, 8.93].forEach((p, i) => this.tone(420 * p, { vol: .07 / (i + 1), dur: 1.2 - i * .2, type: "sine", partial: 1.003, attack: .002 }));
      this.noise({ vol: .12, dur: .08, type: "highpass", freq: 3000 });
    },
    whoosh() { this.noise({ vol: .22, dur: .7, type: "bandpass", freq: 300, q: .8, sweep: 900 }); },
    hiss() { this.noise({ vol: .25, dur: 1.8, type: "highpass", freq: 2500, q: .5 }); },
    drip() { if (!this.ok()) return; const f = 900 + Math.random() * 500; this.tone(f, { vol: .04, dur: .18, wet: true, partial: 1.5, attack: .001 }); },
    bubble() { this.tone(300 + Math.random() * 500, { vol: .015, dur: .12, wet: false, partial: 1.6, attack: .001 }); },
    success() { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => setTimeout(() => this.chime(f, .04, 2), i * 110)); },
    fail() { this.tone(196, { vol: .05, dur: .6, type: "triangle", partial: 1.06 }); },
    scheduleChimes() {
      const scale = [440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5];
      const loop = () => { this.chime(scale[(Math.random() * scale.length) | 0], .03, 3.2); this.chimeTimer = setTimeout(loop, 2600 + Math.random() * 4400); };
      loop();
    },
    async set(on) {
      if (on && !this.ctx && !this.init()) return;
      if (!this.ctx) return;
      this.on = on;
      if (on && this.ctx.state === "suspended") { try { await this.ctx.resume(); } catch (e) {} }
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setValueAtTime(this.master.gain.value, t);
      this.master.gain.linearRampToValueAtTime(on ? .55 : 0, t + 1.4);
      clearTimeout(this.chimeTimer);
      if (on) this.scheduleChimes();
      document.body.classList.toggle("sound-on", on);
      const btn = $("#sound-btn");
      if (btn) { btn.setAttribute("aria-pressed", String(on)); btn.setAttribute("aria-label", on ? "Ortam sesini kapat" : "Ortam sesini aç"); }
      SC.store.set("sc-sound", on ? "1" : "0");
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (!Sound.ctx) return;
    if (document.hidden) Sound.ctx.suspend(); else if (Sound.on) Sound.ctx.resume();
  });

  /* ---------------- Başlatma ---------------- */
  function init() {
    // Ses düğmesi + önceki tercih (tarayıcı ilk etkileşimi bekler)
    const sb = $("#sound-btn");
    if (sb) sb.addEventListener("click", () => Sound.set(!Sound.on));
    if (SC.store.get("sc-sound") === "1" && !document.body.dataset.gate) {
      document.body.classList.add("sound-on");
      const arm = (e) => {
        if (e.target.closest && e.target.closest("#sound-btn")) return; // düğme zaten kendi işini yapar
        Sound.set(true);
        removeEventListener("pointerdown", arm, true); removeEventListener("keydown", arm, true);
      };
      addEventListener("pointerdown", arm, true); addEventListener("keydown", arm, true);
    }

    // Özel imleç
    const cursor = $(".cursor"), dot = $(".cursor-dot"), cursorLabel = cursor && cursor.querySelector("span");
    const ring = { x: mouse.x, y: mouse.y };
    if (cursor && finePointer && !reduced) document.documentElement.classList.add("has-cursor");
    document.addEventListener("pointerover", (e) => {
      if (!cursor) return;
      const t = e.target.closest("a, button, [data-cursor], label, input[type=range], canvas[data-cursor]");
      cursor.classList.toggle("hover", !!t);
      const lbl = t && t.closest("[data-cursor]");
      cursor.classList.toggle("label-on", !!lbl);
      if (lbl) cursorLabel.textContent = lbl.dataset.cursor;
      if (t && Sound.on && !t.matches(".el, [data-nosound]")) Sound.tick();
    });
    document.addEventListener("pointerleave", () => { if (cursor) { cursor.style.opacity = 0; dot.style.opacity = 0; } });
    document.addEventListener("pointerenter", () => { if (cursor) { cursor.style.opacity = ""; dot.style.opacity = ""; } });

    // Manyetik, eğilme ve spotlight (olay delegasyonu: sonradan eklenen öğelerde de çalışır)
    let magEl = null, tiltEl = null;
    const resetMag = (el) => { el.style.transition = "transform .6s cubic-bezier(.22,.8,.2,1)"; el.style.transform = ""; setTimeout(() => (el.style.transition = ""), 600); };
    const resetTilt = (el) => { const inner = el.firstElementChild; if (inner) inner.style.transform = ""; };
    document.addEventListener("pointermove", (e) => {
      const spot = e.target.closest && e.target.closest("[data-spot]");
      if (spot) { const r = spot.getBoundingClientRect(); spot.style.setProperty("--mx", e.clientX - r.left + "px"); spot.style.setProperty("--my", e.clientY - r.top + "px"); }
      if (!finePointer || reduced) return;
      const m = e.target.closest && e.target.closest("[data-magnetic]");
      if (magEl && magEl !== m) resetMag(magEl);
      magEl = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const s = parseFloat(m.dataset.magnetic) || 1;
        m.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * .28 * s}px, ${(e.clientY - (r.top + r.height / 2)) * .35 * s}px)`;
      }
      const t = e.target.closest && e.target.closest("[data-tilt]");
      if (tiltEl && tiltEl !== t) resetTilt(tiltEl);
      tiltEl = t;
      if (t) {
        const r = t.getBoundingClientRect(), inner = t.firstElementChild;
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        const amt = parseFloat(t.dataset.tilt) || 1;
        inner.style.transform = `rotateY(${(px - .5) * 10 * amt}deg) rotateX(${(.5 - py) * 8 * amt}deg)`;
        inner.style.setProperty("--gx", px * 100 + "%"); inner.style.setProperty("--gy", py * 100 + "%");
      }
    }, { passive: true });
    document.addEventListener("pointerleave", () => { if (magEl) resetMag(magEl); if (tiltEl) resetTilt(tiltEl); magEl = tiltEl = null; });

    // Menü
    const menuBtn = $("#menu-btn");
    const setMenu = (SC.setMenu = (open) => {
      if (!menuBtn) return;
      document.body.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "Kapat" : "Menü";
      document.documentElement.style.overflow = open ? "hidden" : "";
      if (open) Sound.chime(659.25, .03, 1.6);
    });
    if (menuBtn) {
      menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
      $("#menu").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
      addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    }

    // Üst bar: kaydırınca gizle/göster
    const topbar = $("#topbar");
    let lastY = scrollY;
    addEventListener("scroll", () => {
      if (!topbar) return;
      const y = scrollY;
      topbar.classList.toggle("scrolled", y > 40);
      topbar.classList.toggle("hide", y > innerHeight * .8 && y > lastY + 2 && !document.body.classList.contains("menu-open"));
      if (y < lastY - 2) topbar.classList.remove("hide");
      lastY = y;
    }, { passive: true });

    // Görünür olunca belirme
    SC.observeReveal(document);

    // Sayfa geçişleri
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return; // sayfa içi bağlantı
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      document.documentElement.classList.add("page-leaving");
      Sound.chime(523.25, .025, 1.2);
      setTimeout(() => (location.href = url.href), reduced ? 0 : 420);
    });
    addEventListener("pageshow", (e) => { if (e.persisted) document.documentElement.classList.remove("page-leaving"); });

    const yearEl = $("#year"); if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Ana döngü
    (function loop() {
      requestAnimationFrame(loop);
      mouse.sx = lerp(mouse.sx, mouse.nx, .05);
      mouse.sy = lerp(mouse.sy, mouse.ny, .05);
      if (cursor) {
        ring.x = lerp(ring.x, mouse.x, .18); ring.y = lerp(ring.y, mouse.y, .18);
        cursor.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
        dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
      frameFns.forEach((fn) => fn());
    })();

    requestAnimationFrame(() => document.documentElement.classList.add("page-ready"));
  }

  SC.observeReveal = (root) => {
    if (!("IntersectionObserver" in window) || reduced) { $$(".reveal", root).forEach((n) => n.classList.add("in")); return; }
    SC._io = SC._io || new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return; en.target.classList.add("in"); SC._io.unobserve(en.target);
    }), { threshold: .1, rootMargin: "0px 0px -5% 0px" });
    $$(".reveal:not(.in)", root).forEach((n, i) => { n.style.transitionDelay = (i % 4) * 80 + "ms"; SC._io.observe(n); });
  };

  // Hero metin parallax'ı (alt sayfalar ve ana sayfa için)
  SC.heroParallax = (contentEl, extraEl) => {
    SC.onFrame(() => {
      if (scrollY > innerHeight * 1.2) return;
      contentEl.style.transform = `translate3d(${mouse.sx * -14}px, ${mouse.sy * -10 + scrollY * .25}px, 0)`;
      contentEl.style.opacity = String(1 - clamp(scrollY / (innerHeight * .65), 0, 1));
      if (extraEl) extraEl.style.transform = `translate3d(${mouse.sx * 30}px, ${mouse.sy * 20 - scrollY * .15}px, 0)`;
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
