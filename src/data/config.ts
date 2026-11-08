/**
 * NOOM WEAR - Central Editable Brand & Product Configuration
 * All product information, prices (EGP), contact details, and social links can be customized here.
 */

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  collectionId: 'satin' | 'comfort' | 'mother-daughter';
  collectionName: string;
  priceEGP: number;
  formattedPrice: string;
  badge?: string;
  description: string;
  fabricDetails: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  image: string;
  secondaryImage?: string;
}

export interface CollectionItem {
  id: 'satin' | 'comfort' | 'mother-daughter';
  title: string;
  tagline: string;
  description: string;
  image: string;
  pieceCount: string;
}

export interface LookbookImage {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  span?: string; // CSS grid span class
}

export interface BrandContact {
  whatsappNumber: string;
  whatsappDisplay: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  showroomLocation: string;
  workingHours: string;
}

export interface BrandIntro {
  kicker: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  stat1: { number: string; label: string };
  stat2: { number: string; label: string };
  stat3: { number: string; label: string };
}

export interface BrandConfig {
  name: string;
  tagline: string;
  origin: string;
  year: string;
  assets: {
    logo: string;
    heroCover: string;
    labelDetail: string;
  };
  contact: BrandContact;
  intro: BrandIntro;
  collections: CollectionItem[];
  products: Product[];
  lookbook: LookbookImage[];
  philosophy: {
    number: string;
    title: string;
    description: string;
  }[];
}

