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
  themeToggle.textContent = isLight ? "☾" : "☼";
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
document.querySelectorAll(".timeline-item").forEach((item) => revealObserver.observe(item));

const progressBar = document.querySelector(".scroll-progress span");
const updateProgress = () => {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

document.querySelectorAll(".skill-filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".skill-filter").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-skill]").forEach((skill) => {
      skill.hidden = filter !== "all" && skill.dataset.skill !== filter;
    });
  });
});

document.querySelectorAll("[data-tilt]").forEach((card) => {
  const reset = () => { card.style.transform = ""; };
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = card.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener("pointerleave", reset);
  card.addEventListener("blur", reset);
});

const languageSelect = document.querySelector("#language-select");
const translations = {
  en: {
    "nav.about": "About", "nav.experience": "Experience", "nav.projects": "Project", "nav.journey": "Journey", "nav.contact": "Let's connect", "nav.menu": "Menu",
    "hero.eyebrow": "Available for opportunities", "hero.title": "Software engineer.<br><em>Built to learn.</em>",
    "hero.intro": "I'm <strong>Wong Yoke Sin</strong>, a TAR UMT Software Development graduate who enjoys building reliable applications and improving the systems behind them.",
    "hero.see": "See my work", "hero.connect": "Get in touch", "hero.note": "Curious by default.<br>Reliable by design.", "hero.quick-access": "quick_access:",
    "about.label": "About me", "about.title": "Turning questions<br>into <em>working software.</em>",
    "about.lead": "I’m an aspiring software development graduate seeking opportunities to apply my coding skills, gain hands-on experience, and build reliable applications.",
    "about.copy": "Focused on improving system performance and maintainability, I’m eager to learn, contribute, and grow in a fast-moving technology environment. I bring a practical mindset, clear communication, and enthusiasm for learning on the job.",
    "experience.label": "Experience", "experience.dates": "NOV 2024<br>— JUL 2025", "experience.kicker": "Invantest · Intern", "experience.title": "Making deployments simpler and more reliable.", "experience.item1": "Researched and documented AI approaches to improve work efficiency, contributing them to the company knowledge base.", "experience.item2": "Assisted customers with automated product installation for OCAP, PCS, Keycloak, and TMS using Docker and Podman.", "experience.item3": "Developed a streamlined method to simplify Podman deployments and improve installation workflows.", "experience.item4": "Created OS preparation scripts to accelerate and optimize installation setup.", "experience.filter-label": "FILTER SKILLS", "experience.filter-all": "All", "experience.filter-devops": "DevOps", "experience.filter-development": "Development",
    "education.label": "Education", "project.label": "Selected project", "project.kicker": "Final-year project · Sustainable Transportation System",
    "project.title": "Make every journey<br>count for <em>less.</em>", "project.copy": "An Android application designed to encourage sustainable transportation through practical, lower-impact commuting tools.", "project.idea": "THE IDEA", "project.build": "THE BUILD", "project.idea-text": "Implemented carpool requests, a reward mechanism, and carbon-footprint tracking to encourage smarter journeys.", "project.build-text": "Built with Kotlin and Firebase, using a cloud database structure and real-time data synchronization.",
    "journey.label": "My technical journey", "journey.title": "Learned by<br><em>building.</em>", "journey.intro": "A practical progression from programming foundations in my degree, to tools used during my internship, and the infrastructure technologies I’m growing toward.", "journey.soft-skills": "SOFT SKILLS", "journey.skills-text": "Observation <b>·</b> Communication <b>·</b> Problem-solving <b>·</b> Fast learner", "journey.languages": "LANGUAGES", "journey.languages-list": "Malay <b>·</b> Chinese <b>·</b> English", "journey.degree": "DEGREE", "journey.internship": "INTERNSHIP", "journey.next": "NEXT",
    "contact.label": "Contact", "contact.eyebrow": "Have a role in mind?",
    "contact.title": "Let’s build<br>something <em>useful.</em>", "contact.copy": "I’m open to junior software engineering and DevOps opportunities. I’d love to hear what you’re working on.",
    "contact.resume": "Download résumé", "footer.tagline": "DESIGNED WITH INTENTION"
  },
  ms: {
    "nav.about": "Tentang", "nav.experience": "Pengalaman", "nav.projects": "Projek", "nav.journey": "Perjalanan", "nav.contact": "Mari berhubung", "nav.menu": "Menu",
    "hero.eyebrow": "Terbuka untuk peluang", "hero.title": "Jurutera perisian.<br><em>Dibina untuk belajar.</em>",
    "hero.intro": "Saya <strong>Wong Yoke Sin</strong>, graduan Pembangunan Perisian TAR UMT yang gemar membina aplikasi boleh dipercayai dan menambah baik sistem di belakangnya.",
    "hero.see": "Lihat hasil kerja", "hero.connect": "Hubungi saya", "hero.note": "Sentiasa ingin tahu.<br>Direka dengan teliti.", "hero.quick-access": "akses_pantas:",
    "about.label": "Tentang saya", "about.title": "Menukar persoalan<br>kepada <em>perisian berfungsi.</em>",
    "about.lead": "Saya graduan pembangunan perisian yang ingin menggunakan kemahiran pengaturcaraan, mendapatkan pengalaman praktikal dan membina aplikasi yang boleh dipercayai.",
    "about.copy": "Saya fokus meningkatkan prestasi dan kebolehselenggaraan sistem. Saya bersedia belajar, menyumbang dan berkembang dalam persekitaran teknologi yang pantas.",
    "experience.label": "Pengalaman", "experience.dates": "NOV 2024<br>— JUL 2025", "experience.kicker": "Invantest · Pelatih", "experience.title": "Menjadikan deployment lebih mudah dan boleh dipercayai.", "experience.item1": "Menyelidik dan mendokumentasikan kaedah AI untuk meningkatkan kecekapan kerja serta menambahkannya ke pangkalan pengetahuan syarikat.", "experience.item2": "Membantu pelanggan dengan pemasangan produk automatik untuk OCAP, PCS, Keycloak, dan TMS menggunakan Docker dan Podman.", "experience.item3": "Membangunkan kaedah yang diperkemas untuk memudahkan penggunaan Podman dan memperbaiki aliran kerja pemasangan.", "experience.item4": "Mencipta skrip penyediaan OS untuk mempercepat dan mengoptimumkan persediaan pemasangan.", "experience.filter-label": "TAPIS KEMAHIRAN", "experience.filter-all": "Semua", "experience.filter-devops": "DevOps", "experience.filter-development": "Pembangunan",
    "education.label": "Pendidikan", "project.label": "Projek terpilih", "project.kicker": "Projek tahun akhir · Sistem Pengangkutan Lestari",
    "project.title": "Jadikan setiap perjalanan<br>lebih <em>bermakna.</em>", "project.copy": "Aplikasi Android yang menggalakkan pengangkutan lestari melalui alat perjalanan yang praktikal dan kurang memberi kesan kepada alam sekitar.", "project.idea": "IDEA", "project.build": "PEMBINAAN", "project.idea-text": "Melaksanakan permintaan kongsian kereta, mekanisme ganjaran, dan penjejakan jejak karbon untuk mendorong perjalanan yang lebih bijak.", "project.build-text": "Dibina dengan Kotlin dan Firebase, menggunakan struktur pangkalan data awan dan penyegerakan data masa nyata.",
    "journey.label": "Perjalanan teknikal saya", "journey.title": "Belajar melalui<br><em>pembinaan.</em>", "journey.intro": "Perkembangan praktikal daripada asas pengaturcaraan dalam ijazah saya, kepada alat yang digunakan semasa latihan, dan teknologi infrastruktur yang sedang saya kembangkan.", "journey.soft-skills": "KEMAHIRAN LEMBUT", "journey.skills-text": "Pemerhatian <b>·</b> Komunikasi <b>·</b> Penyelesaian masalah <b>·</b> Pelajar cepat", "journey.languages": "BAHASA", "journey.languages-list": "Bahasa Melayu <b>·</b> Bahasa Cina <b>·</b> Bahasa Inggeris", "journey.degree": "IJAZAH", "journey.internship": "LATIHAN", "journey.next": "SETERUSNYA",
    "contact.label": "Hubungi", "contact.eyebrow": "Ada jawatan untuk saya?",
    "contact.title": "Mari bina<br>sesuatu yang <em>berguna.</em>", "contact.copy": "Saya terbuka kepada peluang kejuruteraan perisian dan DevOps peringkat junior. Saya ingin mendengar tentang projek anda.",
    "contact.resume": "Muat turun resume", "footer.tagline": "DIREKA DENGAN TELITI"
  },
  zh: {
    "nav.about": "关于我", "nav.experience": "经历", "nav.projects": "项目", "nav.journey": "技术历程", "nav.contact": "联系我", "nav.menu": "菜单",
    "hero.eyebrow": "正在寻找机会", "hero.title": "软件工程师。<br><em>持续学习。</em>",
    "hero.intro": "我是<strong>Wong Yoke Sin</strong>，TAR UMT 软件开发毕业生，喜欢构建可靠的应用并改善背后的系统。",
    "hero.see": "查看作品", "hero.connect": "联系我", "hero.note": "保持好奇。<br>可靠地设计。", "hero.quick-access": "快捷访问:",
    "about.label": "关于我", "about.title": "把问题转化为<br><em>可用的软件。</em>",
    "about.lead": "我是一名软件开发毕业生，希望运用编程技能、积累实践经验，并构建可靠的应用。",
    "about.copy": "我专注于提升系统性能与可维护性，并期待在快速发展的科技环境中学习、贡献和成长。",
    "experience.label": "工作经历", "experience.dates": "2024年11月<br>— 2025年7月", "experience.kicker": "Invantest · 实习生", "experience.title": "让部署更简单、更可靠。", "experience.item1": "研究并整理 AI 方法以提高工作效率，并将其纳入公司知识库。", "experience.item2": "协助客户使用 Docker 和 Podman 自动化安装 OCAP、PCS、Keycloak 和 TMS 产品。", "experience.item3": "开发更 streamlined 的方法来简化 Podman 部署并优化安装流程。", "experience.item4": "创建 OS 准备脚本，以加快并优化安装配置。", "experience.filter-label": "筛选技能", "experience.filter-all": "全部", "experience.filter-devops": "DevOps", "experience.filter-development": "开发",
    "education.label": "教育背景", "project.label": "精选项目", "project.kicker": "毕业项目 · 可持续交通系统",
    "project.title": "让每一次旅程<br>都更 <em>有意义。</em>", "project.copy": "一款通过实用、低影响的通勤工具来鼓励可持续交通的 Android 应用。", "project.idea": "项目思路", "project.build": "技术实现", "project.idea-text": "实现拼车请求、奖励机制和碳足迹追踪，以鼓励更明智的出行方式。", "project.build-text": "使用 Kotlin 和 Firebase 构建，采用云数据库结构和实时数据同步。",
    "journey.label": "我的技术历程", "journey.title": "在<br><em>实践中学习。</em>", "journey.intro": "从大学阶段的编程基础，到实习期间使用的工具，再到我正在不断成长的基础设施技术，这是一段实用型的成长历程。", "journey.soft-skills": "软技能", "journey.skills-text": "观察力 <b>·</b> 沟通 <b>·</b> 问题解决 <b>·</b> 学习能力强", "journey.languages": "语言", "journey.languages-list": "马来语 <b>·</b> 中文 <b>·</b> 英语", "journey.degree": "学位", "journey.internship": "实习", "journey.next": "下一步",
    "contact.label": "联系", "contact.eyebrow": "有合适的职位吗？",
    "contact.title": "一起构建<br><em>有用的</em>东西。", "contact.copy": "我正在寻找初级软件工程和 DevOps 机会，也很期待了解您正在进行的工作。",
    "contact.resume": "下载简历", "footer.tagline": "用心设计"
  }
};

const languageTargets = {
  ".nav-links a:nth-child(1)": "nav.about", ".nav-links a:nth-child(2)": "nav.experience", ".nav-links a:nth-child(3)": "nav.projects",
  ".nav-links a:nth-child(4)": "nav.journey", ".nav-cta": "nav.contact", ".hero .eyebrow": "hero.eyebrow",
  ".hero h1": "hero.title", ".hero-intro": "hero.intro", ".button-primary": "hero.see", ".hero-actions .text-link": "hero.connect",
  ".hero-note p": "hero.note", ".about .section-label span:last-child": "about.label", ".about-grid h2": "about.title",
  ".about .lead": "about.lead", ".about-grid>div:last-child p:nth-child(2)": "about.copy", ".experience .section-label span:last-child": "experience.label",
  ".timeline-body .kicker": "experience.kicker", ".timeline-body h3": "experience.title", ".education .section-label span:last-child": "education.label",
  ".projects .section-label span:last-child": "project.label", ".project-info .kicker": "project.kicker", ".project-info h2": "project.title",
  ".project-info>p:not(.kicker)": "project.copy", ".journey .section-label span:last-child": "journey.label", ".journey-layout h2": "journey.title",
  ".contact .section-label span:last-child": "contact.label", ".contact-panel .eyebrow": "contact.eyebrow", ".contact-panel h2": "contact.title",
  ".contact-panel>p:not(.eyebrow)": "contact.copy", ".resume-link": "contact.resume", ".footer .mono": "footer.tagline"
};

function applyLanguage(language) {
  const dictionary = translations[language] || translations.en;
  Object.entries(languageTargets).forEach(([selector, key]) => {
    const element = document.querySelector(selector);
    if (element && dictionary[key]) element.innerHTML = dictionary[key];
  });
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.innerHTML = dictionary[key];
  });
  document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  localStorage.setItem("language", language);
}

const savedLanguage = localStorage.getItem("language") || "en";
if (languageSelect) {
  languageSelect.value = savedLanguage;
  languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
  applyLanguage(savedLanguage);
}
