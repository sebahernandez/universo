/**
 * Functional state of the header island. Runs regardless of the motion
 * preference: the stronger shadow is required by site-navigation.
 */
export function initHeaderState(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header || !('IntersectionObserver' in window)) return;

  // 1px sentinel near the top of the document; works with and without a Hero.
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText =
    'position:absolute;top:24px;left:0;width:1px;height:1px;pointer-events:none;visibility:hidden';
  document.body.prepend(sentinel);

  new IntersectionObserver((entries) => {
    const last = entries[entries.length - 1];
    header.setAttribute('data-scrolled', String(!last.isIntersecting));
  }).observe(sentinel);
}
