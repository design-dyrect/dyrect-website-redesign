/* global React, Badge */
const { useEffect, useState } = React;

/* Shared shell — matches portal-previews card style */
function FeatCard({ title, children, width = 420 }) {
  return (
    <div className="pp-card" style={{ width }}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">{title}</div>
      </div>
      <div className="pp-body">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PRODUCT 1: REGISTRATION & UPSELL
   ═══════════════════════════════════════════════════════ */

/* 1.1 Omnichannel registration — sources funneling into Dyrect */
function OmnichannelMock({ active }) {
  const sources = [
    { name: 'QR code on packaging', icon: 'qr', count: '4,820', pct: 38 },
    { name: 'Website link',         icon: 'globe', count: '3,140', pct: 25 },
    { name: 'Shopify auto-sync',    icon: 'cart', count: '3,990', pct: 32 },
    { name: 'Amazon import',        icon: 'box', count: '530',   pct: 5 },
  ];
  const Icons = {
    qr:    <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    cart:  <><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></>,
    box:   <><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/></>,
  };
  return (
    <FeatCard title="Registrations · Sources">
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>This month</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.5px' }}>12,480 registrations</div>
          </div>
          <Badge tone="success" dot>+18% MoM</Badge>
        </div>
        {sources.map((s, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{
                width: 28, height: 28, borderRadius: 6,
                background: 'var(--color-brand-blue-subtle)',
                color: 'var(--color-brand-blue-deep)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{Icons[s.icon]}</svg>
              </span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#1E293B' }}>{s.name}</span>
              <span style={{ fontSize: 12, color: '#475569', fontFamily: 'var(--font-mono)' }}>{s.count}</span>
              <span style={{ fontSize: 11.5, color: '#64748B', width: 28, textAlign: 'right' }}>{s.pct}%</span>
            </div>
            <div style={{ height: 5, background: 'var(--color-slate-100)', borderRadius: 999, overflow: 'hidden', marginLeft: 38 }}>
              <div style={{
                height: '100%', width: active ? `${s.pct * 2.5}%` : '0%',
                background: 'linear-gradient(90deg, #4F60FE, #2437F6)',
                borderRadius: 999,
                transition: `width 900ms cubic-bezier(.16,.84,.44,1) ${i * 80}ms`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </FeatCard>
  );
}

/* 1.2 Digital warranty — a warranty card */
function DigitalWarrantyMock({ active }) {
  return (
    <FeatCard title="My warranty · Sarah Chen">
      <div style={{ padding: 16, background: '#F8FAFC' }}>
        {/* warranty card */}
        <div style={{
          borderRadius: 12,
          background: 'linear-gradient(135deg, #1A23A8 0%, #2437F6 60%, #4A5BFE 100%)',
          padding: 18,
          color: 'white',
          position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.8 }}>Digital warranty</div>
              <img src="assets/logo-blue-icon.png" alt="" style={{ height: 22, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.4px' }}>Velotric Discover 2</div>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.8 }}>Serial no.</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, marginTop: 2 }}>VD2-A8421</div>
              </div>
              <div>
                <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.8 }}>Valid until</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>Apr 22, 2028</div>
              </div>
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 11.5, opacity: 0.85 }}>Sarah Chen</div>
              <Badge tone="success" dot>Active</Badge>
            </div>
          </div>
        </div>
        {/* actions */}
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {[
            { l: 'File a claim', icon: 'file' },
            { l: 'Track repair', icon: 'truck' },
            { l: 'Extend',       icon: 'plus' },
          ].map((a, i) => (
            <button key={i} style={{
              padding: '10px 8px', borderRadius: 8,
              background: 'white', border: '1px solid var(--border-default)',
              fontSize: 12, fontWeight: 500, color: '#1E293B',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {a.icon === 'file' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></>}
                {a.icon === 'truck' && <><path d="M5 18H3V6h13v12h-5"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/><path d="M15 8h4l3 4v6h-3"/></>}
                {a.icon === 'plus' && <><path d="M12 5v14M5 12h14"/></>}
              </svg>
              {a.l}
            </button>
          ))}
        </div>
      </div>
    </FeatCard>
  );
}

/* 1.3 Post-registration upsell — cross-sell + discount coupon */
function PostRegUpsellMock({ active }) {
  return (
    <FeatCard title="Velotric · Registration complete">
      <div style={{ padding: 18, background: '#F8FAFC' }}>
        {/* Success banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 10,
          background: 'var(--color-success-subtle)',
          color: 'var(--color-success-text)',
          marginBottom: 14,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Warranty registration successful</div>
            <div style={{ fontSize: 11.5, opacity: 0.8 }}>Discover 2 · 1-year coverage active</div>
          </div>
        </div>

        {/* Coupon card */}
        <div style={{
          background: 'white',
          borderRadius: 12,
          border: '1px dashed var(--color-brand-blue)',
          padding: 14,
          marginBottom: 10,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: '50%', left: -6, transform: 'translateY(-50%)',
            width: 12, height: 12, borderRadius: 999,
            background: '#F8FAFC',
            border: '1px dashed var(--color-brand-blue)',
            clipPath: 'inset(0 0 0 50%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', top: '50%', right: -6, transform: 'translateY(-50%)',
            width: 12, height: 12, borderRadius: 999,
            background: '#F8FAFC',
            border: '1px dashed var(--color-brand-blue)',
            clipPath: 'inset(0 50% 0 0)',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'var(--color-brand-blue-subtle)',
              color: 'var(--color-brand-blue-deep)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/></svg>
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A' }}>10% off your next purchase</div>
              <div style={{ fontSize: 11.5, color: '#64748B' }}>Valid for 30 days · single use</div>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
              padding: '6px 10px', borderRadius: 6,
              background: 'var(--color-brand-blue)', color: 'white',
              letterSpacing: 0.6,
            }}>SWAG10</div>
          </div>
        </div>

        {/* People also bought */}
        <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 8, marginTop: 4 }}>
          People also bought
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { name: 'Velotric helmet',  price: '$59', icon: 'helmet' },
            { name: 'Bike lock combo',  price: '$39', icon: 'lock' },
          ].map((p, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid var(--border-default)',
              borderRadius: 10, padding: 10,
              display: 'flex', alignItems: 'center', gap: 10,
              position: 'relative',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 6,
                background: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: '#475569', flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {p.icon === 'helmet' && <><path d="M4 14a8 8 0 0 1 16 0v3H4z"/><path d="M4 17h16M8 14V9M16 14V9"/></>}
                  {p.icon === 'lock'   && <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>}
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-brand-blue-deep)', fontWeight: 600 }}>{p.price}</div>
              </div>
              <button style={{
                width: 26, height: 26, borderRadius: 999,
                background: 'var(--color-brand-blue)', color: 'white',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          ))}
        </div>

        {/* Revenue impact */}
        <div style={{
          marginTop: 12,
          padding: '10px 12px',
          borderRadius: 10,
          background: 'white',
          border: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Upsell revenue · this month</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#0F172A', marginTop: 2, letterSpacing: '-0.3px' }}>$28,293</div>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 8px', borderRadius: 999,
            background: 'var(--color-success-subtle)', color: 'var(--color-success-text)',
            fontSize: 11, fontWeight: 600,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 15 6-6 6 6" transform="rotate(180 12 12)"/><path d="M22 7 13.5 15.5 8.5 10.5 2 17"/></svg>
            +84%
          </span>
        </div>
      </div>
    </FeatCard>
  );
}

/* ═══════════════════════════════════════════════════════
   PRODUCT 2: CLAIMS & SERVICE
   ═══════════════════════════════════════════════════════ */

/* 2.1 Serial number validation */
function SerialValidationMock({ active }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) { setStep(0); return; }
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);
  return (
    <FeatCard title="Claim TS89281 · Validation">
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 6 }}>Serial number</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 14px',
          background: '#F8FAFC',
          border: '1px solid var(--border-default)',
          borderRadius: 8,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, color: '#0F172A', letterSpacing: 0.5 }}>
            VD2-A8421
          </span>
          <div style={{ flex: 1 }} />
          {step >= 1 && <Badge tone="success" dot>Verified</Badge>}
        </div>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { l: 'Serial format check',    ok: step >= 1 },
            { l: 'Manufacturing match',    ok: step >= 1 },
            { l: 'Warranty within window', ok: step >= 2 },
            { l: 'No duplicate claim',     ok: step >= 2 },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
              <span style={{
                width: 18, height: 18, borderRadius: 999,
                background: c.ok ? 'var(--color-success-subtle)' : 'var(--color-slate-100)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: c.ok ? 'var(--color-success-text)' : '#94A3B8',
              }}>
                {c.ok ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/></svg>
                )}
              </span>
              <span style={{ color: c.ok ? '#1E293B' : '#94A3B8' }}>{c.l}</span>
            </div>
          ))}
        </div>
        {step >= 2 && (
          <div style={{
            marginTop: 14, padding: 12, borderRadius: 8,
            background: 'var(--color-success-subtle)',
            border: '1px solid color-mix(in srgb, var(--color-success) 30%, transparent)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-text)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <div style={{ fontSize: 13 }}>
              <div style={{ fontWeight: 600, color: 'var(--color-success-text)' }}>Eligible for repair</div>
              <div style={{ color: '#166534', opacity: 0.85, fontSize: 12 }}>Ready to assign to dealer</div>
            </div>
          </div>
        )}
      </div>
    </FeatCard>
  );
}

