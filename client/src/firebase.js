// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'video-b627b.firebaseapp.com',
  projectId: 'video-b627b',
  storageBucket: 'video-b627b.appspot.com',
  messagingSenderId: '945581839467',
  appId: '1:945581839467:web:c35320f6f8c588b88a8d2e',
};

// Initialize Firebase
export default initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
