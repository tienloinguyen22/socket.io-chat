import admin from 'firebase-admin';
import { Configs } from '../configs';

export const initializeFirebase = (configs: Configs): admin.app.App => {
  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId: configs.firebase.projectId,
      clientEmail: configs.firebase.clientEmail,
      privateKey: (configs.firebase.privateKey || '').replace(/\\n/g, '\n'),
    }),
  });
};
