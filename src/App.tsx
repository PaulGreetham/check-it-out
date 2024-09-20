import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider'; // Ensure correct path
import Navbar from './components/NavBar/NavBar';
import TaskTimeCalculator from './components/TaskTimeCalculator/TaskTimeCalculator';
import MapboxNeighborhoodMap from './components/MapboxNeighborhoodMap/MapboxNeighborhoodMap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <ThemeProvider> {/* Wrap entire app with ThemeProvider */}
      <Router>
        <Navbar />  {/* Navbar uses useThemeContext */}
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/task-time-calculator" element={<TaskTimeCalculator />} />
          <Route path="/map" element={<MapboxNeighborhoodMap />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
