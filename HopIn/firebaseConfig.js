// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBqS055Ta_AzhDrGo89PaYOhk1sWLfOqw8",
  authDomain: "hopin-191b9.firebaseapp.com",
  projectId: "hopin-191b9",
  storageBucket: "hopin-191b9.firebasestorage.app",
  messagingSenderId: "517276527992",
  appId: "1:517276527992:web:e53ac6812eaeafeb6f2c8d",
  measurementId: "G-LZYRTQZWFC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
export {auth, db} // export the firestore db