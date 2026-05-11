import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    side: 'left',
    badge: '0 – 6 Months',
    title: 'Short-Term: Build & Acquire',
    desc: 'Build a strong portfolio showcasing our creative range. Acquire 3–5 retainer clients across key industries. Focus on visibility, reputation, and case studies that speak for themselves.',
    icon: '🚀',
  },
  {
    side: 'right',
    badge: '6 – 18 Months',
    title: 'Mid-Term: Scale & Expand',
    desc: 'Hire skilled freelancers and junior creatives to expand capacity. Aggressively target corporate clients and NGOs. Build a strong, recognizable brand presence across Kigali.',
    icon: '⚡',
  },
  {
    side: 'left',
    badge: '2+ Years',
    title: 'Long-Term: Lead & Inspire',
    desc: "Become the top digital agency in Kigali, expand regionally across East Africa. Launch a training academy aligned with Rwanda's SDGs — empowering the next generation of creatives.",
    icon: '🏆',
  },
];

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function GrowthTimeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const svgRef = useRef(null);

  useGSAP(() => {
    gsap.from('.timeline-label, .timeline-title', {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: '.timeline-label', start: 'top 85%' },
    });

    if (lineRef.current) {
      const pathEl = lineRef.current;
      const len = pathEl.getTotalLength ? pathEl.getTotalLength() : 800;
      gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(pathEl, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-inner',
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section id="growth" className="timeline-section" ref={sectionRef}>
      <p className="timeline-label">Where We&apos;re Headed</p>
      <h2 className="timeline-title">Our Growth Strategy</h2>

      <div className="timeline-inner">
        {/* Vertical SVG line */}
        <div className="timeline-svg-wrap">
          <svg
            ref={svgRef}
            width="2"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0, height: '100%' }}
            preserveAspectRatio="none"
          >
            <line
              ref={lineRef}
              x1="1" y1="0" x2="1" y2="100%"
              stroke="#F97316" strokeWidth="2"
            />
          </svg>
        </div>

        <div className="timeline-items">
          {MILESTONES.map(({ side, badge, title, desc, icon }, i) => (
            <div className={`timeline-item ${side}`} key={i}>
              {side === 'left' ? (
                <>
                  <motion.div
                    className="timeline-content"
                    variants={contentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                  >
                    <span className="timeline-badge">{badge}</span>
                    <div style={{ fontSize: 28, margin: '8px 0 12px' }}>{icon}</div>
                    <h3 className="timeline-milestone">{title}</h3>
                    <p className="timeline-desc">{desc}</p>
                  </motion.div>
                  <motion.div
                    className="timeline-node"
                    variants={nodeVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                  />
                  <div className="timeline-empty" />
                </>
              ) : (
                <>
                  <div className="timeline-empty" />
                  <motion.div
                    className="timeline-node"
                    variants={nodeVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                  />
                  <motion.div
                    className="timeline-content"
                    variants={contentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                  >
                    <span className="timeline-badge">{badge}</span>
                    <div style={{ fontSize: 28, margin: '8px 0 12px' }}>{icon}</div>
                    <h3 className="timeline-milestone">{title}</h3>
                    <p className="timeline-desc">{desc}</p>
                  </motion.div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
