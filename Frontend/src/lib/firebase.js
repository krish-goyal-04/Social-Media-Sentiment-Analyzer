// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "trendpulse-1da4b.firebaseapp.com",
  projectId: "trendpulse-1da4b",
  storageBucket: "trendpulse-1da4b.firebasestorage.app",
  messagingSenderId: "306468493143",
  appId: "1:306468493143:web:ef6754eca74c156d299012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app)

export default app