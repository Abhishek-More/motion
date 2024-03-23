import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import "../app.css";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBL8fOg401kpS8a-7a0F6mLCt9oRgzBxg0",
  authDomain: "motion-16a40.firebaseapp.com",
  projectId: "motion-16a40",
  storageBucket: "motion-16a40.appspot.com",
  messagingSenderId: "851857016384",
  appId: "1:851857016384:web:57da9e269be1f079db41a5",
  measurementId: "G-Y01ZD6WE8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);