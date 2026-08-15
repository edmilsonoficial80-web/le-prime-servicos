import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ADMIN_EMAIL, COLLECTIONS, auth, db, googleProvider, isFirebaseConfigured } from '@/config/firebase';
import { demoStore } from '@/services/demoStore';
import { STORAGE_FOLDERS, uploadFile, uploadFiles } from '@/services/storageService';
import type {
  AppUser,
  ClientProfile,
  ClientRegistrationData,
  ProfessionalProfile,
  ProfessionalRegistrationData,
} from '@/types';
import { uid } from '@/utils';

/** Traduz os códigos de erro do Firebase Auth para mensagens em português. */
export const authErrorMessage = (error: unknown): string => {
  const code = (error as { code?: string })?.code ?? '';
  const map: Record<string, string> = {
    'auth/invalid-email': 'Email inválido.',
    'auth/user-disabled': 'Esta conta foi desativada.',
    'auth/user-not-found': 'Não existe conta com este email.',
    'auth/wrong-password': 'Email ou palavra-passe incorretos.',
    'auth/invalid-credential': 'Email ou palavra-passe incorretos.',
    'auth/email-already-in-use': 'Este email já está registado.',
    'auth/weak-password': 'A palavra-passe deve ter pelo menos 6 caracteres.',
    'auth/too-many-requests': 'Demasiadas tentativas. Tente novamente mais tarde.',
    'auth/popup-closed-by-user': 'Janela do Google fechada antes de concluir.',
    'auth/network-request-failed': 'Sem ligação à internet.',
  };
  if (map[code]) return map[code];
  if (error instanceof Error && error.message) return error.message;
  return 'Ocorreu um erro inesperado. Tente novamente.';
};

const readUserDoc = async (userId: string): Promise<AppUser | null> => {
  if (!db) return null;
  const snapshot = await getDoc(doc(db, COLLECTIONS.users, userId));
  return snapshot.exists() ? (snapshot.data() as AppUser) : null;
};

const writeUserDoc = async (user: AppUser): Promise<void> => {
  if (!db) return;
  await setDoc(doc(db, COLLECTIONS.users, user.uid), user, { merge: true });
};

/** Observa o utilizador autenticado (perfil completo já carregado). */
export const observeAuth = (callback: (user: AppUser | null) => void): (() => void) => {
  if (!isFirebaseConfigured || !auth) {
    const emit = () => {
      const { sessionUid, users } = demoStore.db;
      callback(users.find((u) => u.uid === sessionUid) ?? null);
    };
    emit();
    return demoStore.subscribe(emit);
  }

  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }
    const profile = await readUserDoc(firebaseUser.uid);
    callback(profile);
  });
};

export const loginWithEmail = async (email: string, password: string): Promise<void> => {
  const normalized = email.trim().toLowerCase();

  if (!isFirebaseConfigured || !auth) {
    const { users, passwords } = demoStore.db;
    const user = users.find((u) => u.email.toLowerCase() === normalized);
    if (!user) throw new Error('Não existe conta com este email.');
    const stored = passwords[normalized];
    if (stored && stored !== password) throw new Error('Email ou palavra-passe incorretos.');
    if (user.blocked) throw new Error('Esta conta foi bloqueada pelo administrador.');
    demoStore.update((database) => {
      database.sessionUid = user.uid;
    });
    return;
  }

  const credential = await signInWithEmailAndPassword(auth, normalized, password);
  const profile = await readUserDoc(credential.user.uid);
  if (profile?.blocked) {
    await signOut(auth);
    throw new Error('Esta conta foi bloqueada pelo administrador.');
  }
};

