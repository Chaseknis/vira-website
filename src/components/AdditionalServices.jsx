import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COLUMNS = [
  {
    title: 'Project-Based',
    items: [
      'Website design & development',
      'Branding & visual identity',
      'Campaign launches & activations',
      'Logo design & brand guidelines',
      'Marketing collateral design',
    ],
  },
  {
    title: 'Production Services',
    items: [
      'Event coverage (weddings, corporate)',
      'Commercial videos & advertisements',
      'Professional photography & reels',
      'Drone & aerial footage',
      'Post-production & editing',
    ],
  },
  {
    title: 'Add-On & Revenue',
    items: [
      'Influencer management (commission-based)',
      'Social media training & workshops',
      'Marketing consulting sessions',
      'Content strategy audits',
      'Analytics & reporting packages',
    ],
  },
];

export default function AdditionalServices() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.additional-label, .additional-title', {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: '.additional-label', start: 'top 85%' },
    });

    const headers = sectionRef.current.querySelectorAll('.additional-col-head');
    gsap.set(headers, { y: '110%' });
    ScrollTrigger.batch(headers, {
      onEnter: (els) => {
        gsap.to(els, { y: 0, stagger: 0.12, duration: 0.75, ease: 'power3.out' });
      },
      start: 'top 82%',
      once: true,
    });

    const items = sectionRef.current.querySelectorAll('.additional-item');
    gsap.set(items, { opacity: 0, x: -20 });
    ScrollTrigger.batch(items, {
      onEnter: (els) => {
        gsap.to(els, { opacity: 1, x: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out' });
      },
      start: 'top 85%',
      once: true,
    });
  }, { scope: sectionRef });

  return (
    <section id="additional" className="additional-section" ref={sectionRef}>
      <p className="additional-label">Beyond the Core</p>
      <h2 className="additional-title">Additional Services</h2>

      <div className="additional-grid">
        {COLUMNS.map(({ title, items }) => (
          <div className="additional-col" key={title}>
            <div style={{ overflow: 'hidden', marginBottom: 32 }}>
              <h3 className="additional-col-head">{title}</h3>
            </div>
            <ul className="additional-list">
              {items.map((item) => (
                <li className="additional-item" key={item}>
                  <span className="additional-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
