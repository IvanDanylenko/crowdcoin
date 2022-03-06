import { FC } from 'react';
import { useField } from 'formik';
import MuiTextField from '@mui/material/TextField';
import type { TextFieldProps } from './types';

const TextField: FC<TextFieldProps> = ({ name, fullWidth = true, ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <MuiTextField
      fullWidth={fullWidth}
      {...field}
      {...rest}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
};

export default TextField;
