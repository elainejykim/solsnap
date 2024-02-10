import { Dispatch, SetStateAction } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const NetworkButton = ({
  label,
  onPress,
  active,
}: {
  label: string;
  onPress: () => void;
  active: boolean;
}) => {
  return (
    <div
      onClick={onPress}
      className={['network_button', active && 'active']
        .filter(Boolean)
        .join(' ')}
    >
      {label}
    </div>
  );
};

export const Header = ({
  network,
  setNetwork,
}: {
  network: WalletAdapterNetwork;
  setNetwork: Dispatch<SetStateAction<WalletAdapterNetwork>>;
}) => {
  const handleNetworkChange = (network: WalletAdapterNetwork) => {
    setNetwork(network);
  };

  return (
    <div className="header">
      <div className="header__networks_container">
        <NetworkButton
          label="Mainnet"
          onPress={() => handleNetworkChange(WalletAdapterNetwork.Mainnet)}
          active={network == WalletAdapterNetwork.Mainnet}
        />
        <NetworkButton
          label="Testnet"
          onPress={() => handleNetworkChange(WalletAdapterNetwork.Testnet)}
          active={network == WalletAdapterNetwork.Testnet}
        />
        <NetworkButton
          label="Devnet"
          onPress={() => handleNetworkChange(WalletAdapterNetwork.Devnet)}
          active={network == WalletAdapterNetwork.Devnet}
        />
      </div>

      <div className="navbar-end">
        <WalletMultiButton />
      </div>
    </div>
  );
};
