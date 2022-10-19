// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChMl5_8awPbKVb5Rh_KlYn6we2t9we5D0",
  authDomain: "purple-2-f2597.firebaseapp.com",
  databaseURL: "https://purple-2-f2597-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "purple-2-f2597",
  storageBucket: "purple-2-f2597.appspot.com",
  messagingSenderId: "433287893540",
  appId: "1:433287893540:web:9c3bb71925bc6844a03eb1",
  measurementId: "G-EL9PYE93FX"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
