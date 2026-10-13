'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';
import { CheckCircle2, MessageSquare, Clock, MapPin, X, ArrowRight, Store, Bike } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OrderSuccessModal() {
  const { lastOrder, setLastOrder, language } = useCart();
  const t = translations[language];

  if (!lastOrder) return null;

  // Build a clean preformatted WhatsApp message
  const itemsText = lastOrder.items
    .map(
      (item) =>
        `• ${item.quantity}x ${language === 'ar' ? item.nameAr : item.nameFr} (${item.price * item.quantity} MAD)`
    )
    .join('\n');

  const rawMessage =
    language === 'ar'
      ? `السلام عليكم، أود تأكيد طلبي من مطعم Volaille & Feu سلا:\n\n*رقم الطلب:* ${lastOrder.orderNumber}\n*الاسم:* ${lastOrder.customerName}\n*الهاتف:* ${lastOrder.phone}\n*طريقة الاستلام:* ${lastOrder.orderType === 'takeaway' ? 'استلام من المطعم' : 'توصيل محلي بسلا'}\n*الموعد:* ${lastOrder.pickupTime}\n${lastOrder.deliveryAddress ? `*العنوان:* ${lastOrder.deliveryAddress}\n` : ''}${lastOrder.notes ? `*ملاحظات:* ${lastOrder.notes}\n` : ''}\n*الطلبات:*\n${itemsText}\n\n*المجموع الإجمالي:* ${lastOrder.total} MAD`
      : `Bonjour, je confirme ma commande auprès de Volaille & Feu Salé :\n\n*N° Commande :* ${lastOrder.orderNumber}\n*Nom :* ${lastOrder.customerName}\n*Téléphone :* ${lastOrder.phone}\n*Mode :* ${lastOrder.orderType === 'takeaway' ? 'Click & Collect (Retrait)' : 'Livraison locale à Salé'}\n*Créneau :* ${lastOrder.pickupTime}\n${lastOrder.deliveryAddress ? `*Adresse :* ${lastOrder.deliveryAddress}\n` : ''}${lastOrder.notes ? `*Remarques :* ${lastOrder.notes}\n` : ''}\n*Articles :*\n${itemsText}\n\n*Total à régler :* ${lastOrder.total} MAD`;

  const whatsappUrl = `https://wa.me/212661902030?text=${encodeURIComponent(rawMessage)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-[#15151a] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-zinc-100"
        >
          {/* Close button */}
          <button
            onClick={() => setLastOrder(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-6 text-center border-b border-zinc-800/80 bg-gradient-to-b from-orange-950/20 to-transparent">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              {t.orderSuccessTitle}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {t.orderSuccessSubtitle}{' '}
              <span className="font-mono font-bold text-amber-400 text-sm tracking-wider">
                {lastOrder.orderNumber}
              </span>
            </p>
          </div>

          {/* Order Details Body */}
          <div className="p-6 space-y-5 overflow-y-auto max-h-[60vh] text-xs">
            {/* Status Pipeline */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                <span>{t.trackStatus}</span>
                <span className="text-amber-400 font-bold">{t.statusPreparing}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 font-medium">
                  ✓ {t.statusConfirmed}
                </div>
                <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 font-semibold animate-pulse">
                  ♨ {t.statusPreparing}
                </div>
                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-500 font-medium">
                  {t.statusReady}
                </div>
              </div>
            </div>

            {/* Delivery/Pickup Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">{t.orderTypeTitle}</span>
                <span className="font-semibold text-zinc-200 mt-0.5 flex items-center gap-1.5">
                  {lastOrder.orderType === 'takeaway' ? (
                    <>
                      <Store className="w-3.5 h-3.5 text-amber-400" />
                      <span>{language === 'ar' ? 'استلام من المطعم' : 'Click & Collect'}</span>
                    </>
                  ) : (
                    <>
                      <Bike className="w-3.5 h-3.5 text-orange-400" />
                      <span>{language === 'ar' ? 'توصيل بسلا' : 'Livraison locale'}</span>
                    </>
                  )}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">{t.timeSlotTitle}</span>
                <span className="font-semibold text-zinc-200 mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lastOrder.pickupTime}</span>
                </span>
              </div>
            </div>

            {/* Itemized summary */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/80">
              <span className="text-zinc-400 font-semibold block">
                {language === 'ar' ? 'ملخص الوجبات:' : 'Détail des plats :'}
              </span>
              <div className="space-y-1.5">
                {lastOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-zinc-300">
                    <span>
                      {item.quantity}x {language === 'ar' ? item.nameAr : item.nameFr}
                    </span>
                    <span className="tabular-nums font-semibold text-zinc-200">
                      {item.price * item.quantity} {t.currency}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-white text-sm">
                <span>{t.totalAmount}</span>
                <span className="text-amber-400 tabular-nums">
                  {lastOrder.total} {t.currency}
                </span>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed text-[11px] bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
              {t.orderInstructions}
            </p>
          </div>

          {/* Modal Actions */}
          <div className="p-5 bg-[#101014] border-t border-zinc-800 space-y-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{t.sendViaWhatsApp}</span>
            </a>

            <button
              type="button"
              onClick={() => setLastOrder(null)}
              className="w-full py-2.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              {language === 'ar' ? 'إغلاق ومتابعة التصفح' : 'Fermer et continuer'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
