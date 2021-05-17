import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD4CsdwiacJ299fX-OA2N6dYU8RQqVRLQw",
    authDomain: "whatsapp-clone-cd033.firebaseapp.com",
    projectId: "whatsapp-clone-cd033",
    storageBucket: "whatsapp-clone-cd033.appspot.com",
    messagingSenderId: "24560149462",
    appId: "1:24560149462:web:aff074d6e6e13baab1ba77"
};

export const fire = firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);