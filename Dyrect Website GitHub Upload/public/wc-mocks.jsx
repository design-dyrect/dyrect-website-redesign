/* global React */
/* Visual mocks for the Warranty Claims Management page.
   - WcHeroMock: a 3-step animated claims flow (Raise → Validate & route → Resolve)
   - WcFeatureWorkflow: a claim card auto-advancing across a Kanban (smart routing)
   - WcFeatureValidate: eligibility checks ticking in + service timeline advancing
   - WcFeatureAnalytics: claim-volume bars growing + defect trend bars filling
   All animations loop continuously so they read as "live". */
const { useEffect: wcmUE, useState: wcmUS } = React;

const WC_CARD_BASE = {
  background: 'var(--color-surface, #fff)',
  border: '1px solid var(--color-border, #E2E8F0)',
  borderRadius: 16,
  boxShadow: 'var(--shadow-xl, 0 24px 60px rgba(15,23,42,0.10))',
  overflow: 'hidden',
};

const STATUS_TONES = {
  'New':         { bg: 'var(--info-blue-100,#DBEAFE)', fg: 'var(--info-blue-700,#1D4ED8)', dot: 'var(--info-blue-500,#3B82F6)' },
  'Validating':  { bg: 'var(--yellow-100,#FEF3C7)',    fg: 'var(--yellow-800,#92400E)',    dot: 'var(--yellow-500,#F59E0B)' },
  'In review':   { bg: 'var(--yellow-100,#FEF3C7)',    fg: 'var(--yellow-800,#92400E)',    dot: 'var(--yellow-500,#F59E0B)' },
  'Repair':      { bg: '#EDE9FE',                       fg: '#5B21B6',                       dot: '#7C3AED' },
  'Replacement': { bg: '#FFE4E6',                       fg: '#9F1239',                       dot: '#F43F5E' },
  'Routed':      { bg: 'var(--blue-100,#DBEAFE)',       fg: 'var(--blue-700,#1D4ED8)',       dot: 'var(--blue-500,#2437F6)' },
  'Resolved':    { bg: 'var(--green-100,#DCFCE7)',      fg: 'var(--green-700,#166534)',      dot: 'var(--green-500,#22C55E)' },
};

function StatusPill({ label, size = 'md' }) {
  const t = STATUS_TONES[label] || STATUS_TONES['New'];
  const pad = size === 'sm' ? '2px 7px' : '3px 9px';
  const fs = size === 'sm' ? 10 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: pad, borderRadius: 999,
      background: t.bg, color: t.fg,
      fontSize: fs, fontWeight: 600, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 999, background: t.dot }} />
      {label}
    </span>
  );
}

function Avatar({ initials, tone = '#2437F6', size = 28 }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: 999,
      background: tone + '22', color: tone,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: Math.round(size * 0.4), fontWeight: 700, flexShrink: 0,
    }}>{initials}</span>
  );
}

