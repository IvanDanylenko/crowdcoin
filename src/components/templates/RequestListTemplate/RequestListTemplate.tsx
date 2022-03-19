import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getIn } from 'formik';
import { Grid, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { PaymentRequest, normalizeStructRequest } from 'ethereum/contracts/Campaign';
import { autoFormatUnits } from '@/app/helpers';
import { useCampaignContract, useNotify } from '@/hooks';
import { MainLayout } from '@organisms/layouts';
import { Button } from '@atoms/buttons';
import Typography from '@atoms/Typography';

const RequestListTemplate: FC = () => {
  const router = useRouter();
  const campaignId = router.query.id as string;

  const notify = useNotify();
  const { campaign, provider } = useCampaignContract(campaignId);

  const [contributorsCount, setContributorsCount] = useState(0);
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isApproveLoading, setApproveLoading] = useState(false);
  const [isFinalizeLoading, setFinalizeLoading] = useState(false);

  const updateRequestByIndex = async (index: number) => {
    if (campaign) {
      const request = await campaign.requests(index);
      setRequests(requests => {
        requests[index] = normalizeStructRequest(request);
        return requests;
      });
    }
  };

  const approveRequest = async (index: number) => {
    if (campaign && provider) {
      try {
        await provider.requestAccounts();
        const signer = provider.getSigner();
        const tx = await campaign.connect(signer).approveRequest(index);
        setApproveLoading(true);
        await tx.wait();
        notify(`Request ${index} was approved`);
        await updateRequestByIndex(index);
      } catch (err) {
        console.error(err);
        notify(getIn(err, 'error.message'), 'error');
      } finally {
        setApproveLoading(false);
      }
    } else {
      notify('Campaign or provider not detected', 'error');
    }
  };

  const finalizeRequest = async (index: number) => {
    if (campaign && provider) {
      try {
        await provider.requestAccounts();
        const signer = provider.getSigner();
        const tx = await campaign.connect(signer).finalizeRequest(index);
        setFinalizeLoading(true);
        await tx.wait();
        notify(`Request ${index} was finalized. Recipient received money`);
        await updateRequestByIndex(index);
      } catch (err) {
        console.error(err);
        notify(getIn(err, 'error.message'), 'error');
      } finally {
        setFinalizeLoading(false);
      }
    } else {
      notify('Campaign or provider not detected', 'error');
    }
  };

  useEffect(() => {
    if (campaign) {
      campaign.contributorsCount().then(data => setContributorsCount(data.toNumber()));
      campaign.requestsCount().then(data => {
        const requestsCount = data.toNumber();
        Promise.all(
          Array(requestsCount)
            .fill(null)
            .map(async (item, index) => {
              const request = await campaign.requests(index);
              return normalizeStructRequest(request);
            }),
        )
          .then(setRequests)
          .finally(() => setLoading(false));
      });
    }
  }, [campaign]);

  return (
    <MainLayout>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4">Requests list</Typography>
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button href={`/campaigns/${campaignId}/requests/new`}>Add request</Button>
          </Grid>
          <Grid item>
            <Button href={`/campaigns/${campaignId}`}>View campaign</Button>
          </Grid>
        </Grid>
      </Grid>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Table sx={{ mt: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount (Ether)</TableCell>
                <TableCell>Recipient</TableCell>
                <TableCell>Approval count</TableCell>
                <TableCell>Approve</TableCell>
                <TableCell>Finalize</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map(
                ({ description, amount, recipient, isCompleted, approvalsCount }, index) => {
                  return (
                    <TableRow key={index} selected={!isCompleted}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{description}</TableCell>
                      <TableCell>{autoFormatUnits(amount)}</TableCell>
                      <TableCell
                        onClick={() => {
                          window.navigator.clipboard.writeText(recipient);
                          notify('Copied to clipboard');
                        }}
                      >{`${recipient.slice(0, 2)}...${recipient.slice(-4)}`}</TableCell>
                      <TableCell>
                        {approvalsCount} / {contributorsCount}
                      </TableCell>
                      <TableCell>
                        <Button loading={isApproveLoading} onClick={() => approveRequest(index)}>
                          Approve
                        </Button>
                      </TableCell>
                      <TableCell>
                        {!isCompleted && (
                          <Button
                            color="secondary"
                            loading={isFinalizeLoading}
                            onClick={() => finalizeRequest(index)}
                          >
                            Finalize
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
          <Typography mt={2}>Found {requests.length} requests</Typography>
        </>
      )}
    </MainLayout>
  );
};

export default RequestListTemplate;
