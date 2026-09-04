'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Truck, Store, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    orderType,
    setOrderType,
    subtotal,
    deliveryFee,
    tax,
    total,
    freeDeliveryThreshold,
    updateQuantity,
    removeItem,
    clearCart,
    appliedPromo,
    discountAmount,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [promoInput, setPromoInput] = useState('');

  if (!isOpen) return null;

  const freeDeliveryRemaining = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      const ok = applyPromoCode(promoInput);
      if (ok) setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111116] border-l border-amber-500/30 text-cream-100 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-[#14141c]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif-luxury font-bold text-cream-100">
                  Your Feast Cart
                </h2>
                <span className="text-xs text-zinc-400">
                  {items.length} {items.length === 1 ? 'dish' : 'dishes'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-zinc-400 hover:text-red-400 p-1.5 transition-colors"
                  title="Clear Cart"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery / Pickup Switch */}
          <div className="p-4 bg-zinc-950/60 border-b border-zinc-800/80">
            <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Delivery (35m)</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  orderType === 'pickup'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Takeaway Pickup</span>
              </button>
            </div>

            {/* Free Delivery Bar (Delivery only) */}
            {orderType === 'delivery' && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  {freeDeliveryRemaining === 0 ? (
                    <span className="text-amber-300 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Congratulations! You unlocked FREE Delivery.
                    </span>
                  ) : (
                    <span className="text-zinc-400">
                      Add <strong className="text-amber-400">Rs. {freeDeliveryRemaining.toLocaleString()}</strong> more for FREE delivery
                    </span>
                  )}
                  <span className="text-zinc-500 font-mono text-[10px]">{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List / Empty State */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-serif-luxury font-bold text-cream-100">
                    Your cart is feeling empty
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs leading-relaxed">
                    Explore our aromatic biryanis, tandoori grills, and slow-simmered handi specialties.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 text-white font-semibold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  <Link href="/menu">Explore Our Menu</Link>
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.dish.id}-${idx}`}
                  className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 flex gap-3 items-center group hover:border-zinc-700 transition-all"
                >
                  <Image
                    src={item.dish.image}
                    alt={item.dish.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-zinc-800"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-cream-100 truncate">
                      {item.dish.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        Rs. {(item.dish.price * item.quantity).toLocaleString()}
                      </span>
                      {item.selectedSpiceLevel !== undefined && item.selectedSpiceLevel > 0 && (
                        <span className="text-[10px] text-red-400 bg-red-950/60 px-1.5 py-0.2 rounded border border-red-500/20">
                          🌶️ Lv {item.selectedSpiceLevel}
                        </span>
                      )}
                    </div>
                    {item.specialInstructions && (
                      <p className="text-[10px] text-zinc-400 italic truncate mt-0.5">
                        &ldquo;{item.specialInstructions}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Quantity and Delete */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center text-xs"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-1 min-w-[1.2rem] text-center text-zinc-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center text-xs"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.dish.id)}
                      className="text-zinc-500 hover:text-red-400 p-1 transition-colors text-xs"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-[#14141c] border-t border-zinc-800 space-y-4">
              {/* Promo Code Box */}
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span className="font-semibold">{appliedPromo}</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-zinc-400 hover:text-white font-bold p-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter Coupon (e.g. MIRCH10)"
                    className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Bill Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-200">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>Discount</span>
                    <span className="font-mono">- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-mono text-zinc-200">
                    {deliveryFee === 0 ? <strong className="text-emerald-400 font-normal">FREE</strong> : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST / Tax (10%)</span>
                  <span className="font-mono text-zinc-200">Rs. {tax.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-bold text-cream-100">
                  <span>Total Amount</span>
                  <span className="text-lg font-mono text-amber-400">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Link Button */}
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-sm shadow-xl shadow-red-950/50 border border-amber-400/40 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
