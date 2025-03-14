import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import './IncidentMarker.css';

interface IncidentMarkerProps {
  id: string;
  position: [number, number];
  title: string;
  category: string;
}

const IncidentMarker: React.FC<IncidentMarkerProps> = ({ id, position, title, category }) => {
  const navigate = useNavigate();
  
  const customIcon = new Icon({
    iconUrl: '/incident-marker.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });

  const handleViewDetails = () => {
    navigate(`/incident/${id}`);
  };

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <div className="incident-popup">
          <h3>{title}</h3>
          <p className="incident-category-tag">{category}</p>
          <button className="view-details-btn" onClick={handleViewDetails}>
            View Details & Comments
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default IncidentMarker;