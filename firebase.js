// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import admin from "firebase-admin";

import {serviceAccount} from "./curastone-74faf-firebase-adminsdk-816zm-ba0119a794.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXvNUAiauvWwM1kiP-Ff_t4BPEWeAQXGI",
  authDomain: "curastone-74faf.firebaseapp.com",
  projectId: "curastone-74faf",
  storageBucket: "curastone-74faf.appspot.com",
  messagingSenderId: "190963195631",
  appId: "1:190963195631:web:449dfda543dba8b2a1851a",
  measurementId: "G-4ZGD25CKG2"
};

// Initialize Firebase

const app = initializeApp(
  // credential: admin.credential.cert(serviceAccount),
  firebaseConfig
  // databaseURL: 'https://curastone-74faf-default-rtdb.firebaseio.com/'
  
);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const authentication = getAuth(app);


