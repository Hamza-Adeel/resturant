'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Calendar, Clock, Users, MapPin, Sparkles, X, Share2 } from 'lucide-react';
import { ReservationDetails } from '../lib/types';

interface ReservationSuccessModalProps {
  bookingId: string;
  reservation: ReservationDetails;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationSuccessModal({
  bookingId,
  reservation,
  isOpen,
  onClose
}: ReservationSuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#b91c1c', '#f59e0b', '#ffffff']
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#14141a] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200 text-cream-100">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-amber-950 p-6 text-center relative border-b border-zinc-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-zinc-400 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-zinc-950 mx-auto flex items-center justify-center shadow-xl shadow-amber-950/50 mb-3">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Table Reserved Successfully</span>
          </span>
          <h2 className="text-2xl font-serif-luxury font-bold text-cream-100 mt-1">
            We Look Forward to Welcoming You
          </h2>
          <p className="text-xs text-zinc-300 mt-1">
            Booking Reference: <strong className="font-mono text-amber-300 font-bold">{bookingId}</strong>
          </p>
        </div>

        {/* Details Card */}
        <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-zinc-400">Guest Name:</span>
              <span className="font-semibold text-cream-100">{reservation.fullName}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Date:</span>
              </span>
              <span className="font-semibold text-cream-100">{reservation.date}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Time Slot:</span>
              </span>
              <span className="font-semibold text-cream-100">{reservation.time}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Party Size:</span>
              </span>
              <span className="font-semibold text-cream-100">{reservation.guests} Guests</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Seating Area:</span>
              </span>
              <span className="font-semibold text-amber-300">{reservation.seatingPreference}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Occasion:</span>
              <span className="font-semibold text-cream-100">{reservation.specialOccasion}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
            <strong>Table Hold Policy:</strong> Your reserved table will be held for up to 15 minutes past your scheduled time. An SMS and email confirmation have been dispatched to {reservation.phone}.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[#0e0e13] border-t border-zinc-800 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Print / Save Voucher</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 text-white font-bold text-xs shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
