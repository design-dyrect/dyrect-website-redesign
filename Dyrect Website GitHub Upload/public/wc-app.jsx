/* global React, ReactDOM,
   SiteNav, SiteFooter, LogoCloud, Stats, Testimonials, Integrations,
   BlogSection, FAQ, FinalCTA, Capabilities,
   WcHero, WcPlatformIntro, WcFeatures,
   WC_CAP_ITEMS, WC_STATS, WC_TESTIMONIALS_DATA, WC_FAQS,
   TweaksPanel, useTweaks, TweakSection, TweakToggle, TweakColor */
const { useEffect: wcAUE } = React;

/* Reveal-on-scroll observer (same behavior as home page) */
function wcUseReveal() {
  wcAUE(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function WcApp() {
  const [tweaks, setTweak] = useTweaks(window.WC_TWEAK_DEFAULTS);
  wcUseReveal();

  wcAUE(() => {
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
      <SiteNav activeProduct="warranty-claims" />
      <main>
        <WcHero />
        {tweaks.show_logos        && <LogoCloud />}
        {tweaks.show_platform     && <WcPlatformIntro />}
        {tweaks.show_features     && <WcFeatures />}
        {tweaks.show_capabilities && (
          <Capabilities
            eyebrow="Capabilities"
            title={<><span className="em">Everything in place</span> for better warranty service</>}
            subtitle="Hundreds of brands rely on Dyrect to manage warranty claims, repairs, and service requests with better visibility and control."
            items={WC_CAP_ITEMS}
            cols={3}
          />
        )}
        {tweaks.show_stats        && <Stats stats={WC_STATS} />}
        {tweaks.show_testimonials && <Testimonials {...WC_TESTIMONIALS_DATA} />}
        {tweaks.show_integrations && <Integrations />}
        {tweaks.show_blog         && <BlogSection />}
        {tweaks.show_faq          && (
          <FAQ
            faqs={WC_FAQS}
            title="Warranty Claims Management FAQs"
            subtitle="Answers for service teams planning claim workflows, ticket routing, eligibility validation, and post-service analytics."
          />
        )}
        {tweaks.show_cta          && (
          <FinalCTA
            title="Ready to resolve claims faster?"
            body={<>Join 100s of successful global brands who've transformed their post-sale operations with Dyrect. <strong style={{ color: 'white' }}>Cut resolution time, win back time for your team</strong>, and keep customers updated end-to-end.</>}
            primaryLabel="Get a demo"
            secondaryLabel="Install on Shopify"
          />
        )}
      </main>
      <SiteFooter activeProduct="warranty-claims" />

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

ReactDOM.createRoot(document.getElementById('root')).render(<WcApp />);
