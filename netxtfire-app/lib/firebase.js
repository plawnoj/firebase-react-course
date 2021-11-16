import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCeXAbMmZ3uZpyFIjPv_gEfFw6CFsRNNxk",
    authDomain: "nextfire-ec7de.firebaseapp.com",
    projectId: "nextfire-ec7de",
    storageBucket: "nextfire-ec7de.appspot.com",
    messagingSenderId: "342376647722",
    appId: "1:342376647722:web:420e4cbae6c165e31b0753"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();