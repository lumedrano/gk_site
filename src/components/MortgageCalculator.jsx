import { useId, useState } from 'react';

// Segment colors: brand palette, checked for color-blind separation between neighbors.
// Every segment is also labeled with its value in the legend, so color is never the only cue.
const SEGMENTS = [
  { key: 'pi', label: 'Principal & interest', color: '#2B324E' },
  { key: 'tax', label: 'Property taxes', color: '#DFC594' },
  { key: 'ins', label: 'Homeowners insurance', color: '#867C70' },
  { key: 'pmi', label: 'Mortgage insurance (PMI)', color: '#694B30' },
  { key: 'hoa', label: 'HOA dues', color: '#8F9BC4' },
];

const usd = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const num = (v) => (Number.isFinite(+v) ? Math.max(0, +v) : 0);

export function calculate({ price, downPct, rate, years, taxRate, insurance, hoa }) {
  const down = (price * Math.min(downPct, 100)) / 100;
  const loan = Math.max(0, price - down);
  const n = years * 12;
  const r = rate / 100 / 12;
  const pi = loan === 0 ? 0 : r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
  const parts = {
    pi,
    tax: (price * taxRate) / 100 / 12,
    ins: insurance / 12,
    // Conventional-loan estimate: ~0.5%/yr of the loan when putting down less than 20%.
    pmi: downPct < 20 && loan > 0 ? (loan * 0.005) / 12 : 0,
    hoa,
  };
  const total = Object.values(parts).reduce((a, b) => a + b, 0);
  return { down, loan, parts, total, totalInterest: Math.max(0, pi * n - loan) };
}

export default function MortgageCalculator() {
  const id = useId();
  const [v, setV] = useState({ price: '550000', downPct: '20', rate: '6.5', years: '30', taxRate: '2.0', insurance: '2400', hoa: '0' });
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const values = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, num(x)]));
  const { down, loan, parts, total, totalInterest } = calculate(values);
  const shown = SEGMENTS.filter((s) => parts[s.key] > 0);

  return (
    <div className="grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-[5fr_6fr]">
      <form className="grid gap-5 bg-paper p-6 sm:grid-cols-2 sm:p-8" onSubmit={(e) => e.preventDefault()}>
        <Field id={`${id}-price`} label="Home price" prefix="$" value={v.price} onChange={set('price')} step="1000" wide />
        <Field id={`${id}-down`} label="Down payment" suffix="%" value={v.downPct} onChange={set('downPct')} step="1" max="100" hint={usd(down)} />
        <Field id={`${id}-rate`} label="Interest rate" suffix="%" value={v.rate} onChange={set('rate')} step="0.125" />
        <label className="block" htmlFor={`${id}-years`}>
          <span className="text-sm font-semibold text-navy">Loan term</span>
          <select id={`${id}-years`} className="field mt-2" value={v.years} onChange={set('years')}>
            <option value="30">30 years</option>
            <option value="20">20 years</option>
            <option value="15">15 years</option>
          </select>
        </label>
        <Field id={`${id}-tax`} label="Property tax rate" suffix="% / yr" value={v.taxRate} onChange={set('taxRate')} step="0.05" />
        <Field id={`${id}-ins`} label="Insurance" prefix="$" suffix="/ yr" value={v.insurance} onChange={set('insurance')} step="100" />
        <Field id={`${id}-hoa`} label="HOA dues" prefix="$" suffix="/ mo" value={v.hoa} onChange={set('hoa')} step="10" />
      </form>

      <div className="flex flex-col bg-white p-6 sm:p-8" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-[.14em] text-muted">Estimated monthly payment</p>
        <p className="display mt-2 text-5xl text-navy sm:text-6xl">{usd(total)}</p>

        {total > 0 && (
          <div className="mt-8 flex h-3 w-full gap-[2px]" role="img" aria-label="Monthly payment breakdown, listed below">
            {shown.map((s, i) => (
              <span
                key={s.key}
                title={`${s.label}: ${usd(parts[s.key])}`}
                className={`h-full ${i === 0 ? 'rounded-l' : ''} ${i === shown.length - 1 ? 'rounded-r' : ''}`}
                style={{ width: `${(parts[s.key] / total) * 100}%`, background: s.color }}
              />
            ))}
          </div>
        )}

        <dl className="mt-6 divide-y divide-line">
          {shown.map((s) => (
            <div key={s.key} className="flex items-center justify-between gap-4 py-3 text-[.95rem]">
              <dt className="flex items-center gap-3 text-body">
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: s.color }} aria-hidden="true" />
                {s.label}
              </dt>
              <dd className="font-semibold tabular-nums text-navy">{usd(parts[s.key])}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
          <div>
            <p className="text-muted">Loan amount</p>
            <p className="mt-1 font-semibold tabular-nums text-navy">{usd(loan)}</p>
          </div>
          <div>
            <p className="text-muted">Total interest</p>
            <p className="mt-1 font-semibold tabular-nums text-navy">{usd(totalInterest)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, prefix, suffix, hint, wide, ...input }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-semibold text-navy">
        {label}
        {hint && <span className="font-normal tabular-nums text-muted">{hint}</span>}
      </label>
      <div className="relative mt-2">
        {prefix && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          className={`field tabular-nums ${prefix ? '!pl-8' : ''} ${suffix ? '!pr-16' : ''}`}
          {...input}
        />
        {suffix && <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted">{suffix}</span>}
      </div>
    </div>
  );
}
