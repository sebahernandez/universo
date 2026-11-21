import { gsap } from './core';

/**
 * Bunting garland under the header island ([data-garland]), the signature of
 * the navbar (D14). Decorative: aria-hidden, pointer-events none.
 *
 * - Pennants hang from a catenary string. Each has a pale grey layer under a
 *   coloured one; scroll progress colours them left to right, continuously
 *   (a hard-edged gradient per pennant). Short pages show it fully coloured.
 * - Sway: one damped spring per pennant, fed by scroll velocity (opposite to
 *   the direction of scrolling) and by the pointer crossing the island. The
 *   GSAP ticker only runs while there is energy.
 * - The conic ring around the island (--aro, see global.css) turns with the scroll.
 * - Without motion (reduced, or the module failing) everything stays still and coloured.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
const PALETTE = ['rosa', 'celeste', 'menta', 'amarillo', 'lila', 'durazno'];
const FALLBACK = ['#f7a8c4', '#9fd8f2', '#8fe0c4', '#f6d36b', '#b9a7f0', '#f7b58a'];
const PALE = '#cfc7df';
const MAX_ANGLE = 35;
const DAMPING = 10;
const RING_DEG_PER_PX = 0.25;

interface Pennant {
  x: number;
  y: number;
  width: number;
  node: SVGGElement;
  stops: [SVGStopElement, SVGStopElement];
  k: number;
  gain: number;
  angle: number;
  vel: number;
}

const set = (el: Element, attrs: Record<string, string | number>) => {
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
};
const make = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number> = {}) =>
  set(document.createElementNS(SVG_NS, tag), attrs) as SVGElementTagNameMap[K];

export function initGarland(): void {
  const host = document.querySelector<HTMLElement>('[data-garland]');
  const nav = host?.closest<HTMLElement>('.site-nav');
  if (!host || !nav) return;

  const root = document.documentElement;
  const noPreference = window.matchMedia('(prefers-reduced-motion: no-preference)');
  const canMove = () => noPreference.matches && !root.classList.contains('motion-off');

  const css = getComputedStyle(root);
  const colors = PALETTE.map((n, i) => css.getPropertyValue(`--color-${n}-fuerte`).trim() || FALLBACK[i]);

  let pennants: Pennant[] = [];
  let width = 0;
  let introTimer = 0;
  let firstBuild = true;

  // ---- state shared with the ticker ----
  let progress = 1;
  let dirty = false;
  let lastY = window.scrollY;
  let lastScrollAt = 0;
  let smoothV = 0;
  let ticking = false;

  const maxScroll = () => Math.max(0, root.scrollHeight - window.innerHeight);

  function applyProgress() {
    pennants.forEach((p) => {
      const f = Math.min(1, Math.max(0, (progress * width - (p.x - p.width / 2)) / p.width));
      p.stops[0].setAttribute('offset', String(f));
      p.stops[1].setAttribute('offset', String(f));
    });
  }

  function render() {
    pennants.forEach((p) => p.node.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${p.angle.toFixed(2)})`));
  }

  function build() {
    width = host!.clientWidth;
    if (width < 80) return;
    const mobile = width < 560;
    // Swags between anchor points, like real bunting. Depth (sag + pennant) stays under ~28 px so the
    // garland never reaches the Hero badge that sits just below the island.
    const swags = mobile ? 2 : 3;
    const perSwag = mobile ? 4 : 5;
    const sag = mobile ? 7 : 9;
    const pw = mobile ? 18 : 24;
    const ph = mobile ? 17 : 19;
    const y0 = 2;
    const sw = width / swags;
    const height = y0 + sag + ph + 4;

    const svg = make('svg', { width, height, viewBox: `0 0 ${width} ${height}`, focusable: 'false', 'aria-hidden': 'true' });
    svg.style.overflow = 'visible';
    const defs = make('defs');
    svg.append(defs);
    let d = `M0 ${y0}`;
    for (let sI = 0; sI < swags; sI++) d += ` Q${sw * sI + sw / 2} ${y0 + 2 * sag} ${sw * (sI + 1)} ${y0}`;
    svg.append(make('path', { d, fill: 'none', stroke: '#fff', 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.85 }));
    svg.append(make('path', { d, fill: 'none', stroke: 'rgb(43 36 54 / 0.62)', 'stroke-width': 1.8, 'stroke-linecap': 'round' }));
    for (let sI = 0; sI <= swags; sI++) svg.append(make('circle', { cx: sw * sI, cy: y0, r: 3, fill: colors[(sI * 2 + 1) % colors.length], stroke: '#fff', 'stroke-width': 1.5 }));

    pennants = [];
    const n = swags * perSwag;
    for (let i = 0; i < n; i++) {
      const sI = Math.floor(i / perSwag);
      const j = i % perSwag;
      const t = (j + 0.5) / perSwag;
      const x = sw * sI + t * sw;
      const y = y0 + 4 * sag * t * (1 - t);
      const color = colors[i % colors.length];
      const grad = make('linearGradient', { id: `gp${i}`, x1: 0, y1: 0, x2: 1, y2: 0 });
      const s1 = make('stop', { offset: 0, 'stop-color': color });
      const s2 = make('stop', { offset: 1, 'stop-color': color });
      const s3 = make('stop', { offset: 1, 'stop-color': PALE });
      const s4 = make('stop', { offset: 1, 'stop-color': PALE });
      grad.append(s1, s2, s3, s4);
      defs.append(grad);

      const outer = make('g', { class: 'pen' });
      outer.style.setProperty('transform-origin', `${x}px ${y}px`);
      outer.style.setProperty('--d', `${i * 20}ms`);
      const node = make('g', { transform: `translate(${x} ${y}) rotate(0)` });
      const shape = `M${-pw / 2} 0 L${pw / 2} 0 L0 ${ph} Z`;
      node.append(
        make('path', { d: shape, fill: '#fff', stroke: '#fff', 'stroke-width': 4.5, 'stroke-linejoin': 'round' }),
        make('path', { d: shape, fill: `url(#gp${i})`, stroke: `url(#gp${i})`, 'stroke-width': 2, 'stroke-linejoin': 'round' }),
        make('path', { d: `M${-pw / 2 + 3} 3.5 L${pw / 2 - 3} 3.5`, stroke: '#fff', 'stroke-opacity': 0.55, 'stroke-width': 1.4, 'stroke-linecap': 'round' }),
      );
      outer.append(node);
      svg.append(outer);
      pennants.push({ x, y, width: pw, node, stops: [s2, s3], k: 130 + ((i * 53) % 130), gain: 0.8 + ((i * 29) % 40) / 100, angle: 0, vel: 0 });
    }

    host!.replaceChildren(svg);
    host!.setAttribute('data-js', '');
    if (firstBuild && canMove() && root.classList.contains('motion-ok') && !root.classList.contains('nav-settled')) {
      host!.setAttribute('data-intro', '');
      window.clearTimeout(introTimer);
      introTimer = window.setTimeout(() => host!.removeAttribute('data-intro'), 1600);
    }
    firstBuild = false;
    progress = canMove() && maxScroll() > 0 ? window.scrollY / maxScroll() : 1;
    applyProgress();
    render();
  }

  // ---- motion ----
  function tick(_time: number, deltaMs: number) {
    const dt = Math.min(deltaMs, 50) / 1000;
    const y = window.scrollY;
    const v = (y - lastY) / dt;
    lastY = y;
    smoothV += (v - smoothV) * 0.3;
    const input = -Math.tanh(smoothV / 1500) * 27;

    let energy = 0;
    pennants.forEach((p) => {
      p.vel += (-p.k * (p.angle - input * p.gain) - DAMPING * p.vel) * dt;
      p.angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, p.angle + p.vel * dt));
      energy += Math.abs(p.angle - input * p.gain) + Math.abs(p.vel) * 0.1;
    });
    render();

    if (dirty) {
      dirty = false;
      applyProgress();
    }
    if (energy < 0.4 && Math.abs(smoothV) < 5 && performance.now() - lastScrollAt > 200) {
      pennants.forEach((p) => {
        p.angle = 0;
        p.vel = 0;
      });
      render();
      stop();
    }
  }
  function wake() {
    if (ticking) return;
    ticking = true;
    lastY = window.scrollY;
    gsap.ticker.add(tick);
  }
  function stop() {
    ticking = false;
    gsap.ticker.remove(tick);
  }

  let ringFrame = 0;
  function onScroll() {
    if (!canMove()) return;
    lastScrollAt = performance.now();
    progress = maxScroll() > 0 ? Math.min(1, window.scrollY / maxScroll()) : 1;
    dirty = true;
    wake();
    if (!ringFrame) {
      ringFrame = requestAnimationFrame(() => {
        ringFrame = 0;
        nav!.style.setProperty('--aro', `${(window.scrollY * RING_DEG_PER_PX).toFixed(1)}deg`);
      });
    }
  }

  let lastX = 0;
  function onPointer(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || !canMove() || !pennants.length) return;
    const left = host!.getBoundingClientRect().left;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    if (Math.abs(dx) < 1 || Math.abs(dx) > 200) return;
    pennants.forEach((p) => {
      const d = Math.abs(left + p.x - e.clientX);
      if (d < 110) p.vel += Math.max(-140, Math.min(140, dx * 3.2)) * (1 - d / 110);
    });
    wake();
  }

  function settleStatic() {
    stop();
    progress = 1;
    pennants.forEach((p) => {
      p.angle = 0;
      p.vel = 0;
    });
    applyProgress();
    render();
    nav!.style.removeProperty('--aro');
  }

  build();
  new ResizeObserver(() => {
    if (host.clientWidth !== width) build();
  }).observe(host);
  window.addEventListener('scroll', onScroll, { passive: true });
  nav.addEventListener('pointermove', onPointer);
  noPreference.addEventListener('change', () => {
    if (canMove()) {
      progress = maxScroll() > 0 ? window.scrollY / maxScroll() : 1;
      applyProgress();
    } else settleStatic();
  });
  document.fonts?.ready.then(() => {
    if (canMove()) onScroll();
  });
  if (canMove()) {
    progress = maxScroll() > 0 ? window.scrollY / maxScroll() : 1;
    applyProgress();
  }
}
