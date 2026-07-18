'use client';

import React, { useEffect, useState } from 'react';
import { AdminGuard, AdminLayout, Panel } from '@/components/admin/AdminLayout';
import { getUsers, updateUser, createUser, deleteUser } from '@/services/users';
import type { User } from '@/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Record<string, Partial<User>>>({});

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getUsers()
      .then((u) => {
        if (mounted) setUsers(u);
      })
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const startEdit = (id: string) => {
    const u = users.find((x) => x.id === id);
    if (u) setEditing((s) => ({ ...s, [id]: { role: u.role, name: u.name } }));
  };

  const save = async (id: string) => {
    const patch = editing[id];
    if (!patch) return;
    await updateUser(id, patch as Partial<User>);
    const fresh = await getUsers();
    setUsers(fresh);
    setEditing((s) => {
      const copy = { ...s };
      delete copy[id];
      return copy;
    });
  };

  const deactivate = async (id: string) => {
    await updateUser(id, { role: 'inspector' });
    const fresh = await getUsers();
    setUsers(fresh);
  };

  return (
    <AdminGuard>
      <AdminLayout title="User Administration" description="Manage roles, site access, and account state.">
        <Panel title="Operator roster" subtitle="Control access across DMA zones">
          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/80 text-slate-300">
                <tr>
                  <th className="px-3 py-3">User</th>
                  <th className="px-3 py-3">Role</th>
                  <th className="px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={3} className="px-3 py-6 text-center text-slate-400">Loading...</td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-slate-800 bg-slate-950/60 text-slate-200">
                    <td className="px-3 py-3">{user.name} <div className="text-xs text-slate-400">{user.email}</div></td>
                    <td className="px-3 py-3">
                      {editing[user.id] ? (
                        <select value={editing[user.id]?.role} onChange={(e) => setEditing((s) => ({ ...s, [user.id]: { ...s[user.id], role: e.target.value as any } }))} className="bg-slate-900 text-white px-2 py-1 rounded">
                          <option value="admin">admin</option>
                          <option value="operator">operator</option>
                          <option value="inspector">inspector</option>
                        </select>
                      ) : (
                        <span className="capitalize">{user.role}</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      {editing[user.id] ? (
                        <div className="flex gap-2">
                          <button onClick={() => save(user.id)} className="px-3 py-1 bg-cyan-600 rounded text-black">Save</button>
                          <button onClick={() => setEditing((s) => { const c = {...s}; delete c[user.id]; return c; })} className="px-3 py-1 bg-gray-700 rounded">Cancel</button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(user.id)} className="px-3 py-1 bg-slate-800 rounded">Edit</button>
                          <button onClick={() => deactivate(user.id)} className="px-3 py-1 bg-rose-600 rounded">Deactivate</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </AdminLayout>
    </AdminGuard>
  );
}
