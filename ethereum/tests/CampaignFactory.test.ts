import ganache from 'ganache';
import { ethers, VoidSigner } from 'ethers';
import compiledFactory from '../build/CampaignFactory.json';
import compiledCampaign from '../build/Campaign.json';
import { CampaignFactoryContract } from '../contracts/Campaign';

// eslint-disable-next-line
const ganacheProvider = ganache.provider({ logging: { quiet: true } }) as any;

const provider = new ethers.providers.Web3Provider(ganacheProvider);

describe('CampaignFactory contract', () => {
  // Contract minimum contribution
  const minimumContribution = '100';

  // Getting accounts
  const owner = provider.getSigner(0);
  const manager = provider.getSigner(1);

  // Instance of campaign factory contract
  let campaignFactory: CampaignFactoryContract;
  let campaignSigner: VoidSigner;

  beforeEach(async () => {
    campaignFactory = (await new ethers.ContractFactory(
      compiledFactory.abi,
      compiledFactory.evm.bytecode,
      owner,
    ).deploy()) as CampaignFactoryContract;

    await campaignFactory.deployed();

    campaignSigner = new ethers.VoidSigner(campaignFactory.address, provider);
  });

  it('deploys a campaign contract', async () => {
    const managerAddress = await manager.getAddress();
    const transactionCount = await campaignSigner.getTransactionCount();

    const tx = await campaignFactory.createCampaign(managerAddress, minimumContribution);
    await tx.wait();

    // Calculate contract address that was deployed
    const campaignAddress = ethers.utils.getContractAddress({
      from: campaignSigner.address,
      nonce: transactionCount,
    });

    const deployedCampaignAddress = await campaignFactory.deployedCampaigns(0);
    expect(campaignAddress).toBe(deployedCampaignAddress);
  });

  it('marks a person who deployed a contract as manager', async () => {
    const managerAddress = await manager.getAddress();

    const tx = await campaignFactory.createCampaign(managerAddress, minimumContribution);
    await tx.wait();

    const campaignAddress = await campaignFactory.deployedCampaigns(0);

    const campaignContract = new ethers.Contract(campaignAddress, compiledCampaign.abi, provider);

    const campaignManagerAddress = await campaignContract.manager();

    expect(campaignManagerAddress).toBe(managerAddress);
  });

  it('stores list of deployed contract addresses', async () => {
    const managerAddress = await manager.getAddress();
    const transactionCount = await campaignSigner.getTransactionCount();

    const contractAddress1 = ethers.utils.getContractAddress({
      from: campaignSigner.address,
      nonce: transactionCount,
    });

    const contractAddress2 = ethers.utils.getContractAddress({
      from: campaignSigner.address,
      nonce: transactionCount + 1,
    });

    const tx1 = await campaignFactory.createCampaign(managerAddress, minimumContribution);
    await tx1.wait();

    const tx2 = await campaignFactory.createCampaign(managerAddress, minimumContribution);
    await tx2.wait();

    const deployedCampaigns = await campaignFactory.getDeployedCampaigns();

    expect(deployedCampaigns[0]).toBe(contractAddress1);
    expect(deployedCampaigns[1]).toBe(contractAddress2);
    expect(deployedCampaigns[2]).toBeUndefined();
  });
});
