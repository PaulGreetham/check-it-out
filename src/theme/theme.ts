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
      'Action-Condensed-Bold-Grade-1', // Custom brand font
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
      'Action-Condensed-Bold-Grade-1', // Custom brand font
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
  },
});
