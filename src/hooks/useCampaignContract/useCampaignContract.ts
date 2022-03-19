import { useMemo } from 'react';
import { ethers } from 'ethers';
import provider from 'ethereum/provider';
import type { CampaignContract, CampaignFactoryContract } from 'ethereum/contracts/Campaign';
import compiledFactory from 'ethereum/build/CampaignFactory.json';
import compiledCampaign from 'ethereum/build/Campaign.json';

const useCampaignContract = (campaignAddress?: string) => {
  const factory = useMemo<CampaignFactoryContract | undefined>(() => {
    const factoryAddress = process.env.NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS;
    if (factoryAddress && provider) {
      return new ethers.Contract(
        factoryAddress,
        compiledFactory.abi,
        provider,
      ) as CampaignFactoryContract;
    }
  }, []);

  const campaign = useMemo<CampaignContract | undefined>(() => {
    if (campaignAddress && provider) {
      return new ethers.Contract(
        campaignAddress,
        compiledCampaign.abi,
        provider,
      ) as CampaignContract;
    }
  }, [campaignAddress]);

  return { factory, campaign, provider };
};

export default useCampaignContract;
