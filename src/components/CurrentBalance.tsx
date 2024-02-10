import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useEffect } from 'react';
import useUserSOLBalanceStore from 'stores/useUserSOLBalanceStore';

export const CurrentBalance: FC = () => {
  const wallet = useWallet();
  const balance = useUserSOLBalanceStore((s) => s.balance);

  return (
    <div className="balance">
      <div className="balance__title">Current Balance</div>
      <div className="balance__balance">
        {wallet.connected ? balance || 0 : '--'} SOL
      </div>
    </div>
  );
};
