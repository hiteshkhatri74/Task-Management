import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";            // For notifications
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, authCheck } = useAuth();                     // Get logged-in user info and auth refresh function
  const [name, setName] = useState("");                      // Local state for name input
  const [email, setEmail] = useState("");                    // Local state for email (readonly)
  const [profilePic, setProfilePic] = useState("");          // Local state for profile image URL
  const [loading, setLoading] = useState(false);             // Loading state for async updates

  useEffect(() => {                              // Fill the form fields when user data is available
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfilePic(user.profilePic || "");
    }
  }, [user]);

  // Function to handle profile update
  const handleUpdate = async (e) => {                               
    e.preventDefault();                        // Prevent default form submission
    setLoading(true);

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/profile`,
        { name, profilePic },
        { withCredentials: true }
      );

      toast.success("Profile updated");
      authCheck(); // refresh auth data
    } 
    catch {
      toast.error("Profile update failed");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <ToastContainer position="top-center" />                                          {/* Toast notifications */}

      <div className="bg-white w-full max-w-lg p-6 rounded shadow self-start">
        <h2 className="text-2xl font-bold mb-6 text-blue-600"> Profile </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={ profilePic ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border"
          />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Name
            </label>

            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email
            </label>

            <input
              type="email"
              className="w-full border px-3 py-2 rounded bg-gray-100"
              value={email}
              disabled
            />
          </div>

          {/* Profile Pic URL */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Profile Image URL
            </label>

            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              placeholder="https://image-url"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Profile;