import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { HelpCircle, FileText } from "lucide-react";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate(`/question/${data._id}`);
      } else {
        alert(data.message || "Error submitting question");
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-10 px-4 text-gray-900 dark:text-gray-100"
    >
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold">Ask a Question</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className=" font-medium mb-1 flex items-center gap-1">
            <FileText className="w-4 h-4" />
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="What do you want to ask?"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide additional context"
          />
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Question
        </motion.button>
      </form>
    </motion.div>
  );
}

export default AskQuestion;
