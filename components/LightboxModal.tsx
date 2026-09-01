'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../lib/types';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Dark Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl transition-opacity animate-in fade-in"
      />

      {/* Lightbox Container */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        {/* Top Controls */}
        <div className="w-full flex items-center justify-between text-zinc-400 mb-3 px-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <ImageIcon className="w-4 h-4" />
            <span>{currentIndex + 1} / {items.length}</span>
            <span className="text-zinc-500">•</span>
            <span className="uppercase text-zinc-300 font-semibold">{currentItem.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Stage */}
        <div className="relative w-full aspect-[16/10] max-h-[72vh] rounded-2xl overflow-hidden bg-black border border-amber-500/20 shadow-2xl flex items-center justify-center">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full object-contain"
          />

          {/* Previous Arrow */}
          <button
            onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-amber-500 hover:text-zinc-950 text-white backdrop-blur-md transition-all border border-zinc-700/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={() => onNavigate((currentIndex + 1) % items.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-amber-500 hover:text-zinc-950 text-white backdrop-blur-md transition-all border border-zinc-700/50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption & Description */}
        <div className="w-full mt-4 text-center max-w-2xl px-4">
          <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-cream-100">
            {currentItem.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
            {currentItem.description}
          </p>
        </div>
      </div>
    </div>
  );
}
