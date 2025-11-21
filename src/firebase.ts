import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-F7vuJG63n2k4I6lq7dtX6oQHMJj94zw",
    authDomain: "madis-8e3e1.firebaseapp.com",
    projectId: "madis-8e3e1",
    storageBucket: "madis-8e3e1.firebasestorage.app",
    messagingSenderId: "756251295928",
    appId: "1:756251295928:web:477637601c3b68fba8744d",
    measurementId: "G-8XR95RF1VV"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);