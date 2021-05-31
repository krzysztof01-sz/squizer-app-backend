const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

module.exports = ratingSchema;
