/* global React, CustomerProfileCard, TicketsCard, AnalyticsCard */
const { useEffect, useState, useRef } = React;

/* Rotating word for "Warranty Management Software for ___" */
function RotatingWord({ words, color = 'var(--color-brand-blue)' }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="rotating-word" style={{ position: 'relative', display: 'inline-block', verticalAlign: 'baseline' }}>
      {/* invisible widest word reserves width */}
      <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>{words.reduce((a, b) => a.length > b.length ? a : b)}</span>
      {words.map((w, idx) => (
        <span key={w} style={{
          position: 'absolute', left: 0, top: 0,
          color, whiteSpace: 'nowrap',
          opacity: i === idx ? 1 : 0,
          transform: i === idx ? 'translateY(0)' : (idx === ((i - 1 + words.length) % words.length) ? 'translateY(-24%)' : 'translateY(24%)'),
          transition: 'opacity 500ms ease, transform 600ms cubic-bezier(.16,.84,.44,1)',
          letterSpacing: '-2px',
        }}>{w}</span>
      ))}
    </span>
  );
}

/* Active-cycler hook */
function useCycle(n, ms) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((v) => (v + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms]);
  return [active, setActive];
}

function HeroHeadline({ words, fontSize }) {
  return (
    <h1 className="display-heading hero-headline" style={{ fontSize }}>
      <span className="hero-headline-line">
        The most <span className="em">seamless</span>
      </span>
      <span className="hero-headline-line hero-headline-line--product">
        warranty management software
      </span>
      <span className="hero-headline-line hero-headline-line--for">
        for <RotatingWord words={words} />
      </span>
    </h1>
  );
}

