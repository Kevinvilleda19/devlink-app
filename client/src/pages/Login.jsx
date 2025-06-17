import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center border-4">
      <div className="w-full max-w-3xl bg-white py-10 px-4 sm:px-10 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Welcome Back to DevLink
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.password}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700 font-semibold"
          >
            Login
          </button>

          {message && (
            <p className="text-green-600 font-medium">{message}</p>
          )}
          {error && (
            <p className="text-red-600 font-medium">{error}</p>
          )}
        </form>
      </div>
    </div>
  );

}

export default Login;
