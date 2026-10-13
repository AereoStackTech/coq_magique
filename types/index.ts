export type Language = 'ar' | 'fr';

export type CategoryId = 'all' | 'grillades' | 'formules' | 'salades' | 'accompagnements' | 'boissons';

export interface MenuItem {
  id: string;
  nameAr: string;
  nameFr: string;
  descriptionAr: string;
  descriptionFr: string;
  price: number; // in MAD
  category: CategoryId;
  image: string;
  servesAr: string;
  servesFr: string;
  preparationTime: string; // e.g. "15-20 min"
  spicy?: boolean;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  availableOptions?: {
    sauces?: { id: string; nameAr: string; nameFr: string; price: number }[];
    sides?: { id: string; nameAr: string; nameFr: string; price: number }[];
    doneness?: { id: string; nameAr: string; nameFr: string }[];
  };
}

export interface CartItemOption {
  sauce?: string;
  side?: string;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique cart line id
  menuItemId: string;
  nameAr: string;
  nameFr: string;
  price: number;
  quantity: number;
  image: string;
  options?: CartItemOption;
}

export type OrderType = 'takeaway' | 'delivery';

export interface OrderDetails {
  orderNumber: string;
  customerName: string;
  phone: string;
  orderType: OrderType;
  deliveryAddress?: string;
  pickupTime: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  status: 'confirmed' | 'preparing' | 'ready';
}
