import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_OPTIONS = [
  'Digital Marketing Strategy',
  'Social Media Management',
  'Event & Occasions Coverage',
  'Creative Visual Content',
  'Website Design & Development',
  'Branding & Visual Identity',
  'Commercial Video / Ad Production',
  'Photography & Reels',
  'Consulting / Strategy Session',
  'Other',
];

const BUDGET_OPTIONS = [
  'Under RWF 200,000',
  'RWF 200,000 – 300,000 (Starter)',
  'RWF 400,000 – 600,000 (Growth)',
  'RWF 700,000 – 1,000,000+ (Full Digital)',
  'Custom / Let\'s discuss',
];

export default function Contact({ selectedPlan, onClearPlan }) {
  const sectionRef = useRef(null);
  const planBannerRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '',
    phone: '', service: '', budget: '', timeline: '', message: '',
  });

  // Pre-fill form when a plan is selected from pricing
  useEffect(() => {
    if (selectedPlan) {
      setForm((f) => ({
        ...f,
        budget: selectedPlan.price,
        service: 'Digital Marketing Strategy',
        message: `Hi VIRA team,\n\nI'm interested in the ${selectedPlan.name} package (${selectedPlan.price}/month).\n\n`,
      }));
    }
  }, [selectedPlan]);

  useGSAP(() => {
    gsap.from('.contact-label, .contact-heading', {
      opacity: 0, y: 50, stagger: 0.15, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-label', start: 'top 80%' },
    });
    gsap.from('.contact-info-item', {
      opacity: 0, x: -30, stagger: 0.12, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-info-list', start: 'top 80%' },
    });
    gsap.from('.contact-form-wrap', {
      opacity: 0, x: 40, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-form-wrap', start: 'top 80%' },
    });
  }, { scope: sectionRef });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', company: '', phone: '', service: '', budget: '', timeline: '', message: '' });
      if (onClearPlan) onClearPlan();
    }, 2000);
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-orb contact-orb-1" />
      <div className="contact-orb contact-orb-2" />
      <div className="contact-orb contact-orb-3" />

      <div className="contact-inner">
        {/* ── Left column ── */}
        <div className="contact-left">
          <p className="contact-label">Let&apos;s Work Together</p>
          <h2 className="contact-heading">
            Ready to make your brand{' '}
            <span>impossible to ignore?</span>
          </h2>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <span className="contact-info-lbl">Email</span>
              <a href="mailto:Vira@viradigitals.com" className="contact-info-val">
                Vira@viradigitals.com
              </a>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-lbl">Website</span>
              <a href="https://www.viradigitals.com" target="_blank" rel="noreferrer" className="contact-info-val">
                www.viradigitals.com
              </a>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-lbl">Phone / WhatsApp</span>
              <a href="tel:+250792372219" className="contact-info-val">
                +250 792 372 219
              </a>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-lbl">Location</span>
              <span className="contact-info-val">Kigali, Rwanda</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="contact-quick-stats">
            <div className="cqs-item">
              <span className="cqs-num">24h</span>
              <span className="cqs-label">Response time</span>
            </div>
            <div className="cqs-item">
              <span className="cqs-num">100%</span>
              <span className="cqs-label">Client satisfaction</span>
            </div>
            <div className="cqs-item">
              <span className="cqs-num">Free</span>
              <span className="cqs-label">Initial consultation</span>
            </div>
          </div>
        </div>

        {/* ── Right column: form ── */}
        <div className="contact-form-wrap">
          {/* Selected plan banner */}
          <AnimatePresence>
            {selectedPlan && (
              <motion.div
                ref={planBannerRef}
                className="contact-plan-banner"
                initial={{ opacity: 0, y: -16, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -16, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="cpb-left">
                  <span className="cpb-tag">Selected Package</span>
                  <p className="cpb-name">{selectedPlan.name}</p>
                  <p className="cpb-price">{selectedPlan.price} / month</p>
                </div>
                <button
                  className="cpb-clear"
                  onClick={onClearPlan}
                  aria-label="Clear selected plan"
                >✕</button>
              </motion.div>
            )}
          </AnimatePresence>

          {sent ? (
            <div className="contact-sent">
              <div className="contact-sent-icon">✓</div>
              <h3>Message Received!</h3>
              <p>Thank you for reaching out. We&apos;ll get back to you within 24 hours with a personalised proposal.</p>
              <button className="form-submit" onClick={() => setSent(false)}>
                <span className="form-submit-inner">Send Another Message</span>
              </button>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              aria-label="Contact VIRA Digital Agency"
            >
              {/* Row 1: Name + Email */}
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="cf-name">Full Name *</label>
                  <input id="cf-name" name="name" type="text" className="form-input"
                    placeholder="Your full name" value={form.name}
                    onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="cf-email">Email Address *</label>
                  <input id="cf-email" name="email" type="email" className="form-input"
                    placeholder="your@email.com" value={form.email}
                    onChange={handleChange} required />
                </div>
              </div>

              {/* Row 2: Company + Phone */}
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="cf-company">Company / Brand</label>
                  <input id="cf-company" name="company" type="text" className="form-input"
                    placeholder="Your business name" value={form.company}
                    onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="cf-phone">Phone / WhatsApp</label>
                  <input id="cf-phone" name="phone" type="tel" className="form-input"
                    placeholder="+250 7XX XXX XXX" value={form.phone}
                    onChange={handleChange} />
                </div>
              </div>

              {/* Row 3: Service + Budget */}
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="cf-service">Service Interested In *</label>
                  <select id="cf-service" name="service" className="form-input form-select"
                    value={form.service} onChange={handleChange} required>
                    <option value="" disabled>Select a service…</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="cf-budget">Monthly Budget</label>
                  <select id="cf-budget" name="budget" className="form-input form-select"
                    value={form.budget} onChange={handleChange}>
                    <option value="" disabled>Select budget range…</option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Timeline */}
              <div className="form-field">
                <label className="form-label" htmlFor="cf-timeline">Ideal Start Timeline</label>
                <select id="cf-timeline" name="timeline" className="form-input form-select"
                  value={form.timeline} onChange={handleChange}>
                  <option value="" disabled>When do you want to start?</option>
                  <option value="ASAP">As soon as possible</option>
                  <option value="1-2 weeks">Within 1–2 weeks</option>
                  <option value="1 month">Within 1 month</option>
                  <option value="1-3 months">1–3 months from now</option>
                  <option value="Just exploring">Just exploring options</option>
                </select>
              </div>

              {/* Message */}
              <div className="form-field">
                <label className="form-label" htmlFor="cf-message">Tell Us About Your Project *</label>
                <textarea
                  id="cf-message" name="message" className="form-input"
                  placeholder="Describe your brand, goals, current challenges, and what success looks like for you…"
                  value={form.message} onChange={handleChange}
                  rows={5} required
                />
              </div>

              <button className="form-submit" type="submit" disabled={sending}>
                <span className="form-submit-inner">
                  {sending ? (
                    <><span className="form-spinner" /> Sending…</>
                  ) : (
                    selectedPlan
                      ? `Enquire About ${selectedPlan.name} →`
                      : 'Send Message →'
                  )}
                </span>
              </button>

              <p className="form-note">
                We typically respond within 24 hours. All enquiries are 100% confidential.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
