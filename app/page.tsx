'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  ArrowRight,
  Star,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Clock,
  MapPin,
  Utensils,
  Search,
  Leaf
} from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../lib/data/menu';
import { MenuCategory } from '../lib/types';
import DishCard from '../components/DishCard';
import ReviewsCarousel from '../components/ReviewsCarousel';

export default function HomePage() {
  // Menu Preview State
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterVeganOnly, setFilterVeganOnly] = useState(false);
  const [filterGlutenFreeOnly, setFilterGlutenFreeOnly] = useState(false);
  const [filterChefSpecialOnly, setFilterChefSpecialOnly] = useState(false);
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);

  // Filtered dishes for responsive interactive menu grid
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      const matchCategory = activeCategory === 'All' || dish.category === activeCategory;
      const matchSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dish.urduName && dish.urduName.includes(searchQuery));
      const matchVeg = !filterVegOnly || dish.isVegetarian;
      const matchVegan = !filterVeganOnly || dish.isVegan;
      const matchGlutenFree = !filterGlutenFreeOnly || dish.isGlutenFree;
      const matchChef = !filterChefSpecialOnly || dish.isChefSpecial;
      const matchSpicy = !filterSpicyOnly || dish.spiceLevel >= 2;

      return matchCategory && matchSearch && matchVeg && matchVegan && matchGlutenFree && matchChef && matchSpicy;
    }).slice(0, 8); // Display top 8 in landing preview
  }, [
    activeCategory,
    searchQuery,
    filterVegOnly,
    filterVeganOnly,
    filterGlutenFreeOnly,
    filterChefSpecialOnly,
    filterSpicyOnly
  ]);

  // Curated signature dishes for spotlight section
  const signatureDishes = useMemo(() => {
    return MENU_ITEMS.filter((d) => d.isChefSpecial || d.isPopular).slice(0, 6);
  }, []);

  return (
    <div>
      {/* ================= 1. HERO SECTION & ABOVE-THE-FOLD CTAS ================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 py-12 md:py-20">
        {/* Full-bleed Cinematic Atmospheric Food Imagery with Next.js Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop"
            alt="Mirch Masala South Asian Royal Feast"
            priority
            fill
            sizes="100vw"
            className="object-cover object-center scale-105 animate-pulse-slow"
          />
          {/* Multi-layered Warm Vignette Gradients for Luxury Contrast & Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/80 to-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/95 via-[#0c0c0e]/65 to-black/30" />
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto sm:px-2 lg:px-4 text-center sm:text-left w-full">
          <div className="max-w-3xl space-y-7">
            {/* Floating Operational Status & Location Info Badge */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full bg-[#161622]/90 border border-amber-500/35 shadow-xl shadow-black/60 backdrop-blur-md">
              <span className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5" />
                <span>Open Today: 12:00 PM – 11:00 PM</span>
              </span>
              <span className="text-zinc-500 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-xs text-zinc-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Main Boulevard, Gulberg III, Lahore</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-bold text-cream-100 leading-[1.12] tracking-tight">
              Where Every Bite Tells a{' '}
              <span className="text-gold-gradient italic font-serif">Story.</span>
            </h1>

            {/* Subtitle Body Text */}
            <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              Experience the timeless heritage, hand-roasted spices, and royal Mughlai recipes of South Asia. Savor slow-cooked karahis, live charcoal tandoor kebabs, and aromatic dum biryanis in a luxury dining ambiance.
            </p>

            {/* Above-the-fold CTA Buttons (Primary & Secondary Hierarchy) */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start">
              {/* Primary: Order Online (Solid High-Contrast Button) */}
              <Link
                href="/order"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-base shadow-2xl shadow-red-950/70 border border-amber-400/40 hover:border-amber-300 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.03] cursor-pointer min-h-[52px]"
              >
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span>Order Online</span>
              </Link>

              {/* Secondary: Explore Menu (Glassmorphism / Outlined Ghost Button) */}
              <Link
                href="#menu-catalog"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-850 text-cream-100 font-bold text-base shadow-xl border border-amber-500/30 hover:border-amber-400/60 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.03] cursor-pointer min-h-[52px]"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-5 h-5 text-amber-400" />
              </Link>
            </div>

            {/* Social Proof & Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-6 text-xs text-zinc-300 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% Halal Certified Meats</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span>4.9★ (2,400+ Verified Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Live Charcoal Kitchen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-zinc-400 hover:text-amber-300 transition-colors animate-bounce hidden sm:flex">
          <span className="text-[10px] uppercase tracking-widest font-semibold mb-1">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 text-amber-400" />
        </div>
      </section>

      {/* ================= 3. TASTE OUR SIGNATURES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Curated Masterpieces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-cream-100">
              Taste Our Signatures
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Crafted with authentic hand-ground spices, pure ghee, and recipes passed down through generations of master ustaads.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors group min-h-[44px]"
          >
            <span>View Complete 40+ Dish Menu</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Dish Grid with 300ms hover transitions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {signatureDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* ================= 5. RESPONSIVE MENU UI & TABBED FILTER ================= */}
      <section id="menu-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
            Interactive Gastronomy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-cream-100">
            Explore the Menu
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Filter by cuisine category, search by flavor notes, or narrow by dietary preferences.
          </p>
        </div>

        {/* Search & Dietary Filter Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-[#14141d] border border-zinc-800 mb-6 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Biryani, Karahi, Malai Boti, Naan)..."
                className="w-full pl-11 pr-14 py-3 bg-zinc-900 border border-zinc-700/80 rounded-2xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 min-h-[44px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Tag Toggle Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setFilterVegOnly(!filterVegOnly)}
                className={`text-xs px-3.5 py-2.5 rounded-full font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer min-h-[40px] ${
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
                onClick={() => setFilterVeganOnly(!filterVeganOnly)}
                className={`text-xs px-3.5 py-2.5 rounded-full font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer min-h-[40px] ${
                  filterVeganOnly
                    ? 'bg-teal-900 text-teal-200 border border-teal-400'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>Vegan</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterGlutenFreeOnly(!filterGlutenFreeOnly)}
                className={`text-xs px-3.5 py-2.5 rounded-full font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer min-h-[40px] ${
                  filterGlutenFreeOnly
                    ? 'bg-amber-900 text-amber-200 border border-amber-400'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>Gluten-Free</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterChefSpecialOnly(!filterChefSpecialOnly)}
                className={`text-xs px-3.5 py-2.5 rounded-full font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer min-h-[40px] ${
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
                className={`text-xs px-3.5 py-2.5 rounded-full font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer min-h-[40px] ${
                  filterSpicyOnly
                    ? 'bg-red-900 text-red-200 border border-red-400'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>🌶️ Spicy</span>
              </button>
            </div>
          </div>

          {/* Category Tabs Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[40px] ${
                    active
                      ? 'bg-gradient-to-r from-red-700 to-amber-600 text-cream-100 shadow-lg border border-amber-400/40'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-cream-100 hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Dishes Responsive Grid */}
        {filteredDishes.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-zinc-950/60 border border-zinc-800">
            <Utensils className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif-luxury font-bold text-cream-100">No dishes found</h3>
            <p className="text-xs text-zinc-400 mt-1">Try loosening your dietary filters or searching another keyword.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterVegOnly(false);
                setFilterVeganOnly(false);
                setFilterGlutenFreeOnly(false);
                setFilterChefSpecialOnly(false);
                setFilterSpicyOnly(false);
                setActiveCategory('All');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-bold transition-colors min-h-[44px]"
            >
              Reset All Filters
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
        <div className="mt-8 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/30 text-amber-300 hover:text-amber-200 font-bold text-sm transition-all hover:scale-105 shadow-xl min-h-[48px]"
          >
            <span>Explore Complete 40+ Dish Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ================= 7. SOCIAL PROOF & CUSTOMER REVIEWS CAROUSEL ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-cream-100">
            Loved By Connoisseurs
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Read firsthand dining stories from food critics, banquet hosts, and regular culinary patrons.
          </p>
        </div>

        {/* Reviews Carousel Component with Google Review Badges */}
        <ReviewsCarousel />
      </section>

    </div>
  );
}
