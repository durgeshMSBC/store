export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'sneakers' | 'sports' | 'formal' | 'casual' | 'boots';
  sizes: number[];
  colors: string[];
  rating: number;
  discount?: number;
  featured?: boolean;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: number;
  selectedColor: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}