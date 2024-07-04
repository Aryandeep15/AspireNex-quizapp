const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  imageUrl: { type: String },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  author: { type: String, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model('Quiz', quizSchema);
