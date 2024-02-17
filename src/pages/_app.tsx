import {ChakraProvider} from '@chakra-ui/react';
import '@/app/globals.css';

function MyApp({Component, pageProps}) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
