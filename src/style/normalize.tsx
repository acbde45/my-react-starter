import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import React, { memo } from 'react';

const NormalizeStyle = memo(() => {
  const globalStyles = css`
    ${emotionNormalize}
  `;

  return <Global styles={globalStyles} />;
});

NormalizeStyle.displayName = 'NormalizeStyle';

export default NormalizeStyle;
