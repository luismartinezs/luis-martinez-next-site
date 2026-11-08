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

// Post table of contents (components.html post_toc). On wide screens it is an always-open sticky rail;
// on narrow screens it starts collapsed. Scroll-spy marks the section being read with aria-current.
function initToc(): void {
  const toc = document.querySelector<HTMLDetailsElement>("[data-toc]");
  if (!toc) return;
  const wide = window.matchMedia("(min-width: 1280px)");
  const syncOpen = (): void => {
    toc.open = wide.matches;
  };
  syncOpen();
  wide.addEventListener("change", syncOpen);
  toc.querySelector("summary")?.addEventListener("click", (event) => {
    if (wide.matches) event.preventDefault();
  });

  const entries = [...toc.querySelectorAll<HTMLAnchorElement>("a[href^='#']")].flatMap((link) => {
    const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    return heading ? [{ link, heading }] : [];
  });
  if (entries.length === 0) return;
  toc.dataset.spy = "";

  let current: (typeof entries)[number] | undefined;
  const update = (): void => {
    // The current section is the last heading that has scrolled up to just under the sticky header
    // (where a TOC click lands it); at the very bottom of the page it is the last heading, so short
    // closing sections can still be reached.
    const line = (document.querySelector(".site-top")?.getBoundingClientRect().height ?? 0) + 48;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let next = entries[0];
    for (const entry of entries) {
      if (atBottom || entry.heading.getBoundingClientRect().top <= line) next = entry;
      else break;
    }
    if (!next || next === current) return;
    current?.link.removeAttribute("aria-current");
    for (const li of toc.querySelectorAll(".is-current")) li.classList.remove("is-current");
    next.link.setAttribute("aria-current", "location");
    next.link.closest(".toc__list > li")?.classList.add("is-current");
    current = next;

    // Keep the marked link visible when the rail itself scrolls (long TOCs on short screens).
    if (wide.matches && toc.scrollHeight > toc.clientHeight) {
      const top = next.link.offsetTop;
      const bottom = top + next.link.offsetHeight;
      if (top < toc.scrollTop) toc.scrollTop = top - 8;
      else if (bottom > toc.scrollTop + toc.clientHeight) toc.scrollTop = bottom - toc.clientHeight + 8;
    }
  };

  let queued = false;
  const schedule = (): void => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
}

initTheme();
initMenu();
initPrint();
initToc();
