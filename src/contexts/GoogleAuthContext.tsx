// src/contexts/GoogleAuthContext.tsx
import React, {createContext, useContext, ReactNode, useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';

interface GoogleAuthContextType {
    user: User | null;
    loading: boolean;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

interface GoogleAuthProviderProps {
    children: ReactNode;
}

export const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <GoogleAuthContext.Provider value={{user, loading}}>
            {children}
        </GoogleAuthContext.Provider>
    )
        ;
};

export const useGoogleAuth = () => {
    const context = useContext(GoogleAuthContext);
    if (context === undefined) {
        throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
    }
    return context;
};
