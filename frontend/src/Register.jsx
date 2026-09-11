// // import React, { useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";

// // import {
// //   registerUser,
// //   clearError,
// // } from "./store/slices/authSlice";

// // import {
// //   addNotification,
// // } from "./store/slices/notificationSlice";

// // const Register = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const { user, loading, error } = useSelector(
// //     (state) => state.auth || {}
// //   );

// //   /* =========================================================
// //      FORM STATE
// //   ========================================================= */

// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     companyName: "",
// //     email: "",
// //     password: "",
// //     role: "BRAND_MANAGER",
// //   });

// //   const [showPassword, setShowPassword] = useState(false);

// //   /* =========================================================
// //      REDIRECT AFTER SUCCESSFUL REGISTRATION
// //   ========================================================= */

// //   useEffect(() => {
// //     if (user) {
// //       navigate("/");
// //     }
// //   }, [user, navigate]);

// //   /* =========================================================
// //      ERROR HANDLING
// //   ========================================================= */

// //   useEffect(() => {
// //     if (error) {
// //       dispatch(
// //         addNotification({
// //           type: "error",
// //           message: error,
// //         })
// //       );

// //       dispatch(clearError());
// //     }
// //   }, [error, dispatch]);

// //   /* =========================================================
// //      HANDLE INPUT CHANGE
// //   ========================================================= */

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     setFormData((previous) => ({
// //       ...previous,
// //       [name]: value,
// //     }));
// //   };

// //   /* =========================================================
// //      HANDLE REGISTER
// //   ========================================================= */

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     /*
// //      * Send the complete registration object
// //      * to Redux -> authSlice -> authService -> backend.
// //      */
// //     dispatch(registerUser(formData));
// //   };

// //   /* =========================================================
// //      UI
// //   ========================================================= */

// //   return (
// //     <div className="auth-page">
// //       <div className="auth-container register-container">

// //         {/* =================================================
// //             LEFT BRAND PANEL
// //         ================================================= */}

// //         <div className="auth-brand-panel register-brand-panel">

// //           {/* LOGO */}

// //           <div className="brand-logo">
// //             <div className="brand-icon">R</div>
// //             <span>ReviewRave</span>
// //           </div>

// //           {/* BRAND CONTENT */}

// //           <div className="brand-content">

// //             <span className="brand-badge">
// //               JOIN REVIEWRAVE
// //             </span>

// //             <h1>
// //               Build better
// //               <br />
// //               <span>customer</span>
// //               <br />
// //               experiences.
// //             </h1>

// //             <p>
// //               Create your ReviewRave account and turn
// //               customer feedback into meaningful action.
// //             </p>

// //             {/* BENEFITS */}

// //             <div className="register-benefits">

// //               <div className="register-benefit">
// //                 <span className="benefit-icon">
// //                   ✓
// //                 </span>

// //                 <div>
// //                   <strong>
// //                     Monitor sentiment
// //                   </strong>

// //                   <small>
// //                     Understand what customers really think.
// //                   </small>
// //                 </div>
// //               </div>

// //               <div className="register-benefit">
// //                 <span className="benefit-icon">
// //                   ✓
// //                 </span>

// //                 <div>
// //                   <strong>
// //                     Track reviews
// //                   </strong>

// //                   <small>
// //                     Bring customer feedback into one place.
// //                   </small>
// //                 </div>
// //               </div>

// //               <div className="register-benefit">
// //                 <span className="benefit-icon">
// //                   ✓
// //                 </span>

// //                 <div>
// //                   <strong>
// //                     Resolve issues faster
// //                   </strong>

// //                   <small>
// //                     Turn negative feedback into action.
// //                   </small>
// //                 </div>
// //               </div>

// //             </div>
// //           </div>

// //           {/* BRAND FOOTER */}

// //           <div className="brand-footer">

// //             <div className="brand-stat">
// //               <strong>
// //                 One platform
// //               </strong>

// //               <span>
// //                 For smarter feedback
// //               </span>
// //             </div>

// //             <div className="brand-stat">
// //               <strong>
// //                 Secure
// //               </strong>

// //               <span>
// //                 Role-based access
// //               </span>
// //             </div>

// //           </div>
// //         </div>

// //         {/* =================================================
// //             RIGHT REGISTER FORM
// //         ================================================= */}

// //         <div className="auth-form-panel register-form-panel">

// //           <div className="register-card">

// //             {/* MOBILE BRAND */}

// //             <div className="mobile-brand">
// //               <div className="brand-icon">
// //                 R
// //               </div>

// //               <span>
// //                 ReviewRave
// //               </span>
// //             </div>

// //             {/* HEADER */}

// //             <div className="auth-header">

// //               <span className="auth-eyebrow">
// //                 GET STARTED
// //               </span>

// //               <h2>
// //                 Register Account
// //               </h2>

// //               <p>
// //                 Create your account to start using ReviewRave.
// //               </p>

// //             </div>

// //             {/* =================================================
// //                 REGISTER FORM
// //             ================================================= */}

// //             <form
// //               onSubmit={handleSubmit}
// //               className="auth-form register-form"
// //             >

// //               {/* =================================================
// //                   FIRST NAME + LAST NAME
// //               ================================================= */}

// //               <div className="form-row">

// //                 <div className="form-group">

// //                   <label htmlFor="firstName">
// //                     First Name
// //                   </label>

// //                   <input
// //                     id="firstName"
// //                     name="firstName"
// //                     type="text"
// //                     placeholder="First Name"
// //                     value={formData.firstName}
// //                     onChange={handleChange}
// //                     required
// //                     autoComplete="given-name"
// //                   />

// //                 </div>

// //                 <div className="form-group">

// //                   <label htmlFor="lastName">
// //                     Last Name
// //                   </label>

// //                   <input
// //                     id="lastName"
// //                     name="lastName"
// //                     type="text"
// //                     placeholder="Last Name"
// //                     value={formData.lastName}
// //                     onChange={handleChange}
// //                     required
// //                     autoComplete="family-name"
// //                   />

// //                 </div>

// //               </div>

// //               {/* =================================================
// //                   COMPANY NAME
// //               ================================================= */}

// //               <div className="form-group">

// //                 <label htmlFor="companyName">
// //                   Company Name

// //                   <span className="optional-label">
// //                     Optional
// //                   </span>
// //                 </label>

// //                 <div className="input-wrapper">

// //                   <span className="input-icon">
// //                     ▣
// //                   </span>

// //                   <input
// //                     id="companyName"
// //                     name="companyName"
// //                     type="text"
// //                     placeholder="Enter company name"
// //                     value={formData.companyName}
// //                     onChange={handleChange}
// //                     autoComplete="organization"
// //                   />

// //                 </div>

// //               </div>

// //               {/* =================================================
// //                   EMAIL
// //               ================================================= */}

// //               <div className="form-group">

// //                 <label htmlFor="email">
// //                   Email Address
// //                 </label>

// //                 <div className="input-wrapper">

// //                   <span className="input-icon">
// //                     ✉
// //                   </span>

// //                   <input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     placeholder="Enter email address"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     required
// //                     autoComplete="email"
// //                   />

// //                 </div>

// //               </div>

// //               {/* =================================================
// //                   PASSWORD
// //               ================================================= */}

// //               <div className="form-group">

// //                 <label htmlFor="password">

// //                   Password

// //                   <span className="password-hint">
// //                     Minimum 8 characters
// //                   </span>

// //                 </label>

// //                 <div className="input-wrapper">

// //                   <span className="input-icon">
// //                     ●
// //                   </span>

// //                   <input
// //                     id="password"
// //                     name="password"
// //                     type={
// //                       showPassword
// //                         ? "text"
// //                         : "password"
// //                     }
// //                     placeholder="Enter password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     required
// //                     minLength={8}
// //                     autoComplete="new-password"
// //                   />

// //                   <button
// //                     type="button"
// //                     className="password-toggle"
// //                     onClick={() =>
// //                       setShowPassword(
// //                         (previous) => !previous
// //                       )
// //                     }
// //                     aria-label={
// //                       showPassword
// //                         ? "Hide password"
// //                         : "Show password"
// //                     }
// //                   >
// //                     {showPassword
// //                       ? "Hide"
// //                       : "Show"}
// //                   </button>

// //                 </div>

// //               </div>

// //               {/* =================================================
// //                   ROLE
// //               ================================================= */}

// //               <div className="form-group">

// //                 <label htmlFor="role">
// //                   Select Role
// //                 </label>

// //                 <div className="select-wrapper">

// //                   <select
// //                     id="role"
// //                     name="role"
// //                     value={formData.role}
// //                     onChange={handleChange}
// //                     required
// //                   >

// //                     <option value="BRAND_MANAGER">
// //                       Brand Manager
// //                     </option>

// //                     <option value="RESOLUTION_AGENT">
// //                       Resolution Agent
// //                     </option>

// //                     <option value="PLATFORM_ADMIN">
// //                       Platform Admin
// //                     </option>

// //                   </select>

// //                   <span className="select-arrow">
// //                     ⌄
// //                   </span>

// //                 </div>

// //               </div>

// //               {/* =================================================
// //                   SUBMIT BUTTON
// //               ================================================= */}

// //               <button
// //                 type="submit"
// //                 className="auth-submit"
// //                 disabled={loading}
// //               >
// //                 {loading
// //                   ? "Registering..."
// //                   : "Create Account"}
// //               </button>

// //             </form>

// //             {/* =================================================
// //                 DIVIDER
// //             ================================================= */}

// //             <div className="auth-divider">
// //               <span>
// //                 ALREADY REGISTERED?
// //               </span>
// //             </div>

// //             {/* LOGIN LINK */}

// //             <p className="register-text">
// //               Already have an account?
// //               <Link to="/login">
// //                 {" "}Login here
// //               </Link>
// //             </p>

// //             {/* SECURITY */}

// //             <div className="login-security">

// //               <span>
// //                 🔒
// //               </span>

// //               <span>
// //                 Your information is securely protected
// //               </span>

// //             </div>

// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Register;

// import React, { useEffect, useState } from "react";
// import "./Login.css";

// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   registerUser,
//   clearError,
// } from "./store/slices/authSlice";

// import { addNotification } from "./store/slices/notificationSlice";

// const Register = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, loading, error } = useSelector(
//     (state) => state.auth
//   );

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     companyName: "",
//     email: "",
//     password: "",
//     role: "BRAND_MANAGER",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     if (user) {
//       navigate("/", { replace: true });
//     }
//   }, [user, navigate]);

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

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(registerUser(formData));
//   };

//   return (
//     <div className="auth-page register-page">

//       {/* =====================================================
//           LEFT SIDE
//       ===================================================== */}

//       <section className="auth-brand-panel">

//         <div className="auth-brand-content">

//           <Link to="/register" className="auth-logo">

//             <div className="auth-logo-mark">
//               R
//             </div>

//             <div>
//               <span className="auth-logo-name">
//                 ReviewRave
//               </span>

//               <span className="auth-logo-subtitle">
//                 Customer Intelligence
//               </span>
//             </div>

//           </Link>


//           <div className="auth-hero">

//             <span className="auth-eyebrow">
//               JOIN REVIEWRAVE
//             </span>

//             <h1>
//               Build better
//               <br />
//               customer
//               <br />
//               experiences.
//             </h1>

//             <p>
//               Create your ReviewRave account and turn
//               customer feedback into meaningful action.
//             </p>

//           </div>


//           <div className="auth-features">

//             <div className="auth-feature">

//               <div className="feature-icon">
//                 ✓
//               </div>

//               <div>
//                 <strong>
//                   Monitor sentiment
//                 </strong>

//                 <span>
//                   Understand what customers really think.
//                 </span>
//               </div>

//             </div>


//             <div className="auth-feature">

//               <div className="feature-icon">
//                 ✓
//               </div>

//               <div>
//                 <strong>
//                   Track reviews
//                 </strong>

//                 <span>
//                   Bring customer feedback into one place.
//                 </span>
//               </div>

//             </div>


//             <div className="auth-feature">

//               <div className="feature-icon">
//                 ✓
//               </div>

//               <div>
//                 <strong>
//                   Resolve issues faster
//                 </strong>

//                 <span>
//                   Turn negative feedback into action.
//                 </span>
//               </div>

//             </div>

//           </div>

//         </div>


//         <div className="auth-brand-footer">

//           <span>
//             One platform
//             <br />
//             For smarter feedback
//           </span>

//           <span>
//             Secure
//             <br />
//             Role-based access
//           </span>

//         </div>

//       </section>


//       {/* =====================================================
//           RIGHT SIDE - REGISTER
//       ===================================================== */}

//       <section className="auth-form-panel register-form-panel">

//         <div className="register-card">

//           <div className="login-header">

//             <div className="mobile-auth-logo">

//               <div className="auth-logo-mark">
//                 R
//               </div>

//               <span>
//                 ReviewRave
//               </span>

//             </div>


//             <span className="login-welcome">
//               GET STARTED
//             </span>

//             <h2>
//               Register Account
//             </h2>

//             <p>
//               Create your account to start using ReviewRave.
//             </p>

//           </div>


//           <form
//             className="auth-form register-form"
//             onSubmit={handleSubmit}
//           >

//             {/* FIRST NAME + LAST NAME */}

//             <div className="form-row">

//               <div className="form-group">

//                 <label htmlFor="firstName">
//                   First Name
//                 </label>

//                 <div className="input-wrapper">

//                   <span className="input-icon">
//                     ◉
//                   </span>

//                   <input
//                     id="firstName"
//                     name="firstName"
//                     type="text"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     placeholder="First Name"
//                     required
//                     disabled={loading}
//                   />

//                 </div>

//               </div>


//               <div className="form-group">

//                 <label htmlFor="lastName">
//                   Last Name
//                 </label>

//                 <div className="input-wrapper">

//                   <span className="input-icon">
//                     ◉
//                   </span>

//                   <input
//                     id="lastName"
//                     name="lastName"
//                     type="text"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     placeholder="Last Name"
//                     required
//                     disabled={loading}
//                   />

//                 </div>

//               </div>

//             </div>


//             {/* COMPANY */}

//             <div className="form-group">

//               <label htmlFor="companyName">
//                 Company Name
//                 <span className="optional-text">
//                   {" "}Optional
//                 </span>
//               </label>

//               <div className="input-wrapper">

//                 <span className="input-icon">
//                   ▣
//                 </span>

//                 <input
//                   id="companyName"
//                   name="companyName"
//                   type="text"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                   placeholder="Enter company name"
//                   disabled={loading}
//                 />

//               </div>

//             </div>


//             {/* EMAIL */}

//             <div className="form-group">

//               <label htmlFor="email">
//                 Email Address
//               </label>

//               <div className="input-wrapper">

//                 <span className="input-icon">
//                   @
//                 </span>

//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email address"
//                   autoComplete="email"
//                   required
//                   disabled={loading}
//                 />

//               </div>

//             </div>


//             {/* PASSWORD */}

//             <div className="form-group">

//               <label htmlFor="password">
//                 Password
//                 <span className="optional-text">
//                   {" "}Minimum 8 characters
//                 </span>
//               </label>

//               <div className="input-wrapper">

//                 <span className="input-icon">
//                   •
//                 </span>

//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   minLength={8}
//                   autoComplete="new-password"
//                   required
//                   disabled={loading}
//                 />

//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() =>
//                     setShowPassword(!showPassword)
//                   }
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>

//               </div>

//             </div>


//             {/* ROLE */}

//             <div className="form-group">

//               <label htmlFor="role">
//                 Select Role
//               </label>

//               <div className="select-wrapper">

//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   disabled={loading}
//                 >

//                   <option value="BRAND_MANAGER">
//                     Brand Manager
//                   </option>

//                   <option value="RESOLUTION_AGENT">
//                     Resolution Agent
//                   </option>

//                   <option value="PLATFORM_ADMIN">
//                     Platform Admin
//                   </option>

//                 </select>

//               </div>

//             </div>


//             {/* SUBMIT */}

//             <button
//               type="submit"
//               className="auth-submit-button"
//               disabled={loading}
//             >

//               {loading
//                 ? "Creating Account..."
//                 : "Create Account"}

//             </button>


//             {/* LOGIN */}

//             <div className="auth-divider">
//               ALREADY REGISTERED?
//             </div>

//             <Link
//               to="/login"
//               className="register-link-button"
//             >
//               Already have an account?
//               <span>Login here</span>
//             </Link>


//             {/* SECURITY */}

//             <div className="security-note">

//               <span className="security-icon">
//                 🔒
//               </span>

//               <span>
//                 Your information is securely protected
//               </span>

//             </div>

//           </form>

//         </div>

//       </section>

//     </div>
//   );
// };

// export default Register;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { registerUser, clearError } from "./store/slices/authSlice";
import { addNotification } from "./store/slices/notificationSlice";

import "./Register.css";

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
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      dispatch(
        addNotification({
          type: "error",
          message: "Please enter your first name.",
        })
      );
      return;
    }

    if (!formData.lastName.trim()) {
      dispatch(
        addNotification({
          type: "error",
          message: "Please enter your last name.",
        })
      );
      return;
    }

    if (!formData.email.trim()) {
      dispatch(
        addNotification({
          type: "error",
          message: "Please enter your email address.",
        })
      );
      return;
    }

    if (formData.password.length < 8) {
      dispatch(
        addNotification({
          type: "error",
          message: "Password must contain at least 8 characters.",
        })
      );
      return;
    }

    try {
      const result = await dispatch(registerUser(formData)).unwrap();

      /*
       * Backend registration response normally contains role.
       * If role is not returned, use the selected form role.
       */
      const role =
        result?.role ||
        localStorage.getItem("role") ||
        formData.role;

      dispatch(
        addNotification({
          type: "success",
          message: "Account created successfully!",
        })
      );

      // Go directly to the correct dashboard
      if (role === "PLATFORM_ADMIN") {
        navigate("/admin", { replace: true });
      } else if (role === "RESOLUTION_AGENT") {
        navigate("/resolution-center", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : err?.message || "Registration failed. Please try again.";

      dispatch(
        addNotification({
          type: "error",
          message,
        })
      );
    }
  };

  return (
    <div className="register-page">
      {/* LEFT SIDE */}
      <section className="register-brand-panel">
        <div className="brand-content">

          <div className="brand-logo">
            <div className="brand-logo-icon">R</div>

            <div>
              <h1>ReviewRave</h1>
              <span>SOCIAL SENTIMENT PLATFORM</span>
            </div>
          </div>

          <div className="brand-main">
            <p className="brand-label">JOIN REVIEWRAVE</p>

            <h2>Build better<br />customer experiences.</h2>

            <p className="brand-description">
              Create your ReviewRave account and turn customer
              feedback into meaningful action.
            </p>

            <div className="register-features">

              <div className="register-feature">
                <div className="feature-check">✓</div>

                <div>
                  <strong>Monitor sentiment</strong>
                  <p>Understand what customers really think.</p>
                </div>
              </div>

              <div className="register-feature">
                <div className="feature-check">✓</div>

                <div>
                  <strong>Track reviews</strong>
                  <p>Bring customer feedback into one place.</p>
                </div>
              </div>

              <div className="register-feature">
                <div className="feature-check">✓</div>

                <div>
                  <strong>Resolve issues faster</strong>
                  <p>Turn negative feedback into action.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="brand-bottom">
            <div>
              <strong>One platform</strong>
              <span>For smarter feedback</span>
            </div>

            <div>
              <strong>Secure</strong>
              <span>Role-based access</span>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="register-form-panel">

        <div className="register-card">

          <div className="register-heading">
            <span>GET STARTED</span>

            <h2>Register Account</h2>

            <p>
              Create your account to start using ReviewRave.
            </p>
          </div>

          {error && (
            <div className="register-error">
              {typeof error === "string"
                ? error
                : "Registration failed. Please try again."}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* FIRST + LAST NAME */}
            <div className="name-row">

              <div className="form-group">
                <label htmlFor="firstName">
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  autoComplete="given-name"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  autoComplete="family-name"
                  disabled={loading}
                />
              </div>

            </div>

            {/* COMPANY */}
            <div className="form-group">
              <label htmlFor="companyName">
                Company Name
                <span className="optional">Optional</span>
              </label>

              <input
                id="companyName"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                autoComplete="organization"
                disabled={loading}
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                autoComplete="email"
                disabled={loading}
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              <small className="password-hint">
                Minimum 8 characters
              </small>
            </div>

            {/* ROLE */}
            <div className="form-group">
              <label htmlFor="role">
                Select Role
              </label>

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
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

            {/* SUBMIT */}
            <button
              type="submit"
              className="create-account-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* LOGIN */}
          <div className="login-existing">

            <span>ALREADY REGISTERED?</span>

            <p>
              Already have an account?{" "}
              <Link to="/login">
                Login here
              </Link>
            </p>

          </div>

          {/* SECURITY */}
          <div className="security-note">
            <span>🔒</span>
            <p>Your information is securely protected</p>
          </div>

        </div>

      </section>
    </div>
  );
};

export default Register;