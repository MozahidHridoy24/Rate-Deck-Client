// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk5WkrgWQaJuW8XJyo41q1b7dQKVN0h1A",
  authDomain: "rate-deck.firebaseapp.com",
  projectId: "rate-deck",
  storageBucket: "rate-deck.firebasestorage.app",
  messagingSenderId: "570572322290",
  appId: "1:570572322290:web:5a57c2e2ca7d262855676b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
