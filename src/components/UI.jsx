import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../content/site.js';
import { ImageReveal, SplitText } from './Motion.jsx';

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', light = false, as = 'h2', className = '' }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow ${light ? 'light' : ''} ${center ? 'justify-center' : ''}`}>{eyebrow}</p>
        </Reveal>
      )}
      <SplitText as={as} text={title} className={`display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] ${light ? 'text-cream' : 'text-navy'}`} />
      {intro && (
        <Reveal delay={150}>
          <p className={`mt-6 text-lg leading-relaxed ${light ? 'text-cream/75' : 'text-muted'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Inner-page hero: full-bleed photo (or navy with the key motif), animated title, breadcrumb. */
export function PageHero({ eyebrow, title, intro, image, crumbs = [], children }) {
  return (
    <section className="on-navy relative flex min-h-[min(78vh,780px)] items-end overflow-hidden bg-navy text-cream">
      {image ? (
        <>
          <img src={image} alt="" className="kenburns absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
        </>
      ) : (
        <KeyLines className="pointer-events-none absolute -right-24 -top-10 hidden h-[130%] text-gold/10 md:block" />
      )}
      <Container className="relative w-full pb-16 pt-44 sm:pb-24">
        <nav aria-label="Breadcrumb" className="rise text-xs font-semibold uppercase tracking-[.2em] text-cream/60">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span className="text-gold" aria-hidden="true">/</span>
                {c.to ? <Link to={c.to} className="hover:text-gold">{c.label}</Link> : c.label}
              </li>
            ))}
            <li className="flex items-center gap-2" aria-current="page">
              <span className="text-gold" aria-hidden="true">/</span>
              <span className="text-cream">{eyebrow}</span>
            </li>
          </ol>
        </nav>
        <SplitText as="h1" text={title} immediate delay={150} className="display mt-8 max-w-4xl text-5xl text-cream sm:text-6xl lg:text-7xl" />
        {intro && (
          <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-cream/80" style={{ animationDelay: '.6s' }}>{intro}</p>
        )}
        {children && <div className="rise" style={{ animationDelay: '.8s' }}>{children}</div>}
      </Container>
    </section>
  );
}

export function CtaBand({
  title = 'Let’s talk about your next move.',
  body = 'Whether you’re ready now or a year out, a no-pressure conversation is the best place to start.',
  image = images.hillCountry,
}) {
  return (
    <section className="on-navy grid bg-navy text-cream md:grid-cols-2">
      <div className="flex items-center px-5 py-20 sm:px-12 lg:px-20 lg:py-28">
        <div className="max-w-lg">
          <Reveal><span className="line-draw block h-px w-16 bg-gold" /></Reveal>
          <SplitText text={title} className="display mt-8 text-4xl sm:text-5xl" />
          <Reveal delay={200}>
            <p className="mt-6 text-lg leading-relaxed text-cream/75">{body}</p>
            <Link to="/contact" className="btn btn-gold mt-10">
              Schedule a consultation <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>
      <ImageReveal src={image} className="min-h-80 md:min-h-[560px]" parallax={0.1} />
    </section>
  );
}

export function Faq({ items, title = 'Good to know.' }) {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container className="grid gap-12 md:grid-cols-[4fr_7fr] md:gap-20">
        <SectionHeading eyebrow="Questions" title={title} />
        <div className="divide-y divide-line border-y border-line">
          {items.map((f) => (
            <Reveal key={f.q}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-navy">
                  {f.q}
                  <span className="text-2xl font-light text-bronze transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Thin line-drawing of the Highland key motif, used as a quiet background accent. */
export function KeyLines({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 400 480" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M40 20h70M75 20v440M40 460h70M290 20h70M325 20v440M290 460h70" />
      <path d="M75 180l125-90 125 90" />
      <path d="M200 30c-22 22-40 42-40 62 0 22 18 36 40 36s40-14 40-36c0-20-18-40-40-62z" />
      <path d="M200 128v250M200 300h22M200 330h16M200 360h22M75 270h55M270 270h55" />
    </svg>
  );
}

export function Arrow({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS = {
  buyers: <path d="M4 11.5 12 5l8 6.5M6.5 10v9h11v-9M10 19v-5h4v5" />,
  sellers: <path d="M5 21V4M5 5h11l-2 3.5L16 12H5M9 16h10v5H9z" />,
  investors: <path d="M4 19h16M6 16l4-5 3 3 5-7M15 7h3v3" />,
  invest: <path d="M4 19h16M6 16l4-5 3 3 5-7M15 7h3v3" />,
  compass: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM15.5 8.5l-2 5-5 2 2-5 5-2z" />,
  hammer: <path d="M14 6l4 4M12.5 7.5l-8.5 8.5 4 4 8.5-8.5M14 6l2-2 4 4-2 2M11 4l3 2" />,
  chat: <path d="M4 5h16v11H9l-5 4V5zM8 9.5h8M8 12.5h5" />,
  calculator: <path d="M6 3h12v18H6zM9 6.5h6M9 11h.01M12 11h.01M15 11h.01M9 14.5h.01M12 14.5h.01M15 14.5h.01M9 18h.01M12 18h.01M15 18h.01" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5" />,
  play: <path d="M8 5.5v13l11-6.5-11-6.5z" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />,
  mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  pin: <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1113 0C18.5 15.4 12 21 12 21zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

export function Icon({ name, className = 'h-6 w-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}
