import { Link } from 'react-router-dom';
import { Container } from '../components/UI.jsx';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-5xl sm:text-6xl">This page has moved on.</h1>
      <p className="mt-5 text-lg text-muted">The page you’re looking for doesn’t exist, but your next home might.</p>
      <Link to="/" className="btn btn-primary mt-10">Back to home</Link>
    </Container>
  );
}
