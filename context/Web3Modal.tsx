// context/Web3Modal.tsx
"use client";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi';
import { baseSepolia } from 'viem/chains';

const projectId = '51ae514fa96b0e153cc780ea9acc1d08'; 

const metadata = {
  name: 'SoSH',
  description: 'Content DEV',
  url: 'https://http://sosh.world',
  icons: ['https://example.com/app-icon.png'],
};

const chains = [baseSepolia]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, enableAnalytics: true});

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
