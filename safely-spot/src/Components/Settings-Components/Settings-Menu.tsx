interface MapMenuProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  goToMap: () => void;
  goToReport: () => void;
}

const SettingsMenu: React.FC<MapMenuProps> = ({
  menuOpen,
  onToggleMenu,
  goToMap,
  goToReport
}) => {
  return (
    <>
      <button className="menu-toggle-button" onClick={onToggleMenu}>
        &#9776;
      </button>
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button onClick={goToMap}>Map</button>
        <button onClick={goToReport}>Report</button>
      </div>
    </>
  );
};

export default SettingsMenu;