import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBItqeTrwKWGAfjHTAsE0zIMyTf7jdhCW8",
  authDomain: "alex-project12d.firebaseapp.com",
  projectId: "alex-project12d",
  storageBucket: "alex-project12d.appspot.com",
  messagingSenderId: "830187763983",
  appId: "1:830187763983:web:b36efb8f003034c7c3667a",
  measurementId: "G-BE4MVG39WC"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)  