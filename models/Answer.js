const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  answerId: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = answerSchema;
