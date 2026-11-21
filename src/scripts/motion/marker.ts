/**
 * Marker strokes under highlighted title spans ([data-resaltado]).
 * One decorative SVG per line fragment, positioned inside the parent element
 * so it travels with the title's own entrance. reveal.ts draws the paths
 * ([data-marker-path]) with stroke-dashoffset. Runs with or without motion:
 * without it the strokes are simply static.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
const PATH = 'M3 7 C 40 2, 70 11, 110 6 S 170 3, 197 7';

function strokeLayer(host: HTMLElement) {
  let layer = host.querySelector<HTMLElement>(':scope > [data-marker-layer]');
  if (!layer) {
    layer = document.createElement('span');
    layer.setAttribute('data-marker-layer', '');
    layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = 'position:absolute;inset:0;z-index:-1;pointer-events:none';
    host.append(layer);
  }
  return layer;
}

function buildStroke(left: number, top: number, width: number, height: number) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 200 12');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = `position:absolute;left:${left}px;top:${top}px;width:${width}px;height:${height}px;color:var(--color-lila-fuerte);overflow:visible`;
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', PATH);
  path.setAttribute('pathLength', '100');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '4');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('data-marker-path', '');
  path.classList.add('resaltado__trazo');
  svg.append(path);
  return svg;
}

function layout(span: HTMLElement) {
  const host = span.parentElement;
  if (!host) return;
  host.classList.add('resaltado__host');

  // Measure without the entrance transform so positions are the laid-out ones.
  const previous = host.style.transform;
  host.style.transform = 'none';
  const hostRect = host.getBoundingClientRect();
  const rects = Array.from(span.getClientRects());
  const fontSize = parseFloat(getComputedStyle(span).fontSize);
  host.style.transform = previous;

  const layer = strokeLayer(host);
  layer.replaceChildren(
    ...rects.map((r) => {
      const height = fontSize * 0.26;
      const top = r.bottom - hostRect.top + fontSize * 0.14 - height;
      return buildStroke(r.left - hostRect.left, top, r.width, height);
    }),
  );
}

export function initMarkers(): void {
  const spans = Array.from(document.querySelectorAll<HTMLElement>('[data-resaltado]'));
  if (!spans.length) return;

  const run = () => spans.forEach(layout);
  run();

  let timer: number | undefined;
  window.addEventListener('resize', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, 150);
  });
  window.addEventListener('load', run);
  document.fonts?.ready.then(run);
}
