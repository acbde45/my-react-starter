import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { memo } from 'react';

const NormalizeStyle = memo(() => {
  const globalStyles = css`
    ${emotionNormalize}
  `;

  return <Global styles={globalStyles} />;
});

export default NormalizeStyle;