export const loginWithGoogle = async (): Promise<void> => {
  if (!isFirebaseConfigured || !auth) {
    const demoUser = demoStore.db.users.find((u) => u.uid === 'client_1');
    demoStore.update((database) => {
      database.sessionUid = demoUser?.uid ?? null;
    });
    return;
  }

  const credential = await signInWithPopup(auth, googleProvider);
  const existing = await readUserDoc(credential.user.uid);
  if (existing) return;

  const profile: ClientProfile = {
    uid: credential.user.uid,
    role: 'client',
    name: credential.user.displayName ?? 'Novo utilizador',
    email: credential.user.email ?? '',
    phone: credential.user.phoneNumber ?? '',
    city: '',
    photoURL: credential.user.photoURL ?? undefined,
    favorites: [],
    createdAt: Date.now(),
  };
  await writeUserDoc(profile);
};

export const registerClient = async (data: ClientRegistrationData): Promise<void> => {
  const email = data.email.trim().toLowerCase();
  const role = email === ADMIN_EMAIL ? 'admin' : 'client';

  if (!isFirebaseConfigured || !auth) {
    if (demoStore.db.users.some((u) => u.email.toLowerCase() === email)) {
      throw new Error('Este email já está registado.');
    }
    const profile = {
      uid: uid('client'),
      role,
      name: data.name.trim(),
      email,
      phone: data.phone.trim(),
      city: data.city.trim(),
      favorites: [],
      createdAt: Date.now(),
    } as AppUser;
    demoStore.update((database) => {
      database.users.push(profile);
      database.passwords[email] = data.password;
      database.sessionUid = profile.uid;
    });
    return;
  }

  const credential = await createUserWithEmailAndPassword(auth, email, data.password);
  await updateProfile(credential.user, { displayName: data.name.trim() });
  const profile = {
    uid: credential.user.uid,
    role,
    name: data.name.trim(),
    email,
    phone: data.phone.trim(),
    city: data.city.trim(),
    favorites: [],
    createdAt: Date.now(),
  } as AppUser;
  await writeUserDoc(profile);
};

export const registerProfessional = async (data: ProfessionalRegistrationData): Promise<void> => {
  const email = data.email.trim().toLowerCase();

  const buildProfile = async (userId: string): Promise<ProfessionalProfile> => {
    const photoURL = data.photoFile ? await uploadFile(data.photoFile, STORAGE_FOLDERS.avatars) : undefined;
    const portfolio = data.portfolioFiles?.length
      ? await uploadFiles(data.portfolioFiles, STORAGE_FOLDERS.portfolio)
      : [];
    const idDocumentURL = data.idDocumentFile
      ? await uploadFile(data.idDocumentFile, STORAGE_FOLDERS.documents)
      : undefined;

    return {
      uid: userId,
      role: 'professional',
      name: data.name.trim(),
      email,
      phone: data.phone.trim(),
      city: data.city.trim(),
      photoURL,
      specialty: data.specialty,
      description: data.description.trim(),
      experienceYears: data.experienceYears,
      rating: 0,
      reviewsCount: 0,
      completedJobs: 0,
      earnings: 0,
      portfolio,
      idDocumentURL,
      approval: 'pending',
      favorites: [],
      createdAt: Date.now(),
    };
  };

  if (!isFirebaseConfigured || !auth) {
    if (demoStore.db.users.some((u) => u.email.toLowerCase() === email)) {
      throw new Error('Este email já está registado.');
    }
    const profile = await buildProfile(uid('pro'));
    demoStore.update((database) => {
      database.users.push(profile);
      database.passwords[email] = data.password;
      database.sessionUid = profile.uid;
    });
    return;
  }

  const credential = await createUserWithEmailAndPassword(auth, email, data.password);
  await updateProfile(credential.user, { displayName: data.name.trim() });
  const profile = await buildProfile(credential.user.uid);
  await writeUserDoc(profile);
};

export const logout = async (): Promise<void> => {
  if (!isFirebaseConfigured || !auth) {
    demoStore.update((database) => {
      database.sessionUid = null;
    });
    return;
  }
  await signOut(auth);
};

export const resetPassword = async (email: string): Promise<void> => {
  if (!isFirebaseConfigured || !auth) {
    const exists = demoStore.db.users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!exists) throw new Error('Não existe conta com este email.');
    return;
  }
  await sendPasswordResetEmail(auth, email.trim().toLowerCase());
};
