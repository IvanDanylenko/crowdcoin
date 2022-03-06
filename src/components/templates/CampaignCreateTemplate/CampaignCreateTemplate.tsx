import { FC } from 'react';
import { Grid } from '@mui/material';
import { Formik, Form, FormikConfig } from 'formik';
import { object, string, InferType } from 'yup';
import { utils } from 'ethers';
import { useCampaignContract } from '@/hooks';
import { MainLayout } from '@organisms/layouts';
import { TextField, SelectField, SubmitButton } from '@molecules/fields';

const validationSchema = object({
  contribution: string().required('Required'),
  unit: string().required('Required'),
});

type Values = InferType<typeof validationSchema>;

const CampaignCreateTemplate: FC = () => {
  const { factory, provider } = useCampaignContract();

  const handleSubmit: FormikConfig<Values>['onSubmit'] = async ({ contribution, unit }) => {
    if (provider && factory) {
      try {
        const [signerAddress] = await provider.requestAccounts();
        const signer = provider.getSigner();
        // const transactionCount = await signer.getTransactionCount();

        // Calculate contract address that was deployed
        // TODO: fix campaign address, incorrect calculation
        // const campaignAddress = utils.getContractAddress({
        //   from: signerAddress,
        //   nonce: transactionCount,
        // });

        const tx = await factory
          .connect(signer)
          .createCampaign(signerAddress, utils.parseUnits(contribution, unit).toString());
        await tx.wait();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error('Metamask not detected or contract not created');
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
            <Grid item xs={5}>
              <TextField name="contribution" label="Minimum contribution" />
            </Grid>
            <Grid item xs={3}>
              <SelectField name="unit" label="Unit" choices={['ether', 'gwei', 'wei']} />
            </Grid>
          </Grid>
          <SubmitButton>Create campaign</SubmitButton>
        </Form>
      </Formik>
    </MainLayout>
  );
};

export default CampaignCreateTemplate;
