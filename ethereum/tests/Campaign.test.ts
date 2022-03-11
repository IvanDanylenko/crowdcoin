import ganache from 'ganache';
import { ethers, utils, BigNumber } from 'ethers';
import compiledCampaign from '../build/Campaign.json';
import {
  NOT_MANAGER_ERROR,
  NOT_CONTRIBUTOR_ERROR,
  REQUEST_COMPLETED_ERROR,
  REQUEST_APPROVED_ERROR,
  APPROVALS_ERROR,
  MINIMUM_CONTRIBUTION_ERROR,
  PaymentRequest,
  CampaignContract,
  normalizeStructRequest,
} from '../contracts/Campaign';

// eslint-disable-next-line
const ganacheProvider = ganache.provider({ logging: { quiet: true } }) as any;

const provider = new ethers.providers.Web3Provider(ganacheProvider);

describe('Campaign contract', () => {
  const minimumContribution = '100';
  // Getting the accounts
  const manager = provider.getSigner(0);
  const signer1 = provider.getSigner(1);
  const signer2 = provider.getSigner(2);
  const signer3 = provider.getSigner(3);

  let campaign: CampaignContract;

  beforeEach(async () => {
    const managerAddress = manager.getAddress();

    campaign = (await new ethers.ContractFactory(
      compiledCampaign.abi,
      compiledCampaign.evm.bytecode,
      manager,
    ).deploy(managerAddress, minimumContribution)) as CampaignContract;

    await campaign.deployed();
  });

  // contribute, createRequest, finalizeRequest, approveRequest,
  // manager, minimumContribution, contributors, contributorsCount, requests
  it('allows people to contribute money and marks them as contributors', async () => {
    const address1 = await signer1.getAddress();
    const address2 = await signer2.getAddress();
    const address3 = await signer3.getAddress();
    const tx1 = await campaign.connect(signer1).contribute({ value: ethers.BigNumber.from('100') });
    const tx2 = await campaign.connect(signer2).contribute({ value: ethers.BigNumber.from('150') });
    await tx1.wait();
    await tx2.wait();

    const isContributor1 = await campaign.contributors(address1);
    const isContributor2 = await campaign.contributors(address2);
    const isContributor3 = await campaign.contributors(address3);

    const contributorsCount = BigNumber.from(await campaign.contributorsCount()).toNumber();

    expect(isContributor1).toBeTruthy();
    expect(isContributor2).toBeTruthy();
    expect(isContributor3).toBeFalsy();
    expect(contributorsCount).toBe(2);
  });

  it('requires a minimum contribution', async () => {
    await expect(
      campaign.connect(signer1).contribute({ value: ethers.BigNumber.from('10') }),
    ).rejects.toThrow(MINIMUM_CONTRIBUTION_ERROR);
  });

  it('does not increase count of contributors on contribution from same contributor', async () => {
    const initialContributorsCount = BigNumber.from(await campaign.contributorsCount()).toNumber();
    expect(initialContributorsCount).toBe(0);

    const tx1 = await campaign.connect(signer1).contribute({ value: ethers.BigNumber.from('100') });
    await tx1.wait();

    const firstContributionCount = BigNumber.from(await campaign.contributorsCount()).toNumber();
    expect(firstContributionCount).toBe(1);

    const tx2 = await campaign.connect(signer1).contribute({ value: ethers.BigNumber.from('150') });
    await tx2.wait();

    const secondContributionCount = BigNumber.from(await campaign.contributorsCount()).toNumber();
    expect(secondContributionCount).toBe(1);
  });

  it('allows a manager to make a payment request', async () => {
    const recipient = await signer1.getAddress();
    const request: PaymentRequest = {
      description: 'My new request',
      recipient,
      amount: BigNumber.from('200'),
      isCompleted: false,
      approvalsCount: 0,
    };
    const tx = await campaign.createRequest(request.description, request.recipient, request.amount);
    await tx.wait();

    const receivedRequest = await campaign.requests(0);
    const normalizedRequest = normalizeStructRequest(receivedRequest);

    expect(request).toEqual(normalizedRequest);
  });

  it('requires manager to make a payment request', async () => {
    const recipient = await signer2.getAddress();
    await expect(
      campaign.connect(signer1).createRequest('name', recipient, '200'),
    ).rejects.toThrow();
  });

  it('allows a contributor to approve request', async () => {
    const recipient = await signer1.getAddress();
    const createRequestTx = await campaign.createRequest('description', recipient, '10');
    await createRequestTx.wait();

    const contributorTx = await campaign
      .connect(signer1)
      .contribute({ value: ethers.utils.parseEther('1') });
    await contributorTx.wait();

    const approveTx = await campaign.connect(signer1).approveRequest(0);
    await approveTx.wait();

    const request = await campaign.requests(0);
    const normalizedRequest = normalizeStructRequest(request);

    expect(normalizedRequest.approvalsCount).toBe(1);
  });

  it('requires contributor to approve request', async () => {
    const recipient = await signer1.getAddress();
    const createRequestTx = await campaign.createRequest('description', recipient, '10');
    await createRequestTx.wait();

    await expect(campaign.approveRequest(0)).rejects.toThrow(NOT_CONTRIBUTOR_ERROR);
  });

  it('checks that contributor cannot approve request twice', async () => {
    const recipient = await signer1.getAddress();
    const createRequestTx = await campaign.createRequest('description', recipient, '10');
    await createRequestTx.wait();

    const contributorTx = await campaign
      .connect(signer1)
      .contribute({ value: ethers.utils.parseEther('1') });
    await contributorTx.wait();

    const approveTx = await campaign.connect(signer1).approveRequest(0);
    await approveTx.wait();

    await expect(campaign.connect(signer1).approveRequest(0)).rejects.toThrow(
      REQUEST_APPROVED_ERROR,
    );
  });

  it('allows a manager to finalize request', async () => {
    const recipient = await signer1.getAddress();

    const createRequestTx = await campaign.createRequest(
      'description',
      recipient,
      BigNumber.from('100'),
    );
    await createRequestTx.wait();

    const contributorTx = await campaign
      .connect(signer2)
      .contribute({ value: BigNumber.from('200') });
    await contributorTx.wait();

    const approveTx = await campaign.connect(signer2).approveRequest(0);
    await approveTx.wait();

    await expect(campaign.finalizeRequest(0)).resolves.not.toThrow();
  });

  it('sends money to recipient', async () => {
    const recipient = await signer1.getAddress();
    const recipientInitialBalance = await signer1.getBalance();
    const sendAmount = utils.parseEther('1');

    const createRequestTx = await campaign.createRequest('description', recipient, sendAmount);
    await createRequestTx.wait();

    const contributorTx = await campaign
      .connect(signer2)
      .contribute({ value: utils.parseEther('2') });
    await contributorTx.wait();

    const approveTx = await campaign.connect(signer2).approveRequest(0);
    await approveTx.wait();

    const finalizeTx = await campaign.finalizeRequest(0);
    await finalizeTx.wait();

    const recipientFinalBalance = await signer1.getBalance();

    const difference = recipientFinalBalance.sub(recipientInitialBalance);

    expect(utils.formatEther(difference)).toBe(utils.formatEther(sendAmount));
  });

  it('requires manager to finalize request', async () => {
    await expect(campaign.connect(signer1).finalizeRequest(0)).rejects.toThrow(NOT_MANAGER_ERROR);
  });

  it('requires 51% of approvals to finalize request', async () => {
    const recipient = await signer1.getAddress();
    const sendAmount = BigNumber.from('1000');

    const contributor1Tx = await campaign
      .connect(signer1)
      .contribute({ value: BigNumber.from('1000') });
    await contributor1Tx.wait();

    const contributor2Tx = await campaign
      .connect(signer2)
      .contribute({ value: BigNumber.from('1000') });
    await contributor2Tx.wait();

    const contributor3Tx = await campaign
      .connect(signer3)
      .contribute({ value: BigNumber.from('1000') });
    await contributor3Tx.wait();

    const createRequestTx = await campaign.createRequest('description', recipient, sendAmount);
    await createRequestTx.wait();

    await expect(campaign.finalizeRequest(0)).rejects.toThrow(APPROVALS_ERROR);

    const approve1Tx = await campaign.connect(signer1).approveRequest(0);
    await approve1Tx.wait();

    await expect(campaign.finalizeRequest(0)).rejects.toThrow(APPROVALS_ERROR);

    const approve2Tx = await campaign.connect(signer2).approveRequest(0);
    await approve2Tx.wait();

    await expect(campaign.finalizeRequest(0)).resolves.not.toThrow();
  });

  it('checks that manager cannot finalize request twice', async () => {
    const recipient = await signer1.getAddress();

    const createRequestTx = await campaign.createRequest(
      'description',
      recipient,
      BigNumber.from('100'),
    );
    await createRequestTx.wait();

    const contributorTx = await campaign
      .connect(signer2)
      .contribute({ value: BigNumber.from('200') });
    await contributorTx.wait();

    const approveTx = await campaign.connect(signer2).approveRequest(0);
    await approveTx.wait();

    const finalizeTx = await campaign.finalizeRequest(0);
    await finalizeTx.wait();

    await expect(campaign.finalizeRequest(0)).rejects.toThrow(REQUEST_COMPLETED_ERROR);
  });
});
