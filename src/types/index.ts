export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  imageUrl: string;
  description: string;
  features: string[];
  stock: number;
  specifications: {
    [key: string]: string | undefined;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Filter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
} 