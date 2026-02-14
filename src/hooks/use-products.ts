
"use client";

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Product } from '@/lib/types';

export const useProducts = () => {
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => {
    return query(collection(firestore, 'products'));
  }, [firestore]);

  const { data: products, isLoading, error } = useCollection<Product>(productsQuery);

  return {
    products: products || [],
    isLoading,
    error,
  };
};
