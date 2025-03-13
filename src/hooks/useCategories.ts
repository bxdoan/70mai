import { useQuery } from '@tanstack/react-query';
import { Category } from '../types';
import categoriesData from '../data/categories.json';

// Simulate API call
const fetchCategories = async (): Promise<Category[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categoriesData as Category[]);
    }, 500);
  });
};

export const useCategories = () => {
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return {
    categories,
    isLoading,
    error,
  };
};

export const useCategory = (id: string) => {
  const { categories, isLoading, error } = useCategories();
  
  const category = categories.find((c) => c.id === id);
  
  return {
    category,
    isLoading,
    error,
  };
}; 