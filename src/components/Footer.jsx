import { Link } from 'react-router-dom';
import { agent } from '../content/site.js';
import { MENU } from './Header.jsx';
import { scrollToTop } from '../lib/smoothScroll.js';
import { Arrow, Container, Icon, Reveal } from './UI.jsx';
import highlandLogo from '../assets/brand/highland-logo-navy.jpg';
import expLogoWhite from '../assets/brand/exp-luxury-white.png';

// TODO: replace with the broker's completed IABS PDF (required by TREC).
const IABS_URL = 'https://www.trec.texas.gov/forms/information-about-brokerage-services';
const CPN_URL = 'https://www.trec.texas.gov/forms/consumer-protection-notice';

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(agent.social).filter(([, url]) => url);
  const tel = agent.phone.replace(/[^\d+]/g, '');

  return (
    // Background must stay exact brand navy: the Highland logo file has a navy background baked in.
    <footer className="on-navy border-t border-white/10 bg-navy text-cream/75">
      <Container className="py-16 lg:py-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-16">
          <Reveal className="col-span-2 lg:col-span-1">
            {/* Co-branding per brand guide: eXp Luxury (one-color white on navy) sits left of the Highland mark. */}
            <div className="flex items-center gap-5">
              <img src={expLogoWhite} alt="eXp Realty Luxury" className="h-12 w-auto" />
              <span className="h-20 w-px bg-cream/25" aria-hidden="true" />
              <img src={highlandLogo} alt="Highland Property Group, Austin, Texas" className="h-28 w-auto" />
            </div>
            <p className="display mt-8 max-w-xs text-2xl italic leading-snug text-cream">{agent.tagline}</p>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">Explore</p>
            <ul className="mt-6 space-y-3">
              {MENU.map((n) => (
                <li key={n.to}><Link className="nav-link transition-colors hover:text-gold" to={n.to}>{n.label}</Link></li>
              ))}
              <li><Link className="nav-link transition-colors hover:text-gold" to="/contact">Contact</Link></li>
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <p className="eyebrow">Get in touch</p>
            <ul className="mt-6 space-y-4">
              <li>
                <a className="flex items-center gap-3 transition-colors hover:text-gold" href={`tel:${tel}`}>
                  <Icon name="phone" className="h-4 w-4 text-gold" /> {agent.phone}
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 break-all transition-colors hover:text-gold" href={`mailto:${agent.email}`}>
                  <Icon name="mail" className="h-4 w-4 shrink-0 text-gold" /> {agent.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="pin" className="mt-1 h-4 w-4 shrink-0 text-gold" /> {agent.brokerageAddress}
              </li>
            </ul>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-5 text-sm">
                {socials.map(([k, url]) => (
                  <a key={k} href={url} target="_blank" rel="noreferrer" className="capitalize transition-colors hover:text-gold">{k}</a>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={300} className="hidden lg:block">
            <p className="eyebrow">Start a conversation</p>
            <p className="mt-6 leading-relaxed">No pressure, no obligation. Just a clear plan for your next move.</p>
            <Link to="/contact" className="btn btn-gold mt-8">Let’s talk <Arrow /></Link>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-start lg:mt-20 justify-between gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
          <p className="display text-2xl text-cream">{agent.name} <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-[.2em] text-gold">{agent.title}</span></p>
          <button
            type="button"
            onClick={() => scrollToTop({ smooth: true })}
            className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[.2em] transition-colors hover:text-gold"
          >
            Back to top
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-gold">
              <Arrow className="h-4 w-4 -rotate-90" />
            </span>
          </button>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs leading-relaxed text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {agent.name}, {agent.title}. {agent.team}, brokered by {agent.brokerage}. {agent.license}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={IABS_URL} target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-gold hover:underline">
              TREC Information About Brokerage Services
            </a>
            <a href={CPN_URL} target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-gold hover:underline">
              TREC Consumer Protection Notice
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
