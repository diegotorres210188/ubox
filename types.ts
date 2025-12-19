export enum OrderStatus {
  WAREHOUSE_MIAMI = 'En Miami',
  IN_TRANSIT = 'En Tránsito',
  READY_PICKUP = 'Listo para Retiro',
  DELIVERED = 'Entregado',
  CANCELLED = 'Cancelado'
}

export interface Order {
  id: string;
  tracking: string;
  description: string;
  weight: number;
  status: OrderStatus;
  date: string;
  price?: number;
}

export interface PromoArticle {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  featured?: boolean;
}

export interface UserProfile {
  name: string;
  casilla: string;
  email: string;
  cards: PaymentMethod[];
}

export interface PaymentMethod {
  id: string;
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex';
  expiry: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export type ViewState = 'home' | 'orders' | 'promos' | 'profile' | 'notifications';