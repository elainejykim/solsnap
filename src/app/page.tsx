'use client';
import styles from './page.module.css';
import { SnapWalletAdapter } from '@drift-labs/snap-wallet-adapter';
import { useEffect, useState } from 'react';
import { CurrentBalance } from './components/CurrentBalance';
import { Transactions } from './components/Transactions';
import { Actions } from './components/Actions';

export const isFirefox = (ua: string) => ua.includes('Firefox');

const getMetaMaskExtensionInstallLink = () => {
  return isFirefox(navigator.userAgent)
    ? 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
    : 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
};

export default function Home() {
  const [pubKey, setPubKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [needsMetamask, setNeedsMetamask] = useState(false);

  const driftSnapWalletAdapter = new SnapWalletAdapter();
  useEffect(() => {
    if (driftSnapWalletAdapter.readyState == 'NotDetected') {
      setNeedsMetamask(true);
    }
  }, [driftSnapWalletAdapter.readyState]);

  const connect = async () => {
    if (driftSnapWalletAdapter.readyState == 'NotDetected') {
      const link = getMetaMaskExtensionInstallLink();
      window.location.href = link;
      return;
    }

    setIsConnecting(true);
    await driftSnapWalletAdapter.connect();
    const pk = driftSnapWalletAdapter.publicKey;
    setPubKey(pk.toString());
    setIsConnecting(false);
  };

  const Connect = (
    <>
      {needsMetamask ? (
        <div className={styles.install}>
          <button onClick={connect}>Install Metamask</button>{' '}
          <div>Metamask installation is required!</div>
        </div>
      ) : (
        <button onClick={connect} disabled={isConnecting}>
          {isConnecting ? 'connecting...' : 'connect'}
        </button>
      )}
    </>
  );

  return (
    <main className={styles.main}>
      <div className={styles.mainLeft}>
        <div>
          <h1>Solana Wallet</h1>
          {pubKey ? <div>Address - {pubKey}</div> : Connect}
        </div>
        <CurrentBalance />
        <Actions pk={pubKey} />
      </div>
      <Transactions />
    </main>
  );
}
