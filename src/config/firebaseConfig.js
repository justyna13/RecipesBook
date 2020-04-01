import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCFD8HsngX2hW1sFNNlkq1p8U3Gr-qYXJA",
    authDomain: "recipesbook-95355.firebaseapp.com",
    databaseURL: "https://recipesbook-95355.firebaseio.com",
    projectId: "recipesbook-95355",
    storageBucket: "recipesbook-95355.appspot.com",
    messagingSenderId: "916876873647",
    appId: "1:916876873647:web:ee8ed1b84a5e2c6842695a"
};

firebase.initializeApp(firebaseConfig);


export default firebase;
