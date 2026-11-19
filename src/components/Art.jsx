import { agent } from '../content/site.js';
import mark from '../assets/brand/highland-mark.png';

/** George's headshot, or a branded placeholder until one is provided. */
export function Portrait({ className = '' }) {
  if (agent.headshot) {
    return <img src={agent.headshot} alt={`Portrait of ${agent.name}`} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div className={`relative flex h-full w-full flex-col items-center justify-center bg-navy ${className}`} role="img" aria-label={`${agent.name}, ${agent.team}`}>
      <span className="absolute inset-5 border border-gold/30" aria-hidden="true" />
      <img src={mark} alt="" className="w-2/5 max-w-40" />
      <span className="mt-8 block h-px w-12 bg-gold" />
      <span className="display mt-6 block text-2xl text-cream">{agent.name}</span>
      <span className="mt-2 block text-xs font-semibold uppercase tracking-[.2em] text-cream/60">{agent.team}</span>
    </div>
  );
}
