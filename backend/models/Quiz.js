const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  timeLimit: { type: Number, required: true }, // In minutes
  difficulty: { type: String, required: true },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }], // Array of option strings
    correctAnswer: { type: Number, required: true }, // Index of the correct option (0, 1, 2, or 3)
    explanation: { type: String } // Optional explanation
  }]
});

module.exports = mongoose.model('Quiz', QuizSchema);