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

  /* ---------------- Ses: kapalı ----------------
     Site tamamen sessizdir. Eski çağrılar bozulmasın diye boş arayüz bırakıldı. */
  const noop = () => {};
  const Sound = (SC.Sound = { on: false, ctx: null, init: () => false, set: noop, chime: noop, tick: noop, clang: noop, whoosh: noop, hiss: noop, drip: noop, bubble: noop, success: noop, fail: noop, noise: noop, scheduleChimes: noop });
  try { SC.store.set("sc-sound", "0"); } catch (e) {}

  /* ---------------- Başlatma ---------------- */
  function init() {
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
