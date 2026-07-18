import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { User } from '@/types';

const COL = 'admin_users';

export async function getUsers(): Promise<User[]> {
  const q = query(collection(db, COL));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      email: data.email || '',
      name: data.name || data.displayName || 'User',
      role: data.role || 'operator',
      createdAt: data.createdAt ? data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt) : new Date(),
    } as User;
  });
}

export async function getUser(id: string): Promise<User | null> {
  const d = await getDoc(doc(db, COL, id));
  if (!d.exists()) return null;
  const data = d.data() as any;
  return { id: d.id, email: data.email, name: data.name, role: data.role, createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date() } as User;
}

export async function createUser(user: Partial<User> & { id?: string }) {
  const id = user.id || (user.email ? user.email.split('@')[0] : undefined) || undefined;
  const ref = id ? doc(db, COL, id) : doc(collection(db, COL));
  await setDoc(ref, {
    email: user.email || '',
    name: user.name || '',
    role: user.role || 'operator',
    createdAt: user.createdAt || new Date(),
  });
  return ref.id;
}

export async function updateUser(id: string, patch: Partial<User>) {
  const ref = doc(db, COL, id);
  await updateDoc(ref, { ...patch });
}

export async function deleteUser(id: string) {
  await deleteDoc(doc(db, COL, id));
}
