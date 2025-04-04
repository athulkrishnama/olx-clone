import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANAe69RgkyL6yVtUJC8XDHmtlWqka6RlE",
    authDomain: "test-947f1.firebaseapp.com",
    projectId: "test-947f1",
    storageBucket: "test-947f1.firebasestorage.app",
    messagingSenderId: "296693163513",
    appId: "1:296693163513:web:35c71bf9a199b19a7d8928",
    measurementId: "G-5R07MJRK68"
  };

  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);