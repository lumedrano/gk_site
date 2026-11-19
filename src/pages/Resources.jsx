import { images, links } from '../content/site.js';
import MortgageCalculator from '../components/MortgageCalculator.jsx';
import { Container, CtaBand, Icon, PageHero, Reveal, SectionHeading } from '../components/UI.jsx';

export default function Resources() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Tools for _smarter_ decisions."
        image={images.interior}
        intro="Calculators and trusted references to help you plan your next move, whether you’re buying, selling or investing."
      />

      <section id="mortgage-calculator" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Mortgage calculator"
            title="Estimate your monthly payment."
            intro="Texas has no state income tax, but property taxes run higher than in most states. This calculator includes them, so the estimate reflects what you’ll actually pay."
          />
          <Reveal className="mt-12">
            <MortgageCalculator />
          </Reveal>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
            Estimates only. Mortgage insurance is approximated at 0.5% of the loan per year when the down payment is under 20%.
            Property tax rates vary by address and exemptions. Talk with a lender for an exact quote.
          </p>
        </Container>
      </section>

      <section id="links" className="bg-cream py-20 sm:py-28">
        <Container className="grid gap-12 md:grid-cols-[4fr_7fr] md:gap-20">
          <SectionHeading eyebrow="Helpful links" title="Trusted references." />
          <ul className="divide-y divide-line border-y border-line">
            {links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block font-semibold text-navy group-hover:text-bronze">{l.title}</span>
                    <span className="mt-1 block text-sm text-muted">{l.source}</span>
                  </span>
                  <Icon name="external" className="h-5 w-5 shrink-0 text-bronze" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title="Have a question the tools can’t answer?" body="George is happy to walk through the numbers for your specific situation." />
    </>
  );
}
