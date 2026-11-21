import { gsap, refreshWhenIdle, type MotionModule } from './core';
import { initReveal } from './reveal';
import { initHero } from './hero';
import { initHeaderState } from './header';
import { initGarland } from './garland';
import { initNavMarker } from './nav-marker';
import { initMarkers } from './marker';
import { initTilt, initMagnetic } from './tilt';
import { initNosotros } from './nosotros';
import { initCutLine } from './cut-line';
import { initParallax } from './parallax';
import { initContacto } from './contacto';
import { initConfetti } from './confetti';

export * from './core';

const root = document.documentElement;

/**
 * Modules that only depend on "motion is allowed". Register new ones here.
 * Each one may return a cleanup for anything GSAP does not track itself.
 */
const motionModules: MotionModule[] = [initReveal, initNosotros, initConfetti];

/**
 * Modules that also depend on the pointer or the viewport width (env flags).
 * Pointer-driven effects must check env.finePointer.
 */
const envModules: MotionModule[] = [initHero, initTilt, initMagnetic, initCutLine, initParallax, initContacto];

function boot() {
  initHeaderState();
  initMarkers();
  initGarland();
  initNavMarker();

  const mm = gsap.matchMedia();
  const allowed = () => !root.classList.contains('motion-off');

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (!allowed()) return;
    // Covers a live switch back from "reduce" when the page loaded with it.
    root.classList.add('motion-ok');
    const cleanups = motionModules.map((m) => m({ finePointer: false, wide: false, row: false }));
    return () => {
      root.classList.remove('motion-ok');
      cleanups.forEach((c) => typeof c === 'function' && c());
    };
  });

  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      finePointer: '(hover: hover) and (pointer: fine)',
      wide: '(min-width: 64rem)',
      row: '(min-width: 48rem)',
    },
    (ctx) => {
      const { motion, finePointer, wide, row } = ctx.conditions as Record<string, boolean>;
      if (!motion || !allowed()) return;
      const cleanups = envModules.map((m) => m({ finePointer, wide, row }));
      return () => cleanups.forEach((c) => typeof c === 'function' && c());
    },
  );

  document.fonts?.ready.then(refreshWhenIdle);
  root.classList.add('motion-ready');
}

try {
  boot();
} catch (error) {
  // Never leave content hidden if the motion layer breaks.
  root.classList.remove('motion-ok');
  console.error('[motion]', error);
}
