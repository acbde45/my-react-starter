import { breakpoints, px } from '@/utils/css-utils';

const space = [0, 4, 8, 16, 32, 48, 64, 96, 128];
const spacePx = space.map(px);

const fontSizes = [12, 16, 20, 24, 36, 48, 54];
const fontSizesPx = fontSizes.map(px);
const breakpointsPx = Object.values(breakpoints).map(px);

export interface Theme {
  fonts: {
    sans: string;
  };
  space: number[];
  spacePx: string[];
  fontSizes: number[];
  fontSizesPx: string[];
  breakpoints: string[];
  boxShadow: string;
  colors: {
    primary: string;
    text: string;
    textLight: string;
  };
}

const theme: Theme = {
  fonts: {
    sans: "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, Arial, sans-serif",
  },
  space,
  spacePx,
  fontSizes,
  fontSizesPx,
  breakpoints: breakpointsPx,
  boxShadow: '0px 16px 64px rgba(26, 25, 43, 0.32);',
  colors: {
    primary: '#0041D0',
    text: '#1A192B',
    textLight: '#808080',
  },
};

export default theme;
