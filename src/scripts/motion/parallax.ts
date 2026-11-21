import { gsap, type MotionModule } from './core';

/**
 * [data-parallax="<px>"]: decorative element drifts +-px (half on narrow
 * screens) while it crosses the viewport.
 */
export const initParallax: MotionModule = (env) => {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amp = (Number(el.dataset.parallax) || 10) * (env.wide ? 1 : 0.5);
    gsap.fromTo(
      el,
      { y: amp },
      { y: -amp, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
};
