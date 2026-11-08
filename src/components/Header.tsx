import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Settings } from 'lucide-react';
import { getWhatsAppGeneralUrl } from '../data/config';
import { useBrand } from '../context/BrandContext';

export const Header: React.FC = () => {
  const { config, setIsDashboardOpen } = useBrand();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Featured Pieces', href: '#featured' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F3EC]/95 backdrop-blur-md shadow-sm border-b border-[#C49A6C]/25 py-2.5'
            : 'bg-[#F8F3EC]/85 backdrop-blur-sm border-b border-[#C49A6C]/15 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Authentic Uploaded Logo */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3B1E14]"
            aria-label="NOOM WEAR Home"
          >
            {config.assets.logo ? (
              <img
                src={config.assets.logo}
                alt="NOOM WEAR - Comfort Meets Elegance"
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 hover:scale-105 mix-blend-multiply bg-transparent"
              />
            ) : null}
          </a>

          {/* Zone 2: Navigation Links (Website Header Menu) */}
          <nav className="hidden sm:flex items-center gap-5 md:gap-8 text-xs uppercase tracking-[0.18em] font-medium text-[#603A2A]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#3B1E14] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C49A6C] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Responsive Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={getWhatsAppGeneralUrl(config.contact.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs uppercase tracking-widest text-[#3B1E14] bg-transparent border border-[#3B1E14] hover:bg-[#3B1E14] hover:text-[#F8F3EC] transition-all whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#C49A6C]" />
              <span className="bg-transparent">WhatsApp Concierge</span>
            </a>

            {/* Compact Website Dropdown Toggle for narrow windows */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 text-[#3B1E14] sm:hidden hover:bg-[#EDE3D5] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Website Dropdown Menu for narrow browser widths */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#C49A6C]/20 bg-[#F8F3EC]/98 shadow-lg backdrop-blur-md px-6 py-5">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-wider text-[#3B1E14] hover:text-[#C49A6C] py-1 border-b border-[#C49A6C]/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-3 text-[11px] text-[#603A2A]/70 flex items-center justify-between border-t border-[#C49A6C]/20">
              <span>Cairo Atelier · Egyptian Luxury</span>
              <span className="font-serif italic text-[#C49A6C]">Comfort Meets Elegance</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