/* 2.2 Smart ticket routing — auto-assign to the right team member */
function TicketRoutingMock({ active }) {
  return (
    <FeatCard title="Assigning TS89274">
      <div style={{ padding: 18 }}>
        {/* Rule */}
        <div style={{
          padding: '10px 12px', borderRadius: 8,
          background: '#F8FAFC',
          border: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 12,
        }}>
          <span style={{
            width: 26, height: 26, borderRadius: 6,
            background: 'var(--color-brand-blue-subtle)',
            color: 'var(--color-brand-blue-deep)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>
            </svg>
          </span>
          <div style={{ flex: 1, fontSize: 12.5, color: '#475569' }}>
            Auto-route: <strong style={{ color: '#0F172A' }}>Battery</strong> · <strong style={{ color: '#0F172A' }}>Priority high</strong> · <strong style={{ color: '#0F172A' }}>West region</strong>
          </div>
        </div>

        {/* Team header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Support team · West</div>
          <span style={{ fontSize: 11, color: '#64748B' }}>3 available</span>
        </div>

        {/* Team members */}
        {[
          { name: 'Ari Mehta',     role: 'Senior agent',  initials: 'AM', color: '#2437F6', skills: ['Battery', 'Motor'],     load: 28,  status: 'Online',  pick: true },
          { name: 'Jordan Becker', role: 'Service agent', initials: 'JB', color: '#0EA5E9', skills: ['Battery', 'Frame'],     load: 64,  status: 'Online' },
          { name: 'Priya Nair',    role: 'Tier 2',        initials: 'PN', color: '#7C3AED', skills: ['Display', 'Electronics'], load: 82, status: 'Away' },
        ].map((m, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: 12, marginBottom: 8,
            borderRadius: 8,
            background: m.pick ? 'rgba(36,55,246,0.04)' : 'white',
            border: `1.5px solid ${m.pick ? 'var(--color-brand-blue)' : 'var(--border-default)'}`,
            position: 'relative',
          }}>
            {/* avatar with online dot */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 999,
                background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`,
                color: 'white',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 600, fontSize: 13, letterSpacing: '-0.3px',
              }}>{m.initials}</div>
              <span style={{
                position: 'absolute', right: -1, bottom: -1,
                width: 11, height: 11, borderRadius: 999,
                background: m.status === 'Online' ? 'var(--color-success)' : 'var(--color-warning)',
                border: '2px solid white',
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A' }}>{m.name}</span>
                {m.pick && <Badge tone="brand" dot>Auto-assigned</Badge>}
              </div>
              <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span>{m.role}</span>
                <span style={{ color: '#CBD5E1' }}>·</span>
                {m.skills.map((s, k) => (
                  <span key={k} style={{
                    padding: '1px 6px', borderRadius: 4,
                    background: 'var(--color-slate-100)', color: '#475569',
                    fontSize: 10.5, fontWeight: 500,
                  }}>{s}</span>
                ))}
              </div>
              {/* workload bar */}
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 999, background: 'var(--color-slate-100)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${m.load}%`,
                    background: m.load > 75 ? 'var(--color-error)' : m.load > 50 ? 'var(--color-warning)' : 'var(--color-success)',
                    borderRadius: 999,
                  }} />
                </div>
                <span style={{ fontSize: 10.5, color: '#94A3B8', minWidth: 40, textAlign: 'right' }}>{m.load}% load</span>
              </div>
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 4, padding: '8px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 11.5, color: '#64748B',
        }}>
          <span>Assigned in <strong style={{ color: '#0F172A' }}>2.4s</strong></span>
          <span>SLA · 4 hours</span>
        </div>
      </div>
    </FeatCard>
  );
}

