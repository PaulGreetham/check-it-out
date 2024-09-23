import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useThemeContext } from '../../theme/ThemeProvider';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/check_logo.webp';
import './NavBar.scss';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { t } = useTranslation();

  return (
    <AppBar position="static" className="navbar" elevation={0}>
      <Toolbar className="navbar__toolbar">
        <Link to="/" className="navbar__logo-link">
          <img src={Logo} alt="Check-logo" className="navbar__logo" />
        </Link>
        <Button
          color="inherit"
          component={Link}
          to="/"
          className="navbar__button" // using addiotional class to overrue MUI styling, incase you were wondering
        >
          {t('navbar.home')}
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/task-time-calculator"
          className="navbar__button"
        >
          {t('navbar.taskTimeCalculator')}
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/map"
          className="navbar__button"
        >
          {t('navbar.map')}
        </Button>
        <Button
          color="inherit"
          onClick={toggleTheme}
          className="navbar__button"
        >
          {isDarkMode ? t('navbar.lightMode') : t('navbar.darkMode')}
        </Button>
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
