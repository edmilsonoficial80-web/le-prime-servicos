import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { COLLECTIONS, db, isFirebaseConfigured } from '@/config/firebase';
import { demoStore, demoSubscribe } from '@/services/demoStore';
import { createNotification } from '@/services/notificationService';
import { updateRequest } from '@/services/requestService';
import { getUser, updateUser } from '@/services/userService';
import { sortByDateDesc, uid } from '@/utils';
/** Publica a avaliação e recalcula a média do profissional. */
export const createReview = async (input) => {
    const { request, client } = input;
    if (!request.professionalId)
        throw new Error('Este pedido ainda não tem profissional atribuído.');
    const review = {
        id: uid('rev'),
        requestId: request.id,
        requestTitle: request.title,
        professionalId: request.professionalId,
        clientId: client.uid,
        clientName: client.name,
        clientPhoto: client.photoURL,
        rating: input.rating,
        comment: input.comment.trim(),
        createdAt: Date.now(),
    };
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            database.reviews.unshift(review);
        });
    }
    else {
        const { id: _ignored, ...payload } = review;
        await addDoc(collection(db, COLLECTIONS.reviews), payload);
    }
    const professional = (await getUser(request.professionalId));
    if (professional) {
        const count = (professional.reviewsCount ?? 0) + 1;
        const average = ((professional.rating ?? 0) * (professional.reviewsCount ?? 0) + input.rating) / count;
        await updateUser(professional.uid, {
            rating: Math.round(average * 10) / 10,
            reviewsCount: count,
        });
    }
    await updateRequest(request.id, { reviewed: true, status: 'completed' });
    await createNotification({
        userId: request.professionalId,
        type: 'system',
        title: 'Nova avaliação',
        body: `${client.name} avaliou o seu trabalho com ${input.rating} estrelas.`,
        link: `/profissional/perfil`,
    });
};
export const observeProfessionalReviews = (professionalId, callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.reviews.filter((r) => r.professionalId === professionalId)), callback);
    }
    const q = query(collection(db, COLLECTIONS.reviews), where('professionalId', '==', professionalId), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
};
