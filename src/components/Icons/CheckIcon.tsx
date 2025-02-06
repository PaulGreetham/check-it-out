import React from 'react';
import { useThemeContext } from '../../theme/ThemeProvider';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => {
  const { isDarkMode } = useThemeContext();

  return (
    <svg 
      width="50" 
      height="50" 
      viewBox="0 0 24 24" 
      className={className}
      fill="none" 
      stroke={isDarkMode ? '#ffffff' : '#000000'} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};

export default CheckIcon; 