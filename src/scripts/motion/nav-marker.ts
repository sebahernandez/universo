import { gsap } from './core';

/**
 * Active-section sticker marker in the desktop menu (D14).
 * - On the home, an IntersectionObserver on the sections linked by the menu
 *   decides the active link (aria-current="location").
 * - The marker slides to the active link; hovering or focusing another link
 *   makes it follow, and it returns to the active one on leave.
 * - On pages without those sections it only appears while a link is hovered/focused.
 * - With reduced motion it jumps instead of sliding.
 */
export function initNavMarker(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const list = header?.querySelector<HTMLElement>('.nav-list');
  const marker = list?.querySelector<HTMLElement>('.nav-marker');
  if (!header || !list || !marker) return;

  const links = Array.from(list.querySelectorAll<HTMLAnchorElement>('a.nav-link'));
  header.setAttribute('data-marker', 'on');

  const onHome = location.pathname === '/';
  const sections = new Map<HTMLAnchorElement, HTMLElement>();
  if (onHome) {
    links.forEach((a) => {
      const id = new URL(a.href).hash.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) sections.set(a, el);
    });
  }

  const slides = () => window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  let active: HTMLAnchorElement | null = null;
  let hovered: HTMLAnchorElement | null = null;
  let visible = false;

  function box(a: HTMLAnchorElement) {
    const l = list!.getBoundingClientRect();
    const r = a.getBoundingClientRect();
    return { x: r.left - l.left - 12, y: r.top - l.top - 7, width: r.width + 24, height: r.height + 14 };
  }

  function update(instant = false) {
    const target = hovered ?? active;
    if (!target || list!.offsetParent === null) {
      if (visible) gsap.to(marker!, { opacity: 0, duration: slides() ? 0.2 : 0, overwrite: 'auto' });
      visible = false;
      return;
    }
    const rotation = links.indexOf(target) % 2 === 0 ? -2.5 : 2;
    const to = { ...box(target), rotation };
    if (!visible || instant || !slides()) {
      gsap.set(marker!, { ...to, opacity: 1 });
      visible = true;
      return;
    }
    gsap.to(marker!, { ...to, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', overwrite: 'auto' });
  }

  function setActive(a: HTMLAnchorElement | null) {
    if (a === active) return;
    active = a;
    links.forEach((l) => (l === a ? l.setAttribute('aria-current', 'location') : l.removeAttribute('aria-current')));
    update();
  }

  if (sections.size) {
    const inBand = new Set<HTMLElement>();
    const order = Array.from(sections.entries());
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inBand.add(e.target as HTMLElement) : inBand.delete(e.target as HTMLElement)));
        const hit = order.find(([, el]) => inBand.has(el));
        if (hit) setActive(hit[0]); // between linked sections the last active one stays
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    order.forEach(([, el]) => io.observe(el));
  }

  links.forEach((a) => {
    a.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      hovered = a;
      update();
    });
    a.addEventListener('focus', () => {
      hovered = a;
      update();
    });
    a.addEventListener('blur', () => {
      if (hovered === a) hovered = null;
      update();
    });
  });
  list.addEventListener('pointerleave', () => {
    hovered = null;
    update();
  });

  new ResizeObserver(() => update(true)).observe(list);
  document.fonts?.ready.then(() => update(true));
}
