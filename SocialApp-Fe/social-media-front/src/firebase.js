// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBtk1UL5f5bNgGbc70eWflg_51qllJxKNU",
    authDomain: "uniproject-2e36d.firebaseapp.com",
    projectId: "uniproject-2e36d",
    storageBucket: "uniproject-2e36d.appspot.com",
    messagingSenderId: "1070717868792",
    appId: "1:1070717868792:web:97673ccf62e6ef5f53f90d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);