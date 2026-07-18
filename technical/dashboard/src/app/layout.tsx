'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/ui';
import { initializeApiClient } from '@/services/api';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initializeApiClient();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isLoginPage = pathname.includes('/login');
    const isAdminPage = pathname.startsWith('/admin');

    if (!isAuthenticated && !isLoginPage) {
      router.replace('/login');
      return;
    }

    if (isAuthenticated && isLoginPage) {
      router.replace(user?.role === 'admin' ? '/admin/dashboard' : '/dashboard');
      return;
    }

    if (isAdminPage && user?.role !== 'admin') {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, loading, pathname, router, user?.role]);

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
