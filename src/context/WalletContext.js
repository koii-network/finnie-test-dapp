import { createContext, useState, useContext } from 'react';

export const WalletContext = createContext(undefined);

export const WalletContextProvider = ({ children }) => {
  const [isFinnieDetected, setIsFinnieDetected] = useState(false);

  return (
    <WalletContext.Provider
      value={{
        isFinnieDetected,
        setIsFinnieDetected,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  return context;
};
