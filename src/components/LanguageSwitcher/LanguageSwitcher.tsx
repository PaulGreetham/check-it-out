import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Correct hook for i18n

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation(); // Destructure `i18n` from `useTranslation`

  // Function to switch the language
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language); // Call changeLanguage from i18n instance
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button color="inherit" onClick={() => changeLanguage('en')}>EN</Button>
      <Button color="inherit" onClick={() => changeLanguage('nl')}>NL</Button>
    </div>
  );
};

export default LanguageSwitcher;
