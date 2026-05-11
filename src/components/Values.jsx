import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    num: '01',
    tag: 'Full-Stack Approach',
    title: 'End-to-End Marketing Solutions',
    desc: 'Strategy + Content + Execution + Analytics — we manage the entire marketing ecosystem so you can focus on growing your business.',
  },
  {
    num: '02',
    tag: 'Cultural Intelligence',
    title: 'Local Market Understanding',
    desc: 'Deep roots in Rwandan and African markets, combined with global creative standards. We speak your audience\'s language.',
  },
  {
    num: '03',
    tag: 'Creative Excellence',
    title: 'Visual Storytelling',
    desc: 'High-quality video, photography, and design that doesn\'t just look good — it communicates your brand\'s soul and drives engagement.',
  },
  {
    num: '04',
    tag: 'Measurable Impact',
    title: 'Business Results First',
    desc: 'Strategy-based marketing that installs your brand into the target market. Every creative decision is backed by data and intent.',
  },
];

export default function Values() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = sectionRef.current.querySelectorAll('.value-card');
    gsap.set(cards, { y: 80, opacity: 0 });
    ScrollTrigger.batch(cards, {
      onEnter: (els) => {
        gsap.to(els, {
          y: 0, opacity: 1, duration: 0.85, stagger: 0.15, ease: 'power3.out',
        });
      },
      start: 'top 82%',
      once: true,
    });

    gsap.from('.values-label, .values-title', {
      opacity: 0, y: 40, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.values-label', start: 'top 85%' },
    });
  }, { scope: sectionRef });

  return (
    <section id="values" className="values-section" ref={sectionRef}>
      <p className="values-label">Our Principles</p>
      <h2 className="values-title">What We Stand For</h2>

      <div className="values-grid">
        {VALUES.map(({ num, tag, title, desc }) => (
          <div className="value-card" key={num}>
            <span className="value-number">{num}</span>
            <p className="value-tag">{tag}</p>
            <h3 className="value-title">{title}</h3>
            <p className="value-desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
