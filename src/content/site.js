// All editable site content lives here. Each export maps to a future CMS
// content type (e.g. Contentful), so moving to a CMS means swapping where the
// data comes from, not rewriting the components.
//
// [Bracketed] values are placeholders until confirmed with George.

// Photography. These are licensed Unsplash placeholders (public/images/placeholder)
// until George's own Austin photography is ready: swap the paths here.
const img = (name) => `${import.meta.env.BASE_URL}images/placeholder/${name}.webp`;
export const images = {
  hero: img('hero-skyline-dusk'),
  hillCountry: img('hill-country-oak'),
  skyline: img('skyline-aerial'),
  interior: img('interior-living'),
  lake: img('lady-bird-lake'),
  buying: img('buy-stone-home'),
  selling: img('sell-home-dusk'),
  investing: img('invest-congress-bridge'),
};

// Pull quote over the full-width photo on the home page.
export const quote =
  'Great real estate is about people. Understand the goal first, and the right move becomes clear.';

// Large editorial statement on the home page.
export const statement =
  'Buying or selling a home is one of the biggest financial decisions you’ll make. It deserves more than a sales pitch: it deserves a strategy, honest numbers, and someone who knows how homes are actually built.';

export const agent = {
  name: 'George Kalafut',
  firstName: 'George',
  title: 'REALTOR®',
  team: 'Highland Property Group',
  brokerage: 'eXp Realty',
  tagline: 'Austin real estate, handled with strategy — not sales pressure.',
  brokerageAddress: '[Office address]',
  license: 'TX License #[License number]',
  phone: '[Phone number]',
  email: '[Email address]',
  city: 'Austin, Texas',
  // e.g. `${import.meta.env.BASE_URL}images/george.jpg` (file in public/images)
  headshot: null,
  social: {
    instagram: '', // TODO
    linkedin: '', // TODO
    facebook: '', // TODO
    youtube: '', // TODO
  },
};

// "Key statistics" strip. George's numbers go here.
export const stats = [
  { value: '[#]+', label: 'Years in real estate' },
  { value: '[#]', label: 'Homes bought & sold' },
  { value: '59', label: 'Central Texas communities served' },
  { value: '[Degree]', label: '[Field of study, University]' },
];

// "Why work with George": the reasons, in his voice.
export const whyGeorge = [
  {
    icon: 'compass',
    title: 'Strategy, not pressure',
    body: 'You get a clear plan and an honest read, never a push. George’s job is to help you make the right decision, even when that means waiting.',
  },
  {
    icon: 'hammer',
    title: 'A builder’s eye',
    body: 'George walks a property the way a builder does: foundation, roof, drainage, systems and the renovation potential most people miss.',
  },
  {
    icon: 'invest',
    title: 'An investor’s math',
    body: 'As an active investor, George grounds every price, offer and repair request in real numbers and comparable sales.',
  },
  {
    icon: 'chat',
    title: 'Clear communication',
    body: 'Timely updates in plain language at every step, so you always know where things stand and what comes next.',
  },
];

export const bio = {
  intro:
    'Originally from [Hometown], George found his way to real estate early, first as a student of how buildings come together, then as a developer, investor and agent. Today he helps buyers, sellers and investors across Austin and the Hill Country make confident, well-informed moves.',
  paragraphs: [
    'George earned his degree in [Field of study] from [University] and spent [number of years] in [prior career / industry]. That background shapes everything he does: he walks a property the way a builder does, noticing foundation movement, roof age, drainage and the renovation potential most people miss.',
    'As an investor himself, he understands numbers as well as he understands curb appeal. Whether you are buying your first home, selling a property that has sat too long, or looking for a value-add project, George brings a practical, data-minded approach and tells you plainly what he sees.',
    'Above all, he believes great real estate is about people. He takes time to understand your goals, communicates clearly at every step, and stays with you well past closing day.',
  ],
  credentials: [
    '[Degree], [University]',
    '[Professional background]',
    'Active real estate investor',
    '[Professional membership]',
    '[Professional membership]',
    '[Award or recognition]',
  ],
};

export const specialties = [
  'First-time buyers',
  'Luxury homes',
  'Investment & rehab',
  'Relocation',
  'New construction',
];

