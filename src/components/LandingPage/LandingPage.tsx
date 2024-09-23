import React from 'react';
import './LandingPage.scss';
import TravelingImage from '../../assets/undraw_traveling_yhxq.svg';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTranslation, Trans } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Function to show the SweetAlert2 popup
  const showAlert = () => {
    Swal.fire({
      title: t('landingPage.congratulations'),
      text: t('landingPage.discountClaimed'),
      icon: 'success',
      confirmButtonText: t('landingPage.awesome'),
      background: theme.palette.background.paper,
    });
  };

  return (
    <div className="landing-page">
      {/* Left Side: Content */}
      <div className="landing-page__content">
        <h1>{t('landingPage.welcome')}</h1>
        <p>
          <Trans i18nKey="landingPage.optimizeMopeds">
            <Link to="/task-time-calculator" className="landing-page__link">
              calculator
            </Link>{' '}
            tool.
          </Trans>
        </p>
        <p>
          <Trans i18nKey="landingPage.checkOutMap">
            <Link to="/map" className="landing-page__link">
              calculator
            </Link>{' '}
            tool.
          </Trans>
        </p>
        <p>
          {t('landingPage.secretDiscount')} 🙌
        </p>
      </div>

      {/* Right Side: Flipping Card */}
      <div className="landing-page__card">
        <div className="card">
          <div className="card__inner">
            <div className="card__front">
              <img src={TravelingImage} alt="Traveling" className="card__image" />
            </div>
            <div className="card__back">
              <div className="card__back-content">
                <p className="card__back-text">{t('landingPage.wellDone')}</p>
                <p className="card__back-text">{t('landingPage.discount')}</p>
                <button className="card__back-button" onClick={showAlert}>
                  {t('landingPage.click')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
