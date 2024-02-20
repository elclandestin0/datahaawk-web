import React, {useState, useEffect} from 'react';
import {Button} from '@chakra-ui/react';
import {getFirestore, doc, getDoc, collection, query, getDocs} from 'firebase/firestore';
import {User} from 'firebase/auth'; // Ensure you import the User type for type checking

// Assuming you have a context or a hook for fetching the current user
import {useGoogleAuth} from '@/contexts/GoogleAuthContext';
import {useMetaMask} from "@/contexts/MetaMaskContext"; // Adjust this path to your actual auth context or hook

const PickAxe: React.FC = () => {
    const {account} = useMetaMask();
    const [ctaText, setCtaText] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const {user} = useGoogleAuth(); // Adjust based on your actual authentication context or hook

    useEffect(() => {
        const userId = user ? user.uid : account as string;
        console.log(userId);
        const checkUserItemsAndWallet = async (user: any) => {
            const db = getFirestore();
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);
            const itemsCollectionRef = collection(db, `users/${userId}/items`);
            const itemsQuery = query(itemsCollectionRef);
            const itemsSnapshot = await getDocs(itemsQuery);
            console.log("here");
            if (itemsSnapshot.empty) {
                setCtaText("Go deeper!");
            } else {
                if (userDoc.data()?.walletAddress) {
                    // User has items and a wallet address
                    setCtaText("Unlock Sharpshooter!");
                    setIsDisabled(false);
                } else {
                    // User has items but no wallet address
                    setCtaText("Arm yourself!");
                    setIsDisabled(false);
                }
            }
            console.log("here 2")
        };

        if (user ? user : account) {
            checkUserItemsAndWallet(user);
        }
    }, [user, account]);

    return (
        <Button
            colorScheme="teal" // This gives it a nice color, feel free to choose another
            size="lg" // Make the button large
            isDisabled={isDisabled}
            onClick={() => { /* Define what happens on click */
            }}
            _hover={{
                bg: "green.500", // Change the hover color for a little interaction effect
                color: "white",
            }}
        >
            {ctaText}
        </Button>
    );
};

export default PickAxe;
