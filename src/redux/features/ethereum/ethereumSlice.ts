import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

export interface EthereumState {}

const initialState: EthereumState = {};

export const ethereumSlice = createSlice({
  name: 'ethereum',
  initialState,
  reducers: {
    // setProvider: (state, action: PayloadAction<ExtendedWeb3Provider>) => {
    //   state.provider = action.payload;
    // },
  },
});

// export const { setProvider } = ethereumSlice.actions;

export const selectProvider = (state: RootState) => state.ethereum.provider;

export default ethereumSlice.reducer;
