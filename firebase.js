// Import the functions you need from the SDKs you need
import { app, initializeApp , apps} from "firebase/app";
import { getFirestore, initializeFirestore  } from "firebase/firestore"
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyCec_FRVlBovjInwtS7RTVAtgpjXgLSR7Y",

  authDomain: "furnishare-649cd.firebaseapp.com",

  projectId: "furnishare-649cd",

  storageBucket: "furnishare-649cd.appspot.com",

  messagingSenderId: "362284033857",

  appId: "1:362284033857:web:29b971235b640ea78163c0"

};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();