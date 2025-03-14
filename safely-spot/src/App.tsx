// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MapPage from './Pages/Map-Page/Map-Page.tsx';
import ReportIncidentPage from './Pages/Report-Incident/ReportIncidentPage';
import SettingsPage from './Pages/Settings-Page/Settings-Page.tsx';
import ForumPage from './Pages/Forum-Page/Forum-Page.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/report-incident" element={<ReportIncidentPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/incident/:incidentId" element={<ForumPage />} />
    </Routes>
  );
};

export default App;
