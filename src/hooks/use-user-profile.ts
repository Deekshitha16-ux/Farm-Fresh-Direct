
'use client';

import { useMemo } from 'react';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import type { User } from 'firebase/auth';

// The user object that the application components expect
export type AppUser = User & UserProfile & {
    role: 'farmer' | 'customer';
    name: string;
};

export function useUserProfile() {
    const { user: authUser, isUserLoading: isAuthLoading, userError: authError } = useUser();
    const firestore = useFirestore();
    
    const userDocRef = useMemoFirebase(() => {
        if (!authUser?.uid) return null;
        return doc(firestore, 'users', authUser.uid);
    }, [authUser?.uid, firestore]);

    const { data: profile, isLoading: isProfileLoading, error: profileError } = useDoc<UserProfile>(userDocRef);

    const user: AppUser | null = useMemo(() => {
        if (!authUser || !profile) return null;
        
        return {
            ...authUser,
            ...profile,
            name: profile.displayName,
            role: profile.userType,
        };
    }, [authUser, profile]);

    return {
        user,
        isLoading: isAuthLoading || isProfileLoading,
        error: authError || profileError,
    };
}
