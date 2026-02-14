
"use client";

import { useReducer, ReactNode, useEffect, useState } from "react";
import { CartContext, cartReducer } from "@/hooks/use-cart";
import type { Product, CartItem } from '@/lib/types';


export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedState = JSON.parse(storedCart);
        if (parsedState.cart) {
          dispatch({ type: "SET_CART", payload: parsedState.cart });
        }
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem('cart', JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save cart to localStorage", error);
      }
    }
  }, [state, hydrated]);

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
  
  const cartForValue = hydrated ? state.cart : [];
  const totalPriceForValue = hydrated ? totalPrice : 0;
  const stateForValue = hydrated ? state : { cart: [] };


  return (
    <CartContext.Provider value={{ state: stateForValue, addToCart, updateQuantity, removeFromCart, cart: cartForValue, totalPrice: totalPriceForValue }}>
      {children}
    </CartContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
