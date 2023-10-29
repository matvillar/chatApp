import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBuWeDmqn2Wo1VfZRjQS3TciF53EgDuAqw',
  authDomain: 'chatty-f645b.firebaseapp.com',
  projectId: 'chatty-f645b',
  storageBucket: 'chatty-f645b.appspot.com',
  messagingSenderId: '1029320461030',
  appId: '1:1029320461030:web:b347ce243bfc290839c927',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
