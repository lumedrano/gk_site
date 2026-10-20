import { Link } from 'react-router-dom';
import { process } from '../content/site.js';
import Process, { Highlights } from '../components/Process.jsx';
import { Arrow, Container, CtaBand, PageHero, Reveal } from '../components/UI.jsx';
import Testimonials from '../components/Testimonials.jsx';

const HIGHLIGHTS = [
  { title: 'Smart preparation', body: 'Know which repairs and updates will raise your sale price, and which ones to skip.' },
  { title: 'Honest pricing', body: 'A data-backed list price designed to attract strong offers early, not sit on the market.' },
  { title: 'Steady negotiation', body: 'Offers weighed on net proceeds and certainty, with inspection and appraisal hurdles handled calmly.' },
];

export default function Selling() {
  return (
    <>
      <PageHero
        eyebrow="Selling your home"
        title="Sell for the right price, on the right terms."
        intro="Whether your home is newly built or has been on the market too long, George brings a builder’s eye to preparation and an investor’s discipline to pricing and negotiation."
      />
      <Highlights items={HIGHLIGHTS} />
      <Process eyebrow="The process" title="A clear path to closing." steps={process.selling} />

      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-stone/60 p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Complimentary</p>
              <h2 className="display mt-3 text-3xl sm:text-4xl">What’s your home worth today?</h2>
              <p className="mt-3 text-muted">
                Request a personal pricing consultation, with a walkthrough and a market analysis tailored to your property.
              </p>
            </div>
            <Link to="/contact" className="btn btn-primary shrink-0">Request a consultation <Arrow /></Link>
          </Reveal>
        </Container>
      </section>

      <Testimonials />
      <CtaBand title="Thinking about selling?" body="Even if you’re a year out, a conversation now can help you plan the right improvements and timing." />
    </>
  );
}
