'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, Search, MessageSquare, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { FAQ_DATA } from '../../lib/data/faq';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openItems, setOpenItems] = useState<string[]>(['faq-1', 'faq-4', 'faq-7']);

  const categories = [
    'All',
    'General Information',
    'Online Orders & Delivery',
    'Dietary & Halal',
  ];

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
          Help & Clarifications
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-cream-100">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Everything you need to know about our opening hours, Halal sourcing, delivery coverage, and menu.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. halal, delivery, spice)..."
            className="w-full pl-12 pr-4 py-3.5 bg-zinc-900/90 border border-zinc-700/80 rounded-2xl text-sm text-cream-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 shadow-xl"
          />
        </div>

        {/* Category Carousel Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-red-700 to-amber-600 text-cream-100 shadow-md border border-amber-400/40'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-cream-100 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {filteredFAQs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <HelpCircle className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-cream-100">No matching questions found</h3>
            <p className="text-xs text-zinc-400">Please try adjusting your keywords or contact our team directly.</p>
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const isOpen = openItems.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#13131a] border border-zinc-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-cream-100">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`p-2 rounded-full bg-zinc-900 text-amber-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Contact Help Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/40 border border-amber-500/20 text-center space-y-4">
        <h3 className="text-xl font-serif-luxury font-bold text-cream-100">
          Still Have Questions?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Our dining concierge is available 7 days a week to answer specific dietary requirements, allergen information, or event setup queries.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Guest Concierge</span>
          </Link>
          <a
            href="tel:+923001234567"
            className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-bold text-xs border border-amber-500/20 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call +92 300 1234567</span>
          </a>
        </div>
      </div>
    </div>
  );
}
