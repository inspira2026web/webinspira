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

  document.addEventListener("DOMContentLoaded", function () {
    setupWhatsAppLinks();
    setupMobileNav();
    setupScrollReveal();
    setupFooterYear();
  });
})();
