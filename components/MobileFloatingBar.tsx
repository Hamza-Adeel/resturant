'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed, Phone, Home } from 'lucide-react';

export default function MobileFloatingBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0e0e14]/98 backdrop-blur-xl border-t border-amber-500/20 px-3 py-1.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-1 items-center max-w-md mx-auto text-center">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center min-h-[44px] rounded-xl transition-colors ${
            pathname === '/' ? 'text-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* Menu */}
        <Link
          href="/menu"
          className={`flex flex-col items-center justify-center min-h-[44px] rounded-xl transition-colors ${
            pathname === '/menu' ? 'text-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">Menu</span>
        </Link>

        {/* Call Us */}
        <a
          href="tel:+923001234567"
          className="flex flex-col items-center justify-center min-h-[44px] rounded-xl text-zinc-400 hover:text-amber-400 transition-colors"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">Call</span>
        </a>
      </div>
    </div>
  );
}
