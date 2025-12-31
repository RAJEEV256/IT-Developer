import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // 1. Fetch the specific Quiz
  useEffect(() => {
    axios.get(`http://localhost:5000/api/quizzes/${id}`)
      .then(res => {
        setQuiz(res.data);
        setTimer(res.data.timeLimit * 60); // Convert minutes to seconds
      })
      .catch(err => console.error(err));
  }, [id]);

  // 2. Countdown Timer Logic
  useEffect(() => {
    if (timer > 0 && !isFinished) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && quiz) {
      handleSubmit(); // Auto-submit when time runs out
    }
  }, [timer, isFinished, quiz]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    // Check if answer is correct
    if (selectedOption === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    // Move to next question or finish
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); // Reset selection
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsFinished(true);
    // Logic to save result to backend (We will implement the Result saving endpoint later if needed)
    // For now, show the score
  };

  if (!quiz) return <div className="text-center mt-20">Loading Quiz...</div>;

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="bg-white p-10 rounded-lg shadow-xl text-center border-t-8 border-green-500">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Quiz Completed!</h1>
          <p className="text-2xl mb-6">Your Score: <span className="font-bold text-green-600">{score} / {quiz.questions.length}</span></p>
          <button 
            onClick={() => navigate('/quiz-home')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      {/* Header with Timer */}
      <div className="flex justify-between items-center mb-6 bg-gray-800 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">{quiz.title}</h2>
        <div className={`text-xl font-mono font-bold ${timer < 60 ? 'text-red-400' : 'text-green-400'}`}>
          Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <span className="text-gray-500 font-bold text-sm">Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <h3 className="text-2xl font-bold mt-2 text-gray-800">{quiz.questions[currentQuestion].questionText}</h3>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {quiz.questions[currentQuestion].options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`p-4 border rounded-lg cursor-pointer transition flex items-center
                ${selectedOption === index 
                  ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-200' 
                  : 'hover:bg-gray-50 border-gray-200'}`}
            >
              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
                ${selectedOption === index ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
                {selectedOption === index && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-lg text-gray-700">{option}</span>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button 
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`w-full mt-8 py-3 rounded-lg font-bold text-white transition
            ${selectedOption === null 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'}`}
        >
          {currentQuestion + 1 === quiz.questions.length ? 'Submit Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default TakeQuiz;