const mongoose = require('mongoose');
const questionSchema = require('./Question');

const Schema = mongoose.Schema;

const quizQuestionSchema = new Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  questions: [questionSchema],
});

const QuizQuestion = mongoose.model('quiz_questions', quizQuestionSchema);

module.exports = QuizQuestion;