/* Desktop window chrome wrapper */
function WcDesktopWindow({ title, children, width, minHeight = 420 }) {
  return (
    <div style={{
      ...WC_CARD_BASE,
      width: '100%', maxWidth: width || 520, minHeight,
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-sans, "IBM Plex Sans", sans-serif)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px',
        borderBottom: '1px solid var(--color-border, #E2E8F0)',
        background: 'var(--color-surface-subtle, #F8FAFC)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: '#FF5F57' }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: '#FEBC2E' }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: '#28C840' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 11.5, fontWeight: 500, color: 'var(--color-text-secondary,#64748B)' }}>{title}</div>
        <div style={{ width: 38 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

/* ═══════════════ HERO — 3-step claims flow ═══════════════
   Step 1 Raise · Step 2 Validate & route · Step 3 Resolve.
   Cross-fades every 3.2s with a step indicator + floating chips. */
function WcHeroMock() {
  // Derive the step from wall-clock time so it always advances, even if the
  // component is briefly re-mounted by a parent re-render (which would reset
  // a plain useState counter back to 1). A lightweight ticker forces re-render.
  const [, force] = wcmUS(0);
  wcmUE(() => {
    const t = setInterval(() => force((n) => n + 1), 500);
    return () => clearInterval(t);
  }, []);
  const step = (Math.floor(Date.now() / 3200) % 3) + 1;

  return (
    <div className="wc-hero-mock-wrap" style={{ position: 'relative', width: '100%', maxWidth: 540, margin: '0 auto' }}>
      <div aria-hidden style={{
        position: 'absolute', inset: '-30px',
        background: 'radial-gradient(closest-side, rgba(36,55,246,0.16), transparent 70%)',
        filter: 'blur(28px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <WcDesktopWindow title="Dyrect — Claims workspace" width={500} minHeight={476}>
          {/* Step rail header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 0,
            padding: '14px 18px 12px', borderBottom: '1px solid var(--color-border,#E2E8F0)',
            background: 'var(--color-surface,#fff)',
          }}>
            {[
              { n: 1, label: 'Raise' },
              { n: 2, label: 'Validate & route' },
              { n: 3, label: 'Resolve' },
            ].map((s, i) => {
              const done = step > s.n, current = step === s.n;
              return (
                <React.Fragment key={s.n}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 999,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700,
                      background: current ? 'var(--blue-500,#2437F6)' : done ? 'var(--green-500,#22C55E)' : 'var(--gray-100,#F1F5F9)',
                      color: (current || done) ? '#fff' : 'var(--gray-400,#94A3B8)',
                      boxShadow: current ? '0 0 0 4px rgba(36,55,246,0.14)' : 'none',
                      transition: 'all 300ms cubic-bezier(.22,1,.36,1)',
                    }}>
                      {done
                        ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        : s.n}
                    </span>
                    <span style={{
                      fontSize: 11.5, fontWeight: 600,
                      color: current ? 'var(--blue-600,#1B2BC4)' : 'var(--gray-400,#94A3B8)',
                      transition: 'color 300ms',
                    }}>{s.label}</span>
                  </div>
                  {i < 2 && <div style={{ flex: 1, height: 2, margin: '0 8px', background: step > s.n ? 'var(--green-300,#86EFAC)' : 'var(--gray-200,#E2E8F0)', borderRadius: 2, transition: 'background 300ms' }} />}
                </React.Fragment>
              );
            })}
          </div>

          {/* Slot */}
          <div style={{ flex: 1, position: 'relative', background: 'var(--color-surface-subtle,#F8FAFC)' }}>

            {/* STEP 1 — Raise */}
            <WcStepShell show={step === 1}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: 'var(--gray-950,#0F172A)', letterSpacing: '-0.3px' }}>New warranty claim</div>
                <StatusPill label="New" />
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--color-border,#E2E8F0)', borderRadius: 12, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, paddingBottom: 12, borderBottom: '1px solid var(--gray-100,#F1F5F9)' }}>
                  <Avatar initials="SC" tone="#EC4899" size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-950,#0F172A)' }}>Sarah Chen</div>
                    <div style={{ fontSize: 11.5, color: 'var(--gray-500,#64748B)', marginTop: 1 }}>sarah@example.com · #DYR-2826</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, paddingTop: 12 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: 'linear-gradient(135deg,#EEF0FE,#DBEAFE)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--blue-700,#1D4ED8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17 9 9h6l3 8M9 9h6"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-950,#0F172A)' }}>Velotric Nomad 1+</div>
                    <div style={{ fontSize: 11.5, color: 'var(--gray-500,#64748B)', marginTop: 2 }}>Reported issue</div>
                    <div style={{ fontSize: 12.5, color: 'var(--gray-700,#334155)', marginTop: 3, fontWeight: 500 }}>"Battery won't hold a charge past 20%."</div>
                  </div>
                </div>
                {/* attachment */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '8px 10px', background: 'var(--gray-50,#F8FAFC)', borderRadius: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gray-500,#64748B)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21"/></svg>
                  <span style={{ fontSize: 11.5, color: 'var(--gray-600,#475569)', fontWeight: 500 }}>battery-photo.jpg</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10.5, color: 'var(--gray-400,#94A3B8)' }}>1.2 MB</span>
                </div>
              </div>
            </WcStepShell>

            {/* STEP 2 — Validate & route */}
            <WcStepShell show={step === 2}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: 'var(--gray-950,#0F172A)', letterSpacing: '-0.3px' }}>Validating eligibility</div>
                <StatusPill label="Validating" />
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--color-border,#E2E8F0)', borderRadius: 12, padding: 14 }}>
                {[
                  { label: 'Serial number', value: 'VLT-78423-9F' },
                  { label: 'Proof of purchase', value: 'Receipt verified' },
                  { label: 'Coverage', value: '17m of 24m left' },
                  { label: 'Issue category', value: 'Battery · covered' },
                ].map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 0',
                    borderBottom: i < 3 ? '1px solid var(--gray-100,#F1F5F9)' : 'none',
                  }}>
                    <span className="wc-check-pop" style={{
                      width: 20, height: 20, borderRadius: 999, background: 'var(--green-100,#DCFCE7)', color: 'var(--green-700,#166534)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      animationDelay: `${i * 0.35}s`,
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--gray-500,#64748B)', flex: 1 }}>{c.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-900,#0F172A)' }}>{c.value}</span>
                  </div>
                ))}
              </div>
              {/* routed */}
              <div className="wc-route-in" style={{
                display: 'flex', alignItems: 'center', gap: 11, marginTop: 12,
                padding: 12, borderRadius: 12, background: 'var(--color-primary-soft,#EEF0FE)',
                border: '1px solid var(--blue-200,#C7CDFD)',
              }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--blue-500,#2437F6)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h6"/></svg>
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--blue-700,#1B2BC4)' }}>Auto-routed → Repair team · L1</div>
                  <div style={{ fontSize: 11, color: 'var(--blue-600,#1D4ED8)', opacity: 0.85, marginTop: 1 }}>Matched by issue type · battery</div>
                </div>
                <span style={{ fontSize: 10.5, color: 'var(--blue-600,#1D4ED8)', fontWeight: 600 }}>0.4s</span>
              </div>
            </WcStepShell>

            {/* STEP 3 — Resolve */}
            <WcStepShell show={step === 3}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: 'var(--gray-950,#0F172A)', letterSpacing: '-0.3px' }}>Claim resolved</div>
                <StatusPill label="Resolved" />
              </div>
              {/* resolution card */}
              <div style={{
                background: 'linear-gradient(135deg,#0F1FB8 0%,#2437F6 60%,#4A5BFE 100%)',
                borderRadius: 12, padding: 16, color: '#fff', position: 'relative', overflow: 'hidden',
              }}>
                <div aria-hidden style={{ position: 'absolute', right: -28, top: -28, width: 110, height: 110, background: 'radial-gradient(closest-side,rgba(255,255,255,0.18),transparent 70%)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(255,255,255,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>Battery module replaced</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 1 }}>Shipped · tracking DYR-RPL-118</div>
                  </div>
                </div>
              </div>
              {/* CSAT + TAT */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                <div style={{ background: '#fff', border: '1px solid var(--color-border,#E2E8F0)', borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 10.5, color: 'var(--gray-400,#94A3B8)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Resolution time</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700, color: 'var(--gray-950,#0F172A)', marginTop: 3 }}>1.8 days</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid var(--color-border,#E2E8F0)', borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 10.5, color: 'var(--gray-400,#94A3B8)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Customer CSAT</div>
                  <div style={{ display: 'flex', gap: 2, marginTop: 6, color: 'var(--yellow-500,#F59E0B)' }}>
                    {[0,1,2,3,4].map((s)=>(<svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>))}
                  </div>
                </div>
              </div>
            </WcStepShell>
          </div>

          {/* Step dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '12px 0 14px', background: 'var(--color-surface,#fff)', borderTop: '1px solid var(--color-border,#E2E8F0)' }}>
            {[1,2,3].map((i)=>(
              <span key={i} style={{
                width: step === i ? 22 : 6, height: 6, borderRadius: 999,
                background: step === i ? 'var(--blue-500,#2437F6)' : 'var(--gray-300,#CBD5E1)',
                transition: 'all 280ms cubic-bezier(.22,1,.36,1)',
              }} />
            ))}
          </div>
        </WcDesktopWindow>
      </div>

      {/* Floating chips */}
      <div className="wc-float-chip wc-float-chip--left" style={{
        position: 'absolute', left: -16, top: 96,
        background: '#fff', border: '1px solid var(--color-border,#E2E8F0)', borderRadius: 10, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg,0 12px 40px rgba(15,23,42,0.06))', fontSize: 12,
        animation: 'wc-floaty 6s ease-in-out infinite', zIndex: 2,
      }}>
        <span style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--green-100,#DCFCE7)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-700,#166534)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 10.5, color: 'var(--gray-500,#64748B)' }}>Auto-routed</div>
          <div style={{ fontSize: 12, color: 'var(--gray-800,#1E293B)', fontWeight: 600 }}>by issue type · 0.4s</div>
        </div>
      </div>
      <div className="wc-float-chip wc-float-chip--right" style={{
        position: 'absolute', right: -14, bottom: 78,
        background: '#fff', border: '1px solid var(--color-border,#E2E8F0)', borderRadius: 10, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg,0 12px 40px rgba(15,23,42,0.06))', fontSize: 12,
        animation: 'wc-floaty 5.4s ease-in-out infinite reverse', zIndex: 2,
      }}>
        <span style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--color-primary-soft,#EEF0FE)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-700,#1B2BC4)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 2"/><circle cx="12" cy="12" r="10"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 10.5, color: 'var(--gray-500,#64748B)' }}>Resolution time</div>
          <div style={{ fontSize: 12, color: 'var(--gray-800,#1E293B)', fontWeight: 600 }}>2.4 days · ↓ 28%</div>
        </div>
      </div>
    </div>
  );
}

/* Step shell — cross-fade + slide, mirrors the PR hero */
function WcStepShell({ show, children }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, padding: '18px 18px',
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(-6px)',
      transition: 'opacity 400ms ease, transform 500ms cubic-bezier(.22,1,.36,1)',
      pointerEvents: show ? 'auto' : 'none',
    }}>{children}</div>
  );
}

