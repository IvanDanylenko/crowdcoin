import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

interface ColorModeState {
  mode: 'light' | 'dark';
}

// Define the initial state using that type
const initialState: ColorModeState = {
  mode: 'dark',
};

export const colorModeSlice = createSlice({
  name: 'colorMode',
  initialState,
  reducers: {
    toggleColorMode: state => {
      state.mode === 'light' ? (state.mode = 'dark') : (state.mode = 'light');
    },
  },
});

export const { toggleColorMode } = colorModeSlice.actions;

export const selectMode = (state: RootState) => state.colorMode.mode;

export default colorModeSlice.reducer;
