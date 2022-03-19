import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { utils, BigNumber } from 'ethers';
import { Grid, Card, SxProps } from '@mui/material';
import { unitNames } from '@/app/constants';
import { useCampaignContract } from '@/hooks';
import { MainLayout } from '@organisms/layouts';
import ContributeForm from '@organisms/forms/ContributeForm';
import { Button } from '@atoms/buttons';
import Typography from '@atoms/Typography';

const cardSx: SxProps = {
  px: 4,
  py: 3,
};

const CampaignViewTemplate: FC = () => {
  const { query } = useRouter();
  const { campaign, provider } = useCampaignContract(query.id as string);
  const [minimumContribution, setMinimumContribution] = useState<string>();
  const [contributorsCount, setContributorsCount] = useState<string>();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    if (campaign && provider) {
      // TODO: improve
      const autoFormatUnits = (value: string | BigNumber) => {
        const strValue = BigNumber.from(value).toString();
        const unitIndex = Math.floor((strValue.length - 1) / 3);
        if (unitNames[unitIndex]) {
          return `${utils.formatUnits(value, unitNames[unitIndex])} ${unitNames[unitIndex]}`;
        } else {
          return `${utils.formatEther(value)} ${unitNames[unitNames.length - 1]}`;
        }
      };
      campaign.minimumContribution().then(data => setMinimumContribution(autoFormatUnits(data)));
      campaign.contributorsCount().then(data => setContributorsCount(data.toString()));
      provider.getBalance(campaign.address).then(data => {
        setBalance(autoFormatUnits(data));
      });
    }
  }, [campaign, provider]);

  return (
    <MainLayout>
      <Grid container spacing={4} justifyContent="space-between" alignItems="center">
        <Grid item sm={7} lg={9}>
          <Typography mb={3} variant="h4">
            Campaign details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={cardSx}>
                <Typography>Balance: {balance}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={cardSx}>
                <Typography>Minimum contribution: {minimumContribution}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={cardSx}>
                <Typography>Requests: NAN</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={cardSx}>
                <Typography>Contributors: {contributorsCount}</Typography>
              </Card>
            </Grid>
          </Grid>
          <Button sx={{ mt: 3 }} href={`/campaigns/${query.id}/requests`}>
            View requests
          </Button>
        </Grid>
        <Grid item sm={5} lg={3}>
          {campaign && provider && <ContributeForm campaign={campaign} provider={provider} />}
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default CampaignViewTemplate;
