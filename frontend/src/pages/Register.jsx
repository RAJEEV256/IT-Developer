import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'User' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Connects to the backend API we built earlier
      await axios.post('http://localhost:5000/api/register', formData);
      alert('Registration Successful! Please Login.');
      navigate('/login');
    } catch (error) {
      alert('Error registering: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        
        <input name="username" placeholder="Username" onChange={handleChange} required 
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
        
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required 
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
        
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required 
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />

        {/* Role Selection (For testing Admin features easily) */}
        <select name="role" onChange={handleChange} className="w-full p-2 mb-6 border rounded bg-gray-50">
          <option value="User">Student (User)</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition font-bold">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;