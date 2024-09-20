import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useThemeContext } from '../../theme/ThemeProvider'; // Ensure correct path
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'; // Ensure correct path
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { t } = useTranslation(); // Destructure the `t` function for translations

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Check-It-Out
        </Typography>

        {/* Navigation Links using translations */}
        <Button color="inherit" component={Link} to="/">
          {t('navbar.home')} {/* Translated Home */}
        </Button>
        <Button color="inherit" component={Link} to="/task-time-calculator">
          {t('navbar.taskTimeCalculator')} {/* Translated Task Time Calculator */}
        </Button>
        <Button color="inherit" component={Link} to="/map">
          {t('navbar.map')} {/* Translated Map */}
        </Button>

        {/* Dark Mode Toggle Button */}
        <Button color="inherit" onClick={toggleTheme}>
          {isDarkMode ? t('navbar.lightMode') : t('navbar.darkMode')} {/* Translated Dark/Light Mode */}
        </Button>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
