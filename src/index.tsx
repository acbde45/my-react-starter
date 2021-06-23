import logo from '@/assets/logo.svg';
import GlobalStyle from '@/style/global';
import NormalizeStyle from '@/style/normalize';
import theme from '@/style/theme';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import ReactDOM from 'react-dom';

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;
`;

const AppContainer = styled.div`
  text-align: center;

  @media (prefers-reduced-motion: no-preference) {
    ${AppLogo} {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLink = styled.a`
  color: #61dafb;
  :visited {
    color: #61dafb;
  }
`;

const App = () => {
  return (
    <AppContainer>
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </AppLink>
      </AppHeader>
    </AppContainer>
  );
};

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