// Buyers / Sellers / Investors tabs on the home page, plus each audience page.
export const audiences = [
  {
    key: 'buyers',
    cue: 'I’m buying',
    image: img('buy-stone-home'),
    label: 'Buyers',
    to: '/buy',
    title: 'Find the right home, and know exactly what you’re getting.',
    body: 'Austin moves quickly. George helps you narrow the map, read each home’s condition with a builder’s eye, and write offers that win on the right terms without overpaying.',
    points: [
      'Neighborhood strategy built around how you actually live',
      'Candid notes on condition and likely repair costs at every tour',
      'Offers grounded in real comparable sales',
      'Plain-language guidance from inspection to closing',
    ],
    cta: 'Explore buying',
  },
  {
    key: 'sellers',
    cue: 'I’m selling',
    image: img('sell-home-dusk'),
    label: 'Sellers',
    to: '/sell',
    title: 'Price it right, present it well, close with confidence.',
    body: 'From the first walkthrough to closing day, George focuses on the improvements that actually pay off, a pricing strategy backed by data, and steady negotiation.',
    points: [
      'Pricing grounded in recent sales and current buyer demand',
      'A pre-listing walkthrough: what to fix, and what to skip',
      'Professional photography, copy and staging guidance',
      'Offers compared on net proceeds and certainty',
    ],
    cta: 'Explore selling',
  },
  {
    key: 'investors',
    cue: 'I’m investing',
    image: img('invest-congress-bridge'),
    label: 'Investors',
    to: '/invest',
    title: 'Run the numbers before you commit.',
    body: 'Rentals, value-add projects and fix-and-flips. George invests himself, so he underwrites deals the way you would: renovation scope, after-repair value and real returns.',
    points: [
      'Deal sourcing aligned with your strategy and budget',
      'Rough renovation scope and after-repair value estimates',
      'Rent comps, cash flow and return analysis',
      'A builder’s read on condition before you commit',
    ],
    cta: 'Explore investing',
  },
];

export const process = {
  buying: [
    { title: 'Discovery call', body: 'We talk through your goals, timeline, budget and must-haves, and get you connected with trusted lenders.' },
    { title: 'Neighborhood strategy', body: 'George narrows the map to areas that fit how you actually live: commute, schools, lot size, HOA and long-term value.' },
    { title: 'Tours with a builder’s eye', body: 'On every showing you get candid notes on condition, likely repair costs and renovation potential.' },
    { title: 'Offer & negotiation', body: 'Offers built on real comparable data and a clear read of the seller’s position, written to win without overpaying.' },
    { title: 'Inspection to closing', body: 'George interprets inspection findings in plain language, negotiates repairs and keeps every deadline on track.' },
  ],
  selling: [
    { title: 'Pricing consultation', body: 'A pricing strategy grounded in recent comparable sales and current buyer demand, not guesswork.' },
    { title: 'Pre-listing walkthrough', body: 'George identifies the improvements that will actually pay off, and the ones that won’t, before you spend a dollar.' },
    { title: 'Presentation', body: 'Professional photography, compelling copy and staging guidance so your home stands out online and in person.' },
    { title: 'Marketing & showings', body: 'Targeted exposure, agent outreach and organized showings, with honest feedback after each one.' },
    { title: 'Negotiation & close', body: 'Offers compared on net proceeds and certainty, then managed carefully through option period, appraisal and closing.' },
  ],
  investing: [
    { title: 'Strategy session', body: 'Define what you’re after: long-term rental, value-add, or fix-and-flip, along with your budget, financing and target returns.' },
    { title: 'Deal sourcing', body: 'George watches the areas and price points that fit your strategy and flags opportunities worth a closer look.' },
    { title: 'Underwriting', body: 'Rent comps, after-repair value, rough renovation scope and the numbers that matter: cash flow, cash-on-cash return and margin.' },
    { title: 'Offer & due diligence', body: 'Offers written around your numbers, then a builder’s walkthrough and inspection to confirm scope before the option period ends.' },
    { title: 'Close & next steps', body: 'Through closing and beyond, with introductions to the lenders, contractors and property managers George trusts.' },
  ],
};

export const highlights = {
  buying: [
    { title: 'Condition, decoded', body: 'Every tour comes with a construction-informed read on foundation, roof, systems and likely repair costs.' },
    { title: 'Value, verified', body: 'Offers are grounded in real comparable sales, so you compete with confidence and don’t overpay.' },
    { title: 'Potential, revealed', body: 'See past dated finishes to what a home could become, with a realistic sense of renovation scope.' },
  ],
  selling: [
    { title: 'Smart preparation', body: 'Know which repairs and updates will raise your sale price, and which ones to skip.' },
    { title: 'Honest pricing', body: 'A data-backed list price designed to attract strong offers early, not sit on the market.' },
    { title: 'Steady negotiation', body: 'Offers weighed on net proceeds and certainty, with inspection and appraisal hurdles handled calmly.' },
  ],
  investing: [
    { title: 'Numbers first', body: 'Every deal is underwritten before you fall for it: rents, expenses, renovation budget and exit value.' },
    { title: 'Scope you can trust', body: 'A builder’s eye on condition means fewer surprises once the walls are open.' },
    { title: 'An investor’s perspective', body: 'George invests in Austin real estate himself, and advises you the way he’d want to be advised.' },
  ],
};

