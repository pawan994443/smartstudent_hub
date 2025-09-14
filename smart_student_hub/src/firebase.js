
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDWBfArFtW2ZistU7YC9C950fKJxglLIgo",
  authDomain: "smart-student-hub-7d580.firebaseapp.com",
  projectId: "smart-student-hub-7d580",
  storageBucket: "smart-student-hub-7d580.appspot.com",
  messagingSenderId: "894108233716",
  appId: "1:894108233716:web:4cc084afcd9788a3f4d3a1",
  measurementId: "G-JT6PBZQY0J",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);       
export const storage = getStorage(app);    
export const analytics = getAnalytics(app);
