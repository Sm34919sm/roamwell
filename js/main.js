/* Shared navigation, theme preference, and small page-wide enhancements. */
(() => {
  const body = document.body;
  const page = body.dataset.page;
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const themeButton = document.querySelector(".theme-toggle");

  const savedTheme = localStorage.getItem("roamwellTheme");
  if (savedTheme === "dark") body.dataset.theme = "dark";

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
      body.dataset.theme = nextTheme;
      localStorage.setItem("roamwellTheme", nextTheme);
      themeButton.setAttribute("aria-label", `Switch to ${nextTheme === "dark" ? "light" : "dark"} theme`);
    });
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !isOpen);
    });
    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  const activeHref = {
    home: "index.html", styles: "trip-styles.html", destinations: "destinations.html",
    preferences: "trip-styles.html", plan: "trip-styles.html", saved: "saved-plans.html",
    compare: "saved-plans.html", about: "about.html", contact: "about.html", faq: "faq.html"
  }[page];
  if (activeHref) {
    nav?.querySelectorAll("a").forEach((link) => {
      if (link.getAttribute("href") === `./${activeHref}`) {
        link.setAttribute("aria-current", "page");
        link.classList.add("is-active");
      }
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
