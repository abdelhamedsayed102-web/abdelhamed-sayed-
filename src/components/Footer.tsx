import React from 'react';
import { ArrowUp, Instagram, MessageCircle, Mail, Settings } from 'lucide-react';
import { getWhatsAppGeneralUrl } from '../data/config';
import { useBrand } from '../context/BrandContext';

interface FooterProps {
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide }) => {
  const { config, setIsDashboardOpen } = useBrand();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#22120C] text-[#F8F3EC] border-t border-[#C49A6C]/25 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#C49A6C]/20">
          {/* Brand Identity & Tagline */}
          <div className="md:col-span-5 space-y-5">
            <a href="#" className="inline-block" aria-label="NOOM WEAR Home">
              {config.assets.logo ? (
                <img
                  src={config.assets.logo}
                  alt={config.name}
                  className="h-12 w-auto object-contain brightness-110"
                />
              ) : null}
            </a>
            <div className="text-xl font-serif italic text-[#C49A6C] tracking-wide">
              {config.tagline}
            </div>
            <p className="text-xs sm:text-sm text-[#DFC4A5]/75 leading-relaxed max-w-sm font-light">
              Egyptian luxury sleepwear and private loungewear. Tailored with quiet refinement, whisper-soft satins, and intentional comfort in Cairo.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={config.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NOOM WEAR Instagram"
                className="p-2.5 bg-white/5 hover:bg-white/10 text-[#DFC4A5] hover:text-[#F8F3EC] transition-all rounded-full border border-[#C49A6C]/20"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppGeneralUrl(config.contact.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NOOM WEAR WhatsApp"
                className="p-2.5 bg-white/5 hover:bg-white/10 text-[#DFC4A5] hover:text-[#F8F3EC] transition-all rounded-full border border-[#C49A6C]/20"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${config.contact.email}`}
                aria-label="Email Concierge"
                className="p-2.5 bg-white/5 hover:bg-white/10 text-[#DFC4A5] hover:text-[#F8F3EC] transition-all rounded-full border border-[#C49A6C]/20"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C49A6C] font-semibold">
              The Collections
            </div>
            <ul className="space-y-2.5 text-xs text-[#DFC4A5]/80 font-light">
              <li>
                <a href="#featured" className="hover:text-[#F8F3EC] transition-colors">
                  Satin Collection
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-[#F8F3EC] transition-colors">
                  Everyday Comfort Co-ords
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-[#F8F3EC] transition-colors">
                  Mother & Daughter Matching Sets
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-[#F8F3EC] transition-colors">
                  Kimono Satin Robes
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-[#F8F3EC] transition-colors">
                  Editorial Lookbook
                </a>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C49A6C] font-semibold">
              Client Care & Bespoke
            </div>
            <ul className="space-y-2.5 text-xs text-[#DFC4A5]/80 font-light">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-[#F8F3EC] transition-colors text-left"
                >
                  Size & Measurement Guide
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#F8F3EC] transition-colors">
                  Bridal Trousseau & Custom Sizing
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppGeneralUrl(config.contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F8F3EC] transition-colors"
                >
                  WhatsApp Direct: {config.contact.whatsappDisplay || config.contact.whatsappNumber}
                </a>
              </li>
              <li>
                <span className="text-[#DFC4A5]/60 block mt-1">
                  Atelier: {config.contact.showroomLocation}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DFC4A5]/60 font-light">
          <div>
            © {new Date().getFullYear()} {config.name}. All rights reserved. {config.origin}.
          </div>

          <div className="flex items-center gap-6">
            <span className="italic font-serif text-[#C49A6C]">Comfort Meets Elegance</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-[#DFC4A5] hover:text-[#F8F3EC] transition-colors uppercase tracking-wider"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
