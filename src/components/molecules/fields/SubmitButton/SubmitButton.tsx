import { FC } from 'react';
import { useFormikContext } from 'formik';
import { Button } from '@atoms/buttons';
import { SubmitButtonProps } from './types';

const SubmitButton: FC<SubmitButtonProps> = props => {
  const { isSubmitting } = useFormikContext();
  return <Button type="submit" loading={isSubmitting} {...props} />;
};

export default SubmitButton;
