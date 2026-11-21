import { gsap, loopWhenVisible, type MotionModule } from './core';

/**
 * Contact envelope ([data-sobre]): endless float while visible (yPercent +
 * rotation) and, with a fine pointer, a small pull towards the cursor on x/y
 * (separate properties, so both can run together).
 */
const PULL = 12; // px at most

export const initContacto: MotionModule = (env) => {
  const sobre = document.querySelector<HTMLElement>('[data-sobre]');
  const section = document.getElementById('contacto');
  if (!sobre || !section) return;
  const cleanups: Array<() => void> = [];

  const float = gsap.to(sobre, { yPercent: -7, rotation: 3, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  cleanups.push(loopWhenVisible(sobre, float));

  if (env.finePointer) {
    const x = gsap.quickTo(sobre, 'x', { duration: 0.7, ease: 'power3.out' });
    const y = gsap.quickTo(sobre, 'y', { duration: 0.7, ease: 'power3.out' });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = sobre.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const strength = Math.max(0, 1 - dist / 500); // closer cursor, stronger pull
      x((dx / dist) * PULL * strength);
      y((dy / dist) * PULL * strength);
    };
    const onLeave = () => {
      x(0);
      y(0);
    };
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    });
  }

  return () => {
    cleanups.forEach((c) => c());
    gsap.set(sobre, { clearProps: 'x,y,yPercent,rotation,transform' });
  };
};
