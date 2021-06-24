import { css, Global, useTheme } from '@emotion/react';
import { Theme } from './theme';

const GlobalStyle = () => {
  const theme = useTheme() as Theme;

  const globalStyles = css`
    html,
    body {
      font-family: ${theme.fonts.sans};
      font-weight: 400;
      letter-spacing: 0.5px;
      line-height: 1.5;
      font-size: 16px;
      padding: 0;
      margin: 0;
      color: ${theme.colors.text};
    }
    a {
      color: ${theme.colors.text};
      text-decoration: none;
    }
    code,
    pre {
      font-family: ${theme.fonts.mono};
    }
  `;

  return <Global styles={globalStyles} />;
};

export default GlobalStyle;
