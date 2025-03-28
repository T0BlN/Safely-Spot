import React from 'react';

interface SubmitButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ type = 'button', children }) => {
  return (
    <button type={type} className="submit-button">
      {children}
    </button>
  );
};

export default SubmitButton;
