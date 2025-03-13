import React from 'react';

interface CancelButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  children,
  onClick,
  type = 'button',
}) => {
  return (
    <button type={type} onClick={onClick}>
      {children || 'Cancel'}
    </button>
  );
};

export default CancelButton;