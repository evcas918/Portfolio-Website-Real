/*
  main.js
  =======
  - Updates the year in the footer
  - Handles the scroll progress bar
  - Adds a theme toggle (dark/light), persisted in localStorage
  - Enables project category filters
*/

/* ---------- Footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Scroll progress bar ---------- */
const progress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const top = doc.scrollTop || document.body.scrollTop;
  const height = (doc.scrollHeight - doc.clientHeight) || 1;
  if (progress) progress.style.width = `${(top / height) * 100}%`;
});

/* ---------- Theme toggle (dark/light) ----------
   - We default to the user's system preference on first visit.
   - Toggle stores explicit choice in localStorage.
*/
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

function applyStoredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") root.classList.add("dark");
  else if (saved === "light") root.classList.remove("dark");
  else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  }
}
applyStoredTheme();

toggle?.addEventListener("click", () => {
  const isDark = root.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* ---------- Project filters ----------
   - Each filter button has .filter-btn and a data-filter attribute (e.g., "cpp").
   - Cards carry a category class (cpp, python, web).
*/
function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    const show = category === "all" || card.classList.contains(category);
    card.classList.toggle("hidden", !show);
  });

  // Update aria-selected on the chips for a11y + styling
  document.querySelectorAll(".filter-btn").forEach(btn => {
    const active = (btn.dataset.filter || "all") === category;
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => filterProjects(btn.dataset.filter || "all"));
});

// Initialize to "all" on load
filterProjects("all");

/* ---------- Contact "form" ----------
   - Opens the user's email client with prefilled subject/body (no backend).
*/
document.getElementById("sendMail")?.addEventListener("click", () => {
  const name = document.getElementById("name")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const message = document.getElementById("message")?.value.trim() || "";

  const to = "evancasasanta18@hotmail.com";
  const subject = encodeURIComponent(`Portfolio message from ${name || "Someone"}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});
