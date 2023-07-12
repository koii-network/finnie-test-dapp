import React, { useState } from 'react';
import { Text, Button, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
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
  const [transactionHash, setTransactionHash] = useState(null);
  const {
    finnieLoaded,
    connect,
    disconnect,
    getPublicKey,
    signAndSendTransaction,
  } = useFinnie();

  const handleConnect = async () => {
    if (finnieLoaded) {
      try {
        const publicKey = await connect();
        if (publicKey) setConnected(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    setConnected(false);
  };

  const handleSend = async () => {
    const connection = new Connection(clusterApiUrl('devnet'));
    const blockHash = (await connection.getRecentBlockhash()).blockhash;
    const feePayer = getPublicKey();

    const transaction = new Transaction();
    transaction.recentBlockhash = blockHash;
    transaction.feePayer = feePayer;

    const recipient = '7x8tP5ipyqPfrRSXoxgGz6EzfTe3S84J3WUvJwbTwgnY';

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: getPublicKey(),
        toPubkey: new PublicKey(recipient),
        lamports: 100000000, // 0.1 KOII
      })
    );

    const signature = await signAndSendTransaction(transaction);
    setTransactionHash(signature);
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
          {transactionHash && (
            <Link
              href={`https://explorer.koii.live/tx/${transactionHash}`}
              isExternal
              color="teal.500"
            >
              View transaction details <ExternalLinkIcon mx="2px" />
            </Link>
          )}
        </>
      ) : (
        <>
          {finnieLoaded ? (
            <Button
              colorScheme="teal"
              disabled={finnieLoaded}
              onClick={handleConnect}
            >
              Connect Finnie
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
      )}
    </>
  );
};

export default ConnectWallet;
