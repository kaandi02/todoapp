import firebase from "firebase/compat/app";
import "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getFirestore } from "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDylGgqSo3zaUW7C33l8axEuMZvftifgKU",
  authDomain: "react-todolist-kaandieepan.firebaseapp.com",
  projectId: "react-todolist-kaandieepan",
  storageBucket: "react-todolist-kaandieepan.appspot.com",
  messagingSenderId: "1046071180387",
  appId: "1:1046071180387:web:88e04e114c6eaa69ca0c56",
  measurementId: "G-DWLSCPME04"
});

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const db = getFirestore();

export { provider, auth, db };
