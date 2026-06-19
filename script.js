const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const roles = [
  "Aspiring Machine Learning Engineer",
  "AI and Data Science Enthusiast",
  "Python and Streamlit Developer",
  "NLP and Recommendation Systems Builder",
  "Unity 3D and C# Game Developer"
];

const typedRole = document.getElementById("typed-role");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  if (!typedRole) return;

  const current = roles[roleIndex];
  typedRole.textContent = deleting
    ? current.slice(0, charIndex - 1)
    : current.slice(0, charIndex + 1);

  charIndex += deleting ? -1 : 1;

  if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(typeRole, 1300);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeRole, deleting ? 42 : 68);
}

typeRole();

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.querySelector(".modal-close");

function openModal(src, alt) {
  if (!modal || !modalImage) return;

  modalImage.src = src;
  modalImage.alt = alt || "Certificate preview";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function hideModal() {
  if (!modal || !modalImage) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
  document.body.classList.remove("no-scroll");
}

document.querySelectorAll("[data-modal-src]").forEach((control) => {
  control.addEventListener("click", () => {
    const img = control.querySelector("img");
    openModal(control.dataset.modalSrc, img ? img.alt : control.textContent.trim());
  });
});

closeModal?.addEventListener("click", hideModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) hideModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("open")) hideModal();
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
