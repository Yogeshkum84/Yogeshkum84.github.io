/* ============================================================
   YOGESH K — Digital Workplace Portal
   main.js | Interactions & Animations
   ============================================================ */

// ─── Canvas Grid Background ───────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles(n) {
    particles = [];
    for (let i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
  }

  function drawGrid() {
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.035)';
    ctx.lineWidth = 1;
    const step = 60;
    for (let x = 0; x < W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  function drawParticles() {
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
      ctx.fill();

      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawParticles();
    requestAnimationFrame(loop);
  }

  resize();
  createParticles(70);
  loop();
  window.addEventListener('resize', () => { resize(); createParticles(70); });
})();


// ─── Typing Effect ────────────────────────────────────────
(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = window._typedPhrases || [
    'Service Delivery Manager',
    'Digital Workplace Architect',
    'Infrastructure Delivery Leader',
    'Automation-First IT Leader',
    'XLA & ITSM Strategist'
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    el.textContent = current.substring(0, charIdx);

    if (!deleting && charIdx === current.length) {
      setTimeout(() => { deleting = true; tick(); }, 2200);
      return;
    }
    if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
    charIdx += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 38 : 72);
  }

  setTimeout(tick, 800);
})();


// ─── Navbar Scroll Behavior ───────────────────────────────
(function initNav() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-links a[href^="#"]');
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  });

  hamburger && hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  links.forEach(a => {
    a.addEventListener('click', () => {
      navLinks && navLinks.classList.remove('open');
    });
  });
})();


// ─── Scroll Reveal ────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


// ─── Counter Animation ────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, 20);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


// ─── Contact Form ─────────────────────────────────────────
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Show confirmation banner if redirected back after successful submission
  if (new URLSearchParams(window.location.search).get('sent') === '1') {
    const banner = document.createElement('div');
    banner.style.cssText = `
      margin-bottom: 16px; padding: 14px 20px; border-radius: 8px;
      background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.4);
      color: #86efac; font-size: 0.95rem; text-align: center; line-height: 1.5;
    `;
    banner.textContent = 'Message sent! I will contact you as soon as possible based on the contact details you provided.';
    form.before(banner);

    // Clean the URL without reloading
    history.replaceState(null, '', window.location.pathname + '#contact');
  }

  // Client-side validation before native submit
  form.addEventListener('submit', (e) => {
    const name  = form.querySelector('#cf-name').value.trim();
    const email = form.querySelector('#cf-email').value.trim();
    const msg   = form.querySelector('#cf-message').value.trim();
    if (!name || !email || !msg) {
      e.preventDefault();
      alert('Please fill in your Name, Email, and Message before sending.');
    }
  });
})();


// ─── Skill Chips Hover Stagger ────────────────────────────
document.querySelectorAll('.skill-chip').forEach((chip, i) => {
  chip.style.transitionDelay = (i * 40) + 'ms';
});


// ─── Cursor Glow Trail (desktop only) ────────────────────
(function initCursor() {
  if (window.innerWidth < 900) return;
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
})();
