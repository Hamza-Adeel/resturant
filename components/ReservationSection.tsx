'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  Sparkles,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { ReservationDetails } from '../lib/types';
import ReservationSuccessModal from './ReservationSuccessModal';
import { useToast } from '../context/ToastContext';

interface ReservationSectionProps {
  compact?: boolean;
}

export default function ReservationSection({ compact = false }: ReservationSectionProps) {
  const { showToast } = useToast();

  const [formData, setFormData] = useState<ReservationDetails>({
    fullName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '08:00 PM',
    guests: 4,
    seatingPreference: 'Indoor Main Hall',
    specialOccasion: 'Casual Dining',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  const timeSlots = [
    '12:30 PM', '01:00 PM', '01:30 PM', '02:30 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM',
    '09:00 PM', '09:30 PM', '10:00 PM'
  ];

  const seatingOptions = [
    {
      title: 'Indoor Main Hall',
      desc: 'Ambient gold chandeliers & plush family booths',
      icon: '🏛️'
    },
    {
      title: 'Courtyard Terrace',
      desc: 'Alfresco open-air dining under night fairy lights',
      icon: '🌿'
    },
    {
      title: 'Maharaja Private Dining',
      desc: 'Dedicated VIP suite with bespoke butler service',
      icon: '👑'
    }
  ] as const;

  const occasions = [
    'Casual Dining',
    'Family Gathering',
    'Birthday Celebration',
    'Anniversary',
    'Corporate Dinner',
    'Other'
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      showToast('Missing Contact Details', 'Please provide your full name, phone number, and email address.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `MM-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedBookingId(generatedId);
      setIsSubmitting(false);
      setSuccessModalOpen(true);
      showToast('Table Reserved! 🎉', `Your reservation #${generatedId} is confirmed.`, 'success');
    }, 600);
  };

  return (
    <div id="reservation-section" className="relative">
      <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-card-gradient border border-amber-500/30 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form */}
          <div className={compact ? 'lg:col-span-12' : 'lg:col-span-8'}>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 1. Date, Time & Guest Count */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <CalendarIcon className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm uppercase tracking-widest font-bold text-cream-100 font-serif-luxury">
                    1. Date, Time & Party Size
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-2">Dining Date</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-2">Time Slot</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400 min-h-[44px]"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-2">Guests</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400 min-h-[44px] font-mono"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Seating Zone Preference */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm uppercase tracking-widest font-bold text-cream-100 font-serif-luxury">
                    2. Seating Atmosphere
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {seatingOptions.map((opt) => {
                    const isSelected = formData.seatingPreference === opt.title;
                    return (
                      <div
                        key={opt.title}
                        onClick={() => setFormData({ ...formData, seatingPreference: opt.title as any })}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-950/40 border-amber-400 text-cream-100 ring-1 ring-amber-400/80 shadow-lg'
                            : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <h4 className="text-sm font-bold text-cream-100 mt-2 font-serif-luxury">
                          {opt.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Contact & Special Requests */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm uppercase tracking-widest font-bold text-cream-100 font-serif-luxury">
                    3. Guest Details & Notes
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. tariq@example.com"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-2">Occasion</label>
                    <select
                      value={formData.specialOccasion}
                      onChange={(e) => setFormData({ ...formData, specialOccasion: e.target.value as any })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400 min-h-[44px]"
                    >
                      {occasions.map((occ) => (
                        <option key={occ} value={occ}>
                          {occ}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-2">
                    Special Requests / Dietary Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="e.g. High chair needed, anniversary cake service, quiet booth preference..."
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-base shadow-2xl shadow-red-950/60 border border-amber-400/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 cursor-pointer min-h-[48px]"
              >
                <CalendarIcon className="w-5 h-5 text-amber-300" />
                <span>{isSubmitting ? 'Securing Availability...' : 'Confirm Table Reservation'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Policies & Trust Information */}
          {!compact && (
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-[#121217] border border-zinc-800 space-y-4">
                <h3 className="text-base font-serif-luxury font-bold text-cream-100">
                  Dining Guarantee & Policies
                </h3>
                <div className="space-y-3.5 text-xs text-zinc-400 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-zinc-200">15-Minute Grace Window:</strong> Tables are held for 15 minutes past scheduled time before opening to walk-ins.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-zinc-200">Banquets & Large Groups:</strong> Dedicated ustaad and welcome appetizer platter arranged for 10+ guests.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-zinc-200">100% Free Booking:</strong> Zero reservation fees or hidden deposit charges.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-red-950/50 via-[#181216] to-[#121218] border border-amber-500/25 space-y-3">
                <span className="text-[10px] tracking-widest text-amber-400 uppercase font-bold block">
                  VIP Concierge Service
                </span>
                <h4 className="text-sm font-bold text-cream-100 font-serif-luxury">
                  Prefer Direct Phone Booking?
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Our front-of-house concierge team is ready to curate custom dining arrangements.
                </p>
                <a
                  href="tel:+923001234567"
                  className="inline-flex items-center gap-2 text-sm font-mono font-bold text-amber-300 hover:text-amber-200 transition-colors pt-1 min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>+92 300 1234567</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ReservationSuccessModal
        bookingId={confirmedBookingId}
        reservation={formData}
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
    </div>
  );
}
