/* global React */
/* Visual mocks for the Extended Warranties page.
   - EwHeroMock: a 3-step animated plan flow (Offer → Purchase → Coverage active)
   - EwFeatureOffers: protection-plan offer animating across PDP → Checkout → Post-purchase touchpoints
   - EwFeatureCoverage: a self-serve coverage portal with a renewal action animating in
   - EwFeatureRevenue: attach-rate + extended-warranty revenue analytics growing on loop
   Time-derived step counters keep loops running through any remount. */
const { useEffect: ewmUE, useState: ewmUS } = React;

const EW_CARD_BASE = {
  background: 'var(--color-surface, #fff)',
  border: '1px solid var(--color-border, #E2E8F0)',
  borderRadius: 16,
  boxShadow: 'var(--shadow-xl, 0 24px 60px rgba(15,23,42,0.10))',
  overflow: 'hidden',
};

function EwAvatar({ initials, tone = '#2437F6', size = 28 }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: 999,
      background: tone + '22', color: tone,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: Math.round(size * 0.4), fontWeight: 700, flexShrink: 0,
    }}>{initials}</span>
  );
}

/* Phone frame (customer-facing, mirrors the PR hero device) */
function EwPhoneFrame({ children, brand = 'Velotric · Protection' }) {
  return (
    <div style={{
      position: 'relative', width: 320, margin: '0 auto',
      borderRadius: 36, background: 'var(--gray-950, #0F172A)', padding: 10,
      boxShadow: '0 30px 80px -20px rgba(15,23,42,0.45), 0 12px 30px -6px rgba(15,23,42,0.18)',
    }}>
      <div style={{ borderRadius: 28, background: 'var(--color-surface-subtle, #F8FAFC)', overflow: 'hidden', height: 588, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 22px 6px', fontSize: 11, fontWeight: 600, color: 'var(--gray-950,#0F172A)', flexShrink: 0 }}>
          <span>9:41</span>
          <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M1 6h2v3H1zm4-2h2v5H5zm4-2h2v7H9z"/></svg>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="1" y="2" width="12" height="6" rx="1.2" stroke="currentColor" strokeWidth="0.8" fill="none"/><rect x="2" y="3" width="9" height="4" rx="0.6"/><rect x="14" y="4" width="1.2" height="2" rx="0.4"/></svg>
          </span>
        </div>
        <div style={{ padding: '12px 22px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--gray-200, #E2E8F0)', flexShrink: 0 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--blue-500, #2437F6)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700 }}>V</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-950,#0F172A)' }}>{brand}</div>
        </div>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>{children}</div>
      </div>
    </div>
  );
}

function EwStepShell({ show, children }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, padding: '12px 22px 18px',
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 420ms ease, transform 520ms cubic-bezier(.22,1,.36,1)',
      pointerEvents: show ? 'auto' : 'none',
      display: 'flex', flexDirection: 'column',
    }}>{children}</div>
  );
}

/* ═══════════════ HERO — 3-step plan flow ═══════════════ */
function EwHeroMock() {
  const [, force] = ewmUS(0);
  ewmUE(() => {
    const t = setInterval(() => force((n) => n + 1), 500);
    return () => clearInterval(t);
  }, []);
  const step = (Math.floor(Date.now() / 3200) % 3) + 1;

  const PLANS = [
    { yr: '1 yr', price: '$39', sub: 'Accidental + mechanical' },
    { yr: '2 yr', price: '$69', sub: 'Most popular', best: true },
    { yr: '3 yr', price: '$99', sub: 'Full lifecycle cover' },
  ];

  return (
    <div className="pr-hero-mock-wrap" style={{ position: 'relative', width: '100%', maxWidth: 440, margin: '0 auto' }}>
      <div aria-hidden style={{ position: 'absolute', inset: '-30px', background: 'radial-gradient(closest-side, rgba(36,55,246,0.18), transparent 70%)', filter: 'blur(28px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <EwPhoneFrame>
          {/* progress dots header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '14px 22px 10px', flexShrink: 0 }}>
            {['Choose plan', 'Checkout', 'Covered'].map((label, i) => {
              const n = i + 1, done = step > n, current = step === n;
              return (
                <React.Fragment key={i}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 999, flexShrink: 0,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700,
                    background: current ? 'var(--blue-500,#2437F6)' : done ? 'var(--green-500,#22C55E)' : 'var(--gray-100,#F1F5F9)',
                    color: (current || done) ? '#fff' : 'var(--gray-400,#94A3B8)',
                    transition: 'all 300ms cubic-bezier(.22,1,.36,1)',
                  }}>
                    {done ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg> : n}
                  </span>
                  {i < 2 && <div style={{ flex: 1, height: 2, margin: '0 6px', background: step > n ? 'var(--green-300,#86EFAC)' : 'var(--gray-200,#E2E8F0)', borderRadius: 2, transition: 'background 300ms' }} />}
                </React.Fragment>
              );
            })}
          </div>

          {/* step slot — only the 3 panels share this relative box */}
          <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
          {/* STEP 1 — choose plan */}
          <EwStepShell show={step === 1}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-500,#64748B)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Protect your purchase</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.4px', color: 'var(--gray-950,#0F172A)', marginTop: 6 }}>Add a protection plan</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 16 }}>
              {PLANS.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12,
                  background: p.best ? 'var(--color-primary-soft,#EEF0FE)' : '#fff',
                  border: p.best ? '1.5px solid var(--blue-500,#2437F6)' : '1px solid var(--gray-200,#E2E8F0)',
                  position: 'relative',
                }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: 999, flexShrink: 0,
                    border: p.best ? 'none' : '2px solid var(--gray-300,#CBD5E1)',
                    background: p.best ? 'var(--blue-500,#2437F6)' : '#fff',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {p.best && <span style={{ width: 7, height: 7, borderRadius: 999, background: '#fff' }} />}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--gray-950,#0F172A)' }}>{p.yr} coverage</div>
                    <div style={{ fontSize: 11, color: p.best ? 'var(--blue-700,#1B2BC4)' : 'var(--gray-500,#64748B)', marginTop: 1, fontWeight: p.best ? 600 : 400 }}>{p.sub}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, color: 'var(--gray-950,#0F172A)' }}>{p.price}</div>
                  {p.best && <span style={{ position: 'absolute', top: -8, right: 12, fontSize: 9, fontWeight: 700, color: '#fff', background: 'var(--blue-500,#2437F6)', padding: '2px 7px', borderRadius: 999, letterSpacing: 0.4 }}>POPULAR</span>}
                </div>
              ))}
            </div>
          </EwStepShell>

          {/* STEP 2 — checkout */}
          <EwStepShell show={step === 2}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-500,#64748B)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Order summary</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.4px', color: 'var(--gray-950,#0F172A)', marginTop: 6 }}>Review &amp; checkout</div>
            <div style={{ marginTop: 16, background: '#fff', border: '1px solid var(--gray-200,#E2E8F0)', borderRadius: 12, padding: 14 }}>
              {[
                { icon: 'bike', label: 'Velotric Nomad 1+', val: '$1,299' },
                { icon: 'shield', label: '2 yr protection plan', val: '$69', accent: true },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 0', borderBottom: i === 0 ? '1px solid var(--gray-100,#F1F5F9)' : 'none' }}>
                  <span style={{ width: 32, height: 32, borderRadius: 8, background: r.accent ? 'var(--color-primary-soft,#EEF0FE)' : 'var(--gray-100,#F1F5F9)', color: r.accent ? 'var(--blue-700,#1B2BC4)' : 'var(--gray-600,#475569)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {r.icon === 'bike'
                      ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17 9 9h6l3 8M9 9h6"/></svg>
                      : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>}
                  </span>
                  <span style={{ flex: 1, fontSize: 12.5, fontWeight: r.accent ? 700 : 500, color: r.accent ? 'var(--blue-700,#1B2BC4)' : 'var(--gray-800,#1E293B)' }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-950,#0F172A)' }}>{r.val}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 10, background: 'var(--green-50,#F0FDF4)', border: '1px solid var(--green-200,#BBF7D0)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green-700,#166534)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              <span style={{ fontSize: 11.5, color: 'var(--green-800,#15803D)', fontWeight: 600 }}>Covered from day one · cancel anytime</span>
            </div>
            <button style={{ marginTop: 14, padding: '12px 14px', borderRadius: 10, background: 'var(--blue-500,#2437F6)', color: '#fff', fontSize: 13.5, fontWeight: 600, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 6px 16px -4px rgba(36,55,246,0.5)' }}>
              Confirm &amp; pay $1,368
            </button>
          </EwStepShell>

          {/* STEP 3 — coverage active */}
          <EwStepShell show={step === 3}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-500,#64748B)', letterSpacing: 1.2, textTransform: 'uppercase' }}>You're covered</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.4px', color: 'var(--gray-950,#0F172A)', marginTop: 6 }}>Protection plan active</div>
            <div style={{ marginTop: 16, padding: 16, borderRadius: 14, background: 'linear-gradient(135deg,#1A23A8 0%,#2437F6 60%,#4A5BFE 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, background: 'radial-gradient(closest-side,rgba(255,255,255,0.18),transparent 70%)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: 1.2 }}>Extended warranty</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, marginTop: 6 }}>Velotric Nomad 1+</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: 999 }}>2-YR</span>
              </div>
              <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>Covered until</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 2 }}>Apr 8, 2028</div>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: 6, background: '#fff', padding: 3, display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gridTemplateRows: 'repeat(6,1fr)', gap: 1.5 }}>
                  {Array.from({ length: 36 }).map((_, i) => {
                    const r = Math.floor(i/6), c = i%6;
                    const on = (r*3+c*5+i)%3===0 || (r===0||c===0||r===5||c===5);
                    return <div key={i} style={{ background: on ? '#0F1FB8' : 'transparent' }} />;
                  })}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: 'doc',    label: 'View coverage & terms',  sub: 'Plan details, what\'s covered' },
                { icon: 'wrench', label: 'File a claim anytime',   sub: 'Repairs & replacements' },
                { icon: 'refresh',label: 'Renew before it expires', sub: 'One-tap renewal reminders' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', background: '#fff', border: '1px solid var(--gray-200,#E2E8F0)', borderRadius: 10 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--color-primary-soft,#EEF0FE)', color: 'var(--blue-700,#1B2BC4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {a.icon === 'doc' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>}
                    {a.icon === 'wrench' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18l3 3 6.4-6.3a4 4 0 0 0 5.3-5.4l-2.5 2.5-2.3-2.3z"/></svg>}
                    {a.icon === 'refresh' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--gray-900,#0F172A)' }}>{a.label}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--gray-500,#64748B)', marginTop: 1 }}>{a.sub}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400,#94A3B8)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              ))}
            </div>
          </EwStepShell>
          </div>

          {/* step dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '12px 0 18px', flexShrink: 0 }}>
            {[1,2,3].map((i)=>(
              <span key={i} style={{ width: step === i ? 22 : 6, height: 6, borderRadius: 999, background: step === i ? 'var(--blue-500,#2437F6)' : 'var(--gray-300,#CBD5E1)', transition: 'all 280ms cubic-bezier(.22,1,.36,1)' }} />
            ))}
          </div>
        </EwPhoneFrame>
      </div>

      {/* Floating chips */}
      <div className="pr-float-chip pr-float-chip--left" style={{ position: 'absolute', left: -10, top: 80, background: '#fff', border: '1px solid var(--color-border,#E2E8F0)', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg,0 12px 40px rgba(15,23,42,0.06))', fontSize: 12, animation: 'ew-floaty 6s ease-in-out infinite', zIndex: 2 }}>
        <span style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--color-primary-soft,#EEF0FE)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-700,#1B2BC4)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 10.5, color: 'var(--gray-500,#64748B)' }}>Plan attached</div>
          <div style={{ fontSize: 12, color: 'var(--gray-800,#1E293B)', fontWeight: 600 }}>2-yr · $69</div>
        </div>
      </div>
      <div className="pr-float-chip pr-float-chip--right" style={{ position: 'absolute', right: -14, bottom: 120, background: '#fff', border: '1px solid var(--color-border,#E2E8F0)', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg,0 12px 40px rgba(15,23,42,0.06))', fontSize: 12, animation: 'ew-floaty 5.4s ease-in-out infinite reverse', zIndex: 2 }}>
        <span style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--green-100,#DCFCE7)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-700,#166534)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 10.5, color: 'var(--gray-500,#64748B)' }}>Coverage</div>
          <div style={{ fontSize: 12, color: 'var(--gray-800,#1E293B)', fontWeight: 600 }}>Active · 2 yrs</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ FEATURE 1 — Multi-touchpoint offers ═══════════════
   The same protection-plan offer surfaces across 3 placements on a loop. */
function EwFeatureOffers() {
  const [, force] = ewmUS(0);
  ewmUE(() => {
    const t = setInterval(() => force((n) => n + 1), 500);
    return () => clearInterval(t);
  }, []);
  const idx = Math.floor(Date.now() / 2200) % 3;

  const touchpoints = [
    { key: 'pdp',     label: 'Product page',  caption: 'Offered alongside the product' },
    { key: 'checkout',label: 'Checkout',      caption: 'One tap to add at purchase' },
    { key: 'post',    label: 'Post-purchase', caption: 'Email + portal after the sale' },
  ];

  return (
    <div style={{ ...EW_CARD_BASE, width: '100%', maxWidth: 460, padding: 0 }}>
      <div style={{ padding: '14px 18px 12px', borderBottom: '1px solid var(--color-border,#E2E8F0)' }}>
        <div style={{ fontSize: 11, color: 'var(--gray-500,#64748B)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Plan placement</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, color: 'var(--gray-950,#0F172A)', marginTop: 2, letterSpacing: '-0.3px' }}>One offer, every buying moment</div>
      </div>

      {/* touchpoint switcher */}
      <div style={{ display: 'flex', gap: 6, padding: '12px 16px 6px' }}>
        {touchpoints.map((t, i) => (
          <div key={t.key} style={{
            flex: 1, textAlign: 'center', padding: '7px 4px', borderRadius: 8,
            fontSize: 11, fontWeight: 600,
            background: i === idx ? 'var(--blue-500,#2437F6)' : 'var(--gray-100,#F1F5F9)',
            color: i === idx ? '#fff' : 'var(--gray-500,#64748B)',
            transition: 'all 300ms cubic-bezier(.22,1,.36,1)',
          }}>{t.label}</div>
        ))}
      </div>

      {/* stage */}
      <div style={{ position: 'relative', minHeight: 250, padding: '10px 16px 16px', background: 'var(--color-surface-subtle,#F8FAFC)' }}>
        {/* PDP */}
        <EwOfferStage show={idx === 0}>
          <div style={{ background: '#fff', border: '1px solid var(--gray-200,#E2E8F0)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 84, background: 'linear-gradient(135deg,#EEF0FE,#DBEAFE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--blue-700,#1D4ED8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.75"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17 9 9h6l3 8M9 9h6"/></svg>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--gray-950,#0F172A)' }}>Velotric Nomad 1+</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500,#64748B)', marginTop: 1 }}>$1,299</div>
              <div className="ew-pop" style={{ marginTop: 12, padding: 11, borderRadius: 10, background: 'var(--color-primary-soft,#EEF0FE)', border: '1px solid var(--blue-200,#C7CDFD)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--blue-500,#2437F6)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue-700,#1B2BC4)' }}>Add 2-yr protection</div>
                  <div style={{ fontSize: 10.5, color: 'var(--blue-600,#1D4ED8)' }}>+$69 · accidental + mechanical</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'var(--blue-500,#2437F6)', padding: '5px 10px', borderRadius: 7 }}>Add</span>
              </div>
            </div>
          </div>
        </EwOfferStage>
        {/* Checkout */}
        <EwOfferStage show={idx === 1}>
          <div style={{ background: '#fff', border: '1px solid var(--gray-200,#E2E8F0)', borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400,#94A3B8)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Your cart</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--gray-100,#F1F5F9)' }}>
              <span style={{ width: 30, height: 30, borderRadius: 7, background: 'var(--gray-100,#F1F5F9)', color: 'var(--gray-600,#475569)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17 9 9h6l3 8"/></svg>
              </span>
              <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: 'var(--gray-800,#1E293B)' }}>Velotric Nomad 1+</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--gray-950,#0F172A)' }}>$1,299</span>
            </div>
            <div className="ew-pop" style={{ marginTop: 12, padding: 11, borderRadius: 10, background: 'var(--color-primary-soft,#EEF0FE)', border: '1px solid var(--blue-200,#C7CDFD)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: 'var(--blue-500,#2437F6)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </span>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: 'var(--blue-700,#1B2BC4)' }}>2-yr protection added</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--gray-950,#0F172A)' }}>$69</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--gray-100,#F1F5F9)' }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--gray-500,#64748B)' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: 'var(--gray-950,#0F172A)' }}>$1,368</span>
            </div>
          </div>
        </EwOfferStage>
        {/* Post-purchase */}
        <EwOfferStage show={idx === 2}>
          <div style={{ background: '#fff', border: '1px solid var(--gray-200,#E2E8F0)', borderRadius: 12, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 11, borderBottom: '1px solid var(--gray-100,#F1F5F9)' }}>
              <span style={{ width: 30, height: 30, borderRadius: 7, background: 'var(--orange-100,#FFEDD5)', color: 'var(--orange-600,#EA580C)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
              </span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-950,#0F172A)' }}>Still want extra cover?</div>
                <div style={{ fontSize: 10.5, color: 'var(--gray-500,#64748B)' }}>Sent 7 days after delivery</div>
              </div>
            </div>
            <div className="ew-pop" style={{ marginTop: 11, padding: 11, borderRadius: 10, background: 'var(--color-primary-soft,#EEF0FE)', border: '1px solid var(--blue-200,#C7CDFD)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue-700,#1B2BC4)' }}>Add protection now</div>
                <div style={{ fontSize: 10.5, color: 'var(--blue-600,#1D4ED8)' }}>Eligible for 30 days post-purchase</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'var(--blue-500,#2437F6)', padding: '6px 11px', borderRadius: 7 }}>$69 ›</span>
            </div>
          </div>
        </EwOfferStage>

        {/* caption */}
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11.5, color: 'var(--gray-500,#64748B)', fontWeight: 500 }}>
          {touchpoints[idx].caption}
        </div>
      </div>
    </div>
  );
}
function EwOfferStage({ show, children }) {
  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, top: 10,
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(10px)',
      transition: 'opacity 360ms ease, transform 460ms cubic-bezier(.22,1,.36,1)',
      pointerEvents: show ? 'auto' : 'none',
    }}>{children}</div>
  );
}

/* ═══════════════ FEATURE 2 — Coverage & renewal portal ═══════════════ */
function EwFeatureCoverage() {
  const [, force] = ewmUS(0);
  ewmUE(() => {
    const t = setInterval(() => force((n) => n + 1), 500);
    return () => clearInterval(t);
  }, []);
  // 0..1 = view coverage; 2..3 = renewal CTA highlighted + renewed
  const phase = Math.floor(Date.now() / 1500) % 4;
  const renewing = phase >= 2;
  const renewed = phase === 3;

  return (
    <div style={{ ...EW_CARD_BASE, width: '100%', maxWidth: 440, padding: 0 }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border,#E2E8F0)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--gray-500,#64748B)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>My coverage</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, color: 'var(--gray-950,#0F172A)', marginTop: 2, letterSpacing: '-0.3px' }}>Self-serve plan portal</div>
        </div>
        <EwAvatar initials="SC" tone="#EC4899" size={32} />
      </div>

      <div style={{ padding: 16, background: 'var(--color-surface-subtle,#F8FAFC)' }}>
        {/* coverage card */}
        <div style={{ background: '#fff', border: '1px solid var(--gray-200,#E2E8F0)', borderRadius: 12, padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span style={{ width: 38, height: 38, borderRadius: 9, background: 'linear-gradient(135deg,#EEF0FE,#DBEAFE)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-700,#1D4ED8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17 9 9h6l3 8"/></svg>
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-950,#0F172A)' }}>Velotric Nomad 1+</div>
              <div style={{ fontSize: 11, color: 'var(--gray-500,#64748B)', marginTop: 1 }}>2-yr plan · SN VLT-78423-9F</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: renewed ? 'var(--green-700,#166534)' : 'var(--yellow-800,#92400E)', background: renewed ? 'var(--green-100,#DCFCE7)' : 'var(--yellow-100,#FEF3C7)', padding: '3px 8px', borderRadius: 999, transition: 'all 300ms' }}>
              {renewed ? 'Renewed' : 'Active'}
            </span>
          </div>

          {/* coverage progress bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--gray-500,#64748B)', marginBottom: 5 }}>
              <span>Coverage used</span>
              <span style={{ fontWeight: 600, color: 'var(--gray-700,#334155)' }}>{renewed ? '7 of 36 months' : '7 of 24 months'}</span>
            </div>
            <div style={{ height: 7, background: 'var(--gray-100,#F1F5F9)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: renewed ? '19%' : '29%', background: 'linear-gradient(90deg,var(--blue-500,#2437F6),#4A5BFE)', borderRadius: 999, transition: 'width 500ms cubic-bezier(.22,1,.36,1)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--gray-400,#94A3B8)', marginTop: 5 }}>
              <span>Started Apr 2026</span>
              <span>Until {renewed ? 'Apr 2029' : 'Apr 2028'}</span>
            </div>
          </div>
        </div>

        {/* renewal CTA */}
        <div className={renewing && !renewed ? 'ew-pulse' : ''} style={{
          marginTop: 12, padding: 12, borderRadius: 12,
          background: renewed ? 'var(--green-50,#F0FDF4)' : 'var(--color-primary-soft,#EEF0FE)',
          border: `1px solid ${renewed ? 'var(--green-200,#BBF7D0)' : 'var(--blue-200,#C7CDFD)'}`,
          display: 'flex', alignItems: 'center', gap: 11,
          transition: 'all 300ms',
        }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: renewed ? 'var(--green-500,#22C55E)' : 'var(--blue-500,#2437F6)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 300ms' }}>
            {renewed
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: renewed ? 'var(--green-800,#15803D)' : 'var(--blue-700,#1B2BC4)' }}>
              {renewed ? 'Coverage extended to 3 years' : 'Extend coverage +1 year'}
            </div>
            <div style={{ fontSize: 10.5, color: renewed ? 'var(--green-700,#166534)' : 'var(--blue-600,#1D4ED8)', marginTop: 1 }}>
              {renewed ? 'Renewal confirmed · +$39 revenue' : 'Renew now for $39 · expiry reminder sent'}
            </div>
          </div>
          {!renewed && <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'var(--blue-500,#2437F6)', padding: '6px 11px', borderRadius: 7 }}>Renew</span>}
        </div>

        {/* quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 12 }}>
          {[
            { icon: 'doc', label: 'Manual' },
            { icon: 'wrench', label: 'File claim' },
            { icon: 'help', label: 'Support' },
          ].map((a, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid var(--gray-200,#E2E8F0)', borderRadius: 10, padding: '11px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--gray-600,#475569)' }}>
                {a.icon === 'doc' && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>}
                {a.icon === 'wrench' && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18l3 3 6.4-6.3a4 4 0 0 0 5.3-5.4l-2.5 2.5-2.3-2.3z"/></svg>}
                {a.icon === 'help' && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg>}
              </span>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--gray-700,#334155)' }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ FEATURE 3 — Revenue analytics ═══════════════ */
function EwFeatureRevenue() {
  const bars = [30, 38, 42, 50, 47, 58, 63, 60, 72, 78, 75, 88];
  const labels = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  return (
    <div style={{ ...EW_CARD_BASE, width: '100%', maxWidth: 480, padding: 0 }}>
      <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--color-border,#E2E8F0)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--gray-500,#64748B)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Extended warranty revenue · YTD</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 26, fontWeight: 700, color: 'var(--gray-950,#0F172A)', letterSpacing: '-0.6px' }}>$284,610</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green-700,#166534)', background: 'var(--green-100,#DCFCE7)', padding: '2px 8px', borderRadius: 999 }}>↑ 42%</span>
          </div>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--green-700,#166534)', background: 'var(--green-100,#DCFCE7)', padding: '4px 9px', borderRadius: 999 }}>100% in-house</span>
      </div>

      {/* bars */}
      <div style={{ padding: '16px 20px 4px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', alignItems: 'flex-end', gap: 6, height: 104 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              height: `${h}%`, borderRadius: '4px 4px 0 0',
              background: i === bars.length - 1 ? 'linear-gradient(180deg, var(--blue-500,#2437F6), #4A5BFE)' : 'linear-gradient(180deg, rgba(36,55,246,0.5), rgba(36,55,246,0.2))',
              animation: 'ew-bar-grow 0.7s cubic-bezier(.22,1,.36,1) both',
              animationDelay: `${i * 0.06}s`, transformOrigin: 'bottom',
            }} />
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 6, marginTop: 6, fontSize: 9.5, color: 'var(--gray-400,#94A3B8)', fontWeight: 500, textAlign: 'center' }}>
          {labels.map((l, i) => <span key={i}>{l}</span>)}
        </div>
      </div>

      {/* KPI tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, padding: '14px 20px 18px' }}>
        {[
          { label: 'Attach rate', value: '32%', delta: '↑ 3×', up: true },
          { label: 'Plans sold', value: '4,128', delta: '↑ 18%', up: true },
          { label: 'Renewals', value: '71%', delta: '↑ 6%', up: true },
        ].map((k, i) => (
          <div key={i} style={{ background: 'var(--color-surface-subtle,#F8FAFC)', border: '1px solid var(--gray-200,#E2E8F0)', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--gray-400,#94A3B8)', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: 'var(--gray-950,#0F172A)', marginTop: 3 }}>{k.value}</div>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--green-700,#166534)', marginTop: 1 }}>{k.delta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { EwHeroMock, EwFeatureOffers, EwFeatureCoverage, EwFeatureRevenue });

/* Scoped animations */
(function injectEwMockStyles(){
  if (document.getElementById('ew-mock-styles')) return;
  const s = document.createElement('style');
  s.id = 'ew-mock-styles';
  s.textContent = `
    @keyframes ew-floaty { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-8px);} }
    @keyframes ew-pop { 0% { transform: scale(0.96); opacity: 0;} 60% { transform: scale(1.02);} 100% { transform: scale(1); opacity: 1;} }
    .ew-pop { animation: ew-pop 0.5s cubic-bezier(.22,1,.36,1) both; }
    @keyframes ew-bar-grow { 0% { transform: scaleY(0);} 100% { transform: scaleY(1);} }
    @keyframes ew-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(36,55,246,0); } 50% { box-shadow: 0 0 0 4px rgba(36,55,246,0.14);} }
    .ew-pulse { animation: ew-pulse 1.4s ease-in-out infinite; }
  `;
  document.head.appendChild(s);
})();
