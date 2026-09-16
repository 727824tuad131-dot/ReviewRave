// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import "./Login.css";

// import {
//   login,
//   clearError,
// } from "./store/slices/authSlice";

// import { addNotification } from "./store/slices/notificationSlice";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, loading, error } = useSelector(
//     (state) => state.auth || {}
//   );

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   /* =========================================================
//      REDIRECT AFTER SUCCESSFUL LOGIN
//      ========================================================= */
//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   /* =========================================================
//      ERROR HANDLING
//      ========================================================= */
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
//      LOGIN SUBMIT
//      ========================================================= */
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(
//       login({
//         email,
//         password,
//       })
//     );
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">

//         {/* =====================================================
//             LEFT SIDE — REVIEWRAVE BRANDING
//             ===================================================== */}
//         <div className="auth-brand-panel">

//           <div className="brand-logo">
//             <div className="brand-icon">R</div>
//             <span>ReviewRave</span>
//           </div>

//           <div className="brand-content">

//             <span className="brand-badge">
//               SOCIAL SENTIMENT PLATFORM
//             </span>

//             <h1>
//               Turn customer
//               <br />
//               <span>feedback</span> into
//               <br />
//               action.
//             </h1>

//             <p>
//               Monitor reviews, understand customer sentiment,
//               and resolve issues faster with ReviewRave.
//             </p>

//           </div>

//           <div className="brand-footer">

//             <div className="brand-stat">
//               <strong>Real-time</strong>
//               <span>Sentiment Insights</span>
//             </div>

//             <div className="brand-stat">
//               <strong>Smart</strong>
//               <span>Issue Resolution</span>
//             </div>

//           </div>

//         </div>

//         {/* =====================================================
//             RIGHT SIDE — LOGIN FORM
//             ===================================================== */}
//         <div className="auth-form-panel">

//           <div className="login-card">

//             {/* Mobile Brand */}
//             <div className="mobile-brand">
//               <div className="brand-icon">R</div>
//               <span>ReviewRave</span>
//             </div>

//             {/* Header */}
//             <div className="auth-header">

//               <span className="auth-eyebrow">
//                 WELCOME BACK
//               </span>

//               <h2>
//                 Login to ReviewRave
//               </h2>

//               <p>
//                 Sign in to continue to your dashboard.
//               </p>

//             </div>

//             {/* =================================================
//                 LOGIN FORM
//                 ================================================= */}
//             <form
//               onSubmit={handleSubmit}
//               className="auth-form"
//             >

//               {/* EMAIL */}
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
//                     placeholder="agent@reviewrave.com"
//                     value={email}
//                     onChange={(e) =>
//                       setEmail(e.target.value)
//                     }
//                     autoComplete="email"
//                     required
//                   />

//                 </div>

//               </div>

//               {/* PASSWORD */}
//               <div className="form-group">

//                 <div className="password-label-row">

//                   <label htmlFor="password">
//                     Password
//                   </label>

//                 </div>

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
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) =>
//                       setPassword(e.target.value)
//                     }
//                     autoComplete="current-password"
//                     required
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
//                     {showPassword ? "Hide" : "Show"}
//                   </button>

//                 </div>

//               </div>

//               {/* LOGIN BUTTON */}
//               <button
//                 type="submit"
//                 className="auth-submit"
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Authenticating..."
//                   : "Login"}
//               </button>

//             </form>

//             {/* DIVIDER */}
//             <div className="auth-divider">
//               <span>OR</span>
//             </div>

//             {/* REGISTER */}
//             <p className="register-text">
//               Don't have an account?
//               <Link to="/register">
//                 {" "}Register here
//               </Link>
//             </p>

//             {/* SECURITY */}
//             <div className="login-security">
//               <span>🔒</span>
//               <span>
//                 Secure authentication powered by ReviewRave
//               </span>
//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useEffect, useState } from "react";
// import "./Login.css";

// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   login,
//   clearError,
// } from "./store/slices/authSlice";

// import { addNotification } from "./store/slices/notificationSlice";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, loading, error } = useSelector(
//     (state) => state.auth
//   );

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

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

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(
//       login({
//         email,
//         password,
//       })
//     );
//   };

//   return (
//     <div className="auth-page login-page">

//       {/* ==================================================
//           LEFT SIDE
//       ================================================== */}

//       <section className="auth-brand-panel">

//         <div className="auth-brand-content">

//           <Link to="/login" className="auth-logo">

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
//               SOCIAL SENTIMENT PLATFORM
//             </span>

//             <h1>
//               Turn customer feedback
//               <br />
//               into action.
//             </h1>

//             <p>
//               Monitor reviews, understand customer
//               sentiment, and resolve issues faster
//               with ReviewRave.
//             </p>

//           </div>


//           <div className="auth-features">

//             <div className="auth-feature">

//               <div className="feature-icon">
//                 ✓
//               </div>

//               <div>
//                 <strong>
//                   Real-time
//                 </strong>

//                 <span>
//                   Sentiment Insights
//                 </span>
//               </div>

//             </div>


//             <div className="auth-feature">

//               <div className="feature-icon">
//                 ✓
//               </div>

//               <div>
//                 <strong>
//                   Smart
//                 </strong>

//                 <span>
//                   Issue Resolution
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


//       {/* ==================================================
//           RIGHT SIDE - LOGIN
//       ================================================== */}

//       <section className="auth-form-panel login-form-panel">

//         <div className="login-card">

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
//               WELCOME BACK
//             </span>

//             <h2>
//               Login to ReviewRave
//             </h2>

//             <p>
//               Sign in to continue to your dashboard.
//             </p>

//           </div>


//           <form
//             className="auth-form login-form"
//             onSubmit={handleSubmit}
//           >

//             {/* EMAIL */}

//             <div className="form-group">

//               <label htmlFor="login-email">
//                 Email Address
//               </label>

//               <div className="input-wrapper">

//                 <span className="input-icon">
//                   @
//                 </span>

//                 <input
//                   id="login-email"
//                   name="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) =>
//                     setEmail(e.target.value)
//                   }
//                   placeholder="Enter your email"
//                   autoComplete="email"
//                   required
//                   disabled={loading}
//                 />

//               </div>

//             </div>


//             {/* PASSWORD */}

//             <div className="form-group">

//               <label htmlFor="login-password">
//                 Password
//               </label>

//               <div className="input-wrapper">

//                 <span className="input-icon">
//                   •
//                 </span>

//                 <input
//                   id="login-password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) =>
//                     setPassword(e.target.value)
//                   }
//                   placeholder="Enter your password"
//                   autoComplete="current-password"
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


//             {/* LOGIN BUTTON */}

//             <button
//               type="submit"
//               className="auth-submit-button"
//               disabled={loading}
//             >
//               {loading ? "Signing in..." : "Login"}
//             </button>


//             {/* OR */}

//             <div className="auth-divider">
//               OR
//             </div>


//             {/* REGISTER */}

//             <Link
//               to="/register"
//               className="register-link-button"
//             >
//               Don't have an account?
//               <span>
//                 Register here
//               </span>
//             </Link>


//             {/* SECURITY */}

//             <div className="security-note">

//               <span className="security-icon">
//                 🔒
//               </span>

//               <span>
//                 Secure authentication powered by ReviewRave
//               </span>

//             </div>

//           </form>

//         </div>

//       </section>

//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.glassCard}>
        <h2 style={styles.heading}>Login to ReviewRave</h2>
        <form onSubmit={handleSubmit} style={styles.formGroup}>
          <div>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="manager@gmail.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.primaryBtn}>
            Login
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{" "}
          <a href="/register" style={styles.link}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;