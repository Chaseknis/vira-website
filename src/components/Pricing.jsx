import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PLANS = [
  {
    tier: 'Tier 01',
    name: 'Starter Visibility',
    price: 'RWF 200,000 – 300,000',
    period: 'per month',
    featured: false,
    features: [
      '8 posts/month with captions & hashtags',
      'Community management & engagement',
      'Monthly performance report',
      '1 platform focus',
      'Content calendar planning',
      'Brand tone & voice guidelines',
    ],
  },
  {
    tier: 'Tier 02',
    name: 'Growth & Engagement',
    price: 'RWF 400,000 – 600,000',
    period: 'per month',
    featured: true,
    badge: 'Most Popular',
    features: [
      '12–16 posts/month (photo & video)',
      'Monthly photo/video content session',
      'Meta Ads setup & management',
      'Community management & analytics',
      'Monthly strategy call',
      '2 platforms (Facebook + Instagram)',
    ],
  },
  {
    tier: 'Tier 03',
    name: 'Full Digital Marketing',
    price: 'RWF 700,000 – 1,000,000+',
    period: 'per month',
    featured: false,
    features: [
      '20–25 posts/month across platforms',
      '2 professional content shoots/month',
      'Full Meta Ads + A/B testing',
      'WhatsApp support & priority response',
      'Advanced analytics & insights',
      '3 platforms (Facebook, Instagram, TikTok)',
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Pricing({ onGetStarted }) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.pricing-label, .pricing-title', {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: '.pricing-label', start: 'top 85%' },
    });
  }, { scope: sectionRef });

  return (
    <section id="pricing" className="pricing-section" ref={sectionRef}>
      <p className="pricing-label">Transparent Pricing</p>
      <h2 className="pricing-title">Simple, Clear Packages</h2>

      <div className="pricing-grid">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            className={`pricing-card${plan.featured ? ' featured' : ''}`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={i}
            whileHover={plan.featured ? { scale: 1.02 } : {}}
          >
            {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
            <p className="pricing-tier">{plan.tier}</p>
            <h3 className="pricing-name">{plan.name}</h3>
            <p className="pricing-price">{plan.price}</p>
            <p className="pricing-period">{plan.period}</p>
            <ul className="pricing-features">
              {plan.features.map((f, j) => <li key={j}>{f}</li>)}
            </ul>
            <button
              className="pricing-btn"
              onClick={() => onGetStarted(plan)}
              aria-label={`Get started with ${plan.name} plan`}
            >
              <span className="pricing-btn-inner">Get Started →</span>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
