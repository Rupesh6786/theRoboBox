// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdkhnfxSxSX0agcrLmE8lYNoG_CPPSZWU",
  authDomain: "robobox-thane.firebaseapp.com",
  projectId: "robobox-thane",
  storageBucket: "robobox-thane.firebasestorage.app",
  messagingSenderId: "994741997631",
  appId: "1:994741997631:web:1e40ca021b087fe232e88a",
  measurementId: "G-Q60GLPD1D2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };
