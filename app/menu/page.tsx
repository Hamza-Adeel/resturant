'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Leaf,
  Sparkles,
  Heart,
  Grid,
  List,
  Utensils,
  ArrowUpDown,
  CheckCircle2,
  X
} from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../../lib/data/menu';
import { MenuCategory, MenuItem } from '../../lib/types';
import DishCard from '../../components/DishCard';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

function MenuContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('filter');

  const { favorites } = useFavorites();
  const { addItem } = useCart();

  // State
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'spicy'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filters
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterChef, setFilterChef] = useState(false);
  const [filterPopular, setFilterPopular] = useState(false);
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState(initialFilter === 'favorites');
  const [filterMaxPrice, setFilterMaxPrice] = useState<number>(3000);
  const [filterSpiceLevel, setFilterSpiceLevel] = useState<number | null>(null);

  // Filter & Sort Logic
  const filteredDishes = useMemo(() => {
    let list = MENU_ITEMS.filter((dish) => {
      // Category match
      if (selectedCategory !== 'All' && dish.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          dish.name.toLowerCase().includes(q) ||
          dish.description.toLowerCase().includes(q) ||
          dish.ingredients.some((ing) => ing.toLowerCase().includes(q)) ||
          (dish.urduName && dish.urduName.includes(q));
        if (!matches) return false;
      }
      // Dietary & Attribute filters
      if (filterVeg && !dish.isVegetarian) return false;
      if (filterVegan && !dish.isVegan) return false;
      if (filterChef && !dish.isChefSpecial) return false;
      if (filterPopular && !dish.isPopular) return false;
      if (filterFavoritesOnly && !favorites.includes(dish.id)) return false;
      if (dish.price > filterMaxPrice) return false;
      if (filterSpiceLevel !== null && dish.spiceLevel !== filterSpiceLevel) return false;

      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'spicy') {
      list.sort((a, b) => b.spiceLevel - a.spiceLevel);
    }

    return list;
  }, [
    selectedCategory,
    searchQuery,
    filterVeg,
    filterVegan,
    filterChef,
    filterPopular,
    filterFavoritesOnly,
    filterMaxPrice,
    filterSpiceLevel,
    sortBy,
    favorites
  ]);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setFilterVeg(false);
    setFilterVegan(false);
    setFilterChef(false);
    setFilterPopular(false);
    setFilterFavoritesOnly(false);
    setFilterMaxPrice(3000);
    setFilterSpiceLevel(null);
    setSortBy('featured');
  };

  const activeFilterCount =
    (filterVeg ? 1 : 0) +
    (filterVegan ? 1 : 0) +
    (filterChef ? 1 : 0) +
    (filterPopular ? 1 : 0) +
    (filterFavoritesOnly ? 1 : 0) +
    (filterMaxPrice < 3000 ? 1 : 0) +
    (filterSpiceLevel !== null ? 1 : 0);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
          Authentic South Asian Menu
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-cream-100">
          The Mirch Masala Catalog
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Explore over 40+ handcrafted delicacies. Slow-braised karahis, live charcoal grills, royal dum biryanis, and artisanal clay oven flatbreads.
        </p>
      </div>

      {/* Main Search, Sort & View Mode Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#13131a] border border-amber-500/20 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ingredient, or craving..."
              className="w-full pl-11 pr-8 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-2xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & View Mode Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-amber-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs font-semibold text-cream-100 focus:outline-none focus:border-amber-400"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="spicy">Spiciest First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-amber-500 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-amber-500 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
                }`}
                title="List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Carousel Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-zinc-800/80">
          {MENU_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-700 via-red-800 to-amber-600 text-cream-100 shadow-md border border-amber-400/40'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-cream-100 hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters:
          </span>

          <button
            onClick={() => setFilterVeg(!filterVeg)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              filterVeg
                ? 'bg-emerald-900 text-emerald-200 border border-emerald-400 shadow-sm'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Vegetarian</span>
          </button>

          <button
            onClick={() => setFilterChef(!filterChef)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              filterChef
                ? 'bg-amber-500 text-zinc-950 font-bold border border-amber-400 shadow-sm'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chef&apos;s Special</span>
          </button>

          <button
            onClick={() => setFilterPopular(!filterPopular)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              filterPopular
                ? 'bg-red-600 text-white font-bold shadow-sm'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Popular Hits</span>
          </button>

          <button
            onClick={() => setFilterFavoritesOnly(!filterFavoritesOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              filterFavoritesOnly
                ? 'bg-rose-900 text-rose-200 border border-rose-400 shadow-sm'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Favorites ({favorites.length})</span>
          </button>

          {/* Spice Filter */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1">
            <span className="text-[11px] text-zinc-400 mr-1">Spice:</span>
            {[0, 1, 2, 3].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterSpiceLevel(filterSpiceLevel === lvl ? null : lvl)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  filterSpiceLevel === lvl
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {lvl === 0 ? 'Mild' : `Lv ${lvl}`}
              </button>
            ))}
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-amber-400 hover:underline font-semibold ml-auto px-2"
            >
              Reset All Filters ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {/* Dish Count Header */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <span>
          Showing <strong className="text-amber-400 font-mono text-sm">{filteredDishes.length}</strong> delicious dishes
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        </span>
        <span>All dishes prepared 100% Halal</span>
      </div>

      {/* Dish Grid / List Display */}
      {filteredDishes.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-zinc-950/60 border border-zinc-800 space-y-3">
          <Utensils className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-xl font-serif-luxury font-bold text-cream-100">No matching dishes found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            We could not find dishes matching your selected filters. Please try searching for another craving or reset your filters.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 text-white font-bold text-xs shadow-lg"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#121217] border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row items-center gap-5 justify-between shadow-lg"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 border border-zinc-800"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-cream-100">
                      {dish.name}
                    </h3>
                    {dish.urduName && (
                      <span className="text-xs text-amber-400/80 font-serif-luxury hidden md:inline">
                        ({dish.urduName})
                      </span>
                    )}
                    {dish.isChefSpecial && (
                      <span className="text-[10px] bg-amber-500 text-zinc-950 font-bold px-2 py-0.5 rounded-full">
                        Special
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 max-w-xl leading-relaxed">
                    {dish.description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-500 pt-1">
                    <span>{dish.category}</span>
                    <span>•</span>
                    <span>{dish.prepTime || '15 mins'}</span>
                    {dish.isVegetarian && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-400 font-semibold">Vegetarian</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-zinc-500 uppercase block font-medium">Price</span>
                  <span className="text-lg font-bold font-mono text-amber-400">
                    Rs. {dish.price.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => addItem(dish, 1, dish.spiceLevel)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-amber-400">Loading Mirch Masala Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
