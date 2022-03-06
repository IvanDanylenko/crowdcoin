import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import type { Web3Provider } from '@ethersproject/providers';

export interface ExtendedWeb3Provider extends Web3Provider {
  requestAccounts: () => Promise<string[]>;
}

interface EthereumState {
  provider?: ExtendedWeb3Provider;
}

// Define the initial state using that type
const initialState: EthereumState = {};

export const ethereumSlice = createSlice({
  name: 'ethereum',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<ExtendedWeb3Provider>) => {
      state.provider = action.payload;
    },
  },
});

export const { setProvider } = ethereumSlice.actions;

export const selectProvider = (state: RootState) => state.ethereum.provider;

export default ethereumSlice.reducer;
