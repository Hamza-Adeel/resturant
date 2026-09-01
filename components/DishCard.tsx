'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Plus, Sparkles, Flame, Eye, Leaf, ShieldAlert } from 'lucide-react';
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
        className="flex items-center gap-1 text-[11px] font-semibold bg-red-950/85 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30 backdrop-blur-md"
        title={`Spice Level: ${level} of 3`}
      >
        <span>🌶️</span>
        <span className="text-[10px] tracking-tight">{level === 1 ? 'Mild' : level === 2 ? 'Medium' : 'Extra Hot'}</span>
      </div>
    );
  };

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="group relative bg-[#13131a] rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-amber-500/45 shadow-xl hover:shadow-2xl hover:shadow-black/90 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between cursor-pointer"
      >
        {/* Top Image & Floating Badges */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          
          {/* Subtle Dark Gradient Vignette for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-black/20 to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            {dish.isChefSpecial && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500 text-zinc-950 shadow-md">
                <Sparkles className="w-3 h-3 fill-zinc-950" />
                <span>Chef&apos;s Special</span>
              </span>
            )}
            {dish.isPopular && !dish.isChefSpecial && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold bg-red-600 text-white shadow-md">
                <Flame className="w-3 h-3 fill-white" />
                <span>Popular</span>
              </span>
            )}
            {dish.isVegetarian && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
                <Leaf className="w-3 h-3" />
                <span>Veg</span>
              </span>
            )}
            {dish.isVegan && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold bg-teal-950/90 text-teal-300 border border-teal-500/40 backdrop-blur-sm">
                <span>Vegan</span>
              </span>
            )}
            {dish.isGlutenFree && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold bg-amber-950/90 text-amber-300 border border-amber-500/40 backdrop-blur-sm">
                <span>Gluten-Free</span>
              </span>
            )}
          </div>

          {/* Top Right: Favorite Button */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(dish.id, dish.name);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                favorited
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/50 scale-105'
                  : 'bg-black/60 text-zinc-300 hover:text-red-400 hover:bg-black/80'
              }`}
              aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Bottom of Image: Category & Spice */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between z-10">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-300/90 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-amber-500/25">
              {dish.category}
            </span>
            {renderSpiceIndicator(dish.spiceLevel)}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-lg font-serif-luxury font-semibold text-cream-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                {dish.name}
              </h3>
            </div>
            {dish.urduName && (
              <p className="text-xs text-amber-400/85 font-medium mb-2 font-serif-luxury">
                {dish.urduName}
              </p>
            )}
            <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">
              {dish.description}
            </p>
          </div>

          {/* Price & Action Area */}
          <div className="pt-3.5 border-t border-zinc-800/80 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold block">
                Price
              </span>
              <span className="text-lg font-bold text-amber-400 font-mono">
                Rs. {dish.price.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                }}
                className="p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-cream-100 transition-colors text-xs font-medium border border-zinc-700 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                title="View Ingredients & Details"
                aria-label={`View details for ${dish.name}`}
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={handleQuickAdd}
                disabled={isAdding}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 text-xs font-bold shadow-md hover:shadow-red-950/40 border border-amber-400/30 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer min-h-[40px]"
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
