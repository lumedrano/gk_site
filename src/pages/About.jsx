import { agent, bio, specialties } from '../content/site.js';
import { Portrait } from '../components/Art.jsx';
import { Container, CtaBand, Icon, PageHero, Reveal, SectionHeading } from '../components/UI.jsx';
import Testimonials from '../components/Testimonials.jsx';

const VALUES = [
  { title: 'Candor', body: 'You’ll hear what George actually thinks about a house, a price or a strategy, even when it isn’t what you hoped.' },
  { title: 'Communication', body: 'Clear, timely updates at every step, so you always know where things stand and what comes next.' },
  { title: 'Craft', body: 'A builder’s attention to detail applied to contracts, negotiations and every deadline in between.' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About George"
        title="A builder’s background. A client-first approach."
        intro={bio.intro}
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-20">
          <Reveal className="md:sticky md:top-28 md:self-start">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <Portrait />
            </div>
            <div className="mt-6 rounded-2xl border border-line p-6 text-sm">
              <p className="display text-xl">{agent.name}</p>
              <p className="mt-1 text-muted">{agent.title} · {agent.brokerage}</p>
              <p className="mt-1 text-muted">{agent.license}</p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">The story</p>
              <div className="mt-5 space-y-6 text-lg leading-relaxed text-ink-2">
                {bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <p className="eyebrow">Credentials</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {bio.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-3 rounded-xl bg-stone/60 p-4 text-sm text-ink-2">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-bronze" /> {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-14">
              <p className="eyebrow">Specialties</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <span key={s.key} className="rounded-full border border-line px-4 py-2 text-sm font-medium">{s.title}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-cream sm:py-28">
        <Container>
          <SectionHeading light eyebrow="What to expect" title="How George works." />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <p className="display text-6xl text-bronze">0{i + 1}</p>
                <h3 className="display mt-4 text-3xl">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-sand">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Testimonials />
      <CtaBand />
    </>
  );
}
