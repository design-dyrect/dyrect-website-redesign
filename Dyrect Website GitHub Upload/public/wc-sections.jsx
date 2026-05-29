/* global React, WcHeroMock, WcFeatureWorkflow, WcFeatureValidate, WcFeatureAnalytics */
/* Warranty Claims Management page — PAGE-SPECIFIC sections only.
   Reuses shared LogoCloud, Stats, Testimonials, Integrations, BlogSection,
   FAQ, FinalCTA, Capabilities, SiteFooter, SiteNav from the home page kit. */
const { useState: wcsUS } = React;

/* ───────────── HERO ───────────── */
function WcHero() {
  return (
    <section className="pr-hero">
      <div className="container">
        <div className="pr-hero-grid">
          <div className="pr-hero-copy">
            <p className="eyebrow">Warranty Claims Management Software</p>
            <h1 className="display-heading pr-hero-title">
              Manage warranty claims efficiently. <span className="em">Create better service experiences.</span>
            </h1>
            <p className="pr-hero-sub">
              Centralize warranty claims, service tickets, and product validation in one warranty management system. Route claims automatically, track repairs and replacements, and resolve service requests faster.
            </p>
            <div className="pr-hero-ctas">
              <a className="btn btn-primary btn-lg" href={window.DYRECT_URLS.contact}>
                Get a demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a className="btn btn-secondary btn-lg" href={window.DYRECT_URLS.howItWorksVideo} onClick={window.openHowItWorksVideo}>
                See how it works
              </a>
            </div>
            <div className="pr-hero-trust">
              <div className="pr-trust-item">
                <span className="pr-trust-rating">★&nbsp;4.8</span>
                <span>on G2</span>
              </div>
              <span className="pr-trust-dot" />
              <div className="pr-trust-item">
                <span className="pr-trust-rating">★&nbsp;5.0</span>
                <span>on Shopify App Store</span>
              </div>
            </div>
            <div className="pr-hero-badges">
              <img src="assets/g2-medal-6.svg" alt="G2 High Performer Summer 2024" />
              <img src="assets/g2-medal-7.svg" alt="G2 High Performer Small Business Summer 2024" />
              <img src="assets/g2-medal-8.svg" alt="G2 High Performer Asia Pacific Summer 2024" />
            </div>
          </div>
          <div className="pr-hero-visual">
            <WcHeroMock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── PLATFORM INTRO ───────────── */
function WcPlatformIntro() {
  const highlights = [
    { icon: 'route',    t: 'Smart ticket routing',   d: 'Auto-assign claims to the right team based on product, issue type, or priority.' },
    { icon: 'shield',   t: 'Eligibility in seconds', d: 'Validate serial numbers, proof of purchase, and coverage before action.' },
    { icon: 'workspace',t: 'Unified workspace',      d: 'Customer, product, claim, and service history in one place — no tab switching.' },
    { icon: 'chart',    t: 'Defect insights',        d: 'Spot product issues early through trend reporting on claim activity.' },
  ];
  const Icon = ({ name }) => {
    const p = {
      route:     <><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h6"/></>,
      shield:    <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>,
      workspace: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/></>,
      chart:     <><path d="M3 3v18h18"/><path d="m7 15 4-4 4 4 6-6"/></>,
    };
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
  };
  return (
    <section className="section" id="platform" style={{ background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }} className="reveal">
          <p className="eyebrow">Platform</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            <span className="em">Warranty claims and service operations</span>, simplified.
          </h2>
          <p className="section-sub">
            Warranty claims management works best when product data, claim details, and service actions stay connected. This allows support teams to review requests with full context and manage service outcomes more efficiently.
          </p>
        </div>
        <div className="pr-highlights">
          {highlights.map((h, i) => (
            <div key={i} className="pr-highlight reveal">
              <div className="pr-highlight-icon"><Icon name={h.icon} /></div>
              <div className="pr-highlight-text">
                <div className="pr-highlight-title">{h.t}</div>
                <div className="pr-highlight-desc">{h.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── FEATURE TABS — 3 pillars ───────────── */
const WC_FEATURES = [
  {
    key: 'workflow',
    eyebrow: 'Claim workflow',
    title: 'Organize every claim, repair, and replacement in',
    titleEm: 'one workflow',
    body: 'Bring service teams into one place to receive claims, assign work, track progress, and manage outcomes. Every ticket stays connected to the product, the customer, and the full service record for smoother coordination across the entire workflow.',
    bullets: [
      { t: 'Warranty claim ticket management', d: 'Capture, assign, and resolve warranty claims from one shared workspace.' },
      { t: 'Smart ticket routing',             d: 'Send claims to the right team based on product type, issue type, or service priority.' },
      { t: 'Unified agent workspace',          d: 'View claim details, customer records, product data, and service activity in one place.' },
    ],
    cta: 'Learn more',
    href: window.DYRECT_URLS.claimsManagement,
    Visual: WcFeatureWorkflow,
  },
  {
    key: 'validate',
    eyebrow: 'Validate claims',
    title: 'Validate claims with clear',
    titleEm: 'product and customer visibility',
    body: 'Bring together product eligibility, customer details, and service context before action moves forward. Teams can review warranty status, verify ownership, and track service progress with a clearer view of every claim and every customer connected to it.',
    bullets: [
      { t: 'Serial number validation',          d: 'Verify product authenticity and warranty eligibility using serialized product data, proof of purchase, or registration records.' },
      { t: 'Customer and product visibility',   d: 'Keep customer details, product information, purchase data, and claim history connected for stronger trackability.' },
      { t: 'Repair and replacement tracking',   d: 'Monitor repair progress, replacement activity, shipment updates, and final resolution from one record.' },
    ],
    cta: 'Learn more',
    href: window.DYRECT_URLS.productSerialization,
    Visual: WcFeatureValidate,
  },
  {
    key: 'analytics',
    eyebrow: 'Claims analytics',
    title: 'Use claims insights and service analytics to',
    titleEm: 'improve warranty operations',
    body: 'Track warranty claims activity with analytics built for service teams. Monitor claim volumes, resolution speed, recurring product issues, and service outcomes with clear reporting that helps teams improve performance and spot patterns earlier.',
    bullets: [
      { t: 'Claims performance metrics', d: 'Track claim volumes, turnaround times, open tickets, and resolution outcomes across products and teams.' },
      { t: 'Defect trend insights',      d: 'Identify products with repeated service issues, frequent claim activity, and rising repair or replacement volume.' },
      { t: 'Financial & service reports',d: 'Monitor dealer chargebacks, repair payments, replacement activity, and claim resolution records.' },
    ],
    cta: 'Learn more',
    href: window.DYRECT_URLS.warrantyManagementLive,
    Visual: WcFeatureAnalytics,
  },
];

function WcFeatures() {
  const [tab, setTab] = wcsUS(0);
  const f = WC_FEATURES[tab];
  return (
    <section className="section" id="features" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }} className="reveal">
          <p className="eyebrow">Products</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            Better warranty service starts with <span className="em">better claim management</span>
          </h2>
          <p className="section-sub">
            Move warranty claims out of inboxes and spreadsheets. Manage claim requests, validate products, coordinate service actions, and maintain complete control over your service operations.
          </p>
        </div>
        <div className="pr-feature-tabs">
          {WC_FEATURES.map((p, i) => (
            <button key={p.key} onClick={() => setTab(i)} className={`pr-feature-tab ${tab === i ? 'is-active' : ''}`}>
              <span className="pr-feature-tab-num">{i + 1}</span>
              {p.eyebrow}
            </button>
          ))}
        </div>
        <div className="pr-feature-card">
          <div className="pr-feature-text">
            <p className="eyebrow">{f.eyebrow}</p>
            <h3 className="pr-feature-title">
              {f.title} <span className="em">{f.titleEm}</span>
            </h3>
            <p className="pr-feature-body">{f.body}</p>
            <ul className="pr-feature-bullets">
              {f.bullets.map((b, i) => (
                <li key={i}>
                  <span className="pr-feature-bullet-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <div>
                    <div className="pr-feature-bullet-title">{b.t}</div>
                    <div className="pr-feature-bullet-desc">{b.d}</div>
                  </div>
                </li>
              ))}
            </ul>
            <a href={f.href || window.DYRECT_URLS.contact} className="pr-feature-cta">
              {f.cta}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div className="pr-feature-visual">
            {WC_FEATURES.map((p, i) => {
              const Comp = p.Visual;
              const show = i === tab;
              return (
                <div key={p.key} style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  opacity: show ? 1 : 0,
                  transform: show ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(10px)',
                  transition: 'opacity 380ms ease, transform 500ms cubic-bezier(.16,.84,.44,1)',
                  pointerEvents: show ? 'auto' : 'none',
                }}>
                  <Comp />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── WC-SPECIFIC DATA exports (consumed by wc-app.jsx) ───────────── */
const WC_CAP_ITEMS = [
  { icon: 'ticket',      t: 'Warranty claim ticket management',
    d: 'Track, assign, and resolve claim tickets from one workspace with full visibility across every stage.' },
  { icon: 'scan',        t: 'Serial number validation',
    d: 'Verify warranty eligibility through serialized product data, proof of purchase, and registration records.' },
  { icon: 'truck',       t: 'Track product service status',
    d: 'Monitor product status after a claim is raised, including repair progress, replacements, and final resolution.' },
  { icon: 'users',       t: 'Unified agent workspace',
    d: 'Give service teams one place to manage claims, customer details, product information, and service actions without back-and-forth coordination.' },
  { icon: 'gauge',       t: 'Real-time report access',
    d: 'Access live reports on claims, service activity, and agent performance to maintain full visibility across operations.' },
  { icon: 'chart-bar',   t: 'Claims analytics & defect insights',
    d: 'Track service performance, claim trends, and recurring product issues through one connected reporting view.' },
];

const WC_STATS = [
  { value: '4 Mn +', label: 'Customers served',         sub: 'across registrations and warranty cards' },
  { value: '500+',   label: 'Brands running on Dyrect', sub: 'D2C, retail, and manufacturers' },
  { value: '3×',     label: 'Higher attach rate',       sub: 'on extended warranty programs' },
];

const WC_TESTIMONIALS_DATA = {
  eyebrow: 'Testimonials',
  title: 'Why 100s of brands trust Dyrect',
  quotes: [
    {
      q: "The platform is easy to use and makes processing warranty tickets smooth and efficient. It's been a huge time-saver for our team, especially with the automated email notifications that keep our customers informed throughout the process.",
      brand: 'Diggs', region: 'United States',
    },
    {
      q: "We were looking for a technically strong warranty claims management software solution, and Dyrect certainly stood up to our requirements. It eased consumer interactions and automated the warranty claims process.",
      brand: 'Flo Mattress', region: 'India',
    },
    {
      q: 'This is exactly what we were looking for in terms of having a professional platform for a good price for customers to claim their warranty. Really appreciate the Dyrect team setting up time with us to help with all the questions we had.',
      brand: 'Unico', region: 'United States',
    },
  ],
};

const WC_FAQS = [
  { q: 'What does warranty claims management software do?',
    a: 'Warranty claims management software gives product brands a structured system to receive, review, assign, track, and resolve warranty claims. It connects customer details, product records, purchase proof, warranty coverage, serial numbers, claim status, repair requests, and replacement activity in one place.' },
  { q: 'How does Dyrect support warranty claim processing?',
    a: 'Dyrect supports warranty claim processing by connecting claim intake forms, eligibility checks, product registration records, proof of purchase review, team assignment, customer updates, repairs, replacements, and claim analytics. Brands can manage warranty requests with a clearer workflow across support, service, and operations teams.' },
  { q: 'Can Dyrect replace spreadsheets for warranty tracking?',
    a: 'Yes. Dyrect gives brands a digital warranty tracking system that stores warranty records, customer details, product data, claim history, status updates, and service outcomes. Teams can stop depending on scattered spreadsheets, inbox threads, and manual records for claim visibility.' },
  { q: 'What is a warranty claim tracking system?',
    a: 'A warranty claim tracking system lets brands monitor claims across each stage, including submitted, under review, approved, rejected, assigned, repaired, replaced, or resolved. Dyrect gives internal teams and customers clearer visibility into claim progress through connected dashboards and customer portals.' },
  { q: 'Does Dyrect support online warranty claim submission?',
    a: "Yes. Dyrect lets customers submit warranty claims through branded digital forms or customer portals. They can share product details, claim reason, issue descriptions, proof of purchase, images, videos, and other information required by the brand's warranty policy." },
  { q: 'How can brands automate warranty claim workflows?',
    a: 'Brands can automate warranty claim workflows by using digital intake forms, predefined claim stages, warranty eligibility checks, serial number validation, proof-of-purchase collection, team assignment, status alerts, and customer notifications. Dyrect organizes these steps so claims move through a repeatable service process.' },
  { q: 'Can customers track warranty claims through a self-service portal?',
    a: 'Yes. Dyrect supports customer self-service portals for warranty registration, claim submission, warranty details, claim status, service updates, and ownership records. Customers get a branded place to check progress, reducing repeated support follow-ups.' },
  { q: 'How does warranty validation work in Dyrect?',
    a: 'Dyrect can validate warranty claims using product registration data, warranty coverage period, purchase date, purchase channel, proof of purchase, serial number, QR code, customer profile, and claim history. This gives service teams stronger context before approving repair or replacement requests.' },
  { q: 'Can Dyrect manage repairs and replacements?',
    a: 'Yes. Dyrect supports repair and replacement workflows linked to warranty claims. Teams can track claim approvals, service assignments, repair status, replacement actions, customer communication, and final resolution records from the same warranty management platform.' },
  { q: 'How does serial number tracking improve warranty operations?',
    a: 'Serial number tracking connects each product unit with its owner, warranty record, purchase proof, and claim history. Dyrect uses serial numbers and QR codes to improve product identification, reduce invalid claims, support traceability, and give teams better visibility into product-level service issues.' },
  { q: 'Does Dyrect support Shopify warranty claims?',
    a: 'Yes. Dyrect can connect warranty registration and claims with Shopify product and order data. Brands can use Shopify-linked customer and purchase records to support claim validation, warranty activation, digital warranty cards, claim tracking, and post-purchase customer communication.' },
  { q: 'Can Dyrect integrate warranty data with support and CRM tools?',
    a: 'Yes. Dyrect connects with ecommerce, support, CRM, marketing, and communication tools so warranty data can support customer service, segmentation, updates, campaigns, and after-sales operations. These integrations reduce data silos across product, customer, and claim records.' },
  { q: 'What warranty analytics can brands track in Dyrect?',
    a: 'Brands can track claim volume, claim status, approval rate, rejection reasons, product defects, repair trends, replacement activity, service workload, claim resolution time, registration-to-claim patterns, and customer engagement after service. These insights support warranty operations, product quality, and retention decisions.' },
  { q: 'Who should use a warranty management platform?',
    a: 'A warranty management platform suits consumer product brands that sell items with service, repair, replacement, registration, or warranty support needs. Dyrect can support categories such as electronics, appliances, baby gear, fitness equipment, furniture, mobile accessories, outdoor gear, smart home devices, and audio-video products.' },
  { q: 'What makes Dyrect different from a generic ticketing tool?',
    a: 'Generic ticketing tools handle support conversations. Dyrect connects warranty registration, product ownership records, warranty coverage, claim validation, serial numbers, repair workflows, replacement workflows, customer portals, digital warranty cards, and warranty analytics in a platform made for product brands.' },
];

Object.assign(window, {
  WcHero, WcPlatformIntro, WcFeatures,
  WC_CAP_ITEMS, WC_STATS, WC_TESTIMONIALS_DATA, WC_FAQS,
});
