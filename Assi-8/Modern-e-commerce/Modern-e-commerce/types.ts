export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type Theme = 'light' | 'dark';
export type UserRole = 'admin' | 'user' | null;

export interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}
