import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const measurements = [
    { size: 'XS (34-36)', bustCm: '82 - 86', waistCm: '62 - 66', hipsCm: '88 - 92', bustIn: '32 - 34', waistIn: '24 - 26', hipsIn: '34 - 36' },
    { size: 'S (36-38)', bustCm: '86 - 90', waistCm: '66 - 70', hipsCm: '92 - 96', bustIn: '34 - 35.5', waistIn: '26 - 27.5', hipsIn: '36 - 38' },
    { size: 'M (38-40)', bustCm: '90 - 96', waistCm: '70 - 76', hipsCm: '96 - 102', bustIn: '35.5 - 38', waistIn: '27.5 - 30', hipsIn: '38 - 40' },
    { size: 'L (40-42)', bustCm: '96 - 102', waistCm: '76 - 82', hipsCm: '102 - 108', bustIn: '38 - 40', waistIn: '30 - 32.5', hipsIn: '40 - 42.5' },
    { size: 'XL (42-44)', bustCm: '102 - 108', waistCm: '82 - 90', hipsCm: '108 - 116', bustIn: '40 - 42.5', waistIn: '32.5 - 35.5', hipsIn: '42.5 - 45.5' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
    >
      <div className="relative w-full max-w-2xl bg-[#F8F3EC] border border-[#C49A6C]/30 shadow-2xl p-6 sm:p-8 rounded-none overflow-hidden text-[#3B1E14]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#C49A6C]/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C49A6C] font-medium">Fit & Silhouette</span>
            <h3 id="size-guide-title" className="text-2xl sm:text-3xl font-serif text-[#3B1E14] mt-1">
              Size & Measurement Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="p-2 text-[#603A2A] hover:text-[#3B1E14] hover:bg-[#EDE3D5]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <p className="text-sm text-[#603A2A]">
            All NOOM WEAR silhouettes are tailored with relaxed ease for nocturnal comfort.
          </p>
          <div className="flex items-center gap-1 p-1 bg-[#EDE3D5] rounded-none">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs uppercase tracking-wider transition-all ${
                unit === 'cm'
                  ? 'bg-[#3B1E14] text-[#F8F3EC]'
                  : 'text-[#603A2A] hover:text-[#3B1E14]'
              }`}
            >
              Centimeters
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs uppercase tracking-wider transition-all ${
                unit === 'in'
                  ? 'bg-[#3B1E14] text-[#F8F3EC]'
                  : 'text-[#603A2A] hover:text-[#3B1E14]'
              }`}
            >
              Inches
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#C49A6C]/30 text-xs uppercase tracking-wider text-[#603A2A]">
                <th className="py-3 px-3 font-semibold">Size (EU)</th>
                <th className="py-3 px-3 font-semibold">Bust ({unit})</th>
                <th className="py-3 px-3 font-semibold">Waist ({unit})</th>
                <th className="py-3 px-3 font-semibold">Hips ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C49A6C]/15 font-sans">
              {measurements.map((row) => (
                <tr key={row.size} className="hover:bg-[#EDE3D5]/40 transition-colors">
                  <td className="py-3 px-3 font-medium text-[#3B1E14]">{row.size}</td>
                  <td className="py-3 px-3 text-[#603A2A] tabular-nums">
                    {unit === 'cm' ? row.bustCm : row.bustIn}
                  </td>
                  <td className="py-3 px-3 text-[#603A2A] tabular-nums">
                    {unit === 'cm' ? row.waistCm : row.waistIn}
                  </td>
                  <td className="py-3 px-3 text-[#603A2A] tabular-nums">
                    {unit === 'cm' ? row.hipsCm : row.hipsIn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fitting advice */}
        <div className="mt-6 pt-4 border-t border-[#C49A6C]/20 bg-[#EDE3D5]/30 p-4">
          <div className="flex items-start gap-3">
            <Ruler className="w-4 h-4 text-[#C49A6C] shrink-0 mt-0.5" />
            <p className="text-xs text-[#603A2A] leading-relaxed">
              <strong className="text-[#3B1E14] font-medium">Bespoke Fit Advice:</strong> If you are between sizes, we recommend sizing up for a more fluid, draped silhouette that moves effortlessly with your body during sleep. For custom inquiries, contact our Cairo atelier via WhatsApp.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#3B1E14] text-[#F8F3EC] text-xs uppercase tracking-widest hover:bg-[#603A2A] transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
