/* Weerayut Teja — motion layer
   Progressive enhancement: every hidden or animated state is applied from
   here, so with JavaScript disabled the page renders fully visible and static.
   All motion is skipped when prefers-reduced-motion is set. */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  var hasST = hasGsap && typeof window.ScrollTrigger !== "undefined";

  /* ---- local clock (Chiang Mai, UTC+7) ---------------------------------- */

  var clocks = document.querySelectorAll("[data-clock]");
  var timeFmt = null;
  try {
    timeFmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Bangkok"
    });
  } catch (e) {
    timeFmt = null;
  }

  function tickClock() {
    if (!timeFmt || !clocks.length) return;
    var now = new Date();
    var value = timeFmt.format(now);
    for (var i = 0; i < clocks.length; i++) clocks[i].textContent = value;
  }
  if (timeFmt && clocks.length) {
    document.documentElement.classList.add("has-clock");
    tickClock();
    window.setInterval(tickClock, 20000);
  }

  /* ---- scroll progress ---------------------------------------------------- */

  var progressBar = document.querySelector("[data-progress]");

  function updateProgress() {
    if (!progressBar) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progressBar.style.transform = "scaleX(" + ratio.toFixed(4) + ")";
  }
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  /* ---- section spy: mark the nav link for the section in view ------------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.bar-nav a[href^="#"]'));
  var spySections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if (spySections.length && "IntersectionObserver" in window) {
    var visible = new Map();
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        var bestId = null;
        var bestRatio = 0;
        visible.forEach(function (ratio, el) {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = el.id; }
        });
        navLinks.forEach(function (link) {
          var match = bestId && link.getAttribute("href") === "#" + bestId;
          if (match) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.15, 0.4, 0.75, 1] }
    );
    spySections.forEach(function (section) { spy.observe(section); });
  }

  /* ---- work preview: swap the plate on row hover/focus -------------------- */

  var stage = document.querySelector(".stage");
  var rows = Array.prototype.slice.call(document.querySelectorAll(".rows .row"));
  var frames = Array.prototype.slice.call(document.querySelectorAll(".stage-frame"));
  var capEl = document.querySelector("[data-cap]");
  var currentKey = frames.length ? frames[0].getAttribute("data-frame") : null;

  function frameFor(key) {
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].getAttribute("data-frame") === key) return frames[i];
    }
    return null;
  }

  function activate(key) {
    if (!key || key === currentKey) return;
    var next = frameFor(key);
    if (!next) return;

    var prev = frameFor(currentKey);
    currentKey = key;

    rows.forEach(function (row) {
      row.classList.toggle("is-current", row.getAttribute("data-key") === key);
    });

    if (capEl) {
      var row = rows.filter(function (r) { return r.getAttribute("data-key") === key; })[0];
      var cap = row ? row.getAttribute("data-cap") : "";
      if (cap) capEl.textContent = cap;
    }

    if (hasGsap && !reduced) {
      window.gsap.killTweensOf([next, prev]);
      next.classList.add("is-active");
      window.gsap.fromTo(
        next,
        { clipPath: "inset(0% 0% 0% 100%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.7,
          ease: "power3.inOut",
          onComplete: function () {
            if (next.getAttribute("data-frame") !== currentKey) return;
            frames.forEach(function (f) { if (f !== next) f.classList.remove("is-active"); });
          }
        }
      );
      var media = next.querySelector("img");
      if (media) {
        window.gsap.fromTo(media, { scale: 1.06 }, { scale: 1, duration: 1.1, ease: "power3.out" });
      }
    } else {
      frames.forEach(function (f) { f.classList.toggle("is-active", f === next); });
    }
  }

  rows.forEach(function (row) {
    var key = row.getAttribute("data-key");
    row.addEventListener("mouseenter", function () { activate(key); });
    row.addEventListener("focusin", function () { activate(key); });
    row.addEventListener("click", function () { activate(key); });
  });

  if (rows.length) rows[0].classList.add("is-current");

  /* ---- everything below needs GSAP + movement allowed -------------------- */

  if (!hasGsap || reduced) return;

  if (hasST) window.gsap.registerPlugin(window.ScrollTrigger);

  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---- smooth scrolling (Lenis), desktop fine-pointer only ---------------- */

  var lenis = null;
  if (typeof window.Lenis !== "undefined" && finePointer && hasST) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    window.gsap.ticker.lagSmoothing(0);
    document.documentElement.style.scrollBehavior = "auto";

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -64 });
      });
    });
  }

  /* ---- load sequence: masked title lines, then the rest ------------------- */

  var titleLines = document.querySelectorAll(".title-in");
  var afterTitle = document.querySelectorAll(".kicker, .masthead-copy .lede, .actions, .facts, .ticker");

  window.gsap.set(titleLines, { yPercent: 112 });
  window.gsap.set(afterTitle, { autoAlpha: 0, y: 22 });

  var intro = window.gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .to(titleLines, { yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.08)
    .to(".kicker", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.3)
    .to(".masthead-copy .lede", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.5)
    .to(".actions", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.62)
    .to(".facts", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.56)
    .to(".ticker", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.8);

  /* ---- scroll reveals ------------------------------------------------------ */

  function reveal(selector) {
    var els = window.gsap.utils.toArray(selector);
    if (!els.length) return;
    window.gsap.set(els, { autoAlpha: 0, y: 26 });
    window.ScrollTrigger.batch(els, {
      start: "top 90%",
      once: true,
      onEnter: function (batch) {
        window.gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.06,
          overwrite: true
        });
      }
    });
  }

  if (hasST) {
    reveal(".sec-head");
    reveal(".stage, .rows .row");
    reveal(".case");
    reveal(".retired");
    reveal(".plate");
    reveal(".how-item, .tools");
    reveal(".writing-link");
    reveal(".contact h2, .contact-mail, .contact-note, .elsewhere");
  }

  /* ---- pinned horizontal gallery (desktop only) ---------------------------- */

  var earlier = document.querySelector(".earlier");
  var plates = document.querySelector(".plates");

  function travelDistance() {
    return Math.max(0, plates.scrollWidth - window.innerWidth);
  }

  if (hasST && earlier && plates && window.gsap.matchMedia) {
    var mm = window.gsap.matchMedia();
    mm.add("(min-width: 900px)", function () {
      earlier.classList.add("is-pinned");
      var header = document.querySelector(".bar");
      var tween = window.gsap.to(plates, {
        x: function () { return -travelDistance(); },
        ease: "none",
        scrollTrigger: {
          trigger: earlier,
          start: function () { return "top " + (header ? header.offsetHeight : 0) + "px"; },
          end: function () { return "+=" + travelDistance(); },
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });
      return function () {
        earlier.classList.remove("is-pinned");
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
        window.gsap.set(plates, { clearProps: "transform" });
      };
    });
  }

  /* ---- soft image drift inside the plates ---------------------------------- */

  if (hasST && !document.querySelector(".earlier.is-pinned")) {
    window.gsap.utils.toArray(".plate figure img").forEach(function (img) {
      window.gsap.fromTo(
        img,
        { yPercent: -2 },
        {
          yPercent: 2,
          ease: "none",
          scrollTrigger: { trigger: img.closest(".plate"), start: "top bottom", end: "bottom top", scrub: true }
        }
      );
    });
  }
})();
