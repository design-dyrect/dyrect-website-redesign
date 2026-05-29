/* global React, PrHeroMock, PrFeatureOmni, PrFeatureUpsell, PrFeatureCustomers */
/* Product Registration page — PAGE-SPECIFIC sections only.
   (Reuses shared LogoCloud, Stats, Testimonials, Integrations, BlogSection,
    FAQ, FinalCTA, SiteFooter, SiteNav from the home page kit.) */
const { useEffect: prsUE, useState: prsUS, useRef: prsUR } = React;

/* ───────────── HERO ───────────── */
function PrHero() {
  return (
    <section className="pr-hero">
      <div className="container">
        <div className="pr-hero-grid">
          <div className="pr-hero-copy">
            <p className="eyebrow">Product Registration Software</p>
            <h1 className="display-heading pr-hero-title">
              Omni-channel <span className="em">product registration</span> for modern brands
            </h1>
            <p className="pr-hero-sub">
              Build trust with every customer by providing a seamless warranty registration experience. Collect first-party data at every registration and upsell accessories or discount coupons to drive repeat purchases.
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
            <PrHeroMock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── PLATFORM INTRO — 4 highlight pills ───────────── */
function PrPlatformIntro() {
  const highlights = [
    { icon: 'qr-code', t: 'QR-led activation',  d: 'A code on packaging is all it takes to capture a verified owner.' },
    { icon: 'link',    t: 'Shopify auto-sync',  d: 'Every fulfilled order registers itself — no customer action required.' },
    { icon: 'users',   t: 'Verified ownership', d: 'Each product is linked to a real, contactable buyer.' },
    { icon: 'trend',   t: 'Lifecycle upsells',  d: 'Drive accessory sales, renewals, and repeat purchases from one moment.' },
  ];
  const Icon = ({ name }) => {
    const p = {
      'qr-code': <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4"/></>,
      'link':    <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
      'users':   <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
      'trend':   <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    };
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
  };
  return (
    <section className="section" id="platform" style={{ background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }} className="reveal">
          <p className="eyebrow">Platform</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            Enable fast, frictionless warranty registration.<br />
            Verify <span className="em">first-party customer data</span>.
          </h2>
          <p className="section-sub">
            Dyrect enables streamlined product and warranty registration for D2C brands, retailers, and manufacturers. Connect each product to its owner, maintain accurate customer records, and introduce relevant add-ons in the same flow.
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

/* ───────────── FEATURE TABS — 3 product-pillar tabs ───────────── */
const PR_FEATURES = [
  {
    key: 'omni',
    eyebrow: 'Omni-channel registration',
    title: 'Embed registration on Shopify or enable',
    titleEm: 'QR-code activation',
    body: 'Dyrect product registration system enables warranty registration directly on Shopify or through QR codes printed on product packaging. Customers can register products in seconds while linking each purchase to its owner. Omni-channel product registration helps brands maintain accurate customer records and improve lifetime value.',
    bullets: [
      { t: 'Digital warranty cards',     d: 'Give every registered buyer a digital warranty record linked to product and purchase details.' },
      { t: 'Omnichannel registration',   d: 'Enable registration through Shopify, QR codes, and branded online forms.' },
      { t: 'Customer communication',     d: 'Share updates, reminders, and service information after registration.' },
    ],
    cta: 'Learn more',
    href: window.DYRECT_URLS.productRegistrationLive,
    Visual: PrFeatureOmni,
  },
  {
    key: 'upsell',
    eyebrow: 'Upsells & revenue',
    title: 'Use registration to drive',
    titleEm: 'upsells and revenue',
    body: 'Product registration gives brands a strong post-purchase sales moment. Dyrect helps teams present relevant accessories, upgrades, discount offers, and extended coverage during activation. Connect Dyrect with your email, SMS, and CRM tools so each registration can feed future revenue campaigns too.',
    bullets: [
      { t: 'In-flow upsell offers',      d: 'Show relevant add-ons, accessories, and upgrades during registration.' },
      { t: 'Extended warranties',        d: 'Present protection plans during warranty activation.' },
      { t: 'Marketing tool sync',        d: 'Send registration data into email, SMS, and CRM platforms for follow-up offers.' },
    ],
    cta: 'Learn more',
    href: window.DYRECT_URLS.postSalesExperience,
    Visual: PrFeatureUpsell,
  },
  {
    key: 'customers',
    eyebrow: 'Customer ownership',
    title: 'Connect with 3rd-party customers and',
    titleEm: 'make them yours',
    body: "Products sold through marketplaces or offline retail often leave brands without direct customer relationships. Registration links each product with its owner and creates verified customer records that support long-term engagement and repeat purchases.",
    bullets: [
      { t: 'Verified customer records',  d: 'Maintain customer profiles with contact details, product data, and purchase channel information.' },
      { t: 'Email and SMS opt-ins',      d: 'Grow subscriber lists through registration-led consent flows.' },
      { t: 'Post-purchase content',      d: 'Share manuals, care guides, support resources, and product education after registration.' },
    ],
    cta: 'Learn more',
    href: window.DYRECT_URLS.ownershipExperience,
    Visual: PrFeatureCustomers,
  },
];

function PrFeatures() {
  const [tab, setTab] = prsUS(0);
  const f = PR_FEATURES[tab];
  return (
    <section className="section" id="features" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }} className="reveal">
          <p className="eyebrow">Products</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            Built with a <span className="em">customer-first, omni-channel</span> approach for growing brands
          </h2>
          <p className="section-sub">
            A complete system for product registration, customer engagement, and warranty operations across ecommerce, retail, and marketplace channels.
          </p>
        </div>
        <div className="pr-feature-tabs">
          {PR_FEATURES.map((p, i) => (
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
            {PR_FEATURES.map((p, i) => {
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

/* ───────────── PR-SPECIFIC CAPABILITIES DATA + FAQ DATA exports ───────────── */
const PR_CAP_ITEMS = [
  { icon: 'card',        t: 'Digital warranty cards',
    d: 'Give every registered buyer a digital warranty record linked to the product, purchase date, and warranty details.' },
  { icon: 'qr-code',     t: 'QR code registration',
    d: 'Let buyers activate warranty through QR codes printed on packaging, inserts, manuals, or product labels.' },
  { icon: 'form',        t: 'Custom forms and policies',
    d: 'Create registration forms, product fields, and warranty rules for different products, categories, and sales channels.' },
  { icon: 'portal',      t: 'Self-serve warranty portal',
    d: 'Give buyers one branded space to view product details, warranty status, and registration records.' },
  { icon: 'palette',     t: 'Branded customer experience',
    d: 'Deliver a consistent brand experience through customized registration pages, product portals, and customer interactions.' },
  { icon: 'plug',        t: 'Email, SMS & CRM integrations',
    d: 'Push registration data into Klaviyo, HubSpot, Shopify, and other tools for follow-up campaigns and audience growth.' },
];

const PR_STATS = [
  { value: '4 Mn +', label: 'Customers served',         sub: 'across registrations and warranty cards' },
  { value: '500+',   label: 'Brands running on Dyrect', sub: 'D2C, retail, and manufacturers' },
  { value: '3×',     label: 'Higher attach rate',       sub: 'on extended warranty programs' },
];

const PR_TESTIMONIALS_DATA = {
  eyebrow: 'Testimonials',
  title: 'Why 100s of brands trust Dyrect',
  quotes: [
    {
      q: "Setting up product registration through Dyrect took us less than a week. Our customers can scan a QR code on packaging and we now have direct contact with buyers from Amazon and offline retail that we never had before.",
      brand: 'Velotric', region: 'United States',
    },
    {
      q: "We've encountered a few technical difficulties along the way, but their support team has always been quick, responsive, and effective in resolving any issues. Overall, Dyrect has been a valuable tool in helping us streamline our warranty operations and improve customer satisfaction.",
      brand: 'Diggs', region: 'United States',
    },
    {
      q: 'This is exactly what we were looking for in terms of having a professional platform for a good price for customers to claim their warranty. Really appreciate the Dyrect team setting up time with us to help with all the questions we had.',
      brand: 'Unico', region: 'United States',
    },
  ],
};

const PR_FAQS = [
  { q: 'What does product registration software do?',
    a: 'Product registration software gives brands a digital way to connect purchased products with real customers. Buyers can register items online through QR codes, product pages, portals, or embedded ecommerce flows. Brands collect product details, buyer information, purchase channel, warranty status, proof of purchase, and ownership records in one place.' },
  { q: 'How does Dyrect support digital product registration?',
    a: 'Dyrect helps product brands create branded product registration journeys across ecommerce, retail, marketplace, distributor, and offline sales channels. Customers can register products, activate warranty coverage, receive digital warranty cards, access guides, and use the same ownership record for future service or claim requests.' },
  { q: 'Can Dyrect capture customers who bought through retail or marketplaces?',
    a: 'Yes. Dyrect uses QR codes, registration links, branded pages, and post-purchase flows to help brands reach buyers beyond their own website. When a customer registers a product, the brand gains first-party customer data linked to product ownership, even when the sale happened through Amazon, retail stores, dealers, distributors, or offline channels.' },
  { q: 'How does QR code product registration operate?',
    a: 'A brand places a QR code on the product, packaging, insert, manual, carton, or invoice. The customer scans it, lands on a branded registration page, enters key details, and activates their product record. Dyrect can connect that record with warranty coverage, serial number data, customer profile, and future support journeys.' },
  { q: 'What customer data can brands collect during product registration?',
    a: 'Brands can collect details such as customer name, email, phone number, product purchased, purchase date, purchase channel, proof of purchase, location or region, serial number, QR code, and custom form responses. Dyrect lets brands structure these fields based on product category, warranty policy, and after-sales needs.' },
  { q: 'Can product registration activate a warranty?',
    a: 'Yes. With Dyrect, product registration can trigger warranty activation as part of the same customer journey. Once the product gets registered, the customer can receive a digital warranty card, view coverage details, access support content, and submit warranty claims through a connected portal.' },
  { q: 'What makes Dyrect different from a basic product registration form?',
    a: 'Basic forms collect responses. Dyrect connects registration data with warranty records, customer portals, serial numbers, proof of purchase, claims, product guides, analytics, integrations, and post-purchase campaigns. The registration journey becomes part of a larger ownership experience for the customer and the brand.' },
  { q: 'Does Dyrect support Shopify product registration?',
    a: 'Yes. Dyrect supports Shopify product registration through embedded flows and Shopify product or order sync. Brands can let customers register products after purchase, activate warranty coverage, issue digital warranty cards, and manage product-owner records while connecting registration data with Shopify commerce activity.' },
  { q: 'How does product registration improve first-party data?',
    a: 'Product registration turns anonymous product buyers into reachable customer profiles. Brands can collect direct consent-based data, understand purchase channels, identify real product owners, segment customers by product or region, and use that data for education, service, reviews, repeat purchases, and warranty communication.' },
  { q: 'Can Dyrect validate products using serial numbers?',
    a: 'Yes. Dyrect supports serial number and QR-based product identification. Brands can connect unique product identities with customer ownership records, warranty status, purchase proof, and claim history. This improves warranty validation and supports traceability across product lifecycle events.' },
  { q: 'What role does product registration have in post-purchase engagement?',
    a: 'Product registration creates a direct channel after the sale. Once the customer registers a product, brands can share product guides, care tips, service information, feedback requests, review prompts, accessories, replacement parts, extended warranty offers, and loyalty campaigns through a more relevant ownership journey.' },
  { q: 'Can customers access product guides after registration?',
    a: 'Yes. Dyrect can connect registered products with manuals, guides, warranty details, support resources, and ownership content. Customers get a cleaner way to find product information after purchase, while brands reduce repeated support questions and improve the ownership experience.' },
  { q: 'How does product registration support warranty claims?',
    a: 'Registered products already have customer, purchase, warranty, and product details attached. When a customer submits a claim, the brand can review eligibility, proof of purchase, serial number, coverage period, and claim history with less manual effort. This creates a smoother claim journey for both sides.' },
  { q: 'What analytics should brands track from product registrations?',
    a: 'Brands should track registration volume, registration rate by channel, products registered, warranty activations, customer regions, purchase sources, serial number usage, claim activity after registration, repeat purchase behavior, feedback, review activity, and post-purchase campaign performance.' },
  { q: "Who should use Dyrect's product registration software?",
    a: "Dyrect suits consumer product brands that sell through ecommerce, Shopify, marketplaces, retail stores, distributors, dealers, or offline channels. It can support categories such as electronics, appliances, furniture, fitness equipment, baby gear, mobile accessories, outdoor gear, smart home products, and other products with warranty, service, or ownership journeys." },
];

Object.assign(window, {
  PrHero, PrPlatformIntro, PrFeatures,
  PR_CAP_ITEMS, PR_STATS, PR_TESTIMONIALS_DATA, PR_FAQS,
});
