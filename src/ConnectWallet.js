import React, { useState } from 'react';
import { Text, Button, Link } from '@chakra-ui/react';
import {
  Transaction,
  Connection,
  clusterApiUrl,
  SystemProgram,
  PublicKey,
} from '@_koi/web3.js';
import { useFinnie } from './hooks/useFinnie';

const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  const [isFinnieDetected, setIsFinnieDetected] = useState(null);
  const {
    finnieLoaded,
    connect,
    disconnect,
    getPublicKey,
    signAndSendTransaction,
  } = useFinnie();

  const handleConnect = async () => {
    try {
      const publicKey = await connect();
      if (publicKey) {
        setConnected(true);
        setIsFinnieDetected(true);
      }
    } catch (err) {
      setIsFinnieDetected(false);
      console.error(err);
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    setConnected(false);
  };

  const handleSend = async () => {
    const connection = new Connection(clusterApiUrl('devnet'));
    const blockHash = (await connection.getRecentBlockhash()).blockHash;
    const feePayer = getPublicKey();

    const transaction = new Transaction();
    transaction.recentBlockhash = blockHash;
    transaction.feePayer = feePayer;

    const recipient = 'example_address';

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: getPublicKey(),
        toPubkey: new PublicKey(recipient),
        lamports: 100000000, // 0.1 KOII
      })
    );

    const signature = await signAndSendTransaction(transaction);
  };

  return (
    <>
      {connected ? (
        <>
          <Button disabled={!connected} onClick={handleDisconnect}>
            Disconnect Finnie
          </Button>
          <Text>Address: {getPublicKey().toString()}</Text>
          <Button
            colorScheme="green"
            disabled={!connected}
            onClick={handleSend}
          >
            Send 0.1 KOII
          </Button>
        </>
      ) : !connected && isFinnieDetected === null ? (
        <Button
          colorScheme="teal"
          disabled={finnieLoaded}
          onClick={handleConnect}
        >
          {isFinnieDetected === false ? 'Get Finnie' : 'Connect Finnie'}
        </Button>
      ) : (
        <>
          <Text fontSize={'2xl'}>Finnie not detected</Text>
          <Button colorScheme="teal">
            <Link
              href={
                'https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj'
              }
              isExternal
            >
              Get Finnie
            </Link>
          </Button>
        </>
      )}
    </>
  );
};

export default ConnectWallet;
