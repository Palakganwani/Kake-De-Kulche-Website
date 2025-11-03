// script.js
// Slider, scroll behavior, fade-in effects, lightbox, navbar toggle and reservation form

document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const header = document.getElementById('header');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const navLinks = document.querySelectorAll('.nav-link');
  const masonryImgs = document.querySelectorAll('.masonry-item img');
  const menuImages = document.querySelectorAll('.menu-image');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const joinNowBtn = document.getElementById('join-now-btn');

  // ---------- TOP BAR JOIN NOW ALERT ----------
  if (joinNowBtn) {
    joinNowBtn.addEventListener('click', () => {
      alert('📞 Contact us for franchise: +91 8949058360');
    });
  }

  // ---------- NAVBAR SOLID ON SCROLL ----------
  function handleNavScroll() {
    if (window.scrollY > 60) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  // ---------- SMOOTH SCROLL FOR ANCHORS ----------
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (window.innerWidth < 700 && navLinksContainer)
          navLinksContainer.style.display = 'none';
      }
      else if (a.textContent.trim() === 'Investment & Franchise') {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (window.innerWidth < 700 && navLinksContainer)
          navLinksContainer.style.display = 'none';
      }
    });
  });

  // ---------- MOBILE NAV TOGGLE ----------
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (navLinksContainer.style.display === 'flex') {
        navLinksContainer.style.display = 'none';
      } else {
        navLinksContainer.style.display = 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.background = 'rgba(14,14,14,0.95)';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '64px';
        navLinksContainer.style.right = '20px';
        navLinksContainer.style.padding = '12px';
        navLinksContainer.style.borderRadius = '8px';
      }
    });
  }

  // ---------- HERO SLIDER ----------
  slides.forEach(slide => {
    const bg = slide.dataset.bg;
    slide.style.backgroundImage =
      `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.25)), url('${bg}')`;
  });

  let current = 0;
  let slideInterval;
  const slideDuration = 3500;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }
  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

  function startInterval() {
    slideInterval = setInterval(nextSlide, slideDuration);
  }
  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  if (slides.length) {
    showSlide(0);
    startInterval();
  }

  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    heroEl.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroEl.addEventListener('mouseleave', () => startInterval());
  }

  // ---------- FADE-IN ON SCROLL ----------
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
  const inviewCallback = (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(inviewCallback, observerOptions);
  masonryImgs.forEach(img => observer.observe(img));
  const aboutText = document.querySelector('.about-text');
  if (aboutText) observer.observe(aboutText);
  const fadeItems = document.querySelectorAll('.featured-card, .review-card, .masonry-item');
  fadeItems.forEach(item => observer.observe(item));
  menuImages.forEach(img => observer.observe(img));

  // ---------- LIGHTBOX ----------
  menuImages.forEach(img => {
    img.addEventListener('click', () => {
      const src = img.dataset.full || img.src;
      lightboxImg.src = src;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 300);
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) closeLightbox();
  });

  // ---------- Lazy reveal slides ----------
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.setAttribute('aria-hidden', 'false');
      }
    });
  }, { threshold: 0.1 });
  slides.forEach(s => slideObserver.observe(s));

  // ---------- Accessibility ----------
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
  });

  // ---------- Investment & Franchise Scroll ----------
  const franchiseBtn = document.getElementById('franchise-btn');
  if (franchiseBtn) {
    franchiseBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}); // End DOMContentLoaded