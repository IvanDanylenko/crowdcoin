import { FC } from 'react';
import { Stack } from '@mui/material';
import { utils } from 'ethers';
import { Formik, Form, FormikConfig } from 'formik';
import { object, string, InferType } from 'yup';
import { unitNames } from '@/app/constants';
import Typography from '@atoms/Typography';
import { TextField, SelectField, SubmitButton } from '@molecules/fields';
import { ContributeFormProps } from './types';

const validationSchema = object({
  amount: string().required('Required'),
  unit: string().required('Required'),
});

type Values = InferType<typeof validationSchema>;

const ContributeForm: FC<ContributeFormProps> = ({ campaign, provider }) => {
  const handleSubmit: FormikConfig<Values>['onSubmit'] = async ({ amount, unit }) => {
    if (campaign && provider) {
      try {
        await provider.requestAccounts();
        const signer = provider.getSigner();
        const tx = await campaign
          .connect(signer)
          .contribute({ value: utils.parseUnits(amount, unit) });
        await tx.wait();
        console.log('success');
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('Provider or campaign not defined');
    }
  };

  return (
    <>
      <Typography variant="h6" mb={2}>
        Contribute to this campaign!
      </Typography>
      <Formik
        initialValues={{ amount: '', unit: 'wei' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Stack spacing={2}>
            <TextField name="amount" label="Amount" />
            <SelectField name="unit" label="Unit" choices={unitNames} />
            <SubmitButton>Contribute!</SubmitButton>
          </Stack>
        </Form>
      </Formik>
    </>
  );
};

export default ContributeForm;
