import { providers, utils } from 'ethers';
import { networks } from '@/app/constants';
import { ExtendedWeb3Provider } from './types';

let provider: ExtendedWeb3Provider | undefined;

if (typeof window !== 'undefined' && window.ethereum) {
  provider = new providers.Web3Provider(window.ethereum, 'any') as ExtendedWeb3Provider;

  // Add support for requesting accounts for convenience
  provider.requestAccounts = async () => {
    return provider?.send('eth_requestAccounts', []);
  };

  provider.addEthereumChain = async param => {
    return provider?.send('wallet_addEthereumChain', [param]);
  };

  provider.switchEthereumChain = async chainId => {
    return provider?.send('wallet_switchEthereumChain', [{ chainId }]);
  };

  provider.switchToDefaultChain = async () => {
    const network = await provider?.getNetwork();

    const defaultChainId = networks[0].chainId;

    if (network?.chainId !== defaultChainId) {
      await provider?.switchEthereumChain(utils.hexValue(defaultChainId));
    }
  };

  // Reload page on network change
  provider.on('network', (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload();
    }
  });
}

export default provider;
