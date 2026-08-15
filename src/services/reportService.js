import { addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { COLLECTIONS, db, isFirebaseConfigured } from '@/config/firebase';
import { demoStore, demoSubscribe } from '@/services/demoStore';
import { sortByDateDesc, uid } from '@/utils';
export const createReport = async (input) => {
    const report = {
        id: uid('rep'),
        status: 'open',
        createdAt: Date.now(),
        ...input,
    };
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            database.reports.unshift(report);
        });
        return;
    }
    const { id: _ignored, ...payload } = report;
    await addDoc(collection(db, COLLECTIONS.reports), payload);
};
export const observeReports = (callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.reports), callback);
    }
    return onSnapshot(collection(db, COLLECTIONS.reports), (snapshot) => {
        callback(sortByDateDesc(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))));
    });
};
export const setReportStatus = async (reportId, status) => {
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            const found = database.reports.find((r) => r.id === reportId);
            if (found)
                found.status = status;
        });
        return;
    }
    await updateDoc(doc(db, COLLECTIONS.reports, reportId), { status });
};
