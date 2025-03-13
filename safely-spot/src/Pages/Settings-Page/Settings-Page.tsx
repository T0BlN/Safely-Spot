import {useState} from 'react';
import SettingsButton from '../../Components/Report-Incident/Settings-Button.tsx';

function SettingsPage() {
    return (
        <div className='settingsContainer'>
            <h1 className='settingsTitle'>Settings</h1>
            <SettingsButton text="Use Your Location?" onClick={() => console.log("Using Your Location")}/>
            <SettingsButton text="Your Saved Pins" onClick={() => console.log("Viewing Saved Pins")}/>
            <SettingsButton text="Log In/Out" onClick={() => console.log("Logging In/Out")}/>
        </div>
    )
}

export default SettingsPage;