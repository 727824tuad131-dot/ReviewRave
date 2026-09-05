import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Login.css";

import {
  registerUser,
  clearError,
} from "./store/slices/authSlice";

import { addNotification } from "./store/slices/notificationSlice";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(
    (state) => state.auth
  );


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    role: "BRAND_MANAGER",
  });


  const [showPassword, setShowPassword] = useState(false);


  /* =========================
     REDIRECT AFTER REGISTER
     ========================= */

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);


  /* =========================
     ERROR HANDLING
     ========================= */

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


  /* =========================
     HANDLE INPUT CHANGE
     ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* =========================
     HANDLE REGISTER
     ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData));
  };


  /* =========================
     UI
     ========================= */

  return (
    <div className="simple-register-page">

      <div className="simple-register-card">

        {/* HEADER */}
        <div className="simple-register-header">
          <h1>Register Account</h1>
        </div>


        {/* REGISTER FORM */}
        <form
          className="simple-register-form"
          onSubmit={handleSubmit}
        >

          {/* FIRST NAME + LAST NAME */}

          <div className="simple-name-row">

            {/* FIRST NAME */}

            <div className="simple-form-group">

              <label htmlFor="firstName">
                First Name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jane"
                required
                disabled={loading}
              />

            </div>


            {/* LAST NAME */}

            <div className="simple-form-group">

              <label htmlFor="lastName">
                Last Name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                disabled={loading}
              />

            </div>

          </div>


          {/* COMPANY NAME */}

          <div className="simple-form-group">

            <label htmlFor="companyName">
              Company Name
            </label>

            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Acme Corp"
              required
              disabled={loading}
            />

          </div>


          {/* EMAIL */}

          <div className="simple-form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="manager@gmail.com"
              required
              disabled={loading}
              autoComplete="email"
            />

          </div>


          {/* PASSWORD */}

          <div className="simple-form-group">

            <label htmlFor="password">
              Password (min 8 chars)
            </label>


            <div className="simple-password-wrapper">

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
                className="simple-password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>


          {/* ROLE */}

          <div className="simple-form-group">

            <label htmlFor="role">
              Select Role
            </label>

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

          </div>


          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            className="simple-create-button"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"
            }

          </button>

        </form>


        {/* LOGIN LINK */}

        <div className="simple-login-text">

          Already have an account?

          <Link to="/login">
            Login here
          </Link>

        </div>

      </div>

    </div>
  );
};


export default Register;