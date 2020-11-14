import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyC9jYxDhn37kcTl7Ka3RKfPTcYp9N07_50',
    authDomain: 'journal-app-104d4.firebaseapp.com',
    databaseURL: 'https://journal-app-104d4.firebaseio.com',
    projectId: 'journal-app-104d4',
    storageBucket: 'journal-app-104d4.appspot.com',
    messagingSenderId: '848069845551',
    appId: '1:848069845551:web:f331229c8f7636f4eddcda',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
