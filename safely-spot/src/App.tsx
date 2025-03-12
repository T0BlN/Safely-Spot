// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Map from './Pages/Map-Page/Map';
import ReportIncidentPage from './Pages/Report-Incident/ReportIncidentPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/report-incident" element={<ReportIncidentPage />} />
    </Routes>
  );
};

export default App;
