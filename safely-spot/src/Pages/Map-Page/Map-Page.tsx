import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../../Components/Map-Components/Map';
import MapMenu from '../../Components/Map-Components/MapMenu';
import NewIncidentButton from '../../Components/Map-Components/NewIncidentButton';
import './Map-Page.css';

const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToCreateIncident = () => {
    navigate('/report-incident');
  };
  const goToAccount = () => {
    navigate('/account');
  };
  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="map-page-container">
      <Map />

      <MapMenu
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        goToAccount={goToAccount}
        goToSettings={goToSettings}
      />

      <NewIncidentButton onClick={goToCreateIncident} />
    </div>
  );
};

export default MapPage;
