/* global React, ReactDOM, SiteNav, Hero, LogoCloud, PlatformOverview, Products, Personas, Capabilities, Stats, Testimonials, ShopifySection, Integrations, BlogSection, FAQ, FinalCTA, SiteFooter, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect, TweakToggle, TweakColor */
const { useEffect, useState, useRef } = React;

/* Reveal-on-scroll observer */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ───────────── App ───────────── */
function App() {
  const [tweaks, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  useReveal();

  // Apply density via CSS var
  useEffect(() => {
    document.documentElement.style.setProperty('--section-pad', tweaks.density === 'airy' ? '120px' : tweaks.density === 'compact' ? '64px' : '96px');
  }, [tweaks.density]);

  // Apply primary color
  useEffect(() => {
    document.documentElement.style.setProperty('--color-brand-blue', tweaks.primaryColor);
    // derive hover (darker) and subtle (lighter) crudely
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
      <SiteNav />
      <main>
        <Hero variation={tweaks.heroVariation} />
        {tweaks.show_logos && <LogoCloud />}
        {tweaks.show_platform && <PlatformOverview />}
        {tweaks.show_products && <Products />}
        {tweaks.show_personas && <Personas />}
        {tweaks.show_capabilities && <Capabilities />}
        {tweaks.show_stats && <Stats />}
        {tweaks.show_testimonials && <Testimonials />}
        {tweaks.show_shopify && <ShopifySection />}
        {tweaks.show_integrations && <Integrations />}
        {tweaks.show_blog && <BlogSection />}
        {tweaks.show_faq && <FAQ />}
        {tweaks.show_cta && <FinalCTA />}
      </main>
      <SiteFooter />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero">
          <TweakRadio label="Layout"
            value={tweaks.heroVariation}
            onChange={(v) => setTweak('heroVariation', v)}
            options={[
              { value: 'stacked',  label: 'Stacked cards' },
              { value: 'centered', label: 'Centered' },
            ]} />
        </TweakSection>

        <TweakSection label="Style">
          <TweakColor label="Primary color"
            value={tweaks.primaryColor}
            onChange={(v) => setTweak('primaryColor', v)}
            options={['#2437F6', '#0F1FB8', '#7C3AED', '#0EA5E9']} />
          <TweakRadio label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'default', label: 'Default' },
              { value: 'airy',    label: 'Airy' },
            ]} />
        </TweakSection>

        <TweakSection label="Sections">
          <TweakToggle label="Logo cloud"     value={tweaks.show_logos}        onChange={(v)=>setTweak('show_logos', v)} />
          <TweakToggle label="Platform (Before / After)" value={tweaks.show_platform} onChange={(v)=>setTweak('show_platform', v)} />
          <TweakToggle label="Products tabs"  value={tweaks.show_products}     onChange={(v)=>setTweak('show_products', v)} />
          <TweakToggle label="Personas"       value={tweaks.show_personas}     onChange={(v)=>setTweak('show_personas', v)} />
          <TweakToggle label="Capabilities"   value={tweaks.show_capabilities} onChange={(v)=>setTweak('show_capabilities', v)} />
          <TweakToggle label="Stats banner"   value={tweaks.show_stats}        onChange={(v)=>setTweak('show_stats', v)} />
          <TweakToggle label="Testimonials"   value={tweaks.show_testimonials} onChange={(v)=>setTweak('show_testimonials', v)} />
          <TweakToggle label="Shopify"        value={tweaks.show_shopify}      onChange={(v)=>setTweak('show_shopify', v)} />
          <TweakToggle label="Integrations"   value={tweaks.show_integrations} onChange={(v)=>setTweak('show_integrations', v)} />
          <TweakToggle label="Blog"           value={tweaks.show_blog}         onChange={(v)=>setTweak('show_blog', v)} />
          <TweakToggle label="FAQ"            value={tweaks.show_faq}          onChange={(v)=>setTweak('show_faq', v)} />
          <TweakToggle label="Final CTA"      value={tweaks.show_cta}          onChange={(v)=>setTweak('show_cta', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
