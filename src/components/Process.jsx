import { Container, Reveal, SectionHeading } from './UI.jsx';

export default function Process({ eyebrow, title, steps }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 md:grid-cols-[4fr_7fr] md:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </div>
        <ol className="relative border-l border-line">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60} className="relative pb-12 pl-10 last:pb-0">
              <span className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-cream text-xs font-bold text-bronze-ink">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display text-2xl sm:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Highlights({ items }) {
  return (
    <section className="bg-stone/70 py-20 sm:py-24">
      <Container className="grid gap-6 md:grid-cols-3">
        {items.map((h, i) => (
          <Reveal key={h.title} delay={i * 80} className="rounded-2xl bg-cream p-8">
            <h3 className="display text-2xl">{h.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{h.body}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
