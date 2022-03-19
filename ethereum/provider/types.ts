import type { Web3Provider } from '@ethersproject/providers';

export interface EthereumNetwork {
  chainId: string | number; // A 0x-prefixed hexadecimal string
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export interface ExtendedWeb3Provider extends Web3Provider {
  requestAccounts: () => Promise<string[]>;
  addEthereumChain: (param: EthereumNetwork) => Promise<null>;
  switchEthereumChain: (chainId: string) => Promise<null>;
}
