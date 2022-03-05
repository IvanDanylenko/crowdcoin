import { FC } from 'react';
import MuiTypography from '@mui/material/Typography';
import { useTranslate } from '@/hooks';
import { TypographyProps } from './types';

const Typography: FC<TypographyProps> = ({ t, children, ...rest }) => {
  const { t: translate } = useTranslate();
  return <MuiTypography {...rest}>{t ? translate<string>(t) : children}</MuiTypography>;
};

export default Typography;
