import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useThemeContext } from '../../theme/ThemeProvider';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next'; // Import the translation hook

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { t } = useTranslation(); // Access translations

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Check-It-Out
        </Typography>
        <Button color="inherit" component={Link} to="/">
          {t('navbar.home')} {/* Translated "Home" */}
        </Button>
        <Button color="inherit" component={Link} to="/task-time-calculator">
          {t('navbar.taskTimeCalculator')} {/* Translated "Task Time Calculator" */}
        </Button>
        <Button color="inherit" component={Link} to="/map">
          {t('navbar.map')} {/* Translated "Map" */}
        </Button>
        <Button color="inherit" onClick={toggleTheme}>
          {isDarkMode ? t('navbar.lightMode') : t('navbar.darkMode')} {/* Dark/Light Mode */}
        </Button>
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
