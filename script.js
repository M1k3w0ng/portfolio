const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

if (localStorage.getItem("theme") === "light") {
  root.classList.add("light-theme");
  themeToggle?.setAttribute("aria-pressed", "true");
  themeToggle?.setAttribute("aria-label", "Switch to dark theme");
}

themeToggle?.addEventListener("click", () => {
  const isLight = root.classList.toggle("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
});

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const commandOutput = document.querySelector(".command-output");
const commandTargets = {
  about: ["whoami", "Wong Yoke Sin — Software Development graduate from TAR UMT."],
  skills: ["skills", "Python · Kotlin · Linux · Docker · Podman · Azure DevOps"],
  contact: ["contact", "yokesinwong@gmail.com · +60 17-7657296"]
};

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    const result = commandTargets[button.dataset.command];
    if (!result || !commandOutput) return;
    commandOutput.textContent = `$ ${result[0]}  →  ${result[1]}`;
  });
});

document.querySelectorAll(".journey-year-label").forEach((button) => {
  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.querySelector("span").textContent = isExpanded ? "+" : "−";
    button.parentElement.classList.toggle("is-collapsed", isExpanded);
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(button.dataset.copy);
    const original = button.textContent;
    button.textContent = "Copied!";
    window.setTimeout(() => { button.textContent = original; }, 1400);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("reveal");
  revealObserver.observe(section);
});
