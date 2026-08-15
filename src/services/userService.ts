import { collection, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { COLLECTIONS, db, isFirebaseConfigured } from '@/config/firebase';
import { demoStore, demoSubscribe } from '@/services/demoStore';
import type { AppUser, ProfessionalProfile } from '@/types';

export const getUser = async (userId: string): Promise<AppUser | null> => {
  if (!isFirebaseConfigured || !db) {
    return demoStore.db.users.find((u) => u.uid === userId) ?? null;
  }
  const snapshot = await getDoc(doc(db, COLLECTIONS.users, userId));
  return snapshot.exists() ? (snapshot.data() as AppUser) : null;
};

/** Observa um utilizador individual. */
export const observeUser = (userId: string, callback: (user: AppUser | null) => void): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe((database) => database.users.find((u) => u.uid === userId) ?? null, callback);
  }
  return onSnapshot(doc(db, COLLECTIONS.users, userId), (snapshot) => {
    callback(snapshot.exists() ? (snapshot.data() as AppUser) : null);
  });
};

/** Observa todos os profissionais aprovados (lista pública). */
export const observeProfessionals = (callback: (list: ProfessionalProfile[]) => void): (() => void) => {
  const isVisible = (p: ProfessionalProfile) => p.approval === 'approved' && !p.blocked;

  if (!isFirebaseConfigured || !db) {
    return demoSubscribe(
      (database) => (database.users.filter((u) => u.role === 'professional') as ProfessionalProfile[]).filter(isVisible),
      callback,
    );
  }

  const q = query(collection(db, COLLECTIONS.users), where('role', '==', 'professional'));
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map((d) => d.data() as ProfessionalProfile).filter(isVisible);
    callback(list);
  });
};

/** Observa todos os utilizadores (área administrativa). */
export const observeAllUsers = (callback: (list: AppUser[]) => void): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe((database) => [...database.users], callback);
  }
  return onSnapshot(collection(db, COLLECTIONS.users), (snapshot) => {
    callback(snapshot.docs.map((d) => d.data() as AppUser));
  });
};

export const updateUser = async (userId: string, changes: Partial<AppUser>): Promise<void> => {
  if (!isFirebaseConfigured || !db) {
    demoStore.update((database: any) => {
 const index = database.users.findIndex((u: any) => u.uid === userId);
      if (index >= 0) {
        database.users[index] = { ...database.users[index], ...changes } as AppUser;
      }
    });
    return;
  }
  await updateDoc(doc(db, COLLECTIONS.users, userId), changes as Record<string, unknown>);
};

/** Adiciona ou remove um profissional dos favoritos do cliente. */
export const toggleFavorite = async (userId: string, professionalId: string): Promise<void> => {
  const user = await getUser(userId);
  if (!user) return;

const current = user.favorites ?? [];

const next = current.includes(professionalId)
  ? current.filter((id: string) => id !== professionalId)
  : [...current, professionalId];

await updateUser(userId, { favorites: next });
};
