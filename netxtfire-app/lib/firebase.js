//global file for firebase variables
import firebase from 'firebase/compat/app' //importing the firebase var
import 'firebase/compat/auth'; //authentication tool
import 'firebase/compat/firestore'; //firestore
import 'firebase/compat/storage'; //storeage

//this is all the stuff that was grabbed from setting up firebase webapp 
//used to connect to firebase, all of these keys are okay to leave in source 
const firebaseConfig = { 
    apiKey: "AIzaSyCeXAbMmZ3uZpyFIjPv_gEfFw6CFsRNNxk",
    authDomain: "nextfire-ec7de.firebaseapp.com",
    projectId: "nextfire-ec7de",
    storageBucket: "nextfire-ec7de.appspot.com",
    messagingSenderId: "342376647722",
    appId: "1:342376647722:web:420e4cbae6c165e31b0753"
};
//might have to come back to this to understand what it does
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
//exporting the variables to be used globally across the project
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();