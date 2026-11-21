import { gsap, ScrollTrigger, type MotionModule } from './core';

/**
 * "Cómo comprar": dotted cutting line with scissors tied to the scroll.
 *   [data-corte-linea]   the dotted line (clip-path wipe)
 *   [data-corte-tijera]  scissors travelling along it
 * The line is straight: horizontal when the steps sit in a row (env.row),
 * vertical beside the stacked steps otherwise. Each step gets `paso-activo`
 * when the scissors reach its centre (progress thresholds 0, 0.5, 1).
 * Without this module (reduced motion, no JS) the CSS shows the full static line.
 */
export const initCutLine: MotionModule = (env) => {
  const line = document.querySelector<HTMLElement>('[data-corte-linea]');
  const scissors = document.querySelector<HTMLElement>('[data-corte-tijera]');
  const grid = line?.parentElement;
  if (!line || !scissors || !grid) return;
  const steps = Array.from(grid.querySelectorAll<HTMLElement>('article'));
  if (steps.length < 2) return;
  const horizontal = env.row;

  // Column layout: the line runs from the centre of the first step to the centre of the last.
  const layout = () => {
    if (horizontal) return;
    const first = steps[0];
    const last = steps[steps.length - 1];
    const top = first.offsetTop + first.offsetHeight / 2;
    const bottom = last.offsetTop + last.offsetHeight / 2;
    line.style.top = `${top}px`;
    line.style.height = `${bottom - top}px`;
    line.style.bottom = 'auto';
    scissors.style.top = `${top}px`;
  };
  layout();
  ScrollTrigger.addEventListener('refreshInit', layout);

  const activate = (progress: number) => {
    steps.forEach((step, i) => {
      const threshold = i / (steps.length - 1);
      step.classList.toggle('paso-activo', threshold === 0 ? progress > 0 : progress >= threshold - 0.001);
    });
  };

  const length = () => (horizontal ? line.offsetWidth : line.offsetHeight);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: grid,
      start: 'top 75%',
      end: 'bottom 55%',
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => activate(self.progress),
    },
  });
  tl.fromTo(
    line,
    { clipPath: horizontal ? 'inset(0 100% 0 0)' : 'inset(0 0 100% 0)' },
    { clipPath: horizontal ? 'inset(0 0% 0 0)' : 'inset(0 0 0% 0)', ease: 'none', duration: 1 },
    0,
  );
  tl.fromTo(
    scissors,
    horizontal ? { x: 0 } : { y: 0 },
    horizontal ? { x: length, ease: 'none', duration: 1 } : { y: length, ease: 'none', duration: 1 },
    0,
  );

  return () => {
    ScrollTrigger.removeEventListener('refreshInit', layout);
    steps.forEach((s) => s.classList.remove('paso-activo'));
    ['top', 'height', 'bottom'].forEach((p) => {
      line.style.removeProperty(p);
    });
    scissors.style.removeProperty('top');
  };
};
