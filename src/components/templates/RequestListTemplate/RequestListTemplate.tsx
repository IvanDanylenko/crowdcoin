import { FC } from 'react';
import { useRouter } from 'next/router';
import { BigNumber } from 'ethers';
import { Grid, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import type { PaymentRequest } from 'ethereum/contracts/Campaign';
import { utils } from 'ethers';
import { MainLayout } from '@organisms/layouts';
import { Button } from '@atoms/buttons';
import Typography from '@atoms/Typography';

// TODO: replace with actual request data
const requests: PaymentRequest[] = [
  {
    amount: BigNumber.from('100'),
    approvalsCount: 1,
    description: 'Description 1',
    isCompleted: false,
    recipient: 'address here',
  },
  {
    amount: BigNumber.from('100'),
    approvalsCount: 1,
    description: 'Description 2',
    isCompleted: false,
    recipient: 'address here',
  },

  {
    amount: BigNumber.from('100'),
    approvalsCount: 1,
    description: 'Description 3',
    isCompleted: false,
    recipient: 'address here',
  },
];

const contributorsCount = 200;

const filterPending = (requests: PaymentRequest[]) =>
  requests.filter(({ isCompleted }) => !isCompleted);

const filterCompleted = (requests: PaymentRequest[]) =>
  requests.filter(({ isCompleted }) => isCompleted);

const RequestListTemplate: FC = () => {
  const { query } = useRouter();
  return (
    <MainLayout>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Pending requests</Typography>
        <Button href={`/campaigns/${query.id}/requests/new`}>Add request</Button>
      </Grid>
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
          {requests.map((request, index) => {
            // because we don't have id for requests, we can't modify order and just hide completed requests
            if (request.isCompleted) return;

            return (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{utils.formatEther(request.amount)}</TableCell>
                <TableCell>{request.recipient}</TableCell>
                <TableCell>
                  {request.approvalsCount} / {contributorsCount}
                </TableCell>
                <TableCell>
                  <Button>Approve</Button>
                </TableCell>
                <TableCell>
                  <Button color="secondary">Finalize</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Typography mt={2}>Found {filterPending(requests).length} requests</Typography>
      {filterCompleted(requests).length !== 0 && (
        <>
          <Typography mt={4} variant="h4">
            Completed requests
          </Typography>
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
              {requests.map((request, index) => {
                // because we don't have id for requests, we can't modify order and just hide not completed requests
                if (!request.isCompleted) return;

                return (
                  <TableRow key={index}>
                    <TableCell>{index}</TableCell>
                    <TableCell>{request.description}</TableCell>
                    <TableCell>{utils.formatEther(request.amount)}</TableCell>
                    <TableCell>{request.recipient}</TableCell>
                    <TableCell>
                      {request.approvalsCount} / {contributorsCount}
                    </TableCell>
                    <TableCell>
                      <Button>Approve</Button>
                    </TableCell>
                    <TableCell>
                      <Button color="secondary">Finalize</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Typography mt={2} mb={3}>
            Found {filterCompleted(requests).length} requests
          </Typography>
        </>
      )}
    </MainLayout>
  );
};

export default RequestListTemplate;
