import { getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBeUWYmevDuL-hEsSszD_bkX2cd3Yr7Iwc",
    authDomain: "orramo-app.firebaseapp.com",
    projectId: "orramo-app",
    storageBucket: "orramo-app.appspot.com",
    messagingSenderId: "694438925625",
    appId: "1:694438925625:web:59e4fd8b7a674cc4acc4e8",
    measurementId: "G-2GLSH22SQL",
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)