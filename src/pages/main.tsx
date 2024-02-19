// src/pages/main.tsx
import {Box, Button, Center, Text, Image, Flex} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useGoogleAuth} from '@/contexts/GoogleAuthContext';
import UnityWebGL from "@/components/UnityGame"; // Adjust the import path as necessary
import {linkMetaMaskToGoogleAccount, logOut} from "@/hooks/google";
import {useMetaMask} from "@/contexts/MetaMaskContext";

const Main: React.FC = () => {
    const {user} = useGoogleAuth();
    const {account} = useMetaMask();
    const router = useRouter();

    useEffect(() => {
        if (!user && !account) {
            router.push('/');
        }
    }, [user, account, router])

    const signOut = () => {
        logOut();
        router.push('/');
    }

    const handleLinkMetaMask = async () => {
        if (user?.uid) {
            await linkMetaMaskToGoogleAccount(user.uid);
        }
    };

    return (
        <Box h="100vh" bg="darkblue">
            <Flex justifyContent="space-between" alignItems="center" p={4}>
                <Text fontSize="4xl" color="white">
                    DATAHAWK
                </Text>
                <Flex alignItems="center">
                    {user && <Image borderRadius="full" boxSize="50px" src={user.photoURL || ''}
                                    alt={user.displayName || 'User'} mr={2} onClick={signOut}/>}
                    <Text color="white">{user?.displayName}</Text>

                    <Button colorScheme="purple" size="md"
                            onClick={() => {
                                handleLinkMetaMask();
                            }}>
                        Link Metamask
                    </Button>
                </Flex>
            </Flex>
            <Center flexDirection="column" h="full">
                {/* Placeholder for WebGL/Unity component */}
                <Box id="unity-container" w="600px" h="400px" my={8}>
                    <UnityWebGL/>
                </Box>
                <Button isDisabled={true} colorScheme="purple" size="md">
                    Rootin-Shootin-Spaceboy
                </Button>
            </Center>
        </Box>
    );
}

export default Main;
