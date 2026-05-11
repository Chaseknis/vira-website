import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Growth', href: '#growth' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (href) => {
    scrollTo(href);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <button className="nav-logo" onClick={() => scrollTo('#hero')} style={{ background: 'none', border: 'none' }}>
          <svg viewBox="0 0 48 48" width="44" height="44">
            <ellipse
              cx="24" cy="24" rx="20" ry="20"
              fill="none" stroke="#F97316" strokeWidth="1.8"
              strokeDasharray="6 3"
              style={{ transformOrigin: 'center', transform: 'rotate(-10deg)' }}
            />
            <text
              x="50%" y="53%" textAnchor="middle" dominantBaseline="middle"
              fontFamily="Clash Display, sans-serif" fontWeight="700"
              fontSize="24" fill="#F97316"
            >V</text>
          </svg>
          <span className="nav-logo-text">VIRA</span>
        </button>

        {/* Desktop links */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <button className="nav-link-btn" onClick={() => handleNav(href)}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button className="nav-cta" onClick={() => handleNav('#contact')}>
          <span className="nav-cta-inner">Start a Project</span>
        </button>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : '' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : '' }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mob-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="mob-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.38 }}
            >
              <button
                className="nav-logo" onClick={() => handleNav('#hero')}
                style={{ background: 'none', border: 'none', marginBottom: 16 }}
              >
                <svg viewBox="0 0 48 48" width="40" height="40">
                  <ellipse cx="24" cy="24" rx="20" ry="20" fill="none" stroke="#F97316" strokeWidth="1.8" strokeDasharray="6 3" style={{ transformOrigin: 'center', transform: 'rotate(-10deg)' }} />
                  <text x="50%" y="53%" textAnchor="middle" dominantBaseline="middle" fontFamily="Clash Display, sans-serif" fontWeight="700" fontSize="22" fill="#F97316">V</text>
                </svg>
                <span className="nav-logo-text">VIRA</span>
              </button>
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  className="mob-link"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07 }}
                  onClick={() => handleNav(href)}
                >
                  {label}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
