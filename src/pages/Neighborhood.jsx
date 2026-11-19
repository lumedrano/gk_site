import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { agent, neighborhoods } from '../content/site.js';
import { Arrow, Container, CtaBand, PageHero, Reveal } from '../components/UI.jsx';
import { ClipReveal } from '../components/Motion.jsx';
import YouTube from '../components/YouTube.jsx';
import NotFound from './NotFound.jsx';

export default function Neighborhood() {
  const { slug } = useParams();
  const index = neighborhoods.findIndex((n) => n.slug === slug);
  const n = neighborhoods[index];

  useEffect(() => {
    if (n) document.title = `${n.name} | ${agent.name}`;
  }, [n]);

  if (!n) return <NotFound />;
  const next = neighborhoods[(index + 1) % neighborhoods.length];

  return (
    <>
      <PageHero
        eyebrow={n.name}
        title={n.name}
        intro={n.blurb}
        image={n.image}
        crumbs={[{ label: 'Neighborhoods', to: '/neighborhoods' }]}
      />

      {n.video && (
        <section className="bg-cream py-20 sm:py-28">
          <Container>
            <Reveal><p className="eyebrow">Video tour</p></Reveal>
            <ClipReveal className="mt-8">
              <YouTube url={n.video} title={`${n.name} neighborhood tour with ${agent.name}`} />
            </ClipReveal>
          </Container>
        </section>
      )}

      {n.body?.length ? (
        <section className="py-20 lg:py-28">
          <Container className="grid gap-14 md:grid-cols-[7fr_4fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow">Overview</p>
              <div className="prose-body mt-8 text-xl leading-relaxed text-body">
                {n.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Reveal>
            <Reveal delay={150} className="md:self-start">
              <Communities list={n.communities} />
            </Reveal>
          </Container>
        </section>
      ) : (
        // No written guide yet: one compact band instead of a mostly empty section.
        <section className="border-b border-line py-14 lg:py-20">
          <Container className="grid items-center gap-10 md:grid-cols-[1fr_auto] lg:gap-20">
            <Reveal>
              <p className="eyebrow">At a glance</p>
              <p className="display mt-5 max-w-2xl text-3xl leading-snug text-navy sm:text-4xl">{n.blurb}</p>
            </Reveal>
            <Reveal delay={150}>
              <Communities list={n.communities} />
            </Reveal>
          </Container>
        </section>
      )}

      <Link to={`/neighborhoods/${next.slug}`} className="on-navy group relative block h-72 overflow-hidden bg-navy text-cream sm:h-96">
        <img src={next.image} alt="" loading="lazy" className="zoom-img absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
        <Container className="relative flex h-full items-center justify-between">
          <span>
            <span className="eyebrow">Next neighborhood</span>
            <span className="display mt-4 block text-4xl transition-colors group-hover:text-gold sm:text-6xl">{next.name}</span>
          </span>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-navy">
            <Arrow className="h-5 w-5" />
          </span>
        </Container>
      </Link>

      <CtaBand title={`Thinking about ${n.name}?`} body="George can walk you through pricing, inventory and what daily life is really like there." />
    </>
  );
}

function Communities({ list }) {
  return (
    <div className="min-w-64 border-t-2 border-gold bg-cream p-8">
      <p className="eyebrow bare">Communities</p>
      <ul className="mt-5 divide-y divide-line">
        {list.map((c) => (
          <li key={c} className="display py-3 text-2xl text-navy">{c}</li>
        ))}
      </ul>
    </div>
  );
}
