import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { agent } from '../content/site.js';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
const INTERESTS = ['Buying', 'Selling', 'Buying & selling', 'Investing', 'Relocating', 'Just exploring'];
const TIMELINES = ['ASAP', '1–3 months', '3–6 months', '6+ months', 'Not sure yet'];

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [params] = useSearchParams();
  const [interest, setInterest] = useState(() => {
    const q = params.get('interest');
    return INTERESTS.includes(q) ? q : 'Buying';
  });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.company) return; // honeypot: bots fill hidden fields
    delete data.company;
    data.interest = interest;

    if (!ENDPOINT) {
      const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:${agent.email}?subject=${encodeURIComponent(`Website inquiry: ${interest}`)}&body=${encodeURIComponent(body)}`;
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-line bg-white p-10 text-center">
        <p className="display text-3xl text-navy">Thank you.</p>
        <p className="mt-3 text-muted">
          {agent.firstName} will be in touch within one business day. If it’s urgent, call{' '}
          <a className="font-semibold text-navy underline" href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}>{agent.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 border border-line bg-white p-6 sm:p-10">
      <fieldset>
        <legend className="text-sm font-semibold text-navy">I’m interested in</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((opt) => (
            <button
              key={opt}
              type="button"
              aria-pressed={interest === opt}
              onClick={() => setInterest(opt)}
              className={`border px-4 py-2 text-sm font-medium transition-colors ${
                interest === opt ? 'border-navy bg-navy text-paper' : 'border-line bg-white text-body hover:border-navy'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-navy">Name</span>
          <input className="field mt-2" name="name" autoComplete="name" required />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy">Email</span>
          <input className="field mt-2" type="email" name="email" autoComplete="email" required />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy">Phone <span className="font-normal text-muted">(optional)</span></span>
          <input className="field mt-2" type="tel" name="phone" autoComplete="tel" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy">Timeline</span>
          <select className="field mt-2" name="timeline" defaultValue="1–3 months">
            {TIMELINES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-navy">How can George help?</span>
        <textarea
          className="field mt-2 min-h-36"
          name="message"
          placeholder="Neighborhoods you’re considering, budget, the home you’re selling, anything useful."
        />
      </label>

      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status === 'error' && (
        <p className="bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          Something went wrong sending your message. Please try again or email {agent.email}.
        </p>
      )}

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">Your information is never sold or shared.</p>
        <button className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
