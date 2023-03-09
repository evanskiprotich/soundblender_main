// Import the functions you need from the SDKs you need
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-storage.js";

console.log("works as expected");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARn8vMWIUhDiW_8RSMtVsSP5etzQ9zMqQ",
  authDomain: "soundblender-1b517.firebaseapp.com",
  databaseURL: "https://soundblender-1b517-default-rtdb.firebaseio.com",
  projectId: "soundblender-1b517",
  storageBucket: "soundblender-1b517.appspot.com",
  messagingSenderId: "1013092873938",
  appId: "1:1013092873938:web:337751fafa54871bb8df0b",
  measurementId: "G-R9N1QEN1NJ"
};

// Initialize Services
const db = getFirestore();
const storage = getStorage();

//The play funtionality
let masterPlay = document.getElementById("masterPlay");
