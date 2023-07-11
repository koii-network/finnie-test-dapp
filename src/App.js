import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import ConnectWallet from './ConnectWallet';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text fontSize={'5xl'} fontWeight={'bold'}>
              Welcome to Finnie testing dApp
            </Text>
            <ConnectWallet />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
