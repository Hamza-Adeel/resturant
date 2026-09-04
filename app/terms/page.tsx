import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Mirch Masala Restaurant',
  description: 'Review our terms of service, allergen notices, and online ordering terms.'
};

export default function TermsPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold">
          <FileText className="w-4 h-4" />
          <span>Dining Policies & Guidelines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-cream-100">
          Terms & Conditions
        </h1>
        <p className="text-xs text-zinc-400">
          Last Updated: February 2026 • Mirch Masala Hospitality Rules
        </p>
      </div>

      {/* Terms Body */}
      <div className="space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-serif-luxury font-bold text-cream-100">
            1. Restaurant & Order Policy
          </h2>
          <p>
            Please contact the restaurant directly for questions about dine-in availability, takeaway, or special order requests. Online orders are subject to menu availability and kitchen capacity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif-luxury font-bold text-cream-100">
            2. Online Orders, Delivery & Takeaway
          </h2>
          <p>
            All delivery orders placed on our website are freshly cooked upon ticket confirmation. Standard delivery times range from 35 to 45 minutes depending on distance, traffic conditions, and kitchen load during weekend peak hours.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li><strong>Delivery Thresholds:</strong> Free delivery applies automatically for carts valued at Rs. 2,500 or higher before taxes.</li>
            <li><strong>Order Cancellations:</strong> Orders may only be cancelled within 5 minutes of placement before ingredients enter the active wok/tandoor cooking stage.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif-luxury font-bold text-cream-100">
            3. Allergen Notice & Spice Customization
          </h2>
          <p>
            While our master chefs take exceptional precautions to accommodate dietary preferences and list allergen indicators on every dish card (Dairy, Nuts, Gluten, Shellfish), our kitchen prepares dishes in an open traditional environment where cross-contact with allergens may occur.
          </p>
          <p>
            Guests with severe or life-threatening allergies must inform our management prior to placing food orders or dining in person.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif-luxury font-bold text-cream-100">
            4. Order Changes & Cancellations
          </h2>
          <p>
            Orders may only be cancelled within 5 minutes of placement before ingredients enter the active cooking stage.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif-luxury font-bold text-cream-100">
            5. Intellectual Property & Brand Rights
          </h2>
          <p>
            The name &ldquo;Mirch Masala&rdquo;, our logo wordmark, bespoke food imagery, recipes, website layout, and brand styling are protected intellectual properties of the Mirch Masala Restaurant Group. Unauthorized commercial duplication is prohibited.
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500">
        <Link href="/" className="text-amber-400 hover:underline">
          ← Back to Homepage
        </Link>
        <Link href="/privacy" className="text-amber-400 hover:underline">
          Read Privacy Policy →
        </Link>
      </div>
    </div>
  );
}
