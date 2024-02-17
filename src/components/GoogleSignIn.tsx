// src/components/GoogleSignIn.tsx
import { Button } from '@chakra-ui/react';
import { signIn } from '@/hooks/google'; // Adjust the import path as necessary

const GoogleSignIn: React.FC = () => {
    // This function wraps the signIn call to handle any UI changes pre and post sign-in
    const handleSignIn = async () => {
        try {
            await signIn();
            // Optional: Update UI state or redirect the user upon successful sign-in
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
