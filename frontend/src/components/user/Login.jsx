
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { login } from '../../store/slices/authSlice';
// import './Login.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, isError, message, token, user, isSuccess } = useSelector((state) => state.auth || {});

//   useEffect(() => {
//     if (token || isSuccess || user) {
//       navigate('/');
//     }
//   }, [token, isSuccess, user, navigate]);

//   useEffect(() => {
//     if (isError && message) {
//       alert(message);
//     }
//   }, [isError, message]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const resultAction = await dispatch(login(formData));
//     if (login.fulfilled.match(resultAction)) {
//       navigate('/');
//     } else {
//       const errorMsg = resultAction.payload || 'Login failed';
//       alert(errorMsg);
//     }
//   };

//   return (
//     <div className="auth-container" data-testid="login-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <h2 className="auth-title">Login to ReviewRave</h2>
//           <p className="auth-subtitle">Enter your credentials to access your account</p>
//         </div>

//         <form className="auth-form" onSubmit={handleSubmit} data-testid="login-form">
//           <div className="form-group">
//             <label className="form-label" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="form-input"
//               placeholder="reviewrave.com"
//               value={formData.email}
//               onChange={handleChange}
//               data-testid="email-input"
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="form-input"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               data-testid="password-input"
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn-primary"
//             disabled={isLoading}
//             data-testid="login-submit-btn"
//           >
//             {isLoading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>

//         <div className="auth-footer">
//           Have an account?{' '}
//           <Link to="/register" data-testid="register-link">
//             Register here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth || {});

  /*
   * Support both the current Redux state names
   * and older test/mock state names.
   */
  const loading =
    auth.loading !== undefined ? auth.loading : Boolean(auth.isLoading);

  const error =
    auth.error !== undefined ? auth.error : auth.message;

  const token = auth.token;
  const user = auth.user;

  const role =
    auth.role ||
    localStorage.getItem('role') ||
    user?.role ||
    user?.user?.role ||
    null;

  /*
   * Navigate based on the logged-in user's role.
   *
   * BRAND_MANAGER     -> Brand Manager dashboard (/)
   * RESOLUTION_AGENT  -> Resolution Tickets (/tickets)
   * PLATFORM_ADMIN    -> Platform Admin dashboard (/)
   */
  const navigateByRole = (userRole) => {
    const normalizedRole = String(userRole || '').toUpperCase();

    if (normalizedRole === 'RESOLUTION_AGENT') {
      navigate('/tickets');
      return;
    }

    if (normalizedRole === 'BRAND_MANAGER') {
      navigate('/');
      return;
    }

    if (normalizedRole === 'PLATFORM_ADMIN') {
      navigate('/');
      return;
    }

    /*
     * Fallback keeps the previous behavior.
     */
    navigate('/');
  };

  /*
   * Handle an already authenticated user.
   */
  useEffect(() => {
    if (token || user) {
      navigateByRole(role);
    }
  }, [token, user, role]); // eslint-disable-line react-hooks/exhaustive-deps

  /*
   * Show login error.
   */
  useEffect(() => {
    if (error) {
      const errorMessage =
        typeof error === 'string'
          ? error
          : error?.message || 'Login failed';

      alert(errorMessage);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(login(formData));

    /*
     * Login successful
     */
    if (login.fulfilled.match(resultAction)) {
      const response = resultAction.payload || {};

      /*
       * Get role directly from the backend login response.
       * This is the safest value immediately after login.
       */
      const loggedInRole =
        response.role ||
        response.user?.role ||
        localStorage.getItem('role') ||
        null;

      navigateByRole(loggedInRole);

      return;
    }

    /*
     * Login failed
     */
    const errorMsg =
      resultAction.payload ||
      resultAction.error?.message ||
      'Login failed';

    alert(
      typeof errorMsg === 'string'
        ? errorMsg
        : errorMsg?.message || 'Login failed'
    );
  };

  return (
    <div className="auth-container" data-testid="login-container">
      <div className="auth-card">

        <div className="auth-header">
          <h2 className="auth-title">Login to ReviewRave</h2>

          <p className="auth-subtitle">
            Enter your credentials to access your account
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
          data-testid="login-form"
        >

          <div className="form-group">
            <label
              className="form-label"
              htmlFor="email"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="reviewrave.com"
              value={formData.email}
              onChange={handleChange}
              data-testid="email-input"
            />
          </div>

          <div className="form-group">
            <label
              className="form-label"
              htmlFor="password"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              data-testid="password-input"
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            data-testid="login-submit-btn"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <div className="auth-footer">
          Have an account?{' '}

          <Link
            to="/register"
            data-testid="register-link"
          >
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;