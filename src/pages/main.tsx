import {Box, Button, Center, Text, Image, Flex} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useGoogleAuth} from '@/contexts/GoogleAuthContext';
import UnityWebGL from "@/components/UnityGame"; // Adjust the import path as necessary
import {linkMetaMaskToGoogleAccount, logOut} from "@/hooks/google";
import {useMetaMask} from "@/contexts/MetaMaskContext";
import PickAxe from '@/components/PickAxe'; // Import the MagicalButton component
import ThreeJSSceneBackground from "@/components/ThreeJSSceneBackground";
import {useUserDocument} from "@/hooks/useUserDocument";
import {useSharpshooterPass} from "@/hooks/useSharpshooterPass";

const Main: React.FC = () => {
    const {user} = useGoogleAuth();
    const {account} = useMetaMask();
    const userId = user ? user.uid : account as string;
    const {userDoc} = useUserDocument(userId);
    const router = useRouter();
    const {fetchBalance, balance} = useSharpshooterPass(account ? account as string : "")
    const {linkToGoogle, disconnectMetaMask} = useMetaMask();

    useEffect(() => {
        if (!user && !account) {
            router.push('/');
        }
        fetchBalance();
    }, [user, account, router, userDoc, fetchBalance])

    const signOut = () => {
        logOut();
        disconnectMetaMask();
        router.push('/');
    }

    const handleLinkMetaMask = async () => {
        if (user?.uid) {
            const data = await linkToGoogle();
            await linkMetaMaskToGoogleAccount(user.uid, data.account, data.signature, data.message);
        }
    };
    
    return (
        <Box h="100vh" w="100vw" bg="darkblue">
            <Flex
                direction="column" // Stack the navbar and content vertically
                justifyContent="space-between" // Space out navbar and main content
                h="full"
                w="full"
            >
                <Flex
                    as="nav"
                    justifyContent="space-between"
                    alignItems="center"
                    p={4}
                    bg="purple.800" // Giving a distinct color to the navbar for visual separation
                    color="white"
                    w="full"
                    style={{zIndex: 1}}
                >
                    <Text fontSize="4xl">DATAHAWK</Text>
                    <Flex alignItems="center">
                        {user?.photoUrl && (
                            <Image
                                borderRadius="full"
                                boxSize="40px"
                                src={user.photoURL || ''}
                                mr={2}
                                onClick={signOut}
                            />
                        )}
                        <Text mr={4}>{user?.displayName || account || 'Guest'}</Text>
                        {!account || !userDoc?.walletAddress && (
                            <Button colorScheme="teal" size="sm" onClick={handleLinkMetaMask}>
                                Link Metamask
                            </Button>)}
                        <Button colorScheme="red" size="sm" ml={2} onClick={signOut}>
                            Logout
                        </Button>
                    </Flex>
                </Flex>
                {/* Main content area */}
                <ThreeJSSceneBackground/>
                <Flex
                    flexGrow={1}
                    justifyContent="center" // Center horizontally
                    alignItems="center" // Center vertically
                >
                    <PickAxe balance={balance} />
                </Flex>
                {/* If you have a footer or additional content, you can add it here */}
            </Flex>
        </Box>
    );
}

export default Main;
