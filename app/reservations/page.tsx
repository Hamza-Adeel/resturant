'use client';

import React from 'react';
import ReservationSection from '../../components/ReservationSection';

export default function ReservationsPage() {
  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
          Dine With Us
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-cream-100">
          Reserve Your Table
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Book an intimate table, a spacious family booth, or our private Maharaja Suite. We hold reserved tables with utmost punctuality and royal hospitality.
        </p>
      </div>

      {/* Reservation Interactive Component */}
      <ReservationSection />
    </div>
  );
}
