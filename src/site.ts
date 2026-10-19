// Progressive enhancement for the static site: theme switch, mobile menu, resume printing.
// Every page works without this script; it only wires up the three controls.

const THEME_KEY = "dark-mode"; // same key and JSON boolean format as the old Next.js site

function applyTheme(dark: boolean): void {
  document.documentElement.classList.toggle("dark", dark);
  const darkCode = document.getElementById("giallo-dark") as HTMLLinkElement | null;
  const lightCode = document.getElementById("giallo-light") as HTMLLinkElement | null;
  if (darkCode) darkCode.media = dark ? "all" : "not all";
  if (lightCode) lightCode.media = dark ? "not all" : "all";
  for (const toggle of document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")) {
    toggle.setAttribute("aria-checked", String(dark));
  }
}

function initTheme(): void {
  applyTheme(document.documentElement.classList.contains("dark"));
  for (const toggle of document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")) {
    toggle.addEventListener("click", () => {
      const dark = !document.documentElement.classList.contains("dark");
      applyTheme(dark);
      try {
        localStorage.setItem(THEME_KEY, JSON.stringify(dark));
      } catch {
        // Storage can be unavailable (private mode); the theme still applies for this page.
      }
    });
  }
}

function initMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  if (!toggle) return;
  const menu = document.getElementById(toggle.getAttribute("aria-controls") ?? "");
  if (!menu) return;

  const setOpen = (open: boolean): void => {
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  document.addEventListener("click", (event) => {
    const target = event.target as Node;
    if (!toggle.contains(target) && !menu.contains(target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
}

function initPrint(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-print]")) {
    button.addEventListener("click", () => window.print());
  }
  // Collapsed <details> would hide content on paper; open them for printing, then restore.
  let opened: HTMLDetailsElement[] = [];
  window.addEventListener("beforeprint", () => {
    opened = [...document.querySelectorAll<HTMLDetailsElement>("details:not([open])")];
    for (const d of opened) d.open = true;
  });
  window.addEventListener("afterprint", () => {
    for (const d of opened) d.open = false;
    opened = [];
  });
}

initTheme();
initMenu();
initPrint();
