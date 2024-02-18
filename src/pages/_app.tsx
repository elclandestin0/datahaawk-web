import {ChakraProvider} from '@chakra-ui/react';
import '@/app/globals.css';
import {GoogleAuthProvider} from "@/contexts/GoogleAuthContext";
import {MetaMaskProvider} from "@/contexts/MetaMaskContext";

function MyApp({Component, pageProps}) {
    return (
        <ChakraProvider>
            <GoogleAuthProvider>
                <MetaMaskProvider>
                    <Component {...pageProps} />
                </MetaMaskProvider>
            </GoogleAuthProvider>
        </ChakraProvider>
    );
}

export default MyApp;
