// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABGTWldWfmHcOpTVDjTkEea_xG3Fd5f-A",
  authDomain: "ethiokidslearn.firebaseapp.com",
  projectId: "ethiokidslearn",
  storageBucket: "ethiokidslearn.firebasestorage.app",
  messagingSenderId: "187247254526",
  appId: "1:187247254526:web:a278c90a2a54422f31beaf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);