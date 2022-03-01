import { ThemeOptions, createTheme } from '@mui/material/styles';
import breakpoints from './breakpoints';

// Partial theme to use custom breakpoints
const theme = createTheme({ breakpoints });

const typography: ThemeOptions['typography'] = {
  fontFamily: "'InterVariable', sans-serif",
  h1: {
    fontSize: theme.typography.pxToRem(44),
    fontWeight: 700,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(50),
    },
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(64),
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: theme.typography.pxToRem(96),
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: theme.typography.pxToRem(126),
    },
  },
  h2: {
    fontSize: theme.typography.pxToRem(44),
    fontWeight: 800,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(52),
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: theme.typography.pxToRem(64),
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: theme.typography.pxToRem(72),
    },
  },
  h3: {
    fontSize: theme.typography.pxToRem(26),
    fontWeight: 800,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: theme.typography.pxToRem(40),
    },
  },
  h4: {
    fontSize: theme.typography.pxToRem(28),
    fontWeight: 800,
  },
  h5: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 800,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(28),
    },
  },
  h6: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
  },
  body1: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  body2: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  subtitle1: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    /**
     * Some Mui components connected to different typography variants
     * and overriding them is not working properly on breakpoints.
     * Hence it's required to explicitly state correct font size
     */
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  subtitle2: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  button: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
  },
  overline: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 700,
  },
  caption: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
};

export default typography;
