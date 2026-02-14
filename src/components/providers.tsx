"use client";

import { useReducer, ReactNode, useEffect } from "react";
import { CartContext, cartReducer, getInitialState } from "@/hooks/use-cart";
import type { Product } from '@/lib/types';


export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  useEffect(() => {
    try {
        localStorage.setItem('cart', JSON.stringify(state));
    } catch (error) {
        console.error("Failed to save cart to localStorage", error);
    }
  }, [state]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const totalPrice = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, addToCart, updateQuantity, removeFromCart, cart: state.cart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};


export function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
