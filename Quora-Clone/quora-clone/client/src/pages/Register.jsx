import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email address";
    }
    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" }); // Clear field-specific error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
        window.location.href = "/";
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={`w-full border px-3 py-2 rounded focus:outline-none dark:bg-gray-800 dark:text-white ${
              fieldErrors.name
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            onChange={handleChange}
            value={form.name}
          />
          {fieldErrors.name && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full border px-3 py-2 rounded focus:outline-none dark:bg-gray-800 dark:text-white ${
              fieldErrors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            onChange={handleChange}
            value={form.email}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full border px-3 py-2 rounded focus:outline-none dark:bg-gray-800 dark:text-white ${
              fieldErrors.password
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            onChange={handleChange}
            value={form.password}
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
