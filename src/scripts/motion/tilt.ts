import { gsap, type MotionModule } from './core';

/**
 * Pointer-driven effects. Both are gated by env.finePointer in index.ts and
 * additionally ignore non-mouse pointer events.
 *
 *   data-tilt        3D tilt towards the pointer (max 8 deg), perspective lives on the grid
 *   data-tilt-zoom   optional child of a tilting card that scales slightly while hovered
 *   data-magnetic    pulls the element towards the pointer (max 8 px)
 */

const MAX_TILT = 8;
const MAX_PULL = 8;
const RETURN_S = 0.5;

const isMouse = (e: PointerEvent) => e.pointerType === 'mouse' || e.pointerType === 'pen';

export const initTilt: MotionModule = (env) => {
  if (!env.finePointer) return;
  const cleanups: Array<() => void> = [];

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const zoom = card.querySelector<HTMLElement>('[data-tilt-zoom]');

    // The entrance animation owns transform until it is done.
    const ready = () => !card.hasAttribute('data-motion') || card.hasAttribute('data-motion-done');

    // GSAP would write inline `translate: none`, which kills the card's hover elevation
    // (hover:-translate-y-0.5 uses the `translate` property). So the tilt is a CSS
    // transform driven by --rx/--ry (global.css, active while data-tilting).
    const onMove = (e: PointerEvent) => {
      if (!isMouse(e) || !ready()) return;
      const r = card.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      card.setAttribute('data-tilting', '');
      gsap.to(card, {
        '--ry': `${gsap.utils.clamp(-MAX_TILT, MAX_TILT, nx * MAX_TILT)}deg`,
        '--rx': `${gsap.utils.clamp(-MAX_TILT, MAX_TILT, -ny * MAX_TILT)}deg`,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };
    const onEnter = (e: PointerEvent) => {
      if (isMouse(e) && ready() && zoom) gsap.to(zoom, { scale: 1.06, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
    };
    const onLeave = () => {
      gsap.to(card, {
        '--rx': '0deg',
        '--ry': '0deg',
        duration: RETURN_S,
        ease: 'power3.out',
        overwrite: 'auto',
        onComplete: () => card.removeAttribute('data-tilting'),
      });
      if (zoom) gsap.to(zoom, { scale: 1, duration: RETURN_S, ease: 'power3.out', overwrite: 'auto' });
    };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointerleave', onLeave);
      card.removeAttribute('data-tilting');
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
      if (zoom) gsap.set(zoom, { clearProps: 'scale,transform' });
    });
  });

  return () => cleanups.forEach((c) => c());
};

// Same reason as the tilt: a CSS transform driven by --mx/--my (global.css, active while data-pulling),
// so the CTA keeps its hover elevation (`translate`) and other modules can clearProps without side effects.
const pull = (el: HTMLElement, x: number, y: number) => {
  if (x !== 0 || y !== 0) el.setAttribute('data-pulling', '');
  gsap.to(el, {
    '--mx': `${x}px`,
    '--my': `${y}px`,
    duration: 0.4,
    ease: 'power3.out',
    overwrite: 'auto',
    onComplete: () => {
      if (x === 0 && y === 0) el.removeAttribute('data-pulling');
    },
  });
};

export const initMagnetic: MotionModule = (env) => {
  if (!env.finePointer) return;
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]')).map((el) => ({
    el,
    near: false,
  }));
  if (!items.length) return;

  const REACH = 56; // px around the element where it starts to react

  const onMove = (e: PointerEvent) => {
    if (!isMouse(e)) return;
    items.forEach((it) => {
      const r = it.el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const inside =
        e.clientX > r.left - REACH && e.clientX < r.right + REACH && e.clientY > r.top - REACH && e.clientY < r.bottom + REACH;
      if (inside) {
        it.near = true;
        // Clamp the vector length, not each axis, so the pull never exceeds MAX_PULL.
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        const k = Math.min(1, MAX_PULL / (Math.hypot(dx, dy) || 1));
        pull(it.el, dx * k, dy * k);
      } else if (it.near) {
        it.near = false;
        pull(it.el, 0, 0);
      }
    });
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    window.removeEventListener('pointermove', onMove);
    items.forEach((it) => {
      it.el.removeAttribute('data-pulling');
      it.el.style.removeProperty('--mx');
      it.el.style.removeProperty('--my');
    });
  };
};
