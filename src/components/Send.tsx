import { Box } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useUserSOLBalanceStore from 'stores/useUserSOLBalanceStore';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { notify } from 'utils/notifications';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 2,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const Send = ({
  setOpenSendModal,
}: {
  setOpenSendModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [insufficient, setInsufficient] = useState(false);

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const balance = useUserSOLBalanceStore((s) => s.balance);

  useEffect(() => {
    if (balance < 0.01) {
      setInsufficient(true);
    }
  }, [balance]);

  const handleSolChange = (e) => {
    const inputSol = e.target.value;
    const inputLamport = inputSol * LAMPORTS_PER_SOL;

    // convert to usd and set usd value
    // check if value is insufficient
    if (inputSol >= balance && !insufficient) {
      setInsufficient(true);
    }

    if (inputSol < balance && insufficient) {
      setInsufficient(false);
    }
  };

  const onCancel = () => {
    setOpenSendModal(false);
  };

  const onSend = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const solToSend = Number(data.get('sol'));
    const sendTo = data.get('recipient');

    if (!publicKey) {
      notify({ type: 'error', message: `Wallet not connected!` });
      console.log('error', `Send Transaction: Wallet not connected!`);
      e.target.reset();
      setOpenSendModal(false);
      return;
    }

    let signature: TransactionSignature = '';
    try {
      const destinationAddress = new PublicKey(sendTo);
      const amountInLamports = solToSend * LAMPORTS_PER_SOL;
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: destinationAddress,
          lamports: amountInLamports,
        }),
      );

      signature = await sendTransaction(tx, connection);
      console.log('Signature: ', signature);
      const latestBlockHash = await connection.getLatestBlockhash();
      console.log('Latesthash: ', latestBlockHash);
      const a = await connection.confirmTransaction(
        {
          signature,
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        },
        'confirmed',
      );

      console.log('Confirmed: ', a);
      e.target.reset();
      setOpenSendModal(false);
      notify({
        type: 'success',
        message: 'Transaction successful!',
        txid: signature,
      });
    } catch (error) {
      notify({
        type: 'error',
        message: `Transaction failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log('error', `Transaction failed! ${error?.message}`, signature);
      e.target.reset();
      setOpenSendModal(false);
      return;
    }
  };

  return (
    <Box className="send" sx={style}>
      <form onSubmit={onSend}>
        <div className="modal_title">SEND</div>
        <div className="send__amount">
          <div className="section_title">Amount</div>
          <div className="send__amount_inputs">
            <div>
              <input
                className="send__amount_input"
                onChange={handleSolChange}
                type="number"
                id="sol"
                name="sol"
                placeholder="0"
                min="0.01"
                required
              />
              <span className="send__amount_metric">SOL</span>
            </div>
            {insufficient && (
              <div style={{ color: '#ff4301', fontSize: 12, paddingTop: 4 }}>
                *Insufficient funds
              </div>
            )}
          </div>
        </div>
        <div className="send__balance">
          <div className="section_title">Balance</div>
          <div>{balance.toString()} SOL </div>
        </div>
        <div className="send__to">
          <div className="section_title">To</div>
          <input
            className="send__to_input"
            type="string"
            id="recipient"
            name="recipient"
            placeholder="Paste or input the destination address"
            required
          />
        </div>
        <div className="send__buttons">
          <button className="send_button" onClick={onCancel}>
            Cancel
          </button>
          <button disabled={insufficient} className="send_button" type="submit">
            Send
          </button>
        </div>
      </form>
    </Box>
  );
};
