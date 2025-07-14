import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { token } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/questions/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user questions:", err);
        setLoading(false);
      });
  }, [token]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this question?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/api/questions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } else {
      alert(data.message || "Server error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">My Questions</h1>

      {loading ? (
        <p className="dark:text-gray-300">Loading...</p>
      ) : questions.length === 0 ? (
        <p className="dark:text-gray-400">You haven't asked any questions yet.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q._id} className="border p-4 rounded dark:border-gray-600 dark:bg-gray-800">
              <Link
                to={`/question/${q._id}`}
                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {q.title}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {q.description}
              </p>
              <div className="mt-2 flex gap-4">
                <Link
                  to={`/edit/${q._id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(q._id)}
                  className="text-red-600 dark:text-red-400 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
