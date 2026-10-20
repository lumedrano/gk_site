import { faqs, process } from '../content/site.js';
import Process, { Highlights } from '../components/Process.jsx';
import { Container, CtaBand, PageHero, Reveal, SectionHeading } from '../components/UI.jsx';

const HIGHLIGHTS = [
  { title: 'Condition, decoded', body: 'Every tour comes with a construction-informed read on foundation, roof, systems and likely repair costs.' },
  { title: 'Value, verified', body: 'Offers are grounded in real comparable sales, so you compete with confidence and don’t overpay.' },
  { title: 'Potential, revealed', body: 'See past dated finishes to what a home could become, with a realistic sense of renovation scope.' },
];

export default function Buying() {
  return (
    <>
      <PageHero
        eyebrow="Buying a home"
        title="Buy with clarity, not guesswork."
        intro="Austin moves quickly. George helps you understand exactly what you’re buying, what it’s really worth, and how to write an offer that wins on the right terms."
      />
      <Highlights items={HIGHLIGHTS} />
      <Process eyebrow="The process" title="From first call to keys in hand." steps={process.buying} />
      <Faq />
      <CtaBand title="Ready to start your search?" body="Tell George what you’re looking for and he’ll put together a plan tailored to your goals." />
    </>
  );
}

function Faq() {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container className="grid gap-12 md:grid-cols-[4fr_7fr] md:gap-20">
        <SectionHeading eyebrow="Questions" title="Good to know." />
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <Reveal key={f.q}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                  {f.q}
                  <span className="text-2xl font-light text-bronze transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
