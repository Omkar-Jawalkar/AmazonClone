// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBp7j5Sxi5aN3R6_3gvCc4bUtKq9gZ11Cs",
  authDomain: "amazom-2.firebaseapp.com",
  projectId: "amazom-2",
  storageBucket: "amazom-2.appspot.com",
  messagingSenderId: "188217988073",
  appId: "1:188217988073:web:ea29ff28bfb4d3f959f178",
  measurementId: "G-4B8LKLSYX6",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
