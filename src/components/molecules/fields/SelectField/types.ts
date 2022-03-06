import type { ReactNode } from 'react';
import type { SelectProps as MuiSelectProps } from '@mui/material/Select';

export interface SelectProps extends MuiSelectProps {
  name: string;
  choices: (string | { label: ReactNode; value: string | number })[];
}
