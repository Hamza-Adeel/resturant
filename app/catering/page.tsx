'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Phone,
  CheckCircle2,
  Award,
  Flame,
  ArrowRight,
  ShieldCheck,
  Send,
  Calculator
} from 'lucide-react';
import { CATERING_PACKAGES } from '../../lib/data/catering';
import { useToast } from '../../context/ToastContext';

export default function CateringPage() {
  const { showToast } = useToast();

  // Dynamic Estimator State
  const [selectedPackageId, setSelectedPackageId] = useState(CATERING_PACKAGES[1].id);
  const [guestCount, setGuestCount] = useState(75);

  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding / Barat / Walima',
    eventDate: '',
    guestCount: 100,
    venueLocation: '',
    budget: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  const selectedPkg = CATERING_PACKAGES.find((p) => p.id === selectedPackageId) || CATERING_PACKAGES[1];
  const estimatedTotal = selectedPkg.pricePerPerson * guestCount;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.eventDate) {
      showToast('Incomplete Form', 'Please provide your name, phone number, and event date.', 'error');
      return;
    }

    const generatedQuoteId = `CAT-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuoteId(generatedQuoteId);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    }

    showToast('Catering Quote Requested! 👑', `Our Head of Events will contact you within 2 business hours.`, 'success');
  };

  const eventTypes = [
    'Wedding / Barat / Walima',
    'Mehndi / Qawwali Night',
    'Corporate Dinner / Gala',
    'Birthday / Anniversary Celebration',
    'Private Farmhouse Gathering',
    'High-Profile VIP Reception'
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
          Royal Event Catering
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-cream-100">
          Make Your Event Deliciously <br />
          <span className="text-gold-gradient italic">Memorable.</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          From grand wedding banquets to executive corporate galas, Mirch Masala brings live charcoal grills, clay tandoors, and royal South Asian hospitality to your venue.
        </p>
      </div>

      {/* 2. Interactive Packages Grid */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Curated Banquets</span>
          <h2 className="text-3xl font-serif-luxury font-bold text-cream-100">
            Catering Packages
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Choose a package or customize every single course for your celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CATERING_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.isPopular
                    ? 'bg-gradient-to-b from-[#1c141d] to-[#121217] border-2 border-amber-500 shadow-2xl shadow-amber-950/30'
                    : 'bg-[#13131a] border border-zinc-800'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif-luxury font-bold text-cream-100">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block">
                      Starting At
                    </span>
                    <span className="text-3xl font-mono font-bold text-amber-400">
                      Rs. {pkg.pricePerPerson.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-400 block mt-0.5">per guest (min {pkg.minGuests} guests)</span>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-red-400" />
                        <span>Starters & Live Stations</span>
                      </h4>
                      <ul className="space-y-1 text-zinc-300">
                        {pkg.starters.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Signature Main Courses</span>
                      </h4>
                      <ul className="space-y-1 text-zinc-300">
                        {pkg.mains.map((m, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Rice, Breads & Desserts</span>
                      </h4>
                      <ul className="space-y-1 text-zinc-300">
                        {pkg.riceAndBreads.concat(pkg.desserts).map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => {
                      setSelectedPackageId(pkg.id);
                      document.getElementById('estimator-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-zinc-950 shadow-lg'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-cream-100'
                    }`}
                  >
                    {isSelected ? '✓ Selected in Estimator' : 'Select for Estimate'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Dynamic Quote Calculator */}
      <div id="estimator-section" className="p-8 sm:p-12 rounded-3xl bg-[#111116] border border-amber-500/30 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold">
              <Calculator className="w-4 h-4" />
              <span>Instant Event Estimator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-cream-100 mt-1">
              Calculate Your Catering Budget
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-right">
            <span className="text-[11px] text-zinc-400 uppercase block font-medium">Estimated Investment</span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">
              Rs. {estimatedTotal.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 block">Excluding venue setup fees</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Slider for Guests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-cream-100">
                Number of Expected Guests:
              </label>
              <span className="px-4 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-mono font-bold text-base border border-amber-500/30">
                {guestCount} Guests
              </span>
            </div>

            <input
              type="range"
              min="25"
              max="500"
              step="5"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />

            <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
              <span>25 Guests</span>
              <span>100 Guests</span>
              <span>250 Guests</span>
              <span>500+ Guests</span>
            </div>
          </div>

          {/* Selected Package Breakdown */}
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 font-serif-luxury">
              Active Package: {selectedPkg.name}
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Per Guest Rate</span>
                <span className="font-mono text-zinc-200">Rs. {selectedPkg.pricePerPerson}</span>
              </div>
              <div className="flex justify-between">
                <span>Guest Count</span>
                <span className="font-mono text-zinc-200">{guestCount} People</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-800 font-bold text-cream-100">
                <span>Estimated Subtotal</span>
                <span className="font-mono text-amber-400">Rs. {estimatedTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Inquiry Form */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#13131a] border border-amber-500/30 shadow-2xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Direct Inquiry</span>
          <h2 className="text-3xl font-serif-luxury font-bold text-cream-100">
            Request a Customized Catering Proposal
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Tell us about your occasion and our catering manager will arrange a complimentary tasting consultation.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/40 border border-amber-500/40 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-amber-500 text-zinc-950 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif-luxury font-bold text-cream-100">
              Inquiry Received • Ref #{quoteId}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
              Thank you, {formData.name}. Our Head of Events will review your details for {formData.eventType} and contact you at {formData.phone} shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-zinc-800 text-amber-300 font-bold text-xs"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Your Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Tariq Mehmood"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +92 300 1234567"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. tariq@example.com"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Event Type</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400"
              >
                {eventTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Event Date *</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Estimated Guests</label>
              <input
                type="number"
                min="25"
                max="1500"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Venue / City Location</label>
              <input
                type="text"
                value={formData.venueLocation}
                onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                placeholder="e.g. Royal Palm Golf Club / Private Residence, Lahore"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Approximate Budget (PKR)</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="e.g. Rs. 300,000"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="text-xs text-zinc-400 font-semibold block mb-1.5">
                Special Dietary Requests, Theme, or Dish Customizations
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention if live tandoor stations, live karahi wok stalls, or specific sweet courses are required..."
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="sm:col-span-3 pt-2">
              <button
                type="submit"
                className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-base shadow-xl shadow-red-950/60 border border-amber-400/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Submit Catering Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
