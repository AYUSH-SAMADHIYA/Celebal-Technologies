const express = require("express");
const router = express.Router();
// const { postAnswer, getAnswersByQuestion } = require("../controllers/answerController");
const authMiddleware = require("../middleware/authMiddleware");

const {
  postAnswer,
  getAnswersByQuestion,
  upvoteAnswer,
  downvoteAnswer
} = require("../controllers/answerController"); // ✅ Make sure this file exists
// ✅ Correct: use question ID in URL
const { deleteAnswer } = require("../controllers/answerController");
router.delete("/:id", authMiddleware, deleteAnswer);

router.post("/:id", authMiddleware, postAnswer);
router.get("/:questionId", getAnswersByQuestion);
router.put("/upvote/:id", authMiddleware, upvoteAnswer);
router.put("/downvote/:id", authMiddleware, downvoteAnswer);

module.exports = router;
