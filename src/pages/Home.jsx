import { Link } from 'react-router-dom';
import { agent, bio, specialties, stats, areas } from '../content/site.js';
import { HillsArt, Portrait } from '../components/Art.jsx';
import { Arrow, Container, CtaBand, Icon, Reveal, SectionHeading } from '../components/UI.jsx';
import Testimonials from '../components/Testimonials.jsx';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-18 overflow-hidden pt-18">
        <HillsArt className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/70 to-transparent" />
        <Container className="relative flex min-h-[min(80vh,760px)] flex-col justify-center py-20 sm:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{agent.title} · {agent.city}</p>
            <h1 className="display mt-5 text-5xl sm:text-7xl">
              Austin real estate,<br />
              <em className="text-bronze-ink">seen through a builder’s eye.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2">
              Buy, sell and invest across Austin and the Hill Country with an agent who knows
              how homes are built, what they’re worth, and how to get you there.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">Schedule a consultation <Arrow /></Link>
              <Link to="/about" className="btn btn-ghost">Meet George</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Stats strip */}
      <section className="border-y border-line bg-cream">
        <Container className="grid grid-cols-2 divide-line py-10 md:grid-cols-4 md:divide-x">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="px-2 py-4 text-center md:px-6">
              <p className="display text-4xl text-ink">{s.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">{s.label}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Intro */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 md:grid-cols-[5fr_6fr] md:gap-20">
          <Reveal className="aspect-[4/5] overflow-hidden rounded-2xl">
            <Portrait />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Meet George</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">More than an agent. A builder, investor and advocate.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{bio.intro}</p>
            <ul className="mt-8 space-y-3">
              {bio.credentials.slice(0, 3).map((c) => (
                <li key={c} className="flex items-start gap-3 text-ink-2">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-bronze" /> {c}
                </li>
              ))}
            </ul>
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 font-semibold text-bronze-ink hover:gap-3 transition-all">
              Read George’s story <Arrow />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Specialties */}
      <section className="bg-ink py-20 text-cream sm:py-28">
        <Container>
          <SectionHeading
            light
            eyebrow="How George helps"
            title="Guidance for every kind of move."
            intro="From first homes to Hill Country estates to fix-and-flip projects, every client gets the same candid advice and careful attention."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((s, i) => (
              <Reveal key={s.key} delay={i * 80} className="bg-ink p-8 transition-colors hover:bg-ink-2">
                <Icon name={s.key} className="h-8 w-8 text-bronze" />
                <h3 className="display mt-6 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Buy / Sell split */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-6 md:grid-cols-2">
          {[
            { to: '/buy', eyebrow: 'Buying', title: 'Find the right home, and know what you’re getting.', cta: 'The buying process' },
            { to: '/sell', eyebrow: 'Selling', title: 'Price it right, present it well, close with confidence.', cta: 'The selling process' },
          ].map((c, i) => (
            <Reveal key={c.to} delay={i * 100}>
              <Link to={c.to} className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-stone/50 p-10 transition-colors hover:border-ink hover:bg-stone">
                <div>
                  <p className="eyebrow">{c.eyebrow}</p>
                  <h3 className="display mt-4 text-3xl sm:text-4xl">{c.title}</h3>
                </div>
                <span className="mt-12 inline-flex items-center gap-2 font-semibold text-ink-2 transition-all group-hover:gap-3">
                  {c.cta} <Arrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>

      <Testimonials />

      {/* Areas preview */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Where George works" title="Austin and the Hill Country." />
            <Link to="/areas" className="btn btn-ghost">All areas served</Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.slice(0, 6).map((a, i) => (
              <Reveal key={a.name} delay={i * 60} className="rounded-2xl border border-line p-6">
                <h3 className="display text-2xl">{a.name}</h3>
                <p className="mt-2 text-sm text-muted">{a.tags.join(' · ')}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
