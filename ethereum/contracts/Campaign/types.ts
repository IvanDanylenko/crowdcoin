import type { Contract, Signer, PayableOverrides, ContractTransaction, BigNumber } from 'ethers';

export interface PaymentRequest {
  description: string;
  recipient: string;
  amount: BigNumber;
  isCompleted: boolean;
  approvalsCount: number;
}

export type RequestStruct = [
  // description
  string,
  // recipient
  string,
  // amount
  BigNumber,
  // isCompleted
  boolean,
  // approvalsCount
  BigNumber,
];

export interface CampaignContract extends Contract {
  // overrides
  connect(signer: Signer): CampaignContract;

  // getters
  contributors: (address: string) => Promise<boolean>;
  manager: () => Promise<string>;
  minimumContribution: () => Promise<BigNumber>;
  contributorsCount: () => Promise<BigNumber>;
  requests: (index: number) => Promise<RequestStruct>;
  requestsCount: () => Promise<BigNumber>;

  // setters
  contribute: (overrides: PayableOverrides) => Promise<ContractTransaction>;
  createRequest: (
    description: string,
    recipient: string,
    amount: BigNumber | string,
  ) => Promise<ContractTransaction>;
  approveRequest: (index: number) => Promise<ContractTransaction>;
  finalizeRequest: (index: number) => Promise<ContractTransaction>;
}

export interface CampaignFactoryContract extends Contract {
  // overrides
  connect(signer: Signer): CampaignFactoryContract;
  // methods
  deployedCampaigns: (index: number) => Promise<string>;
  getDeployedCampaigns: () => Promise<string[]>;
  createCampaign: (
    managerAddress: string,
    minimumContribution: string,
  ) => Promise<ContractTransaction>;
}
