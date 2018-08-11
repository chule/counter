import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyBOkmm4DOULm2wKReyuM0cIlITGuRt9wP8",
    authDomain: "cou-nter.firebaseapp.com",
    databaseURL: "https://cou-nter.firebaseio.com",
    projectId: "cou-nter",
    storageBucket: "cou-nter.appspot.com",
    messagingSenderId: "393777055254"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();