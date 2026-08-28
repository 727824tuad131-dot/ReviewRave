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
      <div className="auth-card">

        <div className="auth-logo">
          <h1>ReviewRave</h1>
          <p>Social Sentiment Analysis Tool</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

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

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

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

          <button
            type="submit"
            className="primary-btn full-width"
            disabled={loading}
          >
            {loading
              ? "Authenticating..."
              : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;