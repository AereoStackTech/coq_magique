'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MenuBento from '@/components/MenuBento';
import StorySection from '@/components/StorySection';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import MobileOrderBar from '@/components/MobileOrderBar';

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0d0d10] text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">
          <Hero />
          <MenuBento />
          <StorySection />
          <LocationSection />
        </main>
        <Footer />
        <CartDrawer />
        <OrderSuccessModal />
        <MobileOrderBar />
      </div>
    </CartProvider>
  );
}
