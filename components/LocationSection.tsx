'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { translations } from '@/data/translations';
import { MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle2, Calendar } from 'lucide-react';

export default function LocationSection() {
  const { language, isKitchenOpen } = useCart();
  const t = translations[language];

  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('family');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryPhone('');
    }, 4000);
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#0d0d10] border-b border-zinc-800/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12 sm:mb-16">
          <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider flex items-center justify-center gap-1.5">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>{language === 'ar' ? 'فرعنا الرئيسي بمدينة سلا' : 'Notre Restaurant à Salé'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.locationTitle}
          </h2>
          <p className="text-sm text-zinc-400">
            {t.locationSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Branch & Interactive Map Card (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Branch Card */}
            <div className="p-6 rounded-2xl bg-[#141418] border border-zinc-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Volaille & Feu · Salé</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">{t.addressText}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${isKitchenOpen ? 'bg-amber-400' : 'bg-zinc-500'}`} />
                  <span className="text-xs font-semibold text-zinc-200">
                    {isKitchenOpen ? t.kitchenOpen : t.kitchenClosed}
                  </span>
                </div>
              </div>

              {/* Stylized Visual District Map of Salé */}
              <div className="relative h-64 sm:h-72 rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-hidden p-4 flex flex-col justify-between">
                {/* Stylized map grid background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Road lines simulation */}
                <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-zinc-800 -translate-y-1/2" />
                <div className="absolute top-0 bottom-0 left-1/3 w-1.5 bg-zinc-800" />
                <div className="absolute top-0 bottom-0 right-1/4 w-1.5 bg-zinc-800/60" />

                {/* Map landmarks overlay */}
                <div className="relative z-10 flex justify-between items-start text-[11px] text-zinc-400">
                  <span className="bg-zinc-900/90 px-2.5 py-1 rounded border border-zinc-800">
                    {language === 'ar' ? 'محطة قطار سلا تابريكت' : 'Gare Salé Tabriquet'} (3 min)
                  </span>
                  <span className="bg-zinc-900/90 px-2.5 py-1 rounded border border-zinc-800">
                    {language === 'ar' ? 'حي بطانة' : 'Quartier Bettana'} (4 min)
                  </span>
                </div>

                {/* Central Restaurant Pin */}
                <div className="relative z-10 self-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center text-white shadow-xl shadow-orange-950/60 mx-auto animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="mt-2 bg-[#121215] border border-amber-500/60 px-3 py-1 rounded-md text-xs font-bold text-amber-300 shadow-md">
                    Volaille & Feu - Salé
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-end text-[11px] text-zinc-400">
                  <span className="bg-zinc-900/90 px-2.5 py-1 rounded border border-zinc-800">
                    {language === 'ar' ? 'باب بوحاجة / مارينا أبي رقراق' : 'Bab Bouhaja / Marina'} (7 min)
                  </span>
                  <a
                    href="https://maps.google.com/?q=Sale+Morocco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-amber-500/40 hover:bg-zinc-800 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'فتح في خرائط Google' : 'Itinéraire Maps'}</span>
                  </a>
                </div>
              </div>

              {/* Operating hours & phone contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-zinc-200">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{t.openingHoursLabel}</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    {t.openingHoursValue}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-zinc-200">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>{language === 'ar' ? 'الاتصال المباشر والواتساب' : 'Téléphone & WhatsApp'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+212537804020"
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-[11px] tabular-nums"
                    >
                      {t.phoneText}
                    </a>
                    <a
                      href="https://wa.me/212661902030"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 font-semibold text-[11px] tabular-nums border border-emerald-500/30"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact & Catering Inquiries (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#141418] border border-zinc-800 shadow-xl space-y-5">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>
                    {language === 'ar' ? 'طلبات المناسبات والعزومات العائلية' : 'Grandes Commandes & Événements'}
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {language === 'ar'
                    ? 'هل لديك عزومة عائلية أو وجبات عمل للشركات بسلا؟ جهز طلبيتك مسبقاً بنكهة الشواء على الحطب.'
                    : 'Pour vos déjeuners d’équipe ou réunions de famille à Salé, réservez vos volailles braisées à l’avance.'}
                </p>
              </div>

              {inquirySent ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold block">
                      {language === 'ar' ? 'تم استلام طلب التواصل بنجاح!' : 'Demande reçue avec succès !'}
                    </span>
                    <span className="text-[11px] text-emerald-400/80">
                      {language === 'ar' ? 'سيتواصل معكم مسؤول المطعم في أقرب وقت.' : 'Notre équipe vous recontactera très rapidement.'}
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <label className="block text-zinc-300 font-medium">{t.fullName}</label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder={language === 'ar' ? 'الاسم الكريم' : 'Votre nom complet'}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-zinc-300 font-medium">{t.phoneLabel}</label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="06 XX XX XX XX"
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-zinc-300 font-medium">
                      {language === 'ar' ? 'نوع الطلب المفضل' : 'Type de commande'}
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="family">
                        {language === 'ar' ? 'وجبة عائلية كبرى (4 - 10 أشخاص)' : 'Repas de famille (4 - 10 personnes)'}
                      </option>
                      <option value="corporate">
                        {language === 'ar' ? 'وجبات عمل لشركة أو موظفين (+10 وجبات)' : 'Déjeuner d’entreprise (+10 repas)'}
                      </option>
                      <option value="catering">
                        {language === 'ar' ? 'مناسبة خاصة أو حفل شواء' : 'Événement privé sur mesure'}
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98]"
                  >
                    {language === 'ar' ? 'إرسال طلب الحجز المسبق' : 'Envoyer la demande préalable'}
                  </button>
                </form>
              )}

              {/* Instant WhatsApp Direct Contact Button */}
              <div className="pt-3 border-t border-zinc-800">
                <a
                  href="https://wa.me/212661902030?text=Bonjour%20Volaille%20%26%20Feu%20Salé%20je%20souhaite%20des%20informations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-zinc-700/60"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{t.whatsappChat}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
