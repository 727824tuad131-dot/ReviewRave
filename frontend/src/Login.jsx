import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // Get registered users from browser storage
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // Find matching user
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    // User not found / wrong password
    if (!user) {
      alert("Invalid email or password.");
      setLoading(false);
      return;
    }

    // Create login token
    const token =
      user.token || "frontend-token-" + Date.now();

    // Save current logged-in user
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem(
      "userId",
      String(user.userId)
    );
    localStorage.setItem("email", user.email);

    setLoading(false);

    // Go to dashboard/home
    navigate("/", { replace: true });
  };

  return (
    <div className="simple-login-page">

      <div className="simple-login-card">

        {/* HEADER */}

        <div className="simple-login-header">
          <h1>Login to ReviewRave</h1>
        </div>

        {/* FORM */}

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
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
              onChange={(e) =>
                setPassword(e.target.value)
              }
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