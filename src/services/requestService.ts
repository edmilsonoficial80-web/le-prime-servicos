import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { COLLECTIONS, db, isFirebaseConfigured } from '@/config/firebase';
import { demoStore, demoSubscribe } from '@/services/demoStore';
import { createNotification } from '@/services/notificationService';
import { STORAGE_FOLDERS, uploadFiles } from '@/services/storageService';
import { getUser, updateUser } from '@/services/userService';
import type { AppUser, ProfessionalProfile, RequestStatus, ServiceRequest, Urgency } from '@/types';
import { sortByDateDesc, uid } from '@/utils';

export interface CreateRequestInput {
  categoryId: string;
  title: string;
  description: string;
  address: string;
  date: string;
  urgency: Urgency;
  budget: number;
  photoFiles: File[];
}

export const createRequest = async (client: AppUser, input: CreateRequestInput): Promise<string> => {
  const photos = input.photoFiles.length ? await uploadFiles(input.photoFiles, STORAGE_FOLDERS.requests) : [];

  const request: ServiceRequest = {
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
export const observeClientRequests = (
  clientId: string,
  callback: (list: ServiceRequest[]) => void,
): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe(
      (database) => sortByDateDesc(database.requests.filter((r) => r.clientId === clientId)),
      callback,
    );
  }
  const q = query(
    collection(db, COLLECTIONS.requests),
    where('clientId', '==', clientId),
    orderBy('createdAt', 'desc'),
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ServiceRequest));
  });
};

/** Observa todos os pedidos abertos (feed do profissional / home). */
export const observeOpenRequests = (callback: (list: ServiceRequest[]) => void): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe((database) => sortByDateDesc(database.requests.filter((r) => r.status === 'open')), callback);
  }
  const q = query(
    collection(db, COLLECTIONS.requests),
    where('status', '==', 'open'),
    orderBy('createdAt', 'desc'),
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ServiceRequest));
  });
};

/** Observa os pedidos atribuídos a um profissional. */
export const observeProfessionalRequests = (
  professionalId: string,
  callback: (list: ServiceRequest[]) => void,
): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe(
      (database) => sortByDateDesc(database.requests.filter((r) => r.professionalId === professionalId)),
      callback,
    );
  }
  const q = query(
    collection(db, COLLECTIONS.requests),
    where('professionalId', '==', professionalId),
    orderBy('createdAt', 'desc'),
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ServiceRequest));
  });
};

export const observeAllRequests = (callback: (list: ServiceRequest[]) => void): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe((database) => sortByDateDesc(database.requests), callback);
  }
  return onSnapshot(collection(db, COLLECTIONS.requests), (snapshot) => {
    callback(sortByDateDesc(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ServiceRequest)));
  });
};

export const observeRequest = (
  requestId: string,
  callback: (request: ServiceRequest | null) => void,
): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe((database) => database.requests.find((r) => r.id === requestId) ?? null, callback);
  }
  return onSnapshot(doc(db, COLLECTIONS.requests, requestId), (snapshot) => {
    callback(snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as ServiceRequest) : null);
  });
};

export const getRequest = async (requestId: string): Promise<ServiceRequest | null> => {
  if (!isFirebaseConfigured || !db) {
    return demoStore.db.requests.find((r) => r.id === requestId) ?? null;
  }
  const snapshot = await getDoc(doc(db, COLLECTIONS.requests, requestId));
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as ServiceRequest) : null;
};

export const updateRequest = async (requestId: string, changes: Partial<ServiceRequest>): Promise<void> => {
  if (!isFirebaseConfigured || !db) {
    demoStore.update((database) => {
      const index = database.requests.findIndex((r) => r.id === requestId);
      if (index >= 0) database.requests[index] = { ...database.requests[index], ...changes };
    });
    return;
  }
  await updateDoc(doc(db, COLLECTIONS.requests, requestId), changes as Record<string, unknown>);
};

export const setRequestStatus = (requestId: string, status: RequestStatus): Promise<void> =>
  updateRequest(requestId, { status });

export const deleteRequest = async (requestId: string): Promise<void> => {
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
export const completeRequest = async (request: ServiceRequest, price?: number): Promise<void> => {
  await updateRequest(request.id, { status: 'completed' });

  if (request.professionalId) {
    const professional = (await getUser(request.professionalId)) as ProfessionalProfile | null;
    if (professional) {
      await updateUser(professional.uid, {
        completedJobs: (professional.completedJobs ?? 0) + 1,
        earnings: (professional.earnings ?? 0) + (price ?? request.budget),
      } as Partial<AppUser>);
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
