// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

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
  measurementId: "G-R9N1QEN1NJ",
};

console.log("Log in working");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize auth
const auth = getAuth();
const googleAuth = new GoogleAuthProvider();
const fbAuth = new FacebookAuthProvider();
const twitterAuth = new TwitterAuthProvider();

//Login user
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("clicked");

  //Getting the input fields
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user logged in:" + cred.user);

      window.location.href = "music.html";
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorMessage);

      if (errorMessage == "Firebase: Error (auth/invalid-email).") {
        alert("Invalid email");
      }
      if (errorMessage == "Firebase: Error (auth/user-not-found).") {
        alert("User not found");
      }

      if (errorMessage == "Firebase: Error (auth/wrong-password).") {
        alert("Invalid password");
      }
    });
});

//login with facebook
const facebookLogin = document.getElementById("fb");
facebookLogin.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("facebook icon clicked");

  const auth = getAuth();
  signInWithPopup(auth, fbAuth)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      window.location.href = "music.html";
      console.log("User logged in:" + user);
    })

    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.log(errorMessage);
      console.log(credential);

      if (
        errorMessage ==
        "Firebase: Error (auth/account-exists-with-different-credential)."
      ) {
        alert("Account associated with the FaceBook account is already in use");
      }
    });
});

//login with twitter
const twitterLogin = document.getElementById("twitter");
twitterLogin.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Twitter icon clicked");

  signInWithPopup(auth, twitterAuth)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      window.location.href = "music.html";
      console.log("user logged in:" + user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...

      console.log(errorMessage);
      console.log(credential);
    });
});

//login with google
const googleLogin = document.getElementById("google");
googleLogin.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("google clicked");

  signInWithPopup(auth, googleAuth)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      window.location.href = "music.html";
      console.log("user logged in:" + user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorMessage);
    });
});
