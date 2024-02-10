import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FC } from 'react';

export const TransactionHistory: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const getTransactions = async (publicKey, numTx) => {
    let transactionList = await connection.getSignaturesForAddress(publicKey, {
      limit: numTx,
    });
    transactionList.forEach((transaction, i) => {
      const date = new Date(transaction.blockTime * 1000);
      console.log(`Transaction No: ${i + 1}`);
      console.log(`Signature: ${transaction.signature}`);
      console.log(`Time: ${date}`);
      console.log(`Status: ${transaction.confirmationStatus}`);
      console.log('-'.repeat(20));
    });
  };
  if (publicKey) {
    getTransactions(publicKey, 10);
  }
  return <div>hihi</div>;
};
