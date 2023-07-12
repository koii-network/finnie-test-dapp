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
  const connect = async () => {
    if (window?.k2) {
      if (window.k2.isConnected) {
        const publicKey = window?.k2?.publicKey;
        return publicKey.toString();
      } else {
        return await window?.k2
          .connect()
          .then(pubKey => {
            setFinnieLoaded(true);
            return pubKey.toString();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
    return Promise.reject(
      'Finnie is detected but K2 features are missing - is your Finnie up to date? '
    );
  };

  // Disconnect from Finnie
  const disconnect = async () => {
    if (finnieLoaded) {
      window.k2.disconnect();
    }
  };

  // Fetch user's public address
  const getPublicKey = () => {
    if (window.k2.isConnected) return window.k2.publicKey;
    return null;
  };

  const signAndSendTransaction = transaction => {
    return window.k2.signAndSendTransaction(transaction);
  };

  return {
    finnieLoaded,
    connect,
    disconnect,
    getPublicKey,
    signAndSendTransaction,
    setIsFinnieDetected
  };
};
