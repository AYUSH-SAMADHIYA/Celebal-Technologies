import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [answers, setAnswers] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    if (!user?.isAdmin) {
      toast.error("You are not admin!");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [userRes, questionRes] = await Promise.all([
          fetch("http://localhost:5000/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/admin/questions", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const usersData = await userRes.json();
        const questionsData = await questionRes.json();
        setUsers(usersData);
        setQuestions(questionsData);
      } catch {
        toast.error("Failed to load admin data");
      }
    };

    if (user?.isAdmin) fetchAdminData();
  }, [token, user]);

  const handleDeleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        toast.success("User deleted");
      } else toast.error("Failed to delete user");
    } catch {
      toast.error("Server error");
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!confirm("Delete this question?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/question/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setQuestions((prev) => prev.filter((q) => q._id !== id));
        toast.success("Question deleted");
      } else toast.error("Failed to delete question");
    } catch {
      toast.error("Server error");
    }
  };

  const handleDeleteAnswer = async (questionId, answerId) => {
    if (!confirm("Delete this answer?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/answer/${answerId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: prev[questionId].filter((a) => a._id !== answerId),
        }));
        toast.success("Answer deleted");
      } else toast.error("Failed to delete answer");
    } catch {
      toast.error("Server error");
    }
  };

  const handleDeleteComment = async (questionId, commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/comment/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setComments((prev) => ({
          ...prev,
          [questionId]: prev[questionId].filter((c) => c._id !== commentId),
        }));
        toast.success("Comment deleted");
      } else toast.error("Failed to delete comment");
    } catch {
      toast.error("Server error");
    }
  };

  const toggleExpand = async (questionId) => {
    if (expanded[questionId]) {
      setExpanded((prev) => ({ ...prev, [questionId]: false }));
      return;
    }

    try {
      const [ansRes, comRes] = await Promise.all([
        fetch(`http://localhost:5000/api/admin/question/${questionId}/answers`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`http://localhost:5000/api/admin/question/${questionId}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const answersData = await ansRes.json();
      const commentsData = await comRes.json();

      setAnswers((prev) => ({ ...prev, [questionId]: answersData }));
      setComments((prev) => ({ ...prev, [questionId]: commentsData }));
      setExpanded((prev) => ({ ...prev, [questionId]: true }));
    } catch {
      toast.error("Failed to load details");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">Admin Dashboard</h1>

      {/* USERS */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Users</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {users.map((u) => (
            <div key={u._id} className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-gray-800 dark:text-white font-medium">{u.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{u.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs px-2 py-1 rounded ${u.isAdmin ? "bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-900" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"}`}>
                  {u.isAdmin ? "Admin" : "User"}
                </span>
                {!u.isAdmin && (
                  <button onClick={() => handleDeleteUser(u._id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUESTIONS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Questions</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {questions.map((q) => (
            <div key={q._id} className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center px-4 py-3">
                <div>
                  <p className="text-gray-800 dark:text-white font-medium">{q.title}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Asked by: {q.user?.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleExpand(q._id)} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    {expanded[q._id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <button onClick={() => handleDeleteQuestion(q._id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* ANSWERS & COMMENTS */}
              {expanded[q._id] && (
                <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 text-sm text-gray-800 dark:text-gray-200 space-y-4">
                  {/* ANSWERS */}
                  <div>
                    <p className="font-semibold mb-2">Answers:</p>
                    {answers[q._id]?.length > 0 ? answers[q._id].map((a) => (
                      <div key={a._id} className="flex justify-between items-start border-l-4 border-blue-400 pl-4 mb-2">
                        <div>
                          <p className="font-semibold">{a.answeredBy?.name}</p>
                          <p>{a.content}</p>
                        </div>
                        <button onClick={() => handleDeleteAnswer(q._id, a._id)} className="ml-4 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )) : <p>No answers yet.</p>}
                  </div>

                  {/* COMMENTS */}
                  <div>
                    <p className="font-semibold mb-2">Comments:</p>
                    {comments[q._id]?.length > 0 ? comments[q._id].map((c) => (
                      <div key={c._id} className="flex justify-between items-start border-l-4 border-yellow-400 pl-4 mb-2">
                        <div>
                          <p className="font-semibold">{c.user?.name}</p>
                          <p>{c.text}</p>
                        </div>
                        <button onClick={() => handleDeleteComment(q._id, c._id)} className="ml-4 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )) : <p>No comments yet.</p>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