/* 2.3 Service workflow tracking */
function WorkflowMock({ active }) {
  const stages = [
    { l: 'Claim filed',  by: 'Sarah Chen',   t: 'Apr 18, 9:12 AM', done: true },
    { l: 'Validated',    by: 'Auto · system', t: 'Apr 18, 9:13 AM', done: true },
    { l: 'Assigned',     by: 'Northgate Svc', t: 'Apr 18, 9:15 AM', done: true },
    { l: 'Repair started', by: 'Ari Mehta',   t: 'Apr 19, 11:30 AM', done: true, active: true },
    { l: 'Shipped back', by: '—',             t: 'Pending',          done: false },
    { l: 'Resolved',     by: '—',             t: 'Pending',          done: false },
  ];
  return (
    <FeatCard title="TS89260 · Service timeline">
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569' }}>TS89260</span>
          <Badge tone="brand" dot>In repair · Day 2</Badge>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11, color: '#64748B' }}>SLA · 3d remaining</span>
        </div>
        <div style={{ position: 'relative', paddingLeft: 18 }}>
          <div style={{ position: 'absolute', left: 7, top: 6, bottom: 6, width: 2, background: 'var(--color-slate-200)' }} />
          {stages.map((s, i) => (
            <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '6px 0' }}>
              <span style={{
                position: 'absolute', left: -18, top: 6,
                width: 16, height: 16, borderRadius: 999,
                background: s.done ? (s.active ? 'var(--color-brand-blue)' : 'var(--color-success)') : 'white',
                border: s.done ? 'none' : '2px solid var(--color-slate-300)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
                boxShadow: s.active ? '0 0 0 4px rgba(36,55,246,0.18)' : 'none',
              }}>
                {s.done && !s.active && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: s.active ? 600 : 500, color: s.done ? '#1E293B' : '#94A3B8' }}>{s.l}</div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 1 }}>{s.by} · {s.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeatCard>
  );
}

