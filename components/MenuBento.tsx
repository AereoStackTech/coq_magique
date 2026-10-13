'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS } from '@/data/menu';
import { CategoryId, MenuItem } from '@/types';
import { translations } from '@/data/translations';
import ItemModal from './ItemModal';
import { Search, Plus, Clock, Users, Flame, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MenuBento() {
  const { language, addToCart, selectedItemForDetail, setSelectedItemForDetail } = useCart();
  const t = translations[language];

  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'grillades', label: t.categories.grillades },
    { id: 'formules', label: t.categories.formules },
    { id: 'salades', label: t.categories.salades },
    { id: 'accompagnements', label: t.categories.accompagnements },
    { id: 'boissons', label: t.categories.boissons },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        item.nameAr.toLowerCase().includes(query) ||
        item.nameFr.toLowerCase().includes(query) ||
        item.descriptionAr.toLowerCase().includes(query) ||
        item.descriptionFr.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCardClick = (item: MenuItem) => {
    // If item has sauces or sides options, open customization modal
    if (item.availableOptions?.sauces || item.availableOptions?.sides) {
      setSelectedItemForDetail(item);
    } else {
      addToCart(item, 1);
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#0d0d10] border-b border-zinc-800/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/80">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{language === 'ar' ? 'تشكيلة طازجة ومحضرة على الجمر' : 'Préparation Minute au Charbon'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {t.bentoHeader}
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              {t.bentoSub}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'ابحث عن وجبة أو طبق...' : 'Rechercher un plat...'}
              className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs: Functional segmented control per Section 1.A */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-6 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-950/30'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const hasOptions = !!(item.availableOptions?.sauces || item.availableOptions?.sides);

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#141418] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col group shadow-lg"
                >
                  {/* Image slot taking ~65% visual weight */}
                  <div className="relative aspect-[4/3] w-full bg-zinc-900 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={language === 'ar' ? item.nameAr : item.nameFr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent opacity-90" />

                    {/* Subtle text tags (zero-pill discipline: unboxed quiet text) */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-amber-500/20">
                      {item.isPopular && <span>{t.popular}</span>}
                      {item.isPopular && item.isChefSpecial && <span>·</span>}
                      {item.isChefSpecial && <span>{t.chefChoice}</span>}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <span className="text-xl font-extrabold text-white tabular-nums drop-shadow-sm">
                        {item.price} <span className="text-xs font-semibold text-amber-400">{t.currency}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-zinc-500" />
                          <span>{language === 'ar' ? item.servesAr : item.servesFr}</span>
                        </span>
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-500" />
                          <span>{item.preparationTime}</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                        {language === 'ar' ? item.nameAr : item.nameFr}
                      </h3>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {language === 'ar' ? item.descriptionAr : item.descriptionFr}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-zinc-800/70 flex items-center justify-between gap-3">
                      {hasOptions ? (
                        <button
                          type="button"
                          onClick={() => setSelectedItemForDetail(item)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors text-center"
                        >
                          {t.customise}
                        </button>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => handleCardClick(item)}
                        className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 ${
                          hasOptions
                            ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white'
                            : 'w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white'
                        }`}
                        aria-label="Add to cart"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t.addToCart}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty search results fallback */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-[#141418] rounded-2xl border border-zinc-800 p-8">
            <p className="text-zinc-400 text-sm">
              {language === 'ar'
                ? 'لم يتم العثور على أطباق تطابق بحثك. جرّب كلمة أخرى.'
                : 'Aucun plat ne correspond à votre recherche. Essayez un autre mot-clé.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-xs text-amber-400 font-semibold hover:underline"
            >
              {language === 'ar' ? 'عرض جميع الأطباق' : 'Réinitialiser la recherche'}
            </button>
          </div>
        )}
      </div>

      {/* Item Detail / Customization Modal */}
      <ItemModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
      />
    </section>
  );
}
