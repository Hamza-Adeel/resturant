'use client';

import React, { useState, useEffect } from 'react';
import { X, Heart, Plus, Minus, Flame, Clock, Users, Sparkles, AlertCircle, ShoppingBag, Check } from 'lucide-react';
import { MenuItem, SpiceLevel } from '../lib/types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

interface ItemDetailModalProps {
  dish: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemDetailModal({ dish, isOpen, onClose }: ItemDetailModalProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>(dish.spiceLevel);
  const [instructions, setInstructions] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const favorited = isFavorite(dish.id);
  const totalPrice = dish.price * quantity;

  const handleAddToCart = () => {
    addItem(dish, quantity, selectedSpice, instructions);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 600);
  };

  const spiceOptions: { level: SpiceLevel; label: string; desc: string; icon: string }[] = [
    { level: 0, label: 'Mild & Creamy', desc: 'No chili heat, aromatic', icon: '🍃' },
    { level: 1, label: 'Traditional Mild', desc: 'Gentle Kashmiri warmth', icon: '🌶️' },
    { level: 2, label: 'Authentic Spicy', desc: 'Balanced chef recipe', icon: '🌶️🌶️' },
    { level: 3, label: 'Desi Teekha', desc: 'Extra hot green chilies', icon: '🔥🌶️' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#14141a] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Top Header / Image Bar */}
        <div className="relative aspect-[21/9] sm:aspect-[2/1] w-full bg-zinc-900 overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141a] via-[#14141a]/40 to-transparent" />

          {/* Close & Favorite */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(dish.id, dish.name)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                favorited ? 'bg-red-600 text-white' : 'bg-black/60 text-zinc-300 hover:text-red-400'
              }`}
              aria-label="Toggle favorite"
            >
              <Heart className={`w-5 h-5 ${favorited ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80 backdrop-blur-md transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Pill */}
          <div className="absolute bottom-4 left-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
              {dish.category}
            </span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-cream-100">
                  {dish.name}
                </h2>
                {dish.isChefSpecial && (
                  <span className="p-1 bg-amber-500/20 text-amber-400 rounded-full" title="Chef Special">
                    <Sparkles className="w-4 h-4 fill-amber-400" />
                  </span>
                )}
              </div>
              {dish.urduName && (
                <p className="text-sm text-amber-400 font-serif-luxury mt-0.5">
                  {dish.urduName}
                </p>
              )}
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-zinc-400 uppercase tracking-wider block">Price</span>
              <span className="text-2xl font-bold font-mono text-amber-400">
                Rs. {dish.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {dish.description}
          </p>

          {/* Dish Specs Bar (Calories, Prep, Portion) */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
            <div>
              <span className="text-[11px] text-zinc-400 uppercase block font-medium">Prep Time</span>
              <span className="text-xs font-semibold text-cream-100 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {dish.prepTime || '15-20m'}
              </span>
            </div>
            <div className="border-x border-zinc-800">
              <span className="text-[11px] text-zinc-400 uppercase block font-medium">Portion</span>
              <span className="text-xs font-semibold text-cream-100 flex items-center justify-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                {dish.portionSize || '1 Serving'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase block font-medium">Est. Calories</span>
              <span className="text-xs font-semibold text-cream-100 flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                {dish.calories ? `${dish.calories} kcal` : 'Fresh Daily'}
              </span>
            </div>
          </div>

          {/* Key Ingredients */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-2">
              Key Ingredients & Spices
            </h4>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ing: string, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-xs text-zinc-300"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Allergens Notice */}
          {dish.allergens && dish.allergens.length > 0 && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Allergen Information:</strong> Contains {dish.allergens.join(', ')}. Please notify our kitchen staff of any severe food allergies.
              </div>
            </div>
          )}

          {/* Spice Level Adjuster */}
          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-400 font-bold block mb-2.5">
              Customize Spice Intensity
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {spiceOptions.map((opt) => (
                <button
                  key={opt.level}
                  type="button"
                  onClick={() => setSelectedSpice(opt.level)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedSpice === opt.level
                      ? 'bg-red-950/40 border-amber-400 text-cream-100 shadow-md ring-1 ring-amber-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{opt.icon}</span>
                    {selectedSpice === opt.level && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <p className="text-xs font-bold mt-1 text-cream-200">{opt.label}</p>
                  <p className="text-[10px] text-zinc-400">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Special Cooking Instructions */}
          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-400 font-bold block mb-2">
              Special Kitchen Notes / Preferences
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Less oil, extra ginger juliennes, crispy tandoor crust..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Modal Footer (Quantity + Add to Order) */}
        <div className="p-6 bg-[#0e0e13] border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700/80 p-1.5 rounded-2xl w-full sm:w-auto justify-between">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-200 flex items-center justify-center transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-base px-3 text-cream-100 min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddToCart}
            disabled={added}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-sm shadow-xl shadow-red-950/50 border border-amber-400/40 transition-all flex items-center justify-center gap-3 active:scale-98 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {added ? 'Added to Order!' : `Add to Order • Rs. ${totalPrice.toLocaleString()}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
