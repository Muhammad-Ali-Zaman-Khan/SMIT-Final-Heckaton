import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/reducer/userSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/loginUser", {
        email: '',
        password: '',
      }, {
        withCredentials: true,
      })
      .then(response => console.log(response.data))
      .catch(error => console.error('Error:', error));

      reset();

      if (response.data && response.data.accessToken) {
        const { accessToken, user } = response.data;

        dispatch(setUser({ userId: user.id, accessToken }));

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", user.id);

        setTimeout(() => {
          alert("Successfully logged in");
          navigate("/Dashboard");
        }, 1000);
      } else {
        console.error("Access token is not returned in the response");
        alert("Failed to log in: Access token not returned.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        alert(errorMessage);
      } else {
        alert("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
  <form
    style={{
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
      transition: "all 0.4s ease-in-out",
    }}
    className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 hover:shadow-2xl transition duration-500 border border-gray-700"
    onSubmit={handleSubmit(login)}
  >
    <h1 className="text-4xl font-extrabold text-white text-center mb-8">
      Welcome Back!
    </h1>

    <div className="relative mb-6">
      <input
        className="w-full px-6 py-3 rounded-lg border-2 border-gray-600 focus:border-teal-500 focus:outline-none transition ease-in-out duration-300 text-lg text-black placeholder-gray-400"
        {...register("email", { required: "Email is required" })}
        type="email"
        placeholder="Enter your email"
      />
      {errors.email && (
        <p className="text-red-400 text-sm mt-1 ml-2">{errors.email.message}</p>
      )}
    </div>

    <div className="relative mb-6">
      <input
        className="w-full px-6 py-3 rounded-lg border-2 border-gray-600 focus:border-teal-500 focus:outline-none transition ease-in-out duration-300 text-lg text-black placeholder-gray-400"
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Enter your password"
      />
      {errors.password && (
        <p className="text-red-400 text-sm mt-1 ml-2">{errors.password.message}</p>
      )}
    </div>

    <div className="flex items-center justify-between mb-6">
      <label className="flex items-center text-sm text-gray-400">
        <input type="checkbox" className="mr-2" />
        Remember Me
      </label>
      <a href="#" className="text-sm text-teal-400 hover:text-teal-300">
        Forgot password?
      </a>
    </div>

    {loading ? (
      <button
        className="w-full py-3 rounded-lg bg-teal-500 hover:bg-teal-600 text-lg text-white font-semibold shadow-md transition-all duration-300"
        type="submit"
      >
        Authenticating, please wait...
      </button>
    ) : (
      <button
        className="btn bg-gradient-to-r from-teal-500 to-blue-500 w-full text-lg text-white py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none"
        type="submit"
      >
        LOGIN
      </button>
    )}

    <p className="text-center text-sm text-gray-400 mt-6">
      Don't have an account?{" "}
      <a href="/register" className="text-teal-400 hover:text-teal-300 font-semibold">
        Sign up
      </a>
    </p>
  </form>
</div>


  );
};

export default Login;
