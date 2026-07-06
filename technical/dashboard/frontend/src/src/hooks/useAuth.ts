'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/stores';
import type { User } from '@/types';

export const useAuth = () => {
  const { user, loading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in - construct user object
        const userObj: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'User',
          role: 'operator', // Default role - should be fetched from Firestore
          createdAt: new Date(firebaseUser.metadata?.creationTime || 0),
        };
        setUser(userObj);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  const logout = async () => {
    try {
      setLoading(true);
      // Sign out from Firebase
      await firebaseSignOut(auth);
      // Clear user from store
      setUser(null);
      // Clear all storage
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

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
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
