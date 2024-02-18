// src/pages/index.tsx
import {Box, Button, Center, Text, VStack} from '@chakra-ui/react';

import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import styles from '@/pages/page.module.css';
import {useMetaMask} from "@/contexts/MetaMaskContext";
import MetaMaskConnect from "@/components/MetaMaskConnect";
import ThreeCube from '@/components/Cube';
import GoogleSignIn from "@/components/GoogleSignIn";
import {useGoogleAuth} from "@/contexts/GoogleAuthContext"; // Adjust the path as necessary

const Home: React.FC = () => {
    const router = useRouter();
    const {isConnected, account} = useMetaMask();
    const {user} = useGoogleAuth();

    useEffect(() => {
        console.log(isConnected);
        console.log(account);
        if(user) {
            router.push('/main');
        }
    }, [isConnected, account, user]);

    return (
        <Box h="100vh" bg="darkblue">
            <Center flexDirection="column" h="100%">
                <Text fontSize="6xl" color="white" textAlign="center">
                    DATAHAWK
                </Text>
                {/* Placeholder for 3D Cube */}
                <Box id="cube-container" w="300px" h="300px" my={8}>        
                    <ThreeCube/>
                </Box>
                <VStack spacing={4}>
                    <GoogleSignIn/>
                    <MetaMaskConnect/>
                </VStack>
            </Center>
        </Box>
    );
}

export default Home;