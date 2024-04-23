// Login.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/api/login", {
        email,
        password,
      });

      // Store token in session storage
      sessionStorage.setItem("token", response.data.token);

      // Update isAuthenticated state using the prop function
      setIsAuthenticated(true);

      setError("");
      console.log("Login successful!");

      navigate("/business-cards");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark btn-block">
                Login
              </button>
              {error && <p className="text-danger text-center mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
