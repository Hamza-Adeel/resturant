'use client';

import React, { useState, useMemo } from 'react';
import { Camera, Sparkles, Eye, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../../lib/data/gallery';
import LightboxModal from '../../components/LightboxModal';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Food' | 'Interior' | 'Events' | 'Kitchen'>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ['All', 'Food', 'Interior', 'Events', 'Kitchen'] as const;

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
          Visual Splendor
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-cream-100">
          The Mirch Masala Gallery
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          A visual glimpse into our sizzling woks, roaring clay tandoors, elegant Maharaja dining hall, and vibrant private banquets.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-red-700 to-amber-600 text-cream-100 shadow-lg border border-amber-400/40'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-cream-100 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {cat} {cat === 'All' ? `(${GALLERY_ITEMS.length})` : ''}
          </button>
        ))}
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative rounded-3xl overflow-hidden bg-[#121217] border border-zinc-800/80 hover:border-amber-500/50 shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-4 left-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                  {item.category}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/70 text-amber-300 backdrop-blur-md">
                <Eye className="w-4 h-4" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                <h3 className="text-base font-serif-luxury font-bold text-cream-100 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      <LightboxModal
        items={filteredItems}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setCurrentIndex(newIdx)}
      />
    </div>
  );
}
