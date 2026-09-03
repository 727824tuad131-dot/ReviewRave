```jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  registerUser,
  clearError
} from "../store/slices/authSlice";

import {
  addNotification
} from "../store/slices/notificationSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(
    (state) => state.auth
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("BRAND_MANAGER");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      dispatch(
        addNotification({
          message: "Please fill all required fields",
          type: "warning"
        })
      );

      return;
    }

    if (password.length < 8) {
      dispatch(
        addNotification({
          message:
            "Password must be at least 8 characters",
          type: "warning"
        })
      );

      return;
    }

    dispatch(
      registerUser({
        firstName,
        lastName,
        companyName,
        email,
        password,
        role
      })
    );
  };

  return (
    <div className="auth-container">

      {/* Branding Section */}
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
              Join our platform and transform customer
              feedback into meaningful insights.
            </p>
          </div>

          <div className="brand-features">

            <div className="feature-item">
              <span className="feature-icon">
                📊
              </span>

              <div>
                <strong>
                  Smart Analytics
                </strong>

                <small>
                  Analyze customer sentiment
                </small>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">
                💬
              </span>

              <div>
                <strong>
                  Review Monitoring
                </strong>

                <small>
                  Track feedback across platforms
                </small>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">
                ⚡
              </span>

              <div>
                <strong>
                  Faster Resolution
                </strong>

                <small>
                  Turn complaints into action
                </small>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className="auth-form-section">

        <div className="auth-card register-card">

          <div className="auth-header">

            <div className="mobile-logo">
              <div className="brand-icon">
                RR
              </div>
            </div>

            <h2>
              Create Account
            </h2>

            <p className="subtitle">
              Join ReviewRave
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="register-form"
          >

            {/* First Name and Last Name */}
            <div className="form-row">

              <div className="form-group">

                <label>
                  First Name
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    👤
                  </span>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Last Name
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    👤
                  </span>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

            </div>

            {/* Company */}
            <div className="form-group">

              <label>
                Company Name
                <span className="optional-text">
                  (Optional)
                </span>
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🏢
                </span>

                <input
                  type="text"
                  value={companyName}
                  onChange={(e) =>
                    setCompanyName(e.target.value)
                  }
                />

              </div>

            </div>

            {/* Email */}
            <div className="form-group">

              <label>
                Email
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="jane@acmecorp.com"
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

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="••••••••"
                  minLength="8"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

              <small className="field-hint">
                Must be at least 8 characters
              </small>

            </div>

            {/* Role */}
            <div className="form-group">

              <label>
                Select Role
              </label>

              <div className="select-wrapper">

                <span className="input-icon">
                  👥
                </span>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                >
                  <option value="BRAND_MANAGER">
                    BRAND_MANAGER
                  </option>

                  <option value="RESOLUTION_AGENT">
                    RESOLUTION_AGENT
                  </option>

                  <option value="PLATFORM_ADMIN">
                    PLATFORM_ADMIN
                  </option>
                </select>

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="primary-btn full-width register-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Registering...
                </>
              ) : (
                <>
                  Create Account
                  <span className="btn-arrow">
                    →
                  </span>
                </>
              )}
            </button>

          </form>

          {/* Login Link */}
          <div className="auth-footer">

            <span>
              Already have an account?
            </span>{" "}

            <Link to="/login">
              Login
            </Link>

          </div>

          <div className="auth-security">

            <span>
              🔐
            </span>

            <span>
              Your information is securely protected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
```
