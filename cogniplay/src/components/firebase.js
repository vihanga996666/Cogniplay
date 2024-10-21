// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview";


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
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Initialize the Vertex AI service
const vertexAI = getVertexAI(firebaseApp);

// Initialize the generative model with a model that supports your use case
const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });

export { db, auth, model };
