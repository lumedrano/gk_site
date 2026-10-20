import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', light = false }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      {eyebrow && <p className={`eyebrow ${light ? '!text-sand' : ''}`}>{eyebrow}</p>}
      <h2 className={`display mt-3 text-4xl sm:text-5xl ${light ? 'text-cream' : 'text-ink'}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-sand' : 'text-muted'}`}>{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro }) {
  return (
    <section className="border-b border-line bg-stone/60">
      <Container className="py-16 sm:py-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-4 max-w-3xl text-5xl sm:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        </Reveal>
      </Container>
    </section>
  );
}

export function CtaBand({
  title = 'Let’s talk about your next move.',
  body = 'Whether you’re ready now or a year out, a no-pressure conversation is the best place to start.',
}) {
  return (
    <section className="bg-ink text-cream">
      <Container className="flex flex-col items-start gap-8 py-16 sm:py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="display text-4xl sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-sand">{body}</p>
        </div>
        <Link to="/contact" className="btn btn-light shrink-0">
          Schedule a consultation <Arrow />
        </Link>
      </Container>
    </section>
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
  luxury: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />,
  invest: <path d="M4 19h16M6 16l4-5 3 3 5-7M15 7h3v3" />,
  relocation: <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1113 0C18.5 15.4 12 21 12 21zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
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