/* ───────────── Hero A: Stacked portal cards ───────────── */
function HeroStacked() {
  const [active, setActive] = useCycle(3, 4200);
  const cards = [
    { Comp: CustomerProfileCard, key: 'profile', label: 'Customer profile' },
    { Comp: TicketsCard,         key: 'tickets', label: 'Claims & tickets' },
    { Comp: AnalyticsCard,       key: 'analytics', label: 'Analytics' },
  ];
  // ordered positions: back, mid, front (active is front)
  const order = [
    (active + 2) % 3, // back
    (active + 1) % 3, // mid
    active,           // front
  ];
  // Cascade DOWN and slightly RIGHT — keeps everything inside the column.
  // Front card sits at top-left of the stage, back cards peek out behind it.
  const positions = [
    { x: 36, y: 56, rot: 0,  scale: 0.93, op: 0.55, blur: 1.2, z: 1 }, // back
    { x: 18, y: 28, rot: 0,  scale: 0.97, op: 0.85, blur: 0,   z: 2 }, // mid
    { x: 0,  y: 0,  rot: 0,  scale: 1,    op: 1,    blur: 0,   z: 3 }, // front
  ];
  return (
    <div style={{
      position: 'relative',
      width: 380, height: 520,
      margin: '0 auto',
    }}>
      {/* Glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: '-40px',
        background: 'radial-gradient(closest-side, rgba(36,55,246,0.18), transparent 70%)',
        filter: 'blur(24px)', pointerEvents: 'none', zIndex: 0,
      }} />
      {order.map((cardIdx, layerIdx) => {
        const pos = positions[layerIdx];
        const isFront = layerIdx === 2;
        const C = cards[cardIdx].Comp;
        return (
          <div key={cards[cardIdx].key}
            onClick={() => setActive(cardIdx)}
            style={{
              position: 'absolute', top: pos.y + 60, left: pos.x,
              transform: `scale(${pos.scale})`,
              transformOrigin: 'top left',
              opacity: pos.op,
              filter: pos.blur ? `blur(${pos.blur}px)` : 'none',
              zIndex: pos.z,
              transition: 'all 700ms cubic-bezier(.16,.84,.44,1)',
              cursor: isFront ? 'default' : 'pointer',
            }}>
            <C active={isFront} />
          </div>
        );
      })}
      {/* Dots indicator below the stack */}
      <div style={{
        position: 'absolute', left: 0, top: 'calc(100% + 4px)',
        display: 'flex', gap: 8, zIndex: 4,
      }}>
        {cards.map((c, i) => (
          <button key={c.key} onClick={() => setActive(i)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
              padding: '6px 10px', borderRadius: 999,
              background: active === i ? '#0F172A' : 'white',
              color: active === i ? 'white' : '#475569',
              border: active === i ? '1px solid #0F172A' : '1px solid var(--border-default)',
              transition: 'all 220ms ease',
              cursor: 'pointer',
            }}>
            <span style={{
              width: 6, height: 6, borderRadius: 999,
              background: active === i ? '#2BC840' : '#CBD5E1',
            }} />
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Hero B: Centered with floating product window ───────────── */
function HeroCentered() {
  const [active, setActive] = useCycle(3, 4200);
  const cards = [AnalyticsCard, TicketsCard, CustomerProfileCard];
  const labels = ['Analytics', 'Claims Management', 'Customers'];
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 980, margin: '0 auto', paddingTop: 8 }}>
      {/* tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
        {labels.map((l, i) => (
          <button key={l} onClick={() => setActive(i)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
              padding: '8px 14px', borderRadius: 999,
              background: active === i ? '#EEF0FE' : 'white',
              color: active === i ? 'var(--color-brand-blue-deep)' : '#475569',
              border: active === i ? '1px solid #C7CDFD' : '1px solid var(--border-default)',
              transition: 'all 220ms ease',
            }}>{l}</button>
        ))}
      </div>
      {/* glow */}
      <div aria-hidden style={{
        position: 'absolute', left: '50%', top: '20%', width: '110%', height: '90%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(closest-side, rgba(36,55,246,0.20), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      {/* Stage that swaps cards */}
      <div style={{ position: 'relative', minHeight: 520, display: 'flex', justifyContent: 'center' }}>
        {cards.map((C, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
            opacity: active === i ? 1 : 0,
            transform: active === i ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(12px)',
            transition: 'opacity 500ms ease, transform 600ms cubic-bezier(.16,.84,.44,1)',
            pointerEvents: active === i ? 'auto' : 'none',
          }}>
            <div style={{ transform: 'scale(1.2)', transformOrigin: 'top center' }}>
              <C active={active === i} />
            </div>
          </div>
        ))}
      </div>
      {/* Floating chips */}
      <div aria-hidden style={{
        position: 'absolute', left: -10, top: 200,
        background: 'white', border: '1px solid var(--border-default)',
        borderRadius: 10, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: 'var(--shadow-lg)', fontSize: 12,
        animation: 'floaty 6s ease-in-out infinite',
      }}>
        <span style={{ width: 26, height: 26, borderRadius: 8, background: '#DCFCE7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 11, color: '#64748B' }}>Claim resolved</div>
          <div style={{ fontSize: 12.5, color: '#1E293B', fontWeight: 500 }}>TS89260 · 18m</div>
        </div>
      </div>
      <div aria-hidden style={{
        position: 'absolute', right: -10, top: 320,
        background: 'white', border: '1px solid var(--border-default)',
        borderRadius: 10, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: 'var(--shadow-lg)', fontSize: 12,
        animation: 'floaty 5s ease-in-out infinite reverse',
      }}>
        <span style={{ width: 26, height: 26, borderRadius: 8, background: '#EEF0FE', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-blue-deep)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-6M19 8v6"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 11, color: '#64748B' }}>New registration</div>
          <div style={{ fontSize: 12.5, color: '#1E293B', fontWeight: 500 }}>via Shopify · just now</div>
        </div>
      </div>
    </div>
  );
}

/* Hero shell — picks variation based on tweak */
function Hero({ variation }) {
  const headlineWords = ['D2C brands', 'Shopify merchants', 'retailers', 'manufacturers'];
  if (variation === 'centered') {
    return (
      <section className="hero hero--centered">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto', paddingBottom: 36 }}>
            <div className="pill" style={{ marginBottom: 22 }}>
              <span className="dot">★</span> Rated 4.8 on G2 · 5★ on Shopify
            </div>
            <HeroHeadline words={headlineWords} fontSize="clamp(32px, 4.6vw, 56px)" />
            <p style={{ fontSize: 18, color: 'var(--fg-secondary)', maxWidth: 680, margin: '22px auto 0', lineHeight: 1.55 }}>
              Warranty registration, claims management, and tracking unified in one system. Reduce the cost of every claim, manage warranties with more control, and turn the warranty lifecycle into a new revenue channel.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 30 }}>
              <a className="btn btn-primary btn-lg" href={window.DYRECT_URLS.contact}>
                Book a demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a className="btn btn-secondary btn-lg" href="#platform">
                See the platform
              </a>
            </div>
          </div>
          <HeroCentered />
        </div>
      </section>
    );
  }
  // Stacked (default)
  return (
    <section className="hero hero--stacked">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 460px', gap: 56, alignItems: 'start' }} className="hero-grid">
          <div>
            <div className="pill" style={{ marginBottom: 22 }}>
              <span className="dot">★</span> Rated 4.8 on G2 · 5★ on Shopify
            </div>
            <HeroHeadline words={headlineWords} fontSize="clamp(30px, 4vw, 48px)" />
            <p style={{ fontSize: 18, color: 'var(--fg-secondary)', maxWidth: 560, marginTop: 22, lineHeight: 1.55 }}>
              Warranty registration, claims management, and tracking unified in one system. Reduce the cost of every claim, manage warranties with more control, and turn the warranty lifecycle into a new revenue channel.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
              <a className="btn btn-primary btn-lg" href={window.DYRECT_URLS.contact}>
                Book a demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a className="btn btn-secondary btn-lg" href="#platform">
                See the platform
              </a>
            </div>
            <div className="hero-trust-row" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginTop: 36, color: '#64748B', fontSize: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ABE52" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Live in &lt;30 min
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ABE52" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                No developer needed
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ABE52" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Built for Shopify
              </div>
            </div>
          </div>
          <HeroStacked />
        </div>
      </div>
    </section>
  );
}

(function injectHeroStyles(){
  if (document.getElementById('hero-styles')) return;
  const s = document.createElement('style');
  s.id = 'hero-styles';
  s.textContent = `
    .hero {
      position: relative;
      padding: 56px 0 96px;
      overflow: hidden;
      background:
        radial-gradient(800px 400px at 85% 8%, rgba(36,55,246,0.06), transparent 70%),
        radial-gradient(600px 300px at 8% 12%, rgba(36,55,246,0.04), transparent 70%),
        linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(closest-side, black 30%, transparent 75%);
      -webkit-mask-image: radial-gradient(closest-side, black 30%, transparent 75%);
      pointer-events: none;
    }
    .hero .container { position: relative; z-index: 1; }
    .hero--centered { padding-top: 64px; padding-bottom: 64px; }
    @keyframes floaty {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    @media (max-width: 980px) {
      .hero-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
    }
  `;
  document.head.appendChild(s);
})();

Object.assign(window, { Hero, RotatingWord });
