import Lenis from 'lenis';
import { prefersReducedMotion } from '../components/Motion.jsx';

// One Lenis instance for the whole site. Skipped entirely for reduced-motion users,
// so they get native scrolling.
let lenis = null;

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({
    // Exponential ease-out: quick to respond, long soft landing.
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 0.95,
    touchMultiplier: 1.2,
    anchors: { offset: -96 },
  });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function scrollToTop({ smooth = false } = {}) {
  if (lenis) lenis.scrollTo(0, { immediate: !smooth, force: true });
  else window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
}

export function scrollToElement(el) {
  if (lenis) lenis.scrollTo(el, { offset: -96 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Freeze page scrolling (e.g. while the full-screen menu is open). */
export function lockScroll(locked) {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
