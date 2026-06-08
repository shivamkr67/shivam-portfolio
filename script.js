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

// ===== FILE CHECKER — Shows upload guide if file missing =====
async function checkFile(event, filename) {
  try {
    const res = await fetch(filename, { method: 'HEAD' });
    if (!res.ok) throw new Error('not found');
    // File exists — let link work normally
  } catch(e) {
    event.preventDefault();
    showUploadGuide(filename);
  }
}

function showUploadGuide(filename) {
  // Remove existing modal if any
  document.getElementById('upload-modal')?.remove();

  const guides = {
    'Shivam_Kumar_CV_v4.pdf': {
      icon: '📄',
      title: 'Upload Your CV',
      steps: [
        'Rename your CV file to exactly: <code>Shivam_Kumar_CV_v4.pdf</code>',
        'Go to your GitHub repo: <strong>shivamkr67/shivam-portfolio</strong>',
        'Click "Add file" → "Upload files"',
        'Upload the PDF → Commit changes',
        'Wait 1–2 minutes → Done! ✅'
      ]
    },
    'intel_cert.jpg': {
      icon: '🏅',
      title: 'Upload Intel Certificate',
      steps: [
        'Take a photo or screenshot of your Intel AI for All certificate',
        'Rename the image to: <code>intel_cert.jpg</code>',
        'Go to your GitHub repo: <strong>shivamkr67/shivam-portfolio</strong>',
        'Click "Add file" → "Upload files"',
        'Upload → Commit → Done! ✅'
      ]
    },
    'oracle_cert.jpg': {
      icon: '☁️',
      title: 'Upload Oracle Certificate',
      steps: [
        'Take a photo or screenshot of your Oracle certificate',
        'Rename the image to: <code>oracle_cert.jpg</code>',
        'Go to your GitHub repo and upload it',
        'Done! ✅'
      ]
    },
    'marksheet_12.pdf': {
      icon: '📋',
      title: 'Upload Class XII Marksheet',
      steps: [
        'Scan or take a clear photo of your Class XII marksheet',
        'Save/convert it as PDF named: <code>marksheet_12.pdf</code>',
        'Go to your GitHub repo: <strong>shivamkr67/shivam-portfolio</strong>',
        'Click "Add file" → "Upload files" → Upload → Commit',
        'Done! ✅'
      ]
    },
    'marksheet_10.pdf': {
      icon: '📋',
      title: 'Upload Class X Marksheet',
      steps: [
        'Scan or take a clear photo of your Class X marksheet',
        'Save/convert it as PDF named: <code>marksheet_10.pdf</code>',
        'Go to your GitHub repo: <strong>shivamkr67/shivam-portfolio</strong>',
        'Click "Add file" → "Upload files" → Upload → Commit',
        'Done! ✅'
      ]
    }
  };

  const info = guides[filename] || {
    icon: '📁',
    title: `Upload ${filename}`,
    steps: [
      `Rename your file to: <code>${filename}</code>`,
      'Go to your GitHub repo: <strong>shivamkr67/shivam-portfolio</strong>',
      'Click "Add file" → "Upload files" → Upload → Commit changes',
      'Done! ✅'
    ]
  };

  const modal = document.createElement('div');
  modal.id = 'upload-modal';
  modal.innerHTML = `
    <div style="
      position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:9999;
      display:flex; align-items:center; justify-content:center; padding:20px;
    " onclick="this.parentElement.remove()">
      <div style="
        background:#0d1a28; border:1px solid #00d4ff44; border-radius:20px;
        padding:36px; max-width:480px; width:100%; position:relative;
      " onclick="event.stopPropagation()">
        <button onclick="document.getElementById('upload-modal').remove()" style="
          position:absolute; top:16px; right:20px; background:none; border:none;
          color:#94a3b8; font-size:22px; cursor:pointer; line-height:1;
        ">✕</button>
        <div style="font-size:48px; margin-bottom:12px;">${info.icon}</div>
        <h3 style="color:#00d4ff; font-size:20px; margin-bottom:8px;">${info.title}</h3>
        <p style="color:#64748b; font-size:13px; margin-bottom:20px;">
          File <code style="color:#ff6b35; background:rgba(255,107,53,0.1); padding:2px 8px; border-radius:4px;">${filename}</code> is not in your repo yet.
        </p>
        <ol style="color:#94a3b8; font-size:14px; line-height:2; padding-left:20px; margin-bottom:24px;">
          ${info.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
        <a href="https://github.com/shivamkr67/shivam-portfolio/upload/main" target="_blank"
           style="
             display:inline-flex; align-items:center; gap:8px;
             background:linear-gradient(135deg,#00d4ff,#7c3aed);
             color:#000; font-weight:700; padding:12px 24px;
             border-radius:8px; text-decoration:none; font-size:14px;
           ">
          🚀 Open GitHub Upload Page
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Show global file checklist on first load (only in dev / if files missing)
window.addEventListener('load', async () => {
  const filesToCheck = [
    { file: 'Shivam_Kumar_CV_v4.pdf', label: 'CV / Resume' },
    { file: 'intel_cert.jpg', label: 'Intel Certificate' },
    { file: 'oracle_cert.jpg', label: 'Oracle Certificate' },
    { file: 'marksheet_12.pdf', label: 'Class XII Marksheet' },
    { file: 'marksheet_10.pdf', label: 'Class X Marksheet' },
    { file: 'lpu.jpg', label: 'LPU Photo' },
    { file: 'school.jpg', label: 'School Photo' },
  ];

  const missing = [];
  for (const item of filesToCheck) {
    try {
      const res = await fetch(item.file, { method: 'HEAD' });
      if (!res.ok) missing.push(item);
    } catch { missing.push(item); }
  }

  if (missing.length === 0) return; // All good!

  // Show floating banner at bottom
  const banner = document.createElement('div');
  banner.id = 'missing-banner';
  banner.innerHTML = `
    <div style="
      position:fixed; bottom:20px; right:20px; z-index:9000;
      background:#0d1a28; border:1px solid rgba(255,107,53,0.4);
      border-radius:14px; padding:16px 20px; max-width:320px;
      box-shadow:0 8px 40px rgba(0,0,0,0.5);
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
        <strong style="color:#ff6b35; font-size:14px;">⚠️ ${missing.length} Files Missing</strong>
        <button onclick="document.getElementById('missing-banner').remove()" style="background:none;border:none;color:#64748b;cursor:pointer;font-size:18px;">✕</button>
      </div>
      <div style="font-size:12px; color:#64748b; margin-bottom:12px;">These files need to be uploaded to your GitHub repo:</div>
      ${missing.map(m => `
        <div style="font-size:12px; color:#94a3b8; padding:4px 0; border-bottom:1px solid #1a3050;">
          <span style="color:#ff6b35;">✗</span> ${m.label} <code style="color:#64748b;">(${m.file})</code>
        </div>
      `).join('')}
      <a href="https://github.com/shivamkr67/shivam-portfolio/upload/main" target="_blank"
         style="display:block;margin-top:14px;text-align:center;background:linear-gradient(135deg,#ff6b35,#ffd700);color:#000;font-weight:700;padding:9px;border-radius:8px;text-decoration:none;font-size:13px;">
        📤 Upload Files on GitHub
      </a>
    </div>
  `;
  document.body.appendChild(banner);
});
