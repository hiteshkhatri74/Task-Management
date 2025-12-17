import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();                             // Destructure auth state from context

  if(loading) return <p className='text-center mt-10'>Loading ...</p>          // If auth state is still loading, show a loading message

  return isAuthenticated ? children : <Navigate to="/login" />;            // If user is authenticated, render the child component (protected page)
                                                                            //  Otherwise, redirect to login page
}

export default PrivateRoute;