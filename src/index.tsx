// import logo from '@/assets/logo.svg';
import GlobalStyle from '@/style/global';
import NormalizeStyle from '@/style/normalize';
import theme from '@/style/theme';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';

// import "./index.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="./assets/logo.svg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

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
