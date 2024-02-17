// src/pages/index.tsx
import {Box, Button, Center, Text, VStack} from '@chakra-ui/react';

import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import styles from '@/pages/page.module.css';
import {useMetaMask} from "@/contexts/MetaMaskContext";
import MetaMaskConnect from "@/components/MetaMaskConnect";
import ThreeCube from '@/components/Cube'; // Adjust the path as necessary

const Home: React.FC = () => {
    const router = useRouter();
    const {isConnected, account} = useMetaMask();

    useEffect(() => {
        console.log(isConnected);
        console.log(account);
    }, [isConnected, account]);

    // if (!isConnected) {
    //     return (
    //         <Flex
    //             className={styles.main}
    //             height="100vh"
    //             alignItems="center"
    //             justifyContent="center"
    //             direction="column"
    //             p={4}
    //         >
    //             <Heading as='h1' size='4xl' noOfLines={1} mb={10}>
    //                 <Flex>
    //                     <img src="/unidawg.png" alt="Logo" style={{width: '200px'}}/>
    //                 </Flex>
    //             </Heading>
    //             <MetaMaskConnect/>
    //         </Flex>
    //     );
    // }

    return (
        <Box h="100vh" bg="darkblue">
            <Center flexDirection="column" h="100%">
                <Text fontSize="6xl" color="white" textAlign="center">
                    DATAHAWK
                </Text>
                {/* Placeholder for 3D Cube */}
                <Box id="cube-container" w="300px" h="300px" my={8}>
                    <ThreeCube />
                </Box>
                <VStack spacing={4}>
                    <Button colorScheme="teal" onClick={() => console.log('Login with Google')}>
                        Log-in with Google
                    </Button>
                    <Button colorScheme="orange" onClick={() => console.log('Connect with Metamask')}>
                        Connect with Metamask
                    </Button>
                </VStack>
            </Center>
        </Box>
    );
}

export default Home;