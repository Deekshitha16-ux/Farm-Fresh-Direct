
"use client";

import { createContext, useContext } from 'react';
import type { Product } from '@/lib/types';

type ProductsState = {
  products: Product[];
};

export type ProductsAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'REMOVE_PRODUCT'; payload: { productId: string } }
  | { type: 'UPDATE_PRODUCT'; payload: { productId: string, productData: Partial<Product> } };


export const ProductsContext = createContext<{
  state: ProductsState;
  addProduct: (product: Partial<Product>) => void;
  updateProduct: (productId: string, productData: Partial<Product>) => void;
  removeProduct: (productId: string) => void;
  products: Product[];
} | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
