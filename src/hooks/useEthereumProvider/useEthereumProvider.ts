import { useEffect } from 'react';
import { ethers } from 'ethers';
import { selectProvider, setProvider, ExtendedWeb3Provider } from '@/redux/features/ethereum';
import useAppSelector from '../useAppSelector';
import useAppDispatch from '../useAppDispatch';

const useEthereumProvider = (): ExtendedWeb3Provider | undefined => {
  const provider = useAppSelector(selectProvider);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.ethereum && !provider) {
      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum,
      ) as ExtendedWeb3Provider;

      // Add support for requesting accounts for convenience
      web3Provider.requestAccounts = async () => {
        return web3Provider.send('eth_requestAccounts', []);
      };

      dispatch(setProvider(web3Provider));
    }
  }, []); // eslint-disable-line

  return provider;
};

export default useEthereumProvider;
