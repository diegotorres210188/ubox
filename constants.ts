import { Order, OrderStatus, PromoArticle, UserProfile, Notification } from './types';

// Mock Data
export const MOCK_USER: UserProfile = {
  name: "Sofia Martinez",
  casilla: "ASU-10293",
  email: "sofia.martinez@example.com",
  cards: [
    { id: '1', last4: '4242', brand: 'visa', expiry: '12/25' },
    { id: '2', last4: '8899', brand: 'mastercard', expiry: '09/26' }
  ]
};

export const MIAMI_ADDRESS = {
  line1: "8400 NW 25th St, Suite 100",
  line2: "UBX-PY-10293",
  city: "Doral",
  state: "FL",
  zip: "33122",
  phone: "+1 (786) 555-0123"
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    tracking: '1Z999AA10123456784',
    description: 'Amazon - Electrónica',
    weight: 1.2,
    status: OrderStatus.READY_PICKUP,
    date: '2023-10-25',
    price: 15.50
  },
  {
    id: 'ORD-002',
    tracking: 'TBA091238123',
    description: 'Sephora - Cosméticos',
    weight: 0.5,
    status: OrderStatus.IN_TRANSIT,
    date: '2023-10-27',
  },
  {
    id: 'ORD-003',
    tracking: '9400100000000000000000',
    description: 'Nike Zapatillas',
    weight: 2.1,
    status: OrderStatus.WAREHOUSE_MIAMI,
    date: '2023-10-28',
  },
  {
    id: 'ORD-004',
    tracking: '1Z888BB10123456789',
    description: 'Funda iPad Apple',
    weight: 0.3,
    status: OrderStatus.DELIVERED,
    date: '2023-09-15',
    price: 4.50
  },
  {
    id: 'ORD-005',
    tracking: 'TBA123999999',
    description: 'Termo Stanley',
    weight: 0.8,
    status: OrderStatus.DELIVERED,
    date: '2023-09-10',
    price: 12.00
  }
];

export const MOCK_PROMOS: PromoArticle[] = [
  {
    id: '1',
    title: 'Previa Black Friday: Tecnología',
    category: 'Tecnología',
    imageUrl: 'https://picsum.photos/600/300',
    description: 'Preparate para las mayores ofertas del año. Esto es lo que tenés que buscar en Amazon y BestBuy.',
    featured: true
  },
  {
    id: '2',
    title: 'Nueva Colección Carter\'s',
    category: 'Moda Infantil',
    imageUrl: 'https://picsum.photos/600/301',
    description: 'La colección de verano tiene 50% OFF. Ideal para el calor de Paraguay.',
  },
  {
    id: '3',
    title: 'Suplementos: ¿Qué podés traer?',
    category: 'Salud',
    imageUrl: 'https://picsum.photos/600/302',
    description: 'Entendiendo las regulaciones para importar vitaminas y proteínas.',
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Paquete Recibido en Miami',
    message: 'Tu paquete de Amazon (1Z99...) ha sido recibido en nuestro depósito.',
    date: 'hace 2 horas',
    read: false
  },
  {
    id: '2',
    title: 'Vuelo Demorado',
    message: 'El vuelo UA884 tiene una pequeña demora. Nueva hora de llegada: 14:00 PYT.',
    date: 'hace 1 día',
    read: true
  }
];