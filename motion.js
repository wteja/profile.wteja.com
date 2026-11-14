/* Weerayut Teja — motion layer
   Progressive enhancement: every hidden/animated state is applied from here,
   so with JS disabled the page renders fully visible and static.
   All motion is skipped when prefers-reduced-motion is set. */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  var hasST = hasGsap && typeof window.ScrollTrigger !== "undefined";

  /* ---- featured project switcher (works without GSAP too) ---------------- */

  var PROJECTS = {
    mongolia: {
      src: "/img/work/mongolia_travel.webp",
      name: "Mongolia.travel",
      alt: "Earlier homepage of Mongolia.travel"
    },
    smk: {
      src: "/img/work/smksteel.webp",
      name: "SMK Steel",
      alt: "Earlier homepage of the SMK Steel website"
    },
    mekong: {
      src: "/img/work/mekongmoments.webp",
      name: "Mekong Moments",
      alt: "Earlier homepage of the Mekong Moments website"
    }
  };

  var featuredImg = document.getElementById("featured-image");
  var featuredName = document.getElementById("featured-name");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".stage-tabs [data-project]"));

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var data = PROJECTS[tab.getAttribute("data-project")];
      if (!data || !featuredImg) return;
      tabs.forEach(function (t) {
        t.setAttribute("aria-pressed", String(t === tab));
      });
      featuredImg.src = data.src;
      featuredImg.alt = data.alt;
      if (featuredName) featuredName.textContent = data.name;
      if (hasGsap && !reduced) {
        window.gsap.fromTo(
          featuredImg,
          { clipPath: "inset(0% 0% 0% 100%)", scale: 1.08 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.65, ease: "power3.out" }
        );
      }
    });
  });

  /* ---- everything below needs GSAP + movement allowed -------------------- */

  if (!hasGsap || reduced) return;

  if (hasST) window.gsap.registerPlugin(window.ScrollTrigger);

  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---- smooth scrolling (Lenis), desktop fine-pointer only ---------------- */

  var lenis = null;
  if (typeof window.Lenis !== "undefined" && finePointer && hasST) {
    lenis = new window.Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    lenis.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    window.gsap.ticker.lagSmoothing(0);
    document.documentElement.style.scrollBehavior = "auto";

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70 });
      });
    });
  }

  /* ---- hero load sequence -------------------------------------------------- */

  var titleLines = document.querySelectorAll(".hero-title .line-inner");
  window.gsap.set(titleLines, { yPercent: 110 });
  var heroFade = document.querySelectorAll(".eyebrow, .hero-actions, .hero-copy .lede, .stage");
  window.gsap.set(heroFade, { autoAlpha: 0, y: 26 });

  var intro = window.gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .to(titleLines, { yPercent: 0, duration: 1, stagger: 0.12 }, 0.1)
    .to(".eyebrow", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.35)
    .to(".hero-copy .lede", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.55)
    .to(".hero-actions", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.7)
    .to(".stage", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.65);

  /* ---- scroll reveals ------------------------------------------------------ */

  function reveal(selector, options) {
    var els = window.gsap.utils.toArray(selector);
    if (!els.length) return;
    window.gsap.set(els, { autoAlpha: 0, y: 34 });
    window.ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: function (batch) {
        window.gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, overwrite: true });
      }
    });
    if (options) options();
  }

  reveal(".section-head, .intro");
  reveal(".index .row");
  reveal(".plates-head h3, .plates-head .sub-note, .retired");
  reveal(".how-item, .tools");
  reveal(".writing-link");
  reveal(".contact h2, .contact-mail, .contact-note, .elsewhere");

  /* ---- pinned horizontal gallery (desktop, fine pointer) ------------------- */

  var platesSection = document.querySelector(".plates-section");
  var plates = document.querySelector(".plates");
  var wide = window.matchMedia("(min-width: 900px)");

  function travelDistance() {
    return Math.max(0, plates.scrollWidth - window.innerWidth);
  }

  function setupGallery() {
    if (!(wide.matches && finePointer) || !platesSection || !plates) return;
    platesSection.classList.add("is-pinned");
    var header = document.querySelector(".top");
    var headerH = header ? header.offsetHeight : 0;
    window.gsap.to(plates, {
      x: function () { return -travelDistance(); },
      ease: "none",
      scrollTrigger: {
        trigger: platesSection,
        start: function () { return "top " + (header ? header.offsetHeight : 0) + "px"; },
        end: function () { return "+=" + travelDistance(); },
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });
  }

  if (hasST) setupGallery();

  /* ---- soft parallax on the hero screenshot -------------------------------- */

  var stageImg = document.querySelector(".stage-image img");
  if (stageImg && hasST) {
    window.gsap.fromTo(
      stageImg,
      { yPercent: -4 },
      {
        yPercent: 4,
        ease: "none",
        scrollTrigger: { trigger: ".stage", start: "top bottom", end: "bottom top", scrub: true }
      }
    );
  }
})();
