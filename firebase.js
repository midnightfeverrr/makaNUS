// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9-h4zEDvcdYCSab_gNHiRyuggIxutCj4",
  authDomain: "makanus-696969.firebaseapp.com",
  projectId: "makanus-696969",
  storageBucket: "makanus-696969.appspot.com",
  messagingSenderId: "91550197694",
  appId: "1:91550197694:web:855ba8905a50a9d7677bef"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };