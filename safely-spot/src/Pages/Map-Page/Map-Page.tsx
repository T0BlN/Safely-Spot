import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../../Context/DataContext';
import Map from '../../Components/Map-Components/Map';
import MapMenu from '../../Components/Map-Components/MapMenu';
import NewIncidentButton from '../../Components/Map-Components/NewIncidentButton';
import WeatherWidget from '../../Components/Map-Components/WeatherWidget';
import './Map-Page.css';

const MapPage: React.FC = () => {
  //useState, navigation, and data context declarations
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useDataContext();

  //simple functions for navigation and rendering menu component
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const goToCreateIncident = () => {
    navigate('/report-incident');
  };
  const goToAccount = () => {
    navigate(`/account/:${currentUser?.username}`);
  };
  const goToSettings = () => {
    navigate('/settings');
  };

  //return imported components (map, map menu, weather widget, and new incident button)
  return (
    <div className="map-page-container">
      <Map />

      <MapMenu
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        goToAccount={goToAccount}
        goToSettings={goToSettings}
      />

      <WeatherWidget />

      <NewIncidentButton onClick={goToCreateIncident} />
    </div>
  );
};

export default MapPage;