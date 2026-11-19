import { useRef } from 'react';
import { Container, Reveal, SectionHeading } from './UI.jsx';
import { useScrollFrame } from './Motion.jsx';

export default function Process({ eyebrow, title, steps, id = 'process' }) {
  const list = useRef(null);
  const bar = useRef(null);
  // Gold line fills down the timeline as it scrolls past the middle of the screen.
  useScrollFrame(() => {
    if (!list.current || !bar.current) return;
    const r = list.current.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
    bar.current.style.transform = `scaleY(${p})`;
  });

  return (
    <section id={id} className="py-20 lg:py-28">
      <Container className="grid gap-12 md:grid-cols-[4fr_7fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </div>
        <div ref={list} className="relative">
        <span ref={bar} className="absolute left-0 top-0 z-[1] h-full w-px origin-top bg-gold" style={{ transform: 'scaleY(0)' }} aria-hidden="true" />
        <ol className="relative border-l border-line">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60} className="relative pb-12 pl-10 last:pb-0">
              <span className="absolute -left-[18px] top-0 flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-paper z-10 text-xs font-bold text-bronze">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display text-2xl text-navy sm:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        </div>
      </Container>
    </section>
  );
}

export function Highlights({ items }) {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <Container>
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
        {items.map((h, i) => (
          <Reveal key={h.title} delay={i * 110} className="group relative bg-paper p-8 transition-colors duration-500 hover:bg-white sm:p-12">
            <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100" />
            <p className="display text-5xl text-taupe/40">0{i + 1}</p>
            <h3 className="display mt-8 text-2xl text-navy sm:text-3xl">{h.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{h.body}</p>
          </Reveal>
        ))}
        </div>
      </Container>
    </section>
  );
}
