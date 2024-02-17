import {signInWithPopup} from 'firebase/auth';
import {auth, provider} from '@/utils/firebase';

const signIn = async () => {
    try {
        // Attempt to sign in with Google
        const result = await signInWithPopup(auth, provider);
        // You can access the signed-in user via result.user
        console.log('Signed in user:', result.user);
        // Optional: Redirect the user or update UI accordingly
    } catch (error) {
        // Handle errors here, such as displaying a notification
        console.error(error);
    }
};

export {signIn};
