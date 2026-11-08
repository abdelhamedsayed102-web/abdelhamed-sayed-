import React, { useState } from 'react';
import { X, MessageCircle, ShieldCheck, Sparkles, Check, ChevronRight, ExternalLink } from 'lucide-react';
import { Product, getWhatsAppOrderUrl, getWhatsAppDirectInquiryUrl } from '../data/config';
import { useBrand } from '../context/BrandContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenSizeGuide,
}) => {
  const { config } = useBrand();
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0]?.name || '');
  const [activeImage, setActiveImage] = useState<string>(product?.image || '');

  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0]?.name || '');
      setActiveImage(product.image);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const displayImage = activeImage || product.image || null;
  const currentPriceText = product.formattedPrice || `${product.priceEGP.toLocaleString('en-US')} EGP`;

  // Pre-formatted WhatsApp Direct Inquiry URL including product name and current price
  const whatsappDirectLink = getWhatsAppDirectInquiryUrl({
    productName: product.name,
    price: currentPriceText,
    size: selectedSize,
    color: selectedColor,
    phone: config.contact.whatsappNumber,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-[#F8F3EC] border border-[#C49A6C]/30 shadow-2xl rounded-none my-8 overflow-hidden text-[#3B1E14]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 p-2 text-[#3B1E14] bg-[#F8F3EC]/80 backdrop-blur hover:bg-[#3B1E14] hover:text-[#F8F3EC] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Gallery */}
          <div className="relative bg-[#EDE3D5]/40 flex flex-col justify-between p-4 sm:p-6 border-b md:border-b-0 md:border-r border-[#C49A6C]/20">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDE3D5]/60 flex items-center justify-center">
              {displayImage && (
                <img
                  src={displayImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-500"
                />
              )}
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#3B1E14] text-[#F8F3EC] text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail switcher if multiple images */}
            {Boolean(product.secondaryImage) && (
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setActiveImage(product.image)}
                  className={`w-14 h-18 overflow-hidden border transition-all ${
                    displayImage === product.image ? 'border-[#3B1E14] scale-95' : 'border-transparent opacity-60'
                  }`}
                >
                  {product.image && (
                    <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`w-14 h-18 overflow-hidden border transition-all ${
                    displayImage === product.secondaryImage ? 'border-[#3B1E14] scale-95' : 'border-transparent opacity-60'
                  }`}
                >
                  {product.secondaryImage && (
                    <img src={product.secondaryImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Details & WhatsApp Order Flow */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Collection */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C49A6C] font-medium mb-1">
                <span>{product.collectionName}</span>
                <span aria-hidden="true">·</span>
                <span>Egyptian Atelier</span>
              </div>

              {/* Title & Price */}
              <h2 id="product-modal-title" className="text-2xl sm:text-3xl font-serif text-[#3B1E14] tracking-tight leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-[#603A2A] mt-1 italic">{product.subtitle}</p>

              <div className="mt-4 flex items-baseline gap-3 pb-4 border-b border-[#C49A6C]/20">
                <span className="text-2xl font-serif text-[#3B1E14] font-semibold tabular-nums">
                  {product.formattedPrice}
                </span>
                <span className="text-xs text-[#603A2A]/80 tracking-wide uppercase">
                  (Includes Handcrafting in Cairo)
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#603A2A] leading-relaxed">
                {product.description}
              </p>

              {/* Color selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase tracking-wider text-[#3B1E14] font-medium">
                    Shade: <span className="text-[#603A2A] font-normal">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select shade ${color.name}`}
                      className={`relative w-7 h-7 rounded-full border transition-all ${
                        selectedColor === color.name
                          ? 'border-[#3B1E14] ring-2 ring-[#C49A6C] scale-110'
                          : 'border-[#3B1E14]/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <Check className={`w-3.5 h-3.5 mx-auto ${color.hex === '#F8F3EC' ? 'text-[#3B1E14]' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase tracking-wider text-[#3B1E14] font-medium">Select Size</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-[#C49A6C] hover:text-[#3B1E14] underline text-xs transition-colors"
                  >
                    View Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 text-xs font-medium border transition-all ${
                        selectedSize === size
                          ? 'bg-[#3B1E14] text-[#F8F3EC] border-[#3B1E14]'
                          : 'bg-transparent text-[#3B1E14] border-[#C49A6C]/40 hover:border-[#3B1E14]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric details */}
              <div className="mt-5 p-3 bg-[#EDE3D5]/40 border border-[#C49A6C]/20 text-[11px] text-[#603A2A]">
                <strong className="text-[#3B1E14] uppercase tracking-wider block mb-1">Fabric & Sensation:</strong>
                <p>{product.fabricDetails}</p>
              </div>
            </div>

            {/* Actions & WhatsApp Direct Inquiry Feature */}
            <div className="mt-6 pt-4 border-t border-[#C49A6C]/20 space-y-3">
              {/* Pre-formatted message details summary */}
              <div className="p-3 bg-[#EDE3D5]/40 border border-[#C49A6C]/25 text-[11px] text-[#603A2A] space-y-1">
                <div className="flex items-center justify-between font-medium text-[#3B1E14]">
                  <span className="flex items-center gap-1.5 text-xs text-[#3B1E14]">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-semibold">WhatsApp Direct Inquiry</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#C49A6C] font-semibold">
                    Pre-formatted Message
                  </span>
                </div>
                <div className="text-[11px] text-[#603A2A] flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                  <span>Item: <strong className="text-[#3B1E14]">{product.name}</strong></span>
                  <span>·</span>
                  <span>Price: <strong className="text-[#3B1E14] tabular-nums">{currentPriceText}</strong></span>
                  <span>·</span>
                  <span>Size: <strong className="text-[#3B1E14]">{selectedSize || 'Standard'}</strong></span>
                </div>
              </div>

              {/* Main WhatsApp Direct Link Button */}
              <a
                href={whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#3B1E14] text-[#F8F3EC] hover:bg-[#22120C] transition-all text-xs uppercase tracking-widest font-semibold group shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#C49A6C] group-hover:scale-110 transition-transform" />
                <span>Inquire via WhatsApp Direct ({currentPriceText})</span>
              </a>

              {/* Secondary direct chat link */}
              <div className="text-center pt-1">
                <a
                  href={whatsappDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#603A2A] hover:text-[#3B1E14] transition-colors border-b border-transparent hover:border-[#3B1E14]"
                >
                  <span>Click to open pre-filled WhatsApp chat with our Cairo atelier</span>
                  <ExternalLink className="w-3 h-3 text-[#C49A6C]" />
                </a>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#603A2A] px-1 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C49A6C]" />
                  Cash on Delivery & Courier in Egypt
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" />
                  Complimentary Gift Box
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
