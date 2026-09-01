'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  Utensils
} from 'lucide-react';
import { ReservationDetails } from '../../lib/types';
import ReservationSuccessModal from '../../components/ReservationSuccessModal';
import { useToast } from '../../context/ToastContext';

export default function ReservationsPage() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState<ReservationDetails>({
    fullName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '08:00 PM',
    guests: 4,
    seatingPreference: 'Indoor Main Hall',
    specialOccasion: 'Family Gathering',
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
      desc: 'Dedicated VIP suite with private service',
      icon: '👑'
    }
  ] as const;

  const occasions = [
    'Casual Dining',
    'Family Gathering',
    'Birthday',
    'Anniversary',
    'Business Meeting',
    'Other'
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      showToast('Missing Details', 'Please provide your full name, phone number, and email.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `MM-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedBookingId(generatedId);
      setIsSubmitting(false);
      setSuccessModalOpen(true);
      showToast('Table Reserved! 🎉', `Your reservation #${generatedId} is confirmed.`, 'success');
    }, 700);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
          Dine With Us
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-cream-100">
          Reserve Your Table
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Book an intimate table, a spacious family booth, or our private Maharaja Suite. We hold reserved tables with utmost punctuality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Reservation Form */}
        <div className="lg:col-span-8">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 rounded-3xl bg-[#13131a] border border-amber-500/30 shadow-2xl space-y-8"
          >
            {/* 1. Date & Time & Guests */}
            <div className="space-y-4">
              <h3 className="text-base font-serif-luxury font-bold text-cream-100 uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-amber-400" />
                <span>1. Select Date, Time & Guests</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-2">Dining Date</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Time Slot Selector */}
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-2">Time Slot</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guests Counter */}
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-2">Number of Guests</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400 font-mono"
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

            {/* 2. Seating Preference Cards */}
            <div className="space-y-4">
              <h3 className="text-base font-serif-luxury font-bold text-cream-100 uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>2. Seating Zone</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {seatingOptions.map((opt) => {
                  const isSelected = formData.seatingPreference === opt.title;
                  return (
                    <div
                      key={opt.title}
                      onClick={() => setFormData({ ...formData, seatingPreference: opt.title as any })}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-950/40 border-amber-400 text-cream-100 ring-1 ring-amber-400 shadow-lg'
                          : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
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

            {/* 3. Occasion & Personal Info */}
            <div className="space-y-4">
              <h3 className="text-base font-serif-luxury font-bold text-cream-100 uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>3. Guest Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
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
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ayesha@example.com"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-2">Special Occasion</label>
                  <select
                    value={formData.specialOccasion}
                    onChange={(e) => setFormData({ ...formData, specialOccasion: e.target.value as any })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-2">
                  Special Requests / Dietary Needs (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="e.g. High chair needed, anniversary cake celebration, quiet corner table..."
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-base shadow-xl shadow-red-950/60 border border-amber-400/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <CalendarIcon className="w-5 h-5 text-amber-300" />
              <span>{isSubmitting ? 'Confirming Availability...' : 'Confirm Table Reservation'}</span>
            </button>
          </form>
        </div>

        {/* Sidebar Info & Policies */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-[#14141c] border border-zinc-800 space-y-4">
            <h3 className="text-lg font-serif-luxury font-bold text-cream-100">
              Reservation Policies
            </h3>
            <div className="space-y-3 text-xs text-zinc-400 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>15-Minute Grace Period:</strong> Tables are held for 15 minutes past scheduled time before being offered to walk-ins.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Large Parties (10+ Guests):</strong> A complimentary pre-fixed welcome appetizer is arranged for large celebrations.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>No Reservation Fees:</strong> Booking your table online is 100% complimentary.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-red-950/40 to-zinc-900 border border-amber-500/20 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 font-serif-luxury">
              Prefer to Book by Phone?
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our reservation concierge is available daily between 11:00 AM – 11:00 PM for custom arrangements.
            </p>
            <a
              href="tel:+923001234567"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-cream-100 hover:text-amber-300 transition-colors pt-1"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+92 300 1234567</span>
            </a>
          </div>
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
