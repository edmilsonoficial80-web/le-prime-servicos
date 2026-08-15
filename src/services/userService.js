import { collection, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { COLLECTIONS, db, isFirebaseConfigured } from '@/config/firebase';
import { demoStore, demoSubscribe } from '@/services/demoStore';
export const getUser = async (userId) => {
    if (!isFirebaseConfigured || !db) {
        return demoStore.db.users.find((u) => u.uid === userId) ?? null;
    }
    const snapshot = await getDoc(doc(db, COLLECTIONS.users, userId));
    return snapshot.exists() ? snapshot.data() : null;
};
/** Observa um utilizador individual. */
export const observeUser = (userId, callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => database.users.find((u) => u.uid === userId) ?? null, callback);
    }
    return onSnapshot(doc(db, COLLECTIONS.users, userId), (snapshot) => {
        callback(snapshot.exists() ? snapshot.data() : null);
    });
};
/** Observa todos os profissionais aprovados (lista pública). */
export const observeProfessionals = (callback) => {
    const isVisible = (p) => p.approval === 'approved' && !p.blocked;
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => database.users.filter((u) => u.role === 'professional').filter(isVisible), callback);
    }
    const q = query(collection(db, COLLECTIONS.users), where('role', '==', 'professional'));
    return onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map((d) => d.data()).filter(isVisible);
        callback(list);
    });
};
/** Observa todos os utilizadores (área administrativa). */
export const observeAllUsers = (callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => [...database.users], callback);
    }
    return onSnapshot(collection(db, COLLECTIONS.users), (snapshot) => {
        callback(snapshot.docs.map((d) => d.data()));
    });
};
export const updateUser = async (userId, changes) => {
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            const index = database.users.findIndex((u) => u.uid === userId);
            if (index >= 0) {
                database.users[index] = { ...database.users[index], ...changes };
            }
        });
        return;
    }
    await updateDoc(doc(db, COLLECTIONS.users, userId), changes);
};
/** Adiciona ou remove um profissional dos favoritos do cliente. */
export const toggleFavorite = async (userId, professionalId) => {
    const user = await getUser(userId);
    if (!user)
        return;
    const current = user.favorites ?? [];
    const next = current.includes(professionalId)
        ? current.filter((id) => id !== professionalId)
        : [...current, professionalId];
    await updateUser(userId, { favorites: next });
};
