import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from './theme/ThemeProvider';
import Navbar from './components/NavBar/NavBar';
import TaskTimeCalculator from './components/TaskTimeCalculator/TaskTimeCalculator';
import MapboxNeighborhoodMap from './components/MapboxNeighborhoodMap/MapboxNeighborhoodMap';
import LandingPage from './components/LandingPage/LandingPage';

const App: React.FC = () => {
  return (
    <ThemeProvider> {/* Wrap entire app with ThemeProvider */}
      <Router>
        <Navbar />  {/* Navbar uses useThemeContext */}
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/task-time-calculator" element={<TaskTimeCalculator />} />
          <Route path="/map" element={<MapboxNeighborhoodMap />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
