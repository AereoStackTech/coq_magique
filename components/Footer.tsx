'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';
import { Flame, MapPin, Phone, MessageSquare, Info } from 'lucide-react';

export default function Footer() {
  const { language } = useCart();
  const t = translations[language];

  return (
    <footer id="contact" className="bg-[#0b0b0e] border-t border-zinc-800 text-zinc-400 text-xs">
      {/* Upper footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Volaille & Feu
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              {t.tagline}
            </p>
            <div className="text-[11px] text-zinc-500">
              Salé, Tabriquet / Bettana · Maroc
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              {language === 'ar' ? 'روابط سريعة' : 'Navigation'}
            </h4>
            <ul className="space-y-1.5 text-zinc-400 text-xs">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  {t.navMenu}
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-amber-400 transition-colors">
                  {t.navStory}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  {t.navLocation}
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'الرئيسية' : 'Accueil'}
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              {language === 'ar' ? 'التواصل المباشر' : 'Contact Direct'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <a href="tel:+212537804020" className="hover:text-white tabular-nums">
                  +212 5 37 80 40 20
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href="https://wa.me/212661902030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white tabular-nums"
                >
                  WhatsApp: +212 6 61 90 20 30
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Salé, Tabriquet</span>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              {t.openingHoursLabel}
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              {t.openingHoursValue}
            </p>
            <div className="pt-1">
              <span className="text-[11px] text-amber-400/90 font-medium">
                {language === 'ar' ? 'خدمة متواصلة للغداء والعشاء' : 'Service continu midi & soir'}
              </span>
            </div>
          </div>
        </div>

        {/* Portfolio Disclaimer Box (Mandatory Compliance) */}
        <div className="mt-10 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{t.disclaimerTitle}</span>
          </div>
          <p>{t.disclaimerText}</p>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>{t.rightsReserved}</div>
          <div className="text-zinc-500">
            Salé, Royaume du Maroc
          </div>
        </div>
      </div>
    </footer>
  );
}
