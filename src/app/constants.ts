import { EthereumNetwork } from 'ethereum/provider';
export const unitNames = ['wei', 'kwei', 'mwei', 'gwei', 'szabo', 'finney', 'ether'];

// Application supported networks
export const networks: EthereumNetwork[] = [
  {
    // TODO: add other parameters
    chainId: 4,
    chainName: 'rinkeby',
  },
];
