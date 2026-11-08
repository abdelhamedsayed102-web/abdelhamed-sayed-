/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Lookbook } from './components/Lookbook';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { Lightbox } from './components/Lightbox';
import { AdminPortal } from './components/AdminPortal';
import { BrandProvider, useBrand } from './context/BrandContext';
import { Product } from './data/config';

function AppContent() {
  const { config } = useBrand();

  // Track if current route is the secret Admin Portal (#admin or /admin)
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.hash === '#admin' ||
      window.location.pathname === '/admin' ||
      window.location.search.includes('admin=true')
    );
  });

  useEffect(() => {
    const checkRoute = () => {
      const active =
        window.location.hash === '#admin' ||
        window.location.pathname === '/admin' ||
        window.location.search.includes('admin=true');
      setIsAdminView(active);
    };

    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);

    // Discreet shortcut for the brand owner: Ctrl+Shift+A (or Cmd+Shift+A)
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (window.location.hash === '#admin') {
          window.location.hash = '';
          setIsAdminView(false);
        } else {
          window.location.hash = '#admin';
          setIsAdminView(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  // State for Product Quick View Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // State for Size Guide Modal
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // State for Lookbook Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // State for Collection Filtering
  const [activeFilter, setActiveFilter] = useState<'all' | 'satin' | 'comfort' | 'mother-daughter'>('all');

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProduct = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleSelectCollection = (id: 'all' | 'satin' | 'comfort' | 'mother-daughter') => {
    setActiveFilter(id);
  };

  const handleExitAdmin = () => {
    window.location.hash = '';
    try {
      if (window.location.pathname === '/admin') {
        window.history.pushState(null, '', '/');
      }
    } catch (_) {}
    setIsAdminView(false);
  };

  // If visiting the secret Admin route (#admin or /admin), render the protected Admin Portal
  if (isAdminView) {
    return <AdminPortal onBackToStore={handleExitAdmin} />;
  }

  // Otherwise, render the pristine, luxury boutique for clients (Zero admin clutter visible)
  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#3B1E14] flex flex-col font-sans selection:bg-[#C49A6C]/30 selection:text-[#3B1E14]">
      {/* 1. Sticky Navigation Header (Client Facing Only) */}
      <Header />

      <main className="flex-grow">
        {/* 2. Full Width Cinematic Hero */}
        <Hero />

        {/* 3. Collections Overview Cards */}
        <Collections onSelectCollection={handleSelectCollection} />

        {/* 5. Featured Pieces (With explicit EGP placeholder prices & WhatsApp orders) */}
        <FeaturedProducts
          selectedFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onOpenProduct={handleOpenProduct}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        />

        {/* 6. Asymmetrical Lookbook Grid */}
        <Lookbook onOpenLightbox={handleOpenLightbox} />

        {/* 8. Instagram & Contact Section with Editable Details */}
        <ContactSection />
      </main>

      {/* 9. Premium Footer (Client Facing Only) */}
      <Footer onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />

      {/* Modals & Overlays */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProduct}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <Lightbox
        images={config.lookbook}
        currentIndex={lightboxIndex}
        onClose={handleCloseLightbox}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <AppContent />
    </BrandProvider>
  );
}
