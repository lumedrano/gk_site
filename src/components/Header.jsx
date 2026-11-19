import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { agent, images, neighborhoods } from '../content/site.js';
import { lockScroll } from '../lib/smoothScroll.js';
import { useScrollFrame } from './Motion.jsx';
import { Arrow, Icon } from './UI.jsx';
import mark from '../assets/brand/highland-mark.png';

/**
 * Site navigation. Items with `links` open a full-width mega panel on desktop;
 * `type: 'neighborhoods'` renders the neighborhood photo grid instead of a feature.
 * `side` decides which half of the split navbar the item sits in.
 */
export const MENU = [
  {
    label: 'Buy',
    to: '/buy',
    side: 'left',
    eyebrow: 'Buying',
    title: 'Buy with clarity, not guesswork.',
    intro: 'A builder’s read on every home, offers grounded in real numbers, and a steady hand to closing.',
    links: [
      { to: '/buy', label: 'Buyer’s guide', desc: 'How George helps you buy well' },
      { to: '/buy#process', label: 'The buying process', desc: 'From first call to keys in hand' },
      { to: '/neighborhoods', label: 'Neighborhood guides', desc: 'Austin and the Hill Country' },
      { to: '/resources#mortgage-calculator', label: 'Mortgage calculator', desc: 'Estimate your monthly payment' },
    ],
    feature: { image: images.buying, title: 'Start your search with a plan', to: '/contact?interest=Buying', cta: 'Book a buyer consultation' },
  },
  {
    label: 'Sell',
    to: '/sell',
    side: 'left',
    eyebrow: 'Selling',
    title: 'Price it right. Present it well.',
    intro: 'Know which improvements pay off, list at a price backed by data, and negotiate on net proceeds.',
    links: [
      { to: '/sell', label: 'Seller’s guide', desc: 'Preparation, pricing and presentation' },
      { to: '/sell#process', label: 'The selling process', desc: 'A clear path to closing' },
      { to: '/contact?interest=Selling', label: 'What’s my home worth?', desc: 'Request a pricing consultation' },
    ],
    feature: { image: images.selling, title: 'A complimentary pricing consultation', to: '/contact?interest=Selling', cta: 'Request a valuation' },
  },
  {
    label: 'Invest',
    to: '/invest',
    side: 'left',
    eyebrow: 'Investing',
    title: 'Run the numbers before you commit.',
    intro: 'Rentals, value-add projects and flips, underwritten by an agent who invests himself.',
    links: [
      { to: '/invest', label: 'Investor’s guide', desc: 'Strategy, sourcing and underwriting' },
      { to: '/invest#process', label: 'How a deal comes together', desc: 'From strategy to closed deal' },
      { to: '/contact?interest=Investing', label: 'Analyze a deal', desc: 'Send George an address' },
    ],
    feature: { image: images.investing, title: 'Have a property in mind?', to: '/contact?interest=Investing', cta: 'Get a second opinion' },
  },
  {
    label: 'Neighborhoods',
    to: '/neighborhoods',
    side: 'left',
    type: 'neighborhoods',
    eyebrow: 'Neighborhood guides',
    title: 'Know the area before you commit.',
    intro: 'Character, price dynamics and daily life across Austin and the Hill Country.',
    links: neighborhoods.map((n) => ({ to: `/neighborhoods/${n.slug}`, label: n.name, image: n.image })),
  },
  {
    label: 'About',
    to: '/about',
    side: 'right',
    eyebrow: `About ${agent.firstName}`,
    title: 'A builder’s background. A client-first approach.',
    intro: 'Developer, investor and REALTOR® with Highland Property Group at eXp Realty.',
    links: [
      { to: '/about', label: `Meet ${agent.firstName}`, desc: 'Background, credentials and approach' },
      { to: '/about#why', label: `Why work with ${agent.firstName}`, desc: 'How every client is looked after' },
      { to: '/about#stories', label: 'Client stories', desc: 'In their own words' },
      { to: '/contact', label: 'Get in touch', desc: 'Usually a reply within one business day' },
    ],
    feature: { image: images.skyline, title: 'Austin real estate, handled with strategy', to: '/about', cta: `${agent.firstName}’s story` },
  },
  {
    label: 'Resources',
    to: '/resources',
    side: 'right',
    eyebrow: 'Resources',
    title: 'Tools for smarter decisions.',
    intro: 'Calculators and trusted references for buyers, sellers and investors.',
    links: [
      { to: '/resources#mortgage-calculator', label: 'Mortgage calculator', desc: 'Principal, interest, taxes and insurance' },
      { to: '/resources#links', label: 'Trusted references', desc: 'TREC notices, appraisal districts, exemptions' },
      { to: '/contact', label: 'Ask George', desc: 'Talk through your numbers' },
    ],
    feature: { image: images.interior, title: 'What would your monthly payment be?', to: '/resources#mortgage-calculator', cta: 'Open the calculator' },
  },
];

