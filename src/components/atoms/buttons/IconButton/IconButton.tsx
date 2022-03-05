import { FC } from 'react';
import { IconButton as MuiIconButton } from '@mui/material';
import NextLink from '@atoms/internal/NextLink';
import { IconButtonProps } from './types';

const IconButton: FC<IconButtonProps> = props => {
  return <MuiIconButton LinkComponent={NextLink} {...props} />;
};

export default IconButton;
