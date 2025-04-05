import React from 'react';
import { useMap } from 'react-leaflet';
import { FaLocationArrow } from 'react-icons/fa';
import './CurrentLocationButton.css'

const CurrentLocationButton: React.FC = () => {
const map = useMap();

const handleCenterOnUser = () => {
    if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
    }

    navigator.geolocation.getCurrentPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        map.flyTo([latitude, longitude], 13); 
    },
    (error) => {
        console.error(error);
        alert('Unable to retrieve your location.');
    }
    );
};

return (
    <button className="locate-button" onClick={handleCenterOnUser}>
        <FaLocationArrow className="locate-icon" />
    </button>
);
};

export default CurrentLocationButton;
