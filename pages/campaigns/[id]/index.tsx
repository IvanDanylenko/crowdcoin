import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import CampaignViewTemplate from '@templates/CampaignViewTemplate';

const CampaignPage: NextPage = () => {
  return <CampaignViewTemplate />;
};

export default CampaignPage;

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale || context.defaultLocale;
  const table = (await import(`@/i18n/locales/${locale}`)).default;
  return { props: { table } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};
