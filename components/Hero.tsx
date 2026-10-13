'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';
import { Flame, ArrowDown, Clock, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const { language, setIsCartOpen, isKitchenOpen } = useCart();
  const t = translations[language];

  return (
    <section id="hero" className="relative overflow-hidden bg-[#0e0e12] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-800/60">
      {/* Background ambient ember glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-600/10 via-orange-600/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative & Action (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status & Location kicker - unboxed text per Zero-Pill discipline */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500/20" />
                <span>{language === 'ar' ? 'طهي على الحطب الطبيعي' : 'Braise Naturelle au Feu de Bois'}</span>
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{language === 'ar' ? 'سلا، المغرب' : 'Salé, Maroc'}</span>
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className={isKitchenOpen ? 'text-amber-300' : 'text-zinc-400'}>
                {isKitchenOpen ? (language === 'ar' ? 'مفتوح للطلب الفوري' : 'Commandes ouvertes') : (language === 'ar' ? 'يفتح 11:30' : 'Ouvre à 11h30')}
              </span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.15] text-balance">
              {t.heroTitlePrefix}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500">
                {t.heroTitleHighlight}
              </span>
            </h1>

            {/* Lead paragraph */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
              {t.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#menu"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-semibold text-base shadow-lg shadow-orange-950/40 text-center transition-all active:scale-[0.98]"
              >
                {t.exploreMenu}
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700/90 border border-zinc-700 text-zinc-100 font-semibold text-base text-center transition-all active:scale-[0.98]"
              >
                {t.orderDirect}
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-center sm:text-start">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">100%</div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {language === 'ar' ? 'حطب بلوط طبيعي' : 'Bois de chêne naturel'}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">0%</div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {language === 'ar' ? 'عمولة تطبيقات وسيطة' : 'Commissions intermédiaires'}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">20-25 min</div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {language === 'ar' ? 'وقت تحضير قياسي' : 'Préparation minute'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Card (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-[#141418] group">
              {/* Aspect Ratio 16:9 or 4:3 container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full">
                <Image
                  src="/images/hero_woodfired_chicken_1791595746984.jpg"
                  alt="Poulet braisé au feu de bois à Salé"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  referrerPolicy="no-referrer"
                />
                {/* Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating caption over image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'تخصصنا الأول في سلا' : 'Spécialité Signature'}
                  </div>
                  <div className="text-base sm:text-lg font-bold leading-snug">
                    {language === 'ar' ? 'دجاج محمر على الجمر بالخلطة الخاصة' : 'Poulet Braisé aux Épices Rôties'}
                  </div>
                  <div className="text-xs text-zinc-300 mt-1 flex items-center justify-between">
                    <span>{language === 'ar' ? 'محضر طازجاً كل يوم' : 'Rôti sur commande minute'}</span>
                    <span className="font-bold text-amber-300 tabular-nums">85 MAD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Proof Banner below Hero Split */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 rounded-xl bg-[#141418] border border-zinc-800/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-950/60 border border-orange-800/50 flex items-center justify-center shrink-0 text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{t.feature1Title}</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{t.feature1Desc}</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#141418] border border-zinc-800/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-800/50 flex items-center justify-center shrink-0 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{t.feature2Title}</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{t.feature2Desc}</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#141418] border border-zinc-800/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 text-zinc-200">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{t.feature3Title}</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{t.feature3Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
