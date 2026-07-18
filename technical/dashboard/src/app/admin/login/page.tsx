"use client"
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthAction } from '@/hooks/useAuth';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params?.get("redirect") || "/admin/dashboard";
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const { signIn, loading, error: authError } = useAuthAction();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const email = user.includes("@") ? user : `${user}@water.com`;
    try {
      await signIn(email, pass);
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || authError || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#03040a] text-cyan-200">
      <div className="w-full max-w-md p-8 glass rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-cyan-300">Control Room — Admin Login</h1>
        <form onSubmit={submit} className="space-y-4">
          <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="username" className="w-full p-3 rounded bg-black/40 border border-cyan-700/30" />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="password" className="w-full p-3 rounded bg-black/40 border border-cyan-700/30" />
          {error && <div className="text-red-400">{error}</div>}
          {authError && <div className="text-red-400">{authError}</div>}
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-cyan-600 text-black rounded font-semibold">{loading ? 'Signing…' : 'Sign in'}</button>
            <button type="button" onClick={() => {setUser('admin'); setPass('admin');}} className="text-sm text-cyan-300/70">Fill demo</button>
          </div>
        </form>
        <p className="mt-4 text-sm text-cyan-400/60">Demo admin: <strong>admin</strong> / <strong>admin</strong></p>
      </div>
    </div>
  );
}
