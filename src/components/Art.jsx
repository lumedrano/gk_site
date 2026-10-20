import { agent } from '../content/site.js';

/** Layered Hill Country horizon used as the hero backdrop. */
export function HillsArt({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9DCC3" />
          <stop offset="0.6" stopColor="#F1E6D2" />
          <stop offset="1" stopColor="#F5F1E8" />
        </linearGradient>
        <radialGradient id="sun" cx="0.72" cy="0.38" r="0.22">
          <stop offset="0" stopColor="#F3C98F" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F3C98F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#sky)" />
      <rect width="1200" height="600" fill="url(#sun)" />
      <circle cx="864" cy="228" r="46" fill="#E9B676" opacity="0.85" />
      <path d="M0 360 C 140 300 260 330 380 300 S 620 250 760 290 S 1020 260 1200 300 V600 H0Z" fill="#C9B89A" opacity="0.7" />
      <path d="M0 410 C 160 360 300 400 460 370 S 720 330 880 370 S 1080 350 1200 380 V600 H0Z" fill="#9DA48C" opacity="0.85" />
      <path d="M0 470 C 200 430 340 470 520 445 S 820 410 980 450 S 1140 440 1200 455 V600 H0Z" fill="#6F7E6C" />
      <path d="M0 530 C 220 500 420 540 640 515 S 980 495 1200 520 V600 H0Z" fill="#3E4C44" />
      {/* Live oaks */}
      <g fill="#2E3B36">
        <ellipse cx="180" cy="505" rx="46" ry="22" />
        <rect x="176" y="505" width="7" height="22" />
        <ellipse cx="236" cy="512" rx="30" ry="15" />
        <rect x="233" y="512" width="5" height="16" />
        <ellipse cx="1010" cy="497" rx="40" ry="19" />
        <rect x="1006" y="497" width="6" height="20" />
      </g>
    </svg>
  );
}

/** Headshot if one is configured, otherwise an elegant monogram card. */
export function Portrait({ className = '' }) {
  if (agent.headshot) {
    return <img src={agent.headshot} alt={`Portrait of ${agent.name}`} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div className={`relative flex h-full w-full items-end overflow-hidden bg-ink ${className}`} role="img" aria-label={`${agent.name} monogram`}>
      <HillsArt className="absolute inset-0 h-full w-full opacity-25 mix-blend-luminosity" />
      <div className="relative w-full p-8">
        <span className="display block text-8xl text-cream/90">GK</span>
        <span className="mt-3 block h-px w-16 bg-bronze" />
        <span className="eyebrow mt-4 block !text-sand">{agent.name}</span>
      </div>
    </div>
  );
}
