import type { NextPage, GetStaticProps } from 'next';
import HomeTemplate from '@templates/HomeTemplate';

const Home: NextPage = () => {
  return <HomeTemplate />;
};

export default Home;

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale || context.defaultLocale;
  const table = (await import(`@/i18n/locales/${locale}`)).default;
  return { props: { table } };
};
