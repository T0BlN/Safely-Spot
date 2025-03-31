import './Profile-Page.css';
import { useState } from 'react';
import SettingsMenu from '../../Components/Settings-Components/Settings-Menu.tsx';
import {Pin} from '../../Context/types.ts';
import { useNavigate } from 'react-router-dom';


type ProfileProps = {
  username?: string | undefined;
  bio?: string | undefined;
  pins?: Pin[] | undefined;
  starredPins?: Pin[] | undefined;

}

const ProfilePage = (props: ProfileProps) => {
    const navigate = useNavigate();

    const goToMap = () => {
        navigate('/');
    }

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    };

    const goToCreateIncident = () => {
        navigate('/report-incident');
    };
    
    // const goToAccount = () => {
    //     navigate('/account');
    // };

    // const goToLogIn = () => {
    //     navigate('/login');
    // }

    // const goToStarredPins = () => {
    //     navigate('/starred-pins');
    //}

    return (
        <div className="profile-container">
            <div className="settings-menu-container">
                    <SettingsMenu 
                        onToggleMenu={toggleMenu} 
                        goToMap={goToMap} 
                        goToReport={goToCreateIncident} 
                        menuOpen={menuOpen}
                    />
                </div>
        <header className="profile-header">
            <div className="profile-info">
            <h1 className="profile-name">{props.username}</h1>
            </div>
        </header>

        <main className="profile-content">
            <section className="profile-section">
            <h3 className="section-title">About Me</h3>
            <p className="profile-bio">{props.bio}</p>
            </section>


            <section className="profile-section">

            </section>
        </main>
        </div>
    );
};

export default ProfilePage;