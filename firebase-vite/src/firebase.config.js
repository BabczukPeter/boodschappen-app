import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBwCnZXIezqBNhbAkk-SLtsh4fbNBNYcFA",
  authDomain: "boodschappen-app-61ea9.firebaseapp.com",
  projectId: "boodschappen-app-61ea9",
  storageBucket: "boodschappen-app-61ea9.firebasestorage.app",
  messagingSenderId: "1001996884417",
  appId: "1:1001996884417:web:9bbcfb64cadd454557f740"
}
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
