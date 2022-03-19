import { FC } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import { Formik, Form, FormikConfig, getIn } from 'formik';
import { object, string, InferType } from 'yup';
import { utils } from 'ethers';
import { unitNames } from '@/app/constants';
import { useCampaignContract, useNotify } from '@/hooks';
import { MainLayout } from '@organisms/layouts';
import { TextField, SelectField, SubmitButton } from '@molecules/fields';

const validationSchema = object({
  contribution: string().required('Required'),
  unit: string().required('Required'),
});

type Values = InferType<typeof validationSchema>;

const CampaignCreateTemplate: FC = () => {
  const notify = useNotify();
  const { factory, provider } = useCampaignContract();
  const router = useRouter();

  const handleSubmit: FormikConfig<Values>['onSubmit'] = async ({ contribution, unit }) => {
    if (provider && factory) {
      try {
        const [signerAddress] = await provider.requestAccounts();
        const signer = provider.getSigner();

        const tx = await factory
          .connect(signer)
          .createCampaign(signerAddress, utils.parseUnits(contribution, unit).toString());
        await tx.wait();
        notify('Campaign was successfully created');
        router.push('/');
      } catch (err) {
        console.error(err);
        notify(getIn(err, 'error.message'), 'error');
      }
    } else {
      notify('Metamask not detected or contract not created', 'error');
    }
  };

  return (
    <MainLayout>
      <Formik
        initialValues={{ contribution: '', unit: 'wei' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Grid container mb={2} spacing={2}>
            <Grid item xs={5} sm={3}>
              <TextField name="contribution" label="Minimum contribution" />
            </Grid>
            <Grid item xs={3} sm={2}>
              <SelectField name="unit" label="Unit" choices={unitNames} />
            </Grid>
          </Grid>
          <SubmitButton>Create campaign</SubmitButton>
        </Form>
      </Formik>
    </MainLayout>
  );
};

export default CampaignCreateTemplate;
