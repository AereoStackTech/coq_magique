'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';
import { OrderType } from '@/types';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Store,
  Bike,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TIME_SLOTS = [
  { id: 'asap', labelAr: 'في أقرب وقت (20-30 دقيقة)', labelFr: 'Au plus vite (20-30 min)' },
  { id: '12:30', labelAr: '12:30 - 13:00', labelFr: '12h30 - 13h00' },
  { id: '13:30', labelAr: '13:30 - 14:00', labelFr: '13h30 - 14h00' },
  { id: '19:30', labelAr: '19:30 - 20:00', labelFr: '19h30 - 20h00' },
  { id: '20:30', labelAr: '20:30 - 21:00', labelFr: '20h30 - 21h00' },
  { id: '21:30', labelAr: '21:30 - 22:00', labelFr: '21h30 - 22h00' },
];

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    orderType,
    setOrderType,
    subtotal,
    deliveryFee,
    total,
    language,
    placeOrder,
  } = useCart();
  const t = translations[language];

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pickupTime, setPickupTime] = useState('asap');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isCartOpen) return null;

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!customerName.trim()) {
      newErrors.name = language === 'ar' ? 'يرجى إدخال اسمك' : 'Veuillez saisir votre nom';
    }

    if (!phone.trim()) {
      newErrors.phone = language === 'ar' ? 'يرجى إدخال رقم هاتفك للتأكيد' : 'Veuillez saisir votre téléphone';
    } else if (phone.trim().length < 8) {
      newErrors.phone = language === 'ar' ? 'يرجى إدخال رقم هاتف صالح' : 'Numéro de téléphone invalide';
    }

    if (orderType === 'delivery' && !address.trim()) {
      newErrors.address = language === 'ar' ? 'يرجى إدخال عنوان التوصيل بسلا' : 'Veuillez saisir l’adresse de livraison à Salé';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    placeOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: orderType === 'delivery' ? address.trim() : undefined,
      pickupTime,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="w-screen max-w-md bg-[#131317] border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl relative z-10"
        >
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {t.cartTitle}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">{t.emptyCartTitle}</h3>
                <p className="text-xs text-zinc-400 max-w-xs">{t.emptyCartDesc}</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
              >
                {t.exploreMenu}
              </button>
            </div>
          ) : (
            <form onSubmit={validateAndSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 text-xs">
                {/* 1. Order Type Switcher (Takeaway vs Local Delivery) */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-zinc-300">
                    {t.orderTypeTitle}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`p-3 rounded-xl border text-start flex flex-col gap-1 transition-all ${
                        orderType === 'takeaway'
                          ? 'border-amber-500/80 bg-amber-500/10 text-white shadow-sm'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs text-zinc-100">
                        <Store className="w-3.5 h-3.5 text-amber-400" />
                        <span>{language === 'ar' ? 'استلام من المطعم' : 'Click & Collect'}</span>
                      </div>
                      <span className="text-[11px] text-zinc-400">
                        {language === 'ar' ? 'مجاناً · سلا تابريكت' : 'Gratuit · Salé Tabriquet'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`p-3 rounded-xl border text-start flex flex-col gap-1 transition-all ${
                        orderType === 'delivery'
                          ? 'border-amber-500/80 bg-amber-500/10 text-white shadow-sm'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs text-zinc-100">
                        <Bike className="w-3.5 h-3.5 text-orange-400" />
                        <span>{language === 'ar' ? 'توصيل محلي' : 'Livraison Salé'}</span>
                      </div>
                      <span className="text-[11px] text-zinc-400">
                        {language === 'ar' ? '+15 درهم · داخل سلا' : '+15 MAD · Quartiers Salé'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 2. Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-300">
                      {language === 'ar' ? 'الوجبات المختارة' : 'Articles commandés'} ({cart.length})
                    </span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-[11px] text-red-400 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{language === 'ar' ? 'تفريغ السلة' : 'Vider'}</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {cart.map((line) => (
                      <div
                        key={line.id}
                        className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-center gap-3"
                      >
                        <div className="relative w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
                          <Image
                            src={line.image}
                            alt={language === 'ar' ? line.nameAr : line.nameFr}
                            fill
                            className="object-cover"
                            sizes="48px"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-zinc-100 truncate">
                            {language === 'ar' ? line.nameAr : line.nameFr}
                          </h4>
                          {line.options?.sauce && (
                            <p className="text-[10px] text-zinc-400 truncate">
                              {language === 'ar' ? 'الصلصة: ' : 'Sauce: '}
                              {line.options.sauce}
                            </p>
                          )}
                          <div className="text-xs font-semibold text-amber-400 mt-0.5 tabular-nums">
                            {line.price * line.quantity} {t.currency}
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-zinc-800/90 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.id, -1)}
                            className="p-1 rounded hover:bg-zinc-700 text-zinc-300"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-bold text-xs text-white tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.id, 1)}
                            className="p-1 rounded hover:bg-zinc-700 text-zinc-300"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Time Slot Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-zinc-300">
                    <Clock className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                    {t.timeSlotTitle}
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {language === 'ar' ? slot.labelAr : slot.labelFr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Customer Info Form */}
                <div className="space-y-3 pt-2 border-t border-zinc-800/80">
                  <h4 className="font-semibold text-zinc-300">{t.customerDetails}</h4>

                  <div className="space-y-1">
                    <label className="block text-[11px] text-zinc-400">{t.fullName} *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: كريم المنصوري' : 'ex: Karim Mansouri'}
                      className={`w-full px-3 py-2 rounded-lg bg-zinc-900 border text-xs text-zinc-200 focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-400">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] text-zinc-400">{t.phoneLabel} *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 XX XX XX XX / +212 6..."
                      className={`w-full px-3 py-2 rounded-lg bg-zinc-900 border text-xs text-zinc-200 focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-400">{errors.phone}</p>}
                  </div>

                  {orderType === 'delivery' && (
                    <div className="space-y-1">
                      <label className="block text-[11px] text-zinc-400">{t.addressLabel} *</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={language === 'ar' ? 'سلا، حي بطانة، شارع الحسن الثاني رقم 12' : 'Salé, Bettana, Rue Hassan II N°12'}
                        className={`w-full px-3 py-2 rounded-lg bg-zinc-900 border text-xs text-zinc-200 focus:outline-none ${
                          errors.address ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                        }`}
                      />
                      {errors.address && <p className="text-[10px] text-red-400">{errors.address}</p>}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-[11px] text-zinc-400">{t.notesLabel}</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: خبز دافئ إضافي، بدون شوكولاتة...' : 'ex: Pain bien chaud, harissa séparée...'}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* 5. Pricing Breakdown */}
                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>{t.subtotal}</span>
                    <span className="tabular-nums font-semibold text-zinc-200">
                      {subtotal} {t.currency}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>{t.deliveryFee}</span>
                    <span className="tabular-nums font-semibold text-zinc-200">
                      {orderType === 'delivery' ? `${deliveryFee} ${t.currency}` : t.free}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-bold text-white">
                    <span>{t.totalAmount}</span>
                    <span className="text-amber-400 tabular-nums">
                      {total} {t.currency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-4 bg-[#0e0e12] border-t border-zinc-800 shrink-0">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-sm flex items-center justify-between shadow-xl shadow-orange-950/40 transition-all active:scale-[0.98]"
                >
                  <span>{t.confirmOrder}</span>
                  <span className="tabular-nums font-extrabold bg-black/20 px-2 py-0.5 rounded">
                    {total} {t.currency}
                  </span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
