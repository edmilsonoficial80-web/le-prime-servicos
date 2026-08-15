import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where, writeBatch, } from 'firebase/firestore';
import { COLLECTIONS, db, isFirebaseConfigured } from '@/config/firebase';
import { demoStore, demoSubscribe } from '@/services/demoStore';
import { sortByDateDesc, uid } from '@/utils';
/** Pede permissão ao browser para mostrar notificações nativas. */
export const requestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window))
        return false;
    if (Notification.permission === 'granted')
        return true;
    if (Notification.permission === 'denied')
        return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
};
const showNativeNotification = (title, body) => {
    if (typeof window === 'undefined' || !('Notification' in window))
        return;
    if (Notification.permission !== 'granted')
        return;
    try {
        new Notification(title, { body, icon: '/logo.svg' });
    }
    catch {
        /* alguns browsers móveis exigem service worker — ignorado */
    }
};
export const createNotification = async (input) => {
    const notification = {
        id: uid('not'),
        read: false,
        createdAt: Date.now(),
        ...input,
    };
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            database.notifications.unshift(notification);
        });
    }
    else {
        const { id: _ignored, ...payload } = notification;
        await addDoc(collection(db, COLLECTIONS.notifications), payload);
    }
    showNativeNotification(notification.title, notification.body);
};
export const observeNotifications = (userId, callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.notifications.filter((n) => n.userId === userId)), callback);
    }
    const q = query(collection(db, COLLECTIONS.notifications), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
};
export const markNotificationRead = async (notificationId) => {
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            const found = database.notifications.find((n) => n.id === notificationId);
            if (found)
                found.read = true;
        });
        return;
    }
    await updateDoc(doc(db, COLLECTIONS.notifications, notificationId), { read: true });
};
export const markAllNotificationsRead = async (userId) => {
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            database.notifications.forEach((n) => {
                if (n.userId === userId)
                    n.read = true;
            });
        });
        return;
    }
    const q = query(collection(db, COLLECTIONS.notifications), where('userId', '==', userId), where('read', '==', false));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => batch.update(d.ref, { read: true }));
    await batch.commit();
};
