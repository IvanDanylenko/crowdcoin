import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertProps } from '@mui/material/Alert';
import type { RootState } from '@/redux/store';

export interface NotifyState {
  message: string;
  isOpen: boolean;
  severity: AlertProps['severity'];
}

const initialState: NotifyState = {
  message: '',
  severity: 'success',
  isOpen: false,
};

export const notifySlice = createSlice({
  name: 'ethereum',
  initialState,
  reducers: {
    openNotify: (state, action: PayloadAction<Pick<NotifyState, 'message' | 'severity'>>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.isOpen = true;
    },
    closeNotify: state => {
      state.isOpen = false;
    },
  },
});

export const { openNotify, closeNotify } = notifySlice.actions;

export const selectNotify = (state: RootState) => state.notify;

export default notifySlice.reducer;
