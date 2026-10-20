import { agent } from '../content/site.js';
import ContactForm from '../components/ContactForm.jsx';
import { Container, Icon, PageHero, Reveal } from '../components/UI.jsx';

export default function Contact() {
  const tel = agent.phone.replace(/[^\d+]/g, '');
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s start a conversation."
        intro="Share a little about what you’re planning and George will reach out personally, usually within one business day."
      />
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 md:grid-cols-[4fr_7fr] md:gap-16">
          <Reveal className="space-y-8">
            <div>
              <p className="eyebrow">Call or text</p>
              <a href={`tel:${tel}`} className="display mt-3 flex items-center gap-3 text-3xl hover:text-bronze-ink">
                <Icon name="phone" className="h-6 w-6 text-bronze" /> {agent.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow">Email</p>
              <a href={`mailto:${agent.email}`} className="mt-3 flex items-center gap-3 text-lg font-semibold break-all hover:text-bronze-ink">
                <Icon name="mail" className="h-5 w-5 shrink-0 text-bronze" /> {agent.email}
              </a>
            </div>
            <div>
              <p className="eyebrow">Office</p>
              <p className="mt-3 flex items-start gap-3 text-ink-2">
                <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-bronze" />
                <span>{agent.brokerage}<br />{agent.brokerageAddress}</span>
              </p>
            </div>
            <div className="rounded-2xl bg-stone/70 p-6 text-sm leading-relaxed text-ink-2">
              Prefer to meet in person? George is happy to meet at the office, over coffee, or at a property you’re curious about.
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
