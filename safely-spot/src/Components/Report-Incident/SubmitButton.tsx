import React from 'react';


interface SubmitButtonProps {
 onClick?: () => void;
 type?: 'button' | 'submit' | 'reset';
 children?: React.ReactNode;
}


const SubmitButton: React.FC<SubmitButtonProps> = ({
 children,
 onClick,
 type = 'submit',
}) => {
 return (
   <button type={type} onClick={onClick}>
     {children || 'Submit'}
   </button>
 );
};


export default SubmitButton;
