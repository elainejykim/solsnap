import { Box } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { FC } from 'react';
import QRCode from 'react-qr-code';
import { notify } from 'utils/notifications';

export const Receive: FC = () => {
  const { publicKey } = useWallet();

  const handleCopyAddress = () => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }
    navigator.clipboard.writeText(publicKey.toString());
  };

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

  return (
    <Box sx={style}>
      <div className="modal_title">RECEIVE</div>
      <div className="receive">
        <QRCode
          size={256}
          style={{
            height: 'auto',
            maxWidth: 180,
            width: 180,
            margin: 24,
          }}
          value={publicKey ? publicKey.toString() : ''}
          viewBox={`0 0 256 256`}
        />
        <div className="receive__address">
          {publicKey ? publicKey.toString() : ''}
        </div>
        <button onClick={handleCopyAddress} className="receive__copy_address">
          Copy Address
        </button>
      </div>
    </Box>
  );
};
