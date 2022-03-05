import type { NextPage, GetStaticProps } from 'next';
import CampaignCreateTemplate from '@templates/CampaignCreateTemplate';

const NewCampaignPage: NextPage = () => {
  return <CampaignCreateTemplate />;
};

export default NewCampaignPage;

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale || context.defaultLocale;
  const table = (await import(`@/i18n/locales/${locale}`)).default;
  return { props: { table } };
};
