// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARn8vMWIUhDiW_8RSMtVsSP5etzQ9zMqQ",
  authDomain: "soundblender-1b517.firebaseapp.com",
  databaseURL: "https://soundblender-1b517-default-rtdb.firebaseio.com",
  projectId: "soundblender-1b517",
  storageBucket: "soundblender-1b517.appspot.com",
  messagingSenderId: "1013092873938",
  appId: "1:1013092873938:web:337751fafa54871bb8df0b",
  measurementId: "G-R9N1QEN1NJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize auth
const auth = getAuth();

//Logout the user
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      // Sign out
      window.location.href = "index.html";
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorMessage);
    });
});
