import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc, where, } from 'firebase/firestore';
import { COLLECTIONS, db, isFirebaseConfigured } from '@/config/firebase';
import { demoStore, demoSubscribe } from '@/services/demoStore';
import { createNotification } from '@/services/notificationService';
import { STORAGE_FOLDERS, uploadFiles } from '@/services/storageService';
import { getUser, updateUser } from '@/services/userService';
import { sortByDateDesc, uid } from '@/utils';
export const createRequest = async (client, input) => {
    const photos = input.photoFiles.length ? await uploadFiles(input.photoFiles, STORAGE_FOLDERS.requests) : [];
    const request = {
        id: uid('req'),
        clientId: client.uid,
        clientName: client.name,
        clientPhoto: client.photoURL,
        categoryId: input.categoryId,
        title: input.title.trim(),
        description: input.description.trim(),
        photos,
        address: input.address.trim(),
        location: client.location,
        date: input.date,
        urgency: input.urgency,
        budget: input.budget,
        status: 'open',
        proposalsCount: 0,
        createdAt: Date.now(),
    };
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            database.requests.unshift(request);
        });
        return request.id;
    }
    const { id: _ignored, ...payload } = request;
    const created = await addDoc(collection(db, COLLECTIONS.requests), payload);
    return created.id;
};
/** Observa os pedidos publicados por um cliente. */
export const observeClientRequests = (clientId, callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.requests.filter((r) => r.clientId === clientId)), callback);
    }
    const q = query(collection(db, COLLECTIONS.requests), where('clientId', '==', clientId), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
};
/** Observa todos os pedidos abertos (feed do profissional / home). */
export const observeOpenRequests = (callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.requests.filter((r) => r.status === 'open')), callback);
    }
    const q = query(collection(db, COLLECTIONS.requests), where('status', '==', 'open'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
};
/** Observa os pedidos atribuídos a um profissional. */
export const observeProfessionalRequests = (professionalId, callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.requests.filter((r) => r.professionalId === professionalId)), callback);
    }
    const q = query(collection(db, COLLECTIONS.requests), where('professionalId', '==', professionalId), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
};
export const observeAllRequests = (callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.requests), callback);
    }
    return onSnapshot(collection(db, COLLECTIONS.requests), (snapshot) => {
        callback(sortByDateDesc(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))));
    });
};
export const observeRequest = (requestId, callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => database.requests.find((r) => r.id === requestId) ?? null, callback);
    }
    return onSnapshot(doc(db, COLLECTIONS.requests, requestId), (snapshot) => {
        callback(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
    });
};
export const getRequest = async (requestId) => {
    if (!isFirebaseConfigured || !db) {
        return demoStore.db.requests.find((r) => r.id === requestId) ?? null;
    }
    const snapshot = await getDoc(doc(db, COLLECTIONS.requests, requestId));
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};
export const updateRequest = async (requestId, changes) => {
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            const index = database.requests.findIndex((r) => r.id === requestId);
            if (index >= 0)
                database.requests[index] = { ...database.requests[index], ...changes };
        });
        return;
    }
    await updateDoc(doc(db, COLLECTIONS.requests, requestId), changes);
};
export const setRequestStatus = (requestId, status) => updateRequest(requestId, { status });
export const deleteRequest = async (requestId) => {
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            database.requests = database.requests.filter((r) => r.id !== requestId);
            database.proposals = database.proposals.filter((p) => p.requestId !== requestId);
        });
        return;
    }
    await deleteDoc(doc(db, COLLECTIONS.requests, requestId));
};
/**
 * Marca o serviço como concluído, actualiza as estatísticas do profissional
 * e notifica ambas as partes (o cliente é convidado a avaliar).
 */
export const completeRequest = async (request, price) => {
    await updateRequest(request.id, { status: 'completed' });
    if (request.professionalId) {
        const professional = (await getUser(request.professionalId));
        if (professional) {
            await updateUser(professional.uid, {
                completedJobs: (professional.completedJobs ?? 0) + 1,
                earnings: (professional.earnings ?? 0) + (price ?? request.budget),
            });
        }
        await createNotification({
            userId: request.professionalId,
            type: 'service_completed',
            title: 'Serviço concluído',
            body: `"${request.title}" foi marcado como concluído. Bom trabalho!`,
            link: `/profissional/servicos/${request.id}`,
        });
    }
    await createNotification({
        userId: request.clientId,
        type: 'service_completed',
        title: 'Serviço concluído',
        body: `Avalie o profissional que realizou "${request.title}".`,
        link: `/avaliar/${request.id}`,
    });
};
