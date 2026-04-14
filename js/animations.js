/* =============================================
   NexGenAiTech — GSAP Scroll Animations
   ScrollTrigger powered reveals & counters
   ============================================= */

(function() {
  'use strict';

  // Wait for GSAP to load
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initGSAP, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Default easing
    gsap.defaults({ ease: 'power3.out' });

    // ============================================
    // SECTION LABELS
    // ============================================
    gsap.utils.toArray('.section-label').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.6,
      });
    });

    // ============================================
    // SECTION HEADERS
    // ============================================
    gsap.utils.toArray('.section-header').forEach(el => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
      tl.from(el.querySelector('.section-title'), {
        opacity: 0, y: 40, duration: 0.8
      }).from(el.querySelector('.section-subtitle'), {
        opacity: 0, y: 20, duration: 0.6
      }, '-=0.4');
    });

    // ============================================
    // SERVICE CARDS — stagger from below
    // ============================================
    const serviceCards = gsap.utils.toArray('.service-card');
    if (serviceCards.length) {
      gsap.from(serviceCards, {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 82%',
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.12,
      });
    }

    // ============================================
    // ABOUT SECTION
    // ============================================
    gsap.from('.about-content-left', {
      scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
      opacity: 0,
      x: -60,
      duration: 0.9,
    });

    gsap.from('.about-visual', {
      scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
      opacity: 0,
      x: 60,
      duration: 0.9,
      delay: 0.2,
    });

    // About feature items
    gsap.from('.about-feature', {
      scrollTrigger: { trigger: '.about-features', start: 'top 82%' },
      opacity: 0,
      x: -30,
      duration: 0.5,
      stagger: 0.1,
    });

    // ============================================
    // STATS COUNTERS
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(el,
            { textContent: '0' },
            {
              textContent: target,
              duration: 2.5,
              ease: 'power2.out',
              snap: { textContent: 1 },
              onUpdate: function() {
                el.textContent = Math.round(el.textContent) + suffix;
              }
            }
          );
        }
      });
    });

    // ============================================
    // STAT CARDS
    // ============================================
    gsap.from('.stat-card', {
      scrollTrigger: { trigger: '.stats-grid', start: 'top 82%' },
      opacity: 0,
      y: 40,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.1,
    });

    // ============================================
    // PORTFOLIO CARDS
    // ============================================
    gsap.from('.portfolio-card', {
      scrollTrigger: { trigger: '.portfolio-grid', start: 'top 80%' },
      opacity: 0,
      y: 50,
      duration: 0.7,
      stagger: 0.15,
    });

    // ============================================
    // WHY CARDS
    // ============================================
    gsap.from('.why-card', {
      scrollTrigger: { trigger: '.why-grid', start: 'top 80%' },
      opacity: 0,
      y: 40,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.12,
    });

    // ============================================
    // TECH SECTION HEADER
    // ============================================
    gsap.from('.tech-section .section-header', {
      scrollTrigger: { trigger: '.tech-section', start: 'top 80%' },
      opacity: 0,
      y: 30,
      duration: 0.7,
    });

    // ============================================
    // TESTIMONIALS SECTION
    // ============================================
    gsap.from('.testimonials-section .section-header', {
      scrollTrigger: { trigger: '.testimonials-section', start: 'top 80%' },
      opacity: 0,
      y: 30,
      duration: 0.7,
    });

    // ============================================
    // CONTACT SECTION
    // ============================================
    gsap.from('.contact-info-col', {
      scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
      opacity: 0,
      x: -50,
      duration: 0.8,
    });

    gsap.from('.contact-form-wrap', {
      scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
      opacity: 0,
      x: 50,
      duration: 0.8,
      delay: 0.2,
    });

    gsap.from('.contact-detail', {
      scrollTrigger: { trigger: '.contact-details', start: 'top 82%' },
      opacity: 0,
      x: -20,
      duration: 0.4,
      stagger: 0.1,
    });

    // ============================================
    // CTA BANNER
    // ============================================
    gsap.from('.cta-content > *', {
      scrollTrigger: { trigger: '.cta-banner', start: 'top 78%' },
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.15,
    });

    // ============================================
    // FOOTER
    // ============================================
    gsap.from('.footer-grid > *', {
      scrollTrigger: { trigger: '.footer-grid', start: 'top 85%' },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
    });

    // ============================================
    // PARALLAX HERO GLOW
    // ============================================
    const heroGlow1 = document.querySelector('.hero-glow-1');
    const heroGlow2 = document.querySelector('.hero-glow-2');

    if (heroGlow1 && heroGlow2) {
      gsap.to(heroGlow1, {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: -100,
        x: 50,
      });

      gsap.to(heroGlow2, {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 80,
        x: -40,
      });
    }

    // ============================================
    // TECH ORB GRID ANIMATION
    // ============================================
    gsap.from('.tech-orb', {
      scrollTrigger: { trigger: '.tech-orb-grid', start: 'top 80%' },
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      stagger: 0.1,
    });

    console.log('[GSAP] Scroll animations initialized ✓');
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
  } else {
    initGSAP();
  }

})();
