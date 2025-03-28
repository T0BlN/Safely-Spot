// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MapPage from './Pages/Map-Page/Map-Page';
import ReportIncidentPage from './Pages/Report-Incident/ReportIncidentPage';
import SettingsPage from './Pages/Settings-Page/Settings-Page';
import ForumPage from './Pages/Forum-Page/Forum-Page';
import LoginPage from './Pages/Login-Page/LoginPage';
import SignupPage from './Pages/Signup-Page/SignupPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/report-incident" element={<ReportIncidentPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/incident/:incidentId" element={<ForumPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default App;
