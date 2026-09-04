'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Truck,
  Store,
  CreditCard,
  Banknote,
  Smartphone,
  Plus,
  Minus,
  Trash2,
  Tag,
  Utensils
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { MENU_ITEMS } from '../../lib/data/menu';
import { OrderDetails } from '../../lib/types';
import OrderTrackerModal from '../../components/OrderTrackerModal';

export default function OrderPage() {
  const {
    items,
    orderType,
    setOrderType,
    subtotal,
    deliveryFee,
    tax,
    total,
    tip,
    setTip,
    appliedPromo,
    discountAmount,
    applyPromoCode,
    removePromoCode,
    updateQuantity,
    removeItem,
    clearCart,
    addItem
  } = useCart();

  const { showToast } = useToast();

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'jazzcash_easypaisa'>('cod');
  const [promoInput, setPromoInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Completed Order for Tracker Modal
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [trackerOpen, setTrackerOpen] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      const ok = applyPromoCode(promoInput);
      if (ok) setPromoInput('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      showToast('Cart is Empty', 'Please add items to your cart before placing an order.', 'error');
      return;
    }

    if (!customerName.trim() || !phone.trim() || !email.trim()) {
      showToast('Missing Contact Info', 'Please enter your name, phone number, and email address.', 'error');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      showToast('Address Required', 'Please provide a complete delivery address.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `MM-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderObj: OrderDetails = {
        orderId,
        items: [...items],
        orderType,
        customerName,
        phone,
        email,
        address,
        deliveryNotes,
        paymentMethod,
        subtotal,
        deliveryFee,
        tax,
        discount: discountAmount,
        tip,
        total,
        status: 'Received',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedTime: orderType === 'delivery' ? '30 – 40 Minutes' : '15 – 20 Minutes'
      };

      setCompletedOrder(orderObj);
      setIsSubmitting(false);
      setTrackerOpen(true);
      clearCart();

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }

      showToast('Order Placed Successfully! 🍛', `Kitchen ticket #${orderId} is now firing.`, 'success');
    }, 1000);
  };

  // Popular Quick Adds for Empty or Building Cart
  const popularAdds = MENU_ITEMS.filter((d) => d.isPopular).slice(0, 4);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
          Direct Kitchen Ordering
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-cream-100">
          Online Ordering & Checkout
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Piping hot food delivered with sealed thermal protection or prepared for swift takeaway collection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Delivery/Pickup + Customer Details + Payment */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* 1. Order Type Switch */}
            <div className="p-6 rounded-3xl bg-[#13131a] border border-zinc-800 space-y-4">
              <h3 className="text-sm font-serif-luxury font-bold text-cream-100 uppercase tracking-wider">
                1. Select Service Type
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3.5 cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-red-950/40 border-amber-400 text-cream-100 ring-1 ring-amber-400 shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${orderType === 'delivery' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800'}`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-cream-100">Doorstep Delivery</h4>
                    <p className="text-[11px] text-zinc-400">Insulated thermal box • ~35 mins</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3.5 cursor-pointer ${
                    orderType === 'pickup'
                      ? 'bg-red-950/40 border-amber-400 text-cream-100 ring-1 ring-amber-400 shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${orderType === 'pickup' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800'}`}>
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-cream-100">Takeaway Pickup</h4>
                    <p className="text-[11px] text-zinc-400">Main Boulevard Gulberg • ~20 mins</p>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Customer & Address Details */}
            <div className="p-6 rounded-3xl bg-[#13131a] border border-zinc-800 space-y-4">
              <h3 className="text-sm font-serif-luxury font-bold text-cream-100 uppercase tracking-wider">
                2. Contact & Address Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ayesha@example.com (for instant invoice receipt)"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {orderType === 'delivery' && (
                  <>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Complete Delivery Address *</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House / Apartment #, Street Name, Area / Phase, Landmark"
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Rider Delivery Notes (Optional)</label>
                      <input
                        type="text"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="e.g. Gate code, ring bell twice, leave with security..."
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="p-6 rounded-3xl bg-[#13131a] border border-zinc-800 space-y-4">
              <h3 className="text-sm font-serif-luxury font-bold text-cream-100 uppercase tracking-wider">
                3. Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-amber-500/15 border-amber-400 text-cream-100 ring-1 ring-amber-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-amber-400 mb-2" />
                  <h4 className="text-xs font-bold text-cream-100">Cash on Delivery</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Pay upon delivery or pickup</p>
                </div>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/15 border-amber-400 text-cream-100 ring-1 ring-amber-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-400 mb-2" />
                  <h4 className="text-xs font-bold text-cream-100">Credit / Debit Card</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Rider card POS machine</p>
                </div>

                <div
                  onClick={() => setPaymentMethod('jazzcash_easypaisa')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'jazzcash_easypaisa'
                      ? 'bg-amber-500/15 border-amber-400 text-cream-100 ring-1 ring-amber-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-amber-400 mb-2" />
                  <h4 className="text-xs font-bold text-cream-100">JazzCash / EasyPaisa</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Direct mobile QR transfer</p>
                </div>
              </div>
            </div>

            {/* 4. Kitchen Tip Selector */}
            <div className="p-6 rounded-3xl bg-[#13131a] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-cream-100 uppercase tracking-wider">
                    Add a Tip for Kitchen & Delivery Staff
                  </h3>
                  <p className="text-[11px] text-zinc-400">100% of tips go directly to the kitchen crew & riders.</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {tip > 0 ? `Rs. ${tip}` : 'No tip'}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {[0, 50, 100, 200, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTip(amt)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      tip === amt
                        ? 'bg-amber-500 text-zinc-950 font-bold border-amber-400'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {amt === 0 ? 'None' : `Rs. ${amt}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 disabled:opacity-50 text-cream-100 font-bold text-base shadow-xl shadow-red-950/60 border border-amber-400/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <span>
                {isSubmitting
                  ? 'Placing Your Order...'
                  : `Place Order • Total Rs. ${total.toLocaleString()}`}
              </span>
            </button>
          </form>
        </div>

        {/* Right Sidebar: Cart Items & Bill Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#13131a] border border-amber-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-serif-luxury font-bold text-cream-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Your Selected Feast ({items.length})</span>
              </h3>
              <Link href="/menu" className="text-xs text-amber-400 hover:underline font-semibold">
                + Add Dishes
              </Link>
            </div>

            {/* Items List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 space-y-2">
                  <Utensils className="w-8 h-8 mx-auto text-zinc-700" />
                  <p className="text-xs">No items in your cart yet.</p>
                  <Link href="/menu" className="inline-block text-xs text-amber-400 font-bold hover:underline">
                    Browse 40+ dishes →
                  </Link>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800/80 flex items-center gap-3">
                    <Image
                      src={item.dish.image}
                      alt={item.dish.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-zinc-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-cream-100 truncate">{item.dish.name}</h4>
                      <p className="text-[11px] font-mono text-amber-400 mt-0.5">
                        Rs. {(item.dish.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                        className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-1 min-w-[1.2rem] text-center text-zinc-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                        className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.dish.id)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Promo Coupon Box */}
            {appliedPromo ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300">
                <div className="flex items-center gap-2 font-semibold">
                  <Tag className="w-4 h-4" />
                  <span>{appliedPromo}</span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-zinc-400 hover:text-white font-bold px-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Coupon code (e.g. MIRCH10)"
                  className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-cream-100 placeholder-zinc-500 uppercase focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-bold rounded-xl text-xs border border-amber-500/20"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-400 font-semibold">
                  <span>Discount Applied</span>
                  <span className="font-mono">- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-mono text-zinc-200">
                  {deliveryFee === 0 ? <strong className="text-emerald-400 font-normal">FREE</strong> : `Rs. ${deliveryFee}`}
                </span>
              </div>
              {tip > 0 && (
                <div className="flex justify-between">
                  <span>Staff Tip</span>
                  <span className="font-mono text-zinc-200">Rs. {tip}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST / Tax (10%)</span>
                <span className="font-mono text-zinc-200">Rs. {tax.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-zinc-800 flex justify-between text-base font-bold text-cream-100">
                <span>Total Amount Due</span>
                <span className="text-xl font-mono text-amber-400">Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Add Suggestions */}
          <div className="p-6 rounded-3xl bg-[#111116] border border-zinc-800 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              Pair With Your Meal
            </h4>
            <div className="space-y-2.5">
              {popularAdds.map((pop) => (
                <div key={pop.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <Image src={pop.image} alt={pop.name} width={36} height={36} className="w-9 h-9 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-cream-100">{pop.name}</p>
                      <p className="text-amber-400 font-mono text-[11px]">Rs. {pop.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => addItem(pop, 1, pop.spiceLevel)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 font-bold text-[11px] transition-colors"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Order Tracker Modal */}
      {completedOrder && (
        <OrderTrackerModal
          order={completedOrder}
          isOpen={trackerOpen}
          onClose={() => setTrackerOpen(false)}
        />
      )}
    </div>
  );
}
