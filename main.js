/* =============================================
   NexGenAiTech — Main JavaScript
   Core Interactions, Particles, Chatbot, etc.
   ============================================= */

(function() {
  'use strict';

  // ============================================
  // 1. PRELOADER
  // ============================================
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 1600);
    });

    // Fallback
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }, 3500);
  }

  // ============================================
  // 2. SCROLL PROGRESS BAR
  // ============================================
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  // ============================================
  // 3. NAVBAR — scroll effect + mobile
  // ============================================
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('nav-overlay');

    if (!navbar) return;

    // Scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile toggle
    function openMenu() {
      toggle && toggle.classList.add('active');
      navLinks && navLinks.classList.add('open');
      overlay && overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      toggle && toggle.classList.remove('active');
      navLinks && navLinks.classList.remove('open');
      overlay && overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        toggle.classList.contains('active') ? closeMenu() : openMenu();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // ============================================
  // 4. CURSOR GLOW
  // ============================================
  function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || window.matchMedia('(pointer: coarse)').matches) {
      if (glow) glow.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  // ============================================
  // 5. MAGNETIC BUTTONS
  // ============================================
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .nav-cta');
    if (window.matchMedia('(pointer: coarse)').matches) return;

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ============================================
  // 6. CARD SPOTLIGHT EFFECT
  // ============================================
  function initCardSpotlight() {
    document.querySelectorAll('.service-card').forEach(card => {
      let spotlight = card.querySelector('.card-spotlight');
      if (!spotlight) {
        spotlight = document.createElement('div');
        spotlight.classList.add('card-spotlight');
        card.appendChild(spotlight);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }

  // ============================================
  // 7. RIPPLE EFFECT ON BUTTONS
  // ============================================
  function initRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';

      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${e.clientX - rect.left - size / 2}px;
          top: ${e.clientY - rect.top - size / 2}px;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });
    });
  }

  // ============================================
  // 8. HERO PARTICLES (tsParticles)
  // ============================================
  function initParticles() {
    if (typeof tsParticles === 'undefined') {
      setTimeout(initParticles, 200);
      return;
    }

    tsParticles.load('hero-particles', {
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      fpsLimit: 60,
      particles: {
        number: {
          value: 80,
          density: { enable: true, area: 900 }
        },
        color: {
          value: ['#6366f1', '#a855f7', '#06b6d4', '#818cf8']
        },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.05,
            sync: false
          }
        },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 2, minimumValue: 0.5 }
        },
        links: {
          enable: true,
          distance: 140,
          color: '#6366f1',
          opacity: 0.15,
          width: 1,
          triangles: {
            enable: false,
            opacity: 0.05
          }
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' },
          attract: { enable: false }
        }
      },
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.4 } },
          push: { quantity: 3 }
        }
      },
      detectRetina: true
    });
  }

  // ============================================
  // 9. TYPED.JS HERO HEADLINE
  // ============================================
  function initTyped() {
    const el = document.getElementById('typed-text');
    if (!el || typeof Typed === 'undefined') {
      if (typeof Typed === 'undefined') setTimeout(initTyped, 200);
      return;
    }

    new Typed(el, {
      strings: [
        'Intelligent Digital Systems',
        'AI-Powered Solutions',
        'Full-Stack Applications',
        'Scalable SaaS Platforms',
        'Mobile Experiences'
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 2200,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  // ============================================
  // 10. SWIPER TESTIMONIALS
  // ============================================
  function initSwiper() {
    if (typeof Swiper === 'undefined') {
      setTimeout(initSwiper, 200);
      return;
    }

    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      grabCursor: true,
    });
  }

  // ============================================
  // 11. BACK TO TOP
  // ============================================
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // 12. CHATBOT WIDGET
  // ============================================
  function initChatbot() {
    const fab = document.getElementById('chatbot-fab');
    const panel = document.getElementById('chatbot-panel');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');
    const badge = document.getElementById('chatbot-badge');

    if (!fab || !panel) return;

    let isOpen = false;

    const demoReplies = [
      "Hi! 👋 I'm NexBot, your AI assistant. How can I help you today?",
      "We specialize in AI/ML, Web Development, Mobile Apps, and SaaS solutions.",
      "You can reach us at nexgenaitech7@gmail.com or WhatsApp +91 8055698328.",
      "Our projects start from ₹2,999 for basic websites up to enterprise solutions.",
      "We typically deliver in 3–14 days depending on project complexity.",
      "Let me connect you with our team for a detailed quote! 🚀"
    ];

    let replyIndex = 0;

    function addMessage(text, type) {
      const msg = document.createElement('div');
      msg.classList.add('chat-msg', type);
      msg.textContent = text;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
      const typing = document.createElement('div');
      typing.classList.add('chat-typing');
      typing.id = 'chat-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;
      return typing;
    }

    function botReply() {
      const typing = showTyping();
      setTimeout(() => {
        typing.remove();
        const reply = demoReplies[replyIndex % demoReplies.length];
        addMessage(reply, 'bot');
        replyIndex++;
      }, 1200);
    }

    fab.addEventListener('click', () => {
      isOpen = !isOpen;
      panel.classList.toggle('open', isOpen);
      if (badge) badge.style.display = 'none';

      // Initial bot message
      if (isOpen && messages.children.length === 0) {
        setTimeout(() => {
          addMessage("Hi there! 👋 I'm NexBot. How can I help you today?", 'bot');
        }, 500);
      }
    });

    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      input.value = '';
      botReply();
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
      });
    }
  }

  // ============================================
  // 13. OFFER BUTTON
  // ============================================
  function initOfferButton() {
    const closeBtn = document.getElementById('offer-close');
    const offerFloat = document.getElementById('offer-float');

    if (closeBtn && offerFloat) {
      closeBtn.addEventListener('click', () => {
        offerFloat.style.display = 'none';
      });
    }
  }

  // ============================================
  // 14. CONTACT FORM
  // ============================================
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      // Simulate form submit (replace with real API call)
      setTimeout(() => {
        form.style.display = 'none';
        if (success) success.classList.add('shown');
      }, 1800);
    });
  }

  // ============================================
  // 15. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      });
    });
  }

  // ============================================
  // 16. TECH-ORB CENTER CONTENT
  // ============================================
  function initOrbRotation() {
    const center = document.querySelector('.tech-orb-center');
    if (!center) return;

    const icons = ['🤖', '⚡', '🧠', '🚀', '💡', '🔮'];
    let idx = 0;

    setInterval(() => {
      center.style.opacity = '0';
      center.style.transform = 'translate(-50%, -50%) scale(0.8)';
      setTimeout(() => {
        center.textContent = icons[idx % icons.length];
        center.style.opacity = '1';
        center.style.transform = 'translate(-50%, -50%) scale(1)';
        idx++;
      }, 300);
    }, 2500);

    center.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    center.style.fontSize = '48px';
    center.style.display = 'flex';
    center.style.alignItems = 'center';
    center.style.justifyContent = 'center';
    center.textContent = '🤖';
  }

  // ============================================
  // INIT ALL
  // ============================================
  document.body.style.overflow = 'hidden'; // Lock during preloader

  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollProgress();
    initNavbar();
    initCursorGlow();
    initMagneticButtons();
    initCardSpotlight();
    initRipple();
    initParticles();
    initTyped();
    initSwiper();
    initBackToTop();
    initChatbot();
    initOfferButton();
    initContactForm();
    initSmoothScroll();
    initOrbRotation();

    console.log('[NexGenAiTech] All systems initialized ✓');
  });

})();
