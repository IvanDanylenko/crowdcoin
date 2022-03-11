import { CampaignContract } from 'ethereum/contracts/Campaign';
import { ExtendedWeb3Provider } from '@/redux/features/ethereum';

export interface ContributeFormProps {
  campaign: CampaignContract;
  provider: ExtendedWeb3Provider;
}
