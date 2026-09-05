import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  login,
  clearError,
} from "./store/slices/authSlice";

import { addNotification } from "./store/slices/notificationSlice";

import "./Login.css";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);


  useEffect(() => {
    if (error) {
      dispatch(
        addNotification({
          type: "error",
          message:
            typeof error === "string"
              ? error
              : error?.message || "Login failed. Please try again.",
        })
      );

      dispatch(clearError());
    }
  }, [error, dispatch]);


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
    <div className="simple-login-page">

      <div className="simple-login-card">

        {/* HEADING */}

        <div className="simple-login-header">
          <h1>Login to ReviewRave</h1>
        </div>


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
            {loading ? "Logging in..." : "Login"}
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