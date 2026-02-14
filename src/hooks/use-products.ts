
"use client";

import { createContext, useContext } from 'react';
import type { Product } from '@/lib/types';

type ProductsState = {
  products: Product[];
};

export type ProductsAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'SET_PRODUCTS'; payload: Product[] };

export const ProductsContext = createContext<{
  state: ProductsState;
  addProduct: (product: Partial<Product>) => void;
  products: Product[];
} | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
