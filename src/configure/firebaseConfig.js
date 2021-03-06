import firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBXbh2vpxEaM2NQP6CXYWrwvQIVAua9U6Q",
    authDomain: "ezone-2160e.firebaseapp.com",
    databaseURL: "https://ezone-2160e.firebaseio.com",
    projectId: "ezone-2160e",
    storageBucket: "ezone-2160e.appspot.com",
    messagingSenderId: "690312575122",
    appId: "1:690312575122:web:8eac47a6a7e4439853ce4b",
    measurementId: "G-74PT04WMED"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire