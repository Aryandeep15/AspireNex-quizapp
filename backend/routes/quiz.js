const express = require('express');
const Quiz = require('../Models/Quiz');
const router = express.Router();

// Create a new quiz
router.post('/', async (req, res) => {
  try {
    const { title, genre, author, questions } = req.body;
    const quiz = new Quiz({ title, genre, author, questions });
    await quiz.save();
    res.status(201).send('Quiz created');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get quizzes by genre
router.get('/quizzes/:genre', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ genre: req.params.genre });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
