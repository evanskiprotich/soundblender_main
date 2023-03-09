# SoundBlender Music Web App

Sound Blender is a music player web application project that is developed mainly using vanilla JavaScript and Firebase as the backend service.
The project essentially allows users to upload music and listen to music. 
Users can listen and enjoy the music uploaded by other users regardless of their authentication status. However, a user must be signed in to upload music.

## Language and Tools Used
1. Vscode
2. Javascript 
3. HTML
4. CSS
5. Firestore 
6. Firebase

## Features
### 1. Authentication 
Registering and login using email and password; Facebook API, twitter API, and google API implemented

### 2. Upload to Firebase Cloud Storage (Firestore)
Authenticated users can upload their music to soundblender, while the not authenticated users will be requested to register/login.
Uploaded music is stored in the cloud  Firebase, then the media URLs are copied to Firestore.

### 3. Play Music (Fetch Data)
Both authenticated and unauthenticated users can play music.
Whenever music is being played, the ID associated to the selected music adds the URL to the audio tag, fetches the song title, names of the artists, and the cover art.