/* ═══════════════ FEATURE 1 — Workflow: claim auto-advances across Kanban ═══════════════ */
function WcFeatureWorkflow() {
  const [phase, setPhase] = wcmUS(0); // 0 New → 1 In review → 2 Resolved
  wcmUE(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 3), 1600);
    return () => clearInterval(t);
  }, []);

  const columns = [
    { title: 'New', tone: 'New', base: [{ name: 'A. Patel', product: 'Burton binding', tone: '#F59E0B' }] },
    { title: 'In review', tone: 'In review', base: [{ name: 'M. Reid', product: 'JCB drill set', tone: '#22C55E' }] },
    { title: 'Resolved', tone: 'Resolved', base: [{ name: 'L. Bernard', product: "Neeman's Re-Live", tone: '#F59E0B' }] },
  ];
  // The travelling claim
  const hero = { name: 'K. Yamada', product: 'Aircon split unit', routed: ['L1 support', 'Repair team', 'Closed · CSAT 5'], tone: '#EC4899' };

  return (
    <div style={{ ...WC_CARD_BASE, width: '100%', maxWidth: 480, padding: 0 }}>
      <div style={{ padding: '14px 18px 12px', borderBottom: '1px solid var(--color-border,#E2E8F0)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--gray-500,#64748B)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Ticket workflow</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, color: 'var(--gray-950,#0F172A)', marginTop: 2, letterSpacing: '-0.3px' }}>Smart routing → assigned in seconds</div>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: 'var(--green-700,#166534)' }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--green-500,#22C55E)' }} />Live
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: 12, background: 'var(--color-surface-subtle,#F8FAFC)' }}>
        {columns.map((c, ci) => {
          const heroHere = phase === ci;
          const baseCount = c.base.length + (ci < phase ? 0 : 0);
          const count = ci === 0 ? 12 : ci === 1 ? 8 : 64;
          return (
            <div key={ci} style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--color-border,#E2E8F0)', padding: 10, minHeight: 230 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--gray-950,#0F172A)' }}>{c.title}</span>
                <span style={{ fontSize: 10, color: 'var(--gray-500,#64748B)', background: 'var(--gray-100,#F1F5F9)', padding: '1px 6px', borderRadius: 999, fontWeight: 600 }}>{count + (heroHere ? 1 : 0)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* travelling hero card */}
                {heroHere && (
                  <div key={`hero-${phase}`} className="wc-kanban-pop" style={{
                    padding: 9, borderRadius: 8,
                    background: 'var(--color-primary-soft,#EEF0FE)',
                    border: '1px solid var(--blue-200,#C7CDFD)', fontSize: 10.5,
                    boxShadow: '0 6px 16px -6px rgba(36,55,246,0.4)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Avatar initials="KY" tone={hero.tone} size={18} />
                      <span style={{ fontWeight: 700, color: 'var(--gray-950,#0F172A)', fontSize: 11 }}>{hero.name}</span>
                    </div>
                    <div style={{ color: 'var(--gray-600,#475569)', fontWeight: 500 }}>{hero.product}</div>
                    <div style={{ color: 'var(--blue-600,#1D4ED8)', marginTop: 3, fontSize: 10, fontWeight: 600 }}>→ {hero.routed[ci]}</div>
                  </div>
                )}
                {c.base.map((it, j) => (
                  <div key={j} style={{ padding: 9, borderRadius: 8, background: '#fff', border: '1px solid var(--color-border,#E2E8F0)', fontSize: 10.5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Avatar initials={it.name.split(' ').map(p=>p[0]).join('')} tone={it.tone} size={18} />
                      <span style={{ fontWeight: 600, color: 'var(--gray-950,#0F172A)', fontSize: 11 }}>{it.name}</span>
                    </div>
                    <div style={{ color: 'var(--gray-600,#475569)', fontWeight: 500 }}>{it.product}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: '10px 18px', borderTop: '1px solid var(--color-border,#E2E8F0)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--gray-600,#475569)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h6"/></svg>
          Auto-routed by issue type · 3 teams
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-950,#0F172A)' }}>4.2k tickets / mo</span>
      </div>
    </div>
  );
}

/* ═══════════════ FEATURE 2 — Validate: checks tick in + timeline advances ═══════════════ */
function WcFeatureValidate() {
  const TOTAL = 4;
  const [revealed, setRevealed] = wcmUS(0);
  const [tl, setTl] = wcmUS(0);
  wcmUE(() => {
    const t = setInterval(() => {
      setRevealed((r) => {
        if (r < TOTAL) return r + 1;
        return r;
      });
    }, 700);
    return () => clearInterval(t);
  }, []);
  wcmUE(() => {
    // once all checks revealed, advance timeline; then reset the whole loop
    if (revealed >= TOTAL) {
      const a = setTimeout(() => setTl(3), 500);
      const b = setTimeout(() => { setRevealed(0); setTl(0); }, 2600);
      return () => { clearTimeout(a); clearTimeout(b); };
    } else {
      setTl(Math.min(revealed, 2));
    }
  }, [revealed]);

  const checks = [
    { label: 'Serial number', value: 'VLT-78423-9F' },
    { label: 'Proof of purchase', value: 'Receipt.pdf' },
    { label: 'Coverage', value: '17m of 24m left' },
    { label: 'Issue category', value: 'Battery · covered' },
  ];
  const timeline = [
    { label: 'Claim submitted', by: 'Customer' },
    { label: 'Eligibility verified', by: 'System' },
    { label: 'Routed to L1 support', by: 'Auto-routed' },
    { label: 'Repair scheduled', by: 'Repair team' },
  ];

  return (
    <div style={{ ...WC_CARD_BASE, width: '100%', maxWidth: 460, padding: 0 }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border,#E2E8F0)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--gray-500,#64748B)', fontWeight: 600, letterSpacing: 0.3 }}>#DYR-2826 · 12m ago</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: 'var(--gray-950,#0F172A)', marginTop: 2, letterSpacing: '-0.3px' }}>Battery not charging · Velotric Nomad 1+</div>
        </div>
        <StatusPill label={revealed >= TOTAL ? 'Routed' : 'Validating'} />
      </div>

      <div style={{ padding: 16, background: 'var(--color-surface-subtle,#F8FAFC)' }}>
        <div style={{ background: '#fff', border: '1px solid var(--color-border,#E2E8F0)', borderRadius: 10, padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--green-100,#DCFCE7)', color: 'var(--green-700,#166534)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--gray-950,#0F172A)' }}>Eligibility check</span>
            <span style={{ marginLeft: 'auto', fontSize: 10.5, color: 'var(--gray-400,#94A3B8)' }}>{revealed}/{TOTAL} auto</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {checks.map((f, i) => {
              const on = i < revealed;
              return (
                <div key={i} style={{ opacity: on ? 1 : 0.35, transition: 'opacity 300ms ease' }}>
                  <div style={{ fontSize: 9.5, color: 'var(--gray-400,#94A3B8)', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 600 }}>{f.label}</div>
                  <div style={{ marginTop: 3, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500, color: 'var(--gray-950,#0F172A)' }}>
                    <span style={{
                      width: 14, height: 14, borderRadius: 999, flexShrink: 0,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      background: on ? 'var(--green-500,#22C55E)' : 'var(--gray-200,#E2E8F0)',
                      transform: on ? 'scale(1)' : 'scale(0.6)',
                      transition: 'all 300ms cubic-bezier(.22,1,.36,1)',
                    }}>
                      {on && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
                    </span>
                    {f.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: '4px 18px 16px' }}>
        <div style={{ fontSize: 11, color: 'var(--gray-500,#64748B)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600, margin: '8px 0 10px' }}>Service timeline</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
          <span aria-hidden style={{ position: 'absolute', left: 7, top: 10, bottom: 10, width: 2, background: 'var(--gray-200,#E2E8F0)' }} />
          {timeline.map((t, i) => {
            const done = i <= tl;
            const current = i === tl;
            return (
              <div key={i} style={{ display: 'flex', gap: 12, position: 'relative', alignItems: 'flex-start' }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 999, flexShrink: 0, zIndex: 1,
                  background: current ? 'var(--blue-500,#2437F6)' : done ? 'var(--green-500,#22C55E)' : '#fff',
                  border: !done ? '2px solid var(--gray-300,#CBD5E1)' : 'none',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: current ? '0 0 0 4px rgba(36,55,246,0.15)' : 'none',
                  transition: 'all 300ms cubic-bezier(.22,1,.36,1)',
                }}>
                  {done && !current && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
                </span>
                <div style={{ flex: 1, paddingTop: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: done ? 'var(--gray-950,#0F172A)' : 'var(--gray-400,#94A3B8)', transition: 'color 300ms' }}>{t.label}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--gray-400,#94A3B8)', marginTop: 1 }}>{t.by}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ FEATURE 3 — Analytics: bars + defect trends grow on loop ═══════════════ */
function WcFeatureAnalytics() {
  const bars = [38, 45, 52, 49, 62, 58, 64, 70, 65, 78, 72, 82];
  const labels = ['W1','','W3','','W5','','W7','','W9','','W11',''];
  const defects = [
    { label: 'Battery · cell degradation', sku: 'Velotric Nomad 1+', pct: 92, badge: '↑ 18%', up: true },
    { label: 'Motor housing crack', sku: 'JCB 21V drill set', pct: 68, badge: '↑ 9%', up: true },
    { label: 'Bracket fatigue', sku: 'R for Rabbit', pct: 41, badge: '↓ 4%', up: false },
  ];
  return (
    <div style={{ ...WC_CARD_BASE, width: '100%', maxWidth: 480, padding: 0 }}>
      <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--color-border,#E2E8F0)' }}>
        <div style={{ fontSize: 11, color: 'var(--gray-500,#64748B)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Claims · last 12 weeks</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 26, fontWeight: 700, color: 'var(--gray-950,#0F172A)', letterSpacing: '-0.6px' }}>3,284</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green-700,#166534)', background: 'var(--green-100,#DCFCE7)', padding: '2px 8px', borderRadius: 999 }}>↓ 12% TAT</span>
        </div>
      </div>

      <div style={{ padding: '16px 20px 4px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', alignItems: 'flex-end', gap: 6, height: 100 }}>
          {bars.map((h, i) => (
            <div key={i} className="wc-bar" style={{
              ['--bar-h']: `${h}%`,
              height: `${h}%`,
              borderRadius: '4px 4px 0 0',
              background: i === bars.length - 1
                ? 'linear-gradient(180deg, var(--blue-500,#2437F6), #4A5BFE)'
                : 'linear-gradient(180deg, rgba(36,55,246,0.55), rgba(36,55,246,0.22))',
              animation: `wc-bar-grow 0.7s cubic-bezier(.22,1,.36,1) both`,
              animationDelay: `${i * 0.06}s`,
              transformOrigin: 'bottom',
            }} />
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 6, marginTop: 6, fontSize: 9.5, color: 'var(--gray-400,#94A3B8)', fontWeight: 500, textAlign: 'center' }}>
          {labels.map((l, i) => <span key={i}>{l}</span>)}
        </div>
      </div>

      <div style={{ padding: '12px 20px 16px' }}>
        <div style={{ fontSize: 11, color: 'var(--gray-500,#64748B)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600, marginBottom: 10 }}>Top defect trends</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {defects.map((d, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--gray-950,#0F172A)' }}>{d.label}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--gray-500,#64748B)', marginTop: 1 }}>{d.sku}</div>
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: d.up ? '#9A3412' : 'var(--green-700,#166534)', background: d.up ? '#FFEDD5' : 'var(--green-100,#DCFCE7)', padding: '2px 7px', borderRadius: 999 }}>{d.badge}</span>
              </div>
              <div style={{ height: 5, background: 'var(--gray-100,#F1F5F9)', borderRadius: 999, overflow: 'hidden' }}>
                <div className="wc-trend-fill" style={{
                  ['--fill']: `${d.pct}%`,
                  height: '100%', width: `${d.pct}%`,
                  background: d.up ? 'linear-gradient(90deg,#F97316,#FB923C)' : 'linear-gradient(90deg,#22C55E,#4ADE80)',
                  borderRadius: 999,
                  animation: 'wc-fill 1s cubic-bezier(.22,1,.36,1) both',
                  animationDelay: `${0.2 + i * 0.15}s`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WcHeroMock, WcFeatureWorkflow, WcFeatureValidate, WcFeatureAnalytics });

/* Scoped animations */
(function injectWcMockStyles(){
  if (document.getElementById('wc-mock-styles')) return;
  const s = document.createElement('style');
  s.id = 'wc-mock-styles';
  s.textContent = `
    @keyframes wc-floaty { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-8px);} }
    @keyframes wc-check-pop { 0% { transform: scale(0); opacity: 0;} 60% { transform: scale(1.18);} 100% { transform: scale(1); opacity: 1;} }
    .wc-check-pop { animation: wc-check-pop 0.5s cubic-bezier(.22,1,.36,1) both; }
    @keyframes wc-route-in { 0% { transform: translateY(8px); opacity: 0;} 100% { transform: translateY(0); opacity: 1;} }
    .wc-route-in { animation: wc-route-in 0.5s cubic-bezier(.22,1,.36,1) 1.5s both; }
    @keyframes wc-kanban-pop { 0% { transform: translateX(-10px) scale(0.96); opacity: 0;} 100% { transform: translateX(0) scale(1); opacity: 1;} }
    .wc-kanban-pop { animation: wc-kanban-pop 0.45s cubic-bezier(.22,1,.36,1) both; }
    @keyframes wc-bar-grow { 0% { transform: scaleY(0);} 100% { transform: scaleY(1);} }
    @keyframes wc-fill { 0% { width: 0;} 100% { width: var(--fill);} }
  `;
  document.head.appendChild(s);
})();
