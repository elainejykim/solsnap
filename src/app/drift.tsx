import { SnapWalletAdapter } from '@drift-labs/snap-wallet-adapter';

const;
const driftSnapWalletAdapter = new SnapWalletAdapter();
driftSnapWalletAdapter.on('connect', handleConnect);
driftSnapWalletAdapter.on('disconnect', handleDisconnect);
driftSnapWalletAdapter.on('error', handleError);

await driftSnapWAlletAdapter.connet();
