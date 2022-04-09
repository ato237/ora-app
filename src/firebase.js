// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeUWYmevDuL-hEsSszD_bkX2cd3Yr7Iwc",
  authDomain: "orramo-app.firebaseapp.com",
  databaseURL: "https://orramo-app-default-rtdb.firebaseio.com",
  projectId: "orramo-app",
  storageBucket: "orramo-app.appspot.com",
  messagingSenderId: "694438925625",
  appId: "1:694438925625:web:59e4fd8b7a674cc4acc4e8",
  measurementId: "G-2GLSH22SQL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function siginIn(email,password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function signup(email,password) {
    return createUserWithEmailAndPassword(auth, email, password)
}
