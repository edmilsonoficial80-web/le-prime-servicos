import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { isFirebaseConfigured, storage } from '@/config/firebase';
import { fileToDataUrl, uid } from '@/utils';
/**
 * Upload de ficheiros para o Firebase Storage.
 * Em modo demonstração o ficheiro é convertido em Data URL local.
 */
export const uploadFile = async (file, folder) => {
    if (!isFirebaseConfigured || !storage) {
        return fileToDataUrl(file);
    }
    const safeName = file.name.replace(/[^\w.\-]/g, '_');
    const path = `${folder}/${uid('file')}_${safeName}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
};
export const uploadFiles = async (files, folder) => Promise.all(files.map((file) => uploadFile(file, folder)));
export const STORAGE_FOLDERS = {
    avatars: 'avatars',
    portfolio: 'portfolio',
    documents: 'documents',
    requests: 'requests',
    chat: 'chat',
};
