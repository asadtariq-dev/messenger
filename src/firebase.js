// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlFeo06tKW9ss0fK_wBft0wOOq9Tact7U",
  authDomain: "purple-52d0c.firebaseapp.com",
  projectId: "purple-52d0c",
  storageBucket: "purple-52d0c.appspot.com",
  messagingSenderId: "434860994583",
  appId: "1:434860994583:web:20a67817e72d4a829f6c52",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
