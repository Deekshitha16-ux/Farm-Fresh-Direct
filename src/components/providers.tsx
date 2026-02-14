
"use client";

import { useReducer, ReactNode, useEffect, useState } from "react";
import { CartContext, cartReducer } from "@/hooks/use-cart";
import { ProductsContext, useProducts } from "@/hooks/use-products";
import type { Product, CartItem } from '@/lib/types';
import { DUMMY_PRODUCTS } from "@/lib/dummy-data";
import type { ProductsAction } from "@/hooks/use-products";

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

const productsReducer = (state: { products: Product[] }, action: ProductsAction): { products: Product[] } => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productsReducer, { products: DUMMY_PRODUCTS });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const parsedState = JSON.parse(storedProducts);
        if (parsedState.products) {
          dispatch({ type: "SET_PRODUCTS", payload: parsedState.products });
        }
      }
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem('products', JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save products to localStorage", error);
      }
    }
  }, [state, hydrated]);

  const addProduct = (productData: Partial<Product>) => {
    const newProduct: Product = {
      id: new Date().getTime().toString(),
      name: productData.name || '',
      description: productData.description || '',
      price: productData.price || 0,
      unit: productData.unit || 'lb',
      stock: productData.stock || 0,
      farmer: productData.farmer || 'My Farm',
      category: productData.category || 'Uncategorized',
      rating: 0,
      reviewCount: 0,
      imageId: 'new-product-placeholder',
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
  };
  
  const productsForValue = hydrated ? state.products : DUMMY_PRODUCTS;
  const stateForValue = hydrated ? state : { products: DUMMY_PRODUCTS };

  return (
    <ProductsContext.Provider value={{ state: stateForValue, addProduct, products: productsForValue }}>
      {children}
    </ProductsContext.Provider>
  );
}


export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </CartProvider>
  );
}
