// frontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const userId = localStorage.getItem('userId');
  return userId ? children : <Navigate to="/login" replace />;
}
// This component checks if the user is logged in by checking for a userId in localStorage.
// If the userId exists, it renders the children components; otherwise, it redirects to the login page.
// You can use this component to wrap any routes that require authentication, like the Profile or Admin routes.
// Usage example: