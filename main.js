// --- Year in footer ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Scroll progress bar ---
const progress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const top = doc.scrollTop || document.body.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight || 1;
  progress.style.width = `${(top / height) * 100}%`;
});

// --- Theme toggle (persist in localStorage) ---
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

function applyStoredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    root.classList.toggle("dark", saved === "dark");
  } else {
    // default: system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  }
}
applyStoredTheme();

toggle?.addEventListener("click", () => {
  const isDark = root.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// --- Project filters ---
function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    const show = category === "all" || card.classList.contains(category);
    card.classList.toggle("hidden", !show);
  });

  // Update chip aria-selected
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.setAttribute("aria-selected", btn.dataset.filter === category ? "true" : "false");
  });
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => filterProjects(btn.dataset.filter || "all"));
});
filterProjects("all");

// --- Contact form: opens mail client with prefilled subject/body ---
document.getElementById("sendMail")?.addEventListener("click", () => {
  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const message = document.getElementById("message")?.value.trim();

  const to = "evancasasanta18@hotmail.com";
  const subject = encodeURIComponent(`Portfolio message from ${name || "Someone"}`);
  const body = encodeURIComponent(
    `Name: ${name || ""}\nEmail: ${email || ""}\n\n${message || ""}`
  );

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});
