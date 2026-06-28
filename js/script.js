/* ============================================================
   MARK LUIS A. BERTILLO — PORTFOLIO JS (Bootstrap version)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ─────────────────────────────────────── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (cursor && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    const lerp = (a, b, t) => a + (b - a) * t;
    const animateCursor = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.querySelectorAll('a, button, .project-card, .skill-card, .chip, .timeline-card').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); cursorRing.classList.add('hovered'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); cursorRing.classList.remove('hovered'); });
    });
  }

  /* ── NAVBAR SCROLL STATE ───────────────────────────────── */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ── CLOSE MOBILE MENU ON LINK CLICK ───────────────────── */
  const navMenu = document.getElementById('navMenu');
  if (navMenu) {
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (bsCollapse) bsCollapse.hide();
        else navMenu.classList.remove('show');
      });
    });
  }

  /* ── SCROLL REVEAL ─────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── STAT COUNTER ──────────────────────────────────────── */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current  = 0;
        const step   = Math.max(1, Math.ceil(target / 40));
        const timer  = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

  /* ── SKILL BAR ANIMATION ───────────────────────────────── */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(fill => fill.classList.add('animated'));
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

  /* ── SMOOTH ANCHOR SCROLL (offset for fixed navbar) ────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── HERO PARALLAX ──────────────────────────────────────── */
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroCard.style.transform = `translateY(${y * 0.08}px)`;
    }, { passive: true });
  }

});

/* COPY EMAIL */
function copyEmail() {
    navigator.clipboard.writeText("@gmail.com");
    alert("Email copied to clipboard!");
}
