const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  timeTaken: { type: Number, required: true }, // In seconds
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);