import { FC, useState, useEffect } from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import { MainLayout } from '@organisms/layouts';
import { useCampaignContract } from '@/hooks';
import Typography from '@atoms/Typography';
import { networks } from '@/app/constants';
import Link from '@atoms/links/Link';

const HomeTemplate: FC = () => {
  const { factory } = useCampaignContract();

  const [isLoading, setLoading] = useState(false);
  const [deployedCampaigns, setDeployedCampaigns] = useState<string[]>([]);

  useEffect(() => {
    if (factory) {
      setLoading(true);
      factory
        .getDeployedCampaigns()
        .then(setDeployedCampaigns)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [factory]);

  return (
    <MainLayout>
      <Typography variant="h4">List of campaigns</Typography>
      <Typography>Please use {networks[0].chainName} as your network</Typography>
      <Grid container spacing={2} mt={2}>
        {isLoading && !deployedCampaigns.length && (
          <Grid item>
            <Typography>Loading...</Typography>
          </Grid>
        )}
        {!isLoading && deployedCampaigns.length === 0 && (
          <Grid item>
            <Typography>No deployed campaigns found</Typography>
          </Grid>
        )}
        {deployedCampaigns.map(campaignAddress => (
          <Grid key={campaignAddress} item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography my={0.5} noWrap>
                  {campaignAddress}
                </Typography>
                <Link color="textPrimary" underline="none" href={`/campaigns/${campaignAddress}`}>
                  View
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default HomeTemplate;
