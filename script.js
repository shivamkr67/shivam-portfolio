// ===== SHIVAM KUMAR PORTFOLIO — SCRIPT.JS =====

// ===== TYPED ROLE ANIMATION =====
const roles = [
  'Machine Learning Engineer',
  'Data Scientist',
  'AI Developer',
  'Python Developer',
  'Deep Learning Enthusiast'
];
let ri = 0, ci = 0, deleting = false;
const roleEl = document.getElementById('typed-role');

function typeRole() {
  if (!roleEl) return;
  const current = roles[ri];
  if (deleting) {
    roleEl.textContent = current.substring(0, ci--);
    if (ci < 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(typeRole, 500); return; }
  } else {
    roleEl.textContent = current.substring(0, ci++);
    if (ci > current.length) { deleting = true; setTimeout(typeRole, 2000); return; }
  }
  setTimeout(typeRole, deleting ? 50 : 80);
}
typeRole();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Counter animation trigger
      const counters = entry.target.querySelectorAll('[data-target]');
      counters.forEach(c => animateCounter(c));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== NAV MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => mobileMenu?.classList.remove('open'));
});

// ===== NAV ACTIVE STATE ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--cyan)' : '';
  });

  // Nav background enhancement
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(5, 10, 14, 0.98)';
  } else {
    nav.style.background = 'rgba(5, 10, 14, 0.85)';
  }
});

// ===== CONTACT FORM SUBMIT =====
const form = document.querySelector('.contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.form-submit');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'var(--green)';
  btn.style.color = '#000';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.style.color = '';
    form.reset();
  }, 3000);
});

// ===== IMAGE FALLBACK HANDLER =====
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    const parent = this.parentElement;
    if (parent) {
      this.style.display = 'none';
      // Show placeholder if exists
      const ph = parent.querySelector('.fallback-placeholder');
      if (ph) ph.style.display = 'flex';
    }
  });
});
