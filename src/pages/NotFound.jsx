import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, KeyLines } from '../components/UI.jsx';
import { SplitText } from '../components/Motion.jsx';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | George Kalafut';
  }, []);

  // Navy so the fixed, transparent header stays legible.
  return (
    <section className="on-navy relative flex min-h-[85vh] items-center overflow-hidden bg-navy text-cream">
      <KeyLines className="pointer-events-none absolute -right-24 -top-10 hidden h-[130%] text-gold/10 md:block" />
      <Container className="relative pb-20 pt-40">
        <p className="eyebrow rise">404</p>
        <SplitText as="h1" immediate delay={100} text="This page has _moved on_." className="display mt-6 text-5xl sm:text-7xl" />
        <p className="rise mt-6 text-lg text-cream/75" style={{ animationDelay: '.5s' }}>The page you’re looking for doesn’t exist, but your next home might.</p>
        <Link to="/" className="btn btn-gold rise mt-10" style={{ animationDelay: '.7s' }}>Back to home</Link>
      </Container>
    </section>
  );
}
