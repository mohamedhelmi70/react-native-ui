import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import firebaseConfig from '../config/Firebase';

const {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
  messagingSenderId,
} = firebaseConfig;

if (
  apiKey !== 'null' &&
  authDomain !== 'null' &&
  databaseURL !== 'null' &&
  storageBucket !== 'null' &&
  messagingSenderId !== 'null'
) {
  firebase.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
    messagingSenderId,
  });
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;