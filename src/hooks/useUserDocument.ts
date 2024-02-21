import { useEffect, useState } from 'react';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import {app} from "@/utils/firebase";


// Type for User Document (adjust according to your Firestore structure)
interface UserDoc {
    userId: string;
    email?: string;
    walletAddress?: string;
    // Add other fields as necessary
}

// Hook to fetch user document by userId
export const useUserDocument = (userId: string) => {
    const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!userId) {
            setIsLoading(false);
            setUserDoc(null);
            return;
        }

        const db = getFirestore(app); // Initialize Firestore using your Firebase app
        const userDocRef = doc(db, "users", userId); // Adjust "users" to your collection name

        const unsubscribe = onSnapshot(userDocRef,
            (doc) => {
                if (doc.exists()) {
                    setUserDoc(doc.data() as UserDoc);
                    setIsLoading(false);
                } else {
                    // Handle the case where the user document does not exist
                    console.log("No such document!");
                    setIsLoading(false);
                }
            },
            (error) => {
                console.error("Error fetching user document:", error);
                setError(error);
                setIsLoading(false);
            }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [userId]);

    return { userDoc, isLoading, error };
};
