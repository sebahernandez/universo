/**
 * Paper confetti on a throw-away <canvas>. No dependencies (no gsap).
 *
 *   burst({ x, y })   short fan from a point (CTA click)
 *   celebrate()       full celebration (/gracias)
 *   initConfetti()    delegated click on [data-confetti]; never preventDefault
 *
 * The canvas is created on demand, fixed, full screen, aria-hidden and
 * pointer-events: none, and removed when no particle is left (particles live
 * at most LIFE_MS, so the canvas is gone within ~2.6 s of the last burst).
 * Nothing happens under prefers-reduced-motion.
 */

const LIFE_MS = 2600;
const THEME_COLORS = ['rosa', 'lila', 'celeste', 'menta', 'amarillo', 'durazno'].map((n) => `--color-${n}-fuerte`);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  color: string;
  shape: 'rect' | 'circle' | 'streamer';
  born: number;
  life: number;
}

let canvas: HTMLCanvasElement | null = null;
let ctx2d: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let raf = 0;
let last = 0;
let palette: string[] = [];

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cap = () => (window.matchMedia('(max-width: 767px)').matches ? 80 : 160);
const rand = (a: number, b: number) => a + Math.random() * (b - a);

function readPalette() {
  const css = getComputedStyle(document.documentElement);
  const colors = THEME_COLORS.map((v) => css.getPropertyValue(v).trim()).filter(Boolean);
  return colors.length ? colors : ['#f7a8c4', '#b9a7f0', '#9fd8f2', '#8fe0c4', '#f6d36b', '#f7b58a'];
}

function ensureCanvas() {
  if (canvas) return;
  canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.setAttribute('data-confetti-canvas', '');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60';
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx2d = canvas.getContext('2d');
  ctx2d?.scale(dpr, dpr);
  document.body.append(canvas);
  palette = readPalette();
}

function teardown() {
  cancelAnimationFrame(raf);
  raf = 0;
  canvas?.remove();
  canvas = null;
  ctx2d = null;
  particles = [];
}

function frame(now: number) {
  if (!canvas || !ctx2d) return;
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  ctx2d.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles = particles.filter((p) => now - p.born < p.life && p.y < window.innerHeight + 40);
  for (const p of particles) {
    p.vx *= 1 - 1.6 * dt; // drag
    p.vy = p.vy * (1 - 1.2 * dt) + 900 * dt; // drag + gravity
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.vr * dt;
    const age = (now - p.born) / p.life;
    ctx2d.globalAlpha = age > 0.7 ? Math.max(0, 1 - (age - 0.7) / 0.3) : 1;
    ctx2d.fillStyle = p.color;
    ctx2d.save();
    ctx2d.translate(p.x, p.y);
    ctx2d.rotate(p.rot);
    if (p.shape === 'circle') {
      ctx2d.beginPath();
      ctx2d.arc(0, 0, p.w / 2, 0, Math.PI * 2);
      ctx2d.fill();
    } else {
      ctx2d.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
    ctx2d.restore();
  }

  if (particles.length === 0) teardown();
  else raf = requestAnimationFrame(frame);
}

interface BurstOptions {
  x: number;
  y: number;
  count?: number;
  /** Fan direction in radians (default straight up) and half-width of the fan. */
  angle?: number;
  spread?: number;
  power?: number;
}

export function burst({ x, y, count = 36, angle = -Math.PI / 2, spread = 0.9, power = 1 }: BurstOptions): void {
  if (reduced()) return;
  const room = cap() - particles.length;
  if (room <= 0) return;
  ensureCanvas();
  const n = Math.min(count, room);
  const now = performance.now();
  for (let i = 0; i < n; i++) {
    const a = angle + rand(-spread, spread);
    const speed = rand(380, 900) * power;
    const shape = Math.random() < 0.25 ? 'circle' : Math.random() < 0.3 ? 'streamer' : 'rect';
    particles.push({
      x,
      y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      rot: rand(0, Math.PI * 2),
      vr: rand(-9, 9),
      w: shape === 'streamer' ? rand(3, 5) : rand(6, 11),
      h: shape === 'streamer' ? rand(16, 26) : rand(6, 11),
      color: palette[Math.floor(Math.random() * palette.length)],
      shape,
      born: now,
      life: rand(LIFE_MS * 0.7, LIFE_MS),
    });
  }
  if (!raf) {
    last = now;
    raf = requestAnimationFrame(frame);
  }
}

/** Two fans from the lower corners plus a delayed centre burst. */
export function celebrate(): void {
  if (reduced()) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const count = w < 768 ? 30 : 60; // two fans + centre burst stay within the live cap (80 / 160)
  burst({ x: 0, y: h, count, angle: -Math.PI / 3, spread: 0.45, power: 1.3 });
  burst({ x: w, y: h, count, angle: (-2 * Math.PI) / 3, spread: 0.45, power: 1.3 });
  window.setTimeout(() => burst({ x: w / 2, y: h * 0.4, count: w < 768 ? 20 : 40, spread: Math.PI, power: 0.8 }), 350);
}

export function initConfetti(): () => void {
  const onClick = (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-confetti]');
    if (!el) return;
    // Enter on a link also fires `click`, but with clientX/Y = 0: always use the element itself.
    const r = el.getBoundingClientRect();
    burst({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };
  document.addEventListener('click', onClick);
  return () => {
    document.removeEventListener('click', onClick);
    teardown();
  };
}

// Hooks for manual checks from the console and for the /gracias page.
declare global {
  interface Window {
    ucConfetti?: { burst: typeof burst; celebrate: typeof celebrate; live: () => number };
  }
}
window.ucConfetti = { burst, celebrate, live: () => particles.length };
