import { useState } from 'react';
import { Icon } from './UI.jsx';

/** Accepts any common YouTube URL form (watch, youtu.be, shorts, embed) or a bare video ID. */
export function youTubeId(url = '') {
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(url) ? url : null;
}

/**
 * Click-to-load YouTube player: shows the thumbnail until played, so pages stay
 * fast and YouTube isn't contacted until the visitor chooses to watch.
 */
export default function YouTube({ url, title }) {
  const id = youTubeId(url);
  const [playing, setPlaying] = useState(false);
  if (!id) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-navy">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play video: ${title}`}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition-transform group-hover:scale-105">
            <Icon name="play" className="ml-1 h-8 w-8 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
