/* global React, Badge, CustomerProfileCard, TicketsCard, AnalyticsCard */
const { useEffect, useState, useRef } = React;

/* ───────────── Logo cloud ───────────── */
const CUSTOMER_LOGOS = [
  { name: 'Burton',         src: 'uploads/burton_snowboards_logo.jpeg', h: 36 },
  { name: 'Briggs & Riley', src: 'uploads/briggs-riley.jpeg',           h: 22 },
  { name: 'Dow',            src: 'uploads/dow-logo.png',                h: 30 },
  { name: 'JCB',            src: 'uploads/jcb-logo.png',                h: 32 },
  { name: 'Velotric',       src: 'uploads/velotric-logo.jpeg',          h: 22 },
  { name: 'Diggs',          src: 'uploads/diggs-pet-logo.png',          h: 30 },
  { name: 'Greens',         src: 'uploads/greens-tapware logo.png',     h: 34 },
  { name: 'GoMechanic',     src: 'uploads/go-mechanic-logo.png',        h: 26 },
  { name: 'R for Rabbit',   src: 'uploads/R_for_Rabbit_logo.png',       h: 36 },
  { name: "Neeman's",       src: 'uploads/neemans-logo.png',            h: 26 },
  { name: 'Clore Automotive', src: 'uploads/Clore-Automotive-Logo.png', h: 28 },
  { name: 'Aircon',         src: 'uploads/Aircon-logo.png',             h: 28 },
  { name: 'Keplin Group',   src: 'uploads/keplin logo.webp',            h: 30 },
  { name: 'Lacuna',         src: 'uploads/lacuna-logo.webp',            h: 26 },
];

