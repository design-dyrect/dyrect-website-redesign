/* global React, EwHeroMock, EwFeatureOffers, EwFeatureCoverage, EwFeatureRevenue */
/* Extended Warranties page — PAGE-SPECIFIC sections only.
   Reuses shared LogoCloud, Stats, Testimonials, Integrations, BlogSection,
   FAQ, FinalCTA, Capabilities, SiteFooter, SiteNav from the home page kit. */
const { useState: ewsUS } = React;

/* ───────────── HERO ───────────── */
function EwHero() {
  return (
    <section className="pr-hero">
      <div className="container">
        <div className="pr-hero-grid">
          <div className="pr-hero-copy">
            <p className="eyebrow">Extended Warranties</p>
            <h1 className="display-heading pr-hero-title">
              Sell extended warranties <span className="em">directly to your customers</span>
            </h1>
            <p className="pr-hero-sub">
              Make extended warranties easy to sell, easy to manage, and profitable for your brand. Offer protection plans through your brand, keep more revenue in-house, and maintain full visibility from purchase to renewal.
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
            <EwHeroMock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── PLATFORM INTRO ───────────── */
function EwPlatformIntro() {
  const highlights = [
    { icon: 'tag',     t: 'Sell at every touchpoint', d: 'Offer protection plans on product pages, at checkout, and after purchase.' },
    { icon: 'wallet',  t: 'Keep 100% of revenue',     d: 'Plans run natively through your brand — no third-party revenue split.' },
    { icon: 'refresh', t: 'Renew with ease',          d: 'Expiry-based reminders and one-tap renewals keep coverage alive.' },
    { icon: 'eye',     t: 'Full lifecycle visibility',d: 'Track every plan from purchase to renewal, linked to product and buyer.' },
  ];
  const Icon = ({ name }) => {
    const p = {
      tag:     <><path d="M20.6 13.4 12 22l-9-9V4a1 1 0 0 1 1-1h8z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
      wallet:  <><path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"/><path d="M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3"/><path d="M21 11h-5a2 2 0 0 0 0 4h5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"/></>,
      refresh: <><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></>,
      eye:     <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    };
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
  };
  return (
    <section className="section" id="platform" style={{ background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }} className="reveal">
          <p className="eyebrow">Platform</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            One place to <span className="em">buy, view, and renew</span> extended warranties
          </h2>
          <p className="section-sub">
            Give customers one place to buy protection plans, check coverage, renew plans, find product manuals, contact service centers, submit feedback, or request help.
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

/* ───────────── FEATURE TABS ───────────── */
const EW_FEATURES = [
  {
    key: 'offers',
    eyebrow: 'Multi-touchpoint offers',
    title: 'Offer extended warranties across',
    titleEm: 'key buying touchpoints',
    body: 'Present protection plans at the moments customers are most ready to buy. Create a seamless path from product discovery to coverage selection across your storefront and post-purchase journey.',
    bullets: [
      { t: 'Product page offers', d: 'Present extended warranty plans alongside eligible products at the point of purchase.' },
      { t: 'Plan configuration',  d: 'Set coverage duration, pricing, and eligibility by product, category, or SKU.' },
      { t: 'Eligibility controls',d: 'Set clear coverage rules using product, purchase, and warranty data.' },
    ],
    cta: 'Learn more',
    href: window.DYRECT_URLS.warranty,
    Visual: EwFeatureOffers,
  },
  {
    key: 'coverage',
    eyebrow: 'Coverage & renewal',
    title: 'Make coverage easy to access and',
    titleEm: 'easy to renew',
    body: 'Give customers a clear way to view protection plans, check coverage details, and renew at the right moment. Keep every plan linked to the product, the buyer, and the full warranty record in one branded experience.',
    bullets: [
      { t: 'Coverage visibility',     d: 'Show active coverage, plan terms, and renewal dates in one customer-facing view.' },
      { t: 'Renewal touchpoints',     d: 'Create a smoother renewal journey with plan visibility and expiry-based reminders.' },
      { t: 'Connected plan records',  d: 'Keep customer, product, and warranty information linked across every active plan.' },
    ],
    cta: 'Learn more',
    href: window.DYRECT_URLS.digitalWarrantyCard,
    Visual: EwFeatureCoverage,
  },
  {
    key: 'revenue',
    eyebrow: 'Revenue & insights',
    title: 'Turn protection plans into a',
    titleEm: 'measurable revenue channel',
    body: 'See exactly how your extended warranty program performs. Track plan adoption, attach rate, renewal activity, and warranty-linked revenue — and keep 100% of every plan sale in-house.',
    bullets: [
      { t: 'Warranty revenue visibility', d: 'Track plan uptake, renewal activity, expiry-based opportunities, and warranty-linked revenue insights.' },
      { t: 'Attach-rate analytics',       d: 'Measure plan adoption by product, category, and channel to find what converts.' },
      { t: '100% revenue in-house',       d: 'Plans run natively through your brand, so every dollar of plan revenue stays with you.' },
    ],
    cta: 'Learn more',
    href: window.DYRECT_URLS.postSalesExperience,
    Visual: EwFeatureRevenue,
  },
];

function EwFeatures() {
  const [tab, setTab] = ewsUS(0);
  const f = EW_FEATURES[tab];
  return (
    <section className="section" id="features" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }} className="reveal">
          <p className="eyebrow">Products</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            More than an <span className="em">extended warranty software</span>
          </h2>
          <p className="section-sub">
            Sell protection plans across key buying touchpoints, keep coverage records clear, and track warranty performance without adding operational mess. Dyrect keeps every plan connected to the product, the customer, and the full post-purchase lifecycle.
          </p>
        </div>
        <div className="pr-feature-tabs">
          {EW_FEATURES.map((p, i) => (
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
            {EW_FEATURES.map((p, i) => {
              const Comp = p.Visual;
              const show = i === tab;
              return (
                <div key={p.key} style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  opacity: show ? 1 : 0,
                  transform: show ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(10px)',
                  transition: 'opacity 380ms ease, transform 500ms cubic-bezier(.22,1,.36,1)',
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

/* ───────────── EW-SPECIFIC DATA exports ───────────── */
const EW_CAP_ITEMS = [
  { icon: 'tag',         t: 'Multi-Touchpoint Plan Offers',
    d: 'Present extended warranty plans across product pages, checkout, and post-purchase journeys to capture more plan sales across the buying cycle.' },
  { icon: 'sliders',     t: 'Flexible Plan Configuration',
    d: 'Set coverage length, pricing, and eligibility rules by product line, category, or SKU.' },
  { icon: 'palette',     t: 'Branded Plan Management Portal',
    d: 'Keep plan offers, customer touchpoints, and coverage journeys aligned with your brand identity.' },
  { icon: 'shield-check', t: 'Coverage and Eligibility Records',
    d: 'Maintain clear records for active plans, expiry dates, covered products, and service eligibility.' },
  { icon: 'portal',      t: 'Self-Serve Customer Portal',
    d: 'Give customers a branded destination to view coverage, renew plans, and access support information.' },
  { icon: 'trend',       t: 'Warranty Revenue Visibility',
    d: 'Track plan uptake, renewal activity, expiry-based opportunities, and warranty-linked revenue insights.' },
];

const EW_STATS = [
  { value: '4 Mn +', label: 'Customers served',         sub: 'across registrations and warranty cards' },
  { value: '500+',   label: 'Brands running on Dyrect', sub: 'D2C, retail, and manufacturers' },
  { value: '3×',     label: 'Higher attach rate',       sub: 'on extended warranty programs' },
];

const EW_TESTIMONIALS_DATA = {
  eyebrow: 'Testimonials',
  title: 'Why 100s of brands trust Dyrect',
  quotes: [
    {
      q: "This is exactly what we were looking for in terms of having a professional platform for a good price for customers to claim their warranty. Really appreciate the Dyrect team setting up time with us to help with all the questions we had.",
      brand: 'Unico', region: 'United States',
    },
    {
      q: "Setting up extended warranty offers was straightforward, and we now keep all of that protection-plan revenue in-house instead of splitting it with a third party. The attach rate has been a pleasant surprise.",
      brand: 'Velotric', region: 'United States',
    },
    {
      q: 'We were looking for a technically strong warranty management solution, and Dyrect certainly stood up to our requirements. It eased consumer interactions and automated the whole warranty process.',
      brand: 'Flo Mattress', region: 'India',
    },
  ],
};

const EW_FAQS = [
  { q: 'What does extended warranty software do?',
    a: 'Extended warranty software gives brands a system to offer, manage, and track paid protection plans after a product sale. It connects coverage details, product records, customer data, plan purchases, claim requests, and revenue reporting in one platform.' },
  { q: 'How does Dyrect support extended warranty programs?',
    a: 'Dyrect connects extended warranty offers with product registration, standard warranty records, customer ownership data, claim management, digital warranty cards, and post-purchase communication. Brands can manage coverage and customer journeys through one connected warranty platform.' },
  { q: 'What does a product protection platform include?',
    a: 'A product protection platform usually includes plan eligibility, coverage details, offer placement, warranty documents, customer portals, claim submission, claim status tracking, repair or replacement workflows, and analytics for protection-plan performance.' },
  { q: 'Can brands offer extended warranty plans after product registration?',
    a: 'Yes. Dyrect can connect warranty offers with the product registration journey. After a buyer registers a product, the brand can present relevant extended coverage based on product type, purchase date, ownership record, and warranty status.' },
  { q: 'How does extended warranty management software increase post-purchase revenue?',
    a: 'Extended warranty management software creates new revenue after the original product sale. Brands can offer paid coverage, track plan adoption, measure attach rate, promote relevant protection plans, and use ownership data to create better-timed warranty offers.' },
  { q: 'What is the difference between manufacturer warranty and extended coverage?',
    a: 'A manufacturer warranty usually covers defects for a standard period after purchase. Extended coverage adds paid protection beyond the original warranty period or adds broader coverage, depending on the plan terms, product type, and provider rules.' },
  { q: 'Can Dyrect manage extended warranty claims?',
    a: 'Yes. Dyrect can connect extended warranty coverage with claim intake, proof review, warranty status, product records, serial numbers, repair requests, replacement requests, customer updates, and claim history.' },
  { q: 'How does a warranty upsell platform operate?',
    a: "A warranty upsell platform presents protection-plan offers during checkout, after purchase, inside product registration flows, or through customer portals. Dyrect's advantage is that these offers can connect with real product ownership data and warranty records." },
  { q: 'Can customers view extended warranty details through a portal?',
    a: 'Yes. Dyrect supports customer portals that can show warranty coverage, digital warranty cards, registered products, claim status, service information, and ownership details in one branded customer experience.' },
  { q: 'How does product registration improve extended warranty offers?',
    a: 'Product registration gives brands verified details such as customer identity, product purchased, purchase date, channel, proof of purchase, serial number, and warranty status. This data can make extended warranty offers more relevant and easier to manage after purchase.' },
  { q: 'Does Dyrect support Shopify extended warranty journeys?',
    a: 'Dyrect can connect warranty registration and claim workflows with Shopify product and order data. Brands using Shopify can link product ownership, warranty activation, digital warranty cards, customer records, and claim handling with ecommerce data.' },
  { q: 'What analytics should brands track for protection plans?',
    a: 'Brands should track plan attach rate, extended warranty revenue, plan adoption by product, revenue by channel, claim rate, repair or replacement activity, coverage usage, customer engagement, post-purchase conversion, and product-level issue trends.' },
  { q: 'Can extended warranty software connect with CRM and support tools?',
    a: 'Yes. Dyrect can connect warranty and ownership data with ecommerce, CRM, support, marketing, and communication tools. This gives teams better visibility into customer history, coverage, claims, service status, and post-purchase engagement.' },
  { q: 'Who should use extended warranty management software?',
    a: 'Extended warranty management software is useful for consumer product brands that sell items with service, repair, replacement, or protection-plan potential. This includes electronics, appliances, furniture, fitness equipment, baby gear, mobile accessories, smart home products, outdoor gear, and audio-video products.' },
  { q: 'What makes Dyrect different from a checkout warranty widget?',
    a: 'Checkout warranty widgets mainly present protection-plan offers. Dyrect connects extended warranty offers with product registration, ownership records, standard warranty data, claims, repairs, replacements, customer portals, digital warranty cards, integrations, and post-purchase engagement.' },
];

Object.assign(window, {
  EwHero, EwPlatformIntro, EwFeatures,
  EW_CAP_ITEMS, EW_STATS, EW_TESTIMONIALS_DATA, EW_FAQS,
});
