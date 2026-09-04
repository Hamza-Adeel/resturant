'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, ChefHat, Flame, Truck, Phone, MapPin, Sparkles, Copy, Check } from 'lucide-react';
import { OrderDetails, CartItem } from '../lib/types';

interface OrderTrackerModalProps {
  order: OrderDetails;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderTrackerModal({ order, isOpen, onClose }: OrderTrackerModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Simulate progress
    const timer1 = setTimeout(() => setCurrentStep(2), 4000);
    const timer2 = setTimeout(() => setCurrentStep(3), 10000);
    const timer3 = setTimeout(() => setCurrentStep(4), 18000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      id: 1,
      title: 'Order Confirmed',
      desc: 'Ticket sent to royal kitchen',
      icon: CheckCircle2,
      time: 'Just now'
    },
    {
      id: 2,
      title: 'Master Chef Preparing',
      desc: 'Spice marination & hand-cutting',
      icon: ChefHat,
      time: '+3 mins'
    },
    {
      id: 3,
      title: 'Charcoal Grilling & Tandoor',
      desc: 'Simmering in iron wok & clay oven',
      icon: Flame,
      time: '+12 mins'
    },
    {
      id: 4,
      title: order.orderType === 'delivery' ? 'Rider on the Way' : 'Ready at Pickup Counter',
      desc: order.orderType === 'delivery' ? 'Thermal bag sealed for freshness' : 'Piping hot and packed for you',
      icon: Truck,
      time: 'Est. 25 mins'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#131319] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-950/80 via-zinc-900 to-amber-950/80 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Live Kitchen Tracker
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-cream-100 mt-1">
              Order #{order.orderId}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyId}
              className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-xs font-mono text-zinc-300 border border-zinc-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy ID'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Estimated Time Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-red-500/10 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 animate-pulse">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Estimated Arrival Time</p>
                <h3 className="text-xl font-bold font-mono text-cream-100">
                  {order.estimatedTime || '30 – 40 Minutes'}
                </h3>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-semibold">
              ● Live in Progress
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4 relative">
            <div className="absolute top-4 bottom-4 left-5 w-0.5 bg-zinc-800 -z-0" />
            {steps.map((step) => {
              const isDone = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="flex items-start gap-4 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isDone
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-950/40'
                        : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                    } ${isCurrent ? 'ring-4 ring-amber-500/20 animate-pulse' : ''}`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${isDone ? 'text-cream-100' : 'text-zinc-500'}`}>
                        {step.title}
                      </h4>
                      <span className="text-[11px] font-mono text-zinc-500">{step.time}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Details or Pickup Notice */}
          {order.orderType === 'delivery' ? (
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-cream-200">Delivery Address</p>
                  <p className="text-zinc-400 mt-0.5">{order.address || 'Customer provided address'}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dispatch Helpline: +92 300 1234567</span>
                </div>
                <span className="text-amber-400 font-medium">Cash on Delivery / Paid</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <strong className="text-amber-300">Pickup Location:</strong> Restaurant Flagship, Main Boulevard, Gulberg III, Lahore. Please present your Order #{order.orderId} at the pickup counter.
            </div>
          )}

          {/* Order Summary Breakdown */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-3">
              Ordered Dishes ({order.items.length})
            </h4>
            <div className="space-y-2">
              {order.items.map((item: CartItem, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">x{item.quantity}</span>
                    <span className="text-cream-200">{item.dish.name}</span>
                  </div>
                  <span className="font-mono text-zinc-400">
                    Rs. {(item.dish.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-2 flex justify-between text-sm font-bold text-cream-100">
                <span>Total Paid / Due</span>
                <span className="text-amber-400 font-mono">Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
}
