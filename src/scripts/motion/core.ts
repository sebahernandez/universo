import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger's own refresh restores the scroll position, and with
// `scroll-behavior: smooth` that cancels an in-flight scroll (anchor links).
// All refreshes go through refreshWhenIdle() instead.
ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,resize' });

export { gsap, ScrollTrigger };

/** GSAP equivalents of the CSS tokens in global.css (--ease-papel / --ease-pegar). */
export const EASE = {
  papel: 'power3.out',
  pegar: 'back.out(1.6)',
} as const;

export const DUR = {
  micro: 0.2,
  entrada: 0.7,
} as const;

/** Seconds between items of a cascade (--stagger). */
export const STAGGER = 0.08;

/** Conditions resolved by gsap.matchMedia in index.ts and passed to every module. */
export interface MotionEnv {
  /** Fine pointer with hover: gates every pointer-driven effect. */
  finePointer: boolean;
  /** min-width: 64rem */
  wide: boolean;
  /** min-width: 48rem: where the steps of "Cómo comprar" switch from a column to a row. */
  row: boolean;
}

/** A module runs inside the matchMedia context; the optional cleanup removes listeners GSAP does not track. */
export type MotionModule = (env: MotionEnv) => void | (() => void);

interface Loop {
  el: Element;
  anim: gsap.core.Animation;
  inView: boolean;
}

const loops = new Set<Loop>();
let observer: IntersectionObserver | null = null;

function syncLoop(loop: Loop) {
  loop.anim.paused(!(loop.inView && !document.hidden));
}

function onVisibility() {
  loops.forEach(syncLoop);
}

/**
 * Plays an endless decorative animation only while its element is inside the
 * viewport and the tab is visible. Create the animation paused; this helper
 * decides when it runs. Returns a function that stops managing it.
 */
export function loopWhenVisible(el: Element, anim: gsap.core.Animation): () => void {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        loops.forEach((loop) => {
          if (loop.el === entry.target) {
            loop.inView = entry.isIntersecting;
            syncLoop(loop);
          }
        });
      });
    });
    document.addEventListener('visibilitychange', onVisibility);
  }
  anim.paused(true);
  const loop: Loop = { el, anim, inView: false };
  loops.add(loop);
  observer.observe(el);
  return () => {
    loops.delete(loop);
    if (![...loops].some((l) => l.el === el)) observer?.unobserve(el);
    anim.paused(true);
  };
}

/** True when the element sits entirely above the viewport (the user landed past it). */
export function isAboveViewport(el: Element): boolean {
  return el.getBoundingClientRect().bottom < 0;
}

let lastScroll = 0;
let refreshTimer: number | undefined;
window.addEventListener('scroll', () => (lastScroll = performance.now()), { passive: true });

/** Refreshes ScrollTrigger once the page has stopped scrolling (smooth anchor scrolls included). */
export function refreshWhenIdle() {
  window.clearTimeout(refreshTimer);
  const tick = () => {
    if (performance.now() - lastScroll < 200) refreshTimer = window.setTimeout(tick, 100);
    else ScrollTrigger.refresh();
  };
  refreshTimer = window.setTimeout(tick, 250);
}
