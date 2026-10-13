'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';
import { ShoppingBag, Flame } from 'lucide-react';

export default function MobileOrderBar() {
  const { setIsCartOpen, total, totalCount, language } = useCart();
  const t = translations[language];

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-30">
      <button
        onClick={() => setIsCartOpen(true)}
        className="w-full h-13 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold text-xs flex items-center justify-between shadow-2xl shadow-orange-950/60 active:scale-[0.98] transition-all border border-orange-400/30"
        aria-label="Open Cart Drawer"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-white" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-black text-amber-400 text-[10px] font-bold flex items-center justify-center border border-amber-400/40">
                {totalCount}
              </span>
            )}
          </div>
          <span>
            {totalCount > 0
              ? `${t.cartButton} (${totalCount})`
              : t.orderDirect}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {totalCount > 0 && (
            <span className="bg-black/30 px-2 py-0.5 rounded text-amber-200 tabular-nums font-extrabold">
              {total} {t.currency}
            </span>
          )}
          <span className="text-[11px] underline font-medium">
            {language === 'ar' ? 'عرض السلة' : 'Commander'}
          </span>
        </div>
      </button>
    </div>
  );
}
