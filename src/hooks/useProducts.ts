import { useQuery } from '@tanstack/react-query';
import { Product, Filter } from '../types';
import productsData from '../data/products.json';

// Simulate API call
const fetchProducts = async (): Promise<Product[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData as Product[]);
    }, 500);
  });
};

export const useProducts = (filter?: Filter) => {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Apply filters if provided
  const filteredProducts = products.filter((product) => {
    if (filter?.category && product.category !== filter.category) {
      return false;
    }
    
    if (filter?.minPrice && product.price < filter.minPrice) {
      return false;
    }
    
    if (filter?.maxPrice && product.price > filter.maxPrice) {
      return false;
    }
    
    if (filter?.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return {
    products: filteredProducts,
    isLoading,
    error,
  };
};

export const useProduct = (id: string) => {
  const { products, isLoading, error } = useProducts();
  
  const product = products.find((p) => p.id === id);
  
  return {
    product,
    isLoading,
    error,
  };
}; 