import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import pages and components
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>                                                   {/* Wrap entire app in BrowserRouter for routing */}
          <Navbar />                                                  {/* Navbar will appear on all pages */}

          <Routes>
                {/* Public Routes */}
                <Route path = '/'  element = {<LandingPage />} />           {/* Landing page at root URL */}
                <Route path = '/signin'  element = {<SignIn />} />          {/* Sign-in page */}
                <Route path = '/signup'  element = {<SignUp />} />          {/* Sign-up page */}

                {/* Protected Route (Login Required) */}
                <Route path = '/dashboard' element = {
                      <PrivateRoute>                                       {/* Only allows access if user is logged in */}
                          <UserDashboard />                                 {/* Dashboard page content */}
                      </PrivateRoute>
                    }
                />

                <Route path='/profile' element = {
                      <PrivateRoute>
                          <Profile />                                      {/* Profile page content */}
                      </PrivateRoute>
                   }
                />
          </Routes>
    </BrowserRouter>
  );
}

export default App;                                      // Export App component to be used in index.js