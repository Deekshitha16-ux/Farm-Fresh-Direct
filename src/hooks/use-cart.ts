
"use client";

import { createContext, useContext } from 'react';
import type { CartItem, Product } from '@/lib/types';

type CartState = {
  cart: CartItem[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'CLEAR_CART' };

export const CartContext = createContext<{
  state: CartState;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cart: CartItem[];
  totalPrice: number;
} | undefined>(undefined);

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { product, quantity }] };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload.productId),
      };
    }
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
