const menu = document.querySelector(".menu");
const tombolMenu = document.querySelector(".menu-toggle");

if (menu && tombolMenu) {
  tombolMenu.addEventListener("click", () => {
    const terbuka = menu.classList.toggle("menu-terbuka");
    tombolMenu.setAttribute("aria-expanded", String(terbuka));
    tombolMenu.setAttribute("aria-label", terbuka ? "Tutup menu" : "Buka menu");
    tombolMenu.textContent = terbuka ? "×" : "☰";
  });

  menu.querySelectorAll("a").forEach((tautan) => {
    tautan.addEventListener("click", () => {
      menu.classList.remove("menu-terbuka");
      tombolMenu.setAttribute("aria-expanded", "false");
      tombolMenu.setAttribute("aria-label", "Buka menu");
      tombolMenu.textContent = "☰";
    });
  });
}

// Animasi elemen ketika masuk ke area layar (scroll reveal).
const revealTargets = document.querySelectorAll(
  ".hero > *, .section-head, .panel, .two-col > *, .contact-box, .list-item, .skill-list > *, .note"
);
revealTargets.forEach((element) => element.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

// Transisi lembut saat berpindah halaman internal.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  const overlay = document.createElement("div");
  overlay.className = "transition-overlay";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") ||
          link.target === "_blank" || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
      event.preventDefault();
      document.body.classList.add("page-leaving");
      overlay.classList.add("active");
      window.setTimeout(() => { window.location.href = destination.href; }, 360);
    });
  });
}
