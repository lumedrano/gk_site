import { areas, serviceArea } from '../content/site.js';
import { Container, CtaBand, PageHero, Reveal, SectionHeading } from '../components/UI.jsx';

export default function Areas() {
  return (
    <>
      <PageHero
        eyebrow="Areas served"
        title="From downtown Austin to the Hill Country."
        intro="Every neighborhood has its own character, price dynamics and quirks. George helps you understand the tradeoffs so you can choose with confidence."
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <Reveal key={a.name} delay={(i % 3) * 80} className="flex flex-col rounded-2xl border border-line bg-white/50 p-8">
              <p className="display text-5xl text-sand">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="display mt-6 text-3xl">{a.name}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{a.blurb}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {a.tags.map((t) => (
                  <span key={t} className="rounded-full bg-stone px-3 py-1 text-xs font-semibold text-ink-2">{t}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-ink py-20 text-cream sm:py-28">
        <Container>
          <SectionHeading
            light
            eyebrow="Full service area"
            title="Communities across Central Texas."
            intro="Don’t see your area? George serves dozens of communities across Travis, Williamson, Hays and surrounding counties. Just ask."
          />
          <Reveal className="mt-12 flex flex-wrap gap-x-3 gap-y-3">
            {serviceArea.map((c) => (
              <span key={c} className="rounded-full border border-white/15 px-4 py-2 text-sm text-sand">{c}</span>
            ))}
          </Reveal>
        </Container>
      </section>

      <CtaBand title="Not sure where to start?" body="George can help you compare neighborhoods by commute, schools, budget and lifestyle." />
    </>
  );
}
