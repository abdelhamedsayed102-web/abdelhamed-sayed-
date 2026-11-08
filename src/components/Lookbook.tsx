import React from 'react';
import { Maximize2 } from 'lucide-react';
import { useBrand } from '../context/BrandContext';

interface LookbookProps {
  onOpenLightbox: (index: number) => void;
}

export const Lookbook: React.FC<LookbookProps> = ({ onOpenLightbox }) => {
  const { config } = useBrand();

  return (
    <section id="lookbook" className="py-24 sm:py-32 bg-[#F8F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#C49A6C] font-semibold mb-2">
              Visual Narrative
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3B1E14] tracking-tight">
              The Lookbook
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#603A2A] leading-relaxed">
            Quiet mornings in Cairo, balmy evenings, and private sanctuary moments. Click any image to view in high-resolution detail.
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {config.lookbook.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(index)}
              className={`group relative overflow-hidden bg-[#EDE3D5] cursor-pointer border border-[#C49A6C]/25 shadow-sm hover:shadow-xl transition-all duration-500 ${
                index === 0
                  ? 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto'
                  : index === 3
                  ? 'md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto'
                  : 'aspect-[4/3]'
              }`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#22120C]/80 via-[#22120C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <span className="p-2 bg-white/20 backdrop-blur text-[#F8F3EC] rounded-full">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#DFC4A5]">
                    NOOM WEAR Look {index + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#F8F3EC]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F8F3EC]/80 mt-1 font-sans">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Subtle Permanent Corner Tag on Mobile */}
              <div className="md:hidden absolute bottom-3 left-3 bg-[#22120C]/80 px-2.5 py-1 text-[10px] text-[#F8F3EC] font-serif">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
