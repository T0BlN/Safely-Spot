import './Settings-Page.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsButton from '../../Components/Settings-Components/Settings-Button.tsx'
import SettingsMenu from '../../Components/Settings-Components/Settings-Menu.tsx';

function SettingsPage() {
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

    const goToMap = () => {
        navigate('/');
    }

    const goToLogIn = () => {
        navigate('/login');
    }

    const goToStarredPins = () => {
        navigate('/starred-pins');
    }

    return (
        <div className="settings-page">
            <div className="settings-card">
                <div className="settings-header">
                    <h1 className="settings-title">Settings</h1>
                    <p className="settings-subtitle">Manage your account preferences</p>
                </div>
                
                <div className="settings-menu-container">
                    <SettingsMenu 
                        onToggleMenu={toggleMenu} 
                        goToMap={goToMap} 
                        goToReport={goToCreateIncident} 
                        menuOpen={menuOpen}
                    />
                </div>
                
                <div className="settings-buttons">
                    <SettingsButton text="Profile" onClick={goToAccount} />
                    <SettingsButton text="Use Your Location?" onClick={() => console.log("Using Your Location")} />
                    <SettingsButton text="Your Starred Pins" onClick={goToStarredPins} />
                    <SettingsButton text="Log In/Out" onClick={goToLogIn} />
                </div>
            </div>
        </div>
    )
}


export default SettingsPage;