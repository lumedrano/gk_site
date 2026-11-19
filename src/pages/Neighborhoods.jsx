import { images, neighborhoods, serviceArea } from '../content/site.js';
import { Container, CtaBand, PageHero, Reveal, SectionHeading } from '../components/UI.jsx';
import { Marquee } from '../components/Motion.jsx';
import NeighborhoodCard from '../components/NeighborhoodCard.jsx';

export default function Neighborhoods() {
  return (
    <>
      <PageHero
        eyebrow="Neighborhoods"
        title="From downtown Austin to the _Hill Country_."
        intro="Every neighborhood has its own character, price dynamics and quirks. George helps you understand the tradeoffs so you can choose with confidence."
        image={images.hillCountry}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((n, i) => (
              <NeighborhoodCard key={n.slug} n={n} index={i} delay={(i % 3) * 120} tall />
            ))}
          </div>
        </Container>
      </section>

      <section className="on-navy overflow-hidden bg-navy py-20 text-cream lg:py-28">
        <Container>
          <SectionHeading
            light
            eyebrow="Full service area"
            title="Communities across Central Texas."
            intro="Don’t see your area? George serves dozens of communities across Travis, Williamson, Hays and surrounding counties. Just ask."
          />
        </Container>
        <Reveal className="mt-16">
          <Marquee items={serviceArea} speed={90} className="display text-4xl text-cream/90 sm:text-6xl" />
        </Reveal>
      </section>

      <CtaBand title="Not sure where to start?" body="George can help you compare neighborhoods by commute, schools, budget and lifestyle." image={images.skyline} />
    </>
  );
}
