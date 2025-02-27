import { useAccount } from 'wagmi';
import { Account } from './account';
import { WalletOptions } from './wallet-options';

export function ConnectWallet() {
    const { isConnected } = useAccount();
    return isConnected ? <Account /> : <WalletOptions />;
}