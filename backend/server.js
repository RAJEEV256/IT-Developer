const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import Models
const User = require('./models/User');
const Quiz = require('./models/Quiz');
const Result = require('./models/Result');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));

// --- AUTHENTICATION ROUTES ---

// Register User (Admin or User)
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login User
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.json({ token, role: user.role, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- QUIZ ROUTES (Admin & User) ---

// Create a Quiz (Admin Only)
app.post('/api/quizzes', async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json({ message: "Quiz created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Quizzes (For the Quiz Listing Page)
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, 'title subject difficulty timeLimit'); // Don't send questions yet
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a Single Quiz with Questions (For taking the quiz)
app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- RESULT ROUTES ---

// Submit Quiz Score
app.post('/api/results', async (req, res) => {
  try {
    const newResult = new Result(req.body);
    await newResult.save();
    res.status(201).json({ message: "Score saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Leaderboard (Top scores)
app.get('/api/leaderboard', async (req, res) => {
  try {
    // Sort by Score (Descending), then TimeTaken (Ascending)
    const leaderboard = await Result.find().sort({ score: -1, timeTaken: 1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));