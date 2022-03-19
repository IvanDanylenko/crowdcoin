import { FC, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Grid, Card, SxProps } from '@mui/material';
import { autoFormatUnits } from '@/app/helpers';
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
  const [balance, setBalance] = useState<string>();
  const [minimumContribution, setMinimumContribution] = useState<string>();
  const [contributorsCount, setContributorsCount] = useState<string>();
  const [requestsCount, setRequestsCount] = useState<string>();

  const getCampaignData = useCallback(() => {
    if (provider && campaign) {
      provider.getBalance(campaign.address).then(data => {
        setBalance(autoFormatUnits(data));
      });
      campaign.minimumContribution().then(data => setMinimumContribution(autoFormatUnits(data)));
      campaign.contributorsCount().then(data => setContributorsCount(data.toString()));
      campaign.requestsCount().then(data => setRequestsCount(data.toString()));
    }
  }, [provider, campaign]);

  useEffect(() => {
    getCampaignData();
  }, [getCampaignData]);

  return (
    <MainLayout>
      <Grid container spacing={4} justifyContent="space-between" alignItems="center">
        <Grid item sm={8} lg={9}>
          <Typography mb={3} variant="h4">
            Campaign details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={cardSx}>
                <Typography>Balance: {balance}</Typography>
                <Typography variant="subtitle2" mt={1}>
                  Amount of money this campaign stores
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={cardSx}>
                <Typography>Minimum contribution: {minimumContribution}</Typography>
                <Typography variant="subtitle2" mt={1}>
                  Required amount to become a contributor
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={cardSx}>
                <Typography>Requests: {requestsCount}</Typography>
                <Typography variant="subtitle2" mt={1}>
                  Describe how money will be spent
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={cardSx}>
                <Typography>Contributors: {contributorsCount}</Typography>
                <Typography variant="subtitle2" mt={1}>
                  People who contributed to campaign
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Button sx={{ mt: 3 }} href={`/campaigns/${query.id}/requests`}>
            View requests
          </Button>
        </Grid>
        <Grid item sm={4} lg={3}>
          <ContributeForm campaignId={query.id as string} onSuccess={getCampaignData} />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default CampaignViewTemplate;
