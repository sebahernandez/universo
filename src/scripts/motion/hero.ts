import { gsap, loopWhenVisible, refreshWhenIdle, type MotionModule } from './core';

/** Safe travel at scale 1.12: (1.12 - 1) / 2 = 6% of the element height on each side. */
const BG_SCALE = 1.12;
const POINTER_REACH = [8, 16, 28]; // px per layer, far to near

export const initHero: MotionModule = (env) => {
  const hero = document.getElementById('inicio');
  if (!hero) return;

  const cleanups: Array<() => void> = [];

  // Background parallax: moves down while the page moves up, so it travels slower than the text.
  const bgs = hero.querySelectorAll<HTMLElement>('[data-hero-bg]');
  if (bgs.length) {
    gsap.set(bgs, { scale: BG_SCALE });
    gsap.to(bgs, {
      yPercent: env.wide ? 5 : 2.5,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  // Paper pieces: endless float, paused while the Hero is off screen or the tab is hidden.
  const pieces = Array.from(hero.querySelectorAll<HTMLElement>('[data-papel]'));
  pieces.forEach((piece, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    const tween = gsap.to(piece, {
      y: dir * (8 + (i % 3) * 5),
      x: -dir * (3 + (i % 2) * 3),
      rotation: `+=${dir * (8 + (i % 4) * 3)}`,
      duration: 2.6 + (i % 4) * 0.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
    cleanups.push(loopWhenVisible(hero, tween));
  });

  // Pointer depth: nearer layers travel further. Fine pointers only.
  if (env.finePointer) {
    const layers = Array.from(hero.querySelectorAll<HTMLElement>('[data-papel-layer]'));
    const movers = layers.map((layer, i) => {
      const reach = POINTER_REACH[i] ?? 0;
      return {
        reach,
        x: gsap.quickTo(layer, 'x', { duration: 0.8, ease: 'power3.out' }),
        y: gsap.quickTo(layer, 'y', { duration: 0.8, ease: 'power3.out' }),
      };
    });

    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      movers.forEach((m) => {
        m.x(-nx * m.reach);
        m.y(-ny * m.reach);
      });
    };
    const onLeave = () =>
      movers.forEach((m) => {
        m.x(0);
        m.y(0);
      });

    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    });
  }

  refreshWhenIdle();
  return () => cleanups.forEach((c) => c());
};
