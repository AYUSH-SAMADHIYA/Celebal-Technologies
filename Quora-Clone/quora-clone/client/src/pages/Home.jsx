import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HelpCircle, User } from "lucide-react";

function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/questions");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg mb-8 text-center shadow"
      >
        <div className="flex justify-center items-center gap-2 mb-2">
          <HelpCircle className="text-blue-700 dark:text-white w-6 h-6" />
          <h1 className="text-3xl font-bold text-blue-700 dark:text-white">
            Welcome to QuoraSphere
          </h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Ask questions, get answers, share knowledge, and grow together.
        </p>
      </motion.div>

      {/* Questions List */}
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Latest Questions</h2>
        {questions.map((q, index) => (
          <motion.div
            key={q._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded p-4 mb-4 hover:shadow-md transition-all"
          >
            <Link to={`/question/${q._id}`}>
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 hover:underline">
                {q.title}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
              <User className="w-4 h-4 mr-1" />
              <span>Asked by {q.user?.name || "User"}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default Home;
