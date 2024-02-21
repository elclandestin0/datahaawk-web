import React, {useState, useEffect} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    useDisclosure,
    Text,
    Link
} from '@chakra-ui/react';
import {getFirestore, doc, getDoc, collection, query, getDocs} from 'firebase/firestore';
import {User} from 'firebase/auth'; // Ensure you import the User type for type checking

// Assuming you have a context or a hook for fetching the current user
import {useGoogleAuth} from '@/contexts/GoogleAuthContext';
import {useMetaMask} from "@/contexts/MetaMaskContext";
import {useSharpshooterPass} from "@/hooks/useSharpshooterPass"; // Adjust this path to your actual auth context or hook

interface PickAxeProps {
    balance: number;
}

const PickAxe: React.FC<PickAxeProps> = ({balance}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {account} = useMetaMask();
    const [ctaText, setCtaText] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const {user} = useGoogleAuth(); // Adjust based on your actual authentication context or hook
    const {mintNFT} = useSharpshooterPass(account ? account as string : "")
    const [proof, setProof] = useState("");

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
            if (itemsSnapshot.empty) {
                setCtaText("Go deeper!");
            } else {
                const firstItem = itemsSnapshot.docs[0];
                const firstItemData = firstItem.data();
                // Assuming 'proof' is a field on the documents in the items collection
                const itemProof = firstItemData.proof;

                if (itemProof) {
                    setProof(itemProof); // Set the proof state
                }
                if (userDoc.data()?.walletAddress) {
                    // User has items and a wallet address
                    setCtaText("Unlock Sharpshooter!");
                    setIsDisabled(false);
                } else {
                    // User has items but no wallet address
                    setCtaText("Arm yourself!");
                    setIsDisabled(false);
                }

                // if (balance > 0) {
                //     setCtaText("Lock and load!");
                //     setIsDisabled(true);
                // }
            }
        };

        if (user ? user : account) {
            checkUserItemsAndWallet(user);
        }
    }, [user, account, onOpen]);

    const handleMint = async () => {
        const tokenId = "1"; // Specify your token ID
        await mintNFT(tokenId, proof);
    };

    return (
        <>
            <Button
                colorScheme="teal" // This gives it a nice color, feel free to choose another
                size="lg" // Make the button large
                isDisabled={isDisabled}
                onClick={() => {
                    if (proof && balance < 1) {
                        onOpen();
                    } else if (ctaText == "Arm yourself!") {
                        onOpen();
                    }
                }}
                _hover={{
                    bg: "green.500", // Change the hover color for a little interaction effect
                    color: "white",
                }}
            >
                {ctaText}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
                <ModalOverlay/>
                <ModalContent backgroundColor="gray.900" color="white">
                    <ModalHeader>Install MetaMask</ModalHeader>
                    <ModalBody>
                        <Text>To interact with this feature, you need to have the MetaMask Chrome extension
                            installed.</Text>
                        <Text mt={4}>Please install MetaMask from the <Link href="https://metamask.io/download.html"
                                                                            color="teal.500" isExternal>official
                            website</Link>.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PickAxe;