/* ═══════════════════════════════════════════════════════
   PRODUCT 3: EXTENDED WARRANTIES
   ═══════════════════════════════════════════════════════ */

/* 3.1 Multi-touchpoint offers — auto-cycling carousel of 5 touchpoints */
function MultiTouchpointMock({ active }) {
  const [idx, setIdx] = useState(0);
  const touchpoints = ['pdp', 'checkout', 'post-purchase', 'registration', 'email'];
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % touchpoints.length), 2400);
    return () => clearInterval(t);
  }, [active]);

  const TOUCHPOINTS_META = [
    { key: 'pdp',           label: 'Product page',  attach: '12%' },
    { key: 'checkout',      label: 'Checkout',      attach: '18%' },
    { key: 'post-purchase', label: 'Post-purchase', attach: '9%'  },
    { key: 'registration',  label: 'Registration',  attach: '24%' },
    { key: 'email',         label: 'Lifecycle email', attach: '14%' },
  ];

  return (
    <FeatCard title={`Plan offer · ${TOUCHPOINTS_META[idx].label}`}>
      <div style={{ background: '#F8FAFC' }}>
        {/* Stage that holds all 5 scenes */}
        <div style={{
          position: 'relative',
          height: 322,
          overflow: 'hidden',
        }}>
          {touchpoints.map((tp, i) => {
            const offset = i - idx;
            return (
              <div key={tp} style={{
                position: 'absolute', inset: 0,
                padding: 18,
                opacity: offset === 0 ? 1 : 0,
                transform: `translateX(${offset * 24}px)`,
                transition: 'opacity 380ms ease, transform 520ms cubic-bezier(.16,.84,.44,1)',
                pointerEvents: offset === 0 ? 'auto' : 'none',
              }}>
                {tp === 'pdp'           && <ScenePDP />}
                {tp === 'checkout'      && <SceneCheckout />}
                {tp === 'post-purchase' && <ScenePostPurchase />}
                {tp === 'registration'  && <SceneRegistration />}
                {tp === 'email'         && <SceneEmail />}
              </div>
            );
          })}
        </div>

        {/* Footer — touchpoint name + attach rate + dots */}
        <div style={{
          padding: '12px 18px 14px',
          borderTop: '1px solid var(--border-default)',
          background: 'white',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>
              {TOUCHPOINTS_META[idx].label}
            </div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>
              {TOUCHPOINTS_META[idx].attach} attach rate
            </div>
          </div>
          {/* Dots */}
          <div style={{ display: 'flex', gap: 6 }}>
            {touchpoints.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{
                width: i === idx ? 18 : 6, height: 6, borderRadius: 999,
                background: i === idx ? 'var(--color-brand-blue)' : 'var(--color-slate-300)',
                transition: 'all 240ms ease',
                padding: 0, cursor: 'pointer',
              }} />
            ))}
          </div>
        </div>
      </div>
    </FeatCard>
  );
}

/* ── Touchpoint scenes ── */

