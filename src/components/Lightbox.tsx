import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LookbookImage } from '../data/config';

interface LightboxProps {
  images: LookbookImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#22120C]/95 backdrop-blur-md p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Top Bar with Brand Tag & Close */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between text-[#F8F3EC]/80 z-20">
        <div className="text-xs uppercase tracking-widest text-[#C49A6C]">
          NOOM WEAR Lookbook · {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          aria-label="Close lookbook"
          className="p-2 text-[#F8F3EC]/80 hover:text-[#F8F3EC] bg-white/10 hover:bg-white/20 transition-all rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation - Left */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          aria-label="Previous photograph"
          className="absolute left-2 sm:left-6 z-20 p-3 text-[#F8F3EC]/80 hover:text-[#F8F3EC] bg-white/5 hover:bg-white/15 transition-all rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Image View */}
      <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center">
        {currentImage.image ? (
          <img
            src={currentImage.image}
            alt={currentImage.title}
            referrerPolicy="no-referrer"
            className="max-h-[72vh] max-w-full object-contain shadow-2xl border border-[#C49A6C]/20"
          />
        ) : null}

        {/* Caption */}
        <div className="mt-4 text-center max-w-lg">
          <h4 className="text-xl sm:text-2xl font-serif text-[#F8F3EC] tracking-wide">
            {currentImage.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#DFC4A5] mt-1 font-sans">
            {currentImage.subtitle}
          </p>
        </div>
      </div>

      {/* Navigation - Right */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          aria-label="Next photograph"
          className="absolute right-2 sm:right-6 z-20 p-3 text-[#F8F3EC]/80 hover:text-[#F8F3EC] bg-white/5 hover:bg-white/15 transition-all rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
