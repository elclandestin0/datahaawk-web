// src/utils/firebase.ts
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBUl3y-fUMObL2feVJlAxbfnyGHkssMoD8",
    authDomain: "datahawk-32021.firebaseapp.com",
    projectId: "datahawk-32021",
    storageBucket: "datahawk-32021.appspot.com",
    messagingSenderId: "325595982350",
    appId: "1:325595982350:web:cf62f2dc180933a2bdaa5f",
    measurementId: "G-N9TJDKLCGH"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics only in a client-side context
let analytics;
let auth;
let provider;
if (typeof window !== 'undefined' && 'measurementId' in firebaseConfig) {
    analytics = getAnalytics(app);
    auth = getAuth(app);
    provider = new GoogleAuthProvider();
}

export {app, analytics, auth, provider};
