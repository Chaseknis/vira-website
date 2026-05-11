import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_TEXT = 'DIGITAL MARKETING · MEDIA PRODUCTION · KIGALI · RWANDA · VISUAL STORYTELLING · BRAND IDENTITY · ';

function splitChars(text, className = '') {
  return [...text].map((char, i) => (
    <span key={i} className={`hero-char${className ? ` ${className}` : ''}`}>
      {char === ' ' ? ' ' : char}
    </span>
  ));
}

export default function Hero() {
  const sectionRef = useRef(null);
  const strokeRef = useRef(null);
  const labelRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const path = strokeRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    const chars1 = line1Ref.current?.querySelectorAll('.hero-char') || [];
    const chars2 = line2Ref.current?.querySelectorAll('.hero-char') || [];

    gsap.set([chars1, chars2], { y: '110%' });
    gsap.set([labelRef.current, subRef.current, ctaRef.current], { opacity: 0, y: 24 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(path, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' })
      .to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.6')
      .to(chars1, { y: '0%', stagger: 0.035, duration: 0.75 }, '-=0.3')
      .to(chars2, { y: '0%', stagger: 0.035, duration: 0.75 }, '-=0.5')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

    // Parallax on scroll
    gsap.to(contentRef.current, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      {/* Grain */}
      <div className="hero-grain" />

      {/* Decorative SVG circle */}
      <div className="hero-svg-wrap">
        <svg viewBox="0 0 700 700" width="700" height="700" aria-hidden="true">
          <ellipse
            ref={strokeRef}
            cx="350" cy="350" rx="310" ry="285"
            fill="none" stroke="#F97316" strokeWidth="1.5"
            strokeDasharray="10 5"
            style={{ transform: 'rotate(-8deg)', transformOrigin: 'center' }}
          />
          <ellipse
            cx="350" cy="350" rx="280" ry="255"
            fill="none" stroke="rgba(249,115,22,0.12)" strokeWidth="1"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="hero-content" ref={contentRef}>
        <p className="hero-label" ref={labelRef}>
          Digital Marketing &amp; Media Production
        </p>

        <h1 className="hero-headline">
          <span className="hero-line" ref={line1Ref}>
            {splitChars('We Make Brands')}
          </span>
          <span className="hero-line hero-orange" ref={line2Ref}>
            {splitChars('Impossible to Ignore')}
          </span>
        </h1>

        <p className="hero-sub" ref={subRef}>
          Digital Marketing &amp; Media Production — Kigali, Rwanda
        </p>

        <div className="hero-cta-wrap" ref={ctaRef}>
          <button className="hero-cta">
            <span className="hero-cta-inner">
              Start a Project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Marquee */}
      <div className="hero-marquee">
        <div className="marquee-track">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="marquee-text">{MARQUEE_TEXT}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
