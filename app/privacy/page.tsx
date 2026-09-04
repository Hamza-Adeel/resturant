import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Mirch Masala Restaurant',
  description: 'Understand how Mirch Masala protects your personal information and online ordering data.'
};

export default function PrivacyPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Data Protection & Privacy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-cream-100">
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-400">
          Last Updated: February 2026 • Mirch Masala Dining Group
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-serif-luxury font-bold text-cream-100 flex items-center gap-2">
            <span>1. Information We Collect</span>
          </h2>
          <p>
            When you interact with the Mirch Masala website, place an online delivery order, or subscribe to our newsletter, we collect certain personal identification details to deliver our services, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li><strong>Contact Details:</strong> Full Name, Email Address, and Phone Number.</li>
            <li><strong>Delivery Information:</strong> Physical delivery address and rider notes.</li>
            <li><strong>Order History:</strong> Dishes added to cart and promotional voucher usages.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif-luxury font-bold text-cream-100">
            2. How We Use Your Information
          </h2>
          <p>
            Your information is utilized solely to provide an exceptional restaurant dining and delivery experience:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li>Processing, cooking, packaging, and dispatching food orders to your address.</li>
            <li>Responding to customer service inquiries.</li>
            <li>Sharing optional seasonal specials and private tasting invitations if you subscribe to our newsletter.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif-luxury font-bold text-cream-100">
            3. Payment Security & Integrity
          </h2>
          <p>
            We do not store your raw credit card numbers on our servers. All digital transactions are securely encrypted and processed directly by certified banking gateways and PCI-compliant financial processors. For Cash on Delivery (COD), no financial data is transmitted online.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif-luxury font-bold text-cream-100">
            4. Third-Party Sharing
          </h2>
          <p>
            We respect your privacy and never sell, rent, or trade your personal information to third-party marketing companies. Information is shared only with trusted operational partners strictly necessary to fulfill your request (e.g., dispatch delivery riders and SMS notification gateways).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif-luxury font-bold text-cream-100">
            5. Contact Privacy Officer
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request the deletion of your order contact history, please email our data privacy team at{' '}
            <a href="mailto:privacy@mirchmasala.com" className="text-amber-400 hover:underline">
              privacy@mirchmasala.com
            </a>
            {' '}or call{' '}
            <a href="tel:+923001234567" className="text-amber-400 hover:underline">
              +92 300 1234567
            </a>.
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500">
        <Link href="/" className="text-amber-400 hover:underline">
          ← Back to Homepage
        </Link>
        <Link href="/terms" className="text-amber-400 hover:underline">
          View Terms & Conditions →
        </Link>
      </div>
    </div>
  );
}
