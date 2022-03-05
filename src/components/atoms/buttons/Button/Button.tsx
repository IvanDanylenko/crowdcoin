import { FC } from 'react';
import MuiButton from '@mui/material/Button';
import { useTranslate } from '@/hooks';
import NextLink from '@atoms/internal/NextLink';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({ t, children, ...rest }) => {
  const { t: translate } = useTranslate();
  return (
    <MuiButton LinkComponent={NextLink} {...rest}>
      {t ? translate<string>(t) : children}
    </MuiButton>
  );
};

export default Button;
