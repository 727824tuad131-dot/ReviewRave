import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Check empty fields
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // Get registered users from localStorage
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // Find matching user
    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
          email.trim().toLowerCase() &&
        item.password === password
    );

    // User not found
    if (!user) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    // Save current login information
    const token =
      user.token || "frontend-token-" + Date.now();

    localStorage.setItem("token", token);

    localStorage.setItem(
      "role",
      user.role
    );

    localStorage.setItem(
      "userId",
      String(user.userId)
    );

    localStorage.setItem(
      "email",
      user.email
    );

    setLoading(false);

    // Go to dashboard
    navigate("/");
  };

  return (
    <div className="simple-login-page">

      <div className="simple-login-card">

        {/* HEADING */}

        <div className="simple-login-header">
          <h1>Login to ReviewRave</h1>
        </div>


        {/* ERROR MESSAGE */}

        {error && (
          <div
            style={{
              color: "#dc2626",
              marginBottom: "15px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}


        {/* LOGIN FORM */}

        <form
          className="simple-login-form"
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}

          <div className="simple-login-form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="manager@gmail.com"
              autoComplete="email"
              disabled={loading}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="simple-login-form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
              required
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="simple-login-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>


        {/* REGISTER LINK */}

        <div className="simple-register-text">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Register here
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;