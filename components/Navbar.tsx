'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Flame, Menu as MenuIcon, X, Calendar, Phone, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, setIsOpen } = useCart();
  const { favorites } = useFavorites();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Catering', href: '/catering' },
    { name: 'Offers', href: '/offers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      {!announcementDismissed && (
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-amber-950 text-cream-100 text-xs sm:text-sm py-2 px-4 border-b border-amber-500/20 relative z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto sm:mx-0 font-medium tracking-wide">
              <span className="inline-flex items-center justify-center p-1 bg-amber-500/20 rounded-full text-amber-300 animate-pulse">
                <Flame className="w-3.5 h-3.5" />
              </span>
              <span>
                <strong className="text-amber-300 font-semibold">Weekend Special:</strong> Flat 10% OFF on all signature dishes with code <span className="underline decoration-amber-400 font-mono font-bold text-amber-200">MIRCH10</span>
              </span>
            </div>
            <button
              onClick={() => setAnnouncementDismissed(true)}
              className="text-zinc-400 hover:text-white p-1 transition-colors hidden sm:block"
              aria-label="Dismiss announcement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Main Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0e0e12]/95 backdrop-blur-md shadow-xl border-b border-amber-500/15 py-3.5'
            : 'bg-[#0c0c0e]/80 backdrop-blur-sm border-b border-zinc-800/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 via-red-800 to-amber-600 flex items-center justify-center shadow-lg shadow-red-950/40 border border-amber-400/40 group-hover:scale-105 transition-transform duration-300">
              <Flame className="w-5 h-5 text-amber-200 fill-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif-luxury font-bold tracking-wider text-cream-100 group-hover:text-amber-300 transition-colors leading-tight">
                MIRCH MASALA
              </span>
              <span className="text-[9px] tracking-[0.25em] text-amber-400/90 uppercase font-semibold">
                Authentic South Asian
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 relative ${
                    isActive
                      ? 'text-amber-300 bg-amber-500/10 font-semibold'
                      : 'text-zinc-300 hover:text-cream-100 hover:bg-zinc-800/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-amber-400 to-red-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Favorites Icon */}
            <Link
              href="/menu?filter=favorites"
              className="relative p-2 rounded-xl text-zinc-300 hover:text-red-400 hover:bg-zinc-800/60 transition-colors"
              title="Saved Favorites"
              aria-label="Saved Favorites"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-amber-300 border border-amber-500/20 hover:border-amber-400/50 transition-all flex items-center gap-2"
              aria-label={`Shopping Cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-amber-500 to-red-600 text-zinc-950 rounded-full shadow-md animate-bounce">
                  {itemCount}
                </span>
              )}
              <span className="hidden sm:inline text-xs font-semibold text-zinc-200">
                Cart
              </span>
            </button>

            {/* Reserve Table CTA */}
            <Link
              href="/reservations"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-700 via-red-800 to-amber-700 hover:from-red-600 hover:to-amber-600 text-cream-100 text-sm font-semibold shadow-lg shadow-red-950/40 border border-amber-400/30 hover:border-amber-300 transition-all duration-300 hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Reserve a Table</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-[#0e0e12]/98 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl p-6 animate-in slide-in-from-top-4 duration-300 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold'
                        : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                  </Link>
                );
              })}

              <div className="my-3 border-t border-zinc-800/80" />

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/reservations"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 text-white font-semibold text-sm shadow-md"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>Reserve Table</span>
                </Link>
                <Link
                  href="/order"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Now</span>
                </Link>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Direct Hotline: +92 300 1234567</span>
                </div>
                <span className="text-emerald-400 font-medium">● Open Today Till 11 PM</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