const tel = agent.phone.replace(/[^\d+]/g, '');
const OPEN_DELAY = 70;
const CLOSE_DELAY = 220;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // full-screen (mobile/tablet)
  const [panel, setPanel] = useState(null); // open mega panel label (desktop)
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname, search, hash } = useLocation();
  const timer = useRef(null);
  const progress = useRef(null);
  const lastY = useRef(0);

  const closeAll = useCallback(() => {
    clearTimeout(timer.current);
    setPanel(null);
    setMenuOpen(false);
  }, []);

  useEffect(closeAll, [pathname, search, hash, closeAll]);
  useEffect(() => lockScroll(menuOpen), [menuOpen]);

  // Compact + solid after leaving the top; tuck away on scroll down, return on scroll up;
  // gold progress line tracks how far down the page you are.
  useScrollFrame(() => {
    const y = window.scrollY;
    setScrolled(y > 40);
    if (Math.abs(y - lastY.current) > 6) {
      setHidden(y > lastY.current && y > 480);
      lastY.current = y;
    }
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  });

  useEffect(() => {
    if (!panel) return;
    const onKey = (e) => e.key === 'Escape' && setPanel(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panel]);

  const openPanel = (label) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPanel(label), panel ? 0 : OPEN_DELAY);
  };
  const scheduleClose = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPanel(null), CLOSE_DELAY);
  };

  const solid = scrolled || panel;
  const current = MENU.find((m) => m.label === panel);

  return (
    <>
      {/* Dims the page behind an open mega panel */}
      <div
        className={`fixed inset-0 z-40 bg-navy/45 backdrop-blur-[3px] transition-opacity duration-500 ${panel ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setPanel(null)}
        aria-hidden="true"
      />

      <header
        onMouseLeave={scheduleClose}
        onMouseEnter={() => panel && clearTimeout(timer.current)}
        className={`fixed inset-x-0 top-0 z-50 text-cream transition-[transform,background-color] duration-700 ease-[var(--ease-out)] ${
          hidden && !menuOpen && !panel ? '-translate-y-full' : ''
        } ${solid ? 'bg-navy/[.97] backdrop-blur-xl' : 'bg-transparent'}`}
      >
        {/* Fade from the top so the transparent header stays legible over any photo */}
        <div className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-navy/80 via-navy/35 to-transparent transition-opacity duration-700 ${solid ? 'opacity-0' : 'opacity-100'}`} />

        {/* Utility bar */}
        <div className={`hidden overflow-hidden transition-[max-height,opacity] duration-700 ease-[var(--ease-out)] xl:block ${scrolled ? 'max-h-0 opacity-0' : 'max-h-11 opacity-100'}`}>
          <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between border-b border-white/10 px-10 text-[.66rem] font-semibold uppercase tracking-[.24em] text-cream/65">
            <span className="flex items-center gap-3">
              {agent.team}
              <span className="h-3 w-px bg-cream/30" />
              Brokered by {agent.brokerage}
            </span>
            <span className="flex items-center gap-7">
              <a href={`tel:${tel}`} className="flex items-center gap-2 transition-colors hover:text-gold"><Icon name="phone" className="h-3.5 w-3.5" />{agent.phone}</a>
              <a href={`mailto:${agent.email}`} className="flex items-center gap-2 transition-colors hover:text-gold"><Icon name="mail" className="h-3.5 w-3.5" />{agent.email}</a>
            </span>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`relative mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center px-5 transition-[height] duration-700 ease-[var(--ease-out)] sm:px-8 xl:grid-cols-[1fr_auto_1fr] xl:px-10 ${
            scrolled ? 'h-[76px]' : 'h-[88px] xl:h-[104px]'
          }`}
        >
          <nav className="hidden items-center gap-9 xl:flex" aria-label="Main">
            {MENU.filter((m) => m.side === 'left').map((item) => (
              <TopItem key={item.label} item={item} open={panel === item.label} onOpen={openPanel} setPanel={setPanel} />
            ))}
          </nav>

          <Brand compact={scrolled} />

          <div className="flex items-center justify-end gap-7">
            <nav className="hidden items-center gap-9 xl:flex" aria-label="More">
              {MENU.filter((m) => m.side === 'right').map((item) => (
                <TopItem key={item.label} item={item} open={panel === item.label} onOpen={openPanel} setPanel={setPanel} />
              ))}
            </nav>
            <a
              href={`tel:${tel}`}
              data-magnetic
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-[border-color,background-color,color] duration-500 hover:border-gold hover:bg-gold hover:text-navy xl:flex"
              aria-label={`Call ${agent.firstName}`}
              title={`Call ${agent.firstName}`}
            >
              <Icon name="phone" className="h-4 w-4" />
            </a>
            <Link to="/contact" className="btn btn-outline-gold btn-sm hidden sm:inline-flex">Let’s talk</Link>
            <button
              type="button"
              className="group -mr-2 flex items-center gap-3 p-2 text-[.68rem] font-semibold uppercase tracking-[.24em] xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="hidden sm:inline">Menu</span>
              <span className="flex w-7 flex-col items-end gap-[7px]" aria-hidden="true">
                <span className="h-px w-7 bg-cream" />
                <span className="h-px w-4 bg-gold transition-all duration-500 group-hover:w-7" />
              </span>
            </button>
          </div>

          {/* Scroll progress */}
          <span
            ref={progress}
            className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-opacity duration-500 ${scrolled && !panel ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: 'scaleX(0)' }}
            aria-hidden="true"
          />
          <span className={`absolute inset-x-0 bottom-0 h-px bg-white/10 transition-opacity duration-500 ${solid ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
        </div>

        <MegaPanel item={current} open={!!panel} />
      </header>

      <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function Brand({ compact }) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3 xl:flex-col xl:gap-0 xl:justify-self-center xl:text-center"
      aria-label={`${agent.name}, ${agent.team}, home`}
    >
      <img
        src={mark}
        alt=""
        className={`transition-all duration-700 ease-[var(--ease-out)] group-hover:scale-105 ${compact ? 'h-9 w-9 xl:h-8 xl:w-8' : 'h-11 w-11 xl:h-12 xl:w-12'}`}
      />
      <span className="flex flex-col leading-tight xl:mt-2 xl:items-center">
        <span className="display text-lg uppercase tracking-[.16em] text-cream sm:text-xl xl:text-[1.15rem] xl:tracking-[.28em]">{agent.name}</span>
        <span
          className={`overflow-hidden text-[.55rem] font-semibold uppercase tracking-[.34em] text-gold transition-all duration-700 ease-[var(--ease-out)] ${
            compact ? 'max-h-0 opacity-0 xl:max-h-0' : 'mt-1 max-h-4 opacity-100'
          }`}
        >
          {agent.team}
        </span>
      </span>
    </Link>
  );
}

function TopItem({ item, open, onOpen, setPanel }) {
  const { pathname } = useLocation();
  const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
  const panelId = `panel-${item.label.toLowerCase()}`;

  function onKeyDown(e) {
    // Arrow down opens the panel and moves focus into it.
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setPanel(item.label);
      requestAnimationFrame(() => document.querySelector(`#${panelId} a`)?.focus());
    }
  }

  return (
    <Link
      to={item.to}
      onMouseEnter={() => onOpen(item.label)}
      onFocus={() => onOpen(item.label)}
      onKeyDown={onKeyDown}
      aria-expanded={open}
      aria-controls={panelId}
      className={`nav-link py-3 text-[.72rem] font-semibold uppercase tracking-[.24em] transition-colors duration-300 hover:text-gold ${
        active || open ? 'active text-gold' : 'text-cream/90'
      }`}
    >
      {item.label}
    </Link>
  );
}

