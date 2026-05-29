/* global React */
const { useEffect, useRef, useState } = React;

/* ─────────────────────────────────────────────────────────
   PORTAL PREVIEWS — three animated Dyrect Client Portal cards
   Used in the hero. Each card mocks a different screen of the
   product so the user gets a full sense of the platform.
   ───────────────────────────────────────────────────────── */

/* Small status badge — mirrors product UI badges */
function Badge({ tone = 'info', children, dot = false }) {
  const tones = {
    info:    { bg: '#DBEAFE', fg: '#1E3A8A', dot: '#2437F6' },
    success: { bg: '#DCFCE7', fg: '#166534', dot: '#0ABE52' },
    warning: { bg: '#FEF3C7', fg: '#92400E', dot: '#F59E0B' },
    error:   { bg: '#FEE2E2', fg: '#991B1B', dot: '#EF4444' },
    slate:   { bg: '#F1F5F9', fg: '#334155', dot: '#64748B' },
    brand:   { bg: '#EEF0FE', fg: '#0F1FB8', dot: '#2437F6' },
  };
  const t = tones[tone] || tones.info;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: t.bg, color: t.fg,
      padding: '3px 8px', borderRadius: 4,
      fontSize: 11, fontWeight: 500, lineHeight: 1.2,
      whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: t.dot }} />}
      {children}
    </span>
  );
}

/* ───────────── Card 1: Customer Profile ───────────── */
function CustomerProfileCard({ active }) {
  return (
    <div className="pp-card pp-card--profile" data-active={active}>
      {/* window chrome */}
      <div className="pp-chrome">
        <div className="pp-chrome-dots">
          <span /><span /><span />
        </div>
        <div className="pp-chrome-tab">Customer · Sarah Chen</div>
      </div>
      <div className="pp-body" style={{ padding: 0 }}>
        {/* hero strip */}
        <div style={{
          padding: '14px 16px 12px',
          borderBottom: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 999,
            background: 'linear-gradient(135deg,#2437F6,#7E8DFE)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 600, fontSize: 16, letterSpacing: '-0.3px',
          }}>SC</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#0F172A' }}>Sarah Chen</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 1 }}>sarah.chen@hey.com · +1 415 555 0142</div>
          </div>
          <Badge tone="success" dot>Verified</Badge>
        </div>
        {/* meta grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 1, background: 'var(--color-slate-200)',
        }}>
          {[
            ['Sales channel', 'Shopify', 'brand'],
            ['Location', 'San Francisco, CA'],
            ['Lifetime orders', '4'],
            ['Warranty status', 'Active', 'success'],
          ].map(([k, v, tone], i) => (
            <div key={i} style={{ background: 'white', padding: '10px 14px' }}>
              <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500 }}>{k}</div>
              <div style={{ marginTop: 4, fontSize: 13, fontWeight: 500, color: '#1E293B' }}>
                {tone ? <Badge tone={tone} dot>{v}</Badge> : v}
              </div>
            </div>
          ))}
        </div>
        {/* products owned */}
        <div style={{ padding: '12px 16px 14px' }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500, marginBottom: 8 }}>Registered products</div>
          {[
            { name: 'Velotric Discover 2', sn: 'VD2-A8421', exp: 'Apr 22, 2028', warn: false },
            { name: 'Velotric Nomad 1 Plus', sn: 'VN1-B2031', exp: 'Jun 10, 2026', warn: true },
          ].map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', marginBottom: 6,
              borderRadius: 6, background: i === 0 ? '#F8FAFC' : 'white',
              border: '1px solid var(--border-default)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 5,
                background: 'var(--color-slate-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#475569',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h3l3 8M5 14l4-7h6l3 6"/></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#64748B', fontFamily: 'var(--font-mono)' }}>{p.sn}</div>
              </div>
              <Badge tone={p.warn ? 'warning' : 'success'} dot>
                {p.warn ? 'Expires soon' : 'Active'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Card 2: Tickets / Claims ───────────── */
function TicketsCard({ active }) {
  // Animated assignment of TS89274 to a dealer
  const tickets = [
    { id: 'TS89281', sub: 'Charging port not working', status: 'Open',      tone: 'info',    assignee: 'Ari M.',     mins: '2m' },
    { id: 'TS89274', sub: 'Replacement requested',     status: 'Assigning', tone: 'warning', assignee: '—',          mins: '6m', highlight: true },
    { id: 'TS89260', sub: 'Frame paint defect',        status: 'Repair',    tone: 'brand',   assignee: 'Northgate',  mins: '18m' },
    { id: 'TS89251', sub: 'Battery underperforming',   status: 'Resolved',  tone: 'success', assignee: 'Jordan B.',  mins: '1h' },
  ];

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 1100);
    const t2 = setTimeout(() => setPhase(2), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  return (
    <div className="pp-card pp-card--tickets" data-active={active}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">Claims · All tickets</div>
      </div>
      <div className="pp-body">
        {/* filters row */}
        <div style={{
          display: 'flex', gap: 6, alignItems: 'center',
          padding: '10px 14px 10px',
          borderBottom: '1px solid var(--border-default)',
        }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 10px', background: '#F8FAFC',
            border: '1px solid var(--border-default)', borderRadius: 6,
            fontSize: 12, color: '#94A3B8',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            Search tickets
          </div>
          {['Open', 'Repair', 'Resolved'].map((f, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 500,
              padding: '6px 10px', borderRadius: 999,
              background: i === 0 ? '#1E293B' : 'transparent',
              color: i === 0 ? 'white' : '#475569',
              border: i === 0 ? 'none' : '1px solid var(--border-default)',
            }}>{f}</span>
          ))}
        </div>
        {/* tickets table */}
        <div>
          {tickets.map((t, i) => {
            const isHighlight = t.highlight;
            const assignee = isHighlight && phase >= 2 ? 'Northgate' : isHighlight && phase === 1 ? '…' : t.assignee;
            const status = isHighlight && phase >= 2 ? 'Repair' : t.status;
            const tone = isHighlight && phase >= 2 ? 'brand' : t.tone;
            return (
              <div key={t.id} style={{
                display: 'grid',
                gridTemplateColumns: '78px 1fr auto auto',
                gap: 10, alignItems: 'center',
                padding: '10px 14px',
                borderBottom: i === tickets.length - 1 ? 'none' : '1px solid var(--color-slate-100)',
                background: isHighlight && phase >= 1 ? 'rgba(36,55,246,0.045)' : 'white',
                transition: 'background 320ms ease',
                position: 'relative',
              }}>
                {isHighlight && phase >= 1 && (
                  <span style={{
                    position: 'absolute', left: 0, top: 4, bottom: 4, width: 3,
                    background: 'var(--color-brand-blue)', borderRadius: '0 3px 3px 0',
                  }} />
                )}
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11.5,
                  color: '#1E293B', fontWeight: 500, letterSpacing: 0.2,
                }}>{t.id}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.sub}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>
                    Assigned to <span style={{ color: '#475569', fontWeight: 500 }}>{assignee}</span> · {t.mins} ago
                  </div>
                </div>
                <Badge tone={tone} dot>{status}</Badge>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Card 3: Analytics Dashboard ───────────── */
function AnalyticsCard({ active }) {
  // Animated number that counts up when active
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    const target = 12482;
    const start = performance.now();
    const dur = 1400;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  // Bar chart values
  const bars = [38, 52, 44, 61, 58, 72, 68, 79, 84, 76, 88, 94];
  const labels = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const maxBar = 100;

  return (
    <div className="pp-card pp-card--analytics" data-active={active}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">Analytics · Last 12 months</div>
      </div>
      <div className="pp-body">
        {/* KPI row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
        }}>
          {[
            { label: 'Registrations', value: count.toLocaleString(), trend: '+18.2%', tone: 'success' },
            { label: 'Avg resolution', value: '1.4d', trend: '−31%', tone: 'success' },
            { label: 'Upsell revenue', value: '$84.2K', trend: '+42%', tone: 'success' },
          ].map((k, i) => (
            <div key={i} style={{ background: 'white', padding: '12px 14px' }}>
              <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500 }}>{k.label}</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 17, fontWeight: 600, color: '#0F172A', letterSpacing: '-0.3px', fontFamily: 'var(--font-display)' }}>{k.value}</span>
                <span style={{ fontSize: 11, color: 'var(--color-success-text)', fontWeight: 500 }}>{k.trend}</span>
              </div>
            </div>
          ))}
        </div>
        {/* chart area */}
        <div style={{ padding: '14px 14px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>Claim resolutions</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>vs. previous period</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: '#475569' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--color-brand-blue)' }} /> 2026
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--color-slate-200)' }} /> 2025
              </span>
            </div>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: `repeat(${bars.length}, 1fr)`,
            gap: 4, alignItems: 'end', height: 96,
          }}>
            {bars.map((v, i) => {
              const prev = v - 8 - (i % 3) * 3;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' }}>
                  <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'end', gap: 2 }}>
                    <div style={{
                      flex: 1, height: `${(prev / maxBar) * 100}%`,
                      background: 'var(--color-slate-200)', borderRadius: '2px 2px 0 0',
                    }} />
                    <div style={{
                      flex: 1,
                      height: active ? `${(v / maxBar) * 100}%` : '0%',
                      background: 'linear-gradient(180deg, #4F60FE 0%, #2437F6 100%)',
                      borderRadius: '2px 2px 0 0',
                      transition: `height 900ms cubic-bezier(.16,.84,.44,1) ${i * 60}ms`,
                    }} />
                  </div>
                  <span style={{ fontSize: 9.5, color: '#94A3B8', fontWeight: 500 }}>{labels[i]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Shared card chrome CSS injection */
(function injectPPStyles(){
  if (document.getElementById('pp-styles')) return;
  const s = document.createElement('style');
  s.id = 'pp-styles';
  s.textContent = `
    .pp-card {
      width: 380px;
      background: white;
      border: 1px solid var(--border-default);
      border-radius: 12px;
      box-shadow: var(--shadow-xl);
      overflow: hidden;
      font-family: var(--font-body);
    }
    .pp-chrome {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 14px;
      background: #FAFBFC;
      border-bottom: 1px solid var(--border-default);
    }
    .pp-chrome-dots { display: flex; gap: 6px; }
    .pp-chrome-dots span {
      width: 9px; height: 9px; border-radius: 999px;
      background: #E2E8F0;
    }
    .pp-chrome-dots span:first-child { background: #FF6058; }
    .pp-chrome-dots span:nth-child(2) { background: #FFBC2F; }
    .pp-chrome-dots span:nth-child(3) { background: #2BC840; }
    .pp-chrome-tab {
      font-size: 11.5px;
      color: #64748B;
      font-weight: 500;
    }
    .pp-body { background: white; }
  `;
  document.head.appendChild(s);
})();

Object.assign(window, {
  Badge, CustomerProfileCard, TicketsCard, AnalyticsCard,
});
