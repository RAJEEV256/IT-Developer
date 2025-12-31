import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  // State for the Quiz details
  const [quizData, setQuizData] = useState({
    title: '',
    subject: '',
    timeLimit: 10,
    difficulty: 'Medium',
    questions: [] // We will add questions here
  });

  // State for the current question being typed
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: '',
    options: ['', '', '', ''], // 4 Empty options
    correctAnswer: 0, // Index (0 = Option 1)
    explanation: ''
  });

  // Handle Input for Quiz Details
  const handleQuizChange = (e) => setQuizData({ ...quizData, [e.target.name]: e.target.value });

  // Handle Input for Question Details
  const handleQuestionChange = (e) => setCurrentQuestion({ ...currentQuestion, [e.target.name]: e.target.value });

  // Handle Options Input
  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  // Add the current question to the quizData
  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, currentQuestion]
    });
    // Reset current question form
    setCurrentQuestion({
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
    alert('Question Added!');
  };

  // Submit the Final Quiz to Database
  const submitQuiz = async () => {
    try {
      await axios.post('http://localhost:5000/api/quizzes', quizData);
      alert('Quiz Created Successfully!');
      navigate('/'); // Go back home
    } catch (error) {
      alert('Error creating quiz');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard: Create Quiz</h1>

      {/* QUIZ DETAILS SECTION */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-bold mb-4">Step 1: Quiz Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="title" placeholder="Quiz Title (e.g., Java Basics)" onChange={handleQuizChange} className="p-2 border rounded" />
          <input name="subject" placeholder="Subject (e.g., Programming)" onChange={handleQuizChange} className="p-2 border rounded" />
          <input name="timeLimit" type="number" placeholder="Time Limit (Minutes)" onChange={handleQuizChange} className="p-2 border rounded" />
          <select name="difficulty" onChange={handleQuizChange} className="p-2 border rounded bg-white">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* ADD QUESTIONS SECTION */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-green-500">
        <h2 className="text-xl font-bold mb-4">Step 2: Add Questions</h2>
        
        <input name="questionText" value={currentQuestion.questionText} placeholder="Question Text" onChange={handleQuestionChange} className="w-full p-2 border rounded mb-4" />
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {currentQuestion.options.map((opt, index) => (
            <input 
              key={index} 
              placeholder={`Option ${index + 1}`} 
              value={opt} 
              onChange={(e) => handleOptionChange(index, e.target.value)} 
              className="p-2 border rounded" 
            />
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="font-bold">Correct Answer:</label>
          <select 
            name="correctAnswer" 
            value={currentQuestion.correctAnswer} 
            onChange={handleQuestionChange} 
            className="p-2 border rounded bg-white"
          >
            <option value={0}>Option 1</option>
            <option value={1}>Option 2</option>
            <option value={2}>Option 3</option>
            <option value={3}>Option 4</option>
          </select>
        </div>

        <button onClick={addQuestion} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Question to Quiz
        </button>
      </div>

      {/* REVIEW & SUBMIT */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Summary</h3>
        <p>Total Questions Added: {quizData.questions.length}</p>
        {quizData.questions.length > 0 && (
          <button onClick={submitQuiz} className="mt-4 bg-green-600 text-white px-6 py-3 rounded text-lg font-bold hover:bg-green-700 w-full">
            Submit & Create Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;