function PlanRow({ years, price, sel, lbl }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 10px', marginBottom: 4,
      borderRadius: 6,
      background: sel ? 'rgba(36,55,246,0.04)' : 'white',
      border: `1.5px solid ${sel ? 'var(--color-brand-blue)' : 'var(--border-default)'}`,
    }}>
      <div style={{
        width: 13, height: 13, borderRadius: 999,
        border: `2px solid ${sel ? 'var(--color-brand-blue)' : '#CBD5E1'}`,
        background: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {sel && <span style={{ width: 6, height: 6, background: 'var(--color-brand-blue)', borderRadius: 999 }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11.5, fontWeight: 500, color: '#1E293B' }}>{years}</div>
        {lbl && <div style={{ fontSize: 10, color: sel ? 'var(--color-brand-blue-deep)' : '#64748B' }}>{lbl}</div>}
      </div>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: '#0F172A' }}>{price}</div>
    </div>
  );
}

/* Scene 1: Product page (PDP) */
function ScenePDP() {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border-default)', padding: 12, height: '100%' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 6,
          background: 'linear-gradient(135deg, #1E293B, #334155)',
          color: 'white',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h3l3 8M5 14l4-7h6l3 6"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Velotric Discover 2</div>
          <div style={{ fontSize: 11.5, color: '#64748B' }}>$1,499 · in stock</div>
        </div>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4 }}>PDP</span>
      </div>
      <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500, marginBottom: 6 }}>Protect your purchase</div>
      <PlanRow years="1 year"  price="$0"   />
      <PlanRow years="2 years" price="$79"  sel lbl="Most popular" />
      <PlanRow years="3 years" price="$129" />
      <button style={{
        width: '100%', marginTop: 6,
        padding: '8px 12px', borderRadius: 6,
        background: '#1E293B', color: 'white',
        fontSize: 12, fontWeight: 500,
      }}>Add to cart · $1,578</button>
    </div>
  );
}

/* Scene 2: Checkout */
function SceneCheckout() {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border-default)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Cart top */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: '#0F172A' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          Your cart
        </div>
        <span style={{ fontSize: 11, color: '#64748B' }}>1 item · $1,499</span>
      </div>
      {/* Add-on banner */}
      <div style={{ padding: 14, flex: 1 }}>
        <div style={{
          padding: 12, borderRadius: 8,
          background: 'rgba(36,55,246,0.04)',
          border: '1.5px solid var(--color-brand-blue)',
          marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--color-brand-blue)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>Upgrade to extended coverage</span>
          </div>
          <div style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.45 }}>Add 2 more years of accidental damage + battery cover.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <button style={{ flex: 1, padding: '8px', borderRadius: 6, background: 'var(--color-brand-blue)', color: 'white', fontSize: 11.5, fontWeight: 500 }}>Add for $79</button>
            <button style={{ padding: '8px 12px', borderRadius: 6, background: 'white', color: '#64748B', fontSize: 11.5, border: '1px solid var(--border-default)' }}>Skip</button>
          </div>
        </div>
        {/* Summary lines */}
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { l: 'Subtotal',  v: '$1,499' },
            { l: 'Shipping',  v: 'Free' },
            { l: 'Total',     v: '$1,499', bold: true },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: r.bold ? '#0F172A' : '#64748B', fontWeight: r.bold ? 600 : 400 }}>
              <span>{r.l}</span><span>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Scene 3: Post-purchase thank you */
