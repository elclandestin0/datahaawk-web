import {signInWithPopup, signOut} from 'firebase/auth';
import {auth, provider, app} from '@/utils/firebase';
import {doc, setDoc, getFirestore, getDoc, updateDoc} from "firebase/firestore";
import {useMetaMask} from "@/contexts/MetaMaskContext";

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

const linkMetaMaskToGoogleAccount = async (googleUID: string) => {
    const db = getFirestore(app);
    const userDocRef = doc(db, 'users', googleUID);
    const {linkToGoogle} = useMetaMask();

    try {
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
            console.log("No such document!");
            return;
        }

        const updatedData = await linkToGoogle();
        if (updatedData) {
            await updateDoc(userDocRef, {
                walletAddress: updatedData.account,
                signature: updatedData.signature,
                message: updatedData.message,
            });
            console.log("Document updated with MetaMask account details");
        }
    } catch (error) {
        console.error("Error updating document:", error);
    }
};

export {signIn, logOut, linkMetaMaskToGoogleAccount};
