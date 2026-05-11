import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useGSAP } from '@gsap/react';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Clients from './components/Clients';
import Values from './components/Values';
import Services from './components/Services';
import Pricing from './components/Pricing';
import AdditionalServices from './components/AdditionalServices';
import GrowthTimeline from './components/GrowthTimeline';
import Testimonials from './components/Testimonials';
import GoogleReviews from './components/GoogleReviews';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const lenisRef = useRef(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // ── Lenis smooth scroll ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  // ── Utility: scroll to any section ──
  const scrollTo = useCallback((target) => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (typeof target === 'string' && target.startsWith('#')) {
      const el = document.querySelector(target);
      if (el) lenis.scrollTo(el, { offset: -80 });
    } else if (typeof target === 'number') {
      lenis.scrollTo(target);
    }
  }, []);

  // ── Pricing "Get Started" handler ──
  const handleGetStarted = useCallback((plan) => {
    setSelectedPlan(plan);
    // Give React one frame to update the banner before scrolling
    requestAnimationFrame(() => {
      const el = document.querySelector('#contact');
      if (el && lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -80 });
      }
    });
  }, []);

  const handleClearPlan = useCallback(() => setSelectedPlan(null), []);

  return (
    <>
      <CustomCursor />
      <Navbar scrollTo={scrollTo} />

      <main>
        <Hero />
        <About />
        <Clients />
        <Values />
        <Services />
        <Pricing onGetStarted={handleGetStarted} />
        <AdditionalServices />
        <GrowthTimeline />
        <Testimonials />
        <GoogleReviews />
        <Contact selectedPlan={selectedPlan} onClearPlan={handleClearPlan} />
      </main>

      <Footer />
    </>
  );
}
