import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { ReduxProvider, I18nProvider, ThemeProvider, createEmotionCache } from '@/providers';

// Fonts
import '@fontsource/inter/variable.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps = {} } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Kickstarter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ReduxProvider>
        <I18nProvider table={pageProps.table}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </I18nProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default MyApp;
