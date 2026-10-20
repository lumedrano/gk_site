import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Buying from './pages/Buying.jsx';
import Selling from './pages/Selling.jsx';
import Areas from './pages/Areas.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

const TITLES = {
  '/': 'George Kalafut | Austin REALTOR®',
  '/about': 'About George | George Kalafut',
  '/buy': 'Buying a Home | George Kalafut',
  '/sell': 'Selling Your Home | George Kalafut',
  '/areas': 'Areas Served | George Kalafut',
  '/contact': 'Contact | George Kalafut',
};

function useRouteChrome() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[pathname] || 'George Kalafut | Austin REALTOR®';
  }, [pathname]);
}

export default function App() {
  useRouteChrome();
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy" element={<Buying />} />
          <Route path="/sell" element={<Selling />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