function ScenePostPurchase() {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border-default)', padding: 14, height: '100%' }}>
      <div style={{ textAlign: 'center', padding: '4px 0 10px', borderBottom: '1px solid var(--color-slate-100)' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 999,
          background: 'var(--color-success-subtle)', color: 'var(--color-success-text)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Thanks for your order!</div>
        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>#3494034034 · ships in 2 days</div>
      </div>
      <div style={{ marginTop: 12, padding: 12, background: 'rgba(36,55,246,0.04)', border: '1px solid var(--color-brand-blue)', borderRadius: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-brand-blue-deep)', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>One last thing</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Protect your Discover 2 for $79</div>
        <div style={{ fontSize: 11.5, color: '#475569', marginTop: 4, lineHeight: 1.4 }}>One-time offer for new buyers — covers accidents, batteries, motor.</div>
        <button style={{
          width: '100%', marginTop: 10,
          padding: '8px 12px', borderRadius: 6,
          background: 'var(--color-brand-blue)', color: 'white',
          fontSize: 12, fontWeight: 500,
        }}>Add protection</button>
      </div>
    </div>
  );
}

/* Scene 4: Registration */
function SceneRegistration() {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border-default)', padding: 14, height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{
          width: 28, height: 28, borderRadius: 6,
          background: 'var(--color-success-subtle)', color: 'var(--color-success-text)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>Warranty activated</div>
          <div style={{ fontSize: 10.5, color: '#64748B' }}>VD2-A8421 · 1-year coverage</div>
        </div>
      </div>
      <div style={{
        padding: 12, borderRadius: 8,
        background: 'linear-gradient(135deg, #1A23A8, #2437F6)',
        color: 'white', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }} />
        <div style={{ position: 'relative' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 8px', borderRadius: 999,
            background: 'rgba(255,255,255,0.16)',
            fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: '#A4AFFE' }} />
            Limited offer · 24h
          </span>
          <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 8, letterSpacing: '-0.2px' }}>Add 2 more years now</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' }}>$79</span>
            <span style={{ fontSize: 11, opacity: 0.7, textDecoration: 'line-through' }}>$129</span>
            <span style={{ fontSize: 10.5, padding: '2px 6px', borderRadius: 4, background: 'rgba(126,226,161,0.2)', color: '#7EE2A1', fontWeight: 600 }}>SAVE 38%</span>
          </div>
          <button style={{
            width: '100%', marginTop: 10,
            padding: '8px 12px', borderRadius: 6,
            background: 'white', color: 'var(--color-brand-blue-deep)',
            fontSize: 12, fontWeight: 600,
          }}>Add to my plan</button>
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: '#64748B', marginTop: 8, textAlign: 'center' }}>
        Triggered right at warranty activation
      </div>
    </div>
  );
}

/* Scene 5: Lifecycle email */
function SceneEmail() {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border-default)', padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Email header */}
      <div style={{ padding: '8px 12px', background: '#F8FAFC', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--color-brand-blue)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>V</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#1E293B' }}>Velotric &lt;hello@velotric.com&gt;</div>
          <div style={{ fontSize: 10, color: '#64748B' }}>Your warranty expires in 30 days</div>
        </div>
        <span style={{ fontSize: 10, color: '#94A3B8' }}>2m ago</span>
      </div>
      <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Don't lose your coverage</div>
        <div style={{ fontSize: 11.5, color: '#475569', marginTop: 4, lineHeight: 1.45 }}>
          Your Discover 2 warranty ends Apr 22. Renew now and stay covered.
        </div>
        <div style={{
          marginTop: 12, padding: 10,
          background: '#F8FAFC',
          border: '1px solid var(--border-default)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--color-brand-blue-subtle)', color: 'var(--color-brand-blue-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>Renew 2-year cover</div>
            <div style={{ fontSize: 10.5, color: '#64748B' }}>From <strong style={{ color: '#0F172A' }}>$59/year</strong></div>
          </div>
        </div>
        <button style={{
          marginTop: 'auto', marginTop: 12,
          padding: '9px 12px', borderRadius: 6,
          background: 'var(--color-brand-blue)', color: 'white',
          fontSize: 12, fontWeight: 500,
        }}>Renew warranty →</button>
      </div>
    </div>
  );
}

/* 3.2 Native ecommerce — brand admin view: platform integrations + EW config */
function NativeEcommerceMock({ active }) {
  const platforms = [
    { name: 'Shopify',     dot: '#95BF47', letter: 'S', status: 'Connected', store: '32 stores · 12.4K SKUs', sel: true },
    { name: 'WooCommerce', dot: '#7F54B3', letter: 'W', status: 'Connected', store: '8 stores · 3.2K SKUs' },
    { name: 'Magento',     dot: '#EE672F', letter: 'M', status: 'Connected', store: '2 stores · 980 SKUs' },
  ];
  return (
    <FeatCard title="Settings · Ecommerce integrations">
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 6 }}>
          Connected platforms
        </div>
        {platforms.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', marginBottom: 5,
            borderRadius: 7,
            background: p.sel ? 'rgba(36,55,246,0.04)' : 'white',
            border: `1.5px solid ${p.sel ? 'var(--color-brand-blue)' : 'var(--border-default)'}`,
          }}>
            <span style={{
              width: 26, height: 26, borderRadius: 6,
              background: p.dot, color: 'white',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
              flexShrink: 0,
            }}>{p.letter}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>{p.name}</div>
              <div style={{ fontSize: 10.5, color: '#64748B', marginTop: 1 }}>{p.store}</div>
            </div>
            <Badge tone="success" dot>Connected</Badge>
          </div>
        ))}

        <div style={{
          marginTop: 6,
          padding: '7px 10px', borderRadius: 7,
          background: '#F8FAFC',
          border: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 7.5 4M21 12a9 9 0 0 1-9 9 9 9 0 0 1-7.5-4"/>
            <path d="m17 8 2-4 2 4M7 16l-2 4-2-4"/>
          </svg>
          <div style={{ flex: 1, fontSize: 11.5, color: '#475569' }}>
            <strong style={{ color: '#0F172A' }}>Auto-syncing</strong> 16.6K SKUs · 2m ago
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 6 }}>
          Offer extended warranty on
        </div>
        <div style={{
          background: 'white',
          border: '1px solid var(--border-default)',
          borderRadius: 7,
          overflow: 'hidden',
        }}>
          {[
            { l: 'Shopify product pages', on: true,  meta: 'Inline plan picker' },
            { l: 'Shopify checkout',      on: true,  meta: 'Cart add-on step' },
            { l: 'WooCommerce checkout',  on: false, meta: 'Not enabled' },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 10px',
              borderTop: i === 0 ? 'none' : '1px solid var(--color-slate-100)',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#1E293B' }}>{row.l}</div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>{row.meta}</div>
              </div>
              <span style={{
                position: 'relative', width: 28, height: 16,
                borderRadius: 999,
                background: row.on ? 'var(--color-brand-blue)' : 'var(--color-slate-300)',
                transition: 'background 160ms',
                flexShrink: 0,
              }}>
                <span style={{
                  position: 'absolute', top: 2, left: row.on ? 14 : 2,
                  width: 12, height: 12, borderRadius: 999,
                  background: 'white',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.20)',
                  transition: 'left 160ms',
                }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </FeatCard>
  );
}

