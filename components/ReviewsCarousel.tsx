'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, ShieldCheck } from 'lucide-react';
import { REVIEWS_DATA } from '../lib/data/reviews';

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextReview, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="relative space-y-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Google Reviews Trust Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-[#14141d] border border-amber-500/25 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md p-2 shrink-0">
            {/* Google G Brand Mark */}
            <svg viewBox="0 0 24 24" className="w-7 h-7">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-cream-100 font-mono">4.9 / 5.0</span>
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-zinc-400">
              Verified by Google Reviews • <strong className="text-zinc-200">2,400+ Dining Guests</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Authentic Diners</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Award Winning Culinary Team</span>
          </div>
        </div>
      </div>

      {/* Main Reviews Carousel Card */}
      <div className="relative rounded-3xl bg-card-gradient border border-amber-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden">
        {/* Ambient Decorative Quotes Icon */}
        <Quote className="absolute top-6 right-8 w-24 h-24 text-amber-500/10 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Active Review Content */}
          <div className="flex items-center gap-1.5 text-amber-400">
            {[...Array(REVIEWS_DATA[currentIndex].rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
            <span className="ml-2 text-xs font-mono font-bold text-amber-300/90 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              5.0 Exceptional
            </span>
          </div>

          <p className="text-base sm:text-xl lg:text-2xl font-serif-luxury text-cream-100 italic leading-relaxed">
            &ldquo;{REVIEWS_DATA[currentIndex].comment}&rdquo;
          </p>

          {/* Author Details & Recommended Dish */}
          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-lg">
                <Image
                  src={REVIEWS_DATA[currentIndex].avatar}
                  alt={REVIEWS_DATA[currentIndex].name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-base font-bold text-cream-100 font-serif-luxury flex items-center gap-2">
                  <span>{REVIEWS_DATA[currentIndex].name}</span>
                  {REVIEWS_DATA[currentIndex].verified && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30 font-sans">
                      Verified Guest
                    </span>
                  )}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">{REVIEWS_DATA[currentIndex].role} • {REVIEWS_DATA[currentIndex].date}</p>
              </div>
            </div>

            {REVIEWS_DATA[currentIndex].dishRecommended && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-2 text-xs">
                <span className="text-zinc-400 block text-[10px] uppercase tracking-wider font-semibold">
                  Favorite Dish:
                </span>
                <span className="text-amber-300 font-medium font-serif-luxury">
                  {REVIEWS_DATA[currentIndex].dishRecommended}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="pt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {REVIEWS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-amber-400 to-red-500'
                    : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevReview}
              className="p-3 rounded-full bg-zinc-900/90 border border-zinc-700 hover:border-amber-400 text-zinc-300 hover:text-amber-300 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="p-3 rounded-full bg-zinc-900/90 border border-zinc-700 hover:border-amber-400 text-zinc-300 hover:text-amber-300 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
