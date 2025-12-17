import axios from 'axios';                                                // For making HTTP requests
import { createContext, useContext, useEffect, useState } from 'react';

// Create a Context to store auth state and share across components
export const AuthContext = createContext();

// AuthProvider will wrap app and provide auth state to all components
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);     // If user is logged in
    const [user, setUser] = useState(null);                            // Store user info
    const [loading, setLoading] = useState(true);                      // prevent UI flashing before auth check

    // check auth status from backend
    const authCheck = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify`, 
                {  withCredentials: true }
            );

            console.log(res);

            if(res.data.authorized) {                          // If backend says user is authorized, update state
                setIsAuthenticated(true);
                setUser(res.data.user);
            }
            else{
                setIsAuthenticated(false);
                setUser(null);
            }
        }
        catch(error) {                                   // Network or server errors
            setIsAuthenticated(false);
            setUser(null);
        }
        finally {
            setLoading(false);                       // Stop showing loading
        }
    };

    useEffect(() => {                 // Run authCheck once when the app loads
        authCheck();          // run on app load
    }, []);


    // Provide auth state and authCheck function to all children components
    return (                                     
        <AuthContext.Provider 
             value={{ isAuthenticated, user, loading, authCheck }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easier access to AuthContext
export const useAuth = () => useContext(AuthContext);