/**
 * GSAP Animation Utility Library
 * Centralised, reusable animation presets for TechPlus Architecture Studio
 * All animations clean up via gsap.context() — safe in React
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Easing Presets ──────────────────────────────────────────── */
export const EASE = {
  smooth: 'power3.out',
  expo: 'expo.out',
  back: 'back.out(1.4)',
  elastic: 'elastic.out(1, 0.4)',
  circ: 'circ.out',
} as const;

/* ─── Shared Defaults ─────────────────────────────────────────── */
const ST_DEFAULTS = {
  start: 'top 88%',
  toggleActions: 'play none none none',
} as const;

/* ─── Fade-Up Reveal ──────────────────────────────────────────── */
export function fadeUpReveal(
  targets: gsap.TweenTarget,
  trigger: Element,
  opts: {
    delay?: number;
    stagger?: number;
    duration?: number;
    start?: string;
    y?: number;
    scrub?: boolean | number;
  } = {}
) {
  const {
    delay = 0,
    stagger = 0,
    duration = 0.9,
    start = ST_DEFAULTS.start,
    y = 36,
    scrub = false,
  } = opts;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: EASE.smooth,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: scrub ? undefined : 'play none none none',
        scrub: scrub || undefined,
      },
    }
  );
}

/* ─── Clip-Path Reveal (Bottom to Up) ────────────────────────── */
export function clipRevealAnim(
  targets: gsap.TweenTarget,
  trigger: Element,
  opts: {
    delay?: number;
    stagger?: number;
    duration?: number;
    start?: string;
  } = {}
) {
  const { delay = 0, stagger = 0, duration = 1.2, start = ST_DEFAULTS.start } = opts;

  return gsap.fromTo(
    targets,
    { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: EASE.expo,
      scrollTrigger: { trigger, start, toggleActions: 'play none none none' },
    }
  );
}

/* ─── Scale-Up Reveal ─────────────────────────────────────────── */
export function scaleReveal(
  targets: gsap.TweenTarget,
  trigger: Element,
  opts: {
    delay?: number;
    stagger?: number;
    from?: number;
    duration?: number;
    start?: string;
  } = {}
) {
  const { delay = 0, stagger = 0.08, from = 0.88, duration = 1, start = ST_DEFAULTS.start } = opts;

  return gsap.fromTo(
    targets,
    { opacity: 0, scale: from },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: EASE.smooth,
      scrollTrigger: { trigger, start, toggleActions: 'play none none none' },
    }
  );
}

/* ─── Line Draw (Horizontal separator) ───────────────────────── */
export function lineDrawReveal(
  targets: gsap.TweenTarget,
  trigger: Element,
  opts: { delay?: number; duration?: number; start?: string } = {}
) {
  const { delay = 0.2, duration = 1, start = ST_DEFAULTS.start } = opts;

  return gsap.fromTo(
    targets,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration,
      delay,
      ease: EASE.expo,
      scrollTrigger: { trigger, start, toggleActions: 'play none none none' },
    }
  );
}

/* ─── Parallax Float ──────────────────────────────────────────── */
export function parallaxFloat(
  target: gsap.TweenTarget,
  trigger: Element,
  yPercent = -15
) {
  return gsap.fromTo(
    target,
    { yPercent: 0 },
    {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    }
  );
}

/* ─── Stagger Card Reveal ─────────────────────────────────────── */
export function staggerCards(
  targets: gsap.TweenTarget,
  trigger: Element,
  opts: {
    stagger?: number;
    y?: number;
    duration?: number;
    start?: string;
    delay?: number;
  } = {}
) {
  const { stagger = 0.1, y = 40, duration = 0.85, start = 'top 85%', delay = 0 } = opts;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: EASE.smooth,
      scrollTrigger: { trigger, start, toggleActions: 'play none none none' },
    }
  );
}

/* ─── Hero Cinematic Entrance ─────────────────────────────────── */
export function heroEntrance(elements: {
  label?: Element | null;
  heading?: Element | null;
  sub?: Element | null;
  cta?: Element | null;
}) {
  const tl = gsap.timeline({ defaults: { ease: EASE.expo } });

  if (elements.label) {
    tl.fromTo(
      elements.label,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7 },
      0.4
    );
  }

  if (elements.heading) {
    tl.fromTo(
      elements.heading,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      0.6
    );
  }

  if (elements.sub) {
    tl.fromTo(
      elements.sub,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.9
    );
  }

  if (elements.cta) {
    tl.fromTo(
      elements.cta,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7 },
      1.1
    );
  }

  return tl;
}
