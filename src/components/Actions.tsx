import { Backdrop, Box, Modal } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { Receive } from './Receive';
import { Send } from './Send';

const ActionButton = ({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled: boolean;
}) => {
  return (
    <button disabled={disabled} className="action_button" onClick={onPress}>
      {label}
    </button>
  );
};

export const Actions = () => {
  const [openSendModal, setOpenSendModal] = useState<boolean>(false);
  const [openReceiveModal, setOpenReceiveModal] = useState<boolean>(false);
  const { publicKey, connected } = useWallet();

  return (
    <div className="actions">
      <ActionButton
        disabled={!connected}
        label="Send"
        onPress={() => setOpenSendModal(true)}
      />
      <ActionButton
        disabled={!connected}
        label="Receive"
        onPress={() => setOpenReceiveModal(true)}
      />
      <Modal
        open={openReceiveModal}
        onClose={() => setOpenReceiveModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Receive />
      </Modal>
      <Modal
        open={openSendModal}
        onClose={() => setOpenSendModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Send setOpenSendModal={setOpenSendModal} />
      </Modal>
    </div>
  );
};
