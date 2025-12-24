const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: String,
  category: String,
  target_amount: Number,
  target_date: String,
  saved: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Goal", GoalSchema);
