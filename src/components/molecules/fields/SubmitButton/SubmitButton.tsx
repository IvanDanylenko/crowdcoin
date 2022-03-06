import { FC } from 'react';
import { useFormikContext } from 'formik';
import { Button } from '@atoms/buttons';

const SubmitButton: FC = props => {
  const { isSubmitting } = useFormikContext();
  return <Button type="submit" loading={isSubmitting} {...props} />;
};

export default SubmitButton;
