import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss'; // Import the SCSS file

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  // Get the current language
  const currentLanguage = i18n.language;

  // Function to toggle the language
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'nl' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Button
      color="inherit"
      onClick={toggleLanguage}
      className="language-switcher-toggle"
    >
      <span
        className={`language-switcher__lang ${
          currentLanguage === 'en' ? 'active' : ''
        }`}
      >
        EN
      </span>
      <span className="language-switcher__separator">/</span>
      <span
        className={`language-switcher__lang ${
          currentLanguage === 'nl' ? 'active' : ''
        }`}
      >
        NL
      </span>
    </Button>
  );
};

export default LanguageSwitcher;
