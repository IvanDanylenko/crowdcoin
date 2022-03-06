import { BigNumber } from 'ethers';
import type { RequestStruct, PaymentRequest } from './types';

export const normalizeStructRequest = (requestStruct: RequestStruct): PaymentRequest => ({
  description: requestStruct[0],
  recipient: requestStruct[1],
  amount: BigNumber.from(requestStruct[2]),
  isCompleted: requestStruct[3],
  approvalsCount: BigNumber.from(requestStruct[4]).toNumber(),
});
