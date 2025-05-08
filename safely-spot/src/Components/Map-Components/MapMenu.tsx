import React from 'react';
import './MapMenu.css';

//props for the menu
interface MapMenuProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  goToAccount: () => void;
  goToSettings: () => void;
}

const MapMenu: React.FC<MapMenuProps> = ({ menuOpen, onToggleMenu, goToAccount, goToSettings }) => {
  //menu with handlers for navigation
  return (
    <>
      <button className="menu-toggle-button" onClick={onToggleMenu}>
        &#9776;
      </button>
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button onClick={goToAccount}>Account</button>
        <button onClick={goToSettings}>Settings</button>
      </div>
    </>
  );
};

export default MapMenu;
