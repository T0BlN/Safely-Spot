import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import IncidentMarker from './IncidentMarker';
import { useDataContext } from '../../Context/DataContext';
import CurrentLocationButton from './CurrentLocationButton';

const center = { lat: 42.3866, lng: -72.5314 };

const Map: React.FC = () => {
  const { pins } = useDataContext();
  
  return (
    <div className="map-wrapper">
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
        
        {pins.map((pin) => (
          <IncidentMarker
            key={pin.id}
            id={pin.id}
            position={[pin.position.lat, pin.position.lng]}
            title={pin.title}
            category={pin.category}
          />
        ))}

        <CurrentLocationButton />
      </MapContainer>
    </div>
  );
};

export default Map;
