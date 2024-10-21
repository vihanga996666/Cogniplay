// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKjxErr7wy-lTVnp_uvHlTE2ZdIYLyFgg",
    authDomain: "my-react-app-f4d1f.firebaseapp.com",
    projectId: "my-react-app-f4d1f",
    storageBucket: "my-react-app-f4d1f.appspot.com",
    messagingSenderId: "997829264818",
    appId: "1:997829264818:web:77345c2da2b7cca50fd0ab",
    measurementId: "G-89YGQW37MX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
