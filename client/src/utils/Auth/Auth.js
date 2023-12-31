// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDZIxXMtfc14Yu2gyc5PfdrN6TM88iTMEI',
  authDomain: 'wsd-project-counselling-app.firebaseapp.com',
  projectId: 'wsd-project-counselling-app',
  storageBucket: 'wsd-project-counselling-app.appspot.com',
  messagingSenderId: '946959119711',
  appId: '1:946959119711:web:cbafd15468ffda06b7b2ea',
  measurementId: 'G-LJQZ70XS5B'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
