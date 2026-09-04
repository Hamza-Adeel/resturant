'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MobileCartButton() {
  const { itemCount, setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed right-4 bottom-20 z-40 lg:hidden w-14 h-14 rounded-full bg-gradient-to-tr from-red-700 via-red-800 to-amber-600 text-white shadow-xl shadow-red-950/60 border-2 border-amber-400/50 flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
      aria-label={`Open shopping cart with ${itemCount} items`}
    >
      <ShoppingBag className="w-6 h-6 text-amber-200" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-zinc-950 font-bold text-[10px] rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}