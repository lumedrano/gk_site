import { Link } from 'react-router-dom';
import { Icon } from './UI.jsx';
import { ClipReveal } from './Motion.jsx';

export default function NeighborhoodCard({ n, index, delay = 0, tall = false }) {
  return (
    <ClipReveal delay={delay}>
      <Link to={`/neighborhoods/${n.slug}`} className={`group relative block overflow-hidden bg-navy text-cream ${tall ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
        <img src={n.image} alt="" loading="lazy" className="zoom-img absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
        <span className="absolute left-6 top-6 text-xs font-semibold tracking-[.2em] text-gold">{String(index + 1).padStart(2, '0')}</span>
        {n.video && (
          <span className="absolute right-6 top-6 flex items-center gap-1.5 bg-navy/60 px-3 py-1.5 text-[.65rem] font-semibold uppercase tracking-[.18em] backdrop-blur">
            <Icon name="play" className="h-3 w-3 fill-current" /> Video
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-7">
          <h3 className="display text-3xl">{n.name}</h3>
          <p className="mt-2 text-sm text-cream/75">{n.communities.join(' · ')}</p>
          <span className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-gold">
            <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" /> Explore
          </span>
        </div>
      </Link>
    </ClipReveal>
  );
}
