'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Missing Fields', 'Please fill in your name, email, and message.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Message Sent! ✉️', 'Thank you for getting in touch. Our manager will reply shortly.', 'success');
  };

  const schedule = [
    { day: 'Monday', hours: '12:00 PM – 11:00 PM' },
    { day: 'Tuesday', hours: '12:00 PM – 11:00 PM' },
    { day: 'Wednesday', hours: '12:00 PM – 11:00 PM' },
    { day: 'Thursday', hours: '12:00 PM – 11:00 PM' },
    { day: 'Friday', hours: '12:00 PM – 12:00 AM (Midnight)', highlight: true },
    { day: 'Saturday', hours: '12:00 PM – 12:00 AM (Midnight)', highlight: true },
    { day: 'Sunday', hours: '12:00 PM – 11:00 PM' }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
          Connect With Us
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-cream-100">
          Contact Mirch Masala
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Have a dining query or feedback on your recent feast? We are delighted to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information & Hours */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Box */}
          <div className="p-8 rounded-3xl bg-[#13131a] border border-amber-500/30 shadow-2xl space-y-6">
            <h3 className="text-xl font-serif-luxury font-bold text-cream-100 border-b border-zinc-800 pb-3">
              Restaurant Headquarters
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-cream-100">Physical Address</h4>
                  <p className="text-zinc-400 mt-0.5 leading-relaxed">
                    Main Boulevard, Gulberg III, Lahore, Punjab 54000, Pakistan
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-amber-400 text-xs font-semibold hover:underline mt-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps ↗</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-cream-100">Telephone & WhatsApp</h4>
                  <a href="tel:+923001234567" className="font-mono text-amber-300 hover:underline block mt-0.5">
                    +92 300 1234567
                  </a>
                  <p className="text-[11px] text-zinc-500">Takeaway & Delivery Line</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-cream-100">Email Inquiries</h4>
                  <a href="mailto:dining@mirchmasala.com" className="text-amber-300 hover:underline block mt-0.5">
                    dining@mirchmasala.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-zinc-800">
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-3">
                Follow Our Culinary Journeys
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-amber-500 hover:text-zinc-950 border border-zinc-800 flex items-center justify-center transition-colors text-zinc-300"
                  aria-label="Follow on Instagram"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-amber-500 hover:text-zinc-950 border border-zinc-800 flex items-center justify-center transition-colors text-zinc-300"
                  aria-label="Follow on Facebook"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-amber-500 hover:text-zinc-950 border border-zinc-800 flex items-center justify-center transition-colors text-zinc-300"
                  aria-label="Watch on YouTube"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hours Table */}
          <div className="p-8 rounded-3xl bg-[#13131a] border border-zinc-800 space-y-4">
            <h3 className="text-lg font-serif-luxury font-bold text-cream-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Dining & Kitchen Schedule</span>
            </h3>

            <div className="space-y-2 text-xs">
              {schedule.map((item) => (
                <div
                  key={item.day}
                  className={`flex justify-between py-2 border-b border-zinc-800/60 ${
                    item.highlight ? 'text-amber-300 font-semibold bg-amber-500/5 px-2 rounded-lg' : 'text-zinc-300'
                  }`}
                >
                  <span>{item.day}:</span>
                  <span className="font-mono">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact / Message Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#13131a] border border-amber-500/30 shadow-2xl space-y-6">
            <div>
              <h3 className="text-2xl font-serif-luxury font-bold text-cream-100">
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                We value your comments and respond promptly to all guest inquiries.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-500 text-zinc-950 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-serif-luxury font-bold text-cream-100">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                  Thank you, {formData.name}. Your inquiry has been forwarded to our guest relations team.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-5 py-2 bg-zinc-800 text-amber-300 font-bold text-xs rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ayesha@example.com"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 focus:outline-none focus:border-amber-400"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Feedback on Dining Experience">Feedback on Dining Experience</option>
                      <option value="Dietary or Allergen Inquiry">Dietary or Allergen Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1.5">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-cream-100 font-bold text-sm shadow-xl shadow-red-950/60 border border-amber-400/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

            {/* Map Preview Area */}
            <div className="pt-4 border-t border-zinc-800">
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-3">
                Map Location & Parking
              </h4>
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center p-6 text-center">
                <div className="space-y-2">
                  <MapPin className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-xs text-cream-100 font-semibold">
                    Mirch Masala Flagship • Main Boulevard Gulberg III, Lahore
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Complimentary Valet Parking available at main entrance.
                  </p>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
