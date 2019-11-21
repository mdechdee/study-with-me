
import firebase from 'firebase'
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyApqmdTiLVbVmwDOZIuEZUJ4RNwwMHqp_8",
  authDomain: "study-with-me-73659.firebaseapp.com",
  databaseURL: "https://study-with-me-73659.firebaseio.com",
  projectId: "study-with-me-73659",
  storageBucket: "study-with-me-73659.appspot.com",
  messagingSenderId: "409673467115",
  appId: "1:409673467115:web:cfaaf8301b18d587382aae",
  measurementId: "G-0NPY1S9KXH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.database();
const auth = firebase.auth();
const groupsRef = db.ref("groups")
const usersRef = db.ref("users")


export {
  storage,
  firebaseConfig,
  db,
  auth,
  groupsRef,
  usersRef,
  firebase
};
