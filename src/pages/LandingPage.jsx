import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal-item, .hero-section-observer');
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            } else {
              entry.target.classList.remove('is-visible');
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
      );
      revealItems.forEach((el) => observer.observe(el));
    } else {
      revealItems.forEach((el) => el.classList.add('is-visible'));
    }

    // Sticky Scroll-Driven How It Works Controller + Cashout Confetti
    const howSection = document.getElementById('how-it-works');
    const stepCards = document.querySelectorAll('.how-step-card');
    const phoneScreens = document.querySelectorAll('.how-phone-screen');
    const progressBar = document.getElementById('how-progress-bar');
    const confettiCanvas = document.getElementById('cashout-confetti-canvas');
    const totalSteps = 4;
    let activeStep = -1;
    let confettiAnimId = null;

    function launchCashoutConfetti() {
      if (!confettiCanvas) return;
      const ctx = confettiCanvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const width = confettiCanvas.offsetWidth || window.innerWidth;
      const height = confettiCanvas.offsetHeight || window.innerHeight;
      confettiCanvas.width = width * dpr;
      confettiCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (confettiAnimId) cancelAnimationFrame(confettiAnimId);

      const colors = [
        '#f6be56',
        '#fde047',
        '#5cb3e2',
        '#38bdf8',
        '#2d7ff9',
        '#10b981',
        '#ffffff',
        '#fb7185',
      ];
      const particles = [];

      function spawnBurst(originX, originY, baseAngle, spread, count, minSpeed, maxSpeed) {
        for (let i = 0; i < count; i++) {
          const angle = baseAngle + (Math.random() - 0.5) * spread;
          const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
          const shapeRoll = Math.random();
          const shape = shapeRoll < 0.55 ? 'rect' : shapeRoll < 0.82 ? 'ribbon' : 'circle';
          particles.push({
            x: originX + (Math.random() - 0.5) * 24,
            y: originY + (Math.random() - 0.5) * 24,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            w: shape === 'ribbon' ? 5 + Math.random() * 4 : 7 + Math.random() * 7,
            h: shape === 'ribbon' ? 14 + Math.random() * 10 : 5 + Math.random() * 5,
            r: 3 + Math.random() * 3.5,
            shape,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * Math.PI * 2,
            tiltSpeed: 0.08 + Math.random() * 0.14,
            rot: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.16,
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.04 + Math.random() * 0.05,
            drag: 0.962 + Math.random() * 0.015,
            gravity: 0.22 + Math.random() * 0.12,
            alpha: 1,
          });
        }
      }

      // Left & right side cannons + celebratory burst around the phone
      spawnBurst(width * 0.06, height * 0.72, -Math.PI / 3, 0.75, 75, 13, 24);
      spawnBurst(width * 0.94, height * 0.72, (-2 * Math.PI) / 3, 0.75, 75, 13, 24);
      spawnBurst(width * 0.68, height * 0.36, -Math.PI / 2, Math.PI * 1.4, 65, 6, 15);

      const secondWaveTimer = window.setTimeout(() => {
        spawnBurst(width * 0.25, height * 0.12, Math.PI / 2, 1.3, 40, 4, 10);
        spawnBurst(width * 0.75, height * 0.12, Math.PI / 2, 1.3, 40, 4, 10);
      }, 180);

      function tick() {
        ctx.clearRect(0, 0, width, height);
        let alive = 0;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.vx *= p.drag;
          p.vy = p.vy * p.drag + p.gravity;
          p.swayPhase += p.swaySpeed;
          p.x += p.vx + Math.sin(p.swayPhase) * 0.9;
          p.y += p.vy;
          p.tilt += p.tiltSpeed;
          p.rot += p.vRot;

          if (p.y > height * 0.78) {
            p.alpha -= 0.022;
          }

          if (p.alpha > 0.02 && p.y < height + 50) {
            alive++;
            const scaleY = Math.cos(p.tilt);
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.scale(1, Math.abs(scaleY) < 0.15 ? 0.15 : scaleY);
            ctx.fillStyle = p.color;

            if (p.shape === 'circle') {
              ctx.beginPath();
              ctx.arc(0, 0, p.r, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.shape === 'ribbon') {
              ctx.beginPath();
              ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2);
              ctx.fill();
            } else {
              ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            }
            ctx.restore();
          }
        }

        if (alive > 0) {
          confettiAnimId = requestAnimationFrame(tick);
        } else {
          window.clearTimeout(secondWaveTimer);
          ctx.clearRect(0, 0, width, height);
        }
      }

      confettiAnimId = requestAnimationFrame(tick);
    }

    function setHowStep(idx) {
      if (idx === activeStep) return;
      const prevStep = activeStep;
      activeStep = idx;
      stepCards.forEach((card, i) => {
        card.classList.toggle('is-active', i === idx);
      });
      phoneScreens.forEach((screen, i) => {
        screen.classList.toggle('is-active', i === idx);
      });
      if (progressBar) {
        progressBar.style.height = `${((idx + 1) / totalSteps) * 100}%`;
      }
      if (idx === 3 && prevStep !== 3) {
        launchCashoutConfetti();
      }
    }

    function onScrollHow() {
      if (!howSection) return;
      const rect = howSection.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(0.999, -rect.top / scrollable));
      const stepIndex = Math.floor(progress * totalSteps);
      setHowStep(stepIndex);
    }

    window.addEventListener('scroll', onScrollHow, { passive: true });
    onScrollHow();

    const clickHandlers = [];
    stepCards.forEach((card, idx) => {
      const handler = () => {
        setHowStep(idx);
        if (howSection) {
          const scrollable = howSection.offsetHeight - window.innerHeight;
          const targetY =
            howSection.offsetTop + (idx / totalSteps) * scrollable + 20;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      };
      card.addEventListener('click', handler);
      clickHandlers.push({ card, handler });
    });

    // FAQ Accordion
    const faqItems = Array.from(document.querySelectorAll('.faq-item'));
    const faqHandlers = [];
    faqItems.forEach((item) => {
      const trigger = item.querySelector('.faq-trigger');
      if (!trigger) return;
      const handler = () => {
        const isOpen = item.classList.contains('is-open');
        faqItems.forEach((other) => {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.faq-trigger');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      };
      trigger.addEventListener('click', handler);
      faqHandlers.push({ trigger, handler });
    });

    // Mobile Menu Drawer
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    const mobileLinkHandlers = [];
    const onMobileMenuToggle = () => {
      if (!mobileNavDrawer || !mobileMenuBtn) return;
      const isHidden = mobileNavDrawer.classList.contains('hidden');
      mobileNavDrawer.classList.toggle('hidden', !isHidden);
      mobileMenuBtn.setAttribute('aria-expanded', String(isHidden));
    };
    if (mobileMenuBtn && mobileNavDrawer) {
      mobileMenuBtn.addEventListener('click', onMobileMenuToggle);
      Array.from(mobileNavDrawer.querySelectorAll('a')).forEach((link) => {
        const closeFn = () => {
          mobileNavDrawer.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        };
        link.addEventListener('click', closeFn);
        mobileLinkHandlers.push({ link, closeFn });
      });
    }

    return () => {
      if (observer) observer.disconnect();
      if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
      window.removeEventListener('scroll', onScrollHow);
      clickHandlers.forEach(({ card, handler }) =>
        card.removeEventListener('click', handler)
      );
      faqHandlers.forEach(({ trigger, handler }) =>
        trigger.removeEventListener('click', handler)
      );
      if (mobileMenuBtn) {
        mobileMenuBtn.removeEventListener('click', onMobileMenuToggle);
      }
      mobileLinkHandlers.forEach(({ link, closeFn }) =>
        link.removeEventListener('click', closeFn)
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0d0d0d] font-inter">
      {/* ===================================================================
          HERO SECTION (White Minimalist Stage + Right-Bleed Hero Artwork)
      =================================================================== */}
      <section className="hero-section-observer is-visible relative bg-white overflow-x-clip lg:min-h-[790px] xl:min-h-[830px] flex flex-col justify-between">
        {/* RIGHT-BLEED HERO IMAGE */}
        <div className="hidden lg:block pointer-events-none select-none absolute top-4 right-0 -bottom-8 xl:-bottom-10 z-10 anim-open-hero-art">
          <img
            src="/public/images/hero-section-image.png?v=3"
            alt="PeleBet App Mockup with Hand, Soccer Ball, and 8-Ball"
            className="h-full w-auto max-w-none object-contain object-right-bottom block anim-float-gentle"
          />
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-5 sm:pt-6 flex-1 flex flex-col justify-between relative z-20">
          {/* CLEAN HIGH-CONTRAST PILL NAVBAR */}
          <header className="w-full flex items-center justify-between gap-4 relative z-30 anim-open-nav">
            {/* Left Group: PeleBet Dark Logo + Floating Pill Navigation */}
            <div className="flex items-center gap-5 lg:gap-8">
              <a
                href="/"
                className="flex items-center shrink-0 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-gray-200/80 shadow-[0_4px_16px_rgba(15,23,42,0.05)] hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="/public/images/logo-dark.png"
                  alt="PeleBet"
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </a>

              <nav className="hidden md:flex items-center gap-1 bg-[#f4f5f8]/95 backdrop-blur-md border border-gray-200/90 rounded-full p-1.5 shadow-[0_6px_22px_rgba(15,23,42,0.06)]">
                <a
                  href="#features"
                  className="px-4 py-2 rounded-full text-[13.5px] font-medium text-[#0d0d0d] bg-white shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="px-4 py-2 rounded-full text-[13.5px] font-medium text-[#525866] hover:text-[#0d0d0d] hover:bg-white/70 hover:-translate-y-0.5 transition-all duration-200"
                >
                  How it works
                </a>
                <a
                  href="#community"
                  className="px-4 py-2 rounded-full text-[13.5px] font-medium text-[#525866] hover:text-[#0d0d0d] hover:bg-white/70 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Reviews
                </a>
                <a
                  href="#about"
                  className="px-4 py-2 rounded-full text-[13.5px] font-medium text-[#525866] hover:text-[#0d0d0d] hover:bg-white/70 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Right: QR Code "Download the App" Badge + Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="#download-ios"
                className="group inline-flex items-center gap-2 sm:gap-3.5 bg-[#082066] hover:bg-[#06174d] text-white rounded-[14px] sm:rounded-[18px] px-2.5 py-2 sm:px-4 sm:py-2.5 sm:pr-6 shadow-[0_12px_30px_rgba(8,32,102,0.28)] border border-white/15 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5"
              >
                {/* Crisp White QR Code SVG with 3 Rounded Corner Finders & Matrix Dots */}
                <svg
                  className="w-8 h-8 sm:w-12 sm:h-12 text-white shrink-0 group-hover:rotate-3 transition-transform duration-300"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Top-Left Finder */}
                <rect x="2" y="2" width="12" height="12" rx="3.2" stroke="currentColor" strokeWidth="2.4" />
                <rect x="5.6" y="5.6" width="4.8" height="4.8" rx="1.2" fill="currentColor" />
                {/* Top-Right Finder */}
                <rect x="30" y="2" width="12" height="12" rx="3.2" stroke="currentColor" strokeWidth="2.4" />
                <rect x="33.6" y="5.6" width="4.8" height="4.8" rx="1.2" fill="currentColor" />
                {/* Bottom-Left Finder */}
                <rect x="2" y="30" width="12" height="12" rx="3.2" stroke="currentColor" strokeWidth="2.4" />
                <rect x="5.6" y="33.6" width="4.8" height="4.8" rx="1.2" fill="currentColor" />

                {/* QR Matrix Dots */}
                <g fill="currentColor">
                  <circle cx="18" cy="4" r="1.3" />
                  <circle cx="21" cy="4" r="1.3" />
                  <circle cx="26" cy="4" r="1.3" />
                  <circle cx="18" cy="7" r="1.3" />
                  <circle cx="24" cy="7" r="1.3" />
                  <circle cx="21" cy="10" r="1.3" />
                  <circle cx="26" cy="10" r="1.3" />
                  <circle cx="18" cy="13" r="1.3" />
                  <circle cx="21" cy="13" r="1.3" />
                  <circle cx="24" cy="13" r="1.3" />

                  <circle cx="4" cy="18" r="1.3" />
                  <circle cx="7" cy="18" r="1.3" />
                  <circle cx="13" cy="18" r="1.3" />
                  <circle cx="16" cy="18" r="1.3" />
                  <circle cx="21" cy="18" r="1.3" />
                  <circle cx="27" cy="18" r="1.3" />
                  <circle cx="30" cy="18" r="1.3" />
                  <circle cx="36" cy="18" r="1.3" />
                  <circle cx="40" cy="18" r="1.3" />

                  <circle cx="4" cy="21" r="1.3" />
                  <circle cx="10" cy="21" r="1.3" />
                  <circle cx="16" cy="21" r="1.3" />
                  <circle cx="19" cy="21" r="1.3" />
                  <circle cx="24" cy="21" r="1.3" />
                  <circle cx="30" cy="21" r="1.3" />
                  <circle cx="33" cy="21" r="1.3" />
                  <circle cx="39" cy="21" r="1.3" />

                  <circle cx="7" cy="24" r="1.3" />
                  <circle cx="10" cy="24" r="1.3" />
                  <circle cx="13" cy="24" r="1.3" />
                  <circle cx="19" cy="24" r="1.3" />
                  <circle cx="22" cy="24" r="1.3" />
                  <circle cx="27" cy="24" r="1.3" />
                  <circle cx="33" cy="24" r="1.3" />
                  <circle cx="36" cy="24" r="1.3" />
                  <circle cx="41" cy="24" r="1.3" />

                  <circle cx="4" cy="27" r="1.3" />
                  <circle cx="10" cy="27" r="1.3" />
                  <circle cx="16" cy="27" r="1.3" />
                  <circle cx="24" cy="27" r="1.3" />
                  <circle cx="27" cy="27" r="1.3" />
                  <circle cx="30" cy="27" r="1.3" />
                  <circle cx="39" cy="27" r="1.3" />

                  <circle cx="18" cy="31" r="1.3" />
                  <circle cx="21" cy="31" r="1.3" />
                  <circle cx="27" cy="31" r="1.3" />
                  <circle cx="33" cy="31" r="1.3" />
                  <circle cx="36" cy="31" r="1.3" />
                  <circle cx="41" cy="31" r="1.3" />

                  <circle cx="18" cy="34" r="1.3" />
                  <circle cx="24" cy="34" r="1.3" />
                  <circle cx="30" cy="34" r="1.3" />
                  <circle cx="33" cy="34" r="1.3" />
                  <circle cx="39" cy="34" r="1.3" />

                  <circle cx="21" cy="37" r="1.3" />
                  <circle cx="24" cy="37" r="1.3" />
                  <circle cx="27" cy="37" r="1.3" />
                  <circle cx="36" cy="37" r="1.3" />
                  <circle cx="41" cy="37" r="1.3" />

                  <circle cx="18" cy="40" r="1.3" />
                  <circle cx="24" cy="40" r="1.3" />
                  <circle cx="30" cy="40" r="1.3" />
                  <circle cx="33" cy="40" r="1.3" />
                  <circle cx="39" cy="40" r="1.3" />
                  <circle cx="41" cy="40" r="1.3" />
                </g>
              </svg>

                {/* Stacked "Download the App" Copy */}
                <div className="font-mona font-medium text-[12px] sm:text-[15px] leading-[1.15] tracking-[-0.01em] text-white text-left">
                  <span className="block">Download</span>
                  <span className="block">the App</span>
                </div>
              </a>

              {/* Mobile Hamburger Button */}
              <button
                id="mobile-menu-btn"
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded="false"
                className="md:hidden w-11 h-11 rounded-full bg-[#f4f5f8] border border-gray-200/90 text-[#0d0d0d] flex items-center justify-center shadow-sm active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
            </div>
          </header>

          {/* Mobile Navigation Drawer */}
          <div
            id="mobile-nav-drawer"
            className="hidden md:hidden mt-3 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-[0_18px_40px_rgba(15,23,42,0.12)] p-3 relative z-30"
          >
            <nav className="flex flex-col gap-1">
              <a
                href="#features"
                className="px-4 py-3 rounded-xl text-[15px] font-medium text-[#0d0d0d] hover:bg-[#f4f5f8] transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="px-4 py-3 rounded-xl text-[15px] font-medium text-[#525866] hover:text-[#0d0d0d] hover:bg-[#f4f5f8] transition-colors"
              >
                How it works
              </a>
              <a
                href="#faq"
                className="px-4 py-3 rounded-xl text-[15px] font-medium text-[#525866] hover:text-[#0d0d0d] hover:bg-[#f4f5f8] transition-colors"
              >
                FAQ
              </a>
              <a
                href="#about"
                className="px-4 py-3 rounded-xl text-[15px] font-medium text-[#525866] hover:text-[#0d0d0d] hover:bg-[#f4f5f8] transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* HERO 2-COLUMN MAIN STAGE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center pt-7 sm:pt-10 lg:pt-12 flex-1">
            {/* LEFT COLUMN: Typography, Left-Border Copy, Store Pills, Stepped Card */}
            <div className="lg:col-span-6 pb-8 sm:pb-12 lg:pb-14 lg:pl-2 relative z-20">
              {/* Two-Tone Mona Sans Headline */}
              <h1 className="font-mona tracking-[-0.035em] leading-[1.08]">
                <span className="block text-[38px] sm:text-[56px] lg:text-[64px] font-light text-[#6e6e77] anim-open-line-1">
                  Play Games.
                </span>
                <span className="block text-[38px] sm:text-[56px] lg:text-[64px] font-semibold text-[#0d0d0d] mt-0.5 anim-open-line-2">
                  Win Real Cash.
                </span>
              </h1>

              {/* Subtitle with Vertical Left Line */}
              <div className="mt-6 border-l-[2px] border-[#3f3f46] pl-5 py-0.5 max-w-[440px] anim-open-sub">
                <p className="font-inter text-[#6b7280] text-[15px] sm:text-[16px] leading-[1.65] font-normal">
                  Step into Africa’s biggest mobile gaming arena where every card, shot, and throw could earn you real money.
                </p>
              </div>

              {/* Apple Store & Google Play Pill Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4 anim-open-ctas">
                {/* Apple Store Solid Black Pill */}
                <a
                  href="#download-ios"
                  className="bg-[#111111] hover:bg-[#222222] text-white rounded-full px-7 py-3.5 inline-flex items-center gap-3.5 shadow-[0_10px_25px_rgba(0,0,0,0.14)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.22)] hover:-translate-y-1 active:scale-95 transition-all duration-300"
                >
                  <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.67-.81 1.12-1.94 1-3.08-.96.04-2.13.64-2.82 1.45-.61.7-.11 1.86-.99 2.97 1.08.08 2.15-.53 2.81-1.34z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="block text-[10px] text-white/70 font-normal">
                      Download on the
                    </span>
                    <span className="block text-[13.5px] font-semibold text-white mt-0.5">
                      Apple Store
                    </span>
                  </div>
                </a>

                {/* Google Play Soft Light Pill */}
                <a
                  href="#download-android"
                  className="bg-[#f8f8f9] hover:bg-[#f0f0f3] border border-gray-200/80 text-[#111111] rounded-full px-7 py-3.5 inline-flex items-center gap-3.5 shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-95 transition-all duration-300"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M3.6 2.4C3.2 2.8 3 3.4 3 4.2V19.8C3 20.6 3.2 21.2 3.6 21.6L13.2 12L3.6 2.4Z" fill="#38BDF8" />
                    <path d="M16.5 8.7L5.2 2.2C4.5 1.8 3.9 2 3.6 2.4L13.2 12L16.5 8.7Z" fill="#4ADE80" />
                    <path d="M16.5 15.3L13.2 12L3.6 21.6C3.9 22 4.5 22.2 5.2 21.8L16.5 15.3Z" fill="#F43F5E" />
                    <path d="M20.4 10.8L16.5 8.7L13.2 12L16.5 15.3L20.4 13.2C21.5 12.6 21.5 11.4 20.4 10.8Z" fill="#FACC15" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="block text-[10px] text-gray-500 font-normal">
                      Get it from
                    </span>
                    <span className="block text-[13.5px] font-semibold text-[#111111] mt-0.5">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>

              {/* Bottom-Left Stepped Card ("Bet on Your Skill / How it works") + "100K+ Downloads" */}
              <div className="mt-11 sm:mt-12 flex flex-wrap items-end gap-8 sm:gap-10 anim-open-stepped">
                {/* Stepped Card Container */}
                <div className="relative pt-1 pl-3 group/step">
                  {/* Upper Soft-Gray Card */}
                  <div className="bg-[#f6f6f7] rounded-[26px] pt-4 pl-5 pr-12 pb-12 w-[270px] sm:w-[295px] transition-transform duration-300 group-hover/step:-translate-y-1">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-[14px] bg-[#111111] text-white flex items-center justify-center shadow-sm shrink-0">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 3L3 8l9 5 9-5-9-5z" />
                          <path d="M3 13l9 5 9-5" />
                          <path d="M3 17.5l9 5 9-5" />
                        </svg>
                      </div>
                      <div className="text-[13px] font-medium text-[#27272a] leading-snug">
                        <span className="block">Bet on Your</span>
                        <span className="block">Skill</span>
                      </div>
                    </div>
                  </div>

                  {/* Overlapping Lower-Left White Pill ("How it works ->") */}
                  <a
                    href="#how-it-works"
                    className="group bg-[#fcfcfd] hover:bg-white border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.08)] rounded-[18px] px-6 py-4 flex items-center justify-between w-[230px] -mt-8 -ml-3 relative z-10 transition-all duration-300"
                  >
                    <span className="font-mona font-medium text-[16px] text-[#0d0d0d]">
                      How it works
                    </span>
                    <svg
                      className="w-5 h-5 text-[#0d0d0d] transform group-hover:translate-x-1.5 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M4 12h16" strokeLinecap="round" />
                      <path d="M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

                {/* 100K+ Downloads Stat */}
                <div className="pb-2">
                  <svg className="w-7 h-7 text-[#111111] mb-2 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.67-.81 1.12-1.94 1-3.08-.96.04-2.13.64-2.82 1.45-.61.7-.11 1.86-.99 2.97 1.08.08 2.15-.53 2.81-1.34z" />
                  </svg>
                  <p className="font-mona font-semibold text-[13.5px] text-[#0d0d0d] leading-snug">
                    100K+
                    <br />
                    <span className="font-inter font-normal text-[#4b5563]">Downloads</span>
                  </p>
                </div>
              </div>
            </div>

            {/* MOBILE / TABLET HERO IMAGE (Visible below lg breakpoint, flush right & tucked under marquee) */}
            <div className="lg:hidden flex justify-end -mr-4 sm:-mr-8 -mb-6 sm:-mb-8 mt-2 relative z-10 anim-open-hero-art">
              <img
                src="/public/images/hero-section-image.png?v=3"
                alt="PeleBet App Mockup with Hand, Soccer Ball, and 8-Ball"
                className="w-[92%] sm:w-[80%] h-auto object-contain object-right-bottom block anim-float-gentle"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          INFINITE SCROLLING GAMES MARQUEE BAR (Under Hero Section, Masks Hand Edge)
      =================================================================== */}
      <div className="w-full bg-white text-[#0d0d0d] py-5 sm:py-6 overflow-hidden select-none border-y border-gray-200/80 relative z-20">
        <div className="pelebet-marquee-track flex items-center w-max">
          {/* Track Half 1 */}
          <div className="flex items-center shrink-0">
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">LUDO</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">WHOT</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">8-BALL POOL</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">PENALTY KICK</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>

            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">LUDO</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">WHOT</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">8-BALL POOL</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">PENALTY KICK</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>

            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">LUDO</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">WHOT</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">8-BALL POOL</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">PENALTY KICK</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
          </div>

          {/* Track Half 2 (Identical Duplicate for Seamless Loop) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">LUDO</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">WHOT</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">8-BALL POOL</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">PENALTY KICK</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>

            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">LUDO</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">WHOT</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">8-BALL POOL</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">PENALTY KICK</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>

            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">LUDO</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">WHOT</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">8-BALL POOL</span>
            <span className="text-[#2d7ff9] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
            <span className="font-mona font-bold text-[16px] sm:text-[20px] tracking-[0.16em] uppercase px-6 sm:px-9">PENALTY KICK</span>
            <span className="text-[#f6be56] font-mona font-extrabold text-[20px] sm:text-[24px] leading-none">*</span>
          </div>
        </div>
      </div>

      {/* ===================================================================
          GAME FEATURES SECTION (Full-Width Bento Collage with Small Side Margins)
      =================================================================== */}
      <section id="features" className="py-16 sm:py-24 px-3 sm:px-5 lg:px-7 bg-white">
        <div className="w-full max-w-[1600px] mx-auto">
          {/* Centered Minimal Section Header */}
          <div className="text-center max-w-[680px] mx-auto mb-12 sm:mb-16 reveal-item reveal-up">
            <span className="inline-block font-inter text-[11px] sm:text-[12px] font-medium tracking-[0.32em] uppercase text-[#525866] mb-3.5">
              WHY PELEBET
            </span>
            <h2 className="font-mona text-[34px] sm:text-[44px] lg:text-[50px] font-medium tracking-[-0.03em] leading-[1.12] text-[#0d0d0d]">
              Challenge real players
              <br />
              in PvP matches.
            </h2>
            <p className="font-inter text-[15px] sm:text-[16.5px] text-[#525866] leading-[1.6] mt-3.5 max-w-[540px] mx-auto">
              Put your skills on the line, outplay your opponent, and walk away with real cash.
            </p>
          </div>

          {/* Full-Bleed 2-Column Asymmetric Bento Collage with Tight Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
            {/* ===============================================================
                LEFT COLUMN (Sky-Blue Matchups Card + Purple Chat & Payout Card)
            =============================================================== */}
            <div className="flex flex-col gap-3.5 sm:gap-4 lg:gap-5">
              {/* CARD 1 (Top-Left): Sky-Blue Gradient — Instant PvP Matchups */}
              <div className="reveal-item reveal-left bento-card rounded-[28px] bg-gradient-to-b from-[#edf6ff] via-[#dcf0ff] to-[#bce0fd] p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[340px] sm:min-h-[410px] relative overflow-hidden">
                <div className="reveal-child-text">
                  <h3 className="font-mona font-semibold text-[22px] sm:text-[28px] lg:text-[30px] tracking-[-0.02em] text-[#0d0d0d]">
                    Instant 1v1 Matchups
                  </h3>
                  <p className="font-inter text-[14.5px] sm:text-[16px] text-[#525866] leading-[1.6] mt-2.5 max-w-[480px]">
                    Make it effortless to challenge real players across Africa. Joining a lobby takes just a click, giving you real cash stakes without the hassle.
                  </p>
                </div>

                {/* Two Staggered Floating White Lobby Pills (Swipeable / Interactive) */}
                <div className="mt-7 sm:mt-8 flex flex-col gap-3.5 sm:gap-4 max-w-[560px] w-full mx-auto swipe-card-group">
                  {/* Upper Pill (Shifted Right) */}
                  <div className="swipe-pill-item stagger-1 bg-white rounded-full py-2.5 sm:py-3 pl-3 sm:pl-3.5 pr-3 sm:pr-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_34px_rgba(45,127,249,0.16)] flex items-center justify-between gap-2.5 sm:gap-4 ml-2 sm:ml-14 cursor-grab active:cursor-grabbing transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1.5">
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                      <img
                        src="/public/images/whot_icon.png"
                        alt="Whot"
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-[10px] sm:rounded-[12px] object-contain shrink-0 ring-1 ring-black/5"
                      />
                      <div className="truncate">
                        <p className="font-mona font-semibold text-[13px] sm:text-[14px] text-[#0d0d0d] leading-tight truncate">
                          Chidi Franklin
                        </p>
                        <p className="font-inter text-[11px] sm:text-[12px] text-[#71717a] leading-tight truncate mt-0.5">
                          @chidi_whot • ₦10,000 Stake
                        </p>
                      </div>
                    </div>
                    <span className="bg-[#2d7ff9] hover:bg-[#1d6fe8] text-white font-inter font-medium text-[11.5px] sm:text-[12px] px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full shrink-0 shadow-sm cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                      Play Now
                    </span>
                  </div>

                  {/* Lower Pill (Shifted Left) */}
                  <div className="swipe-pill-item stagger-2 bg-white rounded-full py-2.5 sm:py-3 pl-3 sm:pl-3.5 pr-3 sm:pr-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_34px_rgba(45,127,249,0.16)] flex items-center justify-between gap-2.5 sm:gap-4 mr-2 sm:mr-14 cursor-grab active:cursor-grabbing transition-all duration-300 hover:-translate-y-1 hover:translate-x-1.5">
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                      <img
                        src="/public/images/8ball_icon.png"
                        alt="8-Ball Pool"
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-[10px] sm:rounded-[12px] object-contain shrink-0 ring-1 ring-black/5"
                      />
                      <div className="truncate">
                        <p className="font-mona font-semibold text-[13px] sm:text-[14px] text-[#0d0d0d] leading-tight truncate">
                          Tunde Adeyemi
                        </p>
                        <p className="font-inter text-[11px] sm:text-[12px] text-[#71717a] leading-tight truncate mt-0.5">
                          @tunde_8ball • ₦25,000 Stake
                        </p>
                      </div>
                    </div>
                    <span className="bg-[#2d7ff9] hover:bg-[#1d6fe8] text-white font-inter font-medium text-[11.5px] sm:text-[12px] px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full shrink-0 shadow-sm cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                      Play Now
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD 2 (Bottom-Left): Lavender/Purple Gradient — Play with Friends & Instant Cashouts */}
              <div className="reveal-item reveal-left bento-card rounded-[28px] bg-gradient-to-b from-[#f3ebff] via-[#e4d2ff] to-[#c7adff] p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[490px] sm:min-h-[540px] relative overflow-hidden flex-1">
                {/* Concentric Purple Wave Circles in Background (Gentle Pulse Animation) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-28 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-[#b996ff]/35 anim-ring-pulse"
                ></div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 w-[390px] h-[390px] rounded-full bg-[#aa80ff]/35 anim-ring-pulse-delayed"
                ></div>

                <div className="relative z-10 reveal-child-text">
                  <h3 className="font-mona font-semibold text-[24px] sm:text-[28px] lg:text-[30px] tracking-[-0.02em] text-[#0d0d0d]">
                    Play with Friends & Instant Cashouts
                  </h3>
                  <p className="font-inter text-[15px] sm:text-[16px] text-[#525866] leading-[1.6] mt-2.5 max-w-[490px]">
                    Add friends, chat through real-time match rooms, and send a game challenge anytime. Outplay your opponent and get rewarded with instant payouts.
                  </p>
                </div>

                {/* Chat Bubbles & Golden Payout Notification Pill (Sequential Pop-In) */}
                <div className="relative z-10 mt-10 flex flex-col gap-5 max-w-[520px] w-full mx-auto">
                  {/* Bubble 1: Left Aligned */}
                  <div className="chat-bubble-anim stagger-1 flex items-start gap-3 transition-transform duration-300 hover:translate-x-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Player Avatar"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white/80 shrink-0 mt-1 shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = '/public/images/man-holding-iphone.png';
                      }}
                    />
                    <div className="bg-white rounded-[20px] rounded-tl-[6px] px-5 py-3.5 shadow-[0_8px_22px_rgba(88,28,135,0.08)] max-w-[270px]">
                      <p className="font-inter text-[13.5px] text-[#18181b] leading-snug">
                        Good game! Ready for our Whot rematch?
                      </p>
                    </div>
                  </div>

                  {/* Bubble 2: Right Aligned */}
                  <div className="chat-bubble-anim stagger-2 flex items-start justify-end gap-3 transition-transform duration-300 hover:-translate-x-1.5">
                    <div className="bg-white rounded-[20px] rounded-tr-[6px] px-5 py-3.5 shadow-[0_8px_22px_rgba(88,28,135,0.08)] max-w-[280px]">
                      <p className="font-inter text-[13.5px] text-[#18181b] leading-snug">
                        Always ready! Staking ₦25,000 on this round
                      </p>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                      alt="Opponent Avatar"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white/80 shrink-0 mt-1 shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = '/public/images/man-holding-iphone.png';
                      }}
                    />
                  </div>

                  {/* Bubble 3: Golden Payout Pill */}
                  <div className="chat-bubble-anim stagger-3 flex items-center gap-3 pt-1 transition-transform duration-300 hover:scale-[1.03] origin-left">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                      alt="Winner Avatar"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white/80 shrink-0 shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = '/public/images/man-holding-iphone.png';
                      }}
                    />
                    <div className="bg-[#f6be56] rounded-[18px] px-5 py-3 shadow-[0_8px_22px_rgba(180,83,9,0.14)] inline-flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full border border-[#18181b]/80 flex items-center justify-center text-[11.5px] font-bold text-[#18181b] shrink-0">
                        ₦
                      </span>
                      <span className="font-inter font-medium text-[13.5px] text-[#18181b]">
                        You received a ₦50,000 payout
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===============================================================
                RIGHT COLUMN (Full-Bleed Community Card + Peach Games Fan Card)
            =============================================================== */}
            <div className="flex flex-col gap-3.5 sm:gap-4 lg:gap-5">
              {/* CARD 3 (Top-Right): Full-Bleed Lifestyle Photo + Dark Bottom Overlay */}
              <div className="reveal-item reveal-right bento-card rounded-[28px] min-h-[490px] sm:min-h-[540px] relative overflow-hidden flex flex-col justify-end p-8 sm:p-10 lg:p-12 bg-[#0f172a] group flex-1">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85"
                  alt="PeleBet Gaming Community"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/public/images/man-holding-iphone.png';
                  }}
                />
                {/* Smooth Dark Gradient Overlay at Bottom */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                ></div>

                <div className="relative z-10 reveal-child-text transition-transform duration-500 group-hover:-translate-y-1">
                  <h3 className="font-mona font-semibold text-[24px] sm:text-[28px] lg:text-[30px] tracking-[-0.02em] text-white">
                    Thriving Gaming Community
                  </h3>
                  <p className="font-inter text-[15px] sm:text-[16px] text-white/85 leading-[1.6] mt-2.5 max-w-[490px]">
                    You’re not playing alone. Connect with over 100,000 verified gamers across Africa who compete fairly and celebrate every win together.
                  </p>
                </div>
              </div>

              {/* CARD 4 (Bottom-Right): Peach/Apricot Gradient — All 4 Iconic Games Fanned & Swipeable Showcase */}
              <div className="reveal-item reveal-right bento-card rounded-[28px] bg-gradient-to-b from-[#fff3e4] via-[#ffe4c4] to-[#ffcb96] pt-8 sm:pt-10 lg:pt-12 px-6 sm:px-8 lg:px-10 pb-8 sm:pb-10 flex flex-col justify-between min-h-[410px] sm:min-h-[440px] relative overflow-hidden">
                <div className="relative z-20 px-2 reveal-child-text flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-mona font-semibold text-[24px] sm:text-[28px] lg:text-[30px] tracking-[-0.02em] text-[#0d0d0d]">
                      4 Iconic Games to Master
                    </h3>
                    <p className="font-inter text-[15px] sm:text-[16px] text-[#525866] leading-[1.6] mt-2.5 max-w-[490px]">
                      Turn your gaming skills into instant cash. From Whot and 8-Ball Pool to Penalty Kick and Ludo, pick your best game and start winning today.
                    </p>
                  </div>
                </div>

                {/* All 4 Iconic Games Fanned Cards — Interactive Swipe / Drag & Hover Fan */}
                <div id="games-swipe-deck" className="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 items-stretch select-none cursor-grab active:cursor-grabbing">
                  {/* Game 1: Whot! */}
                  <div className="game-fan-card stagger-1 bg-white rounded-[18px] p-2.5 shadow-[0_14px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)] sm:transform sm:-rotate-[4deg] sm:translate-y-1 hover:rotate-0 hover:-translate-y-2.5 hover:scale-[1.04] hover:z-30 transition-all duration-300 flex flex-col">
                    <img
                      src="/public/images/whot_icon.png"
                      alt="Whot"
                      draggable="false"
                      className="w-full aspect-square object-contain rounded-[13px]"
                    />
                    <div className="pt-2.5 pb-1 px-1">
                      <p className="font-mona font-semibold text-[13px] text-[#0d0d0d] truncate">
                        Whot! Card
                      </p>
                      <p className="font-inter text-[11px] text-[#71717a] leading-snug mt-0.5">
                        Outsmart opponents & empty your deck
                      </p>
                    </div>
                  </div>

                  {/* Game 2: 8-Ball Pool */}
                  <div className="game-fan-card stagger-2 bg-white rounded-[18px] p-2.5 shadow-[0_18px_36px_rgba(0,0,0,0.12)] hover:shadow-[0_22px_44px_rgba(0,0,0,0.18)] relative z-10 sm:transform sm:-rotate-[1.5deg] sm:-translate-y-1 hover:rotate-0 hover:-translate-y-3 hover:scale-[1.04] hover:z-30 transition-all duration-300 flex flex-col">
                    <img
                      src="/public/images/8ball_icon.png"
                      alt="8-Ball Pool"
                      draggable="false"
                      className="w-full aspect-square object-contain rounded-[13px]"
                    />
                    <div className="pt-2.5 pb-1 px-1">
                      <p className="font-mona font-semibold text-[13px] text-[#0d0d0d] truncate">
                        8-Ball Pool
                      </p>
                      <p className="font-inter text-[11px] text-[#71717a] leading-snug mt-0.5">
                        Call your pocket & sink the 8-ball
                      </p>
                    </div>
                  </div>

                  {/* Game 3: Ludo Classic */}
                  <div className="game-fan-card stagger-3 bg-white rounded-[18px] p-2.5 shadow-[0_18px_36px_rgba(0,0,0,0.12)] hover:shadow-[0_22px_44px_rgba(0,0,0,0.18)] relative z-10 sm:transform sm:rotate-[1.5deg] sm:-translate-y-1 hover:rotate-0 hover:-translate-y-3 hover:scale-[1.04] hover:z-30 transition-all duration-300 flex flex-col">
                    <img
                      src="/public/images/Ludo_icon.png"
                      alt="Ludo"
                      draggable="false"
                      className="w-full aspect-square object-contain rounded-[13px]"
                    />
                    <div className="pt-2.5 pb-1 px-1">
                      <p className="font-mona font-semibold text-[13px] text-[#0d0d0d] truncate">
                        Ludo Classic
                      </p>
                      <p className="font-inter text-[11px] text-[#71717a] leading-snug mt-0.5">
                        Roll the dice & race tokens home
                      </p>
                    </div>
                  </div>

                  {/* Game 4: Penalty Shootout */}
                  <div className="game-fan-card stagger-4 bg-white rounded-[18px] p-2.5 shadow-[0_14px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)] sm:transform sm:rotate-[4deg] sm:translate-y-1 hover:rotate-0 hover:-translate-y-2.5 hover:scale-[1.04] hover:z-30 transition-all duration-300 flex flex-col">
                    <img
                      src="/public/images/penalty_icon.png"
                      alt="Penalty Kick"
                      draggable="false"
                      className="w-full aspect-square object-contain rounded-[13px]"
                    />
                    <div className="pt-2.5 pb-1 px-1">
                      <p className="font-mona font-semibold text-[13px] text-[#0d0d0d] truncate">
                        Penalty Kick
                      </p>
                      <p className="font-inter text-[11px] text-[#71717a] leading-snug mt-0.5">
                        Score under pressure & win cash
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          HOW IT WORKS SECTION (#how-it-works) — Sticky Scroll-Driven Phone Stage
      =================================================================== */}
      <section
        id="how-it-works"
        className="relative bg-[#0d0d0d] text-white h-[320vh] lg:h-[360vh] select-none"
      >
        {/* Sticky Full-Viewport Container */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center py-4 lg:py-0">
          {/* Confetti Canvas Overlay (Fires when reaching Step 04: Cash Out) */}
          <canvas
            id="cashout-confetti-canvas"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full z-30"
          ></canvas>

          {/* Subtle Brand-Complementary Radial Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[12%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#2d7ff9]/12 blur-[150px]"
          ></div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[8%] bottom-[15%] w-[380px] h-[380px] rounded-full bg-[#f6be56]/8 blur-[140px]"
          ></div>

          {/* Main 2-Column PeleBet Stage */}
          <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 sm:gap-6 lg:gap-12">
            {/* ===============================================================
                LEFT COLUMN: PeleBet Header + 4-Step Interactive Scroll Timeline
            =============================================================== */}
            <div className="lg:col-span-6 flex flex-col">
              <h2 className="font-mona font-semibold text-[24px] sm:text-[36px] lg:text-[48px] leading-[1.08] tracking-[-0.03em] text-white mb-3.5 sm:mb-6 lg:mb-8">
                Four steps from kick-off
                <br className="hidden sm:block" /> to instant cashout.
              </h2>

              {/* Vertical Progress Rail (Desktop) + 4 Interactive Step Cards (2x2 on Mobile) */}
              <div className="relative lg:pl-6">
                {/* Background Rail */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-white/10 overflow-hidden"
                >
                  <div
                    id="how-progress-bar"
                    className="w-full bg-gradient-to-b from-emerald-400 via-[#5cb3e2] to-[#f6be56] rounded-full transition-all duration-500 ease-out"
                    style={{ height: '25%' }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:flex lg:flex-col lg:items-start lg:gap-3.5">
                  {/* Step 01: Fund Your Wallet */}
                  <button
                    type="button"
                    data-step="0"
                    className="how-step-card is-active text-left rounded-full py-1.5 pl-1.5 pr-3 lg:py-2.5 lg:pl-2.5 lg:pr-7 flex items-center gap-2 lg:gap-3.5 cursor-pointer min-w-0"
                  >
                    <span className="step-num-badge w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 text-white/85 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 11h5v4h-5a2 2 0 010-4z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-mona font-semibold text-[12px] sm:text-[14px] lg:text-[18px] text-white truncate">
                      Fund Your Wallet
                    </span>
                  </button>

                  {/* Step 02: Pick Your Game */}
                  <button
                    type="button"
                    data-step="1"
                    className="how-step-card text-left rounded-full py-1.5 pl-1.5 pr-3 lg:py-2.5 lg:pl-2.5 lg:pr-7 flex items-center gap-2 lg:gap-3.5 cursor-pointer min-w-0"
                  >
                    <span className="step-num-badge w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 text-white/85 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      </svg>
                    </span>
                    <span className="font-mona font-semibold text-[12px] sm:text-[14px] lg:text-[18px] text-white truncate">
                      Pick Your Game
                    </span>
                  </button>

                  {/* Step 03: Create or Join a Lobby */}
                  <button
                    type="button"
                    data-step="2"
                    className="how-step-card text-left rounded-full py-1.5 pl-1.5 pr-3 lg:py-2.5 lg:pl-2.5 lg:pr-7 flex items-center gap-2 lg:gap-3.5 cursor-pointer min-w-0"
                  >
                    <span className="step-num-badge w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 text-white/85 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-mona font-semibold text-[12px] sm:text-[14px] lg:text-[18px] text-white truncate">
                      Create or Join Lobby
                    </span>
                  </button>

                  {/* Step 04: Win & Cash Out */}
                  <button
                    type="button"
                    data-step="3"
                    className="how-step-card text-left rounded-full py-1.5 pl-1.5 pr-3 lg:py-2.5 lg:pl-2.5 lg:pr-7 flex items-center gap-2 lg:gap-3.5 cursor-pointer min-w-0"
                  >
                    <span className="step-num-badge w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 text-white/85 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M7 20V4l10 16V4M4 10h16M4 14h16" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-mona font-semibold text-[12px] sm:text-[14px] lg:text-[18px] text-white truncate">
                      Win &amp; Cash Out
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* ===============================================================
                RIGHT COLUMN: iPhone Frame with 4 Real PeleBet App Screens (From Figma)
            =============================================================== */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-[290px] sm:w-[320px] h-[590px] sm:h-[650px] rounded-[46px] bg-[#1b1b22] p-[9px] shadow-[0_32px_90px_rgba(0,0,0,0.65)] ring-1 ring-white/20 relative transform scale-[0.72] sm:scale-[0.86] lg:scale-100 origin-top lg:origin-center -mb-[165px] sm:-mb-[80px] lg:mb-0">
                <div className="w-full h-full rounded-[38px] bg-[#f3f3f7] text-[#0e1660] relative overflow-hidden font-mona">
                  {/* Dynamic Island + Status Bar (shared) */}
                  <div className="absolute top-0 inset-x-0 z-40 h-10 flex items-center justify-between px-6 text-[11px] font-semibold text-[#0d0d0d] pointer-events-none">
                    <span>9:41</span>
                    <span className="absolute left-1/2 -translate-x-1/2 top-2 w-[84px] h-[24px] rounded-full bg-black"></span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
                      <svg className="w-3.5 h-3" viewBox="0 0 24 18" fill="currentColor"><path d="M12 18l3.5-4.2a5.5 5.5 0 00-7 0L12 18zM4 9.5a12 12 0 0116 0l2.2-2.6a15.5 15.5 0 00-20.4 0L4 9.5z" /></svg>
                      <span className="w-5 h-2.5 rounded-[3px] border border-black/70 p-[1.5px] flex"><span className="w-3/4 h-full bg-black rounded-[1px]"></span></span>
                    </span>
                  </div>

                  {/* ===========================================================
                      SCREEN 0: WALLET — Funding Options & Withdrawal (Figma)
                  =========================================================== */}
                  <div className="how-phone-screen is-active absolute inset-0 pt-12 px-3.5 pb-3 flex flex-col" data-screen="0">
                    <p className="text-center font-semibold text-[13px] text-[#0d0d0d] mb-3">Wallet</p>

                    {/* Balance Card */}
                    <div className="rounded-[18px] bg-[#0e1660] text-white px-4 py-3.5">
                      <p className="text-[10px] text-white/85">Wallet Balance</p>
                      <p className="font-bold text-[24px] tracking-[-0.01em] mt-1">₦50,000</p>
                    </div>

                    {/* Funding Options */}
                    <p className="text-[11px] font-medium text-[#0d0d0d] mt-3.5 mb-1.5">Funding Options</p>
                    <div className="rounded-[18px] bg-[#0e1660] p-2.5 grid grid-cols-2 gap-2">
                      <span className="rounded-full bg-[#2b3378] text-white text-[9px] py-2 flex items-center justify-center gap-1.5">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v2h20V7L12 2zM4 11v7h3v-7H4zm6.5 0v7h3v-7h-3zM17 11v7h3v-7h-3zM2 20v2h20v-2H2z" /></svg>
                        Bank Transfer
                      </span>
                      <span className="rounded-full bg-[#2b3378] text-white text-[9px] py-2 flex items-center justify-center gap-1.5">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v2H2V6zm0 4h20v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8zm3 5v2h5v-2H5z" /></svg>
                        Debit/Credit Card
                      </span>
                      <span className="rounded-full bg-[#2b3378] text-white text-[9px] py-2 flex items-center justify-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] text-white text-[8px] font-bold flex items-center justify-center">₦</span>
                        OPay Wallet
                      </span>
                      <span className="rounded-full bg-[#2b3378] text-white text-[9px] py-2 flex items-center justify-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6] text-white text-[8px] font-bold flex items-center justify-center">₦</span>
                        PalmPay
                      </span>
                      <span className="col-span-2 rounded-full bg-[#2b3378] text-white text-[9px] py-2 flex items-center justify-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#f6be56] text-[#0e1660] text-[8px] font-bold flex items-center justify-center">₦</span>
                        USSD / Instant Naira Transfer
                      </span>
                    </div>

                    {/* Withdrawal */}
                    <p className="text-[11px] font-medium text-[#0d0d0d] mt-3.5 mb-1.5">Withdrawal</p>
                    <div className="rounded-[18px] bg-[#0e1660] p-2.5">
                      <div className="rounded-full bg-[#2b3378] text-white/55 text-[9.5px] px-3.5 py-2.5">Enter Amount (₦)</div>
                      <p className="text-[8.5px] text-white/60 mt-2.5 mb-1.5 px-1">Withdraw to:</p>
                      <div className="flex items-center justify-between px-1 text-[8.5px] text-white/85">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-white bg-white/90 ring-2 ring-inset ring-[#0e1660]"></span>Bank Account</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-white/60"></span>OPay Wallet</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-white/60"></span>Kuda Bank</span>
                      </div>
                      <div className="mt-3 rounded-full bg-[#5cb3e2] text-white text-[10.5px] font-medium text-center py-2.5">Withdraw</div>
                    </div>

                    {/* Bottom Nav (Wallet active) */}
                    <div className="mt-auto rounded-full bg-[#0e1660] px-3 py-2 flex items-center justify-between text-white">
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z" /></svg>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10a5 5 0 015 5v3a3 3 0 01-5.2 2L15 15H9l-1.8 2A3 3 0 012 15v-3a5 5 0 015-5zm1 3v2H6v1.5h2v2h1.5v-2h2V12h-2v-2H8zm8 1a1 1 0 100 2 1 1 0 000-2zm2 2a1 1 0 100 2 1 1 0 000-2z" /></svg>
                      <span className="rounded-full bg-[#5cb3e2] px-4 py-1.5 text-[10px] font-medium flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a2 2 0 012-2h13v3H5v.5h15a1 1 0 011 1V19a1 1 0 01-1 1H5a2 2 0 01-2-2V6zm14 7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>
                        Wallet
                      </span>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5z" /></svg>
                    </div>
                  </div>

                  {/* ===========================================================
                      SCREEN 1: HOME — Quick Actions & Betting Lobbies (Figma)
                  =========================================================== */}
                  <div className="how-phone-screen absolute inset-0 pt-12 px-3.5 pb-3 flex flex-col" data-screen="1">
                    {/* Profile Row */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <img src="/public/images/app-avatar.png" alt="John" className="w-9 h-9 rounded-full object-cover" />
                      <div className="leading-tight">
                        <p className="text-[12px] font-medium text-[#0d0d0d]">John</p>
                        <p className="text-[9.5px] text-[#3f3f46]">Anonymous121</p>
                      </div>
                    </div>

                    {/* Balance Card with Actions */}
                    <div className="rounded-[18px] bg-[#0e1660] text-white px-4 pt-3 pb-3.5">
                      <p className="text-[10px] text-white/85">Wallet Balance</p>
                      <p className="font-bold text-[22px] tracking-[-0.01em] mt-0.5">₦50,000</p>
                      <div className="grid grid-cols-2 gap-2 mt-2.5">
                        <span className="rounded-full bg-white text-[#0e1660] text-[10px] text-center py-1.5">Withdraw</span>
                        <span className="rounded-full bg-[#5cb3e2] text-white text-[10px] text-center py-1.5">Deposit</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <p className="text-[11px] font-medium text-[#0d0d0d] mt-3 mb-1.5">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="rounded-[16px] bg-[#0e1660] p-1.5">
                        <div className="relative rounded-[12px] overflow-hidden h-[78px] bg-gradient-to-b from-[#e7e5ee] to-[#2c3480]">
                          <img src="/public/images/whot_icon.png" alt="Whot" className="w-full h-full object-cover" />
                          <span className="absolute inset-x-0 bottom-1.5 text-center text-white font-extrabold text-[13px] drop-shadow">Whot</span>
                        </div>
                        <div className="mt-1.5 rounded-full bg-[#5cb3e2] text-white text-[9.5px] text-center py-1.5">Play Now</div>
                      </div>
                      <div className="rounded-[16px] bg-[#0e1660] p-1.5">
                        <div className="relative rounded-[12px] overflow-hidden h-[78px]">
                          <img src="/public/images/8ball_icon.png" alt="8-Ball Pool" className="w-full h-full object-cover" />
                          <span className="absolute inset-x-0 bottom-1.5 text-center text-white font-extrabold text-[13px] drop-shadow">8-Ball Pool</span>
                        </div>
                        <div className="mt-1.5 rounded-full bg-[#5cb3e2] text-white text-[9.5px] text-center py-1.5">Play Now</div>
                      </div>
                    </div>

                    {/* Betting Lobbies Table */}
                    <p className="text-[11px] font-medium text-[#0d0d0d] mt-3 mb-1.5">Betting Lobbies</p>
                    <div className="rounded-[16px] bg-[#0e1660] text-white px-2.5 py-2">
                      <div className="grid grid-cols-[1.1fr_1fr_1fr_auto] gap-1 text-[7.5px] text-white/55 pb-1.5 border-b border-white/10">
                        <span>Game</span><span>Amount Staked</span><span>Play</span><span className="pr-1">Action</span>
                      </div>
                      <div className="grid grid-cols-[1.1fr_1fr_1fr_auto] gap-1 items-center text-[8.5px] py-1.5">
                        <span className="flex items-center gap-1.5"><img src="/public/images/whot_icon.png" alt="Whot" className="w-4 h-4 rounded object-cover" />Whot</span>
                        <span>₦50,000</span>
                        <span className="text-white/75">2/4 players</span>
                        <span className="bg-white text-[#0e1660] rounded-full px-2.5 py-0.5 text-[8px] font-medium">Join</span>
                      </div>
                      <div className="grid grid-cols-[1.1fr_1fr_1fr_auto] gap-1 items-center text-[8.5px] py-1.5">
                        <span className="flex items-center gap-1.5"><img src="/public/images/8ball_icon.png" alt="8-Ball" className="w-4 h-4 rounded object-cover" />8-Ball</span>
                        <span>₦20,000</span>
                        <span className="text-white/75">1/2 players</span>
                        <span className="bg-white text-[#0e1660] rounded-full px-2.5 py-0.5 text-[8px] font-medium">Join</span>
                      </div>
                      <div className="grid grid-cols-[1.1fr_1fr_1fr_auto] gap-1 items-center text-[8.5px] py-1.5">
                        <span className="flex items-center gap-1.5"><img src="/public/images/penalty_icon.png" alt="Penalty" className="w-4 h-4 rounded object-cover" />Penalty</span>
                        <span>₦10,000</span>
                        <span className="text-white/75">1/2 players</span>
                        <span className="bg-white text-[#0e1660] rounded-full px-2.5 py-0.5 text-[8px] font-medium">Join</span>
                      </div>
                    </div>

                    {/* Bottom Nav (Home active) */}
                    <div className="mt-auto rounded-full bg-[#0e1660] px-3 py-2 flex items-center justify-between text-white">
                      <span className="rounded-full bg-[#5cb3e2] px-4 py-1.5 text-[10px] font-medium flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z" /></svg>
                        Home
                      </span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10a5 5 0 015 5v3a3 3 0 01-5.2 2L15 15H9l-1.8 2A3 3 0 012 15v-3a5 5 0 015-5zm1 3v2H6v1.5h2v2h1.5v-2h2V12h-2v-2H8zm8 1a1 1 0 100 2 1 1 0 000-2zm2 2a1 1 0 100 2 1 1 0 000-2z" /></svg>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a2 2 0 012-2h13v3H5v.5h15a1 1 0 011 1V19a1 1 0 01-1 1H5a2 2 0 01-2-2V6zm14 7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5z" /></svg>
                    </div>
                  </div>

                  {/* ===========================================================
                      SCREEN 2: CREATE GAME LOBBY — Room Code & Betting Setup (Figma)
                  =========================================================== */}
                  <div className="how-phone-screen absolute inset-0 pt-12 px-3.5 pb-3 flex flex-col" data-screen="2">
                    <div className="relative text-center mb-3">
                      <span className="absolute left-0 top-0 text-[14px] text-[#0d0d0d]">←</span>
                      <p className="font-semibold text-[13px] text-[#0d0d0d]">Create Game Lobby</p>
                    </div>

                    <p className="text-[11px] font-medium text-[#0d0d0d] mb-1.5">Create Private Room</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-[12px] bg-[#0e1660] p-1 ring-2 ring-[#5cb3e2]">
                        <div className="relative rounded-[9px] overflow-hidden h-[52px]">
                          <img src="/public/images/whot_icon.png" alt="Whot" className="w-full h-full object-cover" />
                          <span className="absolute inset-x-0 bottom-0.5 text-center text-white font-bold text-[8.5px] drop-shadow">Whot</span>
                        </div>
                      </div>
                      <div className="rounded-[12px] bg-[#0e1660] p-1">
                        <div className="relative rounded-[9px] overflow-hidden h-[52px]">
                          <img src="/public/images/8ball_icon.png" alt="8-Ball Pool" className="w-full h-full object-cover" />
                          <span className="absolute inset-x-0 bottom-0.5 text-center text-white font-bold text-[8.5px] drop-shadow">8-Ball Pool</span>
                        </div>
                      </div>
                      <div className="rounded-[12px] bg-[#0e1660] p-1">
                        <div className="relative rounded-[9px] overflow-hidden h-[52px]">
                          <img src="/public/images/penalty_icon.png" alt="Penalty" className="w-full h-full object-cover" />
                          <span className="absolute inset-x-0 bottom-0.5 text-center text-white font-bold text-[8.5px] drop-shadow">Penalty</span>
                        </div>
                      </div>
                    </div>

                    {/* 6-digit Room Code */}
                    <div className="rounded-[16px] bg-[#0e1660] p-2.5 mt-2.5">
                      <p className="text-[9px] text-white/85 mb-1.5">Enter 6-digit room code</p>
                      <div className="grid grid-cols-6 gap-1.5">
                        <span className="h-7 rounded-[6px] bg-[#2b3378] text-white text-[11px] font-semibold flex items-center justify-center">X</span>
                        <span className="h-7 rounded-[6px] bg-[#2b3378] text-white text-[11px] font-semibold flex items-center justify-center">Y</span>
                        <span className="h-7 rounded-[6px] bg-[#2b3378] text-white text-[11px] font-semibold flex items-center justify-center">8</span>
                        <span className="h-7 rounded-[6px] bg-[#2b3378] text-white text-[11px] font-semibold flex items-center justify-center"></span>
                        <span className="h-7 rounded-[6px] bg-[#2b3378] text-white text-[11px] font-semibold flex items-center justify-center"></span>
                        <span className="h-7 rounded-[6px] bg-[#2b3378] text-white text-[11px] font-semibold flex items-center justify-center"></span>
                      </div>
                      <div className="mt-2 rounded-full bg-white text-[#0e1660] text-[10px] font-medium text-center py-2">Join Room</div>
                    </div>

                    {/* Betting Setup */}
                    <p className="text-[11px] font-medium text-[#0d0d0d] mt-3 mb-1.5">Betting Setup</p>
                    <div className="rounded-[16px] bg-[#0e1660] text-white p-2.5">
                      <p className="text-[8.5px] text-white/75">Stake Amount (Min: ₦5,000)</p>
                      <div className="rounded-full bg-[#2b3378] text-white text-[9.5px] px-3 py-2 mt-1">₦50,000</div>
                      <p className="text-[8.5px] text-white/75 mt-2">Match Type</p>
                      <div className="flex items-center gap-3 text-[8.5px] mt-1">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#5cb3e2]"></span>1 vs 1</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-white/60"></span>2 vs 2</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-white/60"></span>4 Players</span>
                      </div>
                      <p className="text-[8.5px] text-white/75 mt-2">Lobby Type</p>
                      <div className="flex items-center gap-3 text-[8.5px] mt-1">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-white/60"></span>Public</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#5cb3e2]"></span>Private (Invite Code)</span>
                      </div>
                      <p className="text-[8.5px] text-white/75 mt-2">Time Limit per Turn</p>
                      <div className="flex items-center gap-3 text-[8.5px] mt-1">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-white/60"></span>15 sec</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#5cb3e2]"></span>30 sec</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-white/60"></span>60 sec</span>
                      </div>
                    </div>

                    {/* Additional Settings */}
                    <div className="mt-auto rounded-full bg-[#0e1660] text-white px-3.5 py-2.5 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[9.5px]">
                        <span className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center text-[8px]">💬</span>
                        Enable in-game chat
                      </span>
                      <span className="w-8 h-4 rounded-full bg-[#5cb3e2] p-0.5 flex justify-end"><span className="w-3 h-3 rounded-full bg-white"></span></span>
                    </div>
                  </div>

                  {/* ===========================================================
                      SCREEN 3: TRANSACTION HISTORY — Wins & Withdrawals (Figma)
                  =========================================================== */}
                  <div className="how-phone-screen absolute inset-0 pt-12 px-3.5 pb-3 flex flex-col" data-screen="3">
                    <div className="relative text-center mb-3">
                      <span className="absolute left-0 top-0 text-[14px] text-[#0d0d0d]">←</span>
                      <p className="font-semibold text-[13px] text-[#0d0d0d]">Transaction History</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="rounded-full bg-[#0e1660] p-1 flex items-center justify-between text-[8.5px] text-white/80 mb-2.5">
                      <span className="bg-white text-[#0e1660] rounded-full px-3 py-1 font-medium">All</span>
                      <span className="px-1">Deposit</span>
                      <span className="px-1">Withdrawal</span>
                      <span className="px-1">Earnings</span>
                      <span className="px-1 pr-2">Losses</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="rounded-[14px] bg-[#0e1660] text-white px-2.5 py-2 flex items-start gap-2">
                        <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px] font-bold shrink-0">₦</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-[9.5px] font-semibold truncate">WHOT WIN</p>
                            <p className="text-[9.5px] font-semibold">+₦50,000</p>
                          </div>
                          <p className="text-[8px] text-white/60 truncate">vs Chidi_Lagos • Whot 1v1</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[7.5px] font-medium px-2 py-0.5 rounded-[4px] bg-emerald-500 text-white">● Completed</span>
                            <span className="text-[7.5px] text-white/55">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[14px] bg-[#0e1660] text-white px-2.5 py-2 flex items-start gap-2">
                        <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-[11px] font-bold shrink-0">↗</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-[9.5px] font-semibold truncate">BANK WITHDRAWAL</p>
                            <p className="text-[9.5px] font-semibold">-₦40,000</p>
                          </div>
                          <p className="text-[8px] text-white/60 truncate">GTBank • ****4021</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[7.5px] font-medium px-2 py-0.5 rounded-[4px] bg-emerald-500 text-white">● Completed</span>
                            <span className="text-[7.5px] text-white/55">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[14px] bg-[#0e1660] text-white px-2.5 py-2 flex items-start gap-2">
                        <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px] font-bold shrink-0">₦</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-[9.5px] font-semibold truncate">8-BALL WIN</p>
                            <p className="text-[9.5px] font-semibold">+₦20,000</p>
                          </div>
                          <p className="text-[8px] text-white/60 truncate">vs Tunde_8ball • 1v1</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[7.5px] font-medium px-2 py-0.5 rounded-[4px] bg-emerald-500 text-white">● Completed</span>
                            <span className="text-[7.5px] text-white/55">1 day ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[14px] bg-[#0e1660] text-white px-2.5 py-2 flex items-start gap-2">
                        <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-[11px] font-bold shrink-0">↙</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-[9.5px] font-semibold truncate">OPAY DEPOSIT</p>
                            <p className="text-[9.5px] font-semibold">+₦10,000</p>
                          </div>
                          <p className="text-[8px] text-white/60 truncate">Instant Naira Wallet</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[7.5px] font-medium px-2 py-0.5 rounded-[4px] bg-amber-500 text-white">● Pending</span>
                            <span className="text-[7.5px] text-white/55">2 days ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[14px] bg-[#0e1660] text-white px-2.5 py-2 flex items-start gap-2">
                        <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-[11px] font-bold shrink-0">↙</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-[9.5px] font-semibold truncate">BANK DEPOSIT</p>
                            <p className="text-[9.5px] font-semibold">+₦25,000</p>
                          </div>
                          <p className="text-[8px] text-white/60 truncate">Access Bank transfer</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[7.5px] font-medium px-2 py-0.5 rounded-[4px] bg-emerald-500 text-white">● Completed</span>
                            <span className="text-[7.5px] text-white/55">3 days ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FAQ SECTION (Clean Light Contrast Surface)
      =================================================================== */}
      <section id="faq" className="relative bg-[#f8f9fc] text-[#0d0d0d] py-20 sm:py-28 border-t border-gray-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Minimal Heading */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <h2 className="font-poppins font-bold text-[34px] sm:text-[44px] leading-[1.1] tracking-tight text-[#0d0d0d]">
                Got questions?
              </h2>

              <a
                href="mailto:support@pelebet.ng"
                className="inline-flex items-center gap-1.5 mt-5 text-[14px] font-semibold text-[#2d7ff9] hover:text-[#1d6ae5] transition-colors"
              >
                support@pelebet.ng
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Right Column: Accordion List */}
            <div className="lg:col-span-8 space-y-3.5">
              {/* FAQ 1 */}
              <div className="faq-item is-open rounded-2xl bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors hover:border-gray-300">
                <button
                  type="button"
                  aria-expanded="true"
                  className="faq-trigger w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                >
                  <span className="font-poppins font-semibold text-[16px] sm:text-[17px] text-[#0d0d0d]">
                    How does PeleBet work?
                  </span>
                  <span className="faq-icon w-8 h-8 rounded-full bg-[#f4f5f8] text-[#0d0d0d] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className="faq-panel">
                  <div className="faq-panel-inner">
                    <p className="px-5 sm:px-6 pb-5 text-[14.5px] sm:text-[15px] leading-relaxed text-[#525866]">
                      PeleBet lets you challenge real players in skill-based games like 8-Ball Pool, Ludo, Whot, and Penalty Shootout. Fund your Naira (₦) wallet, create or join a lobby, play head-to-head, and the winner takes the pot immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="faq-item rounded-2xl bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors hover:border-gray-300">
                <button
                  type="button"
                  aria-expanded="false"
                  className="faq-trigger w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                >
                  <span className="font-poppins font-semibold text-[16px] sm:text-[17px] text-[#0d0d0d]">
                    How do I deposit and withdraw Naira (₦)?
                  </span>
                  <span className="faq-icon w-8 h-8 rounded-full bg-[#f4f5f8] text-[#0d0d0d] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className="faq-panel">
                  <div className="faq-panel-inner">
                    <p className="px-5 sm:px-6 pb-5 text-[14.5px] sm:text-[15px] leading-relaxed text-[#525866]">
                      You can fund your wallet in seconds via instant Nigerian bank transfer, OPay, PalmPay, or debit card. Withdrawals go directly to your verified local bank account—most cashouts arrive in under 60 seconds.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="faq-item rounded-2xl bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors hover:border-gray-300">
                <button
                  type="button"
                  aria-expanded="false"
                  className="faq-trigger w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                >
                  <span className="font-poppins font-semibold text-[16px] sm:text-[17px] text-[#0d0d0d]">
                    Are matches fair and played against real people?
                  </span>
                  <span className="faq-icon w-8 h-8 rounded-full bg-[#f4f5f8] text-[#0d0d0d] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className="faq-panel">
                  <div className="faq-panel-inner">
                    <p className="px-5 sm:px-6 pb-5 text-[14.5px] sm:text-[15px] leading-relaxed text-[#525866]">
                      Yes. Every match pairs you with a verified real opponent in real time—no bots and no rigged house odds. Stakes are locked safely in escrow before kick-off and released automatically when the match ends.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="faq-item rounded-2xl bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors hover:border-gray-300">
                <button
                  type="button"
                  aria-expanded="false"
                  className="faq-trigger w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                >
                  <span className="font-poppins font-semibold text-[16px] sm:text-[17px] text-[#0d0d0d]">
                    What happens if my opponent disconnects mid-game?
                  </span>
                  <span className="faq-icon w-8 h-8 rounded-full bg-[#f4f5f8] text-[#0d0d0d] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className="faq-panel">
                  <div className="faq-panel-inner">
                    <p className="px-5 sm:px-6 pb-5 text-[14.5px] sm:text-[15px] leading-relaxed text-[#525866]">
                      Our match engine monitors connection status continuously. If a player drops, a short reconnect grace window opens. If they fail to return before the timer expires, the active player wins by forfeit.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 5 */}
              <div className="faq-item rounded-2xl bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors hover:border-gray-300">
                <button
                  type="button"
                  aria-expanded="false"
                  className="faq-trigger w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                >
                  <span className="font-poppins font-semibold text-[16px] sm:text-[17px] text-[#0d0d0d]">
                    What is the minimum stake and withdrawal amount?
                  </span>
                  <span className="faq-icon w-8 h-8 rounded-full bg-[#f4f5f8] text-[#0d0d0d] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className="faq-panel">
                  <div className="faq-panel-inner">
                    <p className="px-5 sm:px-6 pb-5 text-[14.5px] sm:text-[15px] leading-relaxed text-[#525866]">
                      You can join or create lobbies starting from ₦500, and withdraw your winnings anytime from ₦1,000 straight to any Nigerian bank account.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 6 */}
              <div className="faq-item rounded-2xl bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors hover:border-gray-300">
                <button
                  type="button"
                  aria-expanded="false"
                  className="faq-trigger w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                >
                  <span className="font-poppins font-semibold text-[16px] sm:text-[17px] text-[#0d0d0d]">
                    Is my account and wallet secure?
                  </span>
                  <span className="faq-icon w-8 h-8 rounded-full bg-[#f4f5f8] text-[#0d0d0d] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className="faq-panel">
                  <div className="faq-panel-inner">
                    <p className="px-5 sm:px-6 pb-5 text-[14.5px] sm:text-[15px] leading-relaxed text-[#525866]">
                      All PeleBet wallets are protected with bank-grade encryption, KYC verification for withdrawals, and automated escrow locks on every active match.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FOOTER (Rounded Card + Giant Cropped Wordmark)
      =================================================================== */}
      <footer id="about" className="bg-white text-[#0d0d0d] px-4 sm:px-8 lg:px-10 pt-6 pb-8">
        <div className="max-w-[1380px] mx-auto">
          {/* Rounded Card */}
          <div className="rounded-[30px] sm:rounded-[44px] bg-[#f3f3f5] overflow-hidden pt-10 sm:pt-14 px-7 sm:px-12 lg:px-16">
            {/* Top 4-Column Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
              {/* Col 1: Short Statement */}
              <div className="lg:col-span-4">
                <p className="font-poppins font-medium text-[18px] sm:text-[20px] leading-[1.35] text-[#0d0d0d] max-w-[260px]">
                  Play games. Challenge friends. Win real cash.
                </p>
              </div>

              {/* Col 2: Explore */}
              <div className="lg:col-span-2">
                <h3 className="text-[13px] font-semibold text-[#0d0d0d] mb-3.5">Explore</h3>
                <ul className="space-y-2 text-[13.5px] text-[#6b7280]">
                  <li><a href="#features" className="hover:text-[#0d0d0d] transition-colors">Features</a></li>
                  <li><a href="#how-it-works" className="hover:text-[#0d0d0d] transition-colors">How It Works</a></li>
                  <li><a href="#faq" className="hover:text-[#0d0d0d] transition-colors">FAQ</a></li>
                </ul>
              </div>

              {/* Col 3: Follow us (Pill Chips) */}
              <div className="lg:col-span-3">
                <h3 className="text-[13px] font-semibold text-[#0d0d0d] mb-3.5">Follow us</h3>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[12px] font-medium text-[#0d0d0d] shadow-xs hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    @pelebetng
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[12px] font-medium text-[#0d0d0d] shadow-xs hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <path d="M17.5 6.5h.01" />
                    </svg>
                    @pelebetng
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[12px] font-medium text-[#0d0d0d] shadow-xs hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                    </svg>
                    @pelebetng
                  </a>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[12px] font-medium text-[#0d0d0d] shadow-xs hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-[#2d7ff9]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                    @pelebetng
                  </a>
                </div>
              </div>

              {/* Col 4: Action Links */}
              <div className="lg:col-span-3 space-y-5">
                <a href="#top" className="group block">
                  <div className="flex items-center gap-2.5">
                    <span className="font-poppins font-medium text-[18px] text-[#2d7ff9] group-hover:underline">
                      Download App
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#2d7ff9] text-white flex items-center justify-center text-[12px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </div>
                  <p className="text-[12.5px] text-[#6b7280] mt-0.5">Available on iOS &amp; Android</p>
                </a>

                <div className="border-t border-gray-200/80 pt-4">
                  <a href="mailto:support@pelebet.ng" className="group block">
                    <div className="flex items-center gap-2.5">
                      <span className="font-poppins font-medium text-[18px] text-[#0d0d0d] group-hover:underline">
                        Contact Support
                      </span>
                      <span className="w-6 h-6 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center text-[12px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </div>
                    <p className="text-[12.5px] text-[#6b7280] mt-0.5">support@pelebet.ng · 24/7 Help</p>
                  </a>
                </div>
              </div>
            </div>

            {/* Giant Cropped Wordmark */}
            <div className="mt-8 sm:mt-12 -mx-6 sm:-mx-12 lg:-mx-16 select-none pointer-events-none">
              <div className="font-poppins font-extrabold tracking-[-0.065em] leading-[0.74] text-[#0d0d0d] text-[27vw] sm:text-[24vw] lg:text-[22vw] text-center translate-y-[12%]">
                Pelebet
              </div>
            </div>
          </div>

          {/* Bottom Legal Strip */}
          <div className="mt-5 px-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-[#6b7280]">
            <div className="flex items-center gap-4">
              <span>PeleBet © 2026</span>
              <span>·</span>
              <a href="#faq" className="hover:text-[#0d0d0d] transition-colors">Privacy Policy</a>
              <span>·</span>
              <a href="#faq" className="hover:text-[#0d0d0d] transition-colors">Terms</a>
            </div>
            <div className="flex items-center gap-4">
              <span>Lagos, Nigeria</span>
              <span>·</span>
              <span className="font-medium text-[#0d0d0d]">18+</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
