import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const { isAuthenticated, loading, authCheck } = useAuth();            // Destructure authentication state and a function to refresh auth
    const navigate = useNavigate();                                      // Used to programmatically navigate

    // Logout handler
    const handleLogout = async () => {
        try{
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`,{},         // Call backend logout API to clear JWT cookie
                 { withCredentials : true }                                                     // send cookies
            );

            authCheck();   // refresh auth state
            navigate("/");
        }
        catch(error) {
            console.error("Logout failed");
        }
    };

    if(loading) return null;      // prevent flicker while auth status is being checked

  return (
    <nav className='bg-white shadow-md px-6 py-4 flex justify-between items-center'>
        <Link to="/" className='text-xl font-bold text-blue-600'> TaskDashboard </Link>            {/* App logo / title */}

        <div className='space-x-4'>
            {!isAuthenticated ? (                                       // Show login/signup if user is not logged in
                <>
                    <Link to='/signin' className='text-gray-700  font-medium hover:text-blue-600'> Login </Link>
                    <Link to='/signup' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'> SignUp </Link>
                </>
            ) : (                                              // Show dashboard, profile, and logout if user is logged in
                <>                                                        
                   <Link to='/dashboard' className='text-gray-700 hover:text-blue-600 font-medium'> Dashboard </Link>
                   <Link to="/profile" className='text-gray-700 hover:text-blue-600 font-medium'> Profile </Link>
                   <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'> Logout </button>
                </>
            )}
        </div>
    </nav>
  )
}

export default Navbar