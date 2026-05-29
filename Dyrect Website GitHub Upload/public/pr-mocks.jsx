/* global React */
/* Visual mocks for the Product Registration page — hero illustration + 3 feature tab visuals */
const { useEffect: prmUE, useState: prmUS, useRef: prmUR } = React;

/* ───────────── QR Code (SVG, looks real) ─────────────
   A 25×25 module QR with three finder patterns (7×7), alignment pattern,
   timing rows, and a deterministic data field. Pure visual — not scannable. */
function PrQRCode({ size = 160 }) {
  const N = 25;
  const cell = 1;
  // Initialize grid as null (unset)
  const g = Array.from({ length: N }, () => Array(N).fill(null));

  // Finder pattern (7×7) at (r,c)
  function placeFinder(r0, c0) {
    for (let dr = 0; dr < 7; dr++) {
      for (let dc = 0; dc < 7; dc++) {
        const r = r0 + dr,c = c0 + dc;
        const onRing = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const inCore = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        g[r][c] = onRing || inCore ? 1 : 0;
      }
    }
    // Separator (white border)
    for (let i = -1; i <= 7; i++) {
      for (const [rr, cc] of [[r0 + i, c0 - 1], [r0 + i, c0 + 7], [r0 - 1, c0 + i], [r0 + 7, c0 + i]]) {
        if (rr >= 0 && rr < N && cc >= 0 && cc < N && g[rr][cc] === null) g[rr][cc] = 0;
      }
    }
  }
  placeFinder(0, 0);
  placeFinder(0, N - 7);
  placeFinder(N - 7, 0);

  // Alignment pattern (5×5) near bottom-right
  function placeAlignment(r0, c0) {
    for (let dr = 0; dr < 5; dr++) {
      for (let dc = 0; dc < 5; dc++) {
        const r = r0 + dr,c = c0 + dc;
        const onRing = dr === 0 || dr === 4 || dc === 0 || dc === 4;
        const inCenter = dr === 2 && dc === 2;
        g[r][c] = onRing || inCenter ? 1 : 0;
      }
    }
  }
  placeAlignment(N - 9, N - 9);

  // Timing patterns: row 6 and col 6
  for (let i = 8; i < N - 8; i++) {
    if (g[6][i] === null) g[6][i] = i % 2 === 0 ? 1 : 0;
    if (g[i][6] === null) g[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Fill rest with deterministic noise (~50% on)
  function hash(r, c) {
    let x = r * 73856093 ^ c * 19349663 ^ (r + c) * 83492791;
    x = (x ^ x >>> 13) * 1274126177;
    return ((x ^ x >>> 16) >>> 0) / 0xFFFFFFFF;
  }
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (g[r][c] === null) g[r][c] = hash(r, c) < 0.5 ? 1 : 0;
    }
  }

  const rects = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (g[r][c] === 1) rects.push(<rect key={`${r}-${c}`} x={c} y={r} width={cell} height={cell} />);
    }
  }
  return (
    <div style={{
      width: size, height: size, background: 'white', borderRadius: 8,
      padding: 8, boxSizing: 'border-box', display: 'block'
    }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges" fill="#0F172A">
        {rects}
      </svg>
    </div>);

}

const PR_CARD_BASE = {
  background: 'white',
  border: '1px solid var(--border-default)',
  borderRadius: 14,
  boxShadow: '0 24px 60px -12px rgba(15,23,42,0.18), 0 6px 18px -4px rgba(15,23,42,0.06)',
  overflow: 'hidden'
};

/* ───────────── HERO MOCK
   A customer-facing registration flow: QR scan → product card + form → success.
   Shown as a phone-style frame with floating side chips. */
function PrHeroMock() {
  const [step, setStep] = prmUS(1);
  prmUE(() => {
    const t = setInterval(() => setStep((s) => s % 3 + 1), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pr-hero-mock-wrap" style={{ position: 'relative', width: '100%', maxWidth: 440, margin: '0 auto' }}>
      {/* glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: '-30px',
        background: 'radial-gradient(closest-side, rgba(36,55,246,0.18), transparent 70%)',
        filter: 'blur(28px)', pointerEvents: 'none', zIndex: 0
      }} />

      {/* Phone-style frame */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: 320, margin: '0 auto',
        borderRadius: 36,
        background: '#0F172A',
        padding: 10,
        boxShadow: '0 30px 80px -20px rgba(15,23,42,0.45), 0 12px 30px -6px rgba(15,23,42,0.18)'
      }}>
        <div style={{
          borderRadius: 28, background: '#F8FAFC', overflow: 'hidden',
          minHeight: 560,
          display: 'flex', flexDirection: 'column'
        }}>
          {/* Status bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 22px 6px', fontSize: 11, fontWeight: 600, color: '#0F172A'
          }}>
            <span>9:41</span>
            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M1 6h2v3H1zm4-2h2v5H5zm4-2h2v7H9z" /></svg>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="1" y="2" width="12" height="6" rx="1.2" stroke="currentColor" strokeWidth="0.8" fill="none" /><rect x="2" y="3" width="9" height="4" rx="0.6" /><rect x="14" y="4" width="1.2" height="2" rx="0.4" /></svg>
            </span>
          </div>

          {/* Brand strip */}
          <div style={{
            padding: '12px 22px 14px', display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: '1px solid var(--color-slate-200)'
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 7,
              background: 'var(--color-brand-blue)', color: 'white',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700
            }}>V</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Velotric · Register your purchase</div>
          </div>

          {/* Slot — three stacked steps, only one visible */}
          <div style={{ flex: 1, position: 'relative' }}>
            {/* Step 1 — QR scanner */}
            <div style={{
              position: 'absolute', inset: 0, padding: '24px 22px',
              opacity: step === 1 ? 1 : 0,
              transform: step === 1 ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'opacity 400ms ease, transform 500ms cubic-bezier(.16,.84,.44,1)',
              pointerEvents: step === 1 ? 'auto' : 'none'
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', letterSpacing: 1.2, textTransform: 'uppercase' }}>Step 1 of 3</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700,
                letterSpacing: '-0.4px', color: '#0F172A', marginTop: 6
              }}>Scan the QR on your packaging</div>
              <div style={{
                marginTop: 22, position: 'relative',
                width: '100%', aspectRatio: '1/1',
                background: '#0F172A', borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <PrQRCode size={160} />
                {/* Scanning line */}
                <div style={{
                  position: 'absolute', left: 32, right: 32, top: '50%',
                  height: 2, background: 'linear-gradient(90deg, transparent, #A4AFFE 50%, transparent)',
                  boxShadow: '0 0 20px 4px rgba(164,175,254,0.45)',
                  animation: 'pr-scan 1.6s ease-in-out infinite'
                }} />
              </div>
              <div style={{
                marginTop: 16, padding: 12, borderRadius: 10,
                background: 'rgba(36,55,246,0.05)', border: '1px solid rgba(36,55,246,0.15)',
                fontSize: 12, color: 'var(--color-brand-blue-deep)', display: 'flex', gap: 8, alignItems: 'flex-start'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                </svg>
                <span>Or enter serial number manually</span>
              </div>
            </div>

            {/* Step 2 — registration form */}
            <div style={{
              position: 'absolute', inset: 0, padding: '24px 22px',
              opacity: step === 2 ? 1 : 0,
              transform: step === 2 ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'opacity 400ms ease, transform 500ms cubic-bezier(.16,.84,.44,1)',
              pointerEvents: step === 2 ? 'auto' : 'none',
              display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', letterSpacing: 1.2, textTransform: 'uppercase' }}>Step 2 of 3</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700,
                letterSpacing: '-0.4px', color: '#0F172A', marginTop: 6
              }}>Tell us about your purchase</div>

              {/* product detected card */}
              <div style={{
                marginTop: 16, padding: 12, borderRadius: 10,
                background: 'white', border: '1px solid var(--color-slate-200)',
                display: 'flex', gap: 12, alignItems: 'center'
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 8,
                  background: 'linear-gradient(135deg, #EEF0FE, #DBEAFE)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-blue-deep)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="M6 17 9 9h6l3 8M9 9h6" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>Velotric Nomad 1+</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>SN · VLT-78423-9F</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, color: '#166534',
                  background: '#DCFCE7', padding: '3px 8px', borderRadius: 999
                }}>Verified</span>
              </div>

              {/* Form fields */}
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                { label: 'Full name', value: 'Sarah Chen' },
                { label: 'Email', value: 'sarah@example.com' },
                { label: 'Purchased from', value: 'Amazon · Apr 8, 2026' }].
                map((f, i) =>
                <div key={i}>
                    <div style={{ fontSize: 10, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 600 }}>{f.label}</div>
                    <div style={{
                    marginTop: 4, padding: '9px 11px',
                    background: 'white', border: '1px solid var(--color-slate-200)',
                    borderRadius: 8, fontSize: 12.5, color: '#0F172A'
                  }}>{f.value}</div>
                  </div>
                )}
              </div>

              <button style={{
                marginTop: 14, padding: '11px 14px', borderRadius: 8,
                background: 'var(--color-brand-blue)', color: 'white',
                fontSize: 13, fontWeight: 600, width: '100%',
                boxShadow: '0 6px 16px -4px rgba(36,55,246,0.5)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}>
                Activate warranty
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Step 3 — success */}
            <div style={{
              position: 'absolute', inset: 0, padding: '28px 22px',
              opacity: step === 3 ? 1 : 0,
              transform: step === 3 ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'opacity 400ms ease, transform 500ms cubic-bezier(.16,.84,.44,1)',
              pointerEvents: step === 3 ? 'auto' : 'none',
              display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', letterSpacing: 1.2, textTransform: 'uppercase' }}>All done</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700,
                letterSpacing: '-0.4px', color: '#0F172A', marginTop: 6
              }}>Your warranty is active</div>

              {/* Digital warranty card */}
              <div style={{
                marginTop: 18, padding: 16, borderRadius: 12,
                background: 'linear-gradient(135deg, #1A23A8 0%, #2437F6 60%, #4A5BFE 100%)',
                color: 'white', position: 'relative', overflow: 'hidden'
              }}>
                <div aria-hidden style={{
                  position: 'absolute', right: -30, top: -30, width: 120, height: 120,
                  background: 'radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 70%)'
                }} />
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: 1.2 }}>Digital warranty</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginTop: 6 }}>Velotric Nomad 1+</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>Coverage until · Apr 8, 2028</div>
                <div style={{
                  marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
                }}>
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>Owner</div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>Sarah Chen</div>
                  </div>
                  <div style={{
                    width: 36, height: 36, borderRadius: 6, background: 'white', padding: 3,
                    display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gridTemplateRows: 'repeat(6,1fr)', gap: 1.5
                  }}>
                    {Array.from({ length: 36 }).map((_, i) => {
                      const r = Math.floor(i / 6),c = i % 6;
                      const on = (r * 3 + c * 5 + i) % 3 === 0 || r === 0 || c === 0 || r === 5 || c === 5;
                      return <div key={i} style={{ background: on ? '#0F1FB8' : 'transparent' }} />;
                    })}
                  </div>
                </div>
              </div>

              {/* Cross-sell hint */}
              <div style={{
                marginTop: 14, padding: 12, borderRadius: 10,
                background: '#FFF7ED', border: '1px solid #FED7AA',
                display: 'flex', gap: 10, alignItems: 'center'
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: '#F97316',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 12V8H6a2 2 0 0 1-2-2V4h12" /><path d="M4 16v-4h16v4M2 20h20" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#9A3412' }}>Get 15% off accessories</div>
                  <div style={{ fontSize: 11, color: '#9A3412', opacity: 0.85, marginTop: 1 }}>Helmets, lights, panniers — first order</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A3412" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </div>
            </div>
          </div>

          {/* Bottom step indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '14px 0 18px' }}>
            {[1, 2, 3].map((i) =>
            <span key={i} style={{
              width: step === i ? 22 : 6, height: 6, borderRadius: 999,
              background: step === i ? 'var(--color-brand-blue)' : 'var(--color-slate-300)',
              transition: 'all 240ms ease'
            }} />
            )}
          </div>
        </div>
      </div>

      {/* Floating chip - top left */}
      <div className="pr-float-chip pr-float-chip--left" style={{
        position: 'absolute', left: -10, top: 80,
        background: 'white', border: '1px solid var(--border-default)',
        borderRadius: 10, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: 'var(--shadow-lg)', fontSize: 12,
        animation: 'pr-floaty 6s ease-in-out infinite',
        zIndex: 2
      }}>
        <span style={{
          width: 26, height: 26, borderRadius: 8,
          background: '#DCFCE7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#166534'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <div>
          <div style={{ fontSize: 10.5, color: '#64748B' }}>New registration</div>
          <div style={{ fontSize: 12, color: '#1E293B', fontWeight: 600 }}>via QR · just now</div>
        </div>
      </div>

      {/* Floating chip - bottom right */}
      <div className="pr-float-chip pr-float-chip--right" style={{
        position: 'absolute', right: -14, bottom: 120,
        background: 'white', border: '1px solid var(--border-default)',
        borderRadius: 10, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: 'var(--shadow-lg)', fontSize: 12,
        animation: 'pr-floaty 5.4s ease-in-out infinite reverse',
        zIndex: 2
      }}>
        <span style={{
          width: 26, height: 26, borderRadius: 8,
          background: '#EEF0FE', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-blue-deep)'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
        </span>
        <div>
          <div style={{ fontSize: 10.5, color: '#64748B' }}>First-party data</div>
          <div style={{ fontSize: 12, color: '#1E293B', fontWeight: 600 }}>+1,284 this week</div>
        </div>
      </div>
    </div>);

}

/* ───────────── FEATURE TAB 1 — Shopify + QR omni-channel registration sources */
function PrFeatureOmni() {
  const sources = [
  { name: 'QR on packaging', icon: 'qr', count: '4,820', pct: 38 },
  { name: 'Shopify auto-register', icon: 'shopify', count: '3,610', pct: 28 },
  { name: 'Branded form link', icon: 'link', count: '2,140', pct: 17 },
  { name: 'Manual entry', icon: 'edit', count: '2,170', pct: 17 }];

  const Icon = ({ name }) => {
    const p = {
      qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4" /></>,
      shopify: <><path d="M16 8a4 4 0 0 0-4-4 4 4 0 0 0-4 4M12 8v12M6 12h12" /></>,
      link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
      edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" /></>
    };
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
  };
  return (
    <div style={{ ...PR_CARD_BASE, width: '100%', maxWidth: 460, padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Registrations · last 30 days</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: '#0F172A', marginTop: 4, letterSpacing: '-0.6px' }}>12,740</div>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, color: '#166534',
          background: '#DCFCE7', padding: '4px 10px', borderRadius: 999
        }}>+18% MoM</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sources.map((s, i) =>
        <div key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{
              width: 28, height: 28, borderRadius: 7,
              background: 'var(--color-brand-blue-subtle)', color: 'var(--color-brand-blue)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon name={s.icon} />
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#1E293B', flex: 1 }}>{s.name}</span>
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>{s.count}</span>
            </div>
            <div style={{ height: 6, background: 'var(--color-slate-100)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{
              height: '100%', width: `${s.pct}%`,
              background: 'linear-gradient(90deg, #2437F6, #4A5BFE)',
              borderRadius: 999,
              animation: `pr-grow-${i} 1s cubic-bezier(.16,.84,.44,1) both`
            }} />
            </div>
          </div>
        )}
      </div>
      <div style={{
        marginTop: 18, padding: 12, borderRadius: 10,
        background: 'var(--color-slate-50)', border: '1px solid var(--border-default)',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <span style={{
          width: 30, height: 30, borderRadius: 7,
          background: '#95BF47', color: 'white',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 7.4c-.1-.7-.6-1.1-1-1.1l-.5-.1c-.4-1.3-1.5-2.3-2.7-2.3h-.2c-.4-.5-1-.8-1.6-.8-1.4 0-2.5 1.1-2.9 2.8L4.3 6.5c-.5.2-.5.2-.6.7L2 19.5l11.6 2.2 5.2-1.1-3.3-13.2z" style={{ fill: "rgb(255, 255, 255)" }} /></svg>
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>Shopify store · Velotric</div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>Auto-register on fulfilled order</div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#166534', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: '#22C55E' }} />
          Live
        </span>
      </div>
    </div>);

}

/* ───────────── FEATURE TAB 2 — In-flow upsells: registration → upsell offer */
function PrFeatureUpsell() {
  return (
    <div style={{ ...PR_CARD_BASE, width: '100%', maxWidth: 460, padding: 0 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{
            width: 18, height: 18, borderRadius: 999, background: '#DCFCE7',
            color: '#166534', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </span>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Registration complete</div>
        </div>
        <div style={{ fontSize: 11.5, color: '#64748B' }}>Velotric Nomad 1+ · 2-yr coverage active</div>
      </div>

      {/* Body */}
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Picked for Sarah</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#0F172A', marginTop: 4, letterSpacing: '-0.3px' }}>
          Complete your ride
        </div>

        {/* upsell items */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
          {[
          { name: 'Velotric helmet', price: '$59', save: 'Save 15%', color: '#FCE7F3', icon: 'helmet' },
          { name: 'Premium lights kit', price: '$42', save: 'Save 20%', color: '#DBEAFE', icon: 'light' }].
          map((u, i) =>
          <div key={i} style={{
            padding: 12, border: '1px solid var(--color-slate-200)', borderRadius: 10,
            background: 'white'
          }}>
              <div style={{
              width: '100%', aspectRatio: '4/3', borderRadius: 8,
              background: u.color, marginBottom: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {u.icon === 'helmet' ?
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                    <path d="M3 14a9 9 0 1 1 18 0v3H3z" /><path d="M3 17h18v2H3z" /><path d="M9 7v3M15 7v3" />
                  </svg> :

              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                    <path d="M9 18h6l-1 4h-4z" /><rect x="6" y="3" width="12" height="15" rx="3" /><path d="M9 8h6M9 13h6" />
                  </svg>
              }
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>{u.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{u.price}</span>
                <span style={{
                fontSize: 10, fontWeight: 600, color: '#9A3412',
                background: '#FFF7ED', padding: '2px 6px', borderRadius: 4
              }}>{u.save}</span>
              </div>
            </div>
          )}
        </div>

        {/* CRM sync indicator */}
        <div style={{
          marginTop: 16, padding: '10px 12px', borderRadius: 10,
          background: 'var(--color-slate-50)', border: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 10, fontSize: 12
        }}>
          <span style={{
            width: 24, height: 24, borderRadius: 6, background: 'var(--color-brand-blue-subtle)',
            color: 'var(--color-brand-blue-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.4 0 4.6 1 6.3 2.7" /><path d="M21 3v6h-6" /></svg>
          </span>
          <span style={{ flex: 1, color: '#475569' }}>Synced to Klaviyo, Shopify · 0.4s ago</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#166534' }}>+$87 LTV</span>
        </div>
      </div>
    </div>);

}

/* ───────────── FEATURE TAB 3 — Verified customer records (marketplace buyers captured) */
function PrFeatureCustomers() {
  const customers = [
  { name: 'Sarah Chen', src: 'Amazon', sub: 'Velotric Nomad 1+', avatar: 'SC', tone: '#FCE7F3', dot: '#EC4899' },
  { name: 'Marcus Reid', src: 'Best Buy retail', sub: 'JCB 21V drill set', avatar: 'MR', tone: '#DCFCE7', dot: '#22C55E' },
  { name: 'Priya Shah', src: 'Distributor', sub: 'R for Rabbit stroller', avatar: 'PS', tone: '#DBEAFE', dot: '#3B82F6' },
  { name: 'Léa Bernard', src: 'Flipkart', sub: 'Neeman\'s Re-Live shoes', avatar: 'LB', tone: '#FEF3C7', dot: '#F59E0B' }];

  return (
    <div style={{ ...PR_CARD_BASE, width: '100%', maxWidth: 460, padding: 0 }}>
      <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Verified customer records</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#0F172A', marginTop: 3, letterSpacing: '-0.5px' }}>
            4,820 new owners
          </div>
          <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>From channels you don't own — captured at registration</div>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, color: '#0F1FB8',
          background: 'var(--color-brand-blue-subtle)', padding: '4px 10px', borderRadius: 999
        }}>This week</span>
      </div>
      <div style={{ padding: 12 }}>
        {customers.map((c, i) =>
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 12px', borderRadius: 10,
          background: i === 0 ? 'var(--color-slate-50)' : 'transparent',
          transition: 'background 200ms ease'
        }}>
            <span style={{
            width: 34, height: 34, borderRadius: 999,
            background: c.tone, color: c.dot,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700
          }}>{c.avatar}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{c.name}</div>
              <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 1 }}>{c.sub}</div>
            </div>
            <span style={{
            fontSize: 10.5, fontWeight: 600, color: '#475569',
            background: 'white', border: '1px solid var(--color-slate-200)',
            padding: '4px 8px', borderRadius: 999,
            display: 'inline-flex', alignItems: 'center', gap: 5
          }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: c.dot }} />
              {c.src}
            </span>
          </div>
        )}
      </div>
      <div style={{
        padding: '12px 18px', borderTop: '1px solid var(--border-default)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--color-slate-50)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#475569' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
          Email + SMS opt-in
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#166534' }}>92% consent</span>
      </div>
    </div>);

}

Object.assign(window, { PrHeroMock, PrFeatureOmni, PrFeatureUpsell, PrFeatureCustomers });

/* Inject scoped animations */
(function injectPrMockStyles() {
  if (document.getElementById('pr-mock-styles')) return;
  const s = document.createElement('style');
  s.id = 'pr-mock-styles';
  s.textContent = `
    @keyframes pr-scan {
      0%, 100% { transform: translateY(-40px); opacity: 0.2; }
      50%      { transform: translateY(40px);  opacity: 1; }
    }
    @keyframes pr-floaty {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    @keyframes pr-grow-0 { from { width: 0; } }
    @keyframes pr-grow-1 { from { width: 0; } }
    @keyframes pr-grow-2 { from { width: 0; } }
    @keyframes pr-grow-3 { from { width: 0; } }
  `;
  document.head.appendChild(s);
})();