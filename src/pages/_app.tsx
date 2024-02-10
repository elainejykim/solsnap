import WalletContextProvider from 'contexts/WalletContextProvider';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import Notifications from '../components/Notification';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [network, setNetwork] = useState<WalletAdapterNetwork>(
    WalletAdapterNetwork.Testnet,
  );

  return (
    <>
      <Head>
        <title>Solsnap</title>
      </Head>

      <WalletContextProvider network={network}>
        <div className="content">
          <Notifications />
          <Header network={network} setNetwork={setNetwork} />
          <Component {...pageProps} />
        </div>
      </WalletContextProvider>
    </>
  );
};

export default App;
