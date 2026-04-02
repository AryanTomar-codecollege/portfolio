/* ============================================
   ARYAN TOMAR — PORTFOLIO SCRIPTS
   Fun, Interactive & Elegant
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const html = document.documentElement;

  // ---- Dark/Light Theme Toggle ----
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // ---- Cursor Glow Follower ----
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursorGlow() {
    // Smooth follow with easing
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursorGlow);
  }
  animateCursorGlow();

  // Hide cursor glow on mobile
  if ('ontouchstart' in window) {
    cursorGlow.style.display = 'none';
  }

  // ---- Navbar Scroll Effect ----
  const nav = document.getElementById('nav');
  function handleNavScroll() {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---- Mobile Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Typing Animation ----
  const typingEl = document.getElementById('typing-text');
  const roles = [
    'Frontend Developer',
    'Software Developer',
    'Problem Solver',
    'CS Student (AI/ML)',
    'Building Cool Things ✨',
  ];
  let roleIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 80;

  function typeEffect() {
    if (!typingEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // ---- Counting Animation for Snapshot Values ----
  const countElements = document.querySelectorAll('[data-count]');
  let countAnimated = false;

  function animateCounts() {
    if (countAnimated) return;
    countAnimated = true;

    countElements.forEach((el, index) => {
      const target = parseFloat(el.getAttribute('data-count'));
      const isDecimal = target % 1 !== 0;
      const duration = 1500;
      const startTime = performance.now() + index * 200; // Stagger

      function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        if (elapsed < 0) {
          requestAnimationFrame(updateCount);
          return;
        }
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (isDecimal) {
          el.textContent = current.toFixed(1) + '%';
        } else {
          el.textContent = Math.round(current) + '%';
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = (isDecimal ? target.toFixed(1) : target) + '%';
          el.classList.add('counted');
          setTimeout(() => el.classList.remove('counted'), 800);
        }
      }
      requestAnimationFrame(updateCount);
    });
  }

  // Trigger counting when hero card is visible
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    const countObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(animateCounts, 600);
        countObserver.disconnect();
      }
    }, { threshold: 0.3 });
    countObserver.observe(heroCard);
  }

  // ---- 3D Tilt Effect on Project Cards ----
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s ease';
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ---- Magnetic Button Effect ----
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .project-btn').forEach(btn => {
    btn.classList.add('magnetic');
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

  // ---- Experience Nav — Scroll To Item (FIX) ----
  const expNavItems = document.querySelectorAll('.experience-nav-item[data-exp-index]');
  expNavItems.forEach(navItem => {
    navItem.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const index = navItem.getAttribute('data-exp-index');
      const targetItem = document.getElementById('exp-' + index);

      if (targetItem) {
        // Smooth scroll to the experience item
        const navHeight = nav?.offsetHeight || 0;
        const top = targetItem.getBoundingClientRect().top + window.scrollY - navHeight - 30;
        window.scrollTo({ top, behavior: 'smooth' });

        // Highlight the item briefly
        targetItem.classList.add('highlighted');
        setTimeout(() => targetItem.classList.remove('highlighted'), 2000);

        // Update active nav state
        expNavItems.forEach(item => item.classList.remove('active'));
        navItem.classList.add('active');
      }
    });
  });

  // ---- Scroll Reveal (IntersectionObserver) ----
  const revealElements = document.querySelectorAll('.reveal, .experience-item');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // Stagger reveal
  const staggerElements = document.querySelectorAll('.reveal-stagger');
  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  staggerElements.forEach((el) => staggerObserver.observe(el));

  // ---- Navbar Scrollspy ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNavLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavLink, { passive: true });
  highlightNavLink();

  // ---- Experience Nav Auto-Sync on Scroll ----
  const expItems = document.querySelectorAll('.experience-item');
  const expObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Array.from(expItems).indexOf(entry.target);
        expNavItems.forEach((item) => item.classList.remove('active'));
        if (expNavItems[index]) expNavItems[index].classList.add('active');
      });
    },
    { threshold: 0.55 }
  );
  expItems.forEach((item) => expObserver.observe(item));

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const navHeight = nav?.offsetHeight || 0;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Scroll-to-Top Button ----
  const scrollTopBtn = document.getElementById('scroll-top');
  function handleScrollTop() {
    scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', handleScrollTop, { passive: true });
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Contact Form Submission ----
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const formNext = document.getElementById('form-next');
  const formReplyTo = document.getElementById('form-replyto');
  const formUrl = document.getElementById('form-url');

  if (contactForm) {
    const currentUrl = `${window.location.origin}${window.location.pathname}`;
    if (formNext) formNext.value = `${currentUrl}?form=success#contact`;
    if (formUrl) formUrl.value = currentUrl;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('form') === 'success' && formStatus) {
      formStatus.textContent = 'Message sent successfully. I will get it on my email.';
      formStatus.className = 'form-status success';

      // Clean the success query from the address bar after showing feedback.
      const cleanUrl = `${window.location.pathname}${window.location.hash || '#contact'}`;
      window.history.replaceState({}, '', cleanUrl);
    }

    contactForm.addEventListener('submit', (e) => {
      const firstNameInput = document.getElementById('fname');
      const lastNameInput = document.getElementById('lname');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      const submitButton = contactForm.querySelector('.submit-btn');

      const firstName = firstNameInput?.value.trim() || '';
      const lastName = lastNameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const subject = subjectInput?.value.trim() || '';
      const message = messageInput?.value.trim() || '';

      if (!firstName || !email || !subject || !message) {
        e.preventDefault();
        if (formStatus) {
          formStatus.textContent = 'Please fill in your name, email, subject, and message before sending.';
          formStatus.className = 'form-status error';
        }
        return;
      }

      if (formReplyTo) formReplyTo.value = email;
      contactForm.querySelector('input[name="name"][data-generated-name]')?.remove();

      const nameField = document.createElement('input');
      nameField.type = 'hidden';
      nameField.name = 'name';
      nameField.dataset.generatedName = 'true';
      nameField.value = [firstName, lastName].filter(Boolean).join(' ');
      contactForm.appendChild(nameField);

      if (formStatus) {
        formStatus.textContent = 'Sending your message...';
        formStatus.className = 'form-status';
      }
      if (submitButton) submitButton.disabled = true;
    });
  }

  // ---- Animated Background Particles ----
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 50;
    let mouse = { x: null, y: null };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse for particle interaction
    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 40;
        this.size = Math.random() * 2.5 + 0.5;
        this.baseSpeedY = Math.random() * 0.4 + 0.1;
        this.speedY = this.baseSpeedY;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.35 + 0.08;
        this.drift = Math.random() * 0.008 + 0.002;
        this.angle = Math.random() * Math.PI * 2;
        this.currentOpacity = 0;
      }
      update() {
        this.y -= this.speedY;
        this.angle += this.drift;
        this.x += Math.sin(this.angle) * 0.3 + this.speedX;

        // Mouse repulsion — particles gently push away from cursor
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x += (dx / dist) * force * 1.5;
            this.y += (dy / dist) * force * 1.5;
          }
        }

        const progress = 1 - (this.y / canvas.height);
        this.currentOpacity = this.opacity * Math.sin(progress * Math.PI);

        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }
      }
      draw() {
        const isDark = html.getAttribute('data-theme') !== 'light';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `rgba(110, 168, 254, ${this.currentOpacity})`;
        } else {
          ctx.fillStyle = `rgba(74, 127, 247, ${this.currentOpacity * 0.6})`;
        }
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    // Draw faint connecting lines between nearby particles
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.06;
            const isDark = html.getAttribute('data-theme') !== 'light';
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(110, 168, 254, ${opacity})`
              : `rgba(74, 127, 247, ${opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawConnections();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ---- Easter Egg: Logo Click Counter ----
  const logo = document.querySelector('.nav-logo');
  let logoClicks = 0;
  logo?.addEventListener('click', (e) => {
    e.preventDefault();
    logoClicks++;
    if (logoClicks === 5) {
      // Fun confetti burst!
      createConfetti();
      logoClicks = 0;
    }
  });

  function createConfetti() {
    const colors = ['#6ea8fe', '#9b8afb', '#4eddb8', '#ffab6f', '#ff6b9d'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position:fixed;
        top:${Math.random() * 30}%;
        left:${Math.random() * 100}%;
        width:${Math.random() * 8 + 4}px;
        height:${Math.random() * 8 + 4}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events:none;
        z-index:9999;
        animation:confettiFall ${Math.random() * 2 + 1.5}s ease forwards;
        opacity:0;
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3500);
    }
  }

  // Add confetti animation keyframes dynamically
  const confettiStyle = document.createElement('style');
  confettiStyle.textContent = `
    @keyframes confettiFall {
      0% { opacity:1; transform: translateY(0) rotate(0deg) scale(1); }
      50% { opacity:1; }
      100% { opacity:0; transform: translateY(${window.innerHeight}px) rotate(${Math.random()*720}deg) scale(0.3); }
    }
  `;
  document.head.appendChild(confettiStyle);

  // ---- Parallax on Hero Elements ----
  const heroSection = document.querySelector('.hero');
  const heroCardParallax = document.querySelector('.hero-card');
  const heroNameEl = document.querySelector('.hero-name');

  if (heroSection && window.innerWidth > 980) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      if (scrolled < heroHeight) {
        const ratio = scrolled / heroHeight;
        if (heroCardParallax) {
          heroCardParallax.style.transform = `translateY(${ratio * -30}px)`;
        }
        if (heroNameEl) {
          heroNameEl.style.transform = `translateY(${ratio * 15}px)`;
        }
      }
    }, { passive: true });
  }

});
