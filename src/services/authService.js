import firebase from '../firebase.config';

const getErrorMessage = (code) => {
  const errors = {
    'auth/email-already-in-use': 'Email al in gebruik',
    'auth/weak-password': 'Wachtwoord te zwak (min. 6 karakters)',
    'auth/user-not-found': 'Gebruiker niet gevonden',
    'auth/wrong-password': 'Verkeerd wachtwoord'
  };
  return errors[code] || 'Er ging iets mis';
};

export const registerUser = async (email, password, username) => {
  try {
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: username });
    return { success: true, user: { uid: cred.user.uid, email: cred.user.email, displayName: username } };
  } catch (error) {
    return { success: false, error: getErrorMessage(error.code) };
  }
};

export const loginUser = async (email, password) => {
  try {
    const cred = await firebase.auth().signInWithEmailAndPassword(email, password);
    return { success: true, user: { uid: cred.user.uid, email: cred.user.email, displayName: cred.user.displayName } };
  } catch (error) {
    return { success: false, error: getErrorMessage(error.code) };
  }
};

export const logoutUser = async () => {
  try {
    await firebase.auth().signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Uitloggen mislukt' };
  }
};

export const onAuthChange = (callback) => {
  return firebase.auth().onAuthStateChanged((user) => {
    callback(user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null);
  });
};
