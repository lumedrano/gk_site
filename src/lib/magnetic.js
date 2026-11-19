import { prefersReducedMotion } from '../components/Motion.jsx';

/**
 * Buttons lean gently toward the cursor while it's over them, then settle back.
 * One delegated listener covers every `.btn` (and anything marked `data-magnetic`).
 * Mouse/trackpad only; skipped for touch and reduced-motion users.
 */
let started = false;

export function initMagnetic() {
  if (started) return;
  started = true;
  if (prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let active = null;
  const release = (el) => {
    el.style.transform = '';
  };

  document.addEventListener(
    'pointermove',
    (e) => {
      const el = e.target.closest?.('.btn, [data-magnetic]');
      if (active && active !== el) release(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `translate3d(${(x * 6).toFixed(1)}px, ${(y * 4).toFixed(1)}px, 0)`;
    },
    { passive: true }
  );
  document.addEventListener('pointerleave', () => active && release(active));
}
