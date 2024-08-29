// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxrAZpHDMyFqlsMlWK83eqFKFa35wqJ9s",
  authDomain: "onebutton-65969.firebaseapp.com",
  projectId: "onebutton-65969",
  storageBucket: "onebutton-65969.appspot.com",
  messagingSenderId: "302951297116",
  appId: "1:302951297116:web:7d14b30d46f6f907b7b699",
  measurementId: "G-SCMX50W8YD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth}