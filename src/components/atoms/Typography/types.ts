import { ElementType } from 'react';
import type { TypographyProps as MuiTypographyProps } from '@mui/material';

export interface TypographyProps extends MuiTypographyProps {
  t?: string;
  component?: ElementType;
}
