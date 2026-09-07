import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login, clearError } from "./store/slices/authSlice";
import { addNotification } from "./store/slices/notificationSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(
        addNotification({
          type: "error",
          message: error,
        })
      );

      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        email,
        password,
      })
    );
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* LEFT SIDE */}
        <div className="auth-brand-panel">
          <div className="brand-logo">
            <div className="brand-icon">R</div>
            <span>ReviewRave</span>
          </div>

          <div className="brand-content">
            <span className="brand-badge">SOCIAL SENTIMENT PLATFORM</span>

            <h1>
              Turn customer
              <br />
              <span>feedback</span> into
              <br />
              action.
            </h1>

            <p>
              Monitor reviews, understand customer sentiment,
              and resolve issues faster with ReviewRave.
            </p>
          </div>

          <div className="brand-footer">
            <div className="brand-stat">
              <strong>Real-time</strong>
              <span>Sentiment Insights</span>
            </div>

            <div className="brand-stat">
              <strong>Smart</strong>
              <span>Issue Resolution</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-form-panel">
          <div className="login-card">

            <div className="mobile-brand">
              <div className="brand-icon">R</div>
              <span>ReviewRave</span>
            </div>

            <div className="auth-header">
              <span className="auth-eyebrow">WELCOME BACK</span>

              <h2>Login to ReviewRave</h2>

              <p>
                Sign in to continue to your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">

              {/* EMAIL */}
              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">✉</span>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="agent@reviewrave.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password">
                    Password
                  </label>
                </div>

                <div className="input-wrapper">
                  <span className="input-icon">●</span>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* LOGIN */}
              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Login"}
              </button>
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <p className="register-text">
              Don't have an account?
              <Link to="/register"> Register here</Link>
            </p>

            <div className="login-security">
              <span>🔒</span>
              <span>Secure authentication powered by ReviewRave</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;