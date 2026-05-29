/* global React, Badge */
const { useEffect: __pe, useState: __ps } = React;

/* ───────────── Marketer: Audience builder ─────────────
   "You have thousands of buyers you cannot reach"
   Visualizes first-party contact capture from offline/marketplace channels
   plus one-click sync to marketing tools. */
function MarketerAudienceMock({ active }) {
  const [count, setCount] = __ps(0);
  __pe(() => {
    if (!active) { setCount(0); return; }
    const target = 12482;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1300);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const sources = [
    { name: 'Amazon',        captured: 4820, pct: 38, c: '#FF9900' },
    { name: 'Offline retail', captured: 3140, pct: 25, c: '#475569' },
    { name: 'Distributor',   captured: 1990, pct: 16, c: '#7C3AED' },
    { name: 'Shopify',       captured: 2532, pct: 21, c: '#95BF47' },
  ];

  return (
    <div className="pp-card" style={{ width: 420 }}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">Audience · First-party contacts</div>
      </div>
      <div className="pp-body" style={{ padding: 0 }}>
        {/* Hero count */}
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>
            Contacts captured · This quarter
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.8px' }}>
              {count.toLocaleString()}
            </span>
            <Badge tone="success" dot>+18% MoM</Badge>
          </div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
            From channels your brand had no record of before
          </div>
        </div>

        {/* Sources */}
        <div style={{ padding: '14px 18px 4px' }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 8 }}>
            Captured from
          </div>
          {sources.map((s, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />
                <span style={{ fontWeight: 500, color: '#1E293B' }}>{s.name}</span>
                <div style={{ flex: 1 }} />
                <span style={{ fontFamily: 'var(--font-mono)', color: '#475569' }}>{s.captured.toLocaleString()}</span>
                <span style={{ color: '#64748B', width: 28, textAlign: 'right' }}>{s.pct}%</span>
              </div>
              <div style={{ marginTop: 4, height: 4, background: 'var(--color-slate-100)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: active ? `${s.pct * 2.5}%` : '0%',
                  background: s.c, borderRadius: 999,
                  transition: `width 800ms cubic-bezier(.16,.84,.44,1) ${i * 100}ms`,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Sync row */}
        <div style={{
          padding: '12px 18px 16px',
          borderTop: '1px solid var(--color-slate-100)',
        }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 8 }}>
            Sync audiences to
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {[
              { l: 'Klaviyo',   c: '#000000', t: 'K' },
              { l: 'Mailchimp', c: '#FFE01B', t: 'M', dark: true },
              { l: 'HubSpot',   c: '#FF7A59', t: 'H' },
            ].map((tool, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 10px', borderRadius: 8,
                background: 'white',
                border: '1px solid var(--border-default)',
              }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: tool.c, color: tool.dark ? '#0F172A' : 'white',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-display)',
                }}>{tool.t}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#1E293B' }}>{tool.l}</span>
                <div style={{ flex: 1 }} />
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Warranty manager: Unified inbox ─────────────
   "Your claims process was not built to scale"
   Shows scattered channels (WhatsApp, email, phone) converging into
   a structured queue with automated status. */
function WarrantyInboxMock({ active }) {
  const channels = [
    { src: 'WhatsApp', icon: 'whatsapp', c: '#25D366', count: 14 },
    { src: 'Email',    icon: 'mail',     c: '#EA4335', count: 22 },
    { src: 'Phone',    icon: 'phone',    c: '#3B82F6', count: 8 },
    { src: 'Web form', icon: 'globe',    c: '#475569', count: 11 },
  ];
  const tickets = [
    { id: 'TS89281', from: 'WhatsApp', who: 'Marco Diaz',  sub: 'Charging port not working', sla: 'Open · 12m',  tone: 'info' },
    { id: 'TS89279', from: 'Email',    who: 'Lin Tao',     sub: 'Battery replacement',       sla: 'Routed · 2m', tone: 'brand' },
    { id: 'TS89274', from: 'WhatsApp', who: 'Sarah Chen',  sub: 'Replacement requested',     sla: 'Repair',      tone: 'success' },
  ];
  return (
    <div className="pp-card" style={{ width: 420 }}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">Unified inbox · Today</div>
      </div>
      <div className="pp-body" style={{ padding: 0 }}>
        {/* Channel intake row */}
        <div style={{
          padding: '12px 14px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
          borderBottom: '1px solid var(--border-default)',
        }}>
          {channels.map((c, i) => (
            <div key={i} style={{
              padding: '8px 10px', borderRadius: 8,
              background: '#F8FAFC', border: '1px solid var(--border-default)',
              display: 'flex', flexDirection: 'column', gap: 4,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 5,
                  background: c.c, color: 'white',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon === 'whatsapp' && <><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z"/><path d="M9 10a3 3 0 0 0 6 0"/></>}
                    {c.icon === 'mail'     && <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>}
                    {c.icon === 'phone'    && <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.9z"/>}
                    {c.icon === 'globe'    && <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>}
                  </svg>
                </span>
                <span style={{ fontSize: 11.5, color: '#475569', fontWeight: 500 }}>{c.src}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.4px' }}>{c.count}</div>
            </div>
          ))}
        </div>

        {/* Funnel arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#F8FAFC', borderBottom: '1px solid var(--border-default)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4h18l-7 9v6l-4 2v-8z"/>
          </svg>
          <span style={{ fontSize: 12, color: '#475569' }}>
            Auto-validated · routed by SLA + skill
          </span>
          <div style={{ flex: 1 }} />
          <Badge tone="success" dot>0 manual</Badge>
        </div>

        {/* Structured queue */}
        <div>
          {tickets.map((t, i) => (
            <div key={t.id} style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: 10, alignItems: 'center',
              padding: '11px 14px',
              borderBottom: i === tickets.length - 1 ? 'none' : '1px solid var(--color-slate-100)',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#1E293B', fontWeight: 500 }}>{t.id}</div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>from {t.from}</div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.sub}</div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 1 }}>{t.who}</div>
              </div>
              <Badge tone={t.tone} dot>{t.sla}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Business owner: P&L view ─────────────
   "Your after-sales operation costs money and earns none"
   Shows warranty cost line vs new revenue line crossing into the green. */
function BusinessOwnerPLMock({ active }) {
  // Two series — claim cost (down) and EW revenue (up)
  const cost    = [62, 64, 60, 58, 55, 52, 49, 46, 44, 42, 40, 38];
  const revenue = [12, 18, 22, 26, 34, 41, 50, 58, 68, 76, 84, 92];
  const maxY = 100;
  const w = 360, h = 130, padL = 8, padR = 8, padT = 8, padB = 18;
  const pts = (arr) =>
    arr.map((v, i) => {
      const x = padL + (i / (arr.length - 1)) * (w - padL - padR);
      const y = padT + (1 - v / maxY) * (h - padT - padB);
      return [x, y];
    });
  const toPath = (arr) => pts(arr).map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(' ');
  const toArea = (arr) => {
    const p = pts(arr);
    const last = p[p.length - 1];
    const first = p[0];
    return `${toPath(arr)} L${last[0]},${h - padB} L${first[0]},${h - padB} Z`;
  };

  return (
    <div className="pp-card" style={{ width: 420 }}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">Warranty P&L · Last 12 months</div>
      </div>
      <div className="pp-body" style={{ padding: 0 }}>
        {/* KPI row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
        }}>
          {[
            { l: 'Claim cost',    v: '$38K',  t: '−39%',  tone: 'success-text' },
            { l: 'EW revenue',    v: '$92K',  t: '+670%', tone: 'success-text' },
            { l: 'Net contribution', v: '+$54K', t: 'was −$50K', tone: 'success-text' },
          ].map((k, i) => (
            <div key={i} style={{ background: 'white', padding: '12px 14px' }}>
              <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500 }}>{k.l}</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>{k.v}</span>
                <span style={{ fontSize: 11, color: 'var(--color-success-text)', fontWeight: 500 }}>{k.t}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ padding: '14px 14px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>Warranty P&L by month</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>cost out vs revenue in</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: '#475569' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 10, height: 2, background: '#EF4444' }} /> Cost
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 10, height: 2, background: 'var(--color-success)' }} /> Revenue
              </span>
            </div>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
            {/* grid */}
            {[0, 1, 2, 3].map((j) => (
              <line key={j}
                x1={padL} x2={w - padR}
                y1={padT + (j / 3) * (h - padT - padB)}
                y2={padT + (j / 3) * (h - padT - padB)}
                stroke="var(--color-slate-100)" strokeWidth="1" />
            ))}
            {/* areas */}
            <path d={toArea(cost)} fill="rgba(239,68,68,0.10)" />
            <path d={toArea(revenue)} fill="rgba(10,190,82,0.12)" />
            {/* lines, animated */}
            <path d={toPath(cost)} fill="none" stroke="#EF4444" strokeWidth="2"
              strokeDasharray="600" strokeDashoffset={active ? 0 : 600}
              style={{ transition: 'stroke-dashoffset 1100ms cubic-bezier(.16,.84,.44,1)' }} />
            <path d={toPath(revenue)} fill="none" stroke="var(--color-success)" strokeWidth="2.4"
              strokeDasharray="600" strokeDashoffset={active ? 0 : 600}
              style={{ transition: 'stroke-dashoffset 1100ms cubic-bezier(.16,.84,.44,1) 250ms' }} />
            {/* end-cap dot for revenue */}
            {(() => {
              const last = pts(revenue).slice(-1)[0];
              return active && <circle cx={last[0]} cy={last[1]} r="3.5" fill="var(--color-success)" stroke="white" strokeWidth="2" />;
            })()}
            {/* x labels (sparse) */}
            {['J','M','M','J','S','N'].map((lbl, j) => (
              <text key={j} x={padL + ((j * 2) / 11) * (w - padL - padR)} y={h - 4}
                fontSize="9" fill="#94A3B8" textAnchor="middle"
                fontFamily="var(--font-body)">{lbl}</text>
            ))}
          </svg>
        </div>

        {/* Crossover callout */}
        <div style={{
          padding: '10px 14px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          borderTop: '1px solid var(--color-slate-100)',
        }}>
          <span style={{
            width: 26, height: 26, borderRadius: 8,
            background: 'var(--color-success-subtle)',
            color: 'var(--color-success-text)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/></svg>
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-success-text)' }}>Crossed into profit in July</div>
            <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 1 }}>EW revenue overtook claim costs · sustained for 6 months</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  MarketerAudienceMock, WarrantyInboxMock, BusinessOwnerPLMock,
});
