// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRKmuJbQONTD56lYzqcIRGzM9TcL9ZbNo",
    authDomain: "call-of-kookmin.firebaseapp.com",
    projectId: "call-of-kookmin",
    storageBucket: "call-of-kookmin.appspot.com",
    messagingSenderId: "19202327154",
    appId: "1:19202327154:web:cd335a03489a1b703eb8eb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app) 



export const callCollectionRef = collection(db, "call");