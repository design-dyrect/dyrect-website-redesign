/* global React */
const { useEffect, useState, useRef } = React;

/* ───────────── Capabilities Grid ───────────── */
const DEFAULT_CAPS = {
  eyebrow: 'Capabilities',
  title: 'Everything you need to run warranty operations, built in',
  subtitle: 'No add-ons, no third-party tools stitched together. Every feature needed to run a complete warranty operation comes built into Dyrect.',
  items: [
    { icon: 'card',        t: 'Digital warranty cards', d: 'Replace paper cards with digital warranty records linked to the product and purchase details.' },
    { icon: 'scan',        t: 'Serial number validation', d: 'Check product authenticity and warranty eligibility before service activity moves ahead.' },
    { icon: 'form',        t: 'Custom forms and policies', d: 'Set up registration fields, claim forms, and warranty rules for different products and categories.' },
    { icon: 'portal',      t: 'Self-serve warranty portal', d: 'Give buyers a clear place to view product details, warranty status, and service activity.' },
    { icon: 'palette',     t: 'White-label experience', d: "Registration pages and customer comms carry the brand's logo, colors, and tone. Not a third-party tool." },
    { icon: 'users',       t: 'Team workspaces', d: 'Keep claim ownership, notes, assignments, and service actions organized across internal teams.' },
    { icon: 'qr-code',     t: 'QR codes on packaging', d: 'Generate per-SKU QR codes so customers register their purchase in seconds, from anywhere.' },
    { icon: 'truck',       t: 'Shipment + dealer payouts', d: 'Track every shipment, repair, replacement, and dealer reimbursement in a single workflow.' },
  ],
};
function Capabilities({ items, eyebrow, title, subtitle, cols }) {
  const it = items    || DEFAULT_CAPS.items;
  const eb = eyebrow  || DEFAULT_CAPS.eyebrow;
  const tt = title    || DEFAULT_CAPS.title;
  const sb = subtitle || DEFAULT_CAPS.subtitle;
  const ncols = cols || (it.length >= 8 ? 4 : it.length >= 6 ? 3 : 2);
  const Icon = ({ name }) => {
    const paths = {
      'card':        <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 14.5h4"/></>,
      'qr-code':     <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4"/></>,
      'form':        <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></>,
      'portal':      <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 13.5h4M7 16.5h7"/></>,
      'palette':     <><circle cx="13.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/><circle cx="17" cy="10" r="0.6" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7" r="0.6" fill="currentColor" stroke="none"/><circle cx="6.5" cy="11.5" r="0.6" fill="currentColor" stroke="none"/><path d="M12 2a10 10 0 1 0 0 20 2.5 2.5 0 0 0 2.5-2.5c0-.6-.2-1.1-.6-1.5-.4-.4-.6-.9-.6-1.5a2.5 2.5 0 0 1 2.5-2.5H19a3 3 0 0 0 3-3 9 9 0 0 0-10-9z"/></>,
      'plug':        <><path d="M9 2v6M15 2v6"/><path d="M5 8h14v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z"/><path d="M12 16v6"/></>,
      'scan':        <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8v8M10.5 8v8M14 8v8M17 8v8"/></>,
      'ticket':      <><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M13 7v2M13 13v2"/></>,
      'truck':       <><path d="M5 18H3V6h13v12h-5M15 9h4l3 4v5h-3"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></>,
      'users':       <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
      'gauge':       <><path d="M3.5 19a10 10 0 1 1 17 0"/><path d="M12 14 9 11"/><circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none"/></>,
      'chart-bar':   <><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6" rx="0.5"/><rect x="12" y="7" width="3" height="10" rx="0.5"/><rect x="17" y="13" width="3" height="4" rx="0.5"/></>,
      'tag':         <><path d="M20.6 13.4 12 22l-9-9V4a1 1 0 0 1 1-1h8z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
      'trend':       <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
      'shield-check':<><path d="M12 2 4 5v6c0 5 3.4 9.6 8 11 4.6-1.4 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></>,
      'wallet':      <><path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"/><path d="M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3"/><path d="M21 11h-5a2 2 0 0 0 0 4h5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"/></>,
      'refresh':     <><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></>,
      'route':       <><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h6"/></>,
      /* legacy aliases (kept so older references still resolve) */
      'badge-check': <><path d="M12 2 4 5v6c0 5 3.4 9.6 8 11 4.6-1.4 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></>,
      'fingerprint': <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8v8M10.5 8v8M14 8v8M17 8v8"/></>,
      'sliders':     <><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>,
      'user-cog':    <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4"/><circle cx="17" cy="17" r="3"/><path d="m21 17-1.9-1.1M14 17l-1.9 1.1M17 14v-1M17 21v-1M14.1 18.9l-.6.4M20.9 15l-.6.4M14 14l1.9 1.1M20.6 18.9l-.6-.4"/></>,
    };
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
    );
  };

  return (
    <section className="section" id="capabilities" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
          <p className="eyebrow">{eb}</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            {tt}
          </h2>
          <p className="section-sub">
            {sb}
          </p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${ncols}, 1fr)`,
          gap: 20, marginTop: 56,
        }} className="cap-grid">
          {it.map((it, i) => (
            <div key={i} style={{
              padding: 24,
              background: 'var(--color-slate-50)',
              border: '1px solid var(--border-default)',
              borderRadius: 12,
              transition: 'all 200ms ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = 'var(--color-brand-blue)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-slate-50)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'white',
                border: '1px solid var(--border-default)',
                color: 'var(--color-brand-blue)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Icon name={it.icon} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#0F172A', marginBottom: 6 }}>{it.t}</div>
              <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.55 }}>{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Stats ───────────── */
const DEFAULT_STATS = [
  { value: '4M+',   label: 'Customers served',     sub: 'across registrations and claims' },
  { value: '500+',  label: 'Brands running on Dyrect', sub: 'DTC, retail, and manufacturers' },
  { value: '3×',    label: 'Higher attach rate',   sub: 'on extended warranty programs' },
  { value: '<30m',  label: 'Time to go live',      sub: 'with the Shopify app' },
];
function Stats({ stats }) {
  const data = stats || DEFAULT_STATS;
  const cols = data.length;
  return (
    <section className="section-tight" style={{
      background: 'linear-gradient(180deg, #0F172A 0%, #1A23A8 100%)',
      color: 'white', position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(closest-side, black 30%, transparent 80%)',
      }} />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'stretch',
          gap: 32,
        }} className="stats-grid">
          {data.map((s, i) => (
            <div key={i} style={{
              flex: '1 1 0', minWidth: 0,
              borderLeft: '1px solid rgba(255,255,255,0.15)',
              paddingLeft: 24,
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1, letterSpacing: '-2px',
                color: 'white',
              }}>{s.value}</div>
              <div style={{ marginTop: 10, fontSize: 15, fontWeight: 500, color: 'white' }}>{s.label}</div>
              <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Testimonials ───────────── */
const DEFAULT_TESTIMONIALS = {
  eyebrow: 'Testimonials',
  title: 'Real results from brands running on Dyrect',
  quotes: [
    {
      q: "The platform is easy to use and makes processing warranty tickets smooth and efficient. It's been a huge time-saver for our team, especially with the automated email notifications that keep our customers informed throughout the process. We've encountered a few technical difficulties along the way, but their support team has always been quick, responsive, and effective in resolving any issues. Overall, Dyrect has been a valuable tool in helping us streamline our warranty operations and improve customer satisfaction.",
      brand: 'Diggs', region: 'United States',
    },
    {
      q: "This is exactly what we were looking for in terms of having a professional platform for a good price for customers to claim their warranty. It's really easy to set up, great to keep track of all customers on the backend, and no extra work is necessary for automated emails to go out once a customer registers their warranty. Really appreciate the Dyrect team setting up time with us to help with all the questions we had.",
      brand: 'Unico', region: 'United States',
    },
    {
      q: 'We were looking for a technically strong warranty claims management software solution, and Dyrect certainly stood up to our requirements. It eased consumer interactions and automated the warranty claims process.',
      brand: 'Flo Mattress', region: 'India',
    },
  ],
};
function Testimonials({ eyebrow, title, quotes }) {
  const eb = eyebrow || DEFAULT_TESTIMONIALS.eyebrow;
  const tt = title   || DEFAULT_TESTIMONIALS.title;
  const qs = quotes  || DEFAULT_TESTIMONIALS.quotes;
  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 48px' }}>
          <p className="eyebrow">{eb}</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            {tt}
          </h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }} className="testimonial-grid">
          {qs.map((t, i) => (
            <figure key={i} style={{
              margin: 0,
              background: 'var(--color-slate-50)',
              border: '1px solid var(--border-default)',
              borderRadius: 16,
              padding: 28,
              display: 'flex', flexDirection: 'column', gap: 18,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F59E0B' }}>
                {[0,1,2,3,4].map((s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
                ))}
              </div>
              <blockquote style={{
                margin: 0, fontFamily: 'var(--font-body)',
                fontSize: 14.5, lineHeight: 1.55, color: '#1E293B',
                fontWeight: 400, flex: 1,
              }}>"{t.q}"</blockquote>
              <figcaption style={{
                paddingTop: 18,
                borderTop: '1px solid var(--border-default)',
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: '#0F172A',
                  textTransform: 'uppercase', letterSpacing: 1.2,
                }}>{t.brand}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{t.region}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Shopify section — 3-step go-live ───────────── */
function ShopifySection() {
  const steps = [
    {
      n: 1, title: 'Install the app',
      body: 'Find Dyrect on the Shopify App Store and install with a single click. No coding, no technical setup, no back and forth with a developer.',
    },
    {
      n: 2, title: 'Sync your products',
      body: 'Select which products need warranty registration. Dyrect pulls directly from your Shopify catalog and syncs automatically.',
    },
    {
      n: 3, title: 'Go live',
      body: "That's it. From the next fulfilled order, warranties register automatically and customers are notified — no manual work from your team.",
    },
  ];
  return (
    <section className="section" style={{ background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center' }} className="shopify-grid">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', borderRadius: 999,
              background: '#95BF47', color: 'white',
              fontSize: 12, fontWeight: 500,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 7.4c-.1-.7-.6-1.1-1-1.1l-.5-.1c-.4-1.3-1.5-2.3-2.7-2.3h-.2c-.4-.5-1-.8-1.6-.8-1.4 0-2.5 1.1-2.9 2.8L4.3 6.5c-.5.2-.5.2-.6.7L2 19.5l11.6 2.2 5.2-1.1-3.3-13.2zm-3.4-.5l-.4.1V6.9c0-.5-.1-1-.2-1.4.9.2 1.4 1 1.6 2zm-2-1.8c.4 0 .7.1 1 .3v.2c-.1.5-.2 1-.2 1.5l-1.8.5c.2-1.3.8-2.5 1-2.5zm-1.6 1c-.7.4-1.2 1.4-1.4 2.4l-1 .3c.2-1.3 1-2.5 2.4-2.7z"/></svg>
              Shopify-native · 5★ on the App Store
            </div>
            <h2 className="section-title" style={{ marginTop: 18, fontSize: 'clamp(28px, 3.6vw, 42px)' }}>
              Already on Shopify? Go live in &lt;30 minutes.
            </h2>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 17, lineHeight: 1.55, marginTop: 16 }}>
              Three steps and your entire warranty operation is running automatically. No developer needed.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <a href={window.DYRECT_URLS.shopifyWarranty} className="btn btn-primary">Install on Shopify</a>
              <a href={window.DYRECT_URLS.integrations} className="btn btn-ghost">See all integrations &nbsp;→</a>
            </div>
          </div>
          <div>
            {steps.map((s, i) => (
              <div key={s.n} style={{
                display: 'flex', gap: 16,
                paddingBottom: i === steps.length - 1 ? 0 : 24,
                marginBottom: i === steps.length - 1 ? 0 : 24,
                borderBottom: i === steps.length - 1 ? 'none' : '1px dashed var(--border-default)',
                position: 'relative',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--color-brand-blue)',
                  color: 'white',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600,
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-blue)',
                }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#0F172A' }}>{s.title}</div>
                  <div style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.55, marginTop: 4 }}>{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Integrations ───────────── */
function Integrations() {
  return (
    <section className="section" id="integrations" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }} className="integrations-grid">
          <div>
            <p className="eyebrow">Integrations</p>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              Dyrect plugs into the <span className="em">tools your team already uses</span>
            </h2>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 17, lineHeight: 1.55, marginTop: 16 }}>
              No ripping and replacing your existing stack. Connect with your ecommerce store, marketing tools, and support platform so data flows automatically where it needs to go.
            </p>
            <a href={window.DYRECT_URLS.integrations} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 24, color: 'var(--color-brand-blue)',
              fontWeight: 500, fontSize: 15,
            }}>
              View Dyrect integrations
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="assets/integrations-ring.webp" alt="Dyrect integrations"
              style={{ width: '100%', maxWidth: 560, height: 'auto', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Blog ───────────── */
const BLOG_POSTS = [
  {
    title: '10 Best Warranty Management Software for D2C Brands (2026)',
    tag: 'Warranty',
    readTime: '13 min read',
    href: 'https://www.dyrect.co/blog/best-warranty-management-software',
    img: 'https://prod.superblogcdn.com/site_cuid_cl3wwffwg1088071kpbry8hfjzp/images/best-warranty-management-dtc-2026-1772085050994-compressed.jpg',
  },
  {
    title: 'Warranty Management Software for Brands: The Complete 2026 Guide',
    tag: 'Guide',
    readTime: '15 min read',
    href: 'https://www.dyrect.co/guide/warranty-management-software',
    img: 'https://cdn.prod.website-files.com/62b59be46bad855e276574d3/696126a91b64db9372b09320_warranty-management-software.jpg',
  },
  {
    title: 'How to Manage Product Warranties Digitally: A Complete 2026 Guide for Brands',
    tag: 'Warranty Management',
    readTime: '15 min read',
    href: 'https://www.dyrect.co/blog/digital-warranty-management',
    img: 'https://prod.superblogcdn.com/site_cuid_cl3wwffwg1088071kpbry8hfjzp/images/f4cfd314-9f7f-4fbb-bdfe-ac39a518e230-1777988575934-compressed.png',
  },
];

function BlogSection() {
  return (
    <section className="section" id="blog" style={{ background: 'white' }}>
      <div className="container">
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 24, marginBottom: 32, flexWrap: 'wrap',
        }}>
          <div>
            <a href="https://www.dyrect.co/blog" target="_blank" rel="noreferrer noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: 'var(--color-brand-blue)',
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: 13, letterSpacing: 1.4, textTransform: 'uppercase',
                marginBottom: 12,
              }}>
              From the Dyrect blog
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)' }}>
              Guides, case studies, and insights
            </h2>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 16, lineHeight: 1.55, marginTop: 12, maxWidth: 600 }}>
              On warranty management, post-sale operations, and building direct customer relationships.
            </p>
          </div>
          <a href="https://www.dyrect.co/blog" target="_blank" rel="noreferrer noopener"
            className="btn btn-secondary" style={{ fontSize: 14 }}>
            View all articles →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="blog-grid">
          {BLOG_POSTS.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noreferrer noopener"
              style={{
                display: 'flex', flexDirection: 'column',
                background: 'white',
                border: '1px solid var(--border-default)',
                borderRadius: 14,
                overflow: 'hidden',
                transition: 'all 220ms cubic-bezier(.16,.84,.44,1)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--color-brand-blue)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border-default)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}>
              {/* 16:9 image */}
              <div style={{
                position: 'relative',
                aspectRatio: '16 / 9',
                background: 'var(--color-slate-100)',
                overflow: 'hidden',
              }}>
                <img src={p.img} alt={p.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 600ms cubic-bezier(.16,.84,.44,1)',
                    display: 'block',
                  }}
                  onError={(e) => { e.currentTarget.style.opacity = 0; }} />
                {/* Category tag */}
                <span style={{
                  position: 'absolute', top: 12, left: 12,
                  padding: '4px 10px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.95)',
                  color: 'var(--color-brand-blue-deep)',
                  fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase',
                  backdropFilter: 'blur(8px)',
                }}>{p.tag}</span>
              </div>
              {/* Body */}
              <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <div style={{ fontSize: 12, color: '#94A3B8', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  {p.readTime}
                </div>
                <h3 style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontSize: 19, fontWeight: 600, lineHeight: 1.3,
                  color: '#0F172A', letterSpacing: '-0.4px',
                  textWrap: 'pretty',
                }}>{p.title}</h3>
                <div style={{
                  marginTop: 'auto', paddingTop: 4,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 14, fontWeight: 500, color: 'var(--color-brand-blue)',
                }}>
                  Read article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ───────────── FAQ ───────────── */
const FAQS = [
  { q: 'What is warranty management software?',
    a: 'Warranty management software is a platform that lets brands manage product registrations, warranty coverage, claim requests, replacements, repairs, customer communication, and reporting from one place. For consumer brands, a modern warranty management system also captures product ownership data, validates purchases, tracks claim status, and creates a smoother after-sales experience across ecommerce, retail, and marketplace channels.' },
  { q: "How does Dyrect's warranty management platform support consumer brands?",
    a: "Dyrect's warranty management platform supports consumer brands by connecting product registration, warranty tracking, claim management, customer portals, and post-purchase engagement in one system. Brands can collect customer and product details after purchase, issue digital warranty cards, manage claims, validate proof of purchase, and communicate with buyers through branded after-sales journeys." },
  { q: 'What makes Dyrect different from a traditional warranty management system?',
    a: 'Traditional warranty management systems often handle warranty records and claims as back-office tasks. Dyrect is designed for modern consumer brands that want to use warranty registration as a direct customer relationship channel. It supports QR-based product registration, Shopify-connected warranty flows, digital warranty cards, customer self-service portals, claim tracking, and owned customer data capture from online, offline, and marketplace sales.' },
  { q: 'Can Dyrect be used as warranty registration software?',
    a: 'Yes. Dyrect includes warranty registration software that lets customers register products through QR codes, website forms, Shopify pages, or branded registration links. Brands can collect product details, serial numbers, purchase dates, receipts, customer contact information, and marketing opt-ins, then use that data to activate warranty coverage and build a verified product ownership record.' },
  { q: 'How does QR code warranty registration operate?',
    a: 'QR code warranty registration lets a customer scan a code on packaging, manuals, inserts, or product labels and reach a branded registration form. With Dyrect, the customer can submit purchase details, product information, serial number, and contact details to activate their warranty. This is especially useful for retail and marketplace purchases where the brand may otherwise miss the direct buyer relationship.' },
  { q: 'What is warranty tracking software?',
    a: 'Warranty tracking software lets brands and customers view warranty status, coverage dates, registered products, claim history, and claim progress. With Dyrect, customers can access warranty cards and claim updates through a self-service portal, while support teams can view product ownership, claim details, validation documents, and communication history in one place.' },
  { q: 'Does Dyrect support warranty claims management?',
    a: 'Yes. Dyrect supports warranty claims management with claim forms, ticketing, proof of purchase uploads, serial number validation, status updates, internal review flows, and reporting. Brands can manage repair, replacement, refund, or chargeback requests while customers can submit claims and track progress through a branded experience.' },
  { q: 'How can warranty claim processing be automated?',
    a: 'Warranty claim processing can be automated by using structured claim forms, required document uploads, warranty eligibility checks, serial number validation, product data, and status-based customer updates. Dyrect reduces manual back-and-forth by collecting the right claim information upfront and giving support teams a centralized claim workspace.' },
  { q: 'Can customers track claims through a self-service warranty portal?',
    a: 'Yes. Dyrect gives customers access to a self-service warranty portal where they can view registered products, warranty cards, claim status, product guides, and service updates. This improves the customer experience and reduces repetitive support questions around warranty coverage, repair progress, replacement approval, and claim timelines.' },
  { q: 'How does product registration software capture retail and marketplace customers?',
    a: "Product registration software captures retail and marketplace customers by inviting buyers to register their products after purchase through QR codes, packaging inserts, landing pages, or warranty activation forms. Dyrect lets brands collect verified customer data, product ownership details, and communication consent even when the original sale happens outside the brand's ecommerce store." },
  { q: 'Can Dyrect connect warranty data with Shopify?',
    a: 'Yes. Dyrect can connect warranty registration and claims with Shopify so brands can sync product data, support ecommerce warranty flows, and give customers a branded registration and claim experience. Shopify brands can use Dyrect as a warranty management app to manage registrations, digital warranty cards, product ownership records, and claim requests.' },
  { q: 'Does Dyrect integrate with CRM, support, and marketing tools?',
    a: 'Dyrect is built to connect warranty and product registration data with tools used across customer support, marketing, and retention. Brands can use warranty data alongside platforms such as help desks, CRM systems, email marketing tools, and SMS channels to improve support context, send relevant updates, and create personalized post-purchase journeys.' },
  { q: 'How does serial number validation improve warranty management?',
    a: 'Serial number validation improves warranty management by confirming that a product is eligible for warranty coverage before a claim is approved. It can reduce duplicate registrations, invalid claims, and manual review effort. Dyrect lets brands collect and validate serial numbers during registration or claim submission, giving teams stronger product-level visibility.' },
  { q: 'What warranty analytics should brands track?',
    a: "Brands should track warranty registrations, registered product volume, claim volume, claim approval rate, claim reasons, product defects, repair or replacement trends, claim resolution time, customer segments, and post-purchase engagement. Dyrect's warranty analytics can reveal which products create more service requests and which channels generate valuable registered customers." },
  { q: "Who should use Dyrect's warranty management software?",
    a: "Dyrect's warranty management software is built for consumer brands selling physical products through ecommerce, Shopify, retail stores, distributors, and marketplaces. It is especially useful for brands in electronics, appliances, fitness, baby gear, beauty, furniture, outdoor products, smart home, accessories, and other categories where product registration, warranty claims, and after-sales customer relationships can drive retention and repeat revenue." },
];

function FAQ({ faqs, eyebrow, title, subtitle }) {
  const data = faqs || FAQS;
  const eb = eyebrow  || 'FAQs';
  const tt = title    || 'Frequently asked questions';
  const sb = subtitle || "Everything teams ask before going live. Can't find what you need?";
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq" style={{ background: 'var(--color-slate-50)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64 }} className="faq-grid">
          <div>
            <p className="eyebrow">{eb}</p>
            <h2 className="section-title" style={{ marginTop: 12, fontSize: 'clamp(28px, 3.4vw, 40px)' }}>
              {tt}
            </h2>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 16, lineHeight: 1.55, marginTop: 16 }}>
              {sb}
            </p>
            <a href={window.DYRECT_URLS.contact} className="btn btn-secondary" style={{ marginTop: 16 }}>
              Talk to sales →
            </a>
          </div>
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-default)' }}>
            {data.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{ borderBottom: i === data.length - 1 ? 'none' : '1px solid var(--border-default)' }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                    width: '100%', textAlign: 'left',
                    padding: '20px 24px',
                    display: 'flex', alignItems: 'center', gap: 16,
                    fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500,
                    color: '#0F172A',
                  }}>
                    <span style={{ flex: 1 }}>{f.q}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transition: 'transform 220ms ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 600 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 420ms cubic-bezier(.16,.84,.44,1)',
                  }}>
                    <div style={{ padding: '0 24px 22px', fontSize: 14.5, color: '#475569', lineHeight: 1.6 }}>
                      {f.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Final CTA ───────────── */
function FinalCTA({ eyebrow, title, body, primaryLabel, secondaryLabel, checks }) {
  const eb = eyebrow || 'Ready when you are';
  const tt = title   || 'Ready to optimize your post-sale operation?';
  const bd = body    || (<>Book a demo and <strong style={{ color: 'white' }}>see how brands running on Dyrect manage the entire warranty lifecycle</strong> without switching tools.</>);
  const pl = primaryLabel   || 'Sign up for demo';
  const sl = secondaryLabel || 'Install on Shopify';
  const ck = checks || ['No credit card needed', 'Live in <30 min', '500+ brands trust Dyrect'];
  return (
    <section className="section" id="demo" style={{ background: 'white' }}>
      <div className="container">
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #1A23A8 0%, #2437F6 60%, #4A5BFE 100%)',
          color: 'white',
          padding: 'clamp(48px, 6vw, 80px)',
          boxShadow: 'var(--shadow-xl)',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(closest-side, black, transparent 80%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', right: '-120px', top: '-120px',
            width: 360, height: 360, borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(255,255,255,0.16), transparent 70%)',
            filter: 'blur(20px)',
          }} />
          <div style={{ position: 'relative', maxWidth: 720 }}>
            <p className="eyebrow" style={{ color: '#C7CDFD' }}>{eb}</p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 'clamp(32px, 4.4vw, 52px)', lineHeight: 1.1,
              letterSpacing: '-1.4px', marginTop: 12, marginBottom: 0,
            }}>
              {tt}
            </h2>
            <p style={{ marginTop: 20, fontSize: 18, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)' }}>
              {bd}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <a href={window.DYRECT_URLS.contact} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 22px', borderRadius: 8,
                background: 'white', color: 'var(--color-brand-blue-deep)',
                fontWeight: 600, fontSize: 15,
              }}>
                {pl}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href={window.DYRECT_URLS.shopifyWarranty} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 22px', borderRadius: 8,
                background: 'rgba(255,255,255,0.10)', color: 'white',
                fontWeight: 500, fontSize: 15,
                border: '1px solid rgba(255,255,255,0.25)',
              }}>
                {sl}
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 32, color: 'rgba(255,255,255,0.75)', fontSize: 13, flexWrap: 'wrap' }}>
              {ck.map((x, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7EE2A1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Footer ───────────── */
function SiteFooter({ activeProduct }) {
  const productLinks = [
    { l: 'Product Registration Software', href: window.DYRECT_URLS.productRegistration, key: 'product-registration' },
    { l: 'Warranty Management Software',  href: window.DYRECT_URLS.warrantyManagement, key: 'warranty-claims' },
    { l: 'Extended Warranties',           href: window.DYRECT_URLS.extendedWarranties, key: 'extended-warranties' },
  ].map(p => ({ ...p, active: activeProduct === p.key }));
  const cols = [
    { h: 'Products', links: productLinks },
    {
      h: 'Free Tools',
      links: [
        { l: 'Bulk QR Code Generator', href: window.DYRECT_URLS.bulkQr },
        { l: 'Serial Number Generator', href: window.DYRECT_URLS.serialNumber },
        { l: 'Warranty Cost Calculator', href: window.DYRECT_URLS.warrantyCost },
      ],
    },
    {
      h: 'Solutions',
      links: window.SOLUTION_LINKS.filter((link) => link.label !== 'Automotive').map((link) => ({ l: link.label, href: link.href })),
    },
    {
      h: 'Company',
      links: [
        { l: 'Features', href: window.DYRECT_URLS.features },
        { l: 'Pricing', href: window.DYRECT_URLS.pricing },
        { l: 'Contact Us', href: window.DYRECT_URLS.contact },
      ],
      sub: {
        h: 'Features',
        links: [
          { l: 'Digitalize Warranty', href: window.DYRECT_URLS.digitalWarrantyCard },
          { l: 'Form Builder (No-Code)', href: window.DYRECT_URLS.formBuilder },
          { l: 'Digitize Product Manual', href: window.DYRECT_URLS.productManual },
          { l: 'Serial Number Validator', href: window.DYRECT_URLS.productSerialization },
          { l: 'Claims Management', href: window.DYRECT_URLS.claimsManagement },
          { l: 'All Features', href: window.DYRECT_URLS.features },
        ],
      },
    },
    {
      h: 'Resources',
      links: [
        { l: 'FAQs', href: window.DYRECT_URLS.faqs },
        { l: 'Blog', href: window.DYRECT_URLS.blog },
        { l: 'Integrations', href: window.DYRECT_URLS.integrations },
        { l: 'Brand Warranties', href: window.DYRECT_URLS.warranty },
        { l: 'Our Partners', href: window.DYRECT_URLS.partners },
      ],
      sub: {
        h: 'Alternatives',
        links: [
          { l: 'Google Forms vs Dyrect', href: window.DYRECT_URLS.googleFormsComparison },
          { l: 'Manual Leaflet vs Dyrect', href: window.DYRECT_URLS.leafletComparison },
          { l: 'Website Forms vs Dyrect', href: window.DYRECT_URLS.websiteFormsComparison },
        ],
      },
    },
  ];

  const linkHoverIn  = (e) => { e.currentTarget.style.color = 'white'; };
  const linkHoverOut = (e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; };

  const ColHeading = ({ children }) => (
    <div style={{
      fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)',
      textTransform: 'uppercase', letterSpacing: 1.6, marginBottom: 14,
    }}>{children}</div>
  );
  const ColLinks = ({ links }) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {links.map((l) => (
        <li key={l.l}>
          <a href={l.href} style={{
            fontSize: 14, fontWeight: 500,
            color: l.active ? 'white' : 'rgba(255,255,255,0.72)',
            transition: 'color 160ms',
          }}
            onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>
            {l.l}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer style={{
      background: '#0B1020',
      color: 'rgba(255,255,255,0.72)',
      paddingTop: 80, paddingBottom: 24,
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(closest-side, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(closest-side, black, transparent 80%)',
        pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative' }}>
        {/* Top: 5 link columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 32,
        }} className="footer-grid">
          {cols.map((c, i) => (
            <div key={i}>
              <ColHeading>{c.h}</ColHeading>
              <ColLinks links={c.links} />
              {c.sub && (
                <>
                  <div style={{ marginTop: 24 }}>
                    <ColHeading>{c.sub.h}</ColHeading>
                    <ColLinks links={c.sub.links} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom: brand + get-in-touch */}
        <div style={{
          marginTop: 64,
          display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr',
          gap: 40, alignItems: 'start',
          paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.10)',
        }} className="footer-bottom">
          {/* Brand block */}
          <div>
            <img src="assets/logo-white-wordmark.png" alt="Dyrect"
              style={{ height: 32, display: 'block' }} />
            <p style={{
              marginTop: 18, fontSize: 14, lineHeight: 1.55,
              color: 'rgba(255,255,255,0.65)', maxWidth: 320,
            }}>
              The most seamless warranty management software. Registration, claims, and protection plans — unified.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <a href="https://www.linkedin.com/company/dyrect/" aria-label="LinkedIn" style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'rgba(255,255,255,0.10)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.85)',
                transition: 'all 160ms',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.20)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                  <path d="M22 21V14a4 4 0 0 0-8 0v7M10 9v12"/>
                </svg>
              </a>
            </div>
          </div>

          {/* US office */}
          <div>
            <ColHeading>Get in touch · US</ColHeading>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>
              655 S Fair Oaks Ave,<br />Sunnyvale, CA 94086
            </p>
            <a href="mailto:sales@dyrect.co" style={{
              display: 'inline-block', marginTop: 14,
              fontSize: 14, fontWeight: 500,
              color: '#A4AFFE',
            }}>
              sales@dyrect.co
            </a>
          </div>

          {/* India office */}
          <div>
            <ColHeading>Get in touch · India</ColHeading>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>
              <strong style={{ color: 'white', fontWeight: 600 }}>Neuroone Solutions Pvt. Ltd.</strong><br />
              A-805, Magnolia Apartment, Baner<br />Pashan Link Road, Pune — 411021
            </p>
            <a href="tel:+919975470169" style={{
              display: 'inline-block', marginTop: 14,
              fontSize: 14, fontWeight: 500,
              color: '#A4AFFE',
            }}>
              +91 9975470169
            </a>
          </div>
        </div>

        {/* Legal bar */}
        <div style={{
          marginTop: 56, paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.10)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 13, color: 'rgba(255,255,255,0.50)',
          gap: 16, flexWrap: 'wrap',
        }}>
          <div>© 2026 Dyrect (Neuroone Solutions Pvt. Ltd.). All rights reserved.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href={window.DYRECT_URLS.privacy} style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Privacy</a>
            <a href={window.DYRECT_URLS.terms} style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Terms</a>
            <a href={window.DYRECT_URLS.security} style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Security</a>
            <a href={window.DYRECT_URLS.status} style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Capabilities, Stats, Testimonials, ShopifySection, Integrations, BlogSection, FAQ, FinalCTA, SiteFooter,
});
