// src/components/GoogleSignIn.tsx
import {Button} from '@chakra-ui/react';
import {signIn} from '@/hooks/google'; // Adjust the import path as necessary
import {useRouter} from 'next/router';

const GoogleSignIn: React.FC = () => {
    const router = useRouter();
    const handleSignIn = async () => {
        try {
            await signIn();
            router.push('/main');
        } catch (error) {
            // Handle sign-in errors here, such as showing an error message
            console.error('Error signing in:', error);
        }
    };

    return (
        <Button colorScheme="blue" onClick={handleSignIn} size="lg">
            Sign in with Google
        </Button>
    );
};

export default GoogleSignIn;
