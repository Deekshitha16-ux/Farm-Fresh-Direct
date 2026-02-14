"use client";

import { createContext, useContext } from 'react';
import type { User } from '@/lib/types';

// State and actions
type AuthState = {
  user: User | null;
};
type AuthAction = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' };

// Context
export const AuthContext = createContext<{
  state: AuthState;
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
} | undefined>(undefined);

// Reducer
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
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
