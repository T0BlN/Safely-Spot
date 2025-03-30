import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useDataContext } from '../../Context/DataContext';

interface ProtectedRouteProps {
  children: ReactNode; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useDataContext();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
