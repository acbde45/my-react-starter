import { css, Global, useTheme } from '@emotion/react';

import { Theme } from './theme';

const GlobalStyle = () => {
  const theme = useTheme() as Theme;

  const globalStyles = css`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: ${theme.fonts.sans};
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      color: ${theme.colors.text};
    }
    html,
    body,
    #root {
      width: 100%;
      height: 100%;
    }
    a {
      color: ${theme.colors.text};
      text-decoration: none;
    }
  `;

  return <Global styles={globalStyles} />;
};

export default GlobalStyle;
