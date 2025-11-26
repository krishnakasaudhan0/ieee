import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// ... (config remains the same)
const firebaseConfig = {
  apiKey: "AIzaSyDNBYR-zfUL9hh2lZ1mZwiipkoeUJI8EDE",
  authDomain: "ieee-psit.firebaseapp.com",
  databaseURL: "https://ieee-psit-default-rtdb.firebaseio.com",
  projectId: "ieee-psit",
  storageBucket: "ieee-psit.firebasestorage.app",
  messagingSenderId: "443971304218",
  appId: "1:443971304218:web:9eff41a888744173164aa3",
  measurementId: "G-S1JKX9LQNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
