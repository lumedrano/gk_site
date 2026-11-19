import { Fragment, useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True once the element has scrolled into view (fires once). */
export function useInView(ref, { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin]);
  return inView;
}

/**
 * Shared scroll loop: one rAF-throttled listener feeds every subscriber,
 * so parallax and scroll-linked effects stay cheap.
 */
const subscribers = new Set();
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    subscribers.forEach((fn) => fn());
    ticking = false;
  });
}
export function useScrollFrame(fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    const run = () => fnRef.current();
    if (subscribers.size === 0) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }
    subscribers.add(run);
    run();
    return () => {
      subscribers.delete(run);
      if (subscribers.size === 0) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };
  }, []);
}

/** Moves the element vertically as it passes through the viewport. speed ≈ fraction of travel. */
export function useParallax(ref, speed = 0.12) {
  useScrollFrame(() => {
    const el = ref.current;
    if (!el || !speed || prefersReducedMotion()) return;
    const r = el.parentElement.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom < -200 || r.top > vh + 200) return;
    const progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1 around center
    el.style.transform = `translate3d(0, ${(-progress * speed * 100).toFixed(2)}%, 0) scale(${1 + speed})`;
  });
}

/**
 * Headline that rises into view word by word from behind a mask.
 * Wrap words in _underscores_ to set them in gold italic.
 */
export function SplitText({ as: Tag = 'h2', text, className = '', delay = 0, stagger = 55, immediate = false }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const show = immediate || seen;

  // Group pieces into words: anything not separated by whitespace (e.g. "_clarity_,")
  // stays in one unbreakable mask, so punctuation never wraps onto its own line.
  const words = [[]];
  text.split(/(_[^_]+_)/).filter(Boolean).forEach((part) => {
    const em = part.startsWith('_') && part.endsWith('_');
    (em ? part.slice(1, -1) : part).split(/(\s+)/).forEach((piece) => {
      if (!piece) return;
      if (/^\s+$/.test(piece)) words.push([]);
      else words[words.length - 1].push({ piece, em });
    });
  });

  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/_/g, '')}>
      {words.filter((w) => w.length).map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="split-word" aria-hidden="true">
            <span className={`split-inner ${show ? 'is-in' : ''}`} style={{ transitionDelay: `${delay + i * stagger}ms` }}>
              {w.map((t, j) => (
                <span key={j} className={t.em ? 'italic text-gold' : undefined}>{t.piece}</span>
              ))}
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}

/** Image that wipes up into view while settling from a slight zoom; optional parallax. */
export function ImageReveal({ src, alt = '', className = '', imgClassName = '', parallax = 0, delay = 0, eager = false }) {
  const wrap = useRef(null);
  const img = useRef(null);
  const seen = useInView(wrap, { threshold: 0.05 });
  useParallax(img, parallax);
  return (
    // The observed wrapper must not carry the clip-path: Chrome's IntersectionObserver
    // treats a fully clipped target as never intersecting, so the clip lives one level down.
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <div className={`img-reveal absolute inset-0 overflow-hidden ${seen ? 'is-in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
        <div ref={img} className="absolute inset-0 will-change-transform">
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className={`img-reveal-img h-full w-full object-cover ${imgClassName}`}
            style={{ transitionDelay: `${delay}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

/** Same wipe-up reveal as ImageReveal, for arbitrary content. */
export function ClipReveal({ className = '', innerClassName = 'relative h-full w-full', children, delay = 0 }) {
  const ref = useRef(null);
  const seen = useInView(ref, { threshold: 0.05 });
  return (
    // Clip-path sits on the inner element so the observed wrapper stays measurable (see ImageReveal).
    <div ref={ref} className={className}>
      <div className={`img-reveal ${innerClassName} ${seen ? 'is-in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </div>
    </div>
  );
}

/** Counts up the leading number of a stat (e.g. "250+", "$1.2M") once visible. Non-numeric values render as-is. */
export function CountUp({ value, duration = 1800, className = '' }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const m = String(value).match(/^([^\d]*)([\d,.]+)(.*)$/);
  const target = m ? parseFloat(m[2].replace(/,/g, '')) : null;
  const decimals = m && m[2].includes('.') ? m[2].split('.')[1].length : 0;
  const [n, setN] = useState(target === null || prefersReducedMotion() ? target : 0);

  useEffect(() => {
    if (!seen || target === null || prefersReducedMotion()) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setN(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, target, duration]);

  if (target === null) return <span ref={ref} className={className}>{value}</span>;
  const shown = n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      {m[1]}{shown}{m[3]}
    </span>
  );
}

/** Paragraph whose words brighten one by one as it scrolls through the viewport. */
export function ScrollHighlight({ text, className = '' }) {
  const ref = useRef(null);
  const words = text.split(' ');
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.children;
    if (prefersReducedMotion()) {
      for (const s of spans) s.style.opacity = 1;
      return;
    }
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when the block's top reaches 85% of the viewport, 1 when its bottom reaches 45%.
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
    const lit = p * spans.length;
    for (let i = 0; i < spans.length; i++) {
      spans[i].style.opacity = String(0.18 + 0.82 * Math.min(1, Math.max(0, lit - i)));
    }
  });
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="transition-opacity duration-300" style={{ opacity: 0.18 }}>
          {w}{' '}
        </span>
      ))}
    </p>
  );
}

/** Endless horizontal ticker. */
export function Marquee({ items, className = '', speed = 60 }) {
  const row = (
    <div className="marquee-row" aria-hidden="true">
      {items.map((t) => (
        <span key={t} className="flex items-center gap-10 pr-10">
          {t}
          <span className="inline-block h-2 w-2 rotate-45 bg-gold" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee overflow-hidden ${className}`} style={{ '--marquee-duration': `${speed}s` }}>
      <span className="sr-only">{items.join(', ')}</span>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
