import { FC } from 'react';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslate } from '@/hooks';
import NextLink from '@atoms/internal/NextLink';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({
  t,
  children,
  variant,
  loading,
  disabled,
  startIcon,
  ...rest
}) => {
  const { t: translate } = useTranslate();
  return (
    <MuiButton
      LinkComponent={NextLink}
      variant={variant}
      disabled={loading || disabled}
      startIcon={
        loading ? (
          <CircularProgress
            sx={{ color: variant === 'contained' ? 'common.white' : 'text.secondary' }}
            size={20}
          />
        ) : (
          startIcon
        )
      }
      {...rest}
    >
      {t ? translate<string>(t) : children}
    </MuiButton>
  );
};

export default Button;
