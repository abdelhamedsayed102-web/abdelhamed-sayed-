import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useBrand } from '../context/BrandContext';

export const Hero: React.FC = () => {
  const { config } = useBrand();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#22120C]">
      {/* Background Cinematic Cover Photo */}
      <div className="absolute inset-0 z-0">
        {config.assets.heroCover ? (
          <img
            src={config.assets.heroCover}
            alt="NOOM WEAR Luxury Satin Sleepwear and Handcrafted Label"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 animate-[subtle-zoom_20s_ease-out_infinite_alternate]"
          />
        ) : null}
        {/* Subtle Luxury Gradient Overlay (Chocolate / Charcoal) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#22120C] via-[#22120C]/60 to-[#22120C]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#22120C]/30 to-[#22120C]/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28 flex flex-col items-center">
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#DFC4A5] mb-4 sm:mb-6">
          <span>{config.origin}</span>
          <span aria-hidden="true">·</span>
          <span>Cairo Atelier</span>
        </div>

        {/* Tagline Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#F8F3EC] tracking-tight leading-[1.08] max-w-4xl text-balance">
          {config.tagline}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#F8F3EC]/85 font-light max-w-2xl leading-relaxed text-balance">
          Liquid-touch satins, breathable natural knits, and timeless silhouettes tailored for restful nights and effortless morning rituals.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#collections"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C49A6C] text-[#22120C] hover:bg-[#DFC4A5] transition-all text-xs uppercase tracking-[0.2em] font-semibold group shadow-lg"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#lookbook"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-[#F8F3EC]/40 text-[#F8F3EC] hover:bg-[#F8F3EC]/10 hover:border-[#F8F3EC] transition-all text-xs uppercase tracking-[0.2em] font-medium"
          >
            View Lookbook
          </a>
        </div>

        {/* Trust Points */}
        <div className="mt-14 pt-8 border-t border-[#C49A6C]/20 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-xs tracking-wider uppercase text-[#DFC4A5]/90">
          <div>
            <span className="block font-serif text-lg text-[#F8F3EC] normal-case tracking-normal">Fluid Satin Drape</span>
            Whisper-weight comfort
          </div>
          <div>
            <span className="block font-serif text-lg text-[#F8F3EC] normal-case tracking-normal">Egyptian Tailoring</span>
            Hand-finished French seams
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block font-serif text-lg text-[#F8F3EC] normal-case tracking-normal">Cairo Concierge</span>
            WhatsApp order & courier
          </div>
        </div>
      </div>

      {/* Down Scroll Anchor */}
      <a
        href="#collections"
        aria-label="Scroll to collections"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#DFC4A5] hover:text-[#F8F3EC] transition-colors p-2 flex flex-col items-center gap-1 group"
      >
        <span className="text-[10px] uppercase tracking-widest text-[#DFC4A5]/70 group-hover:text-[#DFC4A5]">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
