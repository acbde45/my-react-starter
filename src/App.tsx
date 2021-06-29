import { ThemeProvider } from '@emotion/react';
import React from 'react';

import ReactBanner from '@/components/ReactBanner';
import GlobalStyle from '@/style/global';
import NormalizeStyle from '@/style/normalize';
import theme from '@/style/theme';

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <NormalizeStyle />
      <GlobalStyle />
      <ReactBanner />
    </ThemeProvider>
  );
}
