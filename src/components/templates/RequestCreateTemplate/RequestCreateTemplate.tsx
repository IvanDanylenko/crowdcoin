import { FC } from 'react';
import { useRouter } from 'next/router';
import { Grid, Stack } from '@mui/material';
import { Formik, Form, FormikConfig, getIn } from 'formik';
import { object, string, InferType } from 'yup';
import { utils } from 'ethers';
import { unitNames } from '@/app/constants';
import { useCampaignContract, useNotify } from '@/hooks';
import { MainLayout } from '@organisms/layouts';
import { TextField, SelectField, SubmitButton } from '@molecules/fields';

const validationSchema = object({
  description: string().min(5).required('Required'),
  amount: string().required('Required'),
  unit: string().required('Required'),
  recipient: string()
    .test('is address', (value = '') => utils.isAddress(value))
    .required('Required'),
});

type Values = InferType<typeof validationSchema>;

const RequestCreateTemplate: FC = () => {
  const notify = useNotify();
  const router = useRouter();
  const campaignId = router.query.id as string;
  const { campaign, provider } = useCampaignContract(campaignId);

  const handleSubmit: FormikConfig<Values>['onSubmit'] = async ({
    description,
    unit,
    amount,
    recipient,
  }) => {
    if (provider && campaign) {
      try {
        await provider.requestAccounts();
        const signer = provider.getSigner();

        const tx = await campaign
          .connect(signer)
          .createRequest(description, recipient, utils.parseUnits(amount, unit).toString());
        await tx.wait();

        notify('Request was successfully created');
        router.push(`/campaigns/${campaignId}/requests`);
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
        initialValues={{ description: '', unit: 'wei', amount: '', recipient: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Grid container mb={2} spacing={2}>
            <Grid item xs={12} sm={4}>
              <Stack spacing={2}>
                <TextField name="description" label="Description" />
                <TextField name="amount" label="Amount" />
                <SelectField name="unit" label="Unit" choices={unitNames} />
                <TextField name="recipient" label="Recipient" />
                <SubmitButton fullWidth>Create request</SubmitButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </MainLayout>
  );
};

export default RequestCreateTemplate;
