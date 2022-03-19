import { FC, useState, useEffect } from 'react';
import { MainLayout } from '@organisms/layouts';
import { useCampaignContract } from '@/hooks';
import Typography from '@atoms/Typography';
import { Card, CardContent, Grid } from '@mui/material';
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
      <Grid container spacing={2} mt={2}>
        {isLoading && !deployedCampaigns.length && <Typography>Loading...</Typography>}
        {!isLoading && deployedCampaigns.length === 0 && (
          <Typography>No deployed campaigns found</Typography>
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
