const mongoose = require('mongoose');
const answerSchema = require('./Answer');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  answers: [answerSchema],
});

module.exports = questionSchema;
