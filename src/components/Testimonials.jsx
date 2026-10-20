import { testimonials } from '../content/site.js';
import { Container, Reveal, SectionHeading } from './UI.jsx';

export default function Testimonials() {
  if (!testimonials.length) return null;
  const [featured, ...rest] = testimonials;

  return (
    <section className="bg-stone/70 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Client stories" title="Trusted when it matters." />
        <Reveal className="mt-12">
          <figure className="relative rounded-2xl bg-cream p-8 shadow-[0_10px_40px_-20px_rgba(31,42,38,.35)] sm:p-12">
            <span className="display absolute -top-6 left-8 text-8xl leading-none text-bronze/40" aria-hidden="true">“</span>
            <blockquote className="display text-2xl leading-snug text-ink sm:text-3xl">{featured.quote}</blockquote>
            <figcaption className="mt-8 flex items-center gap-3 text-sm">
              <span className="h-px w-10 bg-bronze" />
              <span className="font-semibold">{featured.name}</span>
              <span className="text-muted">· {featured.context}</span>
            </figcaption>
          </figure>
        </Reveal>
        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <figure className="h-full rounded-2xl border border-line bg-cream p-8">
                  <blockquote className="leading-relaxed text-ink-2">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-muted"> · {t.context}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