/* 3.3 Self-serve plan management */
function SelfServePlansMock({ active }) {
  const plans = [
    { name: 'Velotric Discover 2',  type: '2-year extended', exp: 'Apr 22, 2028', state: 'Active',  tone: 'success' },
    { name: 'Velotric Nomad 1 Plus', type: 'Standard warranty', exp: 'Jun 10, 2026', state: 'Renew available', tone: 'warning' },
  ];
  return (
    <FeatCard title="My plans · Sarah Chen">
      <div style={{ padding: 16, background: '#F8FAFC' }}>
        <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 10 }}>Protection plans</div>
        {plans.map((p, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 10,
            border: '1px solid var(--border-default)',
            padding: 14, marginBottom: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A' }}>{p.name}</div>
              <Badge tone={p.tone} dot>{p.state}</Badge>
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{p.type} · expires {p.exp}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button style={{
                padding: '6px 10px', borderRadius: 6,
                background: i === 1 ? 'var(--color-brand-blue)' : 'white',
                color: i === 1 ? 'white' : '#475569',
                fontSize: 12, fontWeight: 500,
                border: i === 1 ? 'none' : '1px solid var(--border-default)',
              }}>{i === 1 ? 'Renew now' : 'View details'}</button>
              {i === 0 && (
                <button style={{
                  padding: '6px 10px', borderRadius: 6,
                  background: 'transparent', color: '#475569',
                  fontSize: 12, fontWeight: 500,
                  border: '1px solid var(--border-default)',
                }}>File a claim</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </FeatCard>
  );
}

/* ═══════════════════════════════════════════════════════
   PRODUCT 4: INSIGHTS & ANALYTICS
   ═══════════════════════════════════════════════════════ */

/* 4.1 Warranty performance — reuses Analytics-like layout */
function PerformanceMock({ active }) {
  const bars = [38, 52, 44, 61, 58, 72, 68, 79, 84, 76, 88, 94];
  const labels = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const maxBar = 100;
  return (
    <FeatCard title="Performance · Last 12 months">
      <div style={{ padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { l: 'Registration rate', v: '84%',   t: '+12pp' },
            { l: 'Avg resolution',    v: '1.4d',  t: '−31%' },
            { l: 'Claim rate',        v: '3.2%',  t: '−0.8pp' },
          ].map((k, i) => (
            <div key={i} style={{ background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 10, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500 }}>{k.l}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 4 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>{k.v}</span>
                <span style={{ fontSize: 10.5, color: 'var(--color-success-text)', fontWeight: 500 }}>{k.t}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', marginBottom: 6 }}>Resolutions by month</div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${bars.length}, 1fr)`, gap: 4, alignItems: 'end', height: 110 }}>
          {bars.map((v, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' }}>
              <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'end' }}>
                <div style={{
                  width: '100%', height: active ? `${(v / maxBar) * 100}%` : '0%',
                  background: 'linear-gradient(180deg, #4F60FE 0%, #2437F6 100%)',
                  borderRadius: '3px 3px 0 0',
                  transition: `height 900ms cubic-bezier(.16,.84,.44,1) ${i * 50}ms`,
                }} />
              </div>
              <span style={{ fontSize: 9.5, color: '#94A3B8', fontWeight: 500 }}>{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </FeatCard>
  );
}

/* 4.2 Defect trend detection */
function DefectTrendMock({ active }) {
  const series = [12, 11, 14, 13, 15, 17, 24, 38, 52, 61, 58, 64];
  const max = 70;
  return (
    <FeatCard title="Defects · Alert">
      <div style={{ padding: 16 }}>
        <div style={{
          padding: 12, borderRadius: 8,
          background: 'var(--color-error-subtle)',
          border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)',
          marginBottom: 14,
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-error-text)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
            <path d="m21.7 17.1-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.7-3z"/><path d="M12 9v4M12 17h.01"/>
          </svg>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-error-text)' }}>Defect spike detected</div>
            <div style={{ fontSize: 12, color: '#991B1B', opacity: 0.85, marginTop: 2 }}>
              VD2 batteries · 4.2× normal rate over last 30 days
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11.5, color: '#64748B', marginBottom: 4 }}>Claim rate · Velotric Discover 2</div>
        <div style={{ position: 'relative', height: 90, display: 'grid', gridTemplateColumns: `repeat(${series.length}, 1fr)`, gap: 4, alignItems: 'end' }}>
          {series.map((v, i) => {
            const spike = i >= 6;
            return (
              <div key={i} style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'end' }}>
                <div style={{
                  width: '100%', height: active ? `${(v / max) * 100}%` : '0%',
                  background: spike ? 'linear-gradient(180deg, #FB7185, #EF4444)' : 'var(--color-slate-300)',
                  borderRadius: '3px 3px 0 0',
                  transition: `height 700ms cubic-bezier(.16,.84,.44,1) ${i * 40}ms`,
                }} />
              </div>
            );
          })}
          {/* threshold line */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: '70%', height: 1,
            background: 'repeating-linear-gradient(90deg, #94A3B8, #94A3B8 4px, transparent 4px, transparent 8px)',
          }} />
        </div>
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11.5 }}>
          <span style={{ color: '#64748B' }}>Threshold: 20 claims/mo</span>
          <button style={{
            padding: '6px 10px', borderRadius: 6,
            background: 'var(--color-brand-blue)', color: 'white',
            fontSize: 12, fontWeight: 500,
          }}>Investigate root cause →</button>
        </div>
      </div>
    </FeatCard>
  );
}

