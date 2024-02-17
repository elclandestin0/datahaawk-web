// src/pages/_app.tsx
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../app/layout'; // Adjust the import path as necessary

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}

export default MyApp;
