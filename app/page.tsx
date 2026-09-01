'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Flame,
  Calendar,
  ArrowRight,
  Star,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronDown,
  Clock,
  Heart,
  CheckCircle2,
  Utensils,
  Search,
  SlidersHorizontal,
  Leaf
} from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../lib/data/menu';
import { REVIEWS_DATA } from '../lib/data/reviews';
import { GALLERY_ITEMS } from '../lib/data/gallery';
import { SPECIAL_OFFERS } from '../lib/data/offers';
import { MenuCategory, MenuItem } from '../lib/types';
import DishCard from '../components/DishCard';
import LightboxModal from '../components/LightboxModal';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const { addItem } = useCart();

  // Menu Preview State
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterChefSpecialOnly, setFilterChefSpecialOnly] = useState(false);
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);

  // Gallery Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filtered dishes for interactive menu preview
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      const matchCategory = activeCategory === 'All' || dish.category === activeCategory;
      const matchSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dish.urduName && dish.urduName.includes(searchQuery));
      const matchVeg = !filterVegOnly || dish.isVegetarian;
      const matchChef = !filterChefSpecialOnly || dish.isChefSpecial;
      const matchSpicy = !filterSpicyOnly || dish.spiceLevel >= 2;

      return matchCategory && matchSearch && matchVeg && matchChef && matchSpicy;
    }).slice(0, 8); // show top 8 in preview
  }, [activeCategory, searchQuery, filterVegOnly, filterChefSpecialOnly, filterSpicyOnly]);

  // Featured signature dishes
  const signatureDishes = useMemo(() => {
    return MENU_ITEMS.filter((d) => d.isChefSpecial || d.isPopular).slice(0, 6);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        {/* Cinematic Food Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop"
            alt="Mirch Masala South Asian Feast"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          {/* Multi-layered Dark Gradient Vignette for perfect readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/85 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/95 via-[#0c0c0e]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left w-full">
          <div className="max-w-3xl space-y-6">
            {/* Pill Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-widest uppercase shadow-lg shadow-red-950/50 backdrop-blur-md">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
              <span>Authentic South Asian Cuisine</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-bold text-cream-100 leading-[1.1] tracking-tight">
              Where Every Bite Tells a{' '}
              <span className="text-gold-gradient italic font-serif">Story.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              Experience the rich flavors, aromatic spices, and timeless recipes of South Asia. From slow-cooked royal karahis to live charcoal tandoor grills.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-base shadow-2xl shadow-red-950/60 border border-amber-400/40 hover:border-amber-300 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 cursor-pointer"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/reservations"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-cream-100 font-bold text-base shadow-xl border border-zinc-700 hover:border-amber-400/50 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Reserve a Table</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center sm:justify-start gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% Halal Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>4.9 Star Rating (2,400+ Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Open Today Till 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-zinc-400 hover:text-amber-300 transition-colors animate-bounce hidden sm:flex">
          <span className="text-[10px] uppercase tracking-widest font-semibold mb-1">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ================= 2. RESTAURANT HIGHLIGHTS & STATS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-card-gradient border border-amber-500/20 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-gold-gradient">
              15+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-cream-100 uppercase tracking-wider mt-1">
              Years of Flavor
            </span>
            <p className="text-xs text-zinc-400 mt-1 hidden sm:block">
              Preserving authentic culinary heritage since 2011.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 border-l border-zinc-800">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-gold-gradient">
              50+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-cream-100 uppercase tracking-wider mt-1">
              Signature Dishes
            </span>
            <p className="text-xs text-zinc-400 mt-1 hidden sm:block">
              Slow-cooked curries, charcoal grills, and biryanis.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 border-l border-zinc-800">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-gold-gradient flex items-center">
              4.9★
            </span>
            <span className="text-xs sm:text-sm font-semibold text-cream-100 uppercase tracking-wider mt-1">
              Guest Rating
            </span>
            <p className="text-xs text-zinc-400 mt-1 hidden sm:block">
              Over 2,400+ satisfied dine-in and delivery guests.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 border-l border-zinc-800">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-gold-gradient">
              100%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-cream-100 uppercase tracking-wider mt-1">
              Fresh Ingredients
            </span>
            <p className="text-xs text-zinc-400 mt-1 hidden sm:block">
              Hand-ground whole spices and premium Halal meats daily.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 3. TASTE OUR SIGNATURES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Curated Masterpieces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-cream-100">
              Taste Our Signatures
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Crafted with authentic spices, fresh ingredients, and recipes passed down through generations.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors group"
          >
            <span>View Full Menu</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* ================= 4. ABOUT SECTION (SPLIT SCREEN STORY) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
                alt="Mirch Masala Dining Room"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-amber-500/20">
                <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Heritage & Passion</p>
                <p className="text-sm font-serif-luxury text-cream-100 mt-1">“Food that warms the soul and celebrates timeless South Asian hospitality.”</p>
              </div>
            </div>

            {/* Overlapping Mini Card */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block p-4 rounded-2xl bg-[#181822] border border-amber-500/40 shadow-2xl max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-900/60 text-amber-400 flex items-center justify-center font-bold">
                  🌶️
                </div>
                <div>
                  <h4 className="text-xs font-bold text-cream-100">Hand-Roasted Masalas</h4>
                  <p className="text-[11px] text-zinc-400">Ground in small batches every morning.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Storytelling Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold">
              <Award className="w-4 h-4" />
              <span>Our Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-cream-100 leading-tight">
              Rooted in Tradition. <br />
              <span className="text-gold-gradient italic">Made for Today.</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Mirch Masala was created with a simple belief — great food brings people together. Our kitchen combines time-honored South Asian recipes with fresh ingredients, bold spices, and a modern approach to hospitality.
            </p>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              From the bustling street kitchens of Lahore to the royal dastarkhwans of the Mughal era, each recipe on our menu is treated with deep reverence. We source pure whole spices, marinate meats for over 24 hours, and bake every naan fresh to order in our roaring clay tandoor.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h4 className="text-sm font-bold text-amber-300 font-serif-luxury">Family Legacy</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Generational spice secrets passed down with love.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h4 className="text-sm font-bold text-amber-300 font-serif-luxury">Live Tandoor & Wok</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Freshly prepared rather than mass-produced.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cream-100 text-sm font-bold border border-amber-500/30 hover:border-amber-400 transition-all hover:scale-105 cursor-pointer"
              >
                <span>Discover Our Full Story</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. INTERACTIVE MENU PREVIEW ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Interactive Catalog</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-cream-100">
            Explore the Menu
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Filter by category, search specific cravings, or discover dishes customized to your spice preference.
          </p>
        </div>

        {/* Search & Quick Filter Bar */}
        <div className="p-4 rounded-2xl bg-[#14141c] border border-zinc-800 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Biryani, Karahi, Tikka, Naan)..."
                className="w-full pl-11 pr-4 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Toggle Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setFilterVegOnly(!filterVegOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                  filterVegOnly
                    ? 'bg-emerald-900 text-emerald-200 border border-emerald-400'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>Vegetarian</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterChefSpecialOnly(!filterChefSpecialOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                  filterChefSpecialOnly
                    ? 'bg-amber-500 text-zinc-950 font-bold border border-amber-400'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chef&apos;s Special</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                  filterSpicyOnly
                    ? 'bg-red-900 text-red-200 border border-red-400'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>🌶️ Spicy</span>
              </button>
            </div>
          </div>

          {/* Category Tabs (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-red-700 to-amber-600 text-cream-100 shadow-md border border-amber-400/40'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-cream-100 hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-zinc-950/60 border border-zinc-800">
            <Utensils className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif-luxury font-bold text-cream-100">No matching dishes found</h3>
            <p className="text-xs text-zinc-400 mt-1">Try clearing your search query or loosening your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterVegOnly(false);
                setFilterChefSpecialOnly(false);
                setFilterSpicyOnly(false);
                setActiveCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-zinc-800 text-amber-300 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}

        {/* Full Menu Link */}
        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/30 text-amber-300 hover:text-amber-200 font-bold text-sm transition-all hover:scale-105 shadow-xl"
          >
            <span>Explore Complete 40+ Dish Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ================= 6. CHEF'S SPECIAL SPOTLIGHT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950 via-[#181216] to-[#121217] border border-amber-500/40 p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>From Our Chef&apos;s Kitchen</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-cream-100 leading-tight">
                Special Mutton Karahi
                <span className="block text-2xl sm:text-3xl text-amber-400 font-serif font-normal italic mt-1">
                  Wok-Seared Baby Goat Perfection
                </span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                “Slow-cooked to perfection with hand-selected spices, ripe plum tomatoes, ginger, and fresh green chilies in a traditional heavy cast-iron wok. The tender meat falls off the bone while the reduced gravy clings with intense aroma.”
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div>
                  <span className="text-xs text-zinc-400 uppercase tracking-wider block font-medium">Portion Price</span>
                  <span className="text-3xl font-mono font-bold text-amber-400">Rs. 1,350</span>
                </div>

                <button
                  onClick={() => {
                    const muttonKarahi = MENU_ITEMS.find((d) => d.id === 'curry-2');
                    if (muttonKarahi) {
                      addItem(muttonKarahi, 1, 3);
                    }
                  }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-sm shadow-xl shadow-red-950/60 border border-amber-400/40 hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>Order This Dish</span>
                </button>
              </div>
            </div>

            {/* Right Featured Dish Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop"
                  alt="Special Mutton Karahi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-amber-500/30">
                  🌶️🌶️🌶️ Authentic Heat
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. FROM SPICE TO PLATE (EXPERIENCE TIMELINE) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">The Culinary Journey</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-cream-100">
            From Spice to Plate
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Every dish undergoes an unhurried sequence of artisanal care, traditional technique, and precise temperature control.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Fresh Daily Produce',
              desc: 'Premium cuts of 100% Halal meat, ripe farm vegetables, and fresh dairy delivered every morning.',
              icon: '🌱'
            },
            {
              step: '02',
              title: 'Hand-Selected Spices',
              desc: 'Whole green cardamom, cinnamon quills, star anise, and mace roasted and ground in small batches.',
              icon: '🌶️'
            },
            {
              step: '03',
              title: '24-Hour Marination',
              desc: 'Meats steeped in hung curd, garlic puree, and lemon oil for deep tenderness and moisture retention.',
              icon: '⏳'
            },
            {
              step: '04',
              title: 'Charcoal Grilling',
              desc: 'Skewered over natural lumpwood charcoal coals to infuse authentic smoky wood aroma.',
              icon: '🔥'
            },
            {
              step: '05',
              title: 'Artisanal Plating',
              desc: 'Garnished with ginger juliennes, toasted sesame, fresh cilantro leaves, and saffron essence.',
              icon: '✨'
            },
            {
              step: '06',
              title: 'Served Piping Fresh',
              desc: 'Brought straight from sizzling cast iron karahis and clay tandoor to your table within moments.',
              icon: '🍲'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-card-gradient border border-zinc-800/80 hover:border-amber-500/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-mono font-bold text-amber-400/80 bg-amber-500/10 px-2.5 py-1 rounded-md">
                  STEP {item.step}
                </span>
              </div>
              <h3 className="text-lg font-serif-luxury font-bold text-cream-100 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 8. WHY CHOOSE US ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#111116] border border-amber-500/20 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">The Mirch Masala Standard</span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-cream-100">
              Why Connoisseurs Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                📜
              </div>
              <h3 className="text-base font-bold text-cream-100 font-serif-luxury">Authentic Recipes</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Traditional heritage formulas inspired by the royal kitchens of Lahore, Delhi, and Lucknow without modern shortcuts.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                🥩
              </div>
              <h3 className="text-base font-bold text-cream-100 font-serif-luxury">Fresh Ingredients</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Crisp produce, certified Halal fresh meats, aromatic herbs, and carefully selected unadulterated spices.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                👨‍🍳
              </div>
              <h3 className="text-base font-bold text-cream-100 font-serif-luxury">Expert Chefs</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Experienced master ustaads who understand the delicate art of temperature control and spice harmonization.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                🤝
              </div>
              <h3 className="text-base font-bold text-cream-100 font-serif-luxury">Warm Hospitality</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                A welcoming atmosphere designed for families, friends, celebratory banquets, and intimate dinners.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                ✨
              </div>
              <h3 className="text-base font-bold text-cream-100 font-serif-luxury">Hygienic Kitchen</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Exemplary standards of cleanliness, food safety protocols, and daily equipment sterilization.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                🍲
              </div>
              <h3 className="text-base font-bold text-cream-100 font-serif-luxury">Freshly Prepared</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every single karahi, tandoori flatbread, and skewer is crafted fresh upon receiving your order ticket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. SPECIAL OFFERS BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Deals & Feasts</span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-cream-100 mt-1">
              Something Special Is Cooking
            </h2>
          </div>
          <Link href="/offers" className="text-sm font-bold text-amber-400 hover:underline">
            View All Deals & Promos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SPECIAL_OFFERS.slice(0, 2).map((offer) => (
            <div
              key={offer.id}
              className="rounded-3xl overflow-hidden bg-[#14141c] border border-amber-500/30 flex flex-col justify-between shadow-xl group hover:border-amber-400/60 transition-all"
            >
              <div className="relative aspect-[21/9] w-full overflow-hidden bg-zinc-900">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {offer.badge}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif-luxury font-bold text-cream-100">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">{offer.subtitle}</p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{offer.description}</p>

                  <div className="mt-3 space-y-1">
                    {offer.includes.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    {offer.offerPrice !== undefined ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-mono font-bold text-amber-400">
                          Rs. {offer.offerPrice.toLocaleString()}
                        </span>
                        {offer.originalPrice && (
                          <span className="text-xs font-mono text-zinc-500 line-through">
                            Rs. {offer.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-amber-300 font-mono">Use Code: {offer.code}</span>
                    )}
                  </div>

                  <Link
                    href="/order"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Order Offer
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 10. CUSTOMER REVIEWS & TESTIMONIALS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-cream-100">
            Loved By Our Guests
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Read firsthand dining stories from food critics, regular patrons, and family banquet hosts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-[#121217] border border-zinc-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-cream-100">{review.name}</h4>
                  <p className="text-[10px] text-zinc-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 11. GALLERY TEASER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Visual Splendor</span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-cream-100">
              The Dining Ambiance
            </h2>
          </div>
          <Link href="/gallery" className="text-sm font-bold text-amber-400 hover:underline">
            View Complete Gallery (12+ Photos) →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_ITEMS.slice(0, 4).map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-400/50 cursor-pointer group shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-semibold text-cream-100">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 12. BOTTOM RESERVATION CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950 via-zinc-900 to-amber-950 border border-amber-500/40 p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Unforgettable Memories</span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-cream-100">
              Ready for an Authentic Feast?
            </h2>
            <p className="text-sm sm:text-base text-zinc-300">
              Reserve your table online in seconds or order direct delivery straight to your doorstep.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reservations"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-sm shadow-xl shadow-red-950/60 border border-amber-400/40 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book Table Online</span>
            </Link>
            <Link
              href="/order"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-cream-100 font-bold text-sm border border-zinc-700 hover:border-amber-400/50 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Order Delivery Now</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        items={GALLERY_ITEMS}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
