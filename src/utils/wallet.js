export async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not install');
    }

    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        const walletAddress = accounts[0];
        return walletAddress;
    }
    catch (error) {
        console.error('Error with connection to MetaMask:', error);
        throw error;
    }
}
