import { Components, createTheme } from '@mui/material/styles';

import { lightPalette } from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import { SPACING } from './constants';

// Create a partial theme to use for components customization
const theme = createTheme({
  palette: lightPalette,
  typography,
  breakpoints,
  spacing: SPACING,
});

const components: Components = {
  MuiCssBaseline: {
    styleOverrides: `
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        box-shadow: 0 0 0 48px ${theme.palette.common.white} inset;
      }
      ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${theme.palette.text.secondary};
        opacity: 1; /* Firefox */
      }
      ::-ms-input-placeholder { /* Microsoft Edge */
        color: ${theme.palette.text.secondary};
      }
    `,
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      disableElevation: true,
    },
  },
};

export default components;
