import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import IncidentMarker from './IncidentMarker';
import { useDataContext } from '../../Context/DataContext';
import CurrentLocationButton from './CurrentLocationButton';

//default center
const center = { lat: 42.3866, lng: -72.5314 };

const Map: React.FC = () => {
  //use pins from data context
  const { pins } = useDataContext();
  
  //returns map using leaflet
  return (
    <div className="map-wrapper">
      {/* default leaflet setup */}
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        scrollWheelZoom
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Maps the pins that exist in the data context onto the map */}
        {pins.map((pin) => (
          <IncidentMarker
            key={pin.id}
            id={pin.id}
            position={[pin.position.lat, pin.position.lng]}
            title={pin.title}
            category={pin.category}
          />
        ))}

        {/* imported current location component */}
        <CurrentLocationButton />
      </MapContainer>
    </div>
  );
};

export default Map;