import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyAvWRCvwDzoXbeTtJ-4yE9FmN3QqRTSE6Y",
  // authDomain: "student-online-marketplace.firebaseapp.com",
  // projectId: "student-online-marketplace",
  // storageBucket: "student-online-marketplace.firebasestorage.app",
  // messagingSenderId: "791550602443",
  // appId: "1:791550602443:web:92d339328c1f15e0ceff4e",

  apiKey: "AIzaSyCcSgspnQIGrsdFu89UK_tW6NAjbFrQq98",
  authDomain: "quik-docs.firebaseapp.com",
  projectId: "quik-docs",
  storageBucket: "quik-docs.appspot.com",
  messagingSenderId: "306832165543",
  appId: "1:306832165543:web:351c3468c8c3c62ca72982",
  measurementId: "G-VF0FF1503L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