// Neighborhood library. Each entry gets its own page at /neighborhoods/:slug.
// `video` takes any YouTube URL; the video section only appears once one is set.
export const neighborhoods = [
  {
    slug: 'central-austin',
    image: img('central-austin'),
    name: 'Central Austin',
    blurb: 'Historic bungalows, walkable streets and easy access to downtown.',
    communities: ['Clarksville', 'Tarrytown', 'Hyde Park'],
    video: '',
  },
  {
    slug: 'west-lake-rollingwood',
    image: img('west-lake'),
    name: 'West Lake & Rollingwood',
    blurb: 'Hill Country views, top-rated schools and minutes to downtown.',
    communities: ['West Lake Hills', 'Rollingwood', 'Barton Creek'],
    video: '',
  },
  {
    slug: 'lake-travis',
    image: img('lake-travis'),
    name: 'Lake Travis',
    blurb: 'Lakeside living, resort amenities and room to breathe.',
    communities: ['Lakeway', 'Bee Cave', 'Spicewood'],
    video: '',
  },
  {
    slug: 'northwest-corridor',
    image: img('northwest-corridor'),
    name: 'Northwest Corridor',
    blurb: 'Established neighborhoods and new builds near tech employers.',
    communities: ['Cedar Park', 'Leander', 'Round Rock'],
    video: '',
  },
  {
    slug: 'south-southwest',
    image: img('south-southwest'),
    name: 'South & Southwest',
    blurb: 'Growing communities with a relaxed, small-town feel.',
    communities: ['Dripping Springs', 'Buda', 'Kyle'],
    video: '',
  },
  {
    slug: 'i-35-south',
    image: img('i-35-south'),
    name: 'I-35 South',
    blurb: 'Value, new construction and strong investor opportunity.',
    communities: ['San Marcos', 'Wimberley', 'Lockhart'],
    video: '',
  },
];

export const serviceArea = [
  'Austin', 'Barton Creek', 'Bee Cave', 'Belterra', 'Buda', 'Cedar Park', 'Dripping Springs',
  'Georgetown', 'Hutto', 'Kyle', 'Lago Vista', 'Lakeway', 'Leander', 'Lockhart', 'Marble Falls',
  'Pflugerville', 'Rollingwood', 'Round Rock', 'San Marcos', 'Spicewood', 'Steiner Ranch',
  'Sunset Valley', 'Taylor', 'West Lake Hills', 'Wimberley',
];

export const testimonials = [
  {
    quote: '[Client testimonial, pending...]',
    name: '[Client name]',
    context: '[Home buyer / seller]',
  },
];

// Public links shown on the Resources page.
export const links = [
  { title: 'Information About Brokerage Services', source: 'Texas Real Estate Commission', url: 'https://www.trec.texas.gov/forms/information-about-brokerage-services' },
  { title: 'Consumer Protection Notice', source: 'Texas Real Estate Commission', url: 'https://www.trec.texas.gov/forms/consumer-protection-notice' },
  { title: 'Property tax exemptions (homestead)', source: 'Texas Comptroller', url: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/' },
  { title: 'Travis County property search', source: 'Travis Central Appraisal District', url: 'https://traviscad.org' },
  { title: 'Williamson County property search', source: 'Williamson Central Appraisal District', url: 'https://www.wcad.org' },
  { title: 'Hays County property search', source: 'Hays Central Appraisal District', url: 'https://hayscad.com' },
];

export const faqs = {
  buying: [
    {
      q: 'Do I pay anything to work with George as a buyer?',
      a: 'Buyer representation terms are set out in a written agreement before you tour homes, as Texas now requires. George will walk through compensation openly at your first meeting so there are no surprises.',
    },
    {
      q: 'How does a construction background help me?',
      a: 'It means you get an informed early read on structural, mechanical and renovation issues, which helps you avoid costly surprises and negotiate repairs with confidence. It never replaces a licensed inspection.',
    },
    {
      q: 'I’m relocating from out of state. Can we start remotely?',
      a: 'Absolutely. Video tours, neighborhood walkthroughs and digital signing make it easy to begin before you arrive in Austin.',
    },
  ],
  investing: [
    {
      q: 'What kinds of investment properties does George work with?',
      a: 'Long-term rentals, small multifamily, value-add renovations and fix-and-flip projects across Austin and the surrounding communities.',
    },
    {
      q: 'Can George help estimate renovation costs?',
      a: 'Yes. With a construction background, George can give you a rough scope and budget range during underwriting, then help you confirm it with contractor bids and inspections before you commit.',
    },
    {
      q: 'I’m new to investing. Is that okay?',
      a: 'Of course. Many investors start with one property. George will walk you through the numbers and risks plainly so you can decide with confidence.',
    },
  ],
};
