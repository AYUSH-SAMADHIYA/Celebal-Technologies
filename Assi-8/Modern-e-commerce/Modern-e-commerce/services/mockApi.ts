
import { Product } from '../types';

const products: Product[] = [
  {
    id: 1,
    name: 'Aura Wireless Headphones',
    category: 'Tech Gadgets',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 1250,
    stock: 50,
    description: 'Immerse yourself in high-fidelity audio with Aura Wireless Headphones. Featuring noise cancellation, 30-hour battery life, and a sleek, comfortable design.',
    images: ['https://picsum.photos/seed/product1/800/800', 'https://picsum.photos/seed/product1_2/800/800', 'https://picsum.photos/seed/product1_3/800/800'],
  },
  {
    id: 2,
    name: 'Zenith Smartwatch',
    category: 'Tech Gadgets',
    price: 299.99,
    rating: 4.6,
    reviewCount: 890,
    stock: 30,
    description: 'Track your fitness, notifications, and more with the Zenith Smartwatch. A vibrant AMOLED display, long battery life, and customizable faces make it the perfect companion.',
    images: ['https://picsum.photos/seed/product2/800/800', 'https://picsum.photos/seed/product2_2/800/800'],
  },
  {
    id: 3,
    name: 'Desk Chair',
    category: 'Home & Living',
    price: 349.00,
    rating: 4.9,
    reviewCount: 640,
    stock: 25,
    description: 'Experience ultimate comfort and support with the ErgoFlow Desk Chair. Fully adjustable with lumbar support and breathable mesh for long work sessions.',
    images: ['https://picsum.photos/seed/product3/800/800', 'https://picsum.photos/seed/product3_2/800/800'],
  },
  {
    id: 4,
    name: 'Marvel Hoodie',
    category: 'Fashion',
    price: 89.50,
    originalPrice: 110.00,
    rating: 4.7,
    reviewCount: 980,
    stock: 100,
    description: 'Stay stylish and comfortable with the Nova Performance Hoodie. Made from moisture-wicking fabric, it\'s perfect for workouts or casual wear.',
    images: ['https://picsum.photos/seed/product4/800/800', 'https://picsum.photos/seed/product4_2/800/800'],
  },
  {
    id: 5,
    name: 'PureGlow Facial Cleanser',
    category: 'Health & Wellness',
    price: 45.00,
    rating: 4.9,
    reviewCount: 2100,
    stock: 150,
    description: 'Achieve a radiant complexion with the PureGlow Facial Cleanser. Infused with natural botanicals to gently purify and refresh your skin.',
    images: ['https://picsum.photos/seed/product5/800/800', 'https://picsum.photos/seed/product5_2/800/800'],
  },
  {
    id: 6,
    name: 'Orbit Levitating Speaker',
    category: 'Tech Gadgets',
    price: 149.00,
    rating: 4.5,
    reviewCount: 560,
    stock: 40,
    description: 'A speaker that defies gravity. The Orbit Levitating Speaker delivers 360-degree sound while floating majestically above its magnetic base.',
    images: ['https://picsum.photos/seed/product6/800/800', 'https://picsum.photos/seed/product6_2/800/800'],
  },
  {
    id: 7,
    name: 'Artisan Pour-Over Coffee Set',
    category: 'Home & Living',
    price: 79.99,
    rating: 4.8,
    reviewCount: 810,
    stock: 60,
    description: 'Brew the perfect cup every time. This beautiful ceramic pour-over set is designed for coffee connoisseurs who appreciate craft and flavor.',
    images: ['https://picsum.photos/seed/product7/800/800', 'https://picsum.photos/seed/product7_2/800/800'],
  },
  {
    id: 8,
    name: 'Trekker Adventure Backpack',
    category: 'Fashion',
    price: 120.00,
    originalPrice: 150.00,
    rating: 4.7,
    reviewCount: 1150,
    stock: 75,
    description: 'Durable, waterproof, and spacious. The Trekker Adventure Backpack is ready for any journey, from your daily commute to a weekend hike.',
    images: ['https://picsum.photos/seed/product8/800/800', 'https://picsum.photos/seed/product8_2/800/800'],
  }
];

// Simulate API latency
const delay = <T,>(data: T, ms = 500): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), ms));

export const getProducts = (): Promise<Product[]> => {
  return delay(products);
};

export const getProductById = (id: number): Promise<Product | undefined> => {
  const product = products.find(p => p.id === id);
  return delay(product, 300);
};

export const getFeaturedProducts = (): Promise<Product[]> => {
  const featured = products.filter(p => p.rating >= 4.7).slice(0, 4);
  return delay(featured);
};
