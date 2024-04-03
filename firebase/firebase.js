// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYHROnSr1Ojwqaf61CM3OFCsWkgF_vrsk",
  authDomain: "foodwaste-80127.firebaseapp.com",
  projectId: "foodwaste-80127",
  storageBucket: "foodwaste-80127.appspot.com",
  messagingSenderId: "902039048167",
  appId: "1:902039048167:web:be1a33daab5cfa3a633742",
  measurementId: "G-NJ89BR6HGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);