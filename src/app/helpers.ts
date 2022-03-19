import { utils, BigNumber } from 'ethers';
import { unitNames } from '@/app/constants';

export const autoFormatUnits = (value: string | BigNumber) => {
  const strValue = BigNumber.from(value).toString();
  const unitIndex = Math.floor((strValue.length - 1) / 3);
  if (unitNames[unitIndex]) {
    return `${utils.formatUnits(value, unitNames[unitIndex])} ${unitNames[unitIndex]}`;
  } else {
    return `${utils.formatEther(value)} ${unitNames[unitNames.length - 1]}`;
  }
};
