import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import components from './components';
import breakpoints from './breakpoints';
import { SPACING, BORDER_RADIUS } from './constants';

// Create a theme instance
const theme = createTheme({
  palette,
  typography,
  components,
  breakpoints,
  spacing: SPACING,
  shape: {
    borderRadius: BORDER_RADIUS,
  },
});

export default theme;
