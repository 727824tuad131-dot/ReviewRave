// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   registerUser,
//   clearError,
// } from "./store/slices/authSlice";

// import {
//   addNotification,
// } from "./store/slices/notificationSlice";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, loading, error } = useSelector(
//     (state) => state.auth || {}
//   );

//   /* =========================================================
//      FORM STATE
//   ========================================================= */

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     companyName: "",
//     email: "",
//     password: "",
//     role: "BRAND_MANAGER",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   /* =========================================================
//      REDIRECT AFTER SUCCESSFUL REGISTRATION
//   ========================================================= */

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   /* =========================================================
//      ERROR HANDLING
//   ========================================================= */

//   useEffect(() => {
//     if (error) {
//       dispatch(
//         addNotification({
//           type: "error",
//           message: error,
//         })
//       );

//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   /* =========================================================
//      HANDLE INPUT CHANGE
//   ========================================================= */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   /* =========================================================
//      HANDLE REGISTER
//   ========================================================= */

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     /*
//      * Send the complete registration object
//      * to Redux -> authSlice -> authService -> backend.
//      */
//     dispatch(registerUser(formData));
//   };

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <div className="auth-page">
//       <div className="auth-container register-container">

//         {/* =================================================
//             LEFT BRAND PANEL
//         ================================================= */}

//         <div className="auth-brand-panel register-brand-panel">

//           {/* LOGO */}

//           <div className="brand-logo">
//             <div className="brand-icon">R</div>
//             <span>ReviewRave</span>
//           </div>

//           {/* BRAND CONTENT */}

//           <div className="brand-content">

//             <span className="brand-badge">
//               JOIN REVIEWRAVE
//             </span>

//             <h1>
//               Build better
//               <br />
//               <span>customer</span>
//               <br />
//               experiences.
//             </h1>

//             <p>
//               Create your ReviewRave account and turn
//               customer feedback into meaningful action.
//             </p>

//             {/* BENEFITS */}

//             <div className="register-benefits">

//               <div className="register-benefit">
//                 <span className="benefit-icon">
//                   ✓
//                 </span>

//                 <div>
//                   <strong>
//                     Monitor sentiment
//                   </strong>

//                   <small>
//                     Understand what customers really think.
//                   </small>
//                 </div>
//               </div>

//               <div className="register-benefit">
//                 <span className="benefit-icon">
//                   ✓
//                 </span>

//                 <div>
//                   <strong>
//                     Track reviews
//                   </strong>

//                   <small>
//                     Bring customer feedback into one place.
//                   </small>
//                 </div>
//               </div>

//               <div className="register-benefit">
//                 <span className="benefit-icon">
//                   ✓
//                 </span>

//                 <div>
//                   <strong>
//                     Resolve issues faster
//                   </strong>

//                   <small>
//                     Turn negative feedback into action.
//                   </small>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* BRAND FOOTER */}

//           <div className="brand-footer">

//             <div className="brand-stat">
//               <strong>
//                 One platform
//               </strong>

//               <span>
//                 For smarter feedback
//               </span>
//             </div>

//             <div className="brand-stat">
//               <strong>
//                 Secure
//               </strong>

//               <span>
//                 Role-based access
//               </span>
//             </div>

//           </div>
//         </div>

//         {/* =================================================
//             RIGHT REGISTER FORM
//         ================================================= */}

//         <div className="auth-form-panel register-form-panel">

//           <div className="register-card">

//             {/* MOBILE BRAND */}

//             <div className="mobile-brand">
//               <div className="brand-icon">
//                 R
//               </div>

//               <span>
//                 ReviewRave
//               </span>
//             </div>

//             {/* HEADER */}

//             <div className="auth-header">

//               <span className="auth-eyebrow">
//                 GET STARTED
//               </span>

//               <h2>
//                 Register Account
//               </h2>

//               <p>
//                 Create your account to start using ReviewRave.
//               </p>

//             </div>

//             {/* =================================================
//                 REGISTER FORM
//             ================================================= */}

//             <form
//               onSubmit={handleSubmit}
//               className="auth-form register-form"
//             >

//               {/* =================================================
//                   FIRST NAME + LAST NAME
//               ================================================= */}

//               <div className="form-row">

//                 <div className="form-group">

//                   <label htmlFor="firstName">
//                     First Name
//                   </label>

//                   <input
//                     id="firstName"
//                     name="firstName"
//                     type="text"
//                     placeholder="First Name"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     required
//                     autoComplete="given-name"
//                   />

//                 </div>

//                 <div className="form-group">

//                   <label htmlFor="lastName">
//                     Last Name
//                   </label>

//                   <input
//                     id="lastName"
//                     name="lastName"
//                     type="text"
//                     placeholder="Last Name"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     required
//                     autoComplete="family-name"
//                   />

//                 </div>

//               </div>

//               {/* =================================================
//                   COMPANY NAME
//               ================================================= */}

//               <div className="form-group">

//                 <label htmlFor="companyName">
//                   Company Name

//                   <span className="optional-label">
//                     Optional
//                   </span>
//                 </label>

//                 <div className="input-wrapper">

//                   <span className="input-icon">
//                     ▣
//                   </span>

//                   <input
//                     id="companyName"
//                     name="companyName"
//                     type="text"
//                     placeholder="Enter company name"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     autoComplete="organization"
//                   />

//                 </div>

//               </div>

//               {/* =================================================
//                   EMAIL
//               ================================================= */}

//               <div className="form-group">

//                 <label htmlFor="email">
//                   Email Address
//                 </label>

//                 <div className="input-wrapper">

