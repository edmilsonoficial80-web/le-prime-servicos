import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where, } from 'firebase/firestore';
import { COLLECTIONS, db, isFirebaseConfigured } from '@/config/firebase';
import { demoStore, demoSubscribe } from '@/services/demoStore';
import { createNotification } from '@/services/notificationService';
import { getRequest, updateRequest } from '@/services/requestService';
import { formatCurrency, sortByDateDesc, uid } from '@/utils';
export const createProposal = async (input) => {
    const { request, professional } = input;
    const proposal = {
        id: uid('prop'),
        requestId: request.id,
        requestTitle: request.title,
        clientId: request.clientId,
        professionalId: professional.uid,
        professionalName: professional.name,
        professionalPhoto: professional.photoURL,
        professionalRating: professional.rating,
        price: input.price,
        message: input.message.trim(),
        estimatedDays: input.estimatedDays,
        status: 'pending',
        createdAt: Date.now(),
    };
    let proposalId = proposal.id;
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            database.proposals.unshift(proposal);
            const target = database.requests.find((r) => r.id === request.id);
            if (target)
                target.proposalsCount += 1;
        });
    }
    else {
        const { id: _ignored, ...payload } = proposal;
        const created = await addDoc(collection(db, COLLECTIONS.proposals), payload);
        proposalId = created.id;
        await updateRequest(request.id, { proposalsCount: (request.proposalsCount ?? 0) + 1 });
    }
    await createNotification({
        userId: request.clientId,
        type: 'proposal_received',
        title: 'Nova proposta recebida',
        body: `${professional.name} enviou uma proposta de ${formatCurrency(input.price)} para "${request.title}".`,
        link: `/cliente/pedidos/${request.id}`,
    });
    return proposalId;
};
export const observeRequestProposals = (requestId, callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.proposals.filter((p) => p.requestId === requestId)), callback);
    }
    const q = query(collection(db, COLLECTIONS.proposals), where('requestId', '==', requestId), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
};
export const observeClientProposals = (clientId, callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.proposals.filter((p) => p.clientId === clientId)), callback);
    }
    const q = query(collection(db, COLLECTIONS.proposals), where('clientId', '==', clientId), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
};
export const observeProfessionalProposals = (professionalId, callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.proposals.filter((p) => p.professionalId === professionalId)), callback);
    }
    const q = query(collection(db, COLLECTIONS.proposals), where('professionalId', '==', professionalId), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
};
export const observeAllProposals = (callback) => {
    if (!isFirebaseConfigured || !db) {
        return demoSubscribe((database) => sortByDateDesc(database.proposals), callback);
    }
    return onSnapshot(collection(db, COLLECTIONS.proposals), (snapshot) => {
        callback(sortByDateDesc(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))));
    });
};
/** O cliente aceita uma proposta: as restantes são recusadas e o serviço arranca. */
export const acceptProposal = async (proposal) => {
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            database.proposals.forEach((p) => {
                if (p.requestId !== proposal.requestId)
                    return;
                p.status = p.id === proposal.id ? 'accepted' : 'rejected';
            });
            const request = database.requests.find((r) => r.id === proposal.requestId);
            if (request) {
                request.status = 'in_progress';
                request.acceptedProposalId = proposal.id;
                request.professionalId = proposal.professionalId;
                request.professionalName = proposal.professionalName;
            }
        });
    }
    else {
        const snapshot = await getDocs(query(collection(db, COLLECTIONS.proposals), where('requestId', '==', proposal.requestId)));
        await Promise.all(snapshot.docs.map((d) => updateDoc(doc(db, COLLECTIONS.proposals, d.id), {
            status: d.id === proposal.id ? 'accepted' : 'rejected',
        })));
        await updateRequest(proposal.requestId, {
            status: 'in_progress',
            acceptedProposalId: proposal.id,
            professionalId: proposal.professionalId,
            professionalName: proposal.professionalName,
        });
    }
    await createNotification({
        userId: proposal.professionalId,
        type: 'proposal_accepted',
        title: 'Proposta aceite!',
        body: `A sua proposta para "${proposal.requestTitle}" foi aceite. Contacte já o cliente.`,
        link: `/profissional/servicos/${proposal.requestId}`,
    });
};
export const rejectProposal = async (proposal) => {
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            const found = database.proposals.find((p) => p.id === proposal.id);
            if (found)
                found.status = 'rejected';
        });
        return;
    }
    await updateDoc(doc(db, COLLECTIONS.proposals, proposal.id), { status: 'rejected' });
};
/** Aceitação directa pelo profissional ("aceitar serviço" sem negociação). */
export const acceptRequestDirectly = async (request, professional) => {
    const proposalId = await createProposal({
        request,
        professional,
        price: request.budget,
        message: 'Aceito o serviço pelo valor indicado.',
        estimatedDays: 1,
    });
    const fresh = (await getRequest(request.id)) ?? request;
    await updateRequest(request.id, {
        status: 'in_progress',
        acceptedProposalId: proposalId,
        professionalId: professional.uid,
        professionalName: professional.name,
        proposalsCount: fresh.proposalsCount,
    });
    if (!isFirebaseConfigured || !db) {
        demoStore.update((database) => {
            const found = database.proposals.find((p) => p.id === proposalId);
            if (found)
                found.status = 'accepted';
        });
    }
    else {
        await updateDoc(doc(db, COLLECTIONS.proposals, proposalId), { status: 'accepted' });
    }
    await createNotification({
        userId: request.clientId,
        type: 'service_accepted',
        title: 'Serviço aceite',
        body: `${professional.name} aceitou o seu pedido "${request.title}".`,
        link: `/cliente/pedidos/${request.id}`,
    });
};
