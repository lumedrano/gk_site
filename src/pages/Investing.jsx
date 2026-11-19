import { faqs, highlights, images, process } from '../content/site.js';
import Process, { Highlights } from '../components/Process.jsx';
import { CtaBand, Faq, PageHero } from '../components/UI.jsx';

export default function Investing() {
  return (
    <>
      <PageHero
        eyebrow="Investing"
        title="Invest with an agent who _runs the numbers_."
        image={images.investing}
        intro="Rentals, value-add renovations and fix-and-flips. George invests in Austin real estate himself, so he evaluates every deal the way you would: scope, after-repair value and real returns."
      />
      <Highlights items={highlights.investing} />
      <Process eyebrow="The process" title="From strategy to closed deal." steps={process.investing} />
      <Faq items={faqs.investing} />
      <CtaBand title="Have a deal in mind?" body="Send George the address or your criteria and he’ll help you decide whether the numbers work." />
    </>
  );
}
