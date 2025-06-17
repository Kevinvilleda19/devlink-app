import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "junior",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registered successfully!");
        localStorage.setItem("token", data.token);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Server error");
    }
  }

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-10 sm:p-14 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Create Your DevLink Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.username}
          />
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
          <select
            name="role"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.role}
          >
            <option value="junior">Junior</option>
            <option value="mentor">Mentor</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700"
          >
            Register
          </button>

          {message && (
            <p className="text-green-600 text-center font-medium">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}
        </form>
      </div>
    </div>
  );

}

export default Register;
