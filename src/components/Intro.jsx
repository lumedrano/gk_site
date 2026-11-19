import { useEffect, useState } from 'react';
import { agent } from '../content/site.js';
import { prefersReducedMotion } from './Motion.jsx';
import mark from '../assets/brand/highland-mark.png';

const KEY = 'gk-intro-seen';

const firstVisit = (() => {
  try {
    return !prefersReducedMotion() && !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
})();

/** Extra delay (ms) for above-the-fold animations so they play as the intro curtain lifts. */
export const introDelay = () => (firstVisit && performance.now() < 3000 ? 1600 : 0);

/** Brief branded curtain on the first page view of a session. */
export default function Intro() {
  const [stage, setStage] = useState(() => {
    try {
      if (prefersReducedMotion() || sessionStorage.getItem(KEY)) return 'done';
    } catch {
      return 'done';
    }
    return 'in';
  });

  useEffect(() => {
    if (stage === 'done') return;
    try { sessionStorage.setItem(KEY, '1'); } catch { /* private mode */ }
    document.documentElement.classList.add('intro-playing');
    const t1 = setTimeout(() => setStage('out'), 1500);
    const t2 = setTimeout(() => {
      setStage('done');
      document.documentElement.classList.remove('intro-playing');
    }, 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.classList.remove('intro-playing');
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (stage === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
      style={{
        clipPath: stage === 'out' ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)',
        transition: 'clip-path 1s var(--ease-io)',
      }}
      aria-hidden="true"
    >
      <img src={mark} alt="" className="rise h-24 w-24" />
      <span className="mt-8 block h-px w-24 origin-left bg-gold" style={{ animation: 'intro-line 1s var(--ease-out) .35s both' }} />
      <span className="rise mt-6 text-[.7rem] font-semibold uppercase tracking-[.35em] text-cream/80" style={{ animationDelay: '.5s' }}>
        {agent.team}
      </span>
    </div>
  );
}
