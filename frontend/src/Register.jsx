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

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  register,
  clearError,
} from "./store/slices/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    role: "BRAND_MANAGER",
  });

  const [error, setError] = useState("");

  /* --------------------------------
     REDIRECT AFTER REGISTRATION
     -------------------------------- */
  useEffect(() => {
    if (user) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [user, navigate]);

  /* --------------------------------
     HANDLE REDUX ERROR
     -------------------------------- */
  useEffect(() => {
    if (isError) {
      setError(
        message || "Registration failed"
      );

      dispatch(clearError());
    }
  }, [isError, message, dispatch]);

  /* --------------------------------
     HANDLE INPUT
     -------------------------------- */
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  /* --------------------------------
     HANDLE REGISTER
     -------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    /* Password validation */
    if (formData.password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    try {
      await dispatch(
        register(formData)
      ).unwrap();

      navigate("/login", {
        replace: true,
      });

    } catch (err) {
      setError(
        err || "Registration failed"
      );
    }
  };

  return (
    <div className="auth-page register-page">

      {/* =====================================================
          LEFT BRAND PANEL
          ===================================================== */}

      <section className="auth-brand-panel">

        <div className="auth-brand-content">

          {/* LOGO */}

          <Link
            to="/login"
            className="auth-logo"
          >
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

          {/* HERO */}

          <div className="auth-hero">

            <span className="auth-eyebrow">
              SOCIAL SENTIMENT PLATFORM
            </span>

            <h1>
              Build better
              <br />
              customer experiences.
            </h1>

            <p>
              Turn customer feedback into actionable
              insights, resolve issues faster, and create
              experiences your customers love.
            </p>

          </div>

          {/* FEATURES */}

          <div className="auth-features">

            {/* FEATURE 1 */}

            <div className="auth-feature">

              <div className="feature-icon">
                ✓
              </div>

              <div>
                <strong>
                  Monitor sentiment
                </strong>

                <span>
                  Understand how customers feel
                </span>
              </div>

            </div>

            {/* FEATURE 2 */}

            <div className="auth-feature">

              <div className="feature-icon">
                ✓
              </div>

              <div>
                <strong>
                  Track reviews
                </strong>

                <span>
                  Keep every customer voice visible
                </span>
              </div>

            </div>

            {/* FEATURE 3 */}

            <div className="auth-feature">

              <div className="feature-icon">
                ✓
              </div>

              <div>
                <strong>
                  Resolve issues faster
                </strong>

                <span>
                  Turn problems into opportunities
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="auth-brand-footer">

          <span>
            © 2026 ReviewRave
            <br />
            Social Sentiment Analysis
          </span>

          <span>
            Secure
            <br />
            Role-based access
          </span>

        </div>

      </section>

      {/* =====================================================
          RIGHT REGISTER PANEL
          ===================================================== */}

      <section className="auth-form-panel">

        <div className="register-card">

          {/* HEADER */}

          <div className="login-header">

            {/* MOBILE LOGO */}

            <div className="mobile-auth-logo">

              <div className="auth-logo-mark">
                R
              </div>

              <span>
                ReviewRave
              </span>

            </div>

            <span className="login-welcome">
              GET STARTED
            </span>

            <h2>
              Register Account
            </h2>

            <p>
              Create your ReviewRave account to get started.
            </p>

          </div>

          {/* REGISTER FORM */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* ERROR */}

            {error && (
              <div className="register-error">
                {error}
              </div>
            )}

            {/* =========================================
                FIRST NAME + LAST NAME
                ========================================= */}

            <div className="form-row">

              {/* FIRST NAME */}

              <div className="form-group">

                <label htmlFor="firstName">
                  First Name
                </label>

                <div className="input-wrapper">

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    autoComplete="given-name"
                    required
                    disabled={isLoading}
                  />

                </div>

              </div>

              {/* LAST NAME */}

              <div className="form-group">

                <label htmlFor="lastName">
                  Last Name
                </label>

                <div className="input-wrapper">

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    autoComplete="family-name"
                    required
                    disabled={isLoading}
                  />

                </div>

              </div>

            </div>

            {/* =========================================
                COMPANY NAME
                ========================================= */}

            <div className="form-group">

              <label htmlFor="companyName">
                Company Name
              </label>

              <div className="input-wrapper">

                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  autoComplete="organization"
                  required
                  disabled={isLoading}
                />

              </div>

            </div>

            {/* =========================================
                EMAIL
                ========================================= */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address
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
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                />

              </div>

            </div>

            {/* =========================================
                PASSWORD
                ========================================= */}

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
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  disabled={isLoading}
                />

              </div>

              <small className="password-help">
                Password must be at least 8 characters.
              </small>

            </div>

            {/* =========================================
                ROLE
                ========================================= */}

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
                  disabled={isLoading}
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

              </div>

            </div>

            {/* =========================================
                CREATE ACCOUNT
                ========================================= */}

            <button
              type="submit"
              className="auth-submit-button"
              disabled={isLoading}
            >
              {isLoading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {/* =========================================
                DIVIDER
                ========================================= */}

            <div className="auth-divider">
              OR
            </div>

            {/* =========================================
                LOGIN LINK
                ========================================= */}

            <Link
              to="/login"
              className="register-link-button"
            >

              <span>
                Already have an account?
              </span>

              <span>
                Login
              </span>

            </Link>

            {/* =========================================
                SECURITY
                ========================================= */}

            <div className="security-note">

              <span className="security-icon">
                🔒
              </span>

              <span>
                Your account information is protected.
              </span>

            </div>

          </form>

        </div>

      </section>

    </div>
  );
};

export default Register;