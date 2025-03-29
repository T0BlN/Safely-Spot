// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MapPage from './Pages/Map-Page/Map-Page';
import ReportIncidentPage from './Pages/Report-Incident/ReportIncidentPage';
import SettingsPage from './Pages/Settings-Page/Settings-Page';
import ForumPage from './Pages/Forum-Page/Forum-Page';
import LoginPage from './Pages/Login-Page/LoginPage';
import SignupPage from './Pages/Signup-Page/SignupPage';
import StarredPinsPage from './Pages/Starred-Pins-Page/Starred-Pins-Page';
import YourPinsPage from './Pages/Your-Pins-Page/Your-Pins-Page';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/report-incident" element={<ReportIncidentPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/incident/:incidentId" element={<ForumPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/starred-pins" element={<StarredPinsPage />}/>
      <Route path="/your-pins" element={<YourPinsPage/>}/>
    </Routes>
  );
};

export default App;
