import { useState, useEffect } from 'react';

export const useFinnie = ({ setIsFinnieDetected }) => {
  const [finnieLoaded, setFinnieLoaded] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsFinnieDetected(true);
    };

    window.addEventListener('finnieWalletLoaded', handler);

    return () => {
      window.removeEventListener('finnieWalletLoaded', handler);
    };
  }, []);

  // Connect to Finnie
  const connect = async () => {};

  // Disconnect from Finnie
  const disconnect = async () => {};

  // Fetch user's public address
  const getPublicKey = () => {};

  // Sign and send a transaction
  const signAndSendTransaction = transaction => {};

  return {
    finnieLoaded,
    connect,
    disconnect,
    getPublicKey,
    signAndSendTransaction,
    setIsFinnieDetected,
  };
};
