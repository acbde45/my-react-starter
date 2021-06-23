export const breakpoints = {
  s: 460,
  m: 768,
  l: 1024,
};

export const device = {
  phone: `(min-width: ${breakpoints.s}px)`,
  tablet: `(min-width: ${breakpoints.m}px)`,
  desktop: `(min-width: ${breakpoints.l}px)`,
};

export const rgba = (hex: string, alpha: number) => {
  const [r, g, b] = (hex.match(/\w\w/g) as string[]).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const px = (val: string | number) => `${val}px`;

export default {
  breakpoints,
  device,
  rgba,
  px,
};
