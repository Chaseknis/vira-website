import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  {
    name: 'Sudani in Kigali',
    abbr: 'SK',
    category: 'Food & Culture',
    location: 'Kigali, Rwanda',
    desc: 'Authentic Sudanese cuisine & culture hub in the heart of Kigali.',
    color: '#C0392B',
  },
  {
    name: 'Wika Translate',
    abbr: 'WT',
    category: 'Language Services',
    location: 'Kigali, Rwanda',
    desc: 'Professional translation & interpretation services for East Africa.',
    color: '#2563EB',
  },
  {
    name: 'Wika Translate',
    abbr: 'WT',
    category: 'Language Services',
    location: 'Kentucky, USA',
    desc: 'Bridging language barriers for Rwandan diaspora in the American midwest.',
    color: '#7C3AED',
  },
  {
    name: 'Wika Translate',
    abbr: 'WT',
    category: 'Language Services',
    location: 'Sudan',
    desc: 'Empowering businesses across Sudan with world-class translation.',
    color: '#059669',
  },
  {
    name: 'Al Cobra Kigali',
    abbr: 'AC',
    category: 'Hospitality & Events',
    location: 'Kigali, Rwanda',
    desc: "Kigali's premier venue for dining, entertainment, and private events.",
    color: '#D97706',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Clients() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.clients-label, .clients-title, .clients-sub', {
      opacity: 0, y: 40, stagger: 0.12, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: '.clients-label', start: 'top 85%' },
    });
  }, { scope: sectionRef });

  return (
    <section id="clients" className="clients-section" ref={sectionRef}>
      {/* Header */}
      <div className="clients-header">
        <p className="clients-label">Trusted By</p>
        <h2 className="clients-title">Our Clients</h2>
        <p className="clients-sub">
          From local restaurants to international translation networks — we build brands that last.
        </p>
      </div>

      {/* Client cards */}
      <div className="clients-grid">
        {CLIENTS.map((client, i) => (
          <motion.div
            key={`${client.name}-${client.location}`}
            className="client-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={i}
            whileHover={{ y: -6 }}
          >
            {/* Avatar */}
            <div
              className="client-avatar"
              style={{ background: `${client.color}18`, borderColor: `${client.color}30` }}
            >
              <span style={{ color: client.color }}>{client.abbr}</span>
            </div>

            {/* Info */}
            <div className="client-info">
              <div className="client-meta">
                <span className="client-category" style={{ color: client.color }}>
                  {client.category}
                </span>
                <span className="client-location">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
                  </svg>
                  {client.location}
                </span>
              </div>
              <h3 className="client-name">{client.name}</h3>
              <p className="client-desc">{client.desc}</p>
            </div>

            {/* Accent bar */}
            <div className="client-bar" style={{ background: client.color }} />
          </motion.div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="clients-strip">
        <p className="clients-strip-text">
          Join our growing family of brands making noise in East Africa &amp; beyond
        </p>
        <div className="clients-strip-divider" />
        <span className="clients-strip-count">5+ Active Clients</span>
      </div>
    </section>
  );
}
