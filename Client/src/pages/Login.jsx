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
      const response = await axios.post(
        "'http://localhost:3000/api/v1/login",
        data,
        { withCredentials: true }
      );

      reset();

      if (response.data && response.data.accessToken) {
        const { accessToken, user } = response.data;

        // Store accessToken and userId using Redux
        dispatch(setUser({ userId: user.id, accessToken }));

        // Store in localStorage
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
    // <div className="flex justify-center mt-5 p-5">
    //   <form
    //     style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
    //     className="p-8 w-full max-w-md bg-white rounded-lg"
    //     onSubmit={handleSubmit(login)}
    //   >
    //     <h1 className="text-lg font-bold p-2 mb-5">Login</h1>
    //     <input
    //       className="input input-bordered w-full mb-3"
    //       {...register("email", { required: "Email is required" })}
    //       type="email"
    //       placeholder="Email"
    //     />
    //     {errors.email && (
    //       <p className="text-red-500 mb-2 text-start mx-1">
    //         {errors.email.message}
    //       </p>
    //     )}

    //     <input
    //       className="input input-bordered w-full mb-3"
    //       {...register("password", { required: "Password is required" })}
    //       type="password"
    //       placeholder="Password"
    //     />
    //     {errors.password && (
    //       <p className="text-red-500 text-start mx-1 mb-2">
    //         {errors.password.message}
    //       </p>
    //     )}

    //     {loading ? (
    //       <button
    //         className="btn bg-info hover:bg-info w-full text-lg text-white"
    //         type="submit"
    //       >
    //         Loading...
    //       </button>
    //     ) : (
    //       <button
    //         className="btn bg-info hover:bg-info w-full text-lg text-white"
    //         type="submit"
    //       >
    //         Login
    //       </button>
    //     )}
    //   </form>
    // </div>

    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
    <form
      style={{
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
      }}
      className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 hover:shadow-2xl transition duration-500 border border-3"
      onSubmit={handleSubmit(login)}
    >
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        Welcome Back!
      </h1>
  
      <div className="relative mb-6">
        <input
          className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition ease-in-out duration-300 text-lg"
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 ml-2">{errors.email.message}</p>
        )}
      </div>
  
      <div className="relative mb-6">
        <input
          className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition ease-in-out duration-300 text-lg"
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1 ml-2">{errors.password.message}</p>
        )}
      </div>
  
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center text-sm text-gray-600">
          <input type="checkbox" className="mr-2" />
          Remember Me
        </label>
        <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
          Forgot password?
        </a>
      </div>
  
      {loading ? (
        <button
          className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-lg text-white font-semibold shadow-md transition-all duration-300"
          type="submit"
        >
          authenticating please wait...
        </button>
      ) : (
       

<button
className="btn bg-gradient-to-r from-blue-500 to-teal-400 w-full text-lg text-white py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none"
type="submit"
>
LOGIN
</button>
      )}
  
      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
          Sign up
        </a>
      </p>
    </form>
  </div>
  

  );
};

export default Login;
