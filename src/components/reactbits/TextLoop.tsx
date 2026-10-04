// Adapted from React Bits Text Loop (TypeScript + CSS):
// https://reactbits.dev/text-animations/text-loop
// Copyright (c) 2026 David Haz. See TextLoop.LICENSE.md.
// Adds responsive geometry, SSR fallback and motion preference support.
import { useEffect, useId, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './TextLoop.css';

interface TextLoopProps {
  text: string;
  speed?: number;
  separator?: string;
}

export default function TextLoop({ text, speed = 60, separator = '✦' }: TextLoopProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const headRef = useRef<SVGTextPathElement>(null);
  const tailRef = useRef<SVGTextPathElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const phaseRef = useRef(0);
  const [size, setSize] = useState({ width: 1200, height: 164 });
  const [metrics, setMetrics] = useState<{ length: number; reps: number } | null>(null);
  const [hoverPause, setHoverPause] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const pathId = `text-loop-${useId().replace(/:/g, '')}`;
  const unit = `${text}\u00a0${separator}\u00a0`;
  const ready = metrics !== null;
  const canPlay = ready && speed > 0 && !hoverPause && !reducedMotion && visible && documentVisible;
  const playbackRef = useRef(canPlay);
  playbackRef.current = canPlay;

  // Coordinates match the rendered viewport: glyphs never shrink with the SVG.
  const step = Math.max(240, Math.min(360, size.width / 3));
  const center = size.height / 2;
  const amplitude = size.height * 0.2;
  const turns = Math.ceil(size.width / step) + 2;
  let d = `M ${-step} ${center} Q ${-step / 2} ${center - amplitude * 2} 0 ${center}`;
  for (let i = 1; i <= turns; i++) d += ` T ${step * i} ${center}`;

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setSize(previous => previous.width === width && previous.height === height ? previous : { width, height });
      }
    });
    observer.observe(stage);
    const intersection = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    intersection.observe(root);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updatePreference();
    updateVisibility();
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      intersection.disconnect();
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      try {
        const length = pathRef.current?.getTotalLength() ?? 0;
        const width = measureRef.current?.getComputedTextLength() ?? 0;
        if (!Number.isFinite(length) || !Number.isFinite(width) || length <= 0 || width <= 0) {
          setMetrics(null);
          return;
        }
        // Whole units give a seamless cycle without stretching the letter spacing.
        const reps = Math.ceil(length / width) + 1;
        const loopLength = width * reps;
        setMetrics(previous => previous?.length === loopLength && previous.reps === reps ? previous : { length: loopLength, reps });
      } catch {
        setMetrics(null);
      }
    };
    measure();
    document.fonts.ready.then(measure).catch(() => {});
    document.fonts.addEventListener('loadingdone', measure);
    return () => {
      cancelled = true;
      document.fonts.removeEventListener('loadingdone', measure);
    };
  }, [d, unit, size.width]);

  useEffect(() => {
    const head = headRef.current;
    const tail = tailRef.current;
    if (!metrics || !head || !tail) return;
    const { length } = metrics;
    const state = { offset: 0 };
    const apply = () => {
      phaseRef.current = state.offset / length;
      head.setAttribute('startOffset', String(state.offset));
      tail.setAttribute('startOffset', String(state.offset - length));
    };
    if (speed <= 0) {
      state.offset = phaseRef.current * length;
      apply();
      return;
    }
    const tween = gsap.to(state, {
      offset: length,
      duration: length / speed,
      ease: 'none',
      repeat: -1,
      paused: true,
      onUpdate: apply,
    });
    tweenRef.current = tween;
    tween.progress(phaseRef.current, false);
    apply();
    if (playbackRef.current) tween.play();
    return () => {
      tween.kill();
      tweenRef.current = null;
    };
  }, [metrics, speed]);

  useEffect(() => {
    tweenRef.current?.paused(!canPlay);
  }, [canPlay]);

  return (
    <div ref={rootRef} className="text-loop" data-ready={ready} data-motion={canPlay ? 'playing' : 'paused'}>
      <div
        ref={stageRef}
        className="text-loop-stage"
        onPointerEnter={event => { if (event.pointerType === 'mouse') setHoverPause(true); }}
        onPointerLeave={event => { if (event.pointerType === 'mouse') setHoverPause(false); }}
      >
        <p className="text-loop-fallback">{text}</p>
        <svg className="text-loop-svg" viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true" focusable="false">
          <path ref={pathRef} id={pathId} d={d} className="text-loop-ribbon" fill="none" strokeWidth={size.width < 768 ? 48 : 64} />
          <text ref={measureRef} className="text-loop-text text-loop-measure">{unit}</text>
          {[headRef, tailRef].map((ref, index) => (
            <text key={index} className="text-loop-text" dominantBaseline="central">
              <textPath ref={ref} href={`#${pathId}`} startOffset={index === 0 ? 0 : -(metrics?.length ?? 0)}>
                {unit.repeat(metrics?.reps ?? 1)}
              </textPath>
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
