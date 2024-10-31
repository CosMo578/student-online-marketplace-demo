import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvWRCvwDzoXbeTtJ-4yE9FmN3QqRTSE6Y",
  authDomain: "student-marketplace.firebaseapp.com",
  projectId: "student-marketplace",
  storageBucket: "student-marketplace.appspot.com",
  messagingSenderId: "791550602443",
  appId: "1:791550602443:web:92d339328c1f15e0ceff4e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
