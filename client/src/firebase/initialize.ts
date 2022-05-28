import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const initializeFirebase = () => {
  const firebaseConfigs = {
    apiKey: "AIzaSyAUXFR8qCTKWZqyl24Dq4L9ZVWVczyZU34",
    authDomain: "edwork-develop.firebaseapp.com",
    projectId: "edwork-develop",
    storageBucket: "edwork-develop.appspot.com",
    messagingSenderId: "310162911866",
    appId: "1:310162911866:web:c6f26001bd28306c3701c3",
    measurementId: "G-8ZVYP5WLWY"
  };

  const app = initializeApp(firebaseConfigs);
  const auth = getAuth(app);

  return {
    auth,
  };
};