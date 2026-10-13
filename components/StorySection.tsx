'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';
import { Flame, ShieldCheck, HeartHandshake, Sparkles, Award } from 'lucide-react';

export default function StorySection() {
  const { language } = useCart();
  const t = translations[language];

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#0f0f13] border-b border-zinc-800/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Collage (lg:col-span-5) */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-xl bg-zinc-900 group">
              <Image
                src="/images/poulet_braise_platter_1791595758100.jpg"
                alt="Poulet braisé au charbon à Salé"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 450px"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold text-amber-400 block mb-0.5">
                  {language === 'ar' ? 'معايير النظافة والجودة' : 'Excellence & Authenticité'}
                </span>
                <span className="text-sm font-bold text-white">
                  {language === 'ar' ? 'دجاج محمر على الأصول المغربية' : 'Tradition Rôtie au Feu de Bois'}
                </span>
              </div>
            </div>

            {/* Quality Commitment Card */}
            <div className="p-4 rounded-xl bg-[#141418] border border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">
                    {language === 'ar' ? 'التزام بالنظافة التامة' : 'Contrôle Sanitaire Strict'}
                  </span>
                  <span className="text-zinc-400 text-[11px]">
                    {language === 'ar' ? 'فحص يومي للمكونات واللحوم' : 'Fraîcheur quotidienne certifiée'}
                  </span>
                </div>
              </div>
              <span className="text-amber-400 font-bold tabular-nums">100%</span>
            </div>
          </div>

          {/* Right Column: Narrative (lg:col-span-7) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>{language === 'ar' ? 'سر النكهة والطهي' : 'Savoir-Faire Artisanal'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {t.storyTitle}
              </h2>

              <p className="text-sm text-zinc-400">
                {t.storySub}
              </p>
            </div>

            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
              <p>{t.storyP1}</p>
              <p>{t.storyP2}</p>
            </div>

            {/* Editorial Pillars (Section 1.B: Editorial numbering, clean text) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80">
              <div className="p-3.5 rounded-xl bg-[#141418] border border-zinc-800/80 space-y-1">
                <span className="text-xs font-mono font-bold text-amber-500 block">01.</span>
                <h4 className="text-xs font-bold text-white">
                  {language === 'ar' ? 'جمر الحطب الطبيعي' : 'Braise de Chêne'}
                </h4>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {language === 'ar' ? 'بدون شوايات غاز أو كهرباء، طعم مدخن أصيل.' : 'Zéro gaz, cuisson lente pour un goût fumé incomparable.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141418] border border-zinc-800/80 space-y-1">
                <span className="text-xs font-mono font-bold text-amber-500 block">02.</span>
                <h4 className="text-xs font-bold text-white">
                  {language === 'ar' ? 'تتبيلة سلا الخاصة' : 'Marinade de Terroir'}
                </h4>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {language === 'ar' ? 'بابريكا فاخرة، كمون بلدي وزيت زيتون بكر.' : 'Épices sélectionnées, ail confit et huile d’olive extra-vierge.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141418] border border-zinc-800/80 space-y-1">
                <span className="text-xs font-mono font-bold text-amber-500 block">03.</span>
                <h4 className="text-xs font-bold text-white">
                  {language === 'ar' ? 'طلب مباشر وسريع' : 'Commande Directe'}
                </h4>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {language === 'ar' ? 'تجهيز ساخن فوري دون انتظار التطبيقات.' : 'Votre repas prêt et chaud à la minute sans intermédiaires.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
