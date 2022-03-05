import { FC, useMemo } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { useAppSelector } from '@/hooks';
import { selectMode } from '@/redux/features/colorMode';
import originalTheme from './theme';
import { lightPalette, darkPalette } from './theme/palette';

const ThemeProvider: FC = ({ children }) => {
  const mode = useAppSelector(selectMode);
  const theme = useMemo(
    () => createTheme({ ...originalTheme, palette: mode === 'light' ? lightPalette : darkPalette }),
    [mode],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
