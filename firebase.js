import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

//Web app's firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAJrqrj6QcxVFXu3HCUuNfQx3DLix3tBKA",
  authDomain: "lets-chatz.firebaseapp.com",
  projectId: "lets-chatz",
  storageBucket: "lets-chatz.appspot.com",
  messagingSenderId: "1054435018742",
  appId: "1:1054435018742:web:8e09009af7d6b661ce29d7",
};

let app;
//Only works if app has not been initilized before
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
