'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useAuthAction } from '@/hooks/useAuth';
import { Alert } from '@/components/ui';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Waves } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('admin@water.com');
  const [password, setPassword] = useState('Admin@123');
  const [isLogin, setIsLogin] = useState(true);
  const [displayName, setDisplayName] = useState('');

  const { signIn, signUp, error, loading } = useAuthAction();
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password, displayName);
    }

    if (!error) {
      const nextRoute = user?.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      router.push(nextRoute);
      onSuccess?.();
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/70 p-8 shadow-[0_0_80px_rgba(34,211,238,0.18)] backdrop-blur-xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-200">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">
              {isLogin ? 'Control-room access' : 'Create operator account'}
            </h1>
            <p className="text-sm text-slate-400">Secure entry for the live water network</p>
          </div>
        </div>

        {error && (
          <div className="mb-6">
            <Alert type="error" title="Authentication Error" message={error} onClose={() => {}} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Jordan Hale"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:border-cyan-400"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@water.com"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:border-cyan-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:border-cyan-400"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500/90 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              <>
                {isLogin ? 'Enter control room' : 'Create account'}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-800 pt-6 text-center">
          <p className="text-sm text-slate-400">
            {isLogin ? "Need an operator profile?" : 'Already have an access key?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-medium text-cyan-300 hover:underline"
            >
              {isLogin ? 'Use sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm text-cyan-200">
              <Waves className="h-4 w-4" />
              Demo access
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@water.com');
                setPassword('Admin@123');
              }}
              className="w-full rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100"
            >
              Use admin demo credentials
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const LoginPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#07111f_45%,_#020617_100%)] px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-semibold text-white">🌊 P4 Control Room</h1>
          <p className="text-slate-400">Water quality surveillance, leak detection, and field operations.</p>
        </div>
        <LoginForm />
        <p className="mt-8 text-center text-sm text-slate-500">© 2026 Water Intelligence Systems</p>
      </div>
    </div>
  );
};
