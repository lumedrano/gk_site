import { agent, bio, images, specialties, whyGeorge } from '../content/site.js';
import { Portrait } from '../components/Art.jsx';
import { Container, CtaBand, Icon, PageHero, Reveal, SectionHeading } from '../components/UI.jsx';
import { ClipReveal, SplitText } from '../components/Motion.jsx';
import Testimonials from '../components/Testimonials.jsx';

export default function About() {
  return (
    <>
      <PageHero
        eyebrow={`About ${agent.firstName}`}
        title="A builder’s background. A _client-first_ approach."
        intro={bio.intro}
        image={images.skyline}
      />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-14 md:grid-cols-[5fr_7fr] lg:gap-24">
          <div className="md:sticky md:top-32 md:self-start">
            <ClipReveal className="aspect-[4/5] overflow-hidden">
              <Portrait />
            </ClipReveal>
            <Reveal delay={300} className="mt-6 border-l-2 border-gold bg-cream p-6 text-sm">
              <p className="display text-xl text-navy">{agent.name}</p>
              <p className="mt-1 text-muted">{agent.title} · {agent.team}</p>
              <p className="mt-1 text-muted">Brokered by {agent.brokerage} · {agent.license}</p>
            </Reveal>
          </div>

          <div>
            <Reveal><p className="eyebrow">The story</p></Reveal>
            <SplitText text="Seeing what others miss, and saying it plainly." className="display mt-5 text-4xl text-navy sm:text-5xl" />
            <Reveal delay={150}>
              <div className="prose-body mt-8 text-lg leading-relaxed text-body first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[.85] first-letter:text-navy">
                {bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Reveal>

            <Reveal className="mt-16">
              <p className="eyebrow">Credentials</p>
              <ul className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                {bio.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-3 bg-paper p-5 text-[.95rem] text-body">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-bronze" /> {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-16">
              <p className="eyebrow">Specialties</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <span key={s} className="border border-line px-5 py-2.5 text-xs font-semibold uppercase tracking-[.14em] text-navy">{s}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="why" className="on-navy bg-navy py-20 text-cream lg:py-28">
        <Container>
          <SectionHeading light eyebrow="What to expect" title={`How ${agent.firstName} works.`} />
          <div className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {whyGeorge.map((w, i) => (
              <Reveal key={w.title} delay={i * 110} className="group relative bg-navy p-8 transition-colors duration-500 hover:bg-navy-2 lg:p-10">
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100" />
                <p className="display text-6xl text-gold/80">0{i + 1}</p>
                <h3 className="display mt-8 text-2xl">{w.title}</h3>
                <p className="mt-4 leading-relaxed text-cream/70">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Testimonials id="stories" />
      <CtaBand />
    </>
  );
}
