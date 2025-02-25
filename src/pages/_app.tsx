import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { config } from "../../config";
import { Providers } from "@/providers";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <Providers>
        <main className={mulish.className}>
          <Component {...pageProps} />
        </main>
      </Providers>
    </WagmiProvider>
  );
}
