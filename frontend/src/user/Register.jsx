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
      <div className="auth-card">

        <h1>Create Account</h1>

        <p className="subtitle">
          Join ReviewRave
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="form-group">
              <label>First Name</label>

              <input
                type="text"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>

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

          <div className="form-group">
            <label>Company Name</label>

            <input
              type="text"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>

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

          <div className="form-group">
            <label>Password</label>

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

          <div className="form-group">
            <label>Role</label>

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

          <button
            type="submit"
            className="primary-btn full-width"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;