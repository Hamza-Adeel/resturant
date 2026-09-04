'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
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