function LogoCloud() {
  return (
    <section className="section-tight" style={{ background: 'white', borderBottom: '1px solid var(--border-default)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{
            fontSize: 13, fontWeight: 500, color: '#64748B',
            textTransform: 'uppercase', letterSpacing: 1.4, margin: 0,
          }}>Trusted by 500+ brands globally</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          rowGap: 40, columnGap: 24,
          alignItems: 'center', justifyItems: 'center',
        }} className="logo-grid">
          {CUSTOMER_LOGOS.map((l) => (
            <img key={l.name} src={l.src} alt={l.name}
              style={{
                height: l.h, maxWidth: 140, objectFit: 'contain',
                filter: 'grayscale(1)', opacity: 0.7,
                transition: 'all 220ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0)'; e.currentTarget.style.opacity = 1; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(1)'; e.currentTarget.style.opacity = 0.7; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Platform — scroll-driven Before / After ─────────────
   A tall section (~3.5× viewport) with a sticky inner stage. As the user
   scrolls, a 0→1 progress drives:
     • background morph: white → navy
     • headline + eyebrow swap (BEFORE DYRECT → AFTER DYRECT)
     • scattered "tools" cards on the right consolidate into a unified
       Dyrect warranty workspace
     • numbered bullets cross-fade between problem list and outcome list
   ─────────────────────────────────────────────────────────────────── */
function PlatformOverview() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const scrolled = -rect.top;
        let p = scrolled / total;
        p = Math.max(0, Math.min(1, p));
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const p = progress;
  const morph = Math.max(0, Math.min(1, (p - 0.18) / 0.32));
  const afterAmt = Math.max(0, Math.min(1, (p - 0.52) / 0.28));

  const bgMix = (t) => {
    const lerp = (a, b) => Math.round(a + (b - a) * t);
    const r = lerp(248, 11);
    const g = lerp(250, 18);
    const b = lerp(252, 64);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const beforeCards = [
    { key: 'spreadsheet', title: 'Spreadsheet',  body: 'Warranty records tracked manually by product and customer.',
      from: { x: 8,  y: 6,   rot: -3 }, to: { col: 0, row: 0 } },
    { key: 'inbox',       title: 'Support inbox', body: 'Claim requests mixed with regular customer tickets.',
      from: { x: 58, y: 14,  rot: 4  }, to: { col: 1, row: 0 } },
    { key: 'claimform',   title: 'Claim form',    body: 'Proof upload, serial checks, and status updates handled separately.',
      from: { x: 14, y: 56,  rot: 5  }, to: { col: 0, row: 1 } },
    { key: 'analytics',   title: 'Analytics',     body: 'Reports assembled late from disconnected sources.',
      from: { x: 62, y: 64,  rot: -4 }, to: { col: 1, row: 1 } },
  ];

  const textPrimary = afterAmt > 0.5 ? '#FFFFFF' : '#0F172A';
  const textSecondary = afterAmt > 0.5 ? 'rgba(255,255,255,0.7)' : '#475569';
  const stageBg = bgMix(p);

  return (
    <section ref={sectionRef} id="platform" className="platform-section" style={{
      position: 'relative',
      height: '330vh',
      background: stageBg,
    }}>
      <div className="platform-sticky" style={{
        position: 'sticky', top: 0,
        height: '100vh',
        minHeight: 760,
        background: stageBg,
        transition: 'background 200ms linear',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'var(--color-slate-200)',
        }}>
          <div style={{
            height: '100%', width: `${p * 100}%`,
            background: 'var(--color-brand-blue)',
            transition: 'width 80ms linear',
          }} />
        </div>

        <div className="container platform-intro" style={{
          paddingTop: 56, paddingBottom: 20,
          opacity: Math.max(0, 1 - p * 5),
          transition: 'opacity 200ms linear',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
            <p className="eyebrow">Platform</p>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              All-in-one warranty management. <span className="em">Seamless</span> for your team. <span className="em">Effortless</span> for your customers.
            </h2>
            <p className="section-sub" style={{ marginTop: 12 }}>
              Registration, claims, service, protection plans, and analytics no longer need separate tools.
            </p>
          </div>
        </div>

        <div className="container platform-grid" style={{
          flex: 1, display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: 48, alignItems: 'center',
          paddingBottom: 140,
          position: 'relative',
        }}>
          <PlatformLeft p={p} morph={morph} afterAmt={afterAmt}
            textPrimary={textPrimary} textSecondary={textSecondary} />

          <PlatformRight cards={beforeCards} morph={morph} afterAmt={afterAmt}
            textPrimary={textPrimary} textSecondary={textSecondary} />

          <div style={{
            position: 'absolute', left: '50%', bottom: -32, transform: 'translateX(-50%)',
            display: 'flex', gap: 8, zIndex: 5,
          }}>
            {[0, 1, 2].map((i) => {
              const active = (i === 0 && p < 0.18) || (i === 1 && p >= 0.18 && p < 0.52) || (i === 2 && p >= 0.52);
              return (
                <span key={i} style={{
                  width: active ? 22 : 6, height: 6, borderRadius: 999,
                  background: active
                    ? (afterAmt > 0.5 ? 'white' : 'var(--color-brand-blue)')
                    : (afterAmt > 0.5 ? 'rgba(255,255,255,0.3)' : 'var(--color-slate-300)'),
                  transition: 'all 240ms ease',
                }} />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

function PlatformLeft({ p, morph, afterAmt, textPrimary, textSecondary }) {
  const showAfter = afterAmt > 0.5;
  const pillBg = showAfter ? 'rgba(36,55,246,0.85)' : 'var(--color-warning-subtle)';
  const pillFg = showAfter ? 'white' : 'var(--color-warning-text)';
  const pillDot = showAfter ? '#A4AFFE' : 'var(--color-warning)';

  const beforeBullets = [
    'Manual registration records and fragmented customer data',
    'Claims validated through repeated back-and-forth conversations',
    'Limited visibility into product, ownership, service',
    'After-sales costs add up with no return',
  ];
  const afterBullets = [
    'Every product owner, warranty card, and claim record connected',
    'Teams validate, assign, track, and resolve from one workspace',
    'Analytics reveal defect trends, registration sources, ROI',
    'Each interaction becomes a revenue touchpoint',
  ];
  const bullets = showAfter ? afterBullets : beforeBullets;

  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 14px 6px 12px',
        borderRadius: 999,
        background: pillBg, color: pillFg,
        fontSize: 11.5, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase',
        transition: 'all 300ms ease',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: pillDot }} />
        {showAfter ? 'After Dyrect' : 'Before Dyrect'}
      </div>

      <div style={{ position: 'relative', marginTop: 22, minHeight: 168 }}>
        <h3 style={{
          position: 'absolute', inset: 0, margin: 0,
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(34px, 4.2vw, 56px)',
          lineHeight: 1.04, letterSpacing: '-1.5px',
          color: textPrimary,
          opacity: 1 - afterAmt,
          transform: `translateY(${afterAmt * -10}px)`,
          transition: 'color 300ms ease',
        }}>
          Disconnected warranty operations
        </h3>
        <h3 style={{
          position: 'absolute', inset: 0, margin: 0,
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(34px, 4.2vw, 56px)',
          lineHeight: 1.04, letterSpacing: '-1.5px',
          color: textPrimary,
          opacity: afterAmt,
          transform: `translateY(${(1 - afterAmt) * 10}px)`,
          transition: 'color 300ms ease',
        }}>
          One connected warranty lifecycle
        </h3>
      </div>

      <p style={{
        fontSize: 16, lineHeight: 1.55, color: textSecondary,
        marginTop: 18, maxWidth: 440,
        minHeight: 76,
        transition: 'color 300ms ease',
      }}>
        {showAfter
          ? 'Registration, claims, service tracking, customer ownership, protection plans, and analytics operate from one brand-owned warranty system.'
          : 'Product records, claim requests, service conversations, customer data, and warranty proof live across sheets, forms, inboxes, and separate tools.'}
      </p>

      <ol style={{
        listStyle: 'none', padding: 0, margin: '24px 0 0',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {bullets.map((b, i) => (
          <li key={i} style={{
            display: 'flex', gap: 14, alignItems: 'flex-start',
            opacity: 1, transform: 'translateY(0)',
            transition: `opacity 360ms ease ${i * 60}ms`,
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: 999,
              background: showAfter ? 'var(--color-brand-blue)' : 'var(--color-warning-subtle)',
              color: showAfter ? 'white' : 'var(--color-warning-text)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
              flexShrink: 0, marginTop: 1,
            }}>{i + 1}</span>
            <span style={{
              color: textPrimary, fontSize: 15, fontWeight: 500, lineHeight: 1.4,
              maxWidth: 420,
              transition: 'color 300ms ease',
            }}>{b}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PlatformRight({ cards, morph, afterAmt, textPrimary, textSecondary }) {
  const STAGE_W = 600, STAGE_H = 600;
  const GRID_GAP = 16;
  const SLOT_W = (STAGE_W - GRID_GAP) / 2;
  const SLOT_H = (STAGE_H - GRID_GAP) / 2;

  return (
    <div className="platform-visual" style={{
      position: 'relative',
      width: '100%', maxWidth: STAGE_W,
      marginLeft: 'auto',
      height: STAGE_H,
      zIndex: 1,
    }}>
      <svg style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: Math.max(0, 1 - morph * 2.5),
        transition: 'opacity 300ms ease',
      }} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} preserveAspectRatio="none">
        <path d="M 80 80 C 200 200, 260 120, 380 260"  stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <path d="M 420 80 C 320 220, 180 220, 120 360" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <path d="M 100 360 C 220 280, 340 320, 460 360" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      </svg>

      {cards.map((c, i) => {
        const fromX = (c.from.x / 100) * STAGE_W;
        const fromY = (c.from.y / 100) * STAGE_H;
        const toX = c.to.col * (SLOT_W + GRID_GAP);
        const toY = c.to.row * (SLOT_H + GRID_GAP);
        const x = fromX + (toX - fromX) * morph;
        const y = fromY + (toY - fromY) * morph;
        const rot = c.from.rot * (1 - morph);
        const w = 260 + (SLOT_W - 260) * morph;
        const h = 150 + (SLOT_H - 150) * morph;
        const fade = afterAmt > 0 ? 1 - afterAmt : 1;
        return (
          <ToolCard key={c.key}
            x={x} y={y} w={w} h={h} rot={rot}
            morph={morph} opacity={fade}
            title={c.title} body={c.body} />
        );
      })}

      <div style={{
        position: 'absolute', inset: 0,
        opacity: afterAmt,
        transform: `translateY(${(1 - afterAmt) * 20}px)`,
        transition: 'opacity 360ms ease, transform 480ms cubic-bezier(.16,.84,.44,1)',
        pointerEvents: afterAmt < 0.5 ? 'none' : 'auto',
        background: 'white',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 24px 60px -12px rgba(0,0,0,0.45)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>Dyrect warranty workspace</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
              Registrations · claims · service · owners · plans · analytics
            </div>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '5px 12px', borderRadius: 999,
            background: 'var(--color-brand-blue-subtle)',
            color: 'var(--color-brand-blue-deep)',
            fontSize: 11.5, fontWeight: 600,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--color-success)' }} />
            Synced
          </span>
        </div>
        <div style={{
          flex: 1, padding: 18,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
          gridTemplateRows: 'auto 1fr auto',
        }}>
          <div style={{ background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Registered products</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#0F172A', marginTop: 6, letterSpacing: '-0.7px' }}>48,291</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6, lineHeight: 1.4 }}>QR, Shopify, website, portal — all mapped to owners</div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Claims in progress</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#0F172A', marginTop: 6, letterSpacing: '-0.7px' }}>284</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6, lineHeight: 1.4 }}>Validated by warranty terms, proof, and serial rules</div>
          </div>
          <div style={{ gridColumn: '1 / -1', background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Service workflow · Claim status</div>
              <span style={{ fontSize: 11, color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--color-success)' }} />
                Live
              </span>
            </div>
            <div>
              {[
                { id: 'CLM-2041', desc: 'Replacement approved',   state: 'Ready',    tone: 'success' },
                { id: 'CLM-2042', desc: 'Repair center assigned', state: 'Assigned', tone: 'success' },
                { id: 'CLM-2043', desc: 'Customer notified',      state: 'Sent',     tone: 'success' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0',
                  borderTop: i === 0 ? 'none' : '1px solid var(--color-slate-100)',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569', fontWeight: 500, width: 78 }}>{row.id}</span>
                  <span style={{ fontSize: 13, color: '#1E293B', flex: 1 }}>{row.desc}</span>
                  <Badge tone={row.tone}>{row.state}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Owner portal logins</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#0F172A', marginTop: 6, letterSpacing: '-0.7px' }}>9,142</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6, lineHeight: 1.4 }}>Self-serve warranty cards, claims, and repair tracking</div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Revenue opportunity</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.7px' }}>$48,210</span>
              <span style={{ fontSize: 12, color: 'var(--color-success-text)', fontWeight: 600 }}>+42%</span>
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6, lineHeight: 1.4 }}>Protection plans, accessories, and renewals this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ x, y, w, h, rot, morph, opacity, title, body }) {
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0,
      transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
      width: w, height: h,
      background: 'white',
      border: '1px solid var(--border-default)',
      borderRadius: 12,
      boxShadow: '0 10px 30px -8px rgba(15,23,42,0.18), 0 4px 12px -2px rgba(15,23,42,0.06)',
      padding: '14px 16px',
      transition: 'transform 120ms linear, opacity 240ms ease',
      opacity,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>{title}</div>
      <div style={{ fontSize: 12.5, color: '#475569', marginTop: 5, lineHeight: 1.4, maxWidth: 320 }}>{body}</div>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 12 }}>
        <span style={{ height: 6, borderRadius: 3, background: 'var(--color-slate-100)', width: '92%' }} />
        <span style={{ height: 6, borderRadius: 3, background: 'var(--color-slate-100)', width: '74%' }} />
        <span style={{ height: 6, borderRadius: 3, background: 'var(--color-slate-100)', width: '56%' }} />
      </div>
    </div>
  );
}
/* ───────────── Products — 4 tabbed pillars ───────────── */
const PRODUCTS = [
  {
    key: 'registration',
    tabLabel: 'Product Registration',
    eyebrow: 'Product Registration & Upsell',
    title: 'Turn every buyer into a',
    titleEm: 'reachable customer',
    body: 'Stop losing customers to marketplaces and offline retail. Dyrect collects first-party data at the point of registration so every buyer becomes a direct contact the team can reach, retain, and sell to again.',
    bullets: [
      { t: 'Omnichannel registration', d: 'QR code on packaging, website link, and automatic registration for Shopify orders.', Preview: window.OmnichannelMock || (() => null) },
      { t: 'Digital warranty',         d: 'Digital warranty card and a self-serve customer portal — no more paper.',           Preview: window.DigitalWarrantyMock || (() => null) },
      { t: 'Post-registration upsells',d: 'Trigger upsell offers at the exact moment a customer completes registration.',     Preview: window.PostRegUpsellMock || (() => null) },
    ],
    cta: 'Create omnichannel registration',
    href: window.DYRECT_URLS.productRegistration,
  },
  {
    key: 'claims',
    tabLabel: 'Claims Management',
    eyebrow: 'Claims & Service Management',
    title: 'Every claim logged, assigned, and',
    titleEm: 'resolved with full visibility',
    body: 'Claims arrive from every direction and service work expands with every unresolved request. Dyrect organizes claim intake, validation, assignment, and resolution with clear ownership end-to-end.',
    bullets: [
      { t: 'Serial number validation', d: 'Catch fraudulent and duplicate claims before they are processed.',                  Preview: window.SerialValidationMock || (() => null) },
      { t: 'Smart ticket routing',     d: 'Automatic assignment with priority levels and real-time status tracking.',          Preview: window.TicketRoutingMock || (() => null) },
      { t: 'Service workflow tracking',d: 'Repair, replacement, shipment, dealer payment, and OEM chargeback in one workflow.',Preview: window.WorkflowMock || (() => null) },
    ],
    cta: 'Streamline your claims process',
    href: window.DYRECT_URLS.warrantyManagement,
  },
  {
    key: 'warranties',
    tabLabel: 'Extended Warranties',
    eyebrow: 'Extended Warranties',
    title: 'Offer protection plans across more touchpoints.',
    titleEm: 'Keep 100% of revenue in-house.',
    body: "Don't leave extended warranty revenue to third parties. Dyrect lets brands sell protection plans directly, at the moment customers are most likely to buy — on the product page or after purchase.",
    bullets: [
      { t: 'Multi-touchpoint offers',    d: 'Product page, checkout, post-purchase, and inside the registration flow.', Preview: window.MultiTouchpointMock || (() => null) },
      { t: 'Native ecommerce',           d: 'Connect natively with Shopify and other ecommerce platforms.',             Preview: window.NativeEcommerceMock || (() => null) },
      { t: 'Self-serve plan management', d: 'Customers activate, view, and renew plans from a self-serve portal.',      Preview: window.SelfServePlansMock || (() => null) },
    ],
    cta: 'Explore extended warranties',
    href: window.DYRECT_URLS.extendedWarranties,
  },
  {
    key: 'analytics',
    tabLabel: 'Insights & Analytics',
    eyebrow: 'Insights & Analytics',
    title: 'Complete picture of your warranty operation in',
    titleEm: 'one dashboard',
    body: 'Know exactly where claims come from, which products fail most, how fast the team resolves tickets, and where revenue opportunities are being missed — all in one dashboard, updated in real time.',
    bullets: [
      { t: 'Warranty performance',         d: 'Track registration rates, claim volumes, and resolution times across every product.', Preview: window.PerformanceMock  || (() => null) },
      { t: 'Defect trend detection',       d: 'Identify high-defect products before they become a cost problem.',                    Preview: window.DefectTrendMock  || (() => null) },
      { t: 'Revenue opportunity insights', d: 'Spot upsell opportunities based on warranty expiry and customer activity.',           Preview: window.RevenueOppMock   || (() => null) },
    ],
    cta: 'Explore analytics',
    href: window.DYRECT_URLS.warrantyManagement,
  },
];

function Products() {
  const [tab, setTab] = useState(0);
  const [featIdx, setFeatIdx] = useState(0);
  // Reset feature when product tab changes
  useEffect(() => { setFeatIdx(0); }, [tab]);
  const p = PRODUCTS[tab];
  const active = p.bullets[featIdx];
  const PreviewComp = active.Preview;
  return (
    <section className="section" id="products" style={{ background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }} className="reveal">
          <p className="eyebrow">Products</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            The only warranty management system built for the <span className="em">full post-sale journey</span>
          </h2>
          <p className="section-sub">
            Most warranty tools solve one part of the problem. Dyrect covers the entire journey, from the moment a product is registered to the day a claim is resolved and every service interaction in between.
          </p>
        </div>

        {/* tabs */}
        <div className="product-tabs" style={{
          display: 'flex', gap: 6, marginTop: 48, padding: 6,
          background: 'white', borderRadius: 12,
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: 920, margin: '48px auto 0',
          overflowX: 'auto',
        }}>
          {PRODUCTS.map((pp, i) => (
            <button key={pp.key} onClick={() => setTab(i)}
              style={{
                flex: 1, padding: '12px 16px', borderRadius: 8,
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
                background: tab === i ? 'var(--color-brand-blue)' : 'transparent',
                color: tab === i ? 'white' : '#475569',
                transition: 'all 220ms ease',
                whiteSpace: 'nowrap',
                textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 10,
                cursor: 'pointer',
              }}>
              <span style={{
                width: 22, height: 22, borderRadius: 6,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: tab === i ? 'rgba(255,255,255,0.18)' : 'var(--color-slate-100)',
                color: tab === i ? 'white' : 'var(--color-brand-blue)',
                fontSize: 11, fontWeight: 600,
              }}>{i + 1}</span>
              {pp.tabLabel || pp.eyebrow.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* tab content */}
        <div style={{
          marginTop: 36,
          background: 'white',
          border: '1px solid var(--border-default)',
          borderRadius: 16,
          boxShadow: 'var(--shadow-lg)',
          padding: 'clamp(28px, 4vw, 56px)',
          display: 'grid', gridTemplateColumns: '1fr 460px',
          gap: 56, alignItems: 'center',
        }} className="product-tab-content">
          <div>
            <p className="eyebrow">{p.eyebrow}</p>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.15,
              letterSpacing: '-0.8px', marginTop: 14, marginBottom: 16, color: '#0F172A',
            }}>
              {p.title} <span className="em">{p.titleEm}</span>
            </h3>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 16, lineHeight: 1.55, margin: 0 }}>{p.body}</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 28, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {p.bullets.map((b, i) => {
                const selected = featIdx === i;
                return (
                  <li key={i}>
                    <button onClick={() => setFeatIdx(i)} style={{
                      width: '100%', textAlign: 'left',
                      display: 'flex', gap: 14, alignItems: 'flex-start',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: selected ? 'var(--color-brand-blue-subtle)' : 'transparent',
                      border: `1px solid ${selected ? 'color-mix(in srgb, var(--color-brand-blue) 25%, transparent)' : 'transparent'}`,
                      transition: 'all 200ms ease',
                      cursor: 'pointer',
                      position: 'relative',
                    }}>
                      <span style={{
                        width: 24, height: 24, borderRadius: 6,
                        background: selected ? 'var(--color-brand-blue)' : 'var(--color-brand-blue-subtle)',
                        color: selected ? 'white' : 'var(--color-brand-blue)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: 1,
                        transition: 'all 200ms ease',
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          fontWeight: 600, color: selected ? 'var(--color-brand-blue-deep)' : '#0F172A',
                          fontSize: 15,
                        }}>
                          {b.t}
                          {selected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                          )}
                        </div>
                        <div style={{ color: '#475569', fontSize: 14, marginTop: 2 }}>{b.d}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
            <a href={p.href || window.DYRECT_URLS.contact} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 28, color: 'var(--color-brand-blue)',
              fontWeight: 500, fontSize: 15,
              paddingLeft: 14,
            }}>
              {p.cta}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: 480, position: 'relative' }}>
            {p.bullets.map((b, i) => {
              const Comp = b.Preview;
              const show = featIdx === i;
              return (
                <div key={i} style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
                  opacity: show ? 1 : 0,
                  transform: show ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(10px)',
                  transition: 'opacity 380ms ease, transform 500ms cubic-bezier(.16,.84,.44,1)',
                  pointerEvents: show ? 'auto' : 'none',
                }}>
                  <Comp active={show} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Persona / "Whoever owns the post-sale problem" ───────────── */
function Personas() {
  const [tab, setTab] = useState(0);
  const personas = [
    {
      role: 'Marketer',
      title: 'You have thousands of buyers',
      titleEm: 'you cannot reach',
      body: 'Every product sold through Amazon, offline retail, or a distributor is a customer your brand has no record of. No email, no phone number, no purchase history. Dyrect captures first-party data at the point of product registration so every buyer becomes a direct contact you own, regardless of where they purchased.',
      bullets: ['First-party data on every buyer', 'Trigger upsells at registration', 'Sync to Klaviyo, Mailchimp, HubSpot'],
      Visual: window.MarketerAudienceMock,
      href: window.DYRECT_URLS.productRegistration,
    },
    {
      role: 'Warranty manager',
      title: 'Your claims process was',
      titleEm: 'not built to scale',
      body: 'Claims come in through email, WhatsApp, and phone calls. Each one gets logged manually, followed up individually, and resolved slowly. Dyrect replaces that with a structured system where every claim is validated against a serial number, assigned to the right person, tracked in real time, and closed without manual chasing.',
      bullets: ['Serial-number validation', 'Smart assignment to dealers', 'Repair + chargeback in one workflow'],
      Visual: window.WarrantyInboxMock,
      href: window.DYRECT_URLS.warrantyManagement,
    },
    {
      role: 'Business owner',
      title: 'Your after-sales operation',
      titleEm: 'costs money and earns none',
      body: 'Every warranty claim your team resolves is an expense with no return. Dyrect turns each service interaction into a revenue touchpoint by surfacing extended warranty plans and upsell offers at the right moment, so the same operation that was draining margin starts generating it.',
      bullets: ['100% in-house extended warranties', '3x higher attach rate (avg.)', 'P&L visibility on every claim'],
      Visual: window.BusinessOwnerPLMock,
      href: window.DYRECT_URLS.extendedWarranties,
    },
  ];
  const p = personas[tab];
  const Visual = p.Visual;
  return (
    <section className="section" style={{ background: '#0F172A', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{
        position: 'absolute', top: '-10%', right: '-10%',
        width: 600, height: 600,
        background: 'radial-gradient(closest-side, rgba(36,55,246,0.45), transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }} className="reveal">
          <p className="eyebrow" style={{ color: '#7E8DFE' }}>Customer profile</p>
          <h2 className="section-title" style={{ marginTop: 12, color: 'white' }}>
            Whoever owns the post-sale problem, <span className="em" style={{ color: '#A4AFFE' }}>Dyrect solves it</span>.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, lineHeight: 1.55, maxWidth: 720, margin: '16px auto 0' }}>
            No first-party data. Slow claims processing. After-sales service that costs more than it earns. These are not separate problems — they are the same broken post-sale operation hitting three different teams. Dyrect fixes the whole thing.
          </p>
        </div>

        {/* role tabs */}
        <div style={{
          display: 'flex', gap: 8, justifyContent: 'center',
          marginTop: 40, flexWrap: 'wrap',
        }}>
          {personas.map((pp, i) => (
            <button key={pp.role} onClick={() => setTab(i)} style={{
              padding: '10px 18px', borderRadius: 999,
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
              background: tab === i ? 'white' : 'transparent',
              color: tab === i ? '#0F172A' : 'rgba(255,255,255,0.75)',
              border: tab === i ? '1px solid white' : '1px solid rgba(255,255,255,0.18)',
              transition: 'all 220ms ease',
            }}>{pp.role}</button>
          ))}
        </div>

        <div style={{
          marginTop: 44, display: 'grid', gridTemplateColumns: '1fr 440px',
          gap: 56, alignItems: 'center',
        }} className="product-tab-content">
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.2,
              letterSpacing: '-0.6px', margin: 0, color: 'white',
            }}>{p.title} <span className="em" style={{ color: '#A4AFFE' }}>{p.titleEm}</span></h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.6, marginTop: 16 }}>{p.body}</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'rgba(255,255,255,0.9)', fontSize: 15 }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 999,
                    background: 'rgba(36,55,246,0.25)',
                    color: '#A4AFFE',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href={p.href} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 28, color: '#A4AFFE',
              fontWeight: 500, fontSize: 15,
            }}>
              Learn more
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Visual active={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LogoCloud, PlatformOverview, Products, Personas });
