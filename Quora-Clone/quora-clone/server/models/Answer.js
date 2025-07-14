const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);