//                   <span className="input-icon">
//                     ✉
//                   </span>

//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Enter email address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     autoComplete="email"
//                   />

//                 </div>

//               </div>

//               {/* =================================================
//                   PASSWORD
//               ================================================= */}

//               <div className="form-group">

//                 <label htmlFor="password">

//                   Password

//                   <span className="password-hint">
//                     Minimum 8 characters
//                   </span>

//                 </label>

//                 <div className="input-wrapper">

//                   <span className="input-icon">
//                     ●
//                   </span>

//                   <input
//                     id="password"
//                     name="password"
//                     type={
//                       showPassword
//                         ? "text"
//                         : "password"
//                     }
//                     placeholder="Enter password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     minLength={8}
//                     autoComplete="new-password"
//                   />

//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() =>
//                       setShowPassword(
//                         (previous) => !previous
//                       )
//                     }
//                     aria-label={
//                       showPassword
//                         ? "Hide password"
//                         : "Show password"
//                     }
//                   >
//                     {showPassword
//                       ? "Hide"
//                       : "Show"}
//                   </button>

//                 </div>

//               </div>

//               {/* =================================================
//                   ROLE
//               ================================================= */}

//               <div className="form-group">

//                 <label htmlFor="role">
//                   Select Role
//                 </label>

//                 <div className="select-wrapper">

//                   <select
//                     id="role"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     required
//                   >

//                     <option value="BRAND_MANAGER">
//                       Brand Manager
//                     </option>

//                     <option value="RESOLUTION_AGENT">
//                       Resolution Agent
//                     </option>

//                     <option value="PLATFORM_ADMIN">
//                       Platform Admin
//                     </option>

//                   </select>

//                   <span className="select-arrow">
//                     ⌄
//                   </span>

//                 </div>

//               </div>

//               {/* =================================================
//                   SUBMIT BUTTON
//               ================================================= */}

//               <button
//                 type="submit"
//                 className="auth-submit"
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Registering..."
//                   : "Create Account"}
//               </button>

//             </form>

//             {/* =================================================
//                 DIVIDER
//             ================================================= */}

//             <div className="auth-divider">
//               <span>
//                 ALREADY REGISTERED?
//               </span>
//             </div>

//             {/* LOGIN LINK */}

//             <p className="register-text">
//               Already have an account?
//               <Link to="/login">
//                 {" "}Login here
//               </Link>
//             </p>

//             {/* SECURITY */}

//             <div className="login-security">

//               <span>
//                 🔒
//               </span>

//               <span>
//                 Your information is securely protected
//               </span>

//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useEffect, useState } from "react";
import "./Login.css";

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

  // IMPORTANT:
  // authSlice.js uses isLoading, isError and message
  const { isLoading, isError, message } = useSelector(
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Show registration errors
  useEffect(() => {
    if (isError && message) {
      dispatch(
        addNotification({
          type: "error",
          message: message,
        })
      );

      dispatch(clearError());
    }
  }, [isError, message, dispatch]);

  // Register account
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.companyName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      dispatch(
        addNotification({
          type: "error",
          message: "Please fill all required fields.",
        })
      );

      return;
    }

    if (formData.password.length < 6) {
      dispatch(
        addNotification({
          type: "error",
          message: "Password must contain at least 6 characters.",
        })
      );

      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();

      // Registration successful
      dispatch(
        addNotification({
          type: "success",
          message: "Account created successfully! Please login.",
        })
      );

      // IMPORTANT:
      // Registration should NOT directly open dashboard.
      // It should go to Login page.
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  return (
    <div className="auth-page register-page">

      {/* ================= LEFT SIDE ================= */}
      <div className="auth-left">

        <div className="auth-brand">
          <div className="brand-logo">R</div>

          <div>
            <h1>ReviewRave</h1>
            <span>SOCIAL SENTIMENT PLATFORM</span>
          </div>
        </div>

        <div className="auth-left-content">
          <h2>JOIN REVIEWRAVE</h2>

          <h3>Build better customer experiences.</h3>

          <p>
            Turn customer feedback into actionable insights,
            resolve issues faster, and create experiences
            your customers love.
          </p>

          <div className="auth-features">

            <div className="auth-feature">
              <span className="feature-icon">✓</span>
              <div>
                <strong>Monitor sentiment</strong>
                <small>
                  Understand how customers feel
                </small>
              </div>
            </div>

            <div className="auth-feature">
              <span className="feature-icon">✓</span>
              <div>
                <strong>Track reviews</strong>
                <small>
                  Keep every customer voice visible
                </small>
              </div>
            </div>

            <div className="auth-feature">
              <span className="feature-icon">✓</span>
              <div>
                <strong>Resolve issues faster</strong>
                <small>
                  Turn problems into opportunities
                </small>
              </div>
            </div>

          </div>
        </div>

        <div className="auth-footer">
          © 2026 ReviewRave Social Sentiment Analysis
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="auth-right">

        <div className="auth-card">

          <div className="auth-card-header">
            <h2>GET STARTED</h2>

            <h1>Register Account</h1>

            <p>
              Create your ReviewRave account to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* FIRST NAME + LAST NAME */}
            <div className="form-row">

              <div className="form-group">
                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

            </div>

            {/* COMPANY */}
            <div className="form-group">
              <label>Company Name</label>

              <input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />

              <small className="input-hint">
                Password must be at least 6 characters.
              </small>
            </div>

            {/* ROLE */}
            <div className="form-group">
              <label>Select Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isLoading}
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

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </div>

          {/* SECURITY NOTE */}
          <div className="security-note">
            🔒 Your account information is protected.
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;