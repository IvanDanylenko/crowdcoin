import type { LinkProps as MuiLinkProps } from '@mui/material';
import { NextLinkProps } from '@atoms/internal/NextLink';

export interface LinkProps extends MuiLinkProps, Omit<NextLinkProps, 'href'> {
  t?: string;
}
