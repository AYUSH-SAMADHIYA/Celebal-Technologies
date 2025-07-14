import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, Trash2, MessageSquare } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "sonner";

function QuestionDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [targetAnswerId, setTargetAnswerId] = useState(null);

  const fetchQuestionAndAnswers = async () => {
    try {
      const qRes = await fetch(`http://localhost:5000/api/questions/${id}`);
      if (!qRes.ok) throw new Error("Failed to fetch question");
      const qData = await qRes.json();

      const aRes = await fetch(`http://localhost:5000/api/answers/${id}`);
      if (!aRes.ok) throw new Error("Failed to fetch answers");
      const aData = await aRes.json();

      setQuestion({ ...qData, answers: aData });

      const allComments = {};
      for (const answer of aData) {
        const res = await fetch(`http://localhost:5000/api/comments/${answer._id}`);
        const data = await res.json();
        allComments[answer._id] = data;
      }
      setComments(allComments);
    } catch (err) {
      console.error("❌ Error loading question or answers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/answers/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: answer }),
      });

      const data = await res.json();
      if (res.ok) {
        setQuestion((prev) => ({
          ...prev,
          answers: [...(prev.answers || []), data],
        }));
        setAnswer("");
        toast.success("Answer submitted successfully");
      } else {
        toast.error(data.message || "Failed to submit answer");
      }
    } catch (err) {
      console.error("Failed to submit answer", err);
      toast.error("Failed to submit answer");
    }
  };

  const handleVote = async (answerId, type) => {
    try {
      const res = await fetch(`http://localhost:5000/api/answers/${type}/${answerId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = await res.json();
      if (res.ok) {
        setQuestion((prev) => ({
          ...prev,
          answers: prev.answers.map((a) =>
            a._id === answerId ? { ...a, ...updated } : a
          ),
        }));
      } else {
        toast.error(updated.message || "Failed to vote");
      }
    } catch (err) {
      console.error("Failed to vote", err);
      toast.error("Failed to vote");
    }
  };

  const handleSort = (a, b) => {
    switch (sortOption) {
      case "newest": return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest": return new Date(a.createdAt) - new Date(b.createdAt);
      case "mostUpvoted": return b.upvotes?.length - a.upvotes?.length;
      default: return 0;
    }
  };

  const handleCommentSubmit = async (e, answerId) => {
    e.preventDefault();
    const text = commentInputs[answerId];
    if (!text?.trim()) return;

    const res = await fetch(`http://localhost:5000/api/comments/${answerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    if (res.ok) {
      setComments((prev) => ({
        ...prev,
        [answerId]: [...(prev[answerId] || []), data],
      }));
      setCommentInputs((prev) => ({ ...prev, [answerId]: "" }));
      toast.success("Comment posted");
    } else {
      toast.error(data.message || "Failed to submit comment");
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/answers/${answerId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setQuestion((prev) => ({
          ...prev,
          answers: prev.answers.filter((a) => a._id !== answerId),
        }));
        toast.success("Answer deleted");
      } else {
        toast.error(data.message || "Unauthorized to delete answer");
      }
    } catch (err) {
      toast.error("Failed to delete answer");
    }
  };

  const handleDeleteComment = async (commentId, answerId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Unauthorized to delete comment");
        return;
      }

      setComments((prev) => ({
        ...prev,
        [answerId]: prev[answerId].filter((c) => c._id !== commentId),
      }));
      toast.success("Comment deleted");
    } catch (err) {
      console.error("Failed to delete comment", err);
      toast.error("Failed to delete comment");
    }
  };

  if (loading) return <p className="text-center mt-10 dark:text-gray-200">Loading...</p>;
  if (!question) return <p className="text-center mt-10 dark:text-gray-200">Question not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <motion.h1
        className="text-2xl font-bold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {question.title}
      </motion.h1>
      <motion.p
        className="mb-6 text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {question.description}
      </motion.p>

      <form onSubmit={handleAnswerSubmit} className="mb-8">
        <textarea
          className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          rows="4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer here..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
        >
          Submit Answer
        </button>
      </form>

      <div className="mb-4">
        <label className="font-medium mr-2">Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostUpvoted">Most Upvoted</option>
        </select>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Answers:</h2>
        {!question.answers || question.answers.length === 0 ? (
          <p>No answers yet.</p>
        ) : (
          question.answers.sort(handleSort).map((a) => (
            <motion.div
              key={a._id}
              className="mb-6 p-4 border rounded dark:border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p>{a.content}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <button
                  onClick={() => handleVote(a._id, "upvote")}
                  className="text-green-600 hover:underline flex items-center gap-1"
                >
                  <ThumbsUp size={16} /> {a.upvotes?.length || 0}
                </button>
                <button
                  onClick={() => handleVote(a._id, "downvote")}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <ThumbsDown size={16} /> {a.downvotes?.length || 0}
                </button>
                <button
                  onClick={() => {
                    setTargetAnswerId(a._id);
                    setShowModal(true);
                  }}
                  className="text-red-600 hover:underline ml-auto flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete Answer
                </button>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-1 flex items-center gap-1">
                  <MessageSquare size={16} /> Comments
                </h3>
                <form
                  onSubmit={(e) => handleCommentSubmit(e, a._id)}
                  className="flex gap-2 mt-1"
                >
                  <input
                    className="border px-2 py-1 rounded w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    value={commentInputs[a._id] || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({ ...prev, [a._id]: e.target.value }))
                    }
                    placeholder="Add a comment"
                  />
                  <button className="bg-blue-500 text-white px-3 rounded">Post</button>
                </form>

                {comments[a._id]?.map((c) => (
                  <div key={c._id} className="text-sm mt-2 flex justify-between">
                    <span>{c.text}</span>
                    <button
                      onClick={() => handleDeleteComment(c._id, a._id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDeleteAnswer(targetAnswerId)}
        message="Do you really want to delete this answer?"
      />
    </div>
  );
}

export default QuestionDetail;
