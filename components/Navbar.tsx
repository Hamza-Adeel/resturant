'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Flame, Menu as MenuIcon, X, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, setIsOpen } = useCart();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Offers', href: '/offers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Sticky Main Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f0f14]/95 backdrop-blur-md shadow-2xl border-b border-amber-500/20 py-3'
            : 'bg-[#0c0c0e]/85 backdrop-blur-sm border-b border-zinc-800/50 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-1 min-h-[44px]"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-700 via-red-900 to-amber-600 flex items-center justify-center shadow-lg shadow-red-950/50 border border-amber-400/40 group-hover:scale-105 transition-transform duration-300">
              <Flame className="w-5 h-5 text-amber-200 fill-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif-luxury font-bold tracking-wider text-cream-100 group-hover:text-amber-300 transition-colors leading-tight">
                Restaurant
              </span>
              <span className="text-[9px] tracking-[0.25em] text-amber-400 uppercase font-semibold">
                Royal South Asian Dining
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 relative min-h-[44px] flex items-center ${
                    isActive
                      ? 'text-amber-300 bg-amber-500/10 font-semibold'
                      : 'text-zinc-300 hover:text-cream-100 hover:bg-zinc-800/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-amber-400 to-red-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative hidden lg:flex px-3 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-amber-300 border border-amber-500/20 hover:border-amber-400/50 transition-all items-center gap-2 min-h-[44px] cursor-pointer"
              aria-label={`Shopping Cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {itemCount > 0 && (
                <span className="flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-amber-500 to-red-600 text-zinc-950 rounded-full shadow-md">
                  {itemCount}
                </span>
              )}
              <span className="hidden sm:inline text-xs font-semibold text-zinc-200">
                Cart
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[65px] z-50 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="bg-[#0f0f15]/98 border-b border-amber-500/20 shadow-2xl p-6 max-h-[calc(100vh-70px)] overflow-y-auto animate-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-3.5 rounded-xl text-base font-medium flex items-center justify-between min-h-[48px] transition-colors ${
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

                <Link
                  href="/menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-semibold text-sm border border-amber-500/30 min-h-[48px]"
                >
                  <span>Explore Menu</span>
                </Link>

                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-col gap-2 text-xs text-zinc-400">
                  <a
                    href="tel:+923001234567"
                    className="flex items-center gap-2 text-cream-100 py-1 min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Direct Concierge: +92 300 1234567</span>
                  </a>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-emerald-400 font-medium">● Open Today 12:00 PM – 11:00 PM</span>
                    <span>Gulberg III, Lahore</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