export const BRAND_CONFIG: BrandConfig = {
  name: 'NOOM WEAR',
  tagline: 'Comfort Meets Elegance',
  origin: 'Handcrafted in Cairo, Egypt',
  year: '2026',

  // Official Assets
  assets: {
    logo: '/assets/aistudio/NOOM_Wear_Luxury_Logo_22232bf3.png',
    heroCover: '/assets/aistudio/6a09512a-7dd1-4e63-8ae2-090d94bc7c55_e0afc663.png',
    labelDetail: '/assets/aistudio/______________________________________78cd9762.png',
  },

  // Editable Contact & Socials (Clearly labeled placeholders)
  contact: {
    whatsappNumber: '+201000000000', // EDITABLE: e.g. +201012345678
    whatsappDisplay: '+20 (100) 000-0000',
    instagramHandle: '@noomwear.eg', // EDITABLE
    instagramUrl: 'https://instagram.com/noomwear.eg', // EDITABLE
    email: 'concierge@noomwear.com', // EDITABLE
    showroomLocation: 'Zamalek, Cairo, Egypt (By Private Appointment)',
    workingHours: 'Sunday – Thursday: 10:00 AM – 8:00 PM CLT',
  },

  // Brand Story Highlights
  intro: {
    kicker: 'Quiet Luxury Sleepwear',
    heading: 'Where Sensorial Comfort Meets Unspoken Elegance',
    paragraph1:
      'Born in Cairo, NOOM WEAR redefines evening wear and private living with pieces designed to transition seamlessly from peaceful slumber to quiet mornings. We believe bedtime should be an indulgent ritual—not an afterthought.',
    paragraph2:
      'Every garment is shaped with fluid architectural silhouettes, whisper-soft satins, and breathable natural fibers tailored to the warmth of Mediterranean and Middle Eastern evenings. Finished with meticulous French seams and mother-of-pearl accents, NOOM WEAR is an homage to timeless feminine poise.',
    stat1: { number: '100%', label: 'Egyptian Tailoring Care' },
    stat2: { number: 'Fluid', label: 'Featherlight Satin Drape' },
    stat3: { number: 'Bespoke', label: 'Made with Artisanal Precision' },
  },

  // Collections Overview
  collections: [
    {
      id: 'satin',
      title: 'Satin Collection',
      tagline: 'Lustrous Drapes & Fluid Silhouettes',
      description:
        'Lustrous, whisper-weight liquid satin pyjama sets and kimono robes with hand-piped lapels, designed for serene evenings and luminous mornings.',
      image: '/src/assets/images/satin_collection_1794093327291.jpg',
      pieceCount: '5 Signature Designs',
    },
    {
      id: 'comfort',
      title: 'Everyday Comfort',
      tagline: 'Ultra-Soft Modal & Breathable Knits',
      description:
        'Effortless relaxed co-ord sets cut from airy, cloud-like modal blends. Feather-light textures crafted for lounging, reading, and deep restorative sleep.',
      image: '/src/assets/images/everyday_comfort_1794093327378.jpg',
      pieceCount: '4 Essential Cuts',
    },
    {
      id: 'mother-daughter',
      title: 'Mother & Daughter',
      tagline: 'Shared Moments of Gentle Warmth',
      description:
        'Coordinating luxury loungewear designed to celebrate the timeless bond between mothers and daughters. Elegant, gentle on delicate skin, and deeply cherished.',
      image: '/src/assets/images/mother_daughter_1794093328941.jpg',
      pieceCount: '3 Matching Duos',
    },
  ] as CollectionItem[],

  // Featured Pieces (Editable product data with explicit EGP placeholder pricing)
  products: [
    {
      id: 'signature-satin-set-chocolate',
      name: 'The Signature Satin Pyjama Set',
      subtitle: 'Classic Notch Collar with Champagne Hand-Piping',
      collectionId: 'satin',
      collectionName: 'Satin Collection',
      priceEGP: 2450,
      formattedPrice: '2,450 EGP',
      badge: 'Bestseller',
      description:
        'Our crown piece. Crafted with liquid-touch chocolate brown satin, featuring relaxed tailored trousers with an elasticized drawstring waist and a relaxed button-front top finished with contrasting champagne silk piping.',
      fabricDetails: '95% Premium Lustrous Satin Silk Blend, 5% Elastane for fluid stretch',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Rich Chocolate', hex: '#3B1E14' },
        { name: 'Champagne Gold', hex: '#C49A6C' },
        { name: 'Warm Cream', hex: '#F8F3EC' },
      ],
      image: '/src/assets/images/satin_collection_1794093327291.jpg',
      secondaryImage: '/assets/aistudio/6a09512a-7dd1-4e63-8ae2-090d94bc7c55_e0afc663.png',
    },
    {
      id: 'monarch-satin-robe',
      name: 'Monarch Floor-Length Satin Robe',
      subtitle: 'Wide Kimono Sleeve with Detachable Waist Tie',
      collectionId: 'satin',
      collectionName: 'Satin Collection',
      priceEGP: 2850,
      formattedPrice: '2,850 EGP',
      badge: 'Limited Edition',
      description:
        'An opulent outerwear-inspired robe designed to drape effortlessly across the body. Features wide Japanese kimono sleeves, deep inset pockets, and a wide structural belt.',
      fabricDetails: 'Substantial high-density satin with a luminous pearlescent sheen',
      sizes: ['S/M', 'L/XL'],
      colors: [
        { name: 'Deep Espresso', hex: '#2A160F' },
        { name: 'Warm Cream', hex: '#F8F3EC' },
      ],
      image: '/src/assets/images/product_satin_robe_1794093329518.jpg',
      secondaryImage: '/src/assets/images/satin_collection_1794093327291.jpg',
    },
    {
      id: 'cloud-modal-coord',
      name: 'Cloud-Knit Everyday Co-ord',
      subtitle: 'Bespoke Crewneck & Relaxed Wide-Leg Trousers',
      collectionId: 'comfort',
      collectionName: 'Everyday Comfort',
      priceEGP: 1850,
      formattedPrice: '1,850 EGP',
      badge: 'Essential',
      description:
        'Engineered for sublime day-to-night relaxation. Breathable brushed micro-modal feels cool to the touch and drapes gently without clinging.',
      fabricDetails: '92% Micro-Modal, 8% Spandex. Hypoallergenic and ultra-breathable',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Warm Cream', hex: '#F8F3EC' },
        { name: 'Muted Sand', hex: '#EDE3D5' },
        { name: 'Soft Cocoa', hex: '#603A2A' },
      ],
      image: '/src/assets/images/everyday_comfort_1794093327378.jpg',
    },
    {
      id: 'solace-slip-dress',
      name: 'Solace Bias-Cut Satin Slip',
      subtitle: 'Adjustable Delicate Straps & V-Neckline',
      collectionId: 'satin',
      collectionName: 'Satin Collection',
      priceEGP: 1950,
      formattedPrice: '1,950 EGP',
      description:
        'A sensual, minimalist slip dress cut on the bias to gently hug natural contours without restriction. Perfect for balmy evenings and layered mornings under our robes.',
      fabricDetails: 'Lustrous bias-cut satin with hand-rolled hems',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [
        { name: 'Champagne Gold', hex: '#C49A6C' },
        { name: 'Chocolate Noir', hex: '#3B1E14' },
      ],
      image: '/src/assets/images/lookbook_morning_light_1794093328945.jpg',
    },
    {
      id: 'mother-daughter-duo',
      name: 'Elysian Mother & Daughter Pajama Duo',
      subtitle: 'Matching Pajama Sets Tailored for Both Generations',
      collectionId: 'mother-daughter',
      collectionName: 'Mother & Daughter',
      priceEGP: 3400,
      formattedPrice: '3,400 EGP',
      badge: 'Gift Set',
      description:
        'A lovingly curated two-piece pair containing one adult sleepwear set and one coordinated junior loungewear set. Softened textures designed specifically for sensitive skin.',
      fabricDetails: 'Ultra-soft washed cotton-modal blend with delicate lace trimming',
      sizes: ['Mother: S, M, L, XL', 'Daughter: 2Y-12Y'],
      colors: [
        { name: 'Champagne Cream', hex: '#F8F3EC' },
        { name: 'Blush Sand', hex: '#E7D8C8' },
      ],
      image: '/src/assets/images/mother_daughter_1794093328941.jpg',
    },
  ] as Product[],

  // Lookbook Gallery
  lookbook: [
    {
      id: 'look-1',
      title: 'Morning Solitude',
      subtitle: 'The Solace Slip in Champagne Gold',
      image: '/src/assets/images/lookbook_morning_light_1794093328945.jpg',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      id: 'look-2',
      title: 'Sanctuary of Rest',
      subtitle: 'The Signature Satin Pyjama Set in Chocolate',
      image: '/src/assets/images/satin_collection_1794093327291.jpg',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 'look-3',
      title: 'Gentle Mornings',
      subtitle: 'Cloud-Knit Everyday Co-ord in Warm Cream',
      image: '/src/assets/images/everyday_comfort_1794093327378.jpg',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 'look-4',
      title: 'Tender Ties',
      subtitle: 'Elysian Mother & Daughter Matching Set',
      image: '/src/assets/images/mother_daughter_1794093328941.jpg',
      span: 'md:col-span-1 md:row-span-2',
    },
    {
      id: 'look-5',
      title: 'The Robe Silhouette',
      subtitle: 'Monarch Kimono Robe in Deep Satin Sheen',
      image: '/src/assets/images/product_satin_robe_1794093329518.jpg',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 'look-6',
      title: 'Artisan Finish',
      subtitle: 'Embossed leather insignia and luxury satin weave',
      image: '/assets/aistudio/______________________________________78cd9762.png',
      span: 'md:col-span-1 md:row-span-1',
    },
  ] as LookbookImage[],

  // Brand Philosophy
  philosophy: [
    {
      number: '01',
      title: 'Sensorial Tactility',
      description:
        'We believe fabric should be an embrace. Every textile is selected for how it caresses the skin—breathable, frictionless, and cool in Egyptian warmth.',
    },
    {
      number: '02',
      title: 'Architectural Drape',
      description:
        'Sleepwear should never feel restrictive or shapeless. Our cuts honor feminine proportions with fluid lines that look as poised at breakfast as they do at dusk.',
    },
    {
      number: '03',
      title: 'Mindful Tailoring',
      description:
        'Made with reverence for Cairo’s rich textile legacy. We craft in small, conscious batches to maintain impeccable French seams, smooth hems, and lasting elegance.',
    },
  ],
};

