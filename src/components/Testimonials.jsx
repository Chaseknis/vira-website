import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "VIRA completely transformed how Sudani in Kigali shows up online. Before them, our social media was inconsistent and had no real strategy. Within three months they gave us a distinct voice, an engaged audience, and content that actually feels like us. The results speak for themselves.",
    author: 'Lina Adil',
    role: 'Founder',
    company: 'Sudani in Kigali',
    location: 'Kigali, Rwanda',
    initial: 'L',
    color: '#C0392B',
    rating: 5,
  },
  {
    quote: "We needed a creative team that understood both our professional brand and the Kigali market. VIRA delivered exceptional social media content and helped us attract corporate clients we never reached before. Their understanding of local business culture is unmatched.",
    author: 'Sarah M.',
    role: 'Director',
    company: 'Wika Translate Kigali',
    location: 'Kigali, Rwanda',
    initial: 'S',
    color: '#2563EB',
    rating: 5,
  },
  {
    quote: "Managing our digital presence across two continents felt impossible until VIRA stepped in. They understood the diaspora audience instantly — the nuance of speaking to Rwandans in Kentucky while staying connected to our roots. Professional, creative, and genuinely passionate about results.",
    author: 'James R.',
    role: 'Operations Manager',
    company: 'Wika Translate Kentucky',
    location: 'Kentucky, USA',
    initial: 'J',
    color: '#7C3AED',
    rating: 5,
  },
  {
    quote: "VIRA's content production for our events coverage has been outstanding. The highlight videos they create drive real bookings and foot traffic. Every shoot is professional, every reel goes viral. They understand the hospitality space and know how to make a venue look irresistible.",
    author: 'Khalid A.',
    role: 'General Manager',
    company: 'Al Cobra Kigali',
    location: 'Kigali, Rwanda',
    initial: 'K',
    color: '#D97706',
    rating: 5,
  },
  {
    quote: "Working with VIRA for our Sudan operations has been a game-changer. They grasped the cultural context immediately and created campaigns that resonated deeply with our local audience. The growth in engagement we've seen since partnering with them is remarkable.",
    author: 'Ahmed K.',
    role: 'CEO',
    company: 'Wika Translate Sudan',
    location: 'Sudan',
    initial: 'A',
    color: '#059669',
    rating: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="t-stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FACC15"/>
        </svg>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.35 } }),
};

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [[active, dir], setActive] = useState([0, 0]);

  const goTo = (next) => {
    setActive(([cur]) => [next, next > cur ? 1 : -1]);
  };
  const prev = () => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((active + 1) % TESTIMONIALS.length);

  useGSAP(() => {
    gsap.from('.testimonials-label, .testimonials-title', {
      opacity: 0, y: 40, stagger: 0.12, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: '.testimonials-label', start: 'top 85%' },
    });
  }, { scope: sectionRef });

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="testimonials-section" ref={sectionRef}>
      {/* Background accent */}
      <div className="t-bg-accent" />

      <div className="testimonials-inner">
        <div className="testimonials-head">
          <p className="testimonials-label">Client Stories</p>
          <h2 className="testimonials-title">What Our Clients Say</h2>
        </div>

        {/* Main card */}
        <div className="t-stage">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={active}
              className="t-card"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Quote mark */}
              <div className="t-quote-mark">&ldquo;</div>

              <StarRating count={t.rating} />

              <blockquote className="t-quote">{t.quote}</blockquote>

              <div className="t-author-row">
                <div className="t-avatar" style={{ background: `${t.color}20`, borderColor: `${t.color}40` }}>
                  <span style={{ color: t.color }}>{t.initial}</span>
                </div>
                <div className="t-author-info">
                  <p className="t-author-name">{t.author}</p>
                  <p className="t-author-role">
                    {t.role} · <span style={{ color: t.color }}>{t.company}</span>
                  </p>
                  <p className="t-author-location">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4, verticalAlign: 'middle' }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
                    </svg>
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="t-controls">
          <button className="t-btn t-btn-prev" onClick={prev} aria-label="Previous testimonial">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="t-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`t-dot${i === active ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button className="t-btn t-btn-next" onClick={next} aria-label="Next testimonial">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="t-thumbs">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={i}
              className={`t-thumb${i === active ? ' active' : ''}`}
              onClick={() => goTo(i)}
              style={{ borderColor: i === active ? item.color : 'transparent' }}
              aria-label={`View ${item.author}'s testimonial`}
            >
              <span className="t-thumb-avatar" style={{ background: `${item.color}20`, color: item.color }}>
                {item.initial}
              </span>
              <span className="t-thumb-name">{item.author}</span>
              <span className="t-thumb-company">{item.company}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
