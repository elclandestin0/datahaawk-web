// src/contexts/MetaMaskContext.tsx
import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import {app} from '@/utils/firebase';

interface IMetaMaskContext {
    isConnected: boolean;
    account: String | null;
    connectWallet: () => Promise<void>;
}

// Create a context with a default disconnected state and a dummy connect function
const MetaMaskContext = createContext<IMetaMaskContext>({
    isConnected: false,
    account: null,
    connectWallet: async () => {
    },
});

export const useMetaMask = () => useContext(MetaMaskContext);

export const MetaMaskProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [account, setAccount] = useState<string | null>(null); // State to store the connected account
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length > 0) {
                setIsConnected(true);
                setAccount(accounts[0]); // Set the connected account
            } else {
                setIsConnected(false);
                setAccount(null); // Reset the account when disconnected
            }
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);

            // Check if already connected on component mount
            window.ethereum.request({method: 'eth_accounts'}).then((accounts: string[]) => {
                if (accounts.length > 0) {
                    setIsConnected(true);
                    setAccount(accounts[0]);
                }
            });

            // Cleanup function to remove the event listener
            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            };
        }
    }, []);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                setIsConnected(true);
                setAccount(accounts[0]);
            } catch (error) {
                setError(error.message);
                setIsConnected(false);
                setAccount(null);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const signInWithMetaMask = async () => {
        const db = getFirestore(app);
        if (!window.ethereum) {
            setError('MetaMask is not installed');
            return;
        }

        try {
            // Request account access
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            const account = accounts[0];

            // Sign a message with the user's wallet
            const message = `Sign this message to prove you own the wallet and authenticate with our app. Timestamp: ${Date.now()}`;
            const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [message, account],
            });

            // Use account as the document ID and store the signature in Firestore
            await setDoc(doc(db, 'users', account), {
                signature: signature,
                message: message
            });

            // Set user state
            setAccount(account);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <MetaMaskContext.Provider value={{isConnected, account, connectWallet}}>
            {children}
        </MetaMaskContext.Provider>
    );
};
