import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CollectionItem } from '../data/config';
import { useBrand } from '../context/BrandContext';

interface CollectionsProps {
  onSelectCollection: (id: 'all' | 'satin' | 'comfort' | 'mother-daughter') => void;
}

export const Collections: React.FC<CollectionsProps> = ({ onSelectCollection }) => {
  const { config } = useBrand();

  const handleExplore = (id: 'satin' | 'comfort' | 'mother-daughter') => {
    onSelectCollection(id);
    const element = document.getElementById('featured');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#EDE3D5]/40 border-y border-[#C49A6C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#C49A6C] font-semibold mb-2">
              Curated Silhouettes
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3B1E14] tracking-tight">
              The Collections
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#603A2A] leading-relaxed">
            From midnight liquid satins to morning modal knits and cherished family pairs, discover our three foundational sleepwear capsules.
          </p>
        </div>

        {/* 3-Column Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {config.collections.map((col) => (
            <div
              key={col.id}
              className="group flex flex-col bg-[#F8F3EC] border border-[#C49A6C]/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container with subtle zoom */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE3D5]">
                {col.image ? (
                  <img
                    src={col.image}
                    alt={col.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-[#22120C]/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Overlaid Title on Mobile/Hover */}
                <div className="absolute bottom-4 left-4 right-4 text-[#F8F3EC]">
                  <span className="text-[10px] uppercase tracking-widest text-[#DFC4A5]">
                    {col.pieceCount}
                  </span>
                  <h3 className="text-2xl font-serif text-[#F8F3EC] leading-snug">
                    {col.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-serif italic text-[#C49A6C] mb-2">
                    {col.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#603A2A] leading-relaxed line-clamp-3">
                    {col.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C49A6C]/20 flex items-center justify-between">
                  <button
                    onClick={() => handleExplore(col.id)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#3B1E14] group-hover:text-[#C49A6C] transition-colors"
                  >
                    <span>Explore Collection</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <span className="text-[11px] text-[#603A2A]/60 uppercase tracking-wider font-sans">
                    View Pieces
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
