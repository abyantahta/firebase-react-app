// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIeeyLSxTQdb9z71kS5WwfxUjRMcpLwSM",
  authDomain: "fir-react-ca0fe.firebaseapp.com",
  projectId: "fir-react-ca0fe",
  storageBucket: "fir-react-ca0fe.appspot.com",
  messagingSenderId: "910708701184",
  appId: "1:910708701184:web:52a2c00b20be2e1b1280e5",
  measurementId: "G-BCNTQQ959G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage =getStorage(app)