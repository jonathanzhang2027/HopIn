// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqS055Ta_AzhDrGo89PaYOhk1sWLfOqw8",
  authDomain: "hopin-191b9.firebaseapp.com",
  projectId: "hopin-191b9",
  storageBucket: "hopin-191b9.firebasestorage.app",
  messagingSenderId: "517276527992",
  appId: "1:517276527992:web:e53ac6812eaeafeb6f2c8d",
  measurementId: "G-LZYRTQZWFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);