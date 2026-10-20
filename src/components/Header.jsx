import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { agent } from '../content/site.js';

const NAV = [
  { to: '/about', label: 'About' },
  { to: '/buy', label: 'Buy' },
  { to: '/sell', label: 'Sell' },
  { to: '/areas', label: 'Areas' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-colors ${scrolled || open ? 'border-b border-line bg-cream/95 backdrop-blur' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-baseline gap-2" aria-label={`${agent.name}, home`}>
          <span className="display text-2xl text-ink">{agent.name}</span>
          <span className="eyebrow hidden sm:inline">{agent.title}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors hover:text-bronze-ink ${isActive ? 'text-bronze-ink' : 'text-ink-2'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary !px-5 !py-2.5">Let’s talk</Link>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-cream md:hidden" aria-label="Mobile">
          <div className="flex flex-col px-5 py-4">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className="display border-b border-line py-4 text-2xl">
                {n.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn btn-primary mt-6">Let’s talk</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
