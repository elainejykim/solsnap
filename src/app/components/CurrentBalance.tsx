import { useState } from 'react';
import styles from '../page.module.css';

export const CurrentBalance = () => {
  const [sol, setSol] = useState(0);
  const [usd, setUsd] = useState(0);

  return (
    <div>
      <div className={styles.sectionTitle}>Current Balance</div>
      <div className={styles.balance}>{sol} SOL</div>
      <div className={styles.subBalance}>~{usd} UDS</div>
    </div>
  );
};
