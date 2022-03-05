import { FC } from 'react';
import { Link as MuiLink } from '@mui/material';
import { useTranslate } from '@/hooks';
import NextLink from '@atoms/internal/NextLink';
import { LinkProps } from './types';

const Link: FC<LinkProps> = ({ t, children, ...rest }) => {
  const { t: translate } = useTranslate();
  return (
    <MuiLink component={NextLink} {...rest}>
      {t ? translate<string>(t) : children}
    </MuiLink>
  );
};

export default Link;
