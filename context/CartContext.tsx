'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartItemOption, MenuItem, OrderDetails, OrderType, Language } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, options?: CartItemOption) => void;
  removeFromCart: (cartLineId: string) => void;
  updateQuantity: (cartLineId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalCount: number;
  language: Language;
  setLanguage: (lang: Language) => void;
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
  placeOrder: (details: { customerName: string; phone: string; address?: string; pickupTime: string; notes?: string }) => OrderDetails;
  isKitchenOpen: boolean;
  selectedItemForDetail: MenuItem | null;
  setSelectedItemForDetail: (item: MenuItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const [language, setLanguage] = useState<Language>('ar');
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MenuItem | null>(null);
  const [isKitchenOpen, setIsKitchenOpen] = useState(true);

  // Real-time kitchen opening status check (11:30 - 23:30 daily in Morocco)
  useEffect(() => {
    const checkKitchenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentDecimal = hours + minutes / 60;
      // Open from 11:30 to 23:30
      const isOpen = currentDecimal >= 11.5 && currentDecimal < 23.5;
      setIsKitchenOpen(isOpen);
    };

    checkKitchenStatus();
    const interval = setInterval(checkKitchenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sync html dir with language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const addToCart = (item: MenuItem, quantity = 1, options?: CartItemOption) => {
    setCart((prev) => {
      // Create a unique line identifier based on item ID and options
      const optKey = JSON.stringify(options || {});
      const existingIndex = prev.findIndex(
        (line) => line.menuItemId === item.id && JSON.stringify(line.options || {}) === optKey
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }

      // Calculate unit price including options
      let unitPrice = item.price;
      if (options?.side && item.availableOptions?.sides) {
        const matchedSide = item.availableOptions.sides.find((s) => s.id === options.side);
        if (matchedSide) unitPrice += matchedSide.price;
      }

      const newLine: CartItem = {
        id: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        menuItemId: item.id,
        nameAr: item.nameAr,
        nameFr: item.nameFr,
        price: unitPrice,
        quantity,
        image: item.image,
        options,
      };

      return [...prev, newLine];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartLineId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartLineId));
  };

  const updateQuantity = (cartLineId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartLineId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? 15 : 0;
  const total = subtotal + deliveryFee;
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (details: {
    customerName: string;
    phone: string;
    address?: string;
    pickupTime: string;
    notes?: string;
  }): OrderDetails => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `VF-${randomSuffix}`;

    const newOrder: OrderDetails = {
      orderNumber,
      customerName: details.customerName,
      phone: details.phone,
      orderType,
      deliveryAddress: details.address,
      pickupTime: details.pickupTime,
      notes: details.notes,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      createdAt: new Date().toLocaleTimeString(language === 'ar' ? 'ar-MA' : 'fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'confirmed',
    };

    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
        subtotal,
        deliveryFee,
        total,
        totalCount,
        language,
        setLanguage,
        lastOrder,
        setLastOrder,
        placeOrder,
        isKitchenOpen,
        selectedItemForDetail,
        setSelectedItemForDetail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
