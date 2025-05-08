import React from 'react';
import { useMap } from 'react-leaflet';
import { FaLocationArrow } from 'react-icons/fa';
import './CurrentLocationButton.css'

const CurrentLocationButton: React.FC = () => {
    const map = useMap();

    //function to find users location and move the center of the map to that location
    const handleCenterOnUser = () => {
        //checks if browser supports location
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }

        //finds location and moves map center
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

    //returns a button with handler function on click
    return (
        <button className="locate-button" onClick={handleCenterOnUser}>
            <FaLocationArrow className="locate-icon" />
        </button>
    );
};

export default CurrentLocationButton;
