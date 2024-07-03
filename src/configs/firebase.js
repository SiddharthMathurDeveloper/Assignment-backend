import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACtPTQM3brwsbDqwsrKxPJoCr4Hw_2jZs",
  authDomain: "assignment-7b010.firebaseapp.com",
  projectId: "assignment-7b010",
  storageBucket: "assignment-7b010.appspot.com",
  messagingSenderId: "931296470949",
  appId: "1:931296470949:web:ed18b448f36f1a601eea4c",
  measurementId: "G-MVKQXTTXQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(app);

export { app, firebaseDB };
