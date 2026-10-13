'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { MenuItem } from '@/types';
import { translations } from '@/data/translations';
import { X, Plus, Minus, Flame, Users, Clock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const { language, addToCart } = useCart();
  const t = translations[language];

  const [quantity, setQuantity] = useState(1);
  const [selectedSauce, setSelectedSauce] = useState<string>(
    item?.availableOptions?.sauces?.[0]?.id || ''
  );
  const [selectedSide, setSelectedSide] = useState<string>(
    item?.availableOptions?.sides?.[0]?.id || 'none'
  );
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!item) return null;

  // Calculate dynamic price based on chosen side
  let sideExtra = 0;
  if (item.availableOptions?.sides) {
    const matched = item.availableOptions.sides.find((s) => s.id === selectedSide);
    if (matched) sideExtra = matched.price;
  }
  const itemTotal = (item.price + sideExtra) * quantity;

  const handleAdd = () => {
    addToCart(
      item,
      quantity,
      {
        sauce: selectedSauce,
        side: selectedSide,
        specialInstructions: specialInstructions.trim() || undefined,
      }
    );
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-[#15151a] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative aspect-[16/9] w-full bg-zinc-900 shrink-0">
            <Image
              src={item.image}
              alt={language === 'ar' ? item.nameAr : item.nameFr}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 500px"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15151a] via-[#15151a]/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="text-xl font-bold text-white leading-tight">
                {language === 'ar' ? item.nameAr : item.nameFr}
              </h3>
            </div>
          </div>

          {/* Scrollable Form Body */}
          <div className="p-5 overflow-y-auto space-y-5 text-sm">
            {/* Meta tags unboxed with separators */}
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="flex items-center gap-1 text-zinc-300">
                <Users className="w-3.5 h-3.5 text-zinc-400" />
                <span>{language === 'ar' ? item.servesAr : item.servesFr}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>{item.preparationTime}</span>
              </span>
              {item.isChefSpecial && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400 font-medium">
                    {language === 'ar' ? 'وصفة خاصة' : 'Spécialité Maison'}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-zinc-300 leading-relaxed text-sm">
              {language === 'ar' ? item.descriptionAr : item.descriptionFr}
            </p>

            {/* Sauce Options if available */}
            {item.availableOptions?.sauces && item.availableOptions.sauces.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <label className="block text-xs font-semibold text-zinc-200">
                  {t.chooseSauce}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {item.availableOptions.sauces.map((sauce) => (
                    <button
                      key={sauce.id}
                      type="button"
                      onClick={() => setSelectedSauce(sauce.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border text-start transition-colors ${
                        selectedSauce === sauce.id
                          ? 'border-amber-500/80 bg-amber-500/10 text-white'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span className="font-medium text-xs">
                        {language === 'ar' ? sauce.nameAr : sauce.nameFr}
                      </span>
                      {selectedSauce === sauce.id && (
                        <Check className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Side Options if available */}
            {item.availableOptions?.sides && item.availableOptions.sides.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <label className="block text-xs font-semibold text-zinc-200">
                  {t.chooseSide}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {item.availableOptions.sides.map((side) => (
                    <button
                      key={side.id}
                      type="button"
                      onClick={() => setSelectedSide(side.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border text-start transition-colors ${
                        selectedSide === side.id
                          ? 'border-amber-500/80 bg-amber-500/10 text-white'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span className="font-medium text-xs">
                        {language === 'ar' ? side.nameAr : side.nameFr}
                      </span>
                      {selectedSide === side.id && (
                        <Check className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions Input */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
              <label className="block text-xs font-semibold text-zinc-300">
                {t.notesLabel}
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder={t.instructionsPlaceholder}
                className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Modal Footer with quantity stepper & primary action */}
          <div className="p-4 bg-[#111115] border-t border-zinc-800 flex items-center justify-between gap-4 shrink-0">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-300 disabled:opacity-40"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-7 text-center font-bold text-white tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-300"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Submit Add to Cart Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-sm flex items-center justify-between shadow-lg shadow-orange-950/40 transition-all active:scale-[0.98]"
            >
              <span>{t.addToCart}</span>
              <span className="tabular-nums font-bold">
                {itemTotal} {t.currency}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
