'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/stores';
import type { User } from '@/types';

const DEMO_USERS: Record<string, { password: string; role: User['role']; name: string }> = {
  'admin@water.com': { password: 'Admin@123', role: 'admin', name: 'Aqua Admin' },
  'operator@water.com': { password: 'Operator@123', role: 'operator', name: 'Ops Lead' },
  'demo@example.com': { password: 'demo123456', role: 'operator', name: 'Demo Operator' },
};

const persistUser = (user: User | null) => {
  if (typeof window === 'undefined') return;
  if (user) {
    window.localStorage.setItem('water-user', JSON.stringify(user));
  } else {
    window.localStorage.removeItem('water-user');
  }
};

export const useAuth = () => {
  const { user, loading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const persisted = window.localStorage.getItem('water-user');
      if (persisted) {
        try {
          const parsed = JSON.parse(persisted) as User;
          setUser(parsed);
          setLoading(false);
          return;
        } catch {
          window.localStorage.removeItem('water-user');
        }
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userObj: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'User',
          role: 'operator',
          createdAt: new Date(firebaseUser.metadata?.creationTime || 0),
        };
        setUser(userObj);
        persistUser(userObj);
      } else {
        setUser(null);
        persistUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  const logout = async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
      persistUser(null);
      localStorage.clear();
      sessionStorage.clear();
      setLoading(false);
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
      throw error;
    }
  };

  return {
    user,
    loading,
    logout,
    isAuthenticated: !!user,
  };
};

export const useAuthAction = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser, setLoading: setStoreLoading } = useAuthStore();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setStoreLoading(true);
    setError(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const demoUser = DEMO_USERS[normalizedEmail];

      if (demoUser && demoUser.password === password) {
        const userObj: User = {
          id: `demo-${normalizedEmail}`,
          email: normalizedEmail,
          name: demoUser.name,
          role: demoUser.role,
          createdAt: new Date(),
        };
        setUser(userObj);
        persistUser(userObj);
        return;
      }

      const { signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
      setStoreLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    setError(null);
    try {
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    resetPassword,
    error,
    loading,
  };
};
