import React from 'react';
import './NewIncidentButton.css';

//prop for on click handler
interface NewIncidentButtonProps {
  onClick: () => void;
}

const NewIncidentButton: React.FC<NewIncidentButtonProps> = ({ onClick }) => {
  //return button that navigates to new incident button
  return (
    <button className="add-incident-button" onClick={onClick}>
      +
    </button>
  );
};

export default NewIncidentButton;
