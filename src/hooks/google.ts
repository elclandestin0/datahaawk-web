import {signInWithPopup, signOut} from 'firebase/auth';
import {auth, provider, app} from '@/utils/firebase';
import {doc, setDoc, getFirestore} from "firebase/firestore";

// Add a new document in collection "cities"

const signIn = async () => {
    try {
        // Attempt to sign in with Google
        const result = await signInWithPopup(auth, provider);
        // You can access the signed-in user via result.user
        console.log('Signed in user:', result.user);

        // Google has very cool naming for their databases. Lovely for development.
        const db = getFirestore(app);
        const user = result.user;

        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: user.displayName,
        }).catch(err => {
            console.log(err);
        });
        
        console.log("set a new user in the firestore.")

    } catch (error) {
        // Handle errors here, such as displaying a notification
        console.error(error);
    }
};

const logOut = async () => {
    try {
        await signOut(auth);
        // You can access the signed-in user via result.user
        console.log("Signed out user");
    } catch (error) {
        console.error(error);
    }
};

export {signIn, logOut};
