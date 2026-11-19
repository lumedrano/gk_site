import { useEffect } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Intro from './components/Intro.jsx';
import { initSmoothScroll, scrollToElement, scrollToTop } from './lib/smoothScroll.js';
import { initMagnetic } from './lib/magnetic.js';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Buying from './pages/Buying.jsx';
import Selling from './pages/Selling.jsx';
import Investing from './pages/Investing.jsx';
import Neighborhoods from './pages/Neighborhoods.jsx';
import Neighborhood from './pages/Neighborhood.jsx';
import Resources from './pages/Resources.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

const SITE = 'George Kalafut | Highland Property Group';

// Pages with dynamic titles (e.g. a single neighborhood) set their own.
const TITLES = {
  '/': SITE,
  '/about': 'About George | George Kalafut',
  '/buy': 'Buying a Home | George Kalafut',
  '/sell': 'Selling Your Home | George Kalafut',
  '/invest': 'Investing | George Kalafut',
  '/neighborhoods': 'Neighborhoods | George Kalafut',
  '/resources': 'Resources & Mortgage Calculator | George Kalafut',
  '/contact': 'Contact | George Kalafut',
};

function useRouteChrome() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    initSmoothScroll();
    initMagnetic();
  }, []);

  useEffect(() => {
    if (TITLES[pathname]) document.title = TITLES[pathname];
    if (!hash) return scrollToTop();
    // Wait a frame so the new page has rendered before scrolling to the section.
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) scrollToElement(el);
      else scrollToTop();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);
}

export default function App() {
  useRouteChrome();
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <Intro />
      <Header />
      <main id="main" key={pathname} className="page-in flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy" element={<Buying />} />
          <Route path="/sell" element={<Selling />} />
          <Route path="/invest" element={<Investing />} />
          <Route path="/neighborhoods" element={<Neighborhoods />} />
          <Route path="/neighborhoods/:slug" element={<Neighborhood />} />
          <Route path="/areas" element={<Navigate to="/neighborhoods" replace />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
