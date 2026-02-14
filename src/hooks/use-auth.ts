"use client";

import { createContext, useContext } from 'react';
import type { User } from '@/lib/types';

// State and actions
type AuthState = {
  user: User | null;
};
export type AuthAction = 
    | { type: 'LOGIN'; payload: User } 
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: Partial<User> };

// Context
export const AuthContext = createContext<{
  state: AuthState;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  user: User | null;
} | undefined>(undefined);

// Reducer
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'UPDATE_USER':
        if (!state.user) return state;
        return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
