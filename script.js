/* ==========================================================================
   Inspira Jardinería y Paisajismo — script.js
   Menú mobile, reveal on scroll y armado de links de WhatsApp
   ========================================================================== */

(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5493425196247";

  function buildWhatsAppLink(message) {
    var encoded = encodeURIComponent(message || "Hola, quiero más información sobre Inspira Jardinería y Paisajismo.");
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encoded;
  }

  function setupWhatsAppLinks() {
    var links = document.querySelectorAll(".js-whatsapp");
    links.forEach(function (link) {
      link.setAttribute("href", buildWhatsAppLink(link.getAttribute("data-msg")));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  }

  function setupMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  function setupScrollReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || targets.length === 0) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  function setupFooterYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function setupCarousel(root) {
    var track = root.querySelector(".carousel-track");
    var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel-slide"));
    var prevBtn = root.querySelector(".carousel-prev");
    var nextBtn = root.querySelector(".carousel-next");
    var dotsWrap = root.querySelector(".carousel-dots");
    if (!track || slides.length === 0) return;

    if (slides.length === 1) {
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      if (dotsWrap) dotsWrap.style.display = "none";
    }

    var index = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", "Ir al resultado " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll(".carousel-dot"));

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
    }

    prevBtn.addEventListener("click", function () { goTo(index - 1); });
    nextBtn.addEventListener("click", function () { goTo(index + 1); });

    var touchStartX = null;
    track.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) {
        goTo(delta < 0 ? index + 1 : index - 1);
      }
      touchStartX = null;
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupWhatsAppLinks();
    setupMobileNav();
    setupScrollReveal();
    setupFooterYear();
    document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
  });
})();
