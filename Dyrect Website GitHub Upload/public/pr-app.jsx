/* global React, ReactDOM,
   SiteNav, SiteFooter, LogoCloud, Stats, Testimonials, Integrations,
   BlogSection, FAQ, FinalCTA,
   PrHero, PrPlatformIntro, PrFeatures,
   PR_CAP_ITEMS, PR_STATS, PR_TESTIMONIALS_DATA, PR_FAQS,
   Capabilities,
   TweaksPanel, useTweaks, TweakSection, TweakToggle, TweakColor */
const { useEffect: prAUE } = React;

/* Reveal-on-scroll observer (same behavior as home page) */
function prUseReveal() {
  prAUE(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function PrApp() {
  const [tweaks, setTweak] = useTweaks(window.PR_TWEAK_DEFAULTS);
  prUseReveal();

  prAUE(() => {
    document.documentElement.style.setProperty('--color-brand-blue', tweaks.primaryColor);
    const hex = tweaks.primaryColor.replace('#', '');
    const r = parseInt(hex.slice(0,2),16), g=parseInt(hex.slice(2,4),16), b=parseInt(hex.slice(4,6),16);
    const dark = `rgb(${Math.max(0,r-22)}, ${Math.max(0,g-22)}, ${Math.max(0,b-22)})`;
    const deep = `rgb(${Math.max(0,r-50)}, ${Math.max(0,g-50)}, ${Math.max(0,b-50)})`;
    document.documentElement.style.setProperty('--color-brand-blue-hover', dark);
    document.documentElement.style.setProperty('--color-brand-blue-deep', deep);
    document.documentElement.style.setProperty('--color-brand-blue-subtle', `rgba(${r},${g},${b},0.07)`);
    document.documentElement.style.setProperty('--color-brand-blue-light', `rgba(${r},${g},${b},0.14)`);
  }, [tweaks.primaryColor]);

  return (
    <>
      <SiteNav activeProduct="product-registration" />
      <main>
        <PrHero />
        {tweaks.show_logos        && <LogoCloud />}
        {tweaks.show_platform     && <PrPlatformIntro />}
        {tweaks.show_features     && <PrFeatures />}
        {tweaks.show_capabilities && (
          <Capabilities
            eyebrow="Capabilities"
            title={<><span className="em">It's a no-brainer.</span> The complete toolkit for modern product registration.</>}
            subtitle="Product Registration Software for brands of all sizes. Hundreds of brands have uplifted customer satisfaction and revenue with Dyrect."
            items={PR_CAP_ITEMS}
            cols={3}
          />
        )}
        {tweaks.show_stats        && <Stats stats={PR_STATS} />}
        {tweaks.show_testimonials && <Testimonials {...PR_TESTIMONIALS_DATA} />}
        {tweaks.show_integrations && <Integrations />}
        {tweaks.show_blog         && <BlogSection />}
        {tweaks.show_faq          && (
          <FAQ
            faqs={PR_FAQS}
            title="Product Registration Software FAQs"
            subtitle="Answers for teams planning digital product registration, QR activation, warranty activation, and first-party customer data capture."
          />
        )}
        {tweaks.show_cta          && (
          <FinalCTA
            title="Ready for a profitable tomorrow?"
            body={<>Join 100s of successful global brands who've transformed their post-purchase engagement with Dyrect. <strong style={{ color: 'white' }}>Start today for a profitable tomorrow</strong>, where solution meets success.</>}
            primaryLabel="Get a demo"
            secondaryLabel="Install on Shopify"
          />
        )}
      </main>
      <SiteFooter activeProduct="product-registration" />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Style">
          <TweakColor label="Primary color"
            value={tweaks.primaryColor}
            onChange={(v) => setTweak('primaryColor', v)}
            options={['#2437F6', '#0F1FB8', '#7C3AED', '#0EA5E9']} />
        </TweakSection>
        <TweakSection label="Sections">
          <TweakToggle label="Logo cloud"   value={tweaks.show_logos}        onChange={(v)=>setTweak('show_logos', v)} />
          <TweakToggle label="Platform"     value={tweaks.show_platform}     onChange={(v)=>setTweak('show_platform', v)} />
          <TweakToggle label="Feature tabs" value={tweaks.show_features}     onChange={(v)=>setTweak('show_features', v)} />
          <TweakToggle label="Capabilities" value={tweaks.show_capabilities} onChange={(v)=>setTweak('show_capabilities', v)} />
          <TweakToggle label="Stats"        value={tweaks.show_stats}        onChange={(v)=>setTweak('show_stats', v)} />
          <TweakToggle label="Testimonials" value={tweaks.show_testimonials} onChange={(v)=>setTweak('show_testimonials', v)} />
          <TweakToggle label="Integrations" value={tweaks.show_integrations} onChange={(v)=>setTweak('show_integrations', v)} />
          <TweakToggle label="Blog"         value={tweaks.show_blog}         onChange={(v)=>setTweak('show_blog', v)} />
          <TweakToggle label="FAQ"          value={tweaks.show_faq}          onChange={(v)=>setTweak('show_faq', v)} />
          <TweakToggle label="Final CTA"    value={tweaks.show_cta}          onChange={(v)=>setTweak('show_cta', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrApp />);
