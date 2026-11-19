import { faqs, highlights, images, process } from '../content/site.js';
import Process, { Highlights } from '../components/Process.jsx';
import { CtaBand, Faq, PageHero } from '../components/UI.jsx';

export default function Buying() {
  return (
    <>
      <PageHero
        eyebrow="Buying a home"
        title="Buy with _clarity_, not guesswork."
        image={images.buying}
        intro="Austin moves quickly. George helps you understand exactly what you’re buying, what it’s really worth, and how to write an offer that wins on the right terms."
      />
      <Highlights items={highlights.buying} />
      <Process eyebrow="The process" title="From first call to keys in hand." steps={process.buying} />
      <Faq items={faqs.buying} />
      <CtaBand title="Ready to start your search?" body="Tell George what you’re looking for and he’ll put together a plan tailored to your goals." />
    </>
  );
}
