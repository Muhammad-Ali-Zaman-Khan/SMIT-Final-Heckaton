import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    cnic: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // API call to register the user
      const response = await axios.post('http://localhost:3000/api/v1/register', formData);
      setSuccess(response.data.message); // Display success message from API
      setFormData({ username: '', email: '', cnic: '', role: 'user' }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.'); // Handle errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform"
            />
          </div>

          {/* CNIC Field */}
          <div className="mb-4">
            <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">CNIC</label>
            <input
              type="text"
              id="cnic"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              required
              placeholder="Enter your CNIC"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform"
            />
          </div>

          {/* Role Field */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:bg-gray-50"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-3 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform ${loading && 'opacity-50'}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
