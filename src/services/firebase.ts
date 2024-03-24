// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD4opVezvI2qfXroIKB2mhq0gvNJ0p1ctY",
	authDomain: "hci-btech.firebaseapp.com",
	projectId: "hci-btech",
	storageBucket: "hci-btech.appspot.com",
	messagingSenderId: "442027418074",
	appId: "1:442027418074:web:e228ed45a415ecfb8520e3",
	measurementId: "G-WZHNH3LN0Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
