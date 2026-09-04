'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Mail, Phone, MapPin, Clock, Send, CheckCircle2, Award, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Restaurant 🌟', 'You will receive our chef specials and exclusive private tasting invites.', 'success');
  };

  return (
    <footer className="bg-[#09090c] text-zinc-300 border-t border-amber-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Box */}
        <div className="mb-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-red-950/60 via-zinc-900/90 to-amber-950/60 border border-amber-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Flame className="w-48 h-48 text-amber-400" />
          </div>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-widest uppercase mb-2">
              <Award className="w-4 h-4" />
              <span>The Royal Newsletter</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-cream-100 tracking-tight mb-2">
              Get the latest from Restaurant.
            </h3>
            <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
              Subscribe to receive seasonal tasting menus, secret chef recipes, and exclusive invitations to our weekend live charcoal barbecue nights.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-sm font-medium">Thank you for subscribing! Welcome to the Restaurant inner circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-zinc-700/80 rounded-xl text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-950/30 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-zinc-800/80">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center shadow-lg border border-amber-400/40">
                <Flame className="w-5 h-5 text-amber-200 fill-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif-luxury font-bold tracking-wider text-cream-100 group-hover:text-amber-300 transition-colors">
                  Restaurant
                </span>
                <span className="text-[9px] tracking-[0.25em] text-amber-400 uppercase font-semibold">
                  Authentic South Asian
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              “Authentic flavors. Warm hospitality. Unforgettable moments.” Rooted in culinary tradition, perfected for today’s dining connoisseurs.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 w-fit">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Certified Halal & Fresh Daily</span>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-amber-500 hover:text-zinc-950 flex items-center justify-center transition-colors text-zinc-300"
                aria-label="Follow on Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-amber-500 hover:text-zinc-950 flex items-center justify-center transition-colors text-zinc-300"
                aria-label="Follow on Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-amber-500 hover:text-zinc-950 flex items-center justify-center transition-colors text-zinc-300"
                aria-label="Watch on YouTube"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-cream-100 uppercase tracking-wider mb-4 border-b border-amber-500/30 pb-2 inline-block">
              Explore & Dine
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/menu" className="text-zinc-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>→</span> Our Full Menu
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-zinc-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>→</span> Online Food Delivery
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-zinc-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>→</span> Family Feasts & Deals
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-zinc-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>→</span> Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Visit Us & Contact */}
          <div>
            <h4 className="text-sm font-semibold text-cream-100 uppercase tracking-wider mb-4 border-b border-amber-500/30 pb-2 inline-block">
              Visit Us
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-cream-200 font-medium">Main Boulevard, Gulberg III</p>
                  <p className="text-zinc-400 text-xs mt-0.5">Lahore, Punjab 54000, Pakistan</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 text-xs hover:underline inline-block mt-1"
                  >
                    Get Driving Directions ↗
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <a href="tel:+923001234567" className="hover:text-cream-100 text-cream-200 font-medium">
                    +92 300 1234567
                  </a>
                  <p className="text-[11px] text-zinc-500">Orders & General Enquiries</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:dining@mirchmasala.com" className="hover:text-cream-100 text-cream-200">
                  dining@mirchmasala.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Opening Hours */}
          <div>
            <h4 className="text-sm font-semibold text-cream-100 uppercase tracking-wider mb-4 border-b border-amber-500/30 pb-2 inline-block">
              Opening Hours
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-amber-400 font-medium text-xs mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Kitchen Timings</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60 text-zinc-300">
                <span>Mon – Thu:</span>
                <span className="font-semibold text-cream-200">12:00 PM – 11:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60 text-amber-300 bg-amber-500/5 px-2 rounded">
                <span>Fri – Sat:</span>
                <span className="font-semibold text-amber-200">12:00 PM – 12:00 AM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60 text-zinc-300">
                <span>Sunday:</span>
                <span className="font-semibold text-cream-200">12:00 PM – 11:00 PM</span>
              </div>
              <p className="text-[11px] text-zinc-500 pt-1 leading-relaxed">
                * Tandoor and live charcoal BBQ stations active throughout opening hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Restaurant. All rights reserved. Authentic South Asian Dining.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-amber-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-amber-300 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-amber-300 transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
