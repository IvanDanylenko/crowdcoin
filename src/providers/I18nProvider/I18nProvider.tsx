import { FC } from 'react';
import { I18nProvider as RosettaProvider } from 'next-rosetta';
import { LanguageTable } from '@/i18n/types';

const I18nProvider: FC<{ table: LanguageTable }> = ({ children, table }) => {
  return <RosettaProvider table={table}>{children}</RosettaProvider>;
};

export default I18nProvider;
