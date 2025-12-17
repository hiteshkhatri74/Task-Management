import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();             // Get auth status from context

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600  flex flex-col text-white">

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center py-20 px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4"> Task Dashboard App </h1>

            <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
                A modern web application to manage your tasks efficiently. Secure authentication, protected dashboard, and full CRUD support make staying organized easier than ever.
            </p>


            {/* Show Login/Signup buttons only if user is NOT authenticated */}
            {
                !isAuthenticated && (

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => navigate("/signin")}
                    className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
                >
                    Login
                </button>

                <button
                    onClick={() => navigate("/signup")}
                    className="bg-transparent border-2 border-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition"
                >
                    SignUp
                </button>
            </div>
                )
            }
            
        </div>

        {/* Features Section  */}
        <div className="bg-white text-gray-800 py-20 px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-blue-600"> Features </h2>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">

                <div className="bg-blue-50 p-6 rounded shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
                    <p>Register and login with JWT-based authentication. Passwords are hashed for security.</p>
                </div>

                <div className="bg-blue-50 p-6 rounded shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Protected Dashboard</h3>
                    <p>Access your personal dashboard only after logging in. User-specific tasks are securely displayed.</p>
                </div>

                <div className="bg-blue-50 p-6 rounded shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                    <p>Create, read, update, and delete tasks with ease. Add titles and descriptions to stay organized.</p>
                </div>

                <div className="bg-blue-50 p-6 rounded shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Profile Management</h3>
                    <p>View and update your profile information, including optional profile image.</p>
                </div>

                <div className="bg-blue-50 p-6 rounded shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
                    <p>Easily search and filter tasks to find exactly what you need quickly.</p>
                </div>

                <div className="bg-blue-50 p-6 rounded shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Scalable & Secure</h3>
                    <p>Code structure is modular, secure, and ready for future scalability and cloud deployment.</p>
                </div>

            </div>
        </div>

        {/* Footer */}
      <footer className="py-8 text-center text-white opacity-80 bg-gradient-to-t from-purple-600 to-blue-500">
        &copy; {new Date().getFullYear()} Task Dashboard App. All rights reserved.
      </footer>

    </div>
  )
}

export default LandingPage