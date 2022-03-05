import { IconButtonProps as MuiIconButtonProps } from '@mui/material';
import { NextLinkProps } from '@atoms/internal/NextLink';

export interface IconButtonProps extends MuiIconButtonProps, Omit<NextLinkProps, 'href'> {
  href?: string;
}
