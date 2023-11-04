import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
import {getDatabase} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyArE3DRbfUpwfpspLhoy36SUhM5dfZaApY",
    authDomain: "healthpilotadmin.firebaseapp.com",
    projectId: "healthpilotadmin",
    storageBucket: "healthpilotadmin.appspot.com",
    messagingSenderId: "125018765256",
    appId: "1:125018765256:web:781e003f4ad0afaa86f2fd",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase();
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
