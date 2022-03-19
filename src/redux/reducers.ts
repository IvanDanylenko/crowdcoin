import { combineReducers } from '@reduxjs/toolkit';
import colorModeReducer from './features/colorMode';
import notifyReducer from './features/notify';

const reducers = combineReducers({
  colorMode: colorModeReducer,
  notify: notifyReducer,
});

export default reducers;
