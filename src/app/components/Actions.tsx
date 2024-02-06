import { useState } from 'react';
import styles from '../page.module.css';

const Send = () => {
  return <button>Send</button>;
};
const Receive = ({ pk }: { pk: string }) => {
  const copyAddressToClipboard = () => {
    if (!pk) {
      alert('Please connect your wallet first');
      return;
    }

    navigator.clipboard.writeText(pk);
  };
  return (
    <div>
      <button onClick={copyAddressToClipboard}>Receive</button>
    </div>
  );
};
export const Actions = ({ pk }: { pk: string }) => {
  return (
    <div className={styles.actions}>
      <Send />
      <Receive pk={pk} />
    </div>
  );
};
