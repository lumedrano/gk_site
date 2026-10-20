import { Link } from 'react-router-dom';
import { agent } from '../content/site.js';
import { Container, Icon } from './UI.jsx';

// TODO: replace with the broker's completed IABS PDF (required by TREC).
const IABS_URL = 'https://www.trec.texas.gov/forms/information-about-brokerage-services';
const CPN_URL = 'https://www.trec.texas.gov/forms/consumer-protection-notice';

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(agent.social).filter(([, url]) => url);

  return (
    <footer className="bg-ink-2 text-sand">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-3xl text-cream">{agent.name}</p>
          <p className="mt-1 eyebrow !text-sand/80">{agent.title} · {agent.city}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{agent.tagline}</p>
        </div>

        <div>
          <p className="eyebrow !text-sand/70">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-cream" to="/about">About George</Link></li>
            <li><Link className="hover:text-cream" to="/buy">Buying a home</Link></li>
            <li><Link className="hover:text-cream" to="/sell">Selling your home</Link></li>
            <li><Link className="hover:text-cream" to="/areas">Areas served</Link></li>
            <li><Link className="hover:text-cream" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-sand/70">Get in touch</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a className="flex items-center gap-2 hover:text-cream" href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}>
                <Icon name="phone" className="h-4 w-4" /> {agent.phone}
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-cream" href={`mailto:${agent.email}`}>
                <Icon name="mail" className="h-4 w-4" /> {agent.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0" /> {agent.brokerageAddress}
            </li>
          </ul>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-4 text-sm">
              {socials.map(([k, url]) => (
                <a key={k} href={url} target="_blank" rel="noreferrer" className="capitalize hover:text-cream">{k}</a>
              ))}
            </div>
          )}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs leading-relaxed text-sand/80 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {agent.name}. {agent.title} with {agent.brokerage}. {agent.license}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={IABS_URL} target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-cream hover:underline">
              Texas Real Estate Commission Information About Brokerage Services
            </a>
            <a href={CPN_URL} target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-cream hover:underline">
              Texas Real Estate Commission Consumer Protection Notice
            </a>
            <span className="flex items-center gap-1.5" title="Equal Housing Opportunity">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3 2 10h2.5v10h15V10H22L12 3zm-4 9h8v1.6H8V12zm0 3.4h8V17H8v-1.6z" />
              </svg>
              Equal Housing Opportunity
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