// Helper to generate WhatsApp order URLs
export function getWhatsAppOrderUrl(
  productName: string,
  size?: string,
  phone?: string,
  price?: string | number
): string {
  const targetPhone = phone || BRAND_CONFIG.contact.whatsappNumber;
  const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
  const sizeText = size ? ` in size ${size}` : '';
  const priceText = price
    ? ` (Current Price: ${typeof price === 'number' ? `${price.toLocaleString('en-US')} EGP` : price})`
    : '';
  const message = `Hello NOOM WEAR, I would like to inquire about ordering "${productName}"${priceText}${sizeText} (listed on your website). Could you please assist me with availability and delivery in Egypt?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

// Dedicated helper for direct WhatsApp inquiry with product name, current price, size, and color
export function getWhatsAppDirectInquiryUrl(params: {
  productName: string;
  price: string | number;
  size?: string;
  color?: string;
  phone?: string;
}): string {
  const targetPhone = params.phone || BRAND_CONFIG.contact.whatsappNumber;
  const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
  const formattedPrice =
    typeof params.price === 'number'
      ? `${params.price.toLocaleString('en-US')} EGP`
      : params.price;

  const sizeLine = params.size ? `\n• Selected Size: ${params.size}` : '';
  const colorLine = params.color ? `\n• Selected Shade: ${params.color}` : '';

  const message = `Hello NOOM WEAR Atelier,

I am inquiring directly regarding:
• Product: "${params.productName}"
• Current Price: ${formattedPrice}${sizeLine}${colorLine}

Could you please assist me with availability, delivery timing across Egypt, and payment options? Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

// Helper to generate general WhatsApp inquiry URL
export function getWhatsAppGeneralUrl(phone?: string): string {
  const targetPhone = phone || BRAND_CONFIG.contact.whatsappNumber;
  const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
  const message = `Hello NOOM WEAR Concierge, I would like to inquire about your luxury sleepwear collections.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
