import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
/**
 * `true` quando todas as chaves do Firebase estão presentes no `.env`.
 * Caso contrário a aplicação arranca em modo demonstração (dados locais),
 * o que permite explorar todo o produto sem qualquer configuração.
 */
export const isFirebaseConfigured = Object.values(firebaseConfig).every((value) => typeof value === 'string' && value.length > 0);
let app = null;
let authInstance = null;
let dbInstance = null;
let storageInstance = null;
if (isFirebaseConfigured) {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
}
export const firebaseApp = app;
export const auth = authInstance;
export const db = dbInstance;
export const storage = storageInstance;
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL ?? 'admin@leprime.pt').toLowerCase();
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '';
/** Nomes das coleções do Firestore. */
export const COLLECTIONS = {
    users: 'users',
    requests: 'requests',
    proposals: 'proposals',
    conversations: 'conversations',
    messages: 'messages',
    reviews: 'reviews',
    notifications: 'notifications',
    reports: 'reports',
    categories: 'categories',
};
