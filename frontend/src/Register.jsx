import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { registerUser, clearError } from "./store/slices/authSlice";
import { addNotification } from "./store/slices/notificationSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="auth-page">
      <div className="auth-container register-container">

        {/* =================================================
            LEFT BRAND PANEL
        ================================================= */}

        <div className="auth-brand-panel register-brand-panel">
          <div className="brand-logo">
            <div className="brand-icon">R</div>
            <span>ReviewRave</span>
          </div>

          <div className="brand-content">
            <span className="brand-badge">
              JOIN REVIEWRAVE
            </span>

            <h1>
              Build better
              <br />
              <span>customer</span>
              <br />
              experiences.
            </h1>

            <p>
              Create your ReviewRave account and turn
              customer feedback into meaningful action.
            </p>

            <div className="register-benefits">
              <div className="register-benefit">
                <span className="benefit-icon">✓</span>
                <div>
                  <strong>Monitor sentiment</strong>
                  <small>Understand what customers really think.</small>
                </div>
              </div>

              <div className="register-benefit">
                <span className="benefit-icon">✓</span>
                <div>
                  <strong>Track reviews</strong>
                  <small>Bring customer feedback into one place.</small>
                </div>
              </div>

              <div className="register-benefit">
                <span className="benefit-icon">✓</span>
                <div>
                  <strong>Resolve issues faster</strong>
                  <small>Turn negative feedback into action.</small>
                </div>
              </div>
            </div>
          </div>

          <div className="brand-footer">
            <div className="brand-stat">
              <strong>One platform</strong>
              <span>For smarter feedback</span>
            </div>

            <div className="brand-stat">
              <strong>Secure</strong>
              <span>Role-based access</span>
            </div>
          </div>
        </div>

        {/* =================================================
            REGISTER FORM
        ================================================= */}

        <div className="auth-form-panel register-form-panel">
          <div className="register-card">

            <div className="mobile-brand">
              <div className="brand-icon">R</div>
              <span>ReviewRave</span>
            </div>

            <div className="auth-header">
              <span className="auth-eyebrow">
                GET STARTED
              </span>

              <h2>Register Account</h2>

              <p>
                Create your account to start using ReviewRave.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="auth-form register-form"
            >

              {/* FIRST + LAST NAME */}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    autoComplete="family-name"
                  />
                </div>
              </div>

              {/* COMPANY */}

              <div className="form-group">
                <label htmlFor="companyName">
                  Company Name
                  <span className="optional-label">Optional</span>
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">▣</span>

                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    autoComplete="organization"
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="form-group">
                <label htmlFor="register-email">
                  Email Address
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">✉</span>

                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className="form-group">
                <label htmlFor="register-password">
                  Password
                  <span className="password-hint">
                    Minimum 8 characters
                  </span>
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">●</span>

                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    autoComplete="new-password"
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

              {/* ROLE */}

              <div className="form-group">
                <label htmlFor="role">
                  Select Role
                </label>

                <div className="select-wrapper">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
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

                  <span className="select-arrow">⌄</span>
                </div>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? "Registering..." : "Create Account"}
              </button>
            </form>

            <div className="auth-divider">
              <span>ALREADY REGISTERED?</span>
            </div>

            <p className="register-text">
              Already have an account?
              <Link to="/login"> Login here</Link>
            </p>

            <div className="login-security">
              <span>🔒</span>
              <span>Your information is securely protected</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;