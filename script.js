const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const themeToggle = document.querySelector("#theme-toggle");
const storedTheme = localStorage.getItem("portfolio-theme");
if (storedTheme === "dark") document.documentElement.dataset.theme = "dark";

themeToggle?.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  document.documentElement.dataset.theme = isDark ? "light" : "dark";
  localStorage.setItem("portfolio-theme", isDark ? "light" : "dark");
  themeToggle.setAttribute("aria-label", isDark ? "Switch to dark mode" : "Switch to light mode");
});

const navigationLinks = [...document.querySelectorAll(".desktop-nav a")];
const updateActiveNavigation = () => {
  const currentHash = window.location.hash || "#top";
  navigationLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === currentHash));
};
window.addEventListener("hashchange", updateActiveNavigation);
updateActiveNavigation();

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:kundanasree3989@gmail.com?subject=${subject}&body=${body}`;
  if (formStatus) {
    formStatus.textContent = "Your email app is opening. Thank you for reaching out.";
  }
});
