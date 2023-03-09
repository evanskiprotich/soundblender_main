// Import the firebase functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

//-------------------------------------- Initialize Services------------------------------------------//
const app = initializeApp(firebaseConfig);
const auth = getAuth();

console.log("Index Read!");

const login = document.getElementById("login");
const logout = document.getElementById("logout");
const userDP = document.getElementById("userDP");
const my_music = document.getElementById("my_music");
const userID = document.getElementById("userID");
const display2 = document.getElementById("display2");

//check if user is authenticated
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.uid = user.uid;
    const userName = user.displayName;
    const userEmail = user.email;

    logout.classList.remove("hidden");
    userDP.classList.remove("hidden");
    userDP.title = userName;
    userID.title = uid;
    if (user.photoURL == null) {
      userPhoto = "images/placeholder.png";
    } else {
      var userPhoto = user.photoURL;
    }
    userDP.src = userPhoto;

    if (display2 != null) {
      display2.classList.remove("hidden");
    }
  } else {
    login.classList.remove("hidden");
    my_music.classList.add("hidden");

    if (display2 != null) {
      const display1 = document.getElementById("display1");
      const loginRequest = document.createElement("div");
      loginRequest.classList.add("alert");
      loginRequest.innerHTML =
        "<a href='login.html'>Log in </a> to upload your music to soundblender.";

      display1.appendChild(loginRequest);
    }

    login.onclick = function () {
      window.location.href = "login.html";
    };

    console.log("User is not authenticated");
  }
});
