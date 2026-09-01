'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Sparkles, Flame, CheckCircle2, Copy, Check, Clock, ArrowRight } from 'lucide-react';
import { SPECIAL_OFFERS } from '../../lib/data/offers';
import { useToast } from '../../context/ToastContext';
import { useCart } from '../../context/CartContext';

export default function OffersPage() {
  const { showToast } = useToast();
  const { applyPromoCode, setIsOpen } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyPromoCode(code);
    showToast('Promo Code Copied & Applied! 🎟️', `Code ${code} is ready in your cart.`, 'success');

    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
          Exclusive Value Feasts
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-cream-100">
          Special Offers & Promos
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Experience our signature family banquets, executive lunch boxes, and weekend discounts without compromising on royalty or portion size.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SPECIAL_OFFERS.map((offer) => {
          const isCopied = copiedCode === offer.code;

          return (
            <div
              key={offer.id}
              className="rounded-3xl overflow-hidden bg-[#13131a] border border-amber-500/30 shadow-2xl flex flex-col justify-between group hover:border-amber-400/60 transition-all"
            >
              {/* Image & Floating Badge */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {offer.badge}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-amber-300 text-[11px] font-semibold px-3 py-1 rounded-full border border-amber-500/20 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{offer.validUntil}</span>
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif-luxury font-bold text-cream-100">
                      {offer.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-400 font-semibold mt-1">
                      {offer.subtitle}
                    </p>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  {/* Included Items */}
                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                    <h4 className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                      Package Inclusions:
                    </h4>
                    <div className="space-y-1 text-xs text-zinc-300">
                      {offer.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-6 border-t border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      {offer.offerPrice !== undefined ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-mono font-bold text-amber-400">
                            Rs. {offer.offerPrice.toLocaleString()}
                          </span>
                          {offer.originalPrice && (
                            <span className="text-sm font-mono text-zinc-500 line-through">
                              Rs. {offer.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-base font-bold text-amber-300 font-mono">
                          Flat {offer.discountPercentage}% Discount
                        </span>
                      )}
                      <p className="text-[10px] text-zinc-500 mt-0.5">{offer.terms}</p>
                    </div>

                    {/* Copy Code Button */}
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Applied!' : offer.code}</span>
                    </button>
                  </div>

                  <Link
                    href="/order"
                    onClick={() => applyPromoCode(offer.code)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-xs shadow-xl shadow-red-950/50 border border-amber-400/40 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    <span>Order This Special Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
