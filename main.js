// Scroll progress bar
const progress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const height = (document.documentElement.scrollHeight - document.documentElement.clientHeight) || 1;
  progress.style.width = `${(scrollTop / height) * 100}%`;
});

// Project filter (wire up if you add filter buttons)
function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    if (category === "all" || card.classList.contains(category)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

// Optional: enable buttons if present (looks for .filter-btn elements)
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.getAttribute("data-filter") || "all";
    filterProjects(cat);
  });
});
