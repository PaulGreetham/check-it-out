// src/theme/ThemeProvider.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create a context for the theme
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MUIThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline /> {/* Apply baseline styles */}
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