/* 4.3 Revenue opportunity */
function RevenueOppMock({ active }) {
  const opps = [
    { who: 'Sarah Chen',   prod: 'Velotric Nomad 1+', daysOut: 24, value: '$129', score: 92 },
    { who: 'Marco Diaz',   prod: 'Velotric T1',       daysOut: 32, value: '$79',  score: 87 },
    { who: 'Lin Tao',      prod: 'Velotric Fold',     daysOut: 41, value: '$129', score: 81 },
    { who: 'Priya Iyer',   prod: 'Velotric Discover', daysOut: 58, value: '$79',  score: 74 },
  ];
  return (
    <FeatCard title="Revenue opportunities">
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Warranty expiring · Next 60d</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.5px' }}>$48,210 potential</div>
          </div>
          <Badge tone="brand" dot>419 customers</Badge>
        </div>
        <div style={{ borderTop: '1px solid var(--border-default)' }}>
          {opps.map((o, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto auto',
              gap: 10, alignItems: 'center',
              padding: '10px 0',
              borderBottom: i === opps.length - 1 ? 'none' : '1px solid var(--color-slate-100)',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1E293B' }}>{o.who}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{o.prod} · {o.daysOut}d to expire</div>
              </div>
              <div style={{ fontSize: 11, color: '#475569' }}>
                <span style={{ fontWeight: 600 }}>{o.score}</span>/100
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--color-brand-blue-deep)' }}>{o.value}</div>
              <button style={{
                padding: '4px 8px', borderRadius: 6,
                background: 'var(--color-brand-blue-subtle)', color: 'var(--color-brand-blue-deep)',
                fontSize: 11, fontWeight: 500,
              }}>Reach out →</button>
            </div>
          ))}
        </div>
      </div>
    </FeatCard>
  );
}

Object.assign(window, {
  OmnichannelMock, DigitalWarrantyMock, PostRegUpsellMock,
  SerialValidationMock, TicketRoutingMock, WorkflowMock,
  MultiTouchpointMock, NativeEcommerceMock, SelfServePlansMock,
  PerformanceMock, DefectTrendMock, RevenueOppMock,
});
