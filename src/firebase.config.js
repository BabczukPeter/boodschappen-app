import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwCnZXIezqBNhbAkk-SLtsh4fbNBNYcFA",
  authDomain: "boodschappen-app-61ea9.firebaseapp.com",
  projectId: "boodschappen-app-61ea9",
  storageBucket: "boodschappen-app-61ea9.firebasestorage.app",
  messagingSenderId: "1001996884417",
  appId: "1:1001996884417:web:9bbcfb64cadd454557f740"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
