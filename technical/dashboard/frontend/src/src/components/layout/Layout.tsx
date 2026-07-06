'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, Settings, Bell } from 'lucide-react';
import { useUIStore } from '@/stores';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  title?: string;
  showNotifications?: boolean;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Water Quality Surveillance',
  showNotifications = true,
  notificationCount = 0,
}) => {
  const { toggleSidebar, sidebarOpen } = useUIStore();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      // Clear any cached data
      localStorage.clear();
      sessionStorage.clear();
      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/login');
    }
  };

  const handleSettingsClick = () => {
    router.push('/settings');
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {showNotifications && (
            <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-300" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={handleSettingsClick}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-red-900/30 rounded-lg transition-colors text-gray-300 hover:text-red-400"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

interface SidebarProps {
  isOpen?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Active Alerts', href: '/alerts', icon: '🚨' },
  { label: 'Sensor Monitoring', href: '/monitoring', icon: '📡' },
  { label: 'Network Map', href: '/network-map', icon: '🗺️' },
  { label: 'Compliance Reports', href: '/compliance', icon: '📋' },
  { label: 'Usage History', href: '/usage-history', icon: '📈' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
  const { sidebarOpen } = useUIStore();
  const router = useRouter();

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-700 h-[calc(100vh-70px)] overflow-y-auto fixed left-0 top-16 z-30">
      <nav className="p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white font-medium flex items-center gap-3"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showSidebar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Water Quality Surveillance',
  showSidebar = true,
}) => {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-950">
      <Header title={title} />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main
          className={`flex-1 transition-all duration-300 ${
            showSidebar && sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};
