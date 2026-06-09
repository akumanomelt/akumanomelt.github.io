/* Akuma No Melt — main.js */

// ─── Mobile menu ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(8,4,6,0.98)';
  } else {
    navbar.style.background = 'rgba(10,6,8,0.92)';
  }
});

// ─── Scroll reveal ───
const revealEls = document.querySelectorAll(
  '.product-card, .feature, .story-content, .story-image, .section-eyebrow, .section-title'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards
      const delay = entry.target.closest('.product-grid')
        ? [...entry.target.parentElement.children].indexOf(entry.target) * 80
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ─── Smooth anchor scroll ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      mobileMenu.classList.remove('open');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Newsletter form ───
const newsletterBtn = document.querySelector('.newsletter-btn');
const newsletterInput = document.querySelector('.newsletter-input');
if (newsletterBtn && newsletterInput) {
  newsletterBtn.addEventListener('click', () => {
    const val = newsletterInput.value.trim();
    if (val && val.includes('@')) {
      newsletterInput.value = '';
      newsletterInput.placeholder = 'You\'re in the crew!';
      newsletterBtn.style.background = '#2a6e2a';
      setTimeout(() => {
        newsletterInput.placeholder = 'Enter your email';
        newsletterBtn.style.background = '';
      }, 3000);
    } else {
      newsletterInput.style.borderColor = '#c94a1a';
      setTimeout(() => { newsletterInput.style.borderColor = ''; }, 1500);
    }
  });
}
