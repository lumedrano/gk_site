// ---------------------------------------------------------------------------
// All editable site content lives here. Update this file (not the components)
// to change copy, contact info, testimonials, areas, etc.
//
// Items marked VERIFY came from public profiles and should be confirmed with
// George before launch. Items marked TODO are placeholders.
// ---------------------------------------------------------------------------

export const agent = {
  name: 'George Kalafut',
  firstName: 'George',
  title: 'REALTOR®',
  tagline: 'Austin real estate, seen through a builder’s eye.',
  // VERIFY: public profiles list different brokerages. Texas advertising rules
  // require the sponsoring broker's name on the site.
  brokerage: 'Phyllis Browning Company',
  brokerageAddress: '2785 Bee Caves Rd, Suite 351, Rollingwood, TX 78746', // VERIFY
  license: 'TX License #693258', // VERIFY
  phone: '(512) 555-0123', // TODO: real phone
  email: 'hello@georgekalafut.com', // TODO: real email
  city: 'Austin, Texas',
  // Drop a headshot at public/images/george.jpg and set this to
  // `${import.meta.env.BASE_URL}images/george.jpg` (works on GitHub Pages and Vercel).
  headshot: null,
  social: {
    instagram: '', // TODO
    linkedin: '', // TODO
    facebook: '', // TODO
  },
};

export const stats = [
  { value: '9+', label: 'Years in real estate' }, // VERIFY
  { value: '2024', label: 'Top Producing Agent' }, // VERIFY
  { value: '59', label: 'Central Texas communities served' },
  { value: 'B.S.', label: 'Construction Management, Kent State' },
];

export const bio = {
  intro:
    'Originally from Ohio, George found his way to real estate early, first as a student of how buildings come together, then as a developer, investor and agent. Today he helps buyers, sellers and investors across Austin and the Hill Country make confident, well-informed moves.',
  paragraphs: [
    'George earned his degree in Construction Management from Kent State University and spent years in commercial real estate development across Texas. That background shapes everything he does: he walks a property the way a builder does, noticing foundation movement, roof age, drainage and the renovation potential most people miss.',
    'As an investor himself, he understands numbers as well as he understands curb appeal. Whether you are buying your first home, selling a property that has sat too long, or looking for a value-add project, George brings a practical, data-minded approach and tells you plainly what he sees.',
    'Above all, he believes great real estate is about people. He takes time to understand your goals, communicates clearly at every step, and stays with you well past closing day.',
  ],
  // VERIFY: from public profile; confirm current memberships/designations.
  credentials: [
    'B.S. Construction Management, Kent State University',
    'Background in commercial real estate development',
    'Active real estate investor',
    'Design-Build Institute of America, member',
    'Austin Luxury Network, member',
    '2024 Top Producing Agent',
  ],
};

export const specialties = [
  {
    key: 'buyers',
    title: 'First-Time Buyers',
    body: 'A patient, step-by-step guide from pre-approval to keys, with a builder’s read on every home you tour.',
  },
  {
    key: 'luxury',
    title: 'Luxury Homes',
    body: 'Discreet, detail-driven representation for distinctive properties in West Austin and the Hill Country.',
  },
  {
    key: 'invest',
    title: 'Investment & Rehab',
    body: 'Spotting value-add opportunities, estimating renovation scope and running the numbers before you commit.',
  },
  {
    key: 'relocation',
    title: 'Relocation',
    body: 'Moving to Austin? Get a clear picture of neighborhoods, commutes, schools and lifestyle before you arrive.',
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
};

export const areas = [
  { name: 'Central Austin', blurb: 'Historic bungalows, walkable streets and easy access to downtown.', tags: ['Clarksville', 'Tarrytown', 'Hyde Park'] },
  { name: 'West Lake & Rollingwood', blurb: 'Hill Country views, top-rated schools and minutes to downtown.', tags: ['West Lake Hills', 'Rollingwood', 'Barton Creek'] },
  { name: 'Lake Travis', blurb: 'Lakeside living, resort amenities and room to breathe.', tags: ['Lakeway', 'Bee Cave', 'Spicewood'] },
  { name: 'Northwest Corridor', blurb: 'Established neighborhoods and new builds near tech employers.', tags: ['Cedar Park', 'Leander', 'Round Rock'] },
  { name: 'South & Southwest', blurb: 'Growing communities with a relaxed, small-town feel.', tags: ['Dripping Springs', 'Buda', 'Kyle'] },
  { name: 'I-35 South', blurb: 'Value, new construction and strong investor opportunity.', tags: ['San Marcos', 'Wimberley', 'Lockhart'] },
];

export const serviceArea = [
  'Austin', 'Barton Creek', 'Bee Cave', 'Belterra', 'Buda', 'Cedar Park', 'Dripping Springs',
  'Georgetown', 'Hutto', 'Kyle', 'Lago Vista', 'Lakeway', 'Leander', 'Lockhart', 'Marble Falls',
  'Pflugerville', 'Rollingwood', 'Round Rock', 'San Marcos', 'Spicewood', 'Steiner Ranch',
  'Sunset Valley', 'Taylor', 'West Lake Hills', 'Wimberley',
];

// Confirm each client is happy to be quoted on the site before launch.
export const testimonials = [
  {
    quote:
      'After six months of failed attempts to sell our home, we hired George and were under contract within days. He went way above and beyond for us. I highly recommend George for all your real estate needs!',
    name: 'Jackie W.',
    context: 'Home seller',
  },
  // TODO: add more client reviews in this shape.
];

export const faqs = [
  {
    q: 'Do I pay anything to work with George as a buyer?',
    a: 'Buyer representation terms are set out in a written agreement before you tour homes, as Texas now requires. George will walk through compensation openly at your first meeting so there are no surprises.',
  },
  {
    q: 'How does a construction background help me?',
    a: 'It means you get an informed early read on structural, mechanical and renovation issues, which helps you avoid costly surprises and negotiate repairs with confidence. It never replaces a licensed inspection.',
  },
  {
    q: 'Can George help me buy an investment property?',
    a: 'Yes. He works with investors on rentals, fix-and-flip projects and value-add opportunities, including rough renovation budgets and after-repair value analysis.',
  },
  {
    q: 'I’m relocating from out of state. Can we start remotely?',
    a: 'Absolutely. Video tours, neighborhood walkthroughs and digital signing make it easy to begin before you arrive in Austin.',
  },
];
