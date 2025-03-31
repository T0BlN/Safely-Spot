import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/Login-Page-Components/ProtectedRoute';
import MapPage from './Pages/Map-Page/Map-Page';
import ReportIncidentPage from './Pages/Report-Incident/ReportIncidentPage';
import SettingsPage from './Pages/Settings-Page/Settings-Page';
import ForumPage from './Pages/Forum-Page/Forum-Page';
import LoginPage from './Pages/Login-Page/LoginPage';
import SignupPage from './Pages/Signup-Page/SignupPage';
import StarredPinsPage from './Pages/Starred-Pins-Page/Starred-Pins-Page';
import YourPinsPage from './Pages/Your-Pins-Page/Your-Pins-Page';
import ProfilePage from './Pages/Profile-Page/Profile-Page';

import { useDataContext } from './Context/DataContext';



const App: React.FC = () => {

  const {currentUser} = useDataContext();

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
      <Route path="/report-incident" element={<ProtectedRoute><ReportIncidentPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/incident/:incidentId" element={<ProtectedRoute><ForumPage /></ProtectedRoute>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/starred-pins" element={<ProtectedRoute><StarredPinsPage /></ProtectedRoute>}/>
      <Route path="/your-pins" element={<ProtectedRoute><YourPinsPage /></ProtectedRoute>}/>
      <Route path="/account" element={<ProtectedRoute><ProfilePage {...currentUser}/></ProtectedRoute>} />
    </Routes>
  );
};

export default App;