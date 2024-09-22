// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

// Define your brand colors
const checkPurple = '#9B40FF';
const checkWhite = '#FFFFFF';
const checkBlack = '#000000';

// Create the MUI theme object with light and dark mode
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: checkPurple, // Check's brand purple
    },
    secondary: {
      main: checkWhite,
    },
    background: {
      default: checkWhite,
      paper: '#f5f5f5', // Light background for paper components
    },
    text: {
      primary: checkBlack,
    },
  },
  typography: {
    fontFamily: [
      'Bebas Neue', // Use Bebas Neue as the primary font
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ].join(','),
    // Define font weights
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    // Optionally, set font weights for each variant
    h1: { fontWeight: 900 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 400 },
    h5: { fontWeight: 300 },
    h6: { fontWeight: 100 },
    subtitle1: { fontWeight: 400 },
    subtitle2: { fontWeight: 300 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 300 },
    button: { fontWeight: 500 },
    caption: { fontWeight: 300 },
    overline: { fontWeight: 300 },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: checkPurple,
    },
    secondary: {
      main: checkWhite,
    },
    background: {
      default: checkBlack,  // Dark mode background
      paper: '#1e1e1e',     // Dark background for paper components
    },
    text: {
      primary: checkWhite,
    },
  },
  typography: {
    fontFamily: [
      'Bebas Neue', // Use Bebas Neue as the primary font
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ].join(','),
    // Define font weights
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    // Optionally, set font weights for each variant
    h1: { fontWeight: 900 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 400 },
    h5: { fontWeight: 300 },
    h6: { fontWeight: 100 },
    subtitle1: { fontWeight: 400 },
    subtitle2: { fontWeight: 300 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 300 },
    button: { fontWeight: 500 },
    caption: { fontWeight: 300 },
    overline: { fontWeight: 300 },
  },
});
