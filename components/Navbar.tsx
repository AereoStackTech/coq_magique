'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';
import { ShoppingBag, Flame, Menu, X, Phone, Clock } from 'lucide-react';

export default function Navbar() {
  const { cart, setIsCartOpen, total, totalCount, language, setLanguage, isKitchenOpen } = useCart();
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#111114]/95 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      {/* Top micro announcement with real-time status */}
      <div className="bg-[#18181c] border-b border-zinc-800/60 px-4 py-1.5 text-xs text-zinc-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${isKitchenOpen ? 'bg-amber-400' : 'bg-zinc-500'}`} />
            <span className="font-medium text-zinc-200">
              {isKitchenOpen ? t.kitchenOpen : t.kitchenClosed}
            </span>
            <span className="text-zinc-500 hidden sm:inline">·</span>
            <span className="text-zinc-400 hidden sm:inline">
              سلا - تابريكت (Salé, Maroc)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+212537804020"
              className="hidden md:flex items-center gap-1.5 text-zinc-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span className="tabular-nums">+212 5 37 80 40 20</span>
            </a>
            <button
              onClick={toggleLanguage}
              className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors border border-zinc-700/60"
              aria-label="Toggle language"
            >
              {language === 'ar' ? 'Français' : 'العربية'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <a href="#hero" className="flex items-center gap-2 whitespace-nowrap shrink-0 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-950/30">
            <Flame className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-none">
              Volaille & Feu
            </span>
            <span className="text-[11px] text-amber-500/90 font-medium tracking-wide">
              {language === 'ar' ? 'شواء الحطب · سلا' : 'Braise & Terroir · Salé'}
            </span>
          </div>
        </a>

        {/* Zone 2: Concise Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a href="#menu" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            {t.navMenu}
          </a>
          <a href="#story" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            {t.navStory}
          </a>
          <a href="#location" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            {t.navLocation}
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            {t.navContact}
          </a>
        </nav>

        {/* Zone 3: Primary Action (Cart Drawer Trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-sm shadow-md shadow-orange-950/40 transition-all active:scale-95 whitespace-nowrap shrink-0"
            aria-label="Open Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-white" />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-amber-400 text-[10px] font-bold flex items-center justify-center border border-amber-500/50">
                  {totalCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">{t.cartButton}</span>
            {totalCount > 0 && (
              <span className="tabular-nums font-semibold bg-black/20 px-1.5 py-0.5 rounded text-xs">
                {total} {t.currency}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#141418] px-4 py-4 space-y-3">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-200 hover:text-amber-400 font-medium"
          >
            {t.navMenu}
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-200 hover:text-amber-400 font-medium"
          >
            {t.navStory}
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-200 hover:text-amber-400 font-medium"
          >
            {t.navLocation}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-200 hover:text-amber-400 font-medium"
          >
            {t.navContact}
          </a>
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <span>{language === 'ar' ? 'سلا، تابريكت' : 'Salé, Tabriquet'}</span>
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="text-amber-400 font-medium hover:underline"
            >
              {language === 'ar' ? 'Passer en Français' : 'التحويل إلى العربية'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
