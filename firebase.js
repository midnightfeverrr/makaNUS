// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXdZlpcTfXy_HhdlD9iCtSwBdHfdY7EDg",
  authDomain: "my-first-makanus-project.firebaseapp.com",
  projectId: "my-first-makanus-project",
  storageBucket: "my-first-makanus-project.appspot.com",
  messagingSenderId: "99116732891",
  appId: "1:99116732891:web:9c14c0cd04dff81b50d7fe"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);