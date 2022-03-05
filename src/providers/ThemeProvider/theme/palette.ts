import { ThemeOptions } from '@mui/material';

export const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: {
    light: '#fff6d6',
    main: '#ffc700',
    dark: '#ff9900',
    contrastText: '#ffffff',
  },
  success: {
    main: '#4bb949',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ff6666',
    contrastText: '#ffffff',
  },
  text: {
    primary: '#242a33',
    secondary: '#aaaaaa',
  },
  background: {
    default: '#eaeaea',
  },
  action: {
    active: '#242a33',
    disabled: '#aaaaaa',
    hover: '#F5F5F5',
  },
  divider: '#eaeaea',
};

export const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: {
    light: '#fff6d6',
    main: '#ffc700',
    dark: '#ff9900',
    contrastText: '#242a33',
  },
  success: {
    main: '#4bb949',
    contrastText: '#242a33',
  },
  warning: {
    main: '#ff6666',
    contrastText: '#242a33',
  },
  text: {
    primary: '#ffffff',
    secondary: '#aaaaaa',
  },
  background: {
    default: 'black',
  },
  action: {
    active: '#242a33',
    disabled: '#aaaaaa',
    hover: '#F5F5F5',
  },
  divider: '#eaeaea',
};
