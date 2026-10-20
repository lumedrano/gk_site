# George Kalafut, REALTOR® website

The personal brand site for George Kalafut, an Austin, TX REALTOR®. It is a static marketing site with no listing feeds or third-party MLS data. Visitors can learn about George, read about how he works with buyers and sellers, see the areas he serves, and contact him.

**Stack:** Vite, React 18, React Router 6 and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Pages

| Route      | Purpose                                                          |
| ---------- | ---------------------------------------------------------------- |
| `/`        | Hero, quick stats, intro, specialties, testimonials, areas, CTA  |
| `/about`   | Full bio, credentials, working values, testimonials              |
| `/buy`     | Buyer approach, 5-step process, FAQ                              |
| `/sell`    | Seller approach, 5-step process, home-value consultation CTA     |
| `/areas`   | Featured regions and the full Central Texas service area         |
| `/contact` | Contact details and an inquiry form                              |

## Editing content

**All copy lives in [`src/content/site.js`](src/content/site.js).** That includes contact info, bio, stats, specialties, process steps, areas, testimonials and FAQs. Components only render that content, so you rarely need to touch them.

In that file:

- Values in `[square brackets]` are placeholders for details not yet confirmed with George: phone, email, brokerage and office address, license number, education, hometown, prior career, years of experience, awards, memberships and the client testimonial. Replace each one before launch.
- Comments marked `TODO` (social links) must also be filled in.

### Headshot and photos

Until a headshot is added, the site shows a "GK" monogram card. To add one:

1. Put the image at `public/images/george.jpg`. A 4:5 portrait about 1200×1500px works best.
2. In `site.js`, set `agent.headshot: '/images/george.jpg'`.

### Brand colors and fonts

The design tokens are in `src/styles.css` under `@theme`. The palette is limestone, live oak and bronze. The fonts are Fraunces (display) and Manrope (body), loaded from Google Fonts in `index.html`.

## Contact form

The form works with no setup: it opens the visitor's email app with the message already filled in.

To deliver submissions straight to an inbox instead, create a form at a service such as [Formspree](https://formspree.io), then set the endpoint:

```bash
cp .env.example .env
# VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

In Vercel or Netlify, add `VITE_CONTACT_ENDPOINT` as an environment variable. The form includes a hidden honeypot field to catch spam bots.

## Texas compliance (TREC)

The footer already includes:

- The broker name and license number. Texas advertising rules require the sponsoring broker's name.
- A link labeled **"Texas Real Estate Commission Information About Brokerage Services"**. It currently points to the blank TREC form. **Replace `IABS_URL` in `src/components/Footer.jsx` with the broker's completed IABS PDF.**
- A link labeled **"Texas Real Estate Commission Consumer Protection Notice"**.
- An Equal Housing Opportunity mark.

Have George or his broker review the site before launch.

## Deploying

**Vercel:** import the repo. The framework preset is Vite, and `vercel.json` already rewrites all routes to `index.html` so client-side routing works.

**Netlify:** set the build command to `npm run build` and the publish directory to `dist`, then add a `public/_redirects` file containing `/* /index.html 200`.

Point the custom domain (for example `georgekalafut.com`) at the host, then update the email in `site.js` to match.
