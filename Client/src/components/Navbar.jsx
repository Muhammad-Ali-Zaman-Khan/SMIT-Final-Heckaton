import { Link } from "react-router-dom";
import Logout from "../pages/Logout.jsx";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const updateUserState = () => {
    const storedUserId = localStorage.getItem("userId");
    const storedImageUrl = localStorage.getItem("imageUrl");

    if (storedUserId && storedImageUrl) {
      setIsUserLoggedIn(true);
      setUserId(storedUserId);
      setImageUrl(storedImageUrl);
    } else {
      setIsUserLoggedIn(false);
      setImageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwcRgFA-KFW6u0wScyvZEBWMLME5WkdeCUg&s"); // Default image URL
    }
  };

  useEffect(() => {
    updateUserState(); // Initial state update on mount
  }, []);

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      updateUserState();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="navbar px-6 bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl rounded-b-2xl">
    <div className="flex-1">
      <a className="text-2xl font-bold text-white hover:text-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105">
        My App
      </a>
    </div>
  
    <div className="flex justify-center flex-1">
      {/* Additional icons or links can be added here */}
    </div>
  
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar hover:bg-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg">
            <img src={imageUrl} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
  
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-56 p-2 shadow-xl transition-all duration-300 ease-in-out scale-95 hover:scale-100"
        >
          <li>
            <Link to="/Home" className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white p-2 rounded-lg transition duration-200">
              Home
            </Link>
          </li>
  
          {!isUserLoggedIn ? (
            <>
              <li>
                <Link to="Login" className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white p-2 rounded-lg transition duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="Register" className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white p-2 rounded-lg transition duration-200">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/Dashboard" className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white p-2 rounded-lg transition duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Logout className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white p-2 rounded-lg transition duration-200" />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </div>
  
  
  );
};

export default Navbar;
