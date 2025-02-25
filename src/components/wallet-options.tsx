import { useConnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';

export function WalletOptions() {
  const { connect } = useConnect();

  const metaMaskConnector = metaMask();

  return (
    <button
      onClick={() => connect({ connector: metaMaskConnector })}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Conectar MetaMask
    </button>
  );
}