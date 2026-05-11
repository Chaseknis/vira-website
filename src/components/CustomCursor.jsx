import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let hovering = false;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const loop = () => {
      if (dot) {
        dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
      rx += (mx - rx) * 0.09;
      ry += (my - ry) * 0.09;
      if (ring) {
        const size = hovering ? 64 : 40;
        const half = size / 2;
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
        ring.style.background = hovering ? 'rgba(249,115,22,0.18)' : 'transparent';
        ring.style.borderColor = 'rgba(249,115,22,0.8)';
      }
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMove);
    loop();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--orange)', pointerEvents: 'none',
          zIndex: 999999, mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40, borderRadius: '50%',
          border: '1.5px solid rgba(249,115,22,0.8)',
          pointerEvents: 'none', zIndex: 999998,
          transition: 'width 0.25s, height 0.25s, background 0.25s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
