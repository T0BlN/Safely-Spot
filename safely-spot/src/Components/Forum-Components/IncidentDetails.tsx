import React from 'react';
import './IncidentDetails.css';

interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  date: string;
  image?: string;
}

interface IncidentDetailsProps {
  incident: Incident;
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({ incident }) => {
  return (
    <div className="incident-details">
      <h2>{incident.title}</h2>
      <div className="incident-meta">
        <span className="incident-category">{incident.category}</span>
        <span className="incident-date">{incident.date}</span>
      </div>
      <div className="incident-location">
        <strong>Location:</strong> {incident.location}
      </div>
      <p className="incident-description">{incident.description}</p>
      {incident.image && (
        <div className="incident-image-container">
          <img 
            src={incident.image} 
            alt={`Image of ${incident.title}`} 
            className="incident-image"
          />
        </div>
      )}
    </div>
  );
};

export default IncidentDetails;