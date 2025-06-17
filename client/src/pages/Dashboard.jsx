import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:5000/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    }

    fetchUser();
  }, [navigate]);

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-10 sm:p-14 rounded-xl shadow-md text-center">
        {user ? (
          <>
            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              Welcome, {user.username}!
            </h2>
            <p className="text-lg">You are logged in as a {user.role}.</p>
          </>
        ) : (
          <p className="text-lg text-gray-600">Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
