import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import QuizHome from './pages/QuizHome';
import TakeQuiz from './pages/TakeQuiz';
import Leaderboard from './pages/Leaderboard';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
    <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to IT Developer Quiz</h1>
    <p className="text-xl text-gray-600 mb-8">Redefine Your Limits with our Online Quiz Platform</p>
    <div className="space-x-4">
      <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
        Login
      </Link>
      <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
        Register
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen w-screen bg-gray-100 text-gray-900 font-sans">
        <nav className="bg-gray-900 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link className="text-2xl font-bold tracking-wide hover:text-blue-400 transition" to="/">
              IT DEVELOPER
            </Link>
            <div className="space-x-6">
              <Link to="/leaderboard" className="text-yellow-400 hover:text-yellow-300 transition font-bold">🏆 Leaderboard</Link>
              <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-400 transition">Register</Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/quiz-home" element={<QuizHome />} />
            <Route path="/take-quiz/:id" element={<TakeQuiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;