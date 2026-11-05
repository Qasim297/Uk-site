# AutoCheck Pro

Premium UK vehicle checking platform built with **Next.js 14 (App Router) + TypeScript**.

Website created & owned by **Muhammad Qasim**.

---

## Quick start

1. Install **Node.js 18.18+ (LTS recommended)** from https://nodejs.org
2. In this folder run:

```bash
npm install
npm run dev
```

3. Open http://localhost:3000

For production: `npm run build` then `npm start` (or deploy to Vercel / any Node host).

## Pages

| Route | Page |
| --- | --- |
| `/` | Home (hero search, features, how it works, pricing, FAQ) |
| `/mot-check` | MOT Check |
| `/mot-history` | MOT History |
| `/vehicle-tax` | Vehicle Tax |
| `/ulez-check` | ULEZ Check |
| `/mileage-check` | Mileage Check |
| `/pricing` | Pricing + secure checkout |
| `/about` | About Us |
| `/contact` | Contact Us (working form) |
| `/privacy-policy` | Privacy Policy |
| `/terms-and-conditions` | Terms and Conditions |
| `/check?reg=AB12CDE` | Vehicle results |
| `/payment/success`, `/payment/cancelled` | Stripe return pages |

## Real vehicle data vs DEMO DATA

All vehicle lookups go through the server route `app/api/vehicle/route.ts`.
API keys are read **only on the server** (`lib/server/*`) and are never sent to the browser.

- **No credentials set** → the site returns sample results flagged `isDemo: true`. These are shown with a
  large **"DEMO DATA — not real vehicle information"** banner, `DEMO DATA` chips on every card, and a watermark.
- **Credentials set** → real data from:
  - **DVSA MOT History API** (MOT tests, defects, mileage) – apply at
    https://documentation.history.mot.api.gov.uk/
  - **DVLA Vehicle Enquiry Service** (tax status, Euro status, CO₂) – apply at
    https://developer-portal.driver-vehicle-licensing.api.gov.uk/

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## Payments (Stripe)

- `app/api/checkout/route.ts` creates a Stripe Checkout Session server-side (prices come from Stripe Price IDs in
  env vars, never from the browser).
- `app/api/stripe/webhook/route.ts` verifies Stripe webhook signatures. Add your report fulfilment logic where
  marked `TODO` (e.g. call your licensed finance / write-off / stolen data provider and email the report).
- Without Stripe keys, checkout buttons show a friendly "payments not enabled yet" message.

## Contact form

`app/api/contact/route.ts` validates input, includes a honeypot and rate limiting, and forwards messages as JSON
to `CONTACT_WEBHOOK_URL` (Zapier, Make, Formspree, your CRM…). Without it, messages are logged on the server.

## Customising

- Business details (email, hours, owner name, site URL): `lib/site.ts`
- Prices and plan features: `lib/pricing.ts`
- Colours, typography and animations: `app/globals.css` (CSS variables at the top)

## Compliance notes

- The site never claims affiliation with the DVLA, DVSA or TfL; disclaimers appear in the footer, results and
  service pages.
- ULEZ results are labelled as estimates with a link to TfL's official checker.
- Have the Privacy Policy and Terms reviewed by a legal professional before launch, and register with the ICO if
  required.
