import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { audiences } from '../content/site.js';
import { Arrow, Container, Icon, Reveal, SectionHeading } from './UI.jsx';
import { ClipReveal, SplitText } from './Motion.jsx';

export default function AudienceTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const a = audiences[active];

  // WAI-ARIA tabs pattern: arrow keys move between tabs, Home/End jump.
  function onKeyDown(e) {
    const last = audiences.length - 1;
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="pb-20 lg:pb-28">
      <Container>
        <SectionHeading
          eyebrow="How George helps"
          title="Whatever your next move, start with a plan."
        />

        <Reveal delay={150}>
          <div role="tablist" aria-label="Who George helps" className="mt-14 grid grid-cols-3 border-b border-line" onKeyDown={onKeyDown}>
            {audiences.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.key}
                  ref={(el) => (tabs.current[i] = el)}
                  role="tab"
                  id={`tab-${t.key}`}
                  aria-selected={selected}
                  aria-controls={`panel-${t.key}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group relative flex items-baseline gap-3 pb-6 pt-2 text-left sm:gap-5"
                >
                  <span className={`hidden text-xs font-semibold tracking-[.2em] sm:inline ${selected ? 'text-bronze' : 'text-muted'}`}>0{i + 1}</span>
                  <span className={`display text-2xl transition-colors duration-500 sm:text-4xl lg:text-5xl ${selected ? 'text-navy' : 'text-navy/30 group-hover:text-navy/60'}`}>
                    {t.label}
                  </span>
                  <span
                    className={`absolute -bottom-px left-0 h-0.5 w-full origin-left bg-gold transition-transform duration-700 ease-[var(--ease-out)] ${selected ? 'scale-x-100' : 'scale-x-0'}`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:gap-20">
          {/* Stacked images cross-fade between tabs */}
          <ClipReveal className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[520px]" innerClassName="absolute inset-0 bg-navy">
            {audiences.map((t, i) => (
              <img
                key={t.key}
                src={t.image}
                alt=""
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-out)] ${
                  i === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
            <span className="absolute bottom-6 left-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.2em] text-cream">
              <Icon name={a.key} className="h-5 w-5 text-gold" /> For {a.label.toLowerCase()}
            </span>
          </ClipReveal>

          <div
            key={a.key}
            role="tabpanel"
            id={`panel-${a.key}`}
            aria-labelledby={`tab-${a.key}`}
            tabIndex={0}
            className="flex flex-col justify-center focus:outline-none"
          >
            <SplitText as="h3" text={a.title} stagger={35} className="display text-3xl text-navy sm:text-4xl lg:text-[2.75rem]" />
            <p className="rise mt-6 text-lg leading-relaxed text-muted" style={{ animationDelay: '.25s' }}>{a.body}</p>
            <ul className="mt-8">
              {a.points.map((p, i) => (
                <li
                  key={p}
                  className="rise flex items-start gap-4 border-b border-line py-4 text-body"
                  style={{ animationDelay: `${0.35 + i * 0.08}s` }}
                >
                  <span className="mt-1 text-xs font-semibold tracking-[.15em] text-bronze">0{i + 1}</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="rise mt-10" style={{ animationDelay: '.7s' }}>
              <Link to={a.to} className="btn btn-primary">
                {a.cta} <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
