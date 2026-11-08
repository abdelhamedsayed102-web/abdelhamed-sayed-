import React, { useState } from 'react';
import { Instagram, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { getWhatsAppGeneralUrl } from '../data/config';
import { useBrand } from '../context/BrandContext';

export const ContactSection: React.FC = () => {
  const { config } = useBrand();
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    interest: 'Satin Collection',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const forwardToWhatsApp = () => {
    const text = `Hello NOOM WEAR, my name is ${formData.name || 'a customer'}. I am inquiring regarding ${formData.interest}. Message: ${formData.message || 'Please contact me.'}`;
    const cleanPhone = config.contact.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#EDE3D5]/30 border-t border-[#C49A6C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C49A6C] font-semibold mb-2">
            Private Concierge & Orders
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3B1E14] tracking-tight">
            Connect With NOOM WEAR
          </h2>
          <p className="mt-4 text-sm text-[#603A2A] leading-relaxed">
            Our atelier concierge is at your service for private sizing consultations, bridal inquiries, and bespoke gifting across Egypt.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Interactive Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Reach & Instagram Spotlight */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-[#3B1E14]">
                Atelier Inquiries
              </h3>
              <p className="text-sm text-[#603A2A] leading-relaxed">
                Whether selecting a personal sleepwear capsule or arranging a gift for someone special, we invite you to connect directly with our Cairo team.
              </p>

              {/* Contact Channels */}
              <div className="space-y-4 pt-2">
                <a
                  href={getWhatsAppGeneralUrl(config.contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-[#F8F3EC] border border-[#C49A6C]/25 hover:border-[#3B1E14] transition-all group"
                >
                  <div className="p-2.5 bg-[#3B1E14] text-[#C49A6C] group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#C49A6C] font-medium">
                      Instant WhatsApp Concierge
                    </div>
                    <div className="text-sm font-semibold text-[#3B1E14] mt-0.5">
                      {config.contact.whatsappDisplay || config.contact.whatsappNumber}
                    </div>
                    <div className="text-xs text-[#603A2A]/70">
                      Average reply time: under 1 hour
                    </div>
                  </div>
                </a>

                <a
                  href={config.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-[#F8F3EC] border border-[#C49A6C]/25 hover:border-[#3B1E14] transition-all group"
                >
                  <div className="p-2.5 bg-[#3B1E14] text-[#C49A6C] group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#C49A6C] font-medium">
                      Instagram Stories & Releases
                    </div>
                    <div className="text-sm font-semibold text-[#3B1E14] mt-0.5">
                      {config.contact.instagramHandle}
                    </div>
                    <div className="text-xs text-[#603A2A]/70">
                      Follow our editorial campaigns & drops
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-[#F8F3EC] border border-[#C49A6C]/25">
                  <div className="p-2.5 bg-[#3B1E14] text-[#C49A6C]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#C49A6C] font-medium">
                      Atelier Location
                    </div>
                    <div className="text-sm font-medium text-[#3B1E14] mt-0.5">
                      {config.contact.showroomLocation}
                    </div>
                    <div className="text-xs text-[#603A2A]/70 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {config.contact.workingHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Editorial Note */}
            <div className="p-5 bg-[#3B1E14] text-[#F8F3EC] text-xs">
              <span className="text-[#C49A6C] font-serif italic text-sm block mb-1">
                Tag your evening ritual:
              </span>
              <p className="text-[#DFC4A5]">
                Share your NOOM WEAR moments using <strong className="text-[#F8F3EC]">#NoomMoments</strong> to be featured in our seasonal journal.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Order Form */}
          <div className="lg:col-span-7 bg-[#F8F3EC] border border-[#C49A6C]/30 p-8 sm:p-10 shadow-sm">
            <h3 className="text-2xl font-serif text-[#3B1E14] mb-2">
              Send a Concierge Note
            </h3>
            <p className="text-xs sm:text-sm text-[#603A2A] mb-8">
              Fill out your request below and our team will get in touch directly via WhatsApp or phone.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C49A6C] mx-auto animate-bounce" />
                <h4 className="font-serif text-2xl text-[#3B1E14]">Thank You, {formData.name || 'Valued Client'}</h4>
                <p className="text-sm text-[#603A2A] max-w-md mx-auto">
                  Your inquiry regarding <strong className="text-[#3B1E14]">{formData.interest}</strong> has been received by our Cairo atelier concierge.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={forwardToWhatsApp}
                    className="px-6 py-3 bg-[#3B1E14] text-[#F8F3EC] text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-[#603A2A] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#C49A6C]" />
                    <span>Open in WhatsApp Now</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 border border-[#3B1E14]/40 text-[#3B1E14] text-xs uppercase tracking-widest hover:bg-[#EDE3D5] transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Layla Mansour"
                    className="w-full px-4 py-3 bg-white border border-[#C49A6C]/30 text-sm text-[#3B1E14] placeholder-[#603A2A]/40 focus:outline-none focus:border-[#3B1E14] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contactInfo" className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1.5">
                    WhatsApp Number or Email *
                  </label>
                  <input
                    id="contactInfo"
                    type="text"
                    required
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    placeholder="e.g. +20 100 123 4567 or email@domain.com"
                    className="w-full px-4 py-3 bg-white border border-[#C49A6C]/30 text-sm text-[#3B1E14] placeholder-[#603A2A]/40 focus:outline-none focus:border-[#3B1E14] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1.5">
                    Collection of Interest
                  </label>
                  <select
                    id="interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#C49A6C]/30 text-sm text-[#3B1E14] focus:outline-none focus:border-[#3B1E14] transition-colors"
                  >
                    <option value="Satin Collection">Satin Collection (Pyjamas & Robes)</option>
                    <option value="Everyday Comfort">Everyday Comfort (Modal Knits)</option>
                    <option value="Mother & Daughter">Mother & Daughter Matching Sets</option>
                    <option value="Bridal Trousseau">Bridal Trousseau & Custom Monogramming</option>
                    <option value="General Inquiry">General Atelier Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1.5">
                    Your Message or Sizing Question
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the sizes you are looking for, color preferences, or delivery city in Egypt..."
                    className="w-full px-4 py-3 bg-white border border-[#C49A6C]/30 text-sm text-[#3B1E14] placeholder-[#603A2A]/40 focus:outline-none focus:border-[#3B1E14] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#3B1E14] text-[#F8F3EC] hover:bg-[#603A2A] transition-colors text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#C49A6C]" />
                  <span>Submit Inquiry to Concierge</span>
                </button>

                <p className="text-[11px] text-[#603A2A]/70 text-center">
                  Cash on Delivery and courier options available throughout Cairo, Giza, Alexandria and all Egypt governorates.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
