import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  white: '#fff',
  violet: '#150B40',
  gray: '#878787',
  tundora: '#4D4D4D',
  boulder: '#7d7d7d',
  forestGreen: '#2AA739',
  patternBlue: '#DFF6FF',
  cerulean: '#0C83DD',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  h6: 10,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  light: 'Raleway-Light',
  regular: 'Raleway-Regular',
  semiBold: 'Raleway-SemiBold',
  extraBold: 'Raleway-ExtraBold',
};

export default {COLORS, SIZES, FONTS};
