import React from 'react';
import './NewIncidentButton.css';

interface NewIncidentButtonProps {
  onClick: () => void;
}

const NewIncidentButton: React.FC<NewIncidentButtonProps> = ({ onClick }) => {
  return (
    <button className="add-incident-button" onClick={onClick}>
      +
    </button>
  );
};

export default NewIncidentButton;
