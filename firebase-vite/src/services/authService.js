import { auth } from '../firebase.config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
export async function registerUser(email, password, username){
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if(username){ await updateProfile(cred.user, { displayName: username }) }
  return cred.user
}
export function loginUser(email, password){ return signInWithEmailAndPassword(auth, email, password).then(c => c.user) }
export function logoutUser(){ return signOut(auth) }
