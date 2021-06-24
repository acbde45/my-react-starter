import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/components/App';
import GlobalStyle from '@/style/global';
import NormalizeStyle from '@/style/normalize';
import theme from '@/style/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <NormalizeStyle />
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
