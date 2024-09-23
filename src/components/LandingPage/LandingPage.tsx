import React from 'react';
import './LandingPage.scss';
import TravelingImage from '../../assets/undraw_traveling_yhxq.svg';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const LandingPage: React.FC = () => {
  // Function to show the SweetAlert2 popup
  const showAlert = () => {
    Swal.fire({
      title: 'Congratulations!',
      text: 'You have claimed 50% off your next ride!',
      icon: 'success',
      confirmButtonText: 'Awesome!',
    });
  };

  return (
    <div className="landing-page">
      {/* Left Side: Content */}
      <div className="landing-page__content">
        <h1>Welcome.</h1>
        <p>
          Optimize your mode routes efficiently and save time with our advanced tools like our{' '}
          <Link to="/task-time-calculator" className="landing-page__link">calculator</Link>.
        </p>
        <p>
          Check out the cool neighbourhoods of Amsterdam with our{' '}
          <Link to="/map" className="landing-page__link">map</Link> tool.
        </p>
        <p>
          P.s. Can you find the secret discount on this page? 🙌
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
                <p className="card__back-text">Well done!! You found the secret discount!!</p>
                <p className="card__back-text">50% off your next ride</p>
                <button className="card__back-button" onClick={showAlert}>
                  Click me now
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
