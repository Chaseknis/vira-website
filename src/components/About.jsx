import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COUNTERS = [
  { value: 10000, suffix: '+', label: 'Social Followers', display: '10K' },
  { value: 5, suffix: '+', label: 'Years Experience', display: '5' },
  { value: 3, suffix: '', label: 'Core Service Pillars', display: '3' },
];

const FOUNDERS = [
  {
    role: 'Co-Founder',
    name: 'Sara Abdelraheem',
    bio: 'MBA in Marketing Management with 5+ years of experience in Marketing & Project Management across diverse industries. Sara brings strategic depth and executional precision to every campaign.',
  },
  {
    role: 'Co-Founder',
    name: 'Lina Adil',
    bio: 'Founder of Sudani in Kigali with 10K+ TikTok & Instagram followers. YALI alumni and entrepreneur with proven experience building businesses in Sudan. Lina brings creative fire and audience intuition.',
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const counterRefs = useRef([]);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useGSAP(() => {
    // Section fade-in
    gsap.from('.about-top', {
      opacity: 0, y: 60, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-top', start: 'top 80%' },
    });

    // Counters
    counterRefs.current.forEach((el, i) => {
      if (!el) return;
      const { value, display } = COUNTERS[i];
      const numEl = el.querySelector('.counter-num');
      if (!numEl) return;
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: value,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate: () => {
          const v = Math.round(proxy.val);
          if (display === '10K') {
            numEl.textContent = v >= 10000 ? '10K' : v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v);
          } else {
            numEl.textContent = String(v);
          }
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    });

    // Founder cards slide in from opposite sides
    gsap.from(card1Ref.current, {
      x: -80, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.founders-grid', start: 'top 80%' },
    });
    gsap.from(card2Ref.current, {
      x: 80, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.founders-grid', start: 'top 80%' },
    });
  }, { scope: sectionRef });

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      {/* Top: title + paragraph + counters */}
      <div className="about-top">
        <h2 className="about-big-title">
          Who <span>We</span><br />Are
        </h2>
        <div className="about-right">
          <p className="about-paragraph">
            VIRA is a Kigali-based digital marketing and media production agency delivering creative, impactful content that reflects our clients&apos; identity and achieves tangible results. We blend local market understanding with global creative standards to build brands that truly resonate.
          </p>
          <div className="about-counters">
            {COUNTERS.map(({ suffix, label, display }, i) => (
              <div
                key={label}
                className="counter-item"
                ref={(el) => (counterRefs.current[i] = el)}
              >
                <div className="counter-value">
                  <span className="counter-num">{display}</span>
                  <span className="counter-suffix">{suffix}</span>
                </div>
                <span className="counter-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founders */}
      <div className="founders-grid">
        {FOUNDERS.map((f, i) => (
          <div
            key={f.name}
            className="founder-card"
            ref={i === 0 ? card1Ref : card2Ref}
          >
            <p className="founder-role">{f.role}</p>
            <h3 className="founder-name">{f.name}</h3>
            <p className="founder-bio">{f.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
