import React from 'react';
import { MessageCircle, Eye, Ruler } from 'lucide-react';
import { Product, getWhatsAppOrderUrl } from '../data/config';
import { useBrand } from '../context/BrandContext';

interface FeaturedProductsProps {
  selectedFilter: 'all' | 'satin' | 'comfort' | 'mother-daughter';
  onFilterChange: (filter: 'all' | 'satin' | 'comfort' | 'mother-daughter') => void;
  onOpenProduct: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  selectedFilter,
  onFilterChange,
  onOpenProduct,
  onOpenSizeGuide,
}) => {
  const { config } = useBrand();

  const filterOptions = [
    { id: 'all', label: 'All Pieces' },
    { id: 'satin', label: 'Satin Collection' },
    { id: 'comfort', label: 'Everyday Comfort' },
    { id: 'mother-daughter', label: 'Mother & Daughter' },
  ] as const;

  const filteredProducts =
    selectedFilter === 'all'
      ? config.products
      : config.products.filter((p) => p.collectionId === selectedFilter);

  return (
    <section id="featured" className="py-24 sm:py-32 bg-[#F8F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Filter Segmented Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#C49A6C] font-semibold mb-2">
              Signature Garments
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3B1E14] tracking-tight">
              Featured Pieces
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSizeGuide}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#603A2A] hover:text-[#3B1E14] border-b border-[#C49A6C]/50 hover:border-[#3B1E14] pb-0.5 transition-colors"
            >
              <Ruler className="w-3.5 h-3.5 text-[#C49A6C]" />
              <span>Size Guide</span>
            </button>
          </div>
        </div>

        {/* Website Category Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 mb-12 border-b border-[#C49A6C]/25 pb-4">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onFilterChange(opt.id)}
              className={`text-xs uppercase tracking-[0.2em] transition-all relative pb-2 ${
                selectedFilter === opt.id
                  ? 'text-[#3B1E14] font-semibold after:content-[""] after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#3B1E14]'
                  : 'text-[#603A2A]/70 hover:text-[#3B1E14] font-medium'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((product) => {
            const defaultWhatsAppUrl = getWhatsAppOrderUrl(
              product.name,
              product.sizes[0],
              config.contact.whatsappNumber
            );

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#F8F3EC] border border-[#C49A6C]/25 hover:border-[#3B1E14]/40 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {/* Image Showcase */}
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDE3D5]/50 cursor-pointer"
                  onClick={() => onOpenProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-[#3B1E14] text-[#F8F3EC] text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium">
                      {product.badge}
                    </div>
                  )}

                  {/* Quick View Overlay on Desktop Hover */}
                  <div className="absolute inset-0 bg-[#22120C]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProduct(product);
                      }}
                      className="px-5 py-2.5 bg-[#F8F3EC] text-[#3B1E14] hover:bg-[#3B1E14] hover:text-[#F8F3EC] transition-colors text-xs uppercase tracking-widest font-medium shadow-md flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4 text-[#C49A6C]" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Collection Tag */}
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#C49A6C] font-medium mb-1">
                      <span>{product.collectionName}</span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onOpenProduct(product)}
                      className="text-xl font-serif text-[#3B1E14] group-hover:text-[#603A2A] cursor-pointer transition-colors leading-snug"
                    >
                      {product.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-[#603A2A]/80 mt-1 line-clamp-1 italic">
                      {product.subtitle}
                    </p>

                    {/* Available Sizes */}
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#603A2A]">
                      <span className="uppercase tracking-wider text-[#3B1E14]/70">Sizes:</span>
                      <span className="font-sans font-medium">{product.sizes.join(' · ')}</span>
                    </div>

                    {/* Color Swatches */}
                    <div className="mt-2.5 flex items-center gap-1.5">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          title={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-[#3B1E14]/20 inline-block shadow-2xs"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="mt-6 pt-4 border-t border-[#C49A6C]/20 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-serif font-semibold text-[#3B1E14] tabular-nums">
                        {product.formattedPrice}
                      </div>
                      <div className="text-[10px] text-[#603A2A]/70 uppercase tracking-wider">
                        Tailored in Egypt
                      </div>
                    </div>

                    <a
                      href={defaultWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#3B1E14] text-[#F8F3EC] hover:bg-[#603A2A] transition-colors text-xs uppercase tracking-wider font-medium shrink-0"
                      title="Order or inquire on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#C49A6C]" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
