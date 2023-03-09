import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
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

// Your web app's Firebase configuration
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

console.log("Uploading Process Has Started");

//Initialize Services
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

//variables and references
let songFiles = [];
let imgFiles = [];
const reader = new FileReader();
const namebox = document.getElementById("namebox");
const imgNamebox = document.getElementById("imgNamebox");
const extLabel = document.getElementById("extLabel");
const imgLabel = document.getElementById("imgLabel");
const mySong = document.getElementById("mySong");
const selectSong = document.getElementById("selectSong");
const selectImage = document.getElementById("selectImage");
const upload = document.getElementById("upload");
const progress = document.getElementById("progress");
const uploadProgress = document.getElementById("uploadProgress");
const artistTitle = document.getElementById("artistTitle");
const genre = document.getElementById("genre");
const cancel = document.getElementById("cancelUpload");

//create an input element that will allow the user to select a file
const songInput = document.createElement("input");
songInput.type = "file";
songInput.onchange = (e) => {
  songFiles = e.target.files;
  const extention = GetFileExt(songFiles[0]);
  const name = GetFileName(songFiles[0]);

  namebox.value = name;
  extLabel.innerHTML = extention;

  reader.readAsDataURL(songFiles[0]);
};

const imgInput = document.createElement("input");
imgInput.type = "file";
imgInput.onchange = (e) => {
  imgFiles = e.target.files;
  const extention = GetFileExt(imgFiles[0]);
  const name = GetFileName(imgFiles[0]);

  imgNamebox.value = name;
  imgLabel.innerHTML = extention;

  reader.readAsDataURL(imgFiles[0]);
};

//After reading a file, assign it to the audio element
//the reader will read the file as a URL
//the result will go inside the audio source
reader.onload = function () {
  mySong.src = reader.result;
};

//selection function
selectSong.onclick = function () {
  songInput.click();
};

selectImage.onclick = function () {
  imgInput.click();
};

function GetFileExt(file) {
  const temp = file.name.split(".");
  const ext = temp.slice(temp.length - 1, temp.length);
  return "." + ext[0];
}

function GetFileName(file) {
  const temp = file.name.split(".");
  var fname = temp.slice(0, -1).join(".");

  return fname;
}

//upload to cloud-storage
async function uploadProcess() {
  console.log("Starting upload process to cloud-storage");
  // Upload the song
  const songToUpload = songFiles[0];
  const songName = namebox.value + extLabel.innerHTML;
  const metaData = {
    contentType: songToUpload.type,
  };

  const storeRef = storageRef(storage, "Songs/" + songName);
  const uploadTask = uploadBytesResumable(storeRef, songToUpload, metaData);
  uploadTask.on(
    "state-changed",
    (snapshot) => {
      uploadProgress.classList.remove("hidden");
      const progressPercentage = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      progress.innerHTML = "Uploading: " + progressPercentage + "%";
      uploadProgress.value = progressPercentage;
      if (progressPercentage == 100) {
        uploadProgress.classList.add("hidden");
        progress.innerHTML = "Music file upload was successful";
        progress.setAttribute("style", "color:green");
      }
    },
    (error) => {
      alert("Error: File is not uploaded. Please try again.");
    },
    () => {
      getDownloadURL(storeRef).then((downloadURL) => {
        SaveURLtoFirestore(downloadURL);
        console.log(downloadURL);
      });
    }
  );

  // Upload image
  const imageToUpload = imgFiles[0];
  const imageName = imgNamebox.value + imgLabel.innerHTML;
  const storeImgRef = storageRef(storage, "Images/" + imageName);
  const uploadImgTask = uploadBytesResumable(storeImgRef, imageToUpload);
  uploadImgTask.on(
    "state-changed",
    (snapshot) => {},
    (error) => {
      alert("Error: Image File not uploaded. Please try again.");
    },
    () => {
      getDownloadURL(storeImgRef).then((downloadURL) => {
        SaveImageURLtoFirestore(downloadURL);
        console.log(downloadURL);
      });
    }
  );
}

//Saving to firestore
async function SaveURLtoFirestore(url) {
  const name = namebox.value;
  const artist = artistTitle.value;
  const type = genre.value;
  onAuthStateChanged(auth, (user) => {
    window.uid = user.uid;
  });

  //Setting up the firestore collection and song document
  let ref = doc(db, "songs/" + name);
  await setDoc(
    ref,
    {
      songName: name,
      songURL: url,
      artist: artist,
      genre: type,
      user: uid,
    },
    {
      merge: true,
    }
  );

  // Resetting the input fields
  namebox.value = "";
  imgNamebox.value = "";
  extLabel.value = "";
  artistTitle.value = "";
  genre.value = "";
}

async function SaveImageURLtoFirestore(url) {
  const name = namebox.value;
  //Setting up the firestore collection of the image  URL
  var imgRef = doc(db, "songs/" + name);
  await setDoc(
    imgRef,
    {
      ImageUrl: url,
    },
    {
      merge: true,
    }
  );

  // Resetting the input fields
  imgLabel.value = "";
}
upload.onclick = uploadProcess;

cancel.onclick = function () {
  namebox.value = "";
  imgNamebox.value = "";
  extLabel.value = "";
  artistTitle.value = "";
  ftArtists.value = "";
  genre.value = "";
};
