import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { config } from "../../config";
import { Mulish } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaymentProvider } from "@/context/PaymentContext";

const mulish = Mulish({
  subsets: ["latin"],
});

const queryClient = new QueryClient()



export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PaymentProvider>
          <main className={mulish.className}>
            <Component {...pageProps} />
          </main>
        </PaymentProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
