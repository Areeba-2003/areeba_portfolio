// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

function initRevealAnimations() {
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.querySelector('.scroll-progress');

  window.addEventListener('scroll', () => {
    // Sticky background
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll progress bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ===== CONTACT FORM (Frontend Only) =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Message Sent!`;
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.pointerEvents = '';
        form.reset();
      }, 3000);
    });
  }
}

// ===== LOADER =====
function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 800);
  });
}

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  function update() {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
      return;
    }
    el.textContent = Math.floor(current) + suffix;
    requestAnimationFrame(update);
  }
  update();
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}

// ===== ACTIVE NAV LINK HIGHLIGHT =====
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--text-primary)';
      }
    });
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initRevealAnimations();
  initContactForm();
  initCounters();
  initActiveNav();
});
