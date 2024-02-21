import {useCallback, useState} from 'react';
import {ethers} from 'ethers';
import {useContract} from './useContract';
import SharpshooterPassABI from '@/utils/abis/SharpshooterPass.json'; // Adjust the path as necessary
import {contractAddresses} from '@/utils/contractAddresses'; // Assuming this includes your SharpshooterPass contract address

export const useSharpshooterPass = (account: string) => {
    const [balance, setBalance] = useState<number | null>(null);
    const contractAddress = contractAddresses.sharpshooterPass;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); // Ensure you're connected to a wallet

    // Get the contract instance with a signer for minting
    const sharpshooterPassContract = useContract(contractAddress, SharpshooterPassABI.abi   , signer);

    // Fetch balance function
    const fetchBalance = useCallback(async () => {
        if (sharpshooterPassContract && account) {
            try {
                const tokenId = "1"; // Example token ID, adjust as necessary
                const balanceOf = await sharpshooterPassContract.balanceOf(account, tokenId);
                setBalance(balanceOf.toNumber());
            } catch (error) {
                console.error("Failed to fetch balance:", error);
                setBalance(null);
            }
        }
    }, [sharpshooterPassContract, account]);

    // Function to mint an NFT
    const mintNFT = useCallback(async (tokenId: string, proof: string) => {
        if (sharpshooterPassContract) {
            try {
                const tx = await sharpshooterPassContract.mintNFT(tokenId, proof);
                await tx.wait();
                console.log("NFT minted successfully");
                fetchBalance(); // Optionally refresh balance after minting
            } catch (error) {
                console.error("Failed to mint NFT:", error);
            }
        }
    }, [sharpshooterPassContract, fetchBalance]);

    return {balance, fetchBalance, mintNFT};
};
