'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/ui';
import { initializeApiClient } from '@/services/api';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Initialize API client on mount
    initializeApiClient();
  }, []);

  useEffect(() => {
    // Check if we're on a public page (login page)
    const isLoginPage = window.location.pathname.includes('/login');
    
    // Redirect to login if not authenticated and trying to access protected page
    if (!loading && !isAuthenticated && !isLoginPage) {
      router.push('/login');
    }
    
    // Redirect to dashboard if authenticated and on login page
    if (!loading && isAuthenticated && isLoginPage) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <html lang="en">
        <head>
          <title>Water Quality Surveillance - Loading</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className="bg-gray-950">
          <Loading fullScreen />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Water Quality Surveillance Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Real-time water quality monitoring and loss detection system" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body className="bg-gray-950 text-gray-100">{children}</body>
    </html>
  );
}
