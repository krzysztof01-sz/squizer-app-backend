const mongoose = require('mongoose');
const questionSchema = require('./Question');
const { commentSchema } = require('./QuizComment');

const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      enum: ['maths', 'it', 'english', 'riddles'],
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    comments: [commentSchema],
  },
  { collection: 'quizzes', versionKey: false, timestamps: { createdAt: 'creationDate' } },
);

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
