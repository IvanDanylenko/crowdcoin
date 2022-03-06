import { combineReducers } from '@reduxjs/toolkit';
import colorModeReducer from './features/colorMode';
import ethereumReducer from './features/ethereum';

const reducers = combineReducers({
  colorMode: colorModeReducer,
  ethereum: ethereumReducer,
});

export default reducers;
