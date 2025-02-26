'use client';

import { useAccount, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Account } from '@/components/account';
import { WalletOptions } from '@/components/wallet-options';
import { config } from '../config';

const queryClient = new QueryClient();

function ConnectWallet() {
    const { isConnected } = useAccount();
    return isConnected ? <Account /> : <WalletOptions />;
}

export default ConnectWallet;

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}