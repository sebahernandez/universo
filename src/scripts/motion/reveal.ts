import { gsap, ScrollTrigger, EASE, DUR, STAGGER, refreshWhenIdle, type MotionModule } from './core';

/**
 * Scroll reveals driven by attributes:
 *   data-motion="pegar|subir|lateral|fundido"  gesture of the element
 *   data-motion-group                          container whose [data-motion] children cascade
 *   data-motion-rotate="<deg>"                 optional tilt of "pegar" (default: alternating +-3)
 *
 * CSS hides `.motion-ok [data-motion]:not([data-motion-done])`; this module
 * animates each element once and then marks it `data-motion-done`.
 */

type Gesture = 'pegar' | 'subir' | 'lateral' | 'fundido';

// Not just [data-motion]: TextLoop uses that attribute with other values.
const GESTURES = ['pegar', 'subir', 'lateral', 'fundido'].map((g) => `[data-motion='${g}']`).join(',');

const START = 'top 94%';

const started = new WeakSet<Element>();

function sign(index: number) {
  return index % 2 === 0 ? -1 : 1;
}

function fromVars(el: HTMLElement, gesture: Gesture, index: number): gsap.TweenVars {
  switch (gesture) {
    case 'pegar': {
      const attr = el.dataset.motionRotate;
      const deg = attr !== undefined ? Number(attr) : 3;
      return { opacity: 0, y: 28, scale: 0.94, rotation: attr !== undefined ? deg : sign(index) * deg };
    }
    case 'lateral':
      return { opacity: 0, x: -28 };
    case 'fundido':
      return { opacity: 0 };
    default:
      return { opacity: 0, y: 32 };
  }
}

function easeFor(gesture: Gesture) {
  return gesture === 'pegar' ? EASE.pegar : EASE.papel;
}

function gestureOf(el: HTMLElement): Gesture {
  const g = el.dataset.motion;
  return g === 'pegar' || g === 'lateral' || g === 'fundido' ? g : 'subir';
}

function markDone(el: HTMLElement) {
  gsap.set(el, { clearProps: 'opacity,transform' });
  el.setAttribute('data-motion-done', '');
}

/** Puts an element in its final state at once. Safe to call on elements that never ran. */
export function revealNow(el: Element) {
  const node = el as HTMLElement;
  started.add(node);
  gsap.killTweensOf(node);
  markDone(node);
  node.querySelectorAll<SVGPathElement>('[data-marker-path]').forEach((path) => {
    gsap.killTweensOf(path);
    gsap.set(path, { clearProps: 'strokeDashoffset' });
  });
}

function play(el: HTMLElement, index: number, delay: number) {
  if (started.has(el)) return;
  started.add(el);
  const gesture = gestureOf(el);

  const tl = gsap.timeline({ onComplete: () => markDone(el) });
  tl.fromTo(
    el,
    fromVars(el, gesture, index),
    {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: DUR.entrada,
      delay,
      ease: easeFor(gesture),
    },
  );
  // Resolved at play time: marker.ts may have rebuilt the strokes after a resize.
  const markers = el.querySelectorAll<SVGPathElement>('[data-marker-path]');
  if (markers.length) {
    tl.fromTo(
      markers,
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut', stagger: 0.15 },
      '-=0.1',
    );
  }
}

export const initReveal: MotionModule = () => {
  const all = Array.from(document.querySelectorAll<HTMLElement>(GESTURES));
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-motion-group]'));

  const grouped = new Set<HTMLElement>();
  groups.forEach((group) => {
    const items = Array.from(group.querySelectorAll<HTMLElement>(GESTURES));
    items.forEach((i) => grouped.add(i));
    ScrollTrigger.batch(items, {
      start: START,
      interval: STAGGER,
      batchMax: 12,
      onEnter: (batch) => {
        batch.forEach((el, i) => play(el as HTMLElement, items.indexOf(el as HTMLElement), i * STAGGER));
      },
    });
  });

  all.forEach((el, index) => {
    if (grouped.has(el)) return;
    ScrollTrigger.create({
      trigger: el,
      start: START,
      onEnter: () => play(el, index, 0),
    });
  });

  // Landing past a section (anchor, restored scroll): complete everything above the viewport.
  const settle = () => {
    all.forEach((el) => {
      if (started.has(el) || el.hasAttribute('data-motion-done')) return;
      if (el.getBoundingClientRect().bottom < 0) revealNow(el);
    });
  };
  ScrollTrigger.addEventListener('refresh', settle);
  settle();
  refreshWhenIdle();
  window.addEventListener('load', refreshWhenIdle);

  return () => {
    ScrollTrigger.removeEventListener('refresh', settle);
    window.removeEventListener('load', refreshWhenIdle);
    // Back to final state: a reverted context must never leave content hidden.
    all.forEach((el) => revealNow(el));
  };
};