function MegaPanel({ item, open }) {
  return (
    <div
      className="absolute inset-x-0 top-full hidden overflow-hidden bg-navy shadow-[0_40px_80px_-30px_rgb(0_0_0/.55)] xl:block"
      style={{
        clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
        visibility: open ? 'visible' : 'hidden',
        transition: open ? 'clip-path .75s var(--ease-io)' : 'clip-path .55s var(--ease-io), visibility 0s linear .55s',
      }}
    >
      {item && (
        <div
          key={item.label}
          id={`panel-${item.label.toLowerCase()}`}
          className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1.1fr)] gap-14 px-10 py-14"
        >
          <div className="mega-in" style={{ animationDelay: '.1s' }}>
            <p className="eyebrow light">{item.eyebrow}</p>
            <p className="display mt-5 text-[2rem] leading-tight text-cream">{item.title}</p>
            <p className="mt-5 max-w-sm leading-relaxed text-cream/65">{item.intro}</p>
            <Link to={item.to} className="link-arrow mt-8 !text-gold">
              View {item.label.toLowerCase()} <Arrow />
            </Link>
          </div>

          {item.type === 'neighborhoods' ? (
            <div className="col-span-2 grid grid-cols-3 gap-4">
              {item.links.map((l, i) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="mega-in group relative block aspect-[16/10] overflow-hidden bg-navy-2"
                  style={{ animationDelay: `${0.14 + i * 0.05}s` }}
                >
                  <img src={l.image} alt="" loading="lazy" className="zoom-img absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                    <span className="display text-lg leading-tight text-cream">{l.label}</span>
                    <Arrow className="h-4 w-4 shrink-0 -translate-x-2 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <>
              <ul className="border-t border-white/10">
                {item.links.map((l, i) => (
                  <li key={l.to} className="mega-in border-b border-white/10" style={{ animationDelay: `${0.14 + i * 0.06}s` }}>
                    <Link to={l.to} className="group flex items-center gap-6 py-5">
                      <span className="text-[.65rem] font-semibold tracking-[.2em] text-gold/70">0{i + 1}</span>
                      <span className="flex-1">
                        <span className="display block text-[1.4rem] text-cream transition-[color,transform] duration-500 ease-[var(--ease-out)] group-hover:translate-x-1.5 group-hover:text-gold">
                          {l.label}
                        </span>
                        <span className="mt-1 block text-sm text-cream/55">{l.desc}</span>
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-gold opacity-0 transition-all duration-500 group-hover:border-gold group-hover:opacity-100">
                        <Arrow className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link to={item.feature.to} className="mega-in group relative block min-h-[300px] overflow-hidden" style={{ animationDelay: '.2s' }}>
                <img src={item.feature.image} alt="" loading="lazy" className="zoom-img absolute inset-0 h-full w-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-7">
                  <span className="display block text-2xl leading-snug text-cream">{item.feature.title}</span>
                  <span className="mt-4 flex items-center gap-3 text-[.68rem] font-semibold uppercase tracking-[.22em] text-gold">
                    <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" />
                    {item.feature.cta}
                  </span>
                </span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function FullMenu({ open, onClose }) {
  const closeRef = useRef(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!open) return setExpanded(null);
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const items = [...MENU, { label: 'Contact', to: '/contact' }];
  const tab = open ? 0 : -1;

  return (
    <div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      className="fixed inset-0 z-[60] bg-navy text-cream"
      style={{
        clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
        visibility: open ? 'visible' : 'hidden',
        transition: open ? 'clip-path .9s var(--ease-io)' : 'clip-path .8s var(--ease-io), visibility 0s linear .8s',
      }}
    >
      <div className="grid h-full md:grid-cols-[1fr_minmax(0,40%)]">
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-6 sm:px-10" data-lenis-prevent>
          <div className="flex items-center justify-between">
            <img src={mark} alt="" className="h-11 w-11" />
            <button ref={closeRef} type="button" onClick={onClose} className="group flex items-center gap-3 p-2 text-[.68rem] font-semibold uppercase tracking-[.24em]" tabIndex={tab}>
              Close
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:rotate-90 group-hover:border-gold group-hover:text-gold">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </span>
            </button>
          </div>

          <nav className="my-auto py-10" aria-label="Mobile">
            <ul>
              {items.map((item, i) => {
                const isOpen = expanded === item.label;
                const sub = item.links;
                return (
                  <li key={item.label} className="border-b border-white/10">
                    <div className="flex items-center overflow-hidden">
                      <NavLink
                        to={item.to}
                        tabIndex={tab}
                        className={({ isActive }) =>
                          `group flex flex-1 items-baseline gap-5 py-4 transition-transform duration-[900ms] ease-[var(--ease-out)] ${open ? 'translate-y-0' : 'translate-y-full'} ${isActive ? 'text-gold' : ''}`
                        }
                        style={{ transitionDelay: open ? `${250 + i * 55}ms` : '0ms' }}
                      >
                        <span className="text-[.65rem] font-semibold tracking-[.2em] text-gold">{String(i + 1).padStart(2, '0')}</span>
                        <span className="display text-[2rem] transition-colors group-hover:text-gold sm:text-5xl">{item.label}</span>
                      </NavLink>
                      {sub && (
                        <button
                          type="button"
                          tabIndex={tab}
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? 'Hide' : 'Show'} ${item.label} links`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-gold transition-colors hover:border-gold"
                        >
                          <span className={`text-xl leading-none transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                        </button>
                      )}
                    </div>
                    {sub && (
                      <div className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <ul className="overflow-hidden">
                          {sub.map((l) => (
                            <li key={l.to}>
                              <Link to={l.to} tabIndex={isOpen ? tab : -1} className="flex items-center justify-between py-2.5 pl-11 text-[.95rem] text-cream/75 transition-colors hover:text-gold">
                                {l.label}
                                <Arrow className="h-3.5 w-3.5 text-gold" />
                              </Link>
                            </li>
                          ))}
                          <li className="h-4" aria-hidden="true" />
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={`grid gap-2 text-sm text-cream/70 transition-opacity duration-700 ${open ? 'opacity-100 delay-700' : 'opacity-0'}`}>
            <a href={`tel:${tel}`} className="hover:text-gold" tabIndex={tab}>{agent.phone}</a>
            <a href={`mailto:${agent.email}`} className="hover:text-gold" tabIndex={tab}>{agent.email}</a>
            <p className="mt-2 text-xs uppercase tracking-[.2em] text-cream/50">{agent.team} · {agent.brokerage}</p>
          </div>
        </div>

        <div className="relative hidden overflow-hidden md:block">
          <img
            src={images.skyline}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-out)] ${open ? 'scale-100' : 'scale-125'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-navy/10" />
          <p className="display absolute bottom-10 left-10 right-10 text-3xl italic leading-snug text-cream">{agent.tagline}</p>
        </div>
      </div>
    </div>
  );
}
