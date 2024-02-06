import { MetaMaskInpageProvider } from '@metamask/providers';

const { ethereum } = window;

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const snapId = 'npm:@drift-labs/snap-solana';

export async function connect(cb: (connected: boolean) => void) {
  let connected = false;
  try {
    const result: any = await ethereum.request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: {
          version: '2.0.3',
        },
      },
    });

    const hasError = !!result?.snaps?.[snapId]?.error;
    connected = !hasError;
  } finally {
    cb(connected);
  }
}
