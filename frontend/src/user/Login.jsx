import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  login,
  clearError
} from "../store/slices/authSlice";

import {
  addNotification
} from "../store/slices/notificationSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate after successful login
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Error handling
  useEffect(() => {
    if (error) {
      dispatch(
        addNotification({
          message: error,
          type: "error"
        })
      );

      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(
        addNotification({
          message: "Email and password are required",
          type: "warning"
        })
      );
      return;
    }

    dispatch(
      login({
        email,
        password
      })
    );
  };

  return (
    <div className="auth-container">

      {/* Left Branding Section */}
      <div className="auth-brand-section">
        <div className="brand-content">

          <div className="brand-icon">
            RR
          </div>

          <h1>ReviewRave</h1>

          <p className="brand-tagline">
            Social Sentiment Analysis Tool
          </p>

          <div className="brand-description">
            <p>
              Understand what your customers are saying,
              track sentiment, and turn feedback into action.
            </p>
          </div>

          <div className="brand-features">
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <div>
                <strong>Smart Analytics</strong>
                <small>Track customer sentiment</small>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">💬</span>
              <div>
                <strong>Review Monitoring</strong>
                <small>Monitor customer feedback</small>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <div>
                <strong>Quick Resolution</strong>
                <small>Resolve issues efficiently</small>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Login Section */}
      <div className="auth-form-section">

        <div className="auth-card">

          <div className="auth-header">

            <div className="mobile-logo">
              <div className="brand-icon">
                RR
              </div>
            </div>

            <h2>Welcome Back</h2>

            <p>
              Sign in to continue to your ReviewRave account
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  placeholder="agent@reviewrave.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="primary-btn full-width login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  Login
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>

          </form>

          {/* Register */}
          <div className="auth-footer">

            <span>
              Don't have an account?
            </span>{" "}

            <Link to="/register">
              Register
            </Link>

          </div>

          <div className="auth-security">
            <span>🔐</span>
            <span>
              Your information is securely protected
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;