const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Role: Admin manages quizzes; User attempts them [cite: 55, 56]
  role: { type: String, enum: ['Admin', 'User'], default: 'User' } 
});

module.exports = mongoose.model('User', UserSchema);