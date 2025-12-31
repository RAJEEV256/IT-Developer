import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all quizzes from the backend
    axios.get('http://localhost:5000/api/quizzes')
      .then(res => setQuizzes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Quizzes</h1>
      
      {quizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes available yet. Ask Admin to add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{quiz.title}</h2>
              <p className="text-gray-600 mb-2">Subject: <span className="font-semibold">{quiz.subject}</span></p>
              <p className="text-gray-600 mb-2">Difficulty: <span className={`font-semibold ${quiz.difficulty === 'Hard' ? 'text-red-500' : 'text-green-500'}`}>{quiz.difficulty}</span></p>
              <p className="text-gray-600 mb-4">Time: {quiz.timeLimit} mins</p>
              
              <button 
                onClick={() => navigate(`/take-quiz/${quiz._id}`)}
                className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizHome;