import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import IncidentMarker from './IncidentMarker';

const center = { lat: 42.3866, lng: -72.5314 };

const mockIncident = {
  id: '1',
  position: [42.3866, -72.5314] as [number, number],
  title: 'Fallen Tree on North Pleasant Street',
  category: 'Hazard'
};

const Map: React.FC = () => {
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
        
        <IncidentMarker 
          id={mockIncident.id}
          position={mockIncident.position}
          title={mockIncident.title}
          category={mockIncident.category}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
