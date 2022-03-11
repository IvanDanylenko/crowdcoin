import { FC } from 'react';
import { useField } from 'formik';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import type { SelectProps } from './types';

const SelectField: FC<SelectProps> = ({ name, choices, label, ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <FormControl fullWidth error={meta.touched && !!meta.error}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        {...field}
        {...rest}
        label={label} // it enters label in hidden fieldset
      >
        {choices?.map(choice => {
          if (typeof choice === 'string') {
            return (
              <MenuItem key={choice} value={choice}>
                {choice}
              </MenuItem>
            );
          }

          return (
            <MenuItem key={choice.value} value={choice.value}>
              {choice.label}
            </MenuItem>
          );
        })}
      </Select>
      {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
