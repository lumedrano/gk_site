import { useState } from 'react';
import { testimonials } from '../content/site.js';
import { Container, Reveal } from './UI.jsx';

/** Centered editorial quote; becomes a simple slider once there is more than one testimonial. */
export default function Testimonials({ id }) {
  const [i, setI] = useState(0);
  if (!testimonials.length) return null;
  const t = testimonials[i];
  const many = testimonials.length > 1;
  const go = (d) => setI((x) => (x + d + testimonials.length) % testimonials.length);

  return (
    <section id={id} className="bg-cream py-20 lg:py-28">
      <Container className="text-center">
        <Reveal><p className="eyebrow justify-center">Client stories</p></Reveal>
        <Reveal delay={100}>
          <span className="display mt-10 block text-8xl leading-[.5] text-gold" aria-hidden="true">“</span>
        </Reveal>
        <Reveal delay={200}>
          <figure key={i} className="mx-auto max-w-4xl animate-[fade_.8s_var(--ease-out)]">
            <blockquote className="display text-3xl font-medium italic leading-snug text-navy sm:text-[2.6rem]">{t.quote}</blockquote>
            <figcaption className="mt-10 flex items-center justify-center gap-4 text-sm">
              <span className="h-px w-10 bg-gold" />
              <span className="font-semibold uppercase tracking-[.18em] text-navy">{t.name}</span>
              <span className="text-muted">{t.context}</span>
              <span className="h-px w-10 bg-gold" />
            </figcaption>
          </figure>
        </Reveal>
        {many && (
          <div className="mt-12 flex items-center justify-center gap-6">
            <button type="button" onClick={() => go(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/30 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-cream" aria-label="Previous testimonial">
              <svg className="h-4 w-4 rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
            </button>
            <span className="text-xs font-semibold tracking-[.2em] text-muted">{String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => go(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/30 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-cream" aria-label="Next testimonial">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
