/* =============================================
   ORÍ PET HOTEL — app.js
   ============================================= */

(function () {
  'use strict';

  // ─── NAVBAR SCROLL EFFECT ──────────────────

  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ─── MOBILE MENU ───────────────────────────

  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    mobileMenu.classList.remove('mobile-menu-closed');
    mobileMenu.classList.add('mobile-menu-open');
    menuIconOpen.classList.add('hidden');
    menuIconClose.classList.remove('hidden');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('mobile-menu-open');
    mobileMenu.classList.add('mobile-menu-closed');
    menuIconOpen.classList.remove('hidden');
    menuIconClose.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.querySelectorAll('[data-close-menu]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (menuOpen && !navbar.contains(e.target)) {
      closeMenu();
    }
  });

  // ─── SMOOTH SCROLL ─────────────────────────

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─── REVEAL ON SCROLL ──────────────────────

  const revealItems = document.querySelectorAll('.reveal-item');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealItems.forEach(item => revealObserver.observe(item));

  // ─── GALLERY HOVER (touch support) ─────────

  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('touchstart', () => {
      galleryItems.forEach(i => i.querySelector('.gallery-hover')?.style.setProperty('opacity', '0'));
      item.querySelector('.gallery-hover')?.style.setProperty('opacity', '1');
    }, { passive: true });
  });

  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.gallery-item')) {
      galleryItems.forEach(i => i.querySelector('.gallery-hover')?.style.setProperty('opacity', '0'));
    }
  }, { passive: true });

  // ─── REVIEW CARDS — SUBTLE PARALLAX ────────

  const reviewCards = document.querySelectorAll('.review-card');

  reviewCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      card.style.transform = `translateY(-4px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

  // ─── DIFERENCIAL CARDS — HOVER TINT ────────

  const diferencialCards = document.querySelectorAll('.diferencial-card');

  diferencialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.background = '#fff';
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // ─── HERO CTA PULSE (subtle) ───────────────

  const heroPrimary = document.querySelector('.btn-hero-primary');
  if (heroPrimary) {
    setTimeout(() => {
      heroPrimary.style.animation = 'none';
    }, 3000);
  }

  // ─── WHATSAPP LINK — TRACKING ──────────────

  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', { event_category: 'engagement', event_label: link.closest('section')?.id || 'unknown' });
      }
    });
  });

  // ─── VIDEO FALLBACK ────────────────────────

  const heroVideo = document.querySelector('#hero video');
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      heroVideo.parentElement.style.background = 'linear-gradient(135deg, #395434 0%, #243522 100%)';
    });
  }

})();