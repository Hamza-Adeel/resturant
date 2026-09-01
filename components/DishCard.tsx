'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Plus, Sparkles, Flame, Eye, Leaf } from 'lucide-react';
import { MenuItem } from '../lib/types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ItemDetailModal from './ItemDetailModal';

interface DishCardProps {
  dish: MenuItem;
}

export default function DishCard({ dish }: DishCardProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const favorited = isFavorite(dish.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addItem(dish, 1, dish.spiceLevel);
    setTimeout(() => setIsAdding(false), 500);
  };

  const renderSpiceIndicator = (level: number) => {
    if (level === 0) return null;
    return (
      <div
        className="flex items-center gap-0.5 text-xs text-red-400 font-semibold bg-red-950/80 px-2 py-0.5 rounded-full border border-red-500/30 backdrop-blur-sm"
        title={`Spice Level: ${level} of 3`}
      >
        <span>🌶️</span>
        <span className="text-[10px] tracking-tight">{level === 1 ? 'Mild' : level === 2 ? 'Spicy' : 'Extra Hot'}</span>
      </div>
    );
  };

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="group relative bg-[#121217] rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-amber-500/40 shadow-lg hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
      >
        {/* Top Image & Floating Badges */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          {/* Subtle Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            {dish.isChefSpecial && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-zinc-950 shadow-md">
                <Sparkles className="w-3 h-3 fill-zinc-950" />
                <span>Chef&apos;s Special</span>
              </span>
            )}
            {dish.isPopular && !dish.isChefSpecial && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-600 text-white shadow-md">
                <Flame className="w-3 h-3 fill-white" />
                <span>Popular</span>
              </span>
            )}
            {dish.isVegetarian && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
                <Leaf className="w-3 h-3" />
                <span>Veg</span>
              </span>
            )}
          </div>

          {/* Top Right: Favorite & Quick View Buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(dish.id, dish.name);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
                favorited
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/50 scale-110'
                  : 'bg-black/60 text-zinc-300 hover:text-red-400 hover:bg-black/80'
              }`}
              aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Bottom of Image: Spice & Category */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between z-10">
            <span className="text-[11px] font-medium tracking-wider uppercase text-amber-300/90 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-amber-500/20">
              {dish.category}
            </span>
            {renderSpiceIndicator(dish.spiceLevel)}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-lg font-serif-luxury font-bold text-cream-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                {dish.name}
              </h3>
            </div>
            {dish.urduName && (
              <p className="text-xs text-amber-400/80 font-medium mb-2 font-serif-luxury">
                {dish.urduName}
              </p>
            )}
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
              {dish.description}
            </p>
          </div>

          {/* Price & Action Area */}
          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold block">
                Price
              </span>
              <span className="text-base sm:text-lg font-bold text-amber-400 font-mono">
                Rs. {dish.price.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                }}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-cream-100 transition-colors text-xs font-medium border border-zinc-700"
                title="View Ingredients & Details"
                aria-label={`View details for ${dish.name}`}
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={handleQuickAdd}
                disabled={isAdding}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 text-xs font-bold shadow-md hover:shadow-red-950/40 border border-amber-400/30 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                aria-label={`Add ${dish.name} to order`}
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      {modalOpen && (
        <ItemDetailModal
          dish={dish}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
