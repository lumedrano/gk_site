import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { agent, audiences, bio, images, neighborhoods, quote, serviceArea, statement, stats, whyGeorge } from '../content/site.js';
import { Portrait } from '../components/Art.jsx';
import { Arrow, Container, CtaBand, Icon, Reveal, SectionHeading } from '../components/UI.jsx';
import { ClipReveal, CountUp, ImageReveal, Marquee, ScrollHighlight, SplitText, useParallax } from '../components/Motion.jsx';
import { introDelay } from '../components/Intro.jsx';
import AudienceTabs from '../components/AudienceTabs.jsx';
import Testimonials from '../components/Testimonials.jsx';
import NeighborhoodCard from '../components/NeighborhoodCard.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <AudienceTabs />
      <MeetGeorge />
      <WhyGeorge />
      <QuoteBreak />
      <NeighborhoodsPreview />
      <section className="border-y border-line bg-paper py-10 sm:py-14">
        <Marquee
          items={serviceArea}
          speed={80}
          className="display text-5xl text-transparent [-webkit-text-stroke:1px_var(--color-taupe)] sm:text-7xl"
        />
      </section>
      <Testimonials />
      <ResourcesTeaser />
      <CtaBand />
    </>
  );
}

function Hero() {
  const bg = useRef(null);
  useParallax(bg, 0.12);
  const d = introDelay();

  return (
    <section className="on-navy relative h-[100svh] max-h-[1000px] min-h-[680px] overflow-hidden bg-navy text-cream">
      <div ref={bg} className="absolute inset-0 will-change-transform">
        <img
          src={images.hero}
          alt=""
          fetchpriority="high"
          className="kenburns h-full w-full object-cover"
          style={{ animationDelay: `${d}ms` }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/75 to-navy/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-navy/50" />

      <Container className="relative flex h-full flex-col justify-end pb-36 sm:pb-44">
        <p className="eyebrow rise" style={{ animationDelay: `${d + 100}ms` }}>
          {agent.title} · {agent.city}
        </p>
        <SplitText
          as="h1"
          immediate
          delay={d + 250}
          stagger={70}
          text="Austin real estate, _handled with strategy_ — not sales pressure."
          className="display mt-7 max-w-5xl text-[clamp(2.75rem,6.6vw,6.25rem)] leading-[1.03]"
        />
        <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-cream/80" style={{ animationDelay: `${d + 900}ms` }}>
          Buy, sell and invest across Austin and the Hill Country with an agent who knows how homes are built,
          what they’re worth, and how to get you there.
        </p>
        <div className="rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: `${d + 1050}ms` }}>
          <Link to="/contact" className="btn btn-gold">Schedule a consultation <Arrow /></Link>
          <Link to="/about" className="btn btn-outline-light">Meet {agent.firstName}</Link>
        </div>
      </Container>

      {/* Quick paths */}
      <div className="rise absolute inset-x-0 bottom-0 hidden border-t border-white/15 bg-navy/40 backdrop-blur-md md:block" style={{ animationDelay: `${d + 1250}ms` }}>
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1fr_1fr_auto] px-10">
          {audiences.map((a, i) => (
            <Link key={a.key} to={a.to} className="group flex items-center justify-between gap-4 border-r border-white/15 py-6 pr-8 pl-8 first:pl-0">
              <span className="flex items-baseline gap-4">
                <span className="text-xs font-semibold tracking-[.2em] text-gold">0{i + 1}</span>
                <span className="display text-xl transition-colors group-hover:text-gold lg:text-2xl">{a.cue}</span>
              </span>
              <Arrow className="h-4 w-4 -translate-x-2 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
          <div className="flex items-center gap-4 pl-8 text-[.65rem] font-semibold uppercase tracking-[.25em] text-cream/60">
            Scroll
            <span className="relative h-10 w-px overflow-hidden bg-white/15">
              <span className="scroll-cue absolute inset-0 bg-gold" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_3fr] lg:gap-16">
          <Reveal><p className="eyebrow">The approach</p></Reveal>
          <div>
            <ScrollHighlight text={statement} className="display text-3xl font-medium leading-[1.3] text-navy sm:text-4xl lg:text-[2.75rem]" />
            <Reveal className="mt-10 flex items-center gap-4">
              <span className="line-draw block h-px w-12 bg-gold" />
              <span className="display text-xl italic text-navy">{agent.name}</span>
            </Reveal>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="flex flex-col-reverse border-t border-line pt-8">
              <dt className="mt-3 text-xs font-semibold uppercase tracking-[.18em] text-muted">{s.label}</dt>
              <dd className="display text-4xl text-navy sm:text-6xl">
                <CountUp value={s.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function MeetGeorge() {
  return (
    <section className="overflow-hidden bg-cream py-20 lg:py-28">
      <Container className="grid items-center gap-14 md:grid-cols-[5fr_6fr] lg:gap-24">
        <div className="relative">
          <ClipReveal className="relative z-10 aspect-[4/5] overflow-hidden">
            <Portrait />
          </ClipReveal>
          <Reveal delay={400} className="absolute -bottom-6 -right-6 hidden h-full w-full border border-gold md:block" aria-hidden="true" />
          <Reveal delay={600} className="absolute -left-6 bottom-12 z-20 hidden bg-paper px-6 py-5 shadow-[0_20px_50px_-25px_rgb(43_50_78/.5)] sm:block">
            <p className="display text-3xl text-navy"><CountUp value={stats[0].value} /></p>
            <p className="mt-1 text-[.65rem] font-semibold uppercase tracking-[.2em] text-muted">{stats[0].label}</p>
          </Reveal>
        </div>
        <div>
          <Reveal><p className="eyebrow">Meet {agent.firstName}</p></Reveal>
          <SplitText text="A builder, investor and advocate in your corner." className="display mt-5 text-4xl text-navy sm:text-5xl lg:text-[3.5rem]" />
          <Reveal delay={150}>
            <p className="mt-7 text-lg leading-relaxed text-muted">{bio.intro}</p>
            <ul className="mt-9 space-y-4">
              {bio.credentials.slice(0, 3).map((c) => (
                <li key={c} className="flex items-start gap-4 border-b border-line pb-4 text-body">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-bronze" /> {c}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link to="/about" className="btn btn-primary">{agent.firstName}’s story <Arrow /></Link>
              <span className="display text-2xl italic text-navy/80">{agent.name}</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function WhyGeorge() {
  return (
    <section className="on-navy relative overflow-hidden bg-navy py-20 text-cream lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading light eyebrow={`Why work with ${agent.firstName}`} title="Advice you can build on." />
          <Reveal delay={200}>
            <Link to="/about#why" className="link-arrow">How {agent.firstName} works <Arrow /></Link>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {whyGeorge.map((w, i) => (
            <Reveal key={w.title} delay={i * 110} className="group relative bg-navy p-8 transition-colors duration-500 hover:bg-navy-2 lg:p-10">
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100" />
              <div className="flex items-center justify-between">
                <Icon name={w.icon} className="h-9 w-9 text-gold" />
                <span className="display text-lg text-cream/30">0{i + 1}</span>
              </div>
              <h3 className="display mt-10 text-2xl text-cream">{w.title}</h3>
              <p className="mt-4 leading-relaxed text-cream/70">{w.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function QuoteBreak() {
  const bg = useRef(null);
  useParallax(bg, 0.18);
  return (
    <section className="on-navy relative flex min-h-[min(80vh,860px)] items-center overflow-hidden bg-navy text-cream">
      <div ref={bg} className="absolute inset-0 will-change-transform">
        <img src={images.hillCountry} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-navy/65" />
      <Container className="relative py-24 text-center">
        <Reveal><span className="display block text-7xl leading-none text-gold">“</span></Reveal>
        <SplitText
          text={quote}
          className="display mx-auto mt-4 max-w-4xl text-3xl italic leading-snug sm:text-5xl"
          stagger={40}
        />
        <Reveal delay={500} className="mt-10 flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[.25em] text-cream/80">
          <span className="h-px w-10 bg-gold" /> {agent.name} <span className="h-px w-10 bg-gold" />
        </Reveal>
      </Container>
    </section>
  );
}

function NeighborhoodsPreview() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Neighborhoods"
            title="Know the area before you commit."
            intro="Every part of Austin has its own character, price dynamics and quirks. Start exploring."
          />
          <Reveal delay={200}>
            <Link to="/neighborhoods" className="btn btn-outline shrink-0">All neighborhoods <Arrow /></Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.slice(0, 6).map((n, i) => (
            <NeighborhoodCard key={n.slug} n={n} index={i} delay={(i % 3) * 120} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ResourcesTeaser() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-2 lg:gap-24">
        <ImageReveal src={images.interior} className="aspect-[5/4]" parallax={0.08} />
        <div>
          <Reveal><p className="eyebrow">Resources</p></Reveal>
          <SplitText text="What would your monthly payment be?" className="display mt-5 text-4xl text-navy sm:text-5xl" />
          <Reveal delay={150}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Texas property taxes change the math. Estimate principal, interest, taxes and insurance in seconds,
              then talk through the numbers with George.
            </p>
            <Link to="/resources#mortgage-calculator" className="btn btn-primary mt-10">
              <Icon name="calculator" className="h-4 w-4" /> Mortgage calculator
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
