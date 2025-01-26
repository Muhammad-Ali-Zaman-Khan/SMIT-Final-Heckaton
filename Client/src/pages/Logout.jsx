import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/logoutuser");
      console.log(response);


      localStorage.removeItem("userId");
      localStorage.removeItem("imageUrl");

      alert('Logged out successfully');

      navigate('/register'); 
    } catch (error) {
      console.error(error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button onClick={logout} className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-red-400 hover:text-white p-2 rounded-lg transition duration-200">
      Logout
    </button>
  );
};

export default Logout;
