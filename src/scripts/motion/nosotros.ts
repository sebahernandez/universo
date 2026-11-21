import { gsap, ScrollTrigger, type MotionModule } from './core';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

/**
 * Words of [data-iluminar] go from dimmed to full contrast as the block
 * scrolls through the viewport. SplitText keeps the full text for assistive
 * technology: aria is left untouched ('none') because SplitText's default
 * aria-label on a <p> is ignored by screen readers and would hide the text.
 *
 * DIMMED is the opacity floor. #2b2436 text over the section background
 * (#fbf9fd .. #e3f4fd) gives 4.55:1 / 4.41:1 at 0.64 and 4.83:1 / 4.68:1 at
 * 0.66, so 0.66 clears WCAG AA (4.5:1) on both ends of the gradient.
 */
const DIMMED = 0.66;

export const initNosotros: MotionModule = () => {
  const blocks = Array.from(document.querySelectorAll<HTMLElement>('[data-iluminar]'));
  if (!blocks.length) return;

  const splits: SplitText[] = [];
  blocks.forEach((block) => {
    const paragraphs = Array.from(block.querySelectorAll<HTMLElement>('p'));
    const words: Element[] = [];
    paragraphs.forEach((p) => {
      const split = SplitText.create(p, { type: 'words', wordsClass: 'iluminar-palabra', aria: 'none' });
      splits.push(split);
      words.push(...split.words);
    });

    gsap.fromTo(
      words,
      { opacity: DIMMED },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: { trigger: block, start: 'top 80%', end: 'bottom 55%', scrub: true },
      },
    );
  });

  return () => splits.forEach((s) => s.revert());
};
