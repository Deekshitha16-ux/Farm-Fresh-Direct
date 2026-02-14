
"use client";

import { createContext, useContext } from 'react';
import type { BlogPost } from '@/lib/types';

// State and actions
type BlogState = {
  posts: BlogPost[];
};

export type BlogAction = 
    | { type: 'ADD_POST'; payload: BlogPost } 
    | { type: 'REMOVE_POST'; payload: { postId: string } }
    | { type: 'SET_POSTS'; payload: BlogPost[] };

// Context
export const BlogContext = createContext<{
  state: BlogState;
  addPost: (postData: Omit<BlogPost, 'id' | 'date'>) => void;
  removePost: (postId: string) => void;
  posts: BlogPost[];
} | undefined>(undefined);

// Hook
export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
