
"use client";

import { useReducer, ReactNode, useEffect, useState } from "react";
import { CartContext, cartReducer } from "@/hooks/use-cart";
import { ProductsContext } from "@/hooks/use-products";
import type { Product, CartItem, User } from '@/lib/types';
import { DUMMY_PRODUCTS } from "@/lib/dummy-data";
import type { ProductsAction } from "@/hooks/use-products";
import { AuthContext, authReducer } from "@/hooks/use-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        if (state.user) {
          sessionStorage.setItem('user', JSON.stringify(state.user));
        } else {
          sessionStorage.removeItem('user');
        }
      } catch (error) {
        console.error("Failed to save user to sessionStorage", error);
      }
    }
  }, [state.user, isClient]);

  const login = (user: User) => {
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };
  
  const user = isClient ? state.user : null;

  return (
    <AuthContext.Provider value={{ state, login, logout, updateUser, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('cart', JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save cart to localStorage", error);
      }
    }
  }, [state, isClient]);

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
  
  const cart = isClient ? state.cart : [];
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, addToCart, updateQuantity, removeFromCart, cart, totalPrice }}>
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
    case 'UPDATE_PRODUCT':
        return {
            ...state,
            products: state.products.map(p => p.id === action.payload.productId ? { ...p, ...action.payload.productData } : p)
        }
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload.productId),
      };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productsReducer, { products: DUMMY_PRODUCTS });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const parsedState = JSON.parse(storedProducts);
        if (parsedState.products && parsedState.products.length > 0) {
          dispatch({ type: "SET_PRODUCTS", payload: parsedState.products });
        }
      }
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('products', JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save products to localStorage", error);
      }
    }
  }, [state, isClient]);

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
      imageId: productData.imageUrl ? '' : 'new-product-placeholder',
      imageUrl: productData.imageUrl,
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
  };
  
  const updateProduct = (productId: string, productData: Partial<Product>) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: { productId, productData } });
  };

  const removeProduct = (productId: string) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: { productId } });
  };

  const products = isClient ? state.products : DUMMY_PRODUCTS;

  return (
    <ProductsContext.Provider value={{ state, addProduct, updateProduct, removeProduct, products }}>
      {children}
    </ProductsContext.Provider>
  );
}


export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
        <CartProvider>
            <ProductsProvider>
                {children}
            </ProductsProvider>
        </CartProvider>
    </AuthProvider>
  );
}
