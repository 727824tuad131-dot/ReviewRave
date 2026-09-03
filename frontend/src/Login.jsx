import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  login,
  clearError,
} from "./store/slices/authSlice";

import { addNotification } from "./store/slices/notificationSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  /* -------------------------------------------------------
     Login Success
  ------------------------------------------------------- */

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);


  /* -------------------------------------------------------
     Login Error
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     Submit
  ------------------------------------------------------- */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      dispatch(
        addNotification({
          type: "warning",
          message: "Please enter your email and password.",
        })
      );

      return;
    }

    dispatch(
      login({
        email: email.trim(),
        password,
      })
    );
  };


  return (
    <div className="auth-page">

      {/* ==================================================
          LEFT BRAND PANEL
      ================================================== */}

      <section className="auth-brand-panel">

        <div className="auth-brand-content">

          <Link to="/login" className="auth-logo">

            <div className="auth-logo-mark">
              R
            </div>

            <div>
              <span className="auth-logo-name">
                ReviewRave
              </span>

              <span className="auth-logo-subtitle">
                Customer Intelligence
              </span>
            </div>

          </Link>


          <div className="auth-hero">

            <span className="auth-eyebrow">
              CUSTOMER INTELLIGENCE PLATFORM
            </span>

            <h1>
              Turn customer
              <span> feedback </span>
              into action.
            </h1>

            <p>
              Monitor reviews, understand customer sentiment,
              and resolve complaints before they become bigger
              problems.
            </p>

          </div>


          <div className="auth-features">

            <div className="auth-feature">
              <div className="feature-icon">
                ◔
              </div>

              <div>
                <strong>
                  Sentiment insights
                </strong>

                <span>
                  Understand how customers really feel.
                </span>
              </div>
            </div>


            <div className="auth-feature">
              <div className="feature-icon">
                ◇
              </div>

              <div>
                <strong>
                  Smart ticket routing
                </strong>

                <span>
                  Move actionable complaints to resolution.
                </span>
              </div>
            </div>


            <div className="auth-feature">
              <div className="feature-icon">
                ✓
              </div>

              <div>
                <strong>
                  Track what matters
                </strong>

                <span>
                  Keep your customer experience on track.
                </span>
              </div>
            </div>

          </div>

        </div>


        <div className="auth-brand-footer">
          <span>
            © {new Date().getFullYear()} ReviewRave
          </span>

          <span>
            Social Sentiment Analysis
          </span>
        </div>

      </section>


      {/* ==================================================
          RIGHT LOGIN PANEL
      ================================================== */}

      <section className="auth-form-panel">

        <div className="login-card">

          <div className="login-header">

            <div className="mobile-auth-logo">
              <div className="auth-logo-mark">
                R
              </div>

              <span>
                ReviewRave
              </span>
            </div>


            <span className="login-welcome">
              Welcome back
            </span>

            <h2>
              Sign in to your account
            </h2>

            <p>
              Enter your credentials to continue to ReviewRave.
            </p>

          </div>


          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* ================= EMAIL ================= */}

            <div className="form-group">

              <label htmlFor="email">
                Email address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="agent@reviewrave.com"
                  autoComplete="email"
                  disabled={loading}
                />

              </div>

            </div>


            {/* ================= PASSWORD ================= */}

            <div className="form-group">

              <div className="label-row">

                <label htmlFor="password">
                  Password
                </label>

              </div>


              <div className="input-wrapper">

                <span className="input-icon">
                  •
                </span>

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "◉" : "◌"}
                </button>

              </div>

            </div>


            {/* ================= SUBMIT ================= */}

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <span className="button-arrow">
                    →
                  </span>
                </>
              )}

            </button>

          </form>


          {/* ================= REGISTER ================= */}

          <div className="auth-divider">
            <span>New to ReviewRave?</span>
          </div>


          <Link
            to="/register"
            className="register-link-button"
          >
            Create an account
            <span>→</span>
          </Link>


          {/* ================= SECURITY NOTE ================= */}

          <div className="security-note">

            <span className="security-icon">
              ◈
            </span>

            <span>
              Your connection is secured with
              enterprise-grade authentication.
            </span>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Login;