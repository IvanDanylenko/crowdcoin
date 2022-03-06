import { useMemo } from 'react';
import { ethers } from 'ethers';
import compiledFactory from 'ethereum/build/CampaignFactory.json';
import compiledCampaign from 'ethereum/build/Campaign.json';
import type { CampaignContract, CampaignFactoryContract } from 'ethereum/contracts/Campaign';
import useEthereumProvider from '../useEthereumProvider';

const useCampaignContract = (campaignAddress?: string) => {
  const provider = useEthereumProvider();

  const factory = useMemo<CampaignFactoryContract | undefined>(() => {
    const factoryAddress = process.env.NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS;
    if (factoryAddress && provider) {
      return new ethers.Contract(
        factoryAddress,
        compiledFactory.abi,
        provider,
      ) as CampaignFactoryContract;
    }
  }, [provider]);

  const campaign = useMemo<CampaignContract | undefined>(() => {
    if (campaignAddress && provider) {
      return new ethers.Contract(
        campaignAddress,
        compiledCampaign.abi,
        provider,
      ) as CampaignContract;
    }
  }, [provider, campaignAddress]);

  return { factory, campaign, provider };
};

export default useCampaignContract;
