import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearError,
} from "./store/slices/authSlice";
import { addNotification } from "./store/slices/notificationSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    role: "BRAND_MANAGER",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData));
  };

  return (
    <div className="auth-page register-page">
      {/* LEFT BRAND PANEL */}
      <section className="auth-brand-panel">
        <div className="auth-brand-content">
          <Link to="/register" className="auth-logo">
            <div className="auth-logo-mark">R</div>

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
              START YOUR JOURNEY
            </span>

            <h1>
              Build better experiences from{" "}
              <span>customer feedback.</span>
            </h1>

            <p>
              Create your ReviewRave account and turn
              customer opinions into meaningful insights
              and actionable resolutions.
            </p>
          </div>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="feature-icon">◔</div>

              <div>
                <strong>
                  Understand sentiment
                </strong>

                <span>
                  Discover what customers really think.
                </span>
              </div>
            </div>

            <div className="auth-feature">
              <div className="feature-icon">◇</div>

              <div>
                <strong>
                  Manage customer issues
                </strong>

                <span>
                  Track feedback that needs attention.
                </span>
              </div>
            </div>

            <div className="auth-feature">
              <div className="feature-icon">✓</div>

              <div>
                <strong>
                  Improve your brand
                </strong>

                <span>
                  Make smarter decisions using insights.
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

      {/* RIGHT REGISTER PANEL */}
      <section className="auth-form-panel">
        <div className="register-card">
          <div className="login-header">
            <div className="mobile-auth-logo">
              <div className="auth-logo-mark">R</div>
              <span>ReviewRave</span>
            </div>

            <span className="login-welcome">
              Create your account
            </span>

            <h2>
              Join ReviewRave
            </h2>

            <p>
              Set up your account to start managing
              customer intelligence.
            </p>
          </div>

          <form
            className="auth-form register-form"
            onSubmit={handleSubmit}
          >
            {/* FIRST NAME + LAST NAME */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  First name
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">
                    ◉
                  </span>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Namaspathi"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  Last name
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">
                    ◉
                  </span>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="S"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* COMPANY NAME */}
            <div className="form-group">
              <label htmlFor="companyName">
                Company name
              </label>

              <div className="input-wrapper">
                <span className="input-icon">
                  ▣
                </span>

                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* EMAIL */}
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={8}
                  required
                  disabled={loading}
                  autoComplete="new-password"
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

              <span className="input-hint">
                Minimum 8 characters
              </span>
            </div>

            {/* ROLE */}
            <div className="form-group">
              <label htmlFor="role">
                Account role
              </label>

              <div className="select-wrapper">
                <span className="input-icon">
                  ◆
                </span>

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="BRAND_MANAGER">
                    Brand Manager
                  </option>

                  <option value="RESOLUTION_AGENT">
                    Resolution Agent
                  </option>

                  <option value="PLATFORM_ADMIN">
                    Platform Admin
                  </option>
                </select>

                <span className="select-arrow">
                  ▾
                </span>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>

                  <span>
                    Registering...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Create Account
                  </span>

                  <span className="button-arrow">
                    →
                  </span>
                </>
              )}
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="auth-divider">
            <span>
              Already have an account?
            </span>
          </div>

          <Link
            to="/login"
            className="register-link-button"
          >
            Sign in to your account
            <span>→</span>
          </Link>

          <div className="security-note">
            <span className="security-icon">
              ◈
            </span>

            <span>
              Your account is protected with
              secure authentication.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;