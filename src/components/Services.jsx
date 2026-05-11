import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: '01',
    title: 'Digital Marketing Strategy',
    items: [
      'Social media management (Facebook, Instagram, TikTok, LinkedIn)',
      'Paid advertising campaigns & retargeting',
      'Influencer marketing & partnerships',
      'Website design and development',
      'Digital analysis & strategy development',
    ],
  },
  {
    num: '02',
    title: 'Event & Occasions Coverage',
    items: [
      'Weddings and private events',
      'Corporate events, conferences & company functions',
      'Highlight videos & behind-the-scenes coverage',
      'Professional photography & portrait sessions',
      'Short-form social media videos (Reels & TikToks)',
    ],
  },
  {
    num: '03',
    title: 'Creative Visual Content',
    items: [
      'Commercial ads and promotional videos',
      'Engaging visual content for social media',
      'Brand identity & graphic design',
      'Motion design for digital campaigns',
      'Content calendars & creative direction',
    ],
  },
];

export default function Services() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    if (window.innerWidth < 900) return;

    const track = trackRef.current;
    const outer = outerRef.current;
    const progress = progressRef.current;

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 340);

    const st = ScrollTrigger.create({
      trigger: outer,
      start: 'top top',
      end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight}`,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(track, { x: p * getScrollAmount() });
        if (progress) progress.style.width = `${p * 100}%`;
      },
      invalidateOnRefresh: true,
    });

    return () => st.kill();
  }, { scope: outerRef });

  return (
    <section id="services" className="services-outer" ref={outerRef}>
      <div className="services-progress" ref={progressRef} />

      <div className="services-track" ref={trackRef}>
        {/* Sidebar */}
        <div className="services-sidebar">
          <p className="services-sidebar-label">What We Do</p>
          <h2 className="services-sidebar-title">
            Our Core<br />Services
          </h2>
          <p style={{ marginTop: 24, fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
            Scroll to explore →
          </p>
        </div>

        {/* Cards */}
        <div className="services-cards">
          {SERVICES.map(({ num, title, items }) => (
            <div className="service-card" key={num}>
              <span className="service-bg-num">{num}</span>
              <p className="service-num">{num}</p>
              <h3 className="service-title">{title}</h3>
              <ul className="service-list">
